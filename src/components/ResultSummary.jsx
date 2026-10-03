import Mascot from './Mascot'
import { Confetti, CountUp, ProgressRing } from './ui'

function getGrade(pct) {
  if (pct >= 90) return { label: 'Excellent', thai: 'ยอดเยี่ยมมาก!', color: 'text-emerald-300', mood: 'cheer' }
  if (pct >= 75) return { label: 'Good', thai: 'เก่งมาก ไปต่ออีกนิด!', color: 'text-sky-300', mood: 'cheer' }
  if (pct >= 60) return { label: 'Fair', thai: 'มาถูกทางแล้ว!', color: 'text-amber-300', mood: 'happy' }
  return { label: 'Needs Improvement', thai: 'ไม่เป็นไร ครูฮูกช่วยได้!', color: 'text-rose-300', mood: 'oops' }
}

export default function ResultSummary({ score, celebrate = true }) {
  const grade = getGrade(score.percentage)

  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
      {celebrate && score.percentage >= 75 && <Confetti />}
      <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-violet-500/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="relative flex flex-col items-center gap-8 md:flex-row">
        <ProgressRing percent={score.percentage} size={190}>
          <p className="font-display text-5xl font-semibold text-white"><CountUp value={`${score.percentage}%`} /></p>
          <p className="text-sm text-purple-300">{score.total}/{score.totalQuestions} ข้อ</p>
        </ProgressRing>
        <div className="flex-1 space-y-4 text-center md:text-left">
          <p className="eyebrow">Exam Results</p>
          <h2 className={`text-3xl font-semibold ${grade.color}`}>{grade.thai}</h2>
          <p className="text-purple-200/80">{grade.label} · {score.percentage}%</p>
          <div className="grid grid-cols-2 gap-3">
            <ScoreBar label="📖 Grammar" value={score.grammar} total={score.grammarQuestions} />
            <ScoreBar label="📚 Reading" value={score.reading} total={score.readingQuestions} />
          </div>
        </div>
        <Mascot mood={grade.mood} size={130} className="hidden shrink-0 lg:block" />
      </div>
    </div>
  )
}

function ScoreBar({ label, value, total }) {
  const pct = total ? Math.round((value / total) * 100) : 0
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4 text-left">
      <div className="flex items-center justify-between text-sm">
        <span className="text-purple-200">{label}</span>
        <span className="font-display font-semibold text-white">{value}/{total}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-all duration-1000" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
