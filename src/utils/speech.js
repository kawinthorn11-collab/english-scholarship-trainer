const LANG_KEY = 'speechVoiceLang'
const RATE_KEY = 'speechRate'
let speakingQueue = []

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
}

export function getSpeechPreferences() {
  if (typeof localStorage === 'undefined') return { lang: 'auto', rate: 1 }
  return {
    lang: localStorage.getItem(LANG_KEY) || 'auto',
    rate: Number(localStorage.getItem(RATE_KEY) || 1),
  }
}

export function saveSpeechPreferences({ lang, rate }) {
  if (typeof localStorage === 'undefined') return
  if (lang) localStorage.setItem(LANG_KEY, lang)
  if (rate) localStorage.setItem(RATE_KEY, String(rate))
}

export function getAvailableEnglishVoices() {
  if (!isSpeechSupported()) return []
  return window.speechSynthesis
    .getVoices()
    .filter((voice) => /^en(-|_)/i.test(voice.lang))
}

export function getEnglishSpeechText(text, maxLength = 1200) {
  const input = String(text || '')
    .replace(/\(\d+\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!input) return ''

  const segments = input.match(/[A-Za-z0-9][A-Za-z0-9\s.,;:'"!?()/%-]*/g) || []
  const cleaned = segments.join(' ').replace(/\s+/g, ' ').trim()
  return cleaned.slice(0, maxLength)
}

export function splitSpeechText(text, maxLength = 220) {
  const cleaned = getEnglishSpeechText(text, 2400)
  if (!cleaned) return []

  const sentences = cleaned.match(/[^.!?]+[.!?]?/g) || [cleaned]
  const chunks = []
  let current = ''

  for (const sentence of sentences) {
    const next = `${current} ${sentence}`.trim()
    if (next.length > maxLength && current) {
      chunks.push(current)
      current = sentence.trim()
    } else {
      current = next
    }
  }
  if (current) chunks.push(current)
  return chunks
}

function chooseVoice(lang) {
  const voices = getAvailableEnglishVoices()
  if (voices.length === 0) return null
  if (lang === 'auto') return voices[0]
  return voices.find((voice) => voice.lang === lang)
    || voices.find((voice) => voice.lang.toLowerCase().startsWith(lang.toLowerCase()))
    || voices[0]
}

export function stopSpeech() {
  speakingQueue = []
  if (isSpeechSupported()) window.speechSynthesis.cancel()
}

export function speakEnglish(text, options = {}) {
  if (!isSpeechSupported()) return false

  const prefs = getSpeechPreferences()
  const preferredLang = options.lang || prefs.lang || 'auto'
  const lang = preferredLang === 'auto' ? 'en-US' : preferredLang
  const rate = Number(options.rate || prefs.rate || 1)
  const chunks = splitSpeechText(text)
  if (chunks.length === 0) return false

  stopSpeech()
  speakingQueue = [...chunks]

  const speakNext = () => {
    const chunk = speakingQueue.shift()
    if (!chunk) return
    const utterance = new SpeechSynthesisUtterance(chunk)
    utterance.lang = lang
    utterance.rate = rate
    utterance.pitch = 1
    const voice = chooseVoice(preferredLang)
    if (voice) utterance.voice = voice
    utterance.onend = speakNext
    window.speechSynthesis.speak(utterance)
  }

  speakNext()
  return true
}
