import { examSets } from '../data/examSets/index.js'
import SpeakButton from './SpeakButton'
import Mascot from './Mascot'
import { ListenButton } from './Duo'

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
    <div className="glass mt-5 space-y-5 rounded-[1.75rem] p-5 text-[15px] sm:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <Mascot character="buffalo" mood="teach" size={64} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-lg font-semibold text-white">ครูควายอธิบาย</h4>
          <p className="text-xs text-purple-300/80">Detailed Explanation</p>
        </div>
        <ListenButton text={`${question.explanationThai || ''} ${question.examTrick || ''}`} speaker="buffalo" label="ฟังคำอธิบาย" />
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 font-semibold text-emerald-200">
        <span>✅ Correct Answer: {question.correctAnswer}</span>
        <SpeakButton text={question.correctAnswer} label="Answer" size="sm" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Block icon="🇹🇭" title="อธิบายภาษาไทย">{question.explanationThai}</Block>
        <Block icon="🇬🇧" title="English Explanation" speak={question.explanationEnglish}>{question.explanationEnglish}</Block>
      </div>

      <Block icon="🎯" title="Why this is correct">{question.whyCorrect}</Block>

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
        <p className="mb-3 flex items-center gap-2 font-semibold text-purple-100"><span>🚫</span>Why other choices are wrong</p>
        <ul className="space-y-2.5 text-purple-100/80">
          {question.choices.map((choice, idx) => {
            const whyText = getWhyWrong(choice)
            if (!whyText) return null
            return (
              <li key={idx} className="flex flex-wrap items-start gap-2 rounded-xl bg-white/[0.03] px-3 py-2.5">
                <span className="font-semibold text-rose-200">{idx + 1}. {choice}</span>
                <span className="min-w-0 flex-1 basis-full sm:basis-0">{whyText}</span>
                <SpeakButton text={choice} label={`Choice ${idx + 1}`} size="sm" />
              </li>
            )
          })}
        </ul>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Block icon="🧠" title="Exam Trick" tone="violet">{question.examTrick}</Block>
        <Block icon="⚠️" title="Common Mistake" tone="rose">{question.commonMistake}</Block>
        <Block icon="📘" title="Mini Lesson" tone="sky">{question.miniLesson}</Block>
      </div>

      {question.extraPractice && (
        <div className="rounded-2xl border border-fuchsia-400/25 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/5 p-5">
          <div className="mb-2 flex flex-wrap items-center gap-2 font-semibold text-fuchsia-100">
            <span>✏️ Extra Practice</span>
            <SpeakButton text={question.extraPractice.question} label="Question" size="sm" />
          </div>
          <p className="mb-3 text-white">{question.extraPractice.question}</p>
          <ul className="mb-3 space-y-1.5 text-purple-100/85">
            {question.extraPractice.choices.map((choice, idx) => (
              <li key={idx} className="flex flex-wrap items-center gap-2">
                <span>{idx + 1}. {choice}</span>
                <SpeakButton text={choice} label={`Choice ${idx + 1}`} size="sm" />
              </li>
            ))}
          </ul>
          <details className="rounded-xl bg-white/[0.04] px-4 py-3">
            <summary className="cursor-pointer font-semibold text-emerald-300">ดูเฉลย</summary>
            <p className="mt-2 text-emerald-300">Answer: {question.extraPractice.answer}</p>
            <p className="mt-1 text-purple-100/75">{question.extraPractice.explanation}</p>
          </details>
        </div>
      )}
    </div>
  )
}

const blockTones = {
  default: 'border-white/[0.07] bg-white/[0.03]',
  violet: 'border-violet-400/25 bg-violet-500/10',
  rose: 'border-rose-400/25 bg-rose-500/10',
  sky: 'border-sky-400/25 bg-sky-500/10',
}

function Block({ icon, title, children, speak, tone = 'default' }) {
  if (!children) return null
  return (
    <div className={`rounded-2xl border p-4 ${blockTones[tone]}`}>
      <div className="mb-2 flex flex-wrap items-center gap-2 font-semibold text-purple-50">
        <span>{icon}</span>
        <span>{title}</span>
        {speak && <SpeakButton text={speak} label="Explain" size="sm" />}
      </div>
      <p className="leading-relaxed text-purple-100/80">{children}</p>
    </div>
  )
}
