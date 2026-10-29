#!/usr/bin/env node
// Records the teachers' lines with ElevenLabs into public/audio/<key>.mp3 and
// writes public/audio/manifest.json, which the app reads to play them.
//
// Usage:
//   ELEVENLABS_API_KEY=... node scripts/generateVoices.mjs [--scope=core|all] [--limit=N] [--dry-run]
//
// Optional environment variables:
//   ELEVENLABS_MODEL          default eleven_v3 (needed for Thai)
//   ELEVENLABS_VOICE_PIG      voice id for ครูหมูหวาน
//   ELEVENLABS_VOICE_BUFFALO  voice id for ครูควายขยัน
//
// Existing files are kept, so re-running only records new or changed lines.
import { mkdir, readdir, stat, unlink, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectVoiceLines } from './voiceCatalog.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'audio')

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [k, v] = arg.replace(/^--/, '').split('=')
    return [k, v ?? true]
  })
)
const scope = args.scope === 'all' ? 'all' : 'core'
const limit = Number(args.limit || 0)
const dryRun = Boolean(args['dry-run'])

const apiKey = process.env.ELEVENLABS_API_KEY
const model = process.env.ELEVENLABS_MODEL || 'eleven_v3'
// Fallbacks are ElevenLabs premade voices; set your own in repository variables.
const voices = {
  pig: process.env.ELEVENLABS_VOICE_PIG || 'EXAVITQu4vr4xnSDxMaL',
  buffalo: process.env.ELEVENLABS_VOICE_BUFFALO || 'pNInz6obpgDQGcFmaJgB',
}
const settings = {
  pig: { stability: 0.5, similarity_boost: 0.75, style: 0.35, use_speaker_boost: true },
  buffalo: { stability: 0.5, similarity_boost: 0.75, style: 0.2, use_speaker_boost: true },
}

const allLines = collectVoiceLines('all')
const wanted = collectVoiceLines(scope)
const missing = wanted.filter((l) => !existsSync(path.join(outDir, `${l.key}.mp3`)))
const todo = limit > 0 ? missing.slice(0, limit) : missing
const chars = todo.reduce((n, l) => n + l.text.length, 0)

console.log(`scope=${scope} model=${model}`)
console.log(`lines in scope: ${wanted.length}, already recorded: ${wanted.length - missing.length}, to record now: ${todo.length} (${chars} characters)`)

const byGroup = {}
for (const l of todo) byGroup[l.group] = (byGroup[l.group] || 0) + l.text.length
console.log('characters by group:', byGroup)

if (dryRun) process.exit(0)
if (todo.length && !apiKey) {
  console.error('ELEVENLABS_API_KEY is not set. Add it as a repository secret (Settings → Secrets and variables → Actions).')
  process.exit(1)
}

await mkdir(outDir, { recursive: true })

async function record(line, attempt = 1) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voices[line.speaker]}?output_format=mp3_44100_64`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({ text: line.text, model_id: model, voice_settings: settings[line.speaker] }),
  })
  if (res.status === 429 || res.status >= 500) {
    if (attempt >= 5) throw new Error(`HTTP ${res.status} after ${attempt} attempts`)
    const waitMs = 2000 * 2 ** attempt
    console.warn(`  HTTP ${res.status}, retrying in ${waitMs / 1000}s`)
    await new Promise((r) => setTimeout(r, waitMs))
    return record(line, attempt + 1)
  }
  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`HTTP ${res.status}: ${detail.slice(0, 300)}`)
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(path.join(outDir, `${line.key}.mp3`), buf)
}

let done = 0
let failed = 0
for (const line of todo) {
  try {
    await record(line)
    done += 1
    if (done % 10 === 0 || done === todo.length) console.log(`  recorded ${done}/${todo.length}`)
  } catch (err) {
    failed += 1
    console.error(`  failed [${line.speaker}] "${line.text.slice(0, 50)}": ${err.message}`)
    if (/HTTP 40[13]/.test(err.message)) {
      console.error('Stopping: the API key or voice id was rejected, or the account is out of credits.')
      break
    }
  }
}

// Remove recordings for lines that no longer exist, then rebuild the manifest.
const validKeys = new Set(allLines.map((l) => l.key))
const files = existsSync(outDir) ? await readdir(outDir) : []
const keys = []
for (const file of files) {
  if (!file.endsWith('.mp3')) continue
  const key = file.slice(0, -4)
  if (!validKeys.has(key)) {
    await unlink(path.join(outDir, file))
    continue
  }
  if ((await stat(path.join(outDir, file))).size > 0) keys.push(key)
}
keys.sort()
await writeFile(
  path.join(outDir, 'manifest.json'),
  `${JSON.stringify({ model, voices, generatedAt: new Date().toISOString(), keys }, null, 0)}\n`
)
console.log(`manifest: ${keys.length} recordings. new: ${done}, failed: ${failed}`)
if (failed && !done) process.exit(1)
