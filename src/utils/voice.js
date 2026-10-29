// Character voices for the pig & buffalo teachers, using the device's own
// speech engine (free, works offline once voices are installed).
//
// To sound as native as possible it ranks every installed voice and prefers
// neural / "Natural" / "Enhanced" voices (Microsoft Edge, Google, Apple), a
// female voice for the pig and a male voice for the buffalo, separately for
// Thai and English. Learners can override the choice in Voice Settings.
//
// The engine broadcasts who is talking so mascots can animate in sync.
import { getSpeechPreferences, isSpeechSupported } from './speech'

const PREFS_KEY = 'mk-voice-prefs-v1'

// Gentle pitch changes only, and only when both characters must share one voice.
const CHARACTERS = {
  pig: { gender: 'female', pitch: 1.1, rate: 1 },
  buffalo: { gender: 'male', pitch: 0.9, rate: 0.97 },
  narrator: { gender: 'female', pitch: 1, rate: 1 },
}

const FEMALE = /\b(ava|emma|jenny|aria|michelle|ana|sara|nancy|libby|sonia|maisie|natasha|samantha|karen|moira|tessa|serena|allison|susan|zira|hazel|catherine|victoria|fiona|premwadee|achara|kanya|narisa|female|woman)\b/i
const MALE = /\b(andrew|brian|guy|davis|christopher|eric|roger|steffan|tony|jason|ryan|thomas|william|daniel|alex|aaron|arthur|oliver|fred|tom|george|david|mark|james|niwat|male|man)\b/i

const listeners = new Set()
let state = { speaker: null, lineId: null }
let token = 0
let keepAlive = null

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

/* ------------------------------------------------------------------ */
/*  Voice ranking                                                      */
/* ------------------------------------------------------------------ */

function langOf(voice) {
  return voice.lang.replace('_', '-').toLowerCase()
}

export function getVoicesFor(lang) {
  if (!isSpeechSupported()) return []
  return window.speechSynthesis.getVoices().filter((v) => langOf(v).startsWith(lang))
}

export function guessGender(voice) {
  if (FEMALE.test(voice.name)) return 'female'
  if (MALE.test(voice.name)) return 'male'
  return null
}

/** Higher = more natural-sounding. */
export function voiceQuality(voice) {
  const name = voice.name
  let score = 0
  if (/natural|neural|online/i.test(name)) score += 100 // Microsoft Edge neural voices
  if (/premium|enhanced|siri|\(high\)/i.test(name)) score += 85 // Apple high-quality voices
  if (/google/i.test(name)) score += 60 // Chrome / Android network voices
  if (/premwadee|niwat|achara|kanya|narisa/i.test(name)) score += 25 // well-known Thai voices
  if (/ava|andrew|emma|brian|jenny|aria|guy|samantha|daniel/i.test(name)) score += 15
  if (/compact|espeak|robot|novelty|bells|whisper|bad news|good news|zarvox|trinoids|bubbles|jester|organ|cellos/i.test(name)) score -= 200
  const lang = langOf(voice)
  if (lang === 'en-us' || lang === 'en-gb' || lang === 'th-th') score += 10
  if (voice.localService === false) score += 5
  return score
}

export function qualityLabel(voice) {
  const q = voiceQuality(voice)
  if (q >= 100) return 'ธรรมชาติมาก'
  if (q >= 60) return 'ดี'
  if (q >= 0) return 'ปกติ'
  return 'หุ่นยนต์'
}

export function getVoicePrefs() {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) || '{}')
  } catch {
    return {}
  }
}

export function setVoicePref(key, voiceName) {
  const prefs = getVoicePrefs()
  if (voiceName) prefs[key] = voiceName
  else delete prefs[key]
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  } catch {
    // optional
  }
}

/** Best voice for a character in a language ('th' | 'en'), honouring user choices. */
export function pickVoice(speaker, lang) {
  const voices = getVoicesFor(lang)
  if (voices.length === 0) return null
  const prefs = getVoicePrefs()
  const chosen = prefs[`${speaker}-${lang}`] && voices.find((v) => v.name === prefs[`${speaker}-${lang}`])
  if (chosen) return chosen

  const wantGender = (CHARACTERS[speaker] || CHARACTERS.narrator).gender
  const ranked = [...voices].sort((a, b) => {
    const genderBonus = (v) => (guessGender(v) === wantGender ? 30 : guessGender(v) ? -30 : 0)
    return voiceQuality(b) + genderBonus(b) - (voiceQuality(a) + genderBonus(a))
  })
  return ranked[0]
}

