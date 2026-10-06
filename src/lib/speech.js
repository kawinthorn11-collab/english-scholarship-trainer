// เสียงครูพูดสอน (Web Speech API)
// อ่านข้อความที่ผสมไทยกับอังกฤษ โดยแยกเป็นช่วง ๆ แล้วใช้เสียงไทยหรือเสียงอังกฤษให้ตรงภาษา
// ทุกปุ่มที่พูดได้มี key ของตัวเอง เพื่อให้ปุ่มรู้ว่าตอนนี้ตัวเองกำลังพูดอยู่หรือไม่

const RATE_KEY = 'est.rate'
const listeners = new Set()
let speakingKey = null
let token = 0

export const RATES = [
  { value: 0.8, label: 'ช้า' },
  { value: 1, label: 'ปกติ' },
  { value: 1.2, label: 'เร็ว' },
]

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
}

export function getRate() {
  try {
    const value = Number(localStorage.getItem(RATE_KEY))
    return RATES.some((rate) => rate.value === value) ? value : 1
  } catch {
    return 1
  }
}

export function setRate(value) {
  try {
    localStorage.setItem(RATE_KEY, String(value))
  } catch {
    // ignore
  }
  notify()
}

export function subscribeSpeech(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getSpeakingKey() {
  return speakingKey
}

function notify() {
  listeners.forEach((listener) => listener())
}

function setSpeakingKey(key) {
  speakingKey = key
  notify()
}

// ── เลือกเสียง ──────────────────────────────────────────────

const QUALITY_HINTS = ['natural', 'neural', 'online', 'premium', 'enhanced', 'google']

function scoreVoice(voice) {
  const name = voice.name.toLowerCase()
  let score = 0
  QUALITY_HINTS.forEach((hint, index) => {
    if (name.includes(hint)) score += 10 - index
  })
  if (voice.localService === false) score += 1
  return score
}

function pickVoice(prefix) {
  if (!isSpeechSupported()) return null
  const voices = window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.replace('_', '-').toLowerCase().startsWith(prefix))
  if (voices.length === 0) return null
  if (prefix === 'en') {
    const us = voices.filter((voice) => /en-us/i.test(voice.lang.replace('_', '-')))
    if (us.length > 0) return us.sort((a, b) => scoreVoice(b) - scoreVoice(a))[0]
  }
  return voices.sort((a, b) => scoreVoice(b) - scoreVoice(a))[0]
}

export function hasThaiVoice() {
  return Boolean(pickVoice('th'))
}

/** เรียกเมื่อรายการเสียงของเบราว์เซอร์โหลดเสร็จ (บางเบราว์เซอร์โหลดช้า) */
export function onVoicesReady(callback) {
  if (!isSpeechSupported()) return () => {}
  const synth = window.speechSynthesis
  if (synth.getVoices().length > 0) callback()
  synth.addEventListener?.('voiceschanged', callback)
  return () => synth.removeEventListener?.('voiceschanged', callback)
}

// ── แยกข้อความไทย / อังกฤษ ─────────────────────────────────

function charLang(char) {
  if (/[฀-๿]/.test(char)) return 'th'
  if (/[A-Za-z]/.test(char)) return 'en'
  return null
}

function cleanForSpeech(text) {
  return String(text || '')
    .replace(/_{2,}\((\d+)\)_{2,}/g, ' blank $1 ')
    .replace(/_{2,}/g, ' blank ')
    .replace(/[→⇒]/g, ', ')
    .replace(/[•·*#"“”]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** แยกข้อความเป็นช่วงภาษาไทยและภาษาอังกฤษ ตัวเลขและเครื่องหมายจะติดไปกับช่วงที่อยู่ */
export function splitByLanguage(text) {
  const segments = []
  let current = null
  let pending = ''
  for (const char of cleanForSpeech(text)) {
    const lang = charLang(char)
    if (!lang) {
      if (current) current.text += char
      else pending += char
      continue
    }
    if (!current || current.lang !== lang) {
      // ช่องว่างระหว่างไทยกับอังกฤษไม่ต้องนำไปด้วย
      current = { lang, text: current ? char : pending + char }
      pending = ''
      segments.push(current)
    } else {
      current.text += char
    }
  }
  return segments
    .map((segment) => ({ ...segment, text: segment.text.replace(/\s+/g, ' ').trim() }))
    .filter((segment) => segment.text && /[฀-๿A-Za-z]/.test(segment.text))
}

/** ตัดข้อความยาวเป็นท่อนสั้น เพราะ Chrome มักหยุดพูดเองถ้าประโยคยาวเกินไป */
function chunk(text, max = 180) {
  if (text.length <= max) return [text]
  const parts = []
  let rest = text
  while (rest.length > max) {
    let cut = rest.lastIndexOf(' ', max)
    const sentenceEnd = Math.max(rest.lastIndexOf('. ', max), rest.lastIndexOf('? ', max), rest.lastIndexOf('! ', max))
    if (sentenceEnd > max * 0.5) cut = sentenceEnd + 1
    if (cut < max * 0.3) cut = max
    parts.push(rest.slice(0, cut).trim())
    rest = rest.slice(cut).trim()
  }
  if (rest) parts.push(rest)
  return parts
}

// ── พูด ────────────────────────────────────────────────────

function speakPiece(text, lang, myToken) {
  return new Promise((resolve) => {
    if (myToken !== token) return resolve()
    const voice = pickVoice(lang)
    if (lang === 'th' && !voice) return resolve() // เครื่องไม่มีเสียงไทย ข้ามไป
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang === 'th' ? 'th-TH' : 'en-US'
    if (voice) utterance.voice = voice
    utterance.rate = getRate() * (lang === 'en' ? 0.95 : 1)
    let done = false
    const finish = () => {
      if (done) return
      done = true
      window.clearTimeout(safety)
      resolve()
    }
    // บางเบราว์เซอร์ไม่ส่ง onend กลับมา กันไม่ให้ค้าง
    const safety = window.setTimeout(finish, text.length * 120 + 4000)
    utterance.onend = finish
    utterance.onerror = finish
    window.speechSynthesis.speak(utterance)
  })
}

export function stopSpeaking() {
  token += 1
  if (isSpeechSupported()) window.speechSynthesis.cancel()
  if (speakingKey) setSpeakingKey(null)
}

/** พูดข้อความ ถ้ามีการพูดอื่นอยู่จะหยุดอันเก่าก่อน */
export async function speak(text, key = 'default', { english = false } = {}) {
  stopSpeaking()
  if (!isSpeechSupported()) return
  const myToken = token
  const segments = english
    ? [{ lang: 'en', text: cleanForSpeech(text) }]
    : splitByLanguage(text)
  setSpeakingKey(key)
  for (const segment of segments) {
    for (const piece of chunk(segment.text)) {
      if (myToken !== token) return
      await speakPiece(piece, segment.lang, myToken)
    }
  }
  if (myToken === token) setSpeakingKey(null)
}
