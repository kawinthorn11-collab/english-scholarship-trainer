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
 * Shuffle questions and their choices.
 * Returns new question objects with shuffled choices — correctAnswer still works
 * because it stores the text value, not an index.
 */
export function shuffleExam(questions) {
  const shuffledQuestions = shuffle(questions)
  return shuffledQuestions.map((q) => ({
    ...q,
    choices: shuffle(q.choices),
  }))
}
