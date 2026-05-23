export default function QuestionCard({ question, selectedAnswer, onSelect, showResult, questionNumber, hideSkillTag = false, hidePassage = false }) {
  return (
    <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-6">
      {/* Passage — can be hidden when shown in a grouped panel */}
      {!hidePassage && question.passage && (
        <div className="mb-4 rounded-lg border border-purple-700/30 bg-purple-950/40 p-4 text-sm leading-relaxed text-purple-200/80">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-purple-400">Reading Passage</p>
          {question.passage}
        </div>
      )}

      {/* Question */}
      <p className="mb-4 text-lg font-medium text-purple-100">
        <span className="mr-2 text-purple-400">Q{questionNumber}.</span>
        {question.question}
      </p>

      {/* Choices */}
      <div className="space-y-2">
        {question.choices.map((choice, idx) => {
          const choiceNum = idx + 1
          const isSelected = selectedAnswer === choice
          const isCorrect = choice === question.correctAnswer

          let borderClass = 'border-purple-700/40 hover:border-purple-500/60'
          let bgClass = 'bg-purple-900/10 hover:bg-purple-900/30'

          if (isSelected && !showResult) {
            borderClass = 'border-purple-400'
            bgClass = 'bg-purple-800/40'
          }

          if (showResult) {
            if (isCorrect) {
              borderClass = 'border-green-500'
              bgClass = 'bg-green-900/30'
            } else if (isSelected && !isCorrect) {
              borderClass = 'border-red-500'
              bgClass = 'bg-red-900/30'
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => !showResult && onSelect(choice)}
              disabled={showResult}
              className={`w-full rounded-lg border p-3 text-left text-purple-100 transition ${borderClass} ${bgClass} ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className="mr-2 font-bold text-purple-400">{choiceNum}.</span>
              {choice}
              {showResult && isCorrect && <span className="ml-2 text-green-400">✓</span>}
              {showResult && isSelected && !isCorrect && <span className="ml-2 text-red-400">✗</span>}
            </button>
          )
        })}
      </div>

      {/* Skill tag — hidden during exam */}
      {!hideSkillTag && (
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-purple-800/50 px-3 py-1 text-xs text-purple-300">
            {question.skillTag}
          </span>
          <span className="rounded-full bg-purple-800/50 px-3 py-1 text-xs text-purple-300">
            {question.difficulty}
          </span>
        </div>
      )}
    </div>
  )
}
