import { examSets } from '../data/examSets/index.js'
import SpeakButton from './SpeakButton'

export default function ExplanationPanel({ question }) {
  let originalQuestion = null
  for (const set of Object.values(examSets)) {
    const found = set.questions.find((q) => q.id === question.id)
    if (found) {
      originalQuestion = found
      break
    }
  }

  const originalChoices = originalQuestion ? originalQuestion.choices : question.choices

  const getWhyWrong = (choice) => {
    const originalIdx = originalChoices.indexOf(choice)
    if (originalIdx === -1) return ''
    return question.whyWrong[String(originalIdx + 1)] || ''
  }

  return (
    <div className="mt-4 space-y-4 rounded-xl border border-purple-600/30 bg-purple-950/50 p-5 text-sm">
      <h4 className="text-base font-semibold text-purple-200">Detailed Explanation</h4>

      <div>
        <div className="flex flex-wrap items-center gap-2 font-semibold text-green-400">
          <span>Correct Answer: {question.correctAnswer}</span>
          <SpeakButton text={question.correctAnswer} label="Answer" size="sm" />
        </div>
      </div>

      <div>
        <p className="mb-1 font-semibold text-purple-300">Thai Explanation</p>
        <p className="text-purple-200/80">{question.explanationThai}</p>
      </div>

      <div>
        <div className="mb-1 flex flex-wrap items-center gap-2 font-semibold text-purple-300">
          <span>English Explanation</span>
          <SpeakButton text={question.explanationEnglish} label="Explain" size="sm" />
        </div>
        <p className="text-purple-200/80">{question.explanationEnglish}</p>
      </div>

      <div>
        <p className="mb-1 font-semibold text-purple-300">Why this is correct</p>
        <p className="text-purple-200/80">{question.whyCorrect}</p>
      </div>

      <div>
        <p className="mb-1 font-semibold text-purple-300">Why other choices are wrong</p>
        <ul className="space-y-2 text-purple-200/70">
          {question.choices.map((choice, idx) => {
            const whyText = getWhyWrong(choice)
            if (!whyText) return null
            return (
              <li key={idx} className="flex flex-wrap items-start gap-2">
                <span className="font-medium text-purple-300">{idx + 1}. {choice}:</span>
                <span className="min-w-0 flex-1">{whyText}</span>
                <SpeakButton text={choice} label={`Choice ${idx + 1}`} size="sm" />
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <p className="mb-1 font-semibold text-purple-300">Exam Trick</p>
        <p className="text-purple-200/80">{question.examTrick}</p>
      </div>

      <div>
        <p className="mb-1 font-semibold text-purple-300">Common Mistake (Thai Students)</p>
        <p className="text-purple-200/80">{question.commonMistake}</p>
      </div>

      <div>
        <p className="mb-1 font-semibold text-purple-300">Mini Lesson</p>
        <p className="text-purple-200/80">{question.miniLesson}</p>
      </div>

      {question.extraPractice && (
        <div className="rounded-lg border border-purple-700/30 bg-purple-900/30 p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2 font-semibold text-purple-300">
            <span>Extra Practice</span>
            <SpeakButton text={question.extraPractice.question} label="Question" size="sm" />
          </div>
          <p className="mb-2 text-purple-100">{question.extraPractice.question}</p>
          <ul className="mb-2 space-y-1 text-purple-200/80">
            {question.extraPractice.choices.map((choice, idx) => (
              <li key={idx} className="flex flex-wrap items-center gap-2">
                <span>{idx + 1}. {choice}</span>
                <SpeakButton text={choice} label={`Choice ${idx + 1}`} size="sm" />
              </li>
            ))}
          </ul>
          <p className="text-green-400">Answer: {question.extraPractice.answer}</p>
          <p className="mt-1 text-purple-200/70">{question.extraPractice.explanation}</p>
        </div>
      )}
    </div>
  )
}
