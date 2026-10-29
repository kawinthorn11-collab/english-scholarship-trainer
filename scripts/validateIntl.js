// Checks the international practice sets, word bank and classroom lessons.
import { intlTests, getChoices, parseMarked } from '../src/data/intlTests.js'
import { duoLessons } from '../src/data/duoLessons.js'
import { wordDecks } from '../src/data/wordBank.js'

const errors = []
const ids = new Set()
for (const test of intlTests) {
  for (const q of test.questions) {
    if (ids.has(q.id)) errors.push(`duplicate id ${q.id}`)
    ids.add(q.id)
    const marked = parseMarked(q.question).filter((p) => p.label)
    if (!q.choices && marked.map((p) => p.label).join('') !== 'ABCD') errors.push(`${q.id}: needs markers A-D in order`)
    const choices = getChoices(q)
    if (!choices.includes(q.answer)) errors.push(`${q.id}: answer "${q.answer}" not in choices`)
    if (new Set(choices).size !== choices.length) errors.push(`${q.id}: duplicate choices`)
    if (!q.explain) errors.push(`${q.id}: missing explanation`)
  }
}
for (const lesson of duoLessons) {
  if (!lesson.quiz.choices.includes(lesson.quiz.answer)) errors.push(`lesson ${lesson.id}: quiz answer not in choices`)
  for (const line of lesson.lines) if (!['pig', 'buffalo'].includes(line.who)) errors.push(`lesson ${lesson.id}: bad speaker ${line.who}`)
}
const words = new Set()
for (const deck of wordDecks) for (const w of deck.words) {
  if (words.has(w.word)) errors.push(`duplicate word ${w.word}`)
  words.add(w.word)
}
console.log(`intl questions: ${ids.size}, lessons: ${duoLessons.length}, words: ${words.size}`)
if (errors.length) { console.error(errors.join('\n')); process.exit(1) }
console.log('OK')
