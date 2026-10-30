// Collects every fixed line the teachers can speak and writes the list the
// voice recorder (scripts/recordVoices.py) turns into audio files.
//
//   node scripts/collectSpeech.mjs > speech-lines.json
//
// Each line is recorded once per voice it can be spoken in: "f" (ครูหมูหวาน /
// narrator) and "m" (ครูควายขยัน). Lines that contain Thai are recorded with a
// Thai neural voice (which also reads the odd English word naturally); pure
// English lines with an English neural voice.
import { duoLessons, feedbackLines, introSkit, pokeLines, praiseLines, encourageLines } from '../src/data/duoLessons.js'
import * as mascotTips from '../src/data/mascotTips.js'
import { intlTests } from '../src/data/intlTests.js'
import { wordDecks } from '../src/data/wordBank.js'
import { examSetList, getExamSet } from '../src/data/examSets/index.js'
import { normalizeSpeech, speechKey } from '../src/utils/speechText.js'

const lines = new Map() // key `${voice}|${text}` -> { voice, text }

function add(text, voices) {
  if (typeof text !== 'string') return
  const clean = normalizeSpeech(text)
  if (!clean || !/[฀-๿A-Za-z]/.test(clean)) return
  for (const voice of voices) lines.set(`${voice}|${clean}`, { key: speechKey(voice, clean), voice, text: clean })
}

/** Add every string found anywhere inside a value. */
function addDeep(value, voices) {
  if (typeof value === 'string') add(value, voices)
  else if (Array.isArray(value)) value.forEach((v) => addDeep(v, voices))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => addDeep(v, voices))
}

const BOTH = ['f', 'm']
const voiceOf = (who) => (who === 'buffalo' ? ['m'] : ['f'])

// Classroom: each line in its teacher's voice; quiz and shared lines in both.
for (const lesson of duoLessons) {
  for (const line of lesson.lines) {
    add(line.text, voiceOf(line.who))
    add(line.example, voiceOf(line.who))
  }
  addDeep(lesson.quiz, BOTH)
  add(lesson.title, BOTH)
}
for (const line of introSkit) add(line.text, voiceOf(line.who))
addDeep(feedbackLines, BOTH)
addDeep(praiseLines, BOTH)
addDeep(encourageLines, BOTH)
for (const [who, list] of Object.entries(pokeLines)) addDeep(list, voiceOf(who))

// Floating helper tips, landing quiz, word of the day, coach messages.
addDeep(mascotTips, BOTH)

// International tests: coach tips and explanations are read by the buffalo;
// questions and choices by the narrator.
for (const test of intlTests) {
  addDeep(test.coach, ['m'])
  for (const q of test.questions) {
    add(q.explain, ['m'])
  }
}

// Flashcards: words and examples are read by the pig.
addDeep(wordDecks, ['f'])

// Mock exam explanations (buffalo).
for (const meta of examSetList) {
  const set = getExamSet(meta.setId)
  for (const q of set?.questions || []) {
    add(q.explanationThai, ['m'])
    add(q.examTrick, ['m'])
  }
}

// Voice settings samples and other fixed lines spoken from components.
add('สวัสดีจ้า หมูหวานเองนะ วันนี้มาเรียนภาษาอังกฤษกัน', ['f'])
add('สวัสดีครับ ควายขยันเอง ตั้งใจฟังนะ', ['m'])
add('Hello! Practice a little every day.', ['f'])
add('Read the question carefully before you answer.', ['m'])

const out = [...lines.values()]
const thai = out.filter((l) => /[฀-๿]/.test(l.text))
console.error(`${out.length} clips (${thai.length} Thai), ${out.reduce((n, l) => n + l.text.length, 0)} characters`)
process.stdout.write(JSON.stringify(out))
