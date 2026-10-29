/**
 * Fisher-Yates shuffle — returns a new shuffled array (does not mutate original).
 */
export function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Shuffle each question's choices but keep question order, so cloze passages
 * still read blank (1), (2), (3)... in sequence.
 * correctAnswer still works because it stores the text value, not an index.
 */
export function shuffleExam(questions) {
  return questions.map((q) => ({
    ...q,
    choices: shuffle(q.choices),
  }))
}
