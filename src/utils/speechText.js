// Pure text helpers shared by the browser voice engine and the build-time
// voice recorder (scripts/collectSpeech.mjs), so both split text identically.

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

/** Small stable hash (FNV-1a, 32-bit) used to name recorded audio files. */
export function speechKey(voice, text) {
  let h = 0x811c9dc5
  const input = `${voice}|${text}`
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(36)
}
