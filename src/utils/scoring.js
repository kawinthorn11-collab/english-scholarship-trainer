export function calculateScore(questions, answers) {
  let total = 0
  let grammar = 0
  let reading = 0
  const details = []

  questions.forEach((q) => {
    const userAnswer = answers[q.id] ?? null
    const isCorrect = userAnswer === q.correctAnswer

    if (isCorrect) {
      total++
      if (q.section === 'Grammar') grammar++
      if (q.section === 'Reading') reading++
    }

    details.push({
      id: q.id,
      section: q.section,
      question: q.question,
      userAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect,
      skillTag: q.skillTag,
    })
  })

  return {
    total,
    grammar,
    reading,
    totalQuestions: questions.length,
    grammarQuestions: questions.filter((q) => q.section === 'Grammar').length,
    readingQuestions: questions.filter((q) => q.section === 'Reading').length,
    details,
    percentage: Math.round((total / questions.length) * 100),
  }
}
