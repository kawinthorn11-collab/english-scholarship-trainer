// Shared by the browser and scripts/generateVoices.mjs: maps a spoken line to
// the file name of its pre-recorded audio (public/audio/<key>.mp3).

export function normalizeSpeech(text) {
  return String(text || '')
    // drop emoji and pictographs; the voices should not try to read them
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function fnv1a(str, seed) {
  let h = seed >>> 0
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, '0')
}

export function voiceKey(speaker, text) {
  const input = `${speaker}|${normalizeSpeech(text)}`
  return `${fnv1a(input, 0x811c9dc5)}${fnv1a(input, 0x9747b28c)}`
}
