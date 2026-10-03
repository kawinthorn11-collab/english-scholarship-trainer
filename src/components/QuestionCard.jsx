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
    <div className="glass rounded-[1.75rem] p-5 sm:p-8">
      {!hidePassage && question.passage && (
        <div className="mb-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-[15px] leading-relaxed text-purple-100/85">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="eyebrow">📚 Reading Passage</p>
            <SpeakButton text={question.passage} label="Read passage" variant="button" size="sm" />
          </div>
          {question.passage}
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-start gap-3">
        <span className="flex h-10 min-w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 px-2 font-display text-base font-semibold text-white shadow-lg shadow-fuchsia-900/30">
          {questionNumber}
        </span>
        <p className="min-w-0 flex-1 pt-1.5 text-lg font-medium leading-relaxed text-white sm:text-xl">
          {question.question}
        </p>
        <SpeakButton text={question.question} label="Question" size="sm" />
      </div>

      <div className="space-y-3">
        {question.choices.map((choice, idx) => {
          const choiceNum = idx + 1
          const isSelected = selectedAnswer === choice
          const isCorrect = choice === question.correctAnswer

          let tone = 'border-white/10 bg-white/[0.03] hover:border-violet-400/50 hover:bg-white/[0.07]'
          let badge = 'bg-white/10 text-purple-100 group-hover:bg-violet-500/40'
          let anim = ''

          if (isSelected && !showResult) {
            tone = 'border-violet-400 bg-violet-500/20 shadow-[0_0_0_4px_rgba(139,92,246,0.15)]'
            badge = 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white'
            anim = 'animate-pop'
          }

          if (showResult) {
            if (isCorrect) {
              tone = 'border-emerald-400/80 bg-emerald-500/15'
              badge = 'bg-emerald-500 text-white'
              anim = 'animate-pop'
            } else if (isSelected) {
              tone = 'border-rose-400/80 bg-rose-500/15'
              badge = 'bg-rose-500 text-white'
              anim = 'animate-shake'
            } else {
              tone = 'border-white/5 bg-white/[0.02] opacity-60'
            }
          }

          return (
            <div key={idx} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => !showResult && onSelect(choice)}
                disabled={showResult}
                className={`group flex min-w-0 flex-1 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[15px] text-white transition-all duration-200 sm:text-base ${tone} ${anim} ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition ${badge}`}>
                  {showResult && isCorrect ? '✓' : showResult && isSelected ? '✕' : choiceNum}
                </span>
                <span className="min-w-0 flex-1">{choice}</span>
                {showResult && isCorrect && <span className="shrink-0 text-xs font-bold text-emerald-300">ถูกต้อง</span>}
                {showResult && isSelected && !isCorrect && <span className="shrink-0 text-xs font-bold text-rose-300">คำตอบของคุณ</span>}
              </button>
              <SpeakButton text={choice} label={`Choice ${choiceNum}`} size="sm" />
            </div>
          )
        })}
      </div>

      {!hideSkillTag && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="chip">🏷 {question.skillTag}</span>
          <span className="chip">⚡ {question.difficulty}</span>
        </div>
      )}
    </div>
  )
}
