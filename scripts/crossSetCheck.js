// Cross-set sanity check: duplicate IDs across sets, missing fields, invalid correctAnswer.
import { examSets } from '../src/data/examSets/index.js'

const allIds = new Set()
const dupIds = []
const issues = []

for (const [, set] of Object.entries(examSets)) {
  for (const q of set.questions) {
    if (allIds.has(q.id)) {
      dupIds.push(q.id)
    } else {
      allIds.add(q.id)
    }
    if (!q.choices.includes(q.correctAnswer)) {
      issues.push(`${q.id}: correctAnswer "${q.correctAnswer}" not in choices`)
    }
    const required = ['explanationThai', 'explanationEnglish', 'whyCorrect', 'examTrick', 'commonMistake', 'miniLesson']
    for (const f of required) {
      if (typeof q[f] !== 'string' || q[f].trim() === '') {
        issues.push(`${q.id}: missing or empty "${f}"`)
      }
    }
  }
}

console.log('Total questions across all sets:', allIds.size)
console.log('Duplicate IDs across sets:', dupIds.length === 0 ? 'none' : dupIds.join(', '))
console.log('Field/answer issues:', issues.length === 0 ? 'none' : '\n  ' + issues.join('\n  '))