export function hasThaiVoice() {
  return getVoicesFor('th').length > 0
}

export function hasNaturalVoices() {
  return [...getVoicesFor('en'), ...getVoicesFor('th')].some((v) => voiceQuality(v) >= 60)
}

/* ------------------------------------------------------------------ */
/*  Text handling                                                      */
/* ------------------------------------------------------------------ */

export function normalizeSpeech(text) {
  return String(text || '')
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '')
    .replace(/_{2,}\(?\d*\)?_*/g, ' blank ')
    .replace(/\s+/g, ' ')
    .trim()
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

// Chrome stops long utterances after ~15 seconds, so keep chunks short.
function chunk(text, max = 160) {
  if (text.length <= max) return [text]
  const out = []
  let current = ''
  for (const word of text.split(' ')) {
    const next = current ? `${current} ${word}` : word
    // prefer to break right after sentence punctuation once a chunk is long enough
    if (next.length > max || (current.length > max * 0.6 && /[.!?;:]$/.test(current))) {
      if (current) out.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) out.push(current)
  return out
}

function estimateMs(text, lang) {
  return Math.max(700, text.length * (lang === 'th' ? 75 : 62))
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

/* ------------------------------------------------------------------ */
/*  Playback                                                           */
/* ------------------------------------------------------------------ */

function playSynth(text, lang, speaker, myToken, rate) {
  return new Promise((resolve) => {
    const estimate = estimateMs(text, lang)
    const voice = pickVoice(speaker, lang)
    if (!isSpeechSupported() || (lang === 'th' && !voice)) {
      window.setTimeout(resolve, estimate / rate)
      return
    }

    const character = CHARACTERS[speaker] || CHARACTERS.narrator
    const prefs = getSpeechPreferences()
    const other = pickVoice(speaker === 'pig' ? 'buffalo' : 'pig', lang)
    const sharedVoice = speaker !== 'narrator' && voice && other && voice.name === other.name
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = voice?.lang || (lang === 'th' ? 'th-TH' : 'en-US')
    if (voice) utterance.voice = voice
    // natural voices sound best unmodified; only shift pitch to tell the two apart
    utterance.pitch = sharedVoice ? character.pitch : 1
    utterance.rate = character.rate * rate * (lang === 'en' ? Number(prefs.rate || 1) : 1)

    let done = false
    const finish = () => {
      if (done) return
      done = true
      window.clearTimeout(safety)
      resolve()
    }
    const safety = window.setTimeout(finish, estimate * 2.5 + 3000)
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
  for (const segment of splitMixedText(clean)) {
    for (const piece of chunk(segment.text)) {
      if (myToken !== token) return
      await playSynth(piece, segment.lang, speaker, myToken, rate)
    }
  }
}

export function stopVoice() {
  token += 1
  if (keepAlive) {
    window.clearInterval(keepAlive)
    keepAlive = null
  }
  if (isSpeechSupported()) window.speechSynthesis.cancel()
  if (state.speaker) setState({ speaker: null, lineId: null })
}

/**
 * Speak one line, or several lines in a row, as a character.
 * Resolves true when finished normally, false when interrupted.
 */
export async function speakLine(text, { speaker = 'narrator', lineId = null, rate = 1, gap = 250 } = {}) {
  stopVoice()
  const myToken = token
  const lines = (Array.isArray(text) ? text : [text]).filter((line) => normalizeSpeech(line))
  if (lines.length === 0) return true

  // Chrome may pause long speech in the background; nudge it while talking.
  if (isSpeechSupported()) {
    keepAlive = window.setInterval(() => {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume()
    }, 5000)
  }

  setState({ speaker, lineId })
  for (let i = 0; i < lines.length; i += 1) {
    if (myToken !== token) return false
    await playOne(lines[i], speaker, rate, myToken)
    if (i < lines.length - 1 && myToken === token) await wait(gap)
  }
  if (myToken !== token) return false
  if (keepAlive) {
    window.clearInterval(keepAlive)
    keepAlive = null
  }
  setState({ speaker: null, lineId: null })
  return true
}
