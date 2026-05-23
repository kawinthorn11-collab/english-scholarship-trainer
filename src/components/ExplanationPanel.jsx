import { examSets } from '../data/examSets/index.js'

/**
 * ExplanationPanel shows detailed explanations for a question.
 * It handles shuffled choices correctly by looking up whyWrong
 * using the original choice position from the question bank.
 */
export default function ExplanationPanel({ question }) {
  // Get the original question to find original choice positions
  // Search across all exam sets by question ID prefix (e.g., S01-Q001 → set01)
  let originalQuestion = null
  for (const set of Object.values(examSets)) {
    const found = set.questions.find((q) => q.id === question.id)
    if (found) { originalQuestion = found; break }
  }
  const originalChoices = originalQuestion ? originalQuestion.choices : question.choices

  /**
   * Find the whyWrong text for a given choice by looking up its
   * original position (1-indexed key in whyWrong map).
   */
  const getWhyWrong = (choice) => {
    const originalIdx = originalChoices.indexOf(choice)
    if (originalIdx === -1) return ''
    return question.whyWrong[String(originalIdx + 1)] || ''
  }

  return (
    <div className="mt-4 space-y-4 rounded-xl border border-purple-600/30 bg-purple-950/50 p-5 text-sm">
      <h4 className="text-base font-semibold text-purple-200">💡 Detailed Explanation</h4>

      {/* Correct Answer */}
      <div>
        <p className="font-semibold text-green-400">✓ Correct Answer: {question.correctAnswer}</p>
      </div>

      {/* Thai Explanation */}
      <div>
        <p className="mb-1 font-semibold text-purple-300">🇹🇭 คำอธิบายภาษาไทย</p>
        <p className="text-purple-200/80">{question.explanationThai}</p>
      </div>

      {/* English Explanation */}
      <div>
        <p className="mb-1 font-semibold text-purple-300">🇬🇧 English Explanation</p>
        <p className="text-purple-200/80">{question.explanationEnglish}</p>
      </div>

      {/* Why Correct */}
      <div>
        <p className="mb-1 font-semibold text-purple-300">✅ Why this is correct</p>
        <p className="text-purple-200/80">{question.whyCorrect}</p>
      </div>

      {/* Why Wrong */}
      <div>
        <p className="mb-1 font-semibold text-purple-300">❌ Why other choices are wrong</p>
        <ul className="space-y-1 text-purple-200/70">
          {question.choices.map((choice, idx) => {
            const whyText = getWhyWrong(choice)
            if (!whyText) return null
            return (
              <li key={idx}>
                <span className="font-medium text-purple-300">{idx + 1}. {choice}:</span> {whyText}
              </li>
            )
          })}
        </ul>
      </div>

      {/* Exam Trick */}
      <div>
        <p className="mb-1 font-semibold text-purple-300">🎯 Exam Trick</p>
        <p className="text-purple-200/80">{question.examTrick}</p>
      </div>

      {/* Common Mistake */}
      <div>
        <p className="mb-1 font-semibold text-purple-300">⚠️ Common Mistake (Thai Students)</p>
        <p className="text-purple-200/80">{question.commonMistake}</p>
      </div>

      {/* Mini Lesson */}
      <div>
        <p className="mb-1 font-semibold text-purple-300">📘 Mini Lesson</p>
        <p className="text-purple-200/80">{question.miniLesson}</p>
      </div>

      {/* Extra Practice */}
      {question.extraPractice && (
        <div className="rounded-lg border border-purple-700/30 bg-purple-900/30 p-4">
          <p className="mb-2 font-semibold text-purple-300">🏋️ Extra Practice</p>
          <p className="mb-2 text-purple-100">{question.extraPractice.question}</p>
          <ul className="mb-2 space-y-1 text-purple-200/80">
            {question.extraPractice.choices.map((c, i) => (
              <li key={i}>{i + 1}. {c}</li>
            ))}
          </ul>
          <p className="text-green-400">Answer: {question.extraPractice.answer}</p>
          <p className="mt-1 text-purple-200/70">{question.extraPractice.explanation}</p>
        </div>
      )}
    </div>
  )
}
