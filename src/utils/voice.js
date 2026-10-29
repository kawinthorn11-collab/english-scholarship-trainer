// Character voices for the pig & buffalo teachers.
//
// 1. Pre-recorded ElevenLabs audio (public/audio/<key>.mp3, listed in
//    public/audio/manifest.json) is used whenever a line has been generated.
// 2. Otherwise the browser's own speech engine reads the line, Thai and
//    English segments separately.
// 3. Without speech support the line is "played" silently for an estimated
//    duration so the mascots still move their mouths.
//
// The engine broadcasts who is talking so mascots can animate in sync.
import { getSpeechPreferences, isSpeechSupported } from './speech'
import { normalizeSpeech, voiceKey } from './voiceKey'

// Gentle differences only: big pitch shifts make the browser voices sound broken.
const CHARACTERS = {
  pig: { pitch: 1.12, rate: 1 },
  buffalo: { pitch: 0.92, rate: 0.96 },
  narrator: { pitch: 1, rate: 1 },
}

const listeners = new Set()
let state = { speaker: null, lineId: null }
let token = 0
let currentAudio = null
let manifestPromise = null

export function subscribeVoice(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getVoiceState() {
  return state
}

function setState(next) {
  state = next
  listeners.forEach((listener) => listener(state))
}

const audioBase = `${import.meta.env?.BASE_URL || '/'}audio/`

function loadManifest() {
  if (!manifestPromise) {
    manifestPromise = fetch(`${audioBase}manifest.json`, { cache: 'no-cache' })
      .then((res) => (res.ok ? res.json() : { keys: [] }))
      .then((data) => new Set(data.keys || []))
      .catch(() => new Set())
  }
  return manifestPromise
}

/** True when at least one line has natural pre-recorded audio. */
export async function hasRecordedVoices() {
  return (await loadManifest()).size > 0
}

function findVoice(prefix) {
  if (!isSpeechSupported()) return null
  const voices = window.speechSynthesis.getVoices()
  return voices.find((voice) => voice.lang.replace('_', '-').toLowerCase().startsWith(prefix)) || null
}

export function hasThaiVoice() {
  return Boolean(findVoice('th'))
}

/** Split text into Thai / English runs. Emoji and symbols are dropped. */
export function splitMixedText(text) {
  const segments = []
  const re = /([฀-๿][฀-๿\s\d.,!?ๆ"'“”()%:-]*)|([A-Za-z][A-Za-z0-9\s.,;:'"’!?()/%-]*)/g
  let match
  while ((match = re.exec(String(text || ''))) !== null) {
    const value = (match[1] || match[2] || '').replace(/\s+/g, ' ').trim()
    if (!value || !/[฀-๿A-Za-z]/.test(value)) continue
    segments.push({ lang: match[1] ? 'th' : 'en', text: value })
  }
  return segments
}

function estimateMs(text, lang) {
  const perChar = lang === 'th' ? 75 : 62
  return Math.max(700, text.length * perChar)
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function playRecorded(key, rate, myToken) {
  return new Promise((resolve) => {
    const audio = new Audio(`${audioBase}${key}.mp3`)
    currentAudio = audio
    audio.playbackRate = rate
    let done = false
    const finish = (ok) => {
      if (done) return
      done = true
      if (currentAudio === audio) currentAudio = null
      resolve(ok)
    }
    audio.onended = () => finish(true)
    audio.onerror = () => finish(false)
    if (myToken !== token) {
      finish(true)
      return
    }
    audio.play().catch(() => finish(false))
  })
}

function playSynth(segment, character, myToken, rate) {
  return new Promise((resolve) => {
    const estimate = estimateMs(segment.text, segment.lang)
    const voice = segment.lang === 'th' ? findVoice('th') : findVoice('en')
    const silent = !isSpeechSupported() || (segment.lang === 'th' && !voice)

    if (silent) {
      window.setTimeout(resolve, estimate / rate)
      return
    }

    const prefs = getSpeechPreferences()
    const utterance = new SpeechSynthesisUtterance(segment.text)
    utterance.lang = segment.lang === 'th' ? 'th-TH' : (prefs.lang && prefs.lang !== 'auto' ? prefs.lang : 'en-US')
    if (voice) utterance.voice = voice
    // Thai system voices sound unnatural when pitch-shifted, so keep them neutral.
    utterance.pitch = segment.lang === 'th' ? 1 : character.pitch
    utterance.rate = character.rate * rate * (segment.lang === 'en' ? Number(prefs.rate || 1) : 1)

    let done = false
    const finish = () => {
      if (done) return
      done = true
      window.clearTimeout(safety)
      resolve()
    }
    // Some browsers never fire onend; never hang the lesson.
    const safety = window.setTimeout(finish, estimate * 2.5 + 2500)
    utterance.onend = finish
    utterance.onerror = finish
    if (myToken !== token) {
      finish()
      return
    }
    window.speechSynthesis.speak(utterance)
  })
}

async function playOne(text, speaker, rate, myToken) {
  const clean = normalizeSpeech(text)
  if (!clean) return
  const recorded = await loadManifest()
  if (myToken !== token) return
  const key = voiceKey(speaker, clean)
  if (recorded.has(key) && (await playRecorded(key, rate, myToken))) return

  const character = CHARACTERS[speaker] || CHARACTERS.narrator
  for (const segment of splitMixedText(clean)) {
    if (myToken !== token) return
    await playSynth(segment, character, myToken, rate)
  }
}

export function stopVoice() {
  token += 1
  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
  }
  if (isSpeechSupported()) window.speechSynthesis.cancel()
  if (state.speaker) setState({ speaker: null, lineId: null })
}

/**
 * Speak one line, or several lines in a row, as a character.
 * Each line is looked up separately in the recorded audio, so keep lines
 * fixed (no string building) when they should get an ElevenLabs recording.
 * Resolves true when finished normally, false when interrupted.
 */
export async function speakLine(text, { speaker = 'narrator', lineId = null, rate = 1, gap = 250 } = {}) {
  stopVoice()
  const myToken = token
  const lines = (Array.isArray(text) ? text : [text]).filter((line) => normalizeSpeech(line))
  if (lines.length === 0) return true

  setState({ speaker, lineId })
  for (let i = 0; i < lines.length; i += 1) {
    if (myToken !== token) return false
    await playOne(lines[i], speaker, rate, myToken)
    if (i < lines.length - 1 && myToken === token) await wait(gap)
  }
  if (myToken !== token) return false
  setState({ speaker: null, lineId: null })
  return true
}
