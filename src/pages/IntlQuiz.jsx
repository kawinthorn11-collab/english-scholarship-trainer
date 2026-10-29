import Mascot, { SpeechBubble } from '../components/Mascot'
import QuizRunner from '../components/QuizRunner'
import { ListenButton } from '../components/Duo'
import { getIntlTest } from '../data/intlTests'
import { addMistake, saveIntlBest as saveBest } from '../utils/learningStore'
import { recordQuestionAnswered } from '../utils/localStats'

export default function IntlQuiz({ testId, onNavigate }) {
  const test = getIntlTest(testId)

  if (!test) {
    return (
      <div className="glass mx-auto max-w-md space-y-4 rounded-[2rem] p-8 text-center">
        <Mascot character="buffalo" mood="oops" size={120} className="mx-auto" />
        <p className="text-purple-100">ไม่พบชุดข้อสอบนี้</p>
        <button onClick={() => onNavigate('tests')} className="btn btn-primary">กลับคลังข้อสอบ</button>
      </div>
    )
  }

  const onAnswer = (q, correct) => {
    recordQuestionAnswered(test.id, correct)
    if (!correct) {
      addMistake({
        id: `intl-${q.id}`,
        source: `${test.style} · ${test.title}`,
        question: q.question,
        passage: test.passage || '',
        choices: q.choices,
        answer: q.answer,
        explain: q.explain,
      })
    }
  }

  return (
    <div className="space-y-6">
      <header className="relative overflow-hidden rounded-[2rem] border border-white/15 p-6 sm:p-7">
        <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${test.color} opacity-25`} />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1 space-y-2">
            <p className="eyebrow">{test.emoji} {test.style}</p>
            <h1 className="text-3xl font-semibold text-white">{test.title}</h1>
            <p className="text-purple-50/85">{test.titleThai}</p>
          </div>
          <div className="flex shrink-0 items-end -space-x-4">
            <Mascot character="pig" mood="happy" size={90} />
            <Mascot character="buffalo" mood="teach" size={96} />
          </div>
        </div>
        <div className="relative mt-5 grid gap-3 md:grid-cols-2">
          {test.coach.map((line, i) => (
            <SpeechBubble key={i} text={line.text} tone={line.who} side="bottom" />
          ))}
        </div>
        <div className="relative mt-4">
          <ListenButton text={test.coach.map((l) => l.text)} speaker="buffalo" label="ฟังวิธีทำข้อสอบแนวนี้" />
        </div>
      </header>

      <QuizRunner
        key={test.id}
        questions={test.questions}
        keepOrder={test.keepOrder}
        passage={test.passage}
        passageTitle={test.passageTitle}
        onAnswer={onAnswer}
        onFinish={(score, total) => saveBest(test.id, Math.round((score / total) * 100))}
        onExit={() => onNavigate('tests')}
        exitLabel="← คลังข้อสอบ"
      />
    </div>
  )
}
