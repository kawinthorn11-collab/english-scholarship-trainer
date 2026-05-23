import SpeakButton from './SpeakButton'

export default function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
  showResult,
  questionNumber,
  hideSkillTag = false,
  hidePassage = false,
}) {
  return (
    <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-6">
      {!hidePassage && question.passage && (
        <div className="mb-4 rounded-lg border border-purple-700/30 bg-purple-950/40 p-4 text-sm leading-relaxed text-purple-200/80">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Reading Passage</p>
            <SpeakButton text={question.passage} label="Read passage" variant="button" size="sm" />
          </div>
          {question.passage}
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-start gap-2">
        <p className="min-w-0 flex-1 text-lg font-medium text-purple-100">
          <span className="mr-2 text-purple-400">Q{questionNumber}.</span>
          {question.question}
        </p>
        <SpeakButton text={question.question} label="Question" variant="button" size="sm" />
      </div>

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
            <div key={idx} className="flex items-stretch gap-2">
              <button
                type="button"
                onClick={() => !showResult && onSelect(choice)}
                disabled={showResult}
                className={`min-w-0 flex-1 rounded-lg border p-3 text-left text-purple-100 transition ${borderClass} ${bgClass} ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className="mr-2 font-bold text-purple-400">{choiceNum}.</span>
                {choice}
                {showResult && isCorrect && <span className="ml-2 text-green-400">Correct</span>}
                {showResult && isSelected && !isCorrect && <span className="ml-2 text-red-400">Try again</span>}
              </button>
              <SpeakButton text={choice} label={`Choice ${choiceNum}`} size="sm" />
            </div>
          )
        })}
      </div>

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
