// Character voices for the pig & buffalo teachers.
// Speaks mixed Thai/English text segment by segment and broadcasts who is
// talking so mascots can animate their mouths. Works without speech support
// too: segments are "played" silently for an estimated duration.
import { getSpeechPreferences, isSpeechSupported } from './speech'

const CHARACTERS = {
  pig: { pitch: 1.45, rate: 1.04 },
  buffalo: { pitch: 0.7, rate: 0.94 },
  narrator: { pitch: 1, rate: 1 },
}

const listeners = new Set()
let state = { speaker: null, lineId: null }
let token = 0

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

function estimateMs(segment) {
  const perChar = segment.lang === 'th' ? 75 : 62
  return Math.max(700, segment.text.length * perChar)
}

function playSegment(segment, character, myToken, rateScale) {
  return new Promise((resolve) => {
    const estimate = estimateMs(segment)
    const voice = segment.lang === 'th' ? findVoice('th') : findVoice('en')
    const silent = !isSpeechSupported() || (segment.lang === 'th' && !voice)

    if (silent) {
      window.setTimeout(resolve, estimate / rateScale)
      return
    }

    const prefs = getSpeechPreferences()
    const utterance = new SpeechSynthesisUtterance(segment.text)
    utterance.lang = segment.lang === 'th' ? 'th-TH' : (prefs.lang && prefs.lang !== 'auto' ? prefs.lang : 'en-US')
    if (voice) utterance.voice = voice
    utterance.pitch = character.pitch
    utterance.rate = character.rate * rateScale * (segment.lang === 'en' ? Number(prefs.rate || 1) : 1)

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

export function stopVoice() {
  token += 1
  if (isSpeechSupported()) window.speechSynthesis.cancel()
  if (state.speaker) setState({ speaker: null, lineId: null })
}

/**
 * Speak a line as a character. Resolves true when it finished normally,
 * false when another line interrupted it.
 */
export async function speakLine(text, { speaker = 'narrator', lineId = null, rate = 1 } = {}) {
  stopVoice()
  const myToken = token
  const character = CHARACTERS[speaker] || CHARACTERS.narrator
  const segments = splitMixedText(text)
  if (segments.length === 0) return true

  setState({ speaker, lineId })
  for (const segment of segments) {
    if (myToken !== token) return false
    await playSegment(segment, character, myToken, rate)
  }
  if (myToken !== token) return false
  setState({ speaker: null, lineId: null })
  return true
}
