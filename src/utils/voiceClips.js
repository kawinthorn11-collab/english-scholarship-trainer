// Pre-recorded neural voice clips for the teachers' fixed lines.
//
// The clips are recorded at deploy time (scripts/recordVoices.py) so every
// learner hears the same natural Thai and English voices, even on devices
// without a Thai voice installed. Anything not recorded falls back to the
// device's speech engine.
import { speechKey } from './speechText'

const BASE = `${import.meta.env.BASE_URL}voice/`

let available = null
let manifestPromise = null
let audio = null
let unlocked = false

/** Fetch the list of recorded clips once (call early so clicks play instantly). */
export function loadVoiceClips() {
  if (!manifestPromise) {
    manifestPromise = fetch(`${BASE}manifest.json`)
      .then((res) => (res.ok ? res.json() : []))
      .then((keys) => { available = new Set(keys) })
      .catch(() => { available = new Set() })
  }
  return manifestPromise
}

function getAudio() {
  if (!audio && typeof Audio !== 'undefined') {
    audio = new Audio()
    audio.preload = 'auto'
  }
  return audio
}

// iPhone/iPad only let a page play sound after a tap, and only on an audio
// element that was started during that tap. Prime the shared element on the
// first touch so later clips (e.g. the classroom's autoplay) are allowed.
const SILENCE = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA='

export function installAudioUnlock() {
  if (typeof window === 'undefined') return
  const unlock = () => {
    if (unlocked) return
    unlocked = true
    const el = getAudio()
    if (!el || !el.paused) return
    el.src = SILENCE
    el.play().catch(() => {})
  }
  window.addEventListener('pointerdown', unlock, { once: true, capture: true })
  window.addEventListener('keydown', unlock, { once: true, capture: true })
}

const VOICE_OF = { pig: 'f', narrator: 'f', buffalo: 'm' }

function findClip(text, speaker) {
  if (!available || available.size === 0) return null
  const own = VOICE_OF[speaker] || 'f'
  const other = own === 'f' ? 'm' : 'f'
  for (const voice of [own, other]) {
    const key = speechKey(voice, text)
    if (available.has(key)) return key
  }
  return null
}

export function hasRecordedVoices() {
  return Boolean(available && available.size > 0)
}

/**
 * Play the recorded clip for one already-normalised line.
 * Resolves true when a clip was played (or interrupted), false when there is
 * no clip or it could not play, so the caller can fall back to synthesis.
 */
export function playClip(text, speaker, rate, isCancelled) {
  const key = findClip(text, speaker)
  const el = getAudio()
  if (!key || !el) return Promise.resolve(false)

  return new Promise((resolve) => {
    let settled = false
    const finish = (played) => {
      if (settled) return
      settled = true
      window.clearInterval(watch)
      el.onended = null
      el.onerror = null
      resolve(played)
    }
    // stopVoice() bumps the token; notice it and stop the clip.
    const watch = window.setInterval(() => {
      if (isCancelled()) {
        el.pause()
        finish(true)
      }
    }, 120)
    el.onended = () => finish(true)
    el.onerror = () => finish(false)
    el.src = `${BASE}${key}.mp3`
    el.playbackRate = rate
    el.play().catch(() => finish(false))
  })
}

export function stopClip() {
  if (audio && !audio.paused) audio.pause()
}
