import {
  getEnglishSpeechText,
  getSpeechPreferences,
  isSpeechSupported,
  splitSpeechText,
} from '../src/utils/speech.js'

const errors = []

function assert(condition, message) {
  if (!condition) errors.push(message)
}

assert(isSpeechSupported() === false, 'speech support should safely return false outside the browser')

const prefs = getSpeechPreferences()
assert(prefs.lang === 'auto', 'default speech language should be auto')
assert(prefs.rate === 1, 'default speech rate should be normal')

assert(getEnglishSpeechText('') === '', 'empty text should stay empty')
assert(getEnglishSpeechText('ภาษาไทยล้วน') === '', 'Thai-only text should not be spoken by English TTS')

const mixed = getEnglishSpeechText('เห็น blank หลัง preposition เมื่อไร gerund ต้องมา.')
assert(mixed.includes('blank'), 'mixed text should extract English segments')
assert(mixed.includes('preposition'), 'mixed text should keep grammar terms')
assert(mixed.includes('gerund'), 'mixed text should keep English grammar words')

const numbered = getEnglishSpeechText('(1) She has lived here since 2020.')
assert(!numbered.includes('(1)'), 'blank/question numbers should be removed')
assert(numbered.includes('She has lived here since 2020.'), 'sentence content should remain')

const chunks = splitSpeechText('First sentence. Second sentence. Third sentence.', 24)
assert(chunks.length >= 2, 'long speech text should split into chunks')
assert(chunks.every((chunk) => chunk.length > 0), 'speech chunks should not be empty')

if (errors.length > 0) {
  console.error('Speech validation failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('Speech validation passed.')
console.log(`Extracted mixed text: ${mixed}`)
console.log(`Chunk count: ${chunks.length}`)
