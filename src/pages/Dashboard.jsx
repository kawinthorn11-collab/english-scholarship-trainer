import { getAttempts, getGrammarProgress } from '../utils/storage'
import { getStatsFromAttempts } from '../utils/analysis'
import { examSetList, getExamSet } from '../data/examSets/index.js'
import { findLessonsBySkillTags, getAvailableLessons } from '../data/grammarLessons/index.js'
import GlobalStatsPanel from '../components/GlobalStatsPanel'
import ComicCoach from '../components/ComicCoach'
import SpeakButton from '../components/SpeakButton'
import { SectionTitle, StatTile } from '../components/ui'
import { getLocalStats } from '../utils/localStats'
import { getWordOfTheDay } from '../data/mascotTips'
import { useAuth } from '../context/AuthContext'

const quickActions = [
  { key: 'class', icon: '🐷', title: 'ห้องเรียนหมูควาย', desc: 'ฟังสอนบทละ 1 นาที', tone: 'from-pink-500 to-orange-400', primary: true },
  { key: 'mock-exam', icon: '📝', title: 'Mock Exam', desc: '60 ข้อ · จับเวลาจริง', tone: 'from-violet-600 to-indigo-600' },
  { key: 'practice', icon: '🏋️', title: 'Practice', desc: 'ฝึกทีละข้อ เฉลยทันที', tone: 'from-fuchsia-600 to-pink-600' },
  { key: 'grammar', icon: '📖', title: 'Grammar', desc: 'บทเรียน + drill', tone: 'from-amber-500 to-orange-600' },
  { key: 'academy', icon: '🎓', title: 'Academy', desc: 'คอร์สเป็นระบบ', tone: 'from-emerald-500 to-teal-600' },
  { key: 'listening', icon: '🎧', title: 'ฟังเสียง', desc: 'Native listening', tone: 'from-sky-500 to-blue-600' },
]

function getGreeting(name) {
  const hour = new Date().getHours()
  const who = name ? ` ${name}` : ''
  if (hour < 12) return `อรุณสวัสดิ์${who} ☀️`
  if (hour < 17) return `สวัสดีตอนบ่าย${who} 👋`
  return `สวัสดีตอนเย็น${who} 🌙`
}

export default function Dashboard({ onNavigate, selectedSetId, onChangeSet, onSelectLesson }) {
  const { user } = useAuth()
  const attempts = getAttempts()
  const setAttempts = attempts.filter((a) => a.setId === selectedSetId)
  const stats = getStatsFromAttempts(setAttempts)
  const selectedSet = getExamSet(selectedSetId)
  const grammarProgress = getGrammarProgress()
  const localStats = getLocalStats()
  const word = getWordOfTheDay()

  // Weak skills from latest attempt
  let weakSkills = []
  let weakSkillTags = []
  if (setAttempts.length > 0) {
    const latest = setAttempts[setAttempts.length - 1]
    if (latest.weakSkills) {
      weakSkills = latest.weakSkills
      weakSkillTags = weakSkills.map((s) => s.skill).filter(Boolean)
    }
  }

  // Recommended grammar lessons based on weak skills
  const recommendedLessons = weakSkillTags.length > 0
    ? findLessonsBySkillTags(weakSkillTags).filter((l) => l.status === 'available')
    : []

  // Weak grammar categories — group weak skills by lesson
  const weakGrammarCategories = []
  for (const ws of weakSkills) {
    const lessons = findLessonsBySkillTags([ws.skill]).filter((l) => l.status === 'available')
    for (const lesson of lessons) {
      if (!weakGrammarCategories.some((w) => w.id === lesson.id)) {
        weakGrammarCategories.push({ ...lesson, weakRate: `${ws.correct}/${ws.total}` })
      }
    }
  }

  const availableLessons = getAvailableLessons()
  const studiedLessons = Object.keys(grammarProgress).filter((id) => grammarProgress[id]?.studied).length
  const lessonPercent = availableLessons.length ? Math.round((studiedLessons / availableLessons.length) * 100) : 0
  const scoreHistory = setAttempts.slice(-10).map((a) => a.score?.percentage || 0)

  return (
    <div className="space-y-10 sm:space-y-12">
      <ComicCoach onNavigate={onNavigate} greeting={getGreeting(user?.user_metadata?.display_name)} />

      {/* Quick actions */}
      <section>
        <SectionTitle icon="⚡" title="เริ่มเรียนอะไรดี?" subtitle="เลือกโหมดที่อยากฝึกวันนี้" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {quickActions.map((a) => (
            <button
              key={a.key}
              onClick={() => onNavigate(a.key)}
              className={`group relative overflow-hidden rounded-[1.75rem] p-5 text-left transition duration-300 hover:-translate-y-1.5 ${a.primary ? 'col-span-2 md:col-span-1 ring-2 ring-white/40' : ''} bg-gradient-to-br ${a.tone} shadow-[0_20px_40px_-24px_rgba(0,0,0,0.9)]`}
            >
              <span aria-hidden className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-xl transition-transform duration-500 group-hover:scale-150" />
              <span className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl backdrop-blur transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">{a.icon}</span>
              <span className="relative block font-display text-lg font-semibold text-white">{a.title}</span>
              <span className="relative block text-xs text-white/80">{a.desc}</span>
              <span aria-hidden className="absolute bottom-5 right-5 text-white/70 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* Personal progress */}
      <section>
        <SectionTitle icon="🌱" title="ความคืบหน้าของฉัน" subtitle="บันทึกไว้บนอุปกรณ์นี้อัตโนมัติ" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <StatTile icon="☀️" label="เรียนวันนี้" value={`${Math.round((localStats.todayStudySeconds || 0) / 60)}m`} accent="from-amber-400/40 to-orange-500/10" />
          <StatTile icon="⏳" label="เวลาเรียนรวม" value={`${((localStats.totalStudySeconds || 0) / 3600).toFixed(1)}h`} />
          <StatTile icon="🔥" label="Streak" value={`${localStats.streakDays || 0} วัน`} accent="from-rose-400/40 to-orange-500/10" />
          <StatTile icon="📝" label="ทำข้อสอบแล้ว" value={localStats.examsCompleted || 0} accent="from-sky-400/40 to-blue-500/10" />
          <StatTile icon="📘" label="บทเรียนที่จบ" value={localStats.grammarLessonsCompleted || 0} accent="from-emerald-400/40 to-teal-500/10" />
          <StatTile icon="🎧" label="ฟังแล้ว" value={localStats.listenedItems || 0} accent="from-fuchsia-400/40 to-pink-500/10" />
        </div>
      </section>

      {/* Scores + word of the day */}
      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass rounded-[2rem] p-6 sm:p-7">
          <SectionTitle icon="📈" title="คะแนนของชุดนี้" subtitle={selectedSet?.title} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniStat label="Attempts" value={stats.total} />
            <MiniStat label="Best" value={stats.total > 0 ? `${stats.best}%` : '-'} />
            <MiniStat label="Latest" value={stats.total > 0 ? `${stats.latest}%` : '-'} />
            <MiniStat label="Average" value={stats.total > 0 ? `${stats.average}%` : '-'} />
          </div>
          <Sparkline values={scoreHistory} />
        </div>

        <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-7">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl" />
          <p className="eyebrow">📅 Word of the day</p>
          <div className="mt-4 flex items-center gap-3">
            <h3 className="font-display text-4xl font-semibold text-white">{word.word}</h3>
            <SpeakButton text={word.word} size="md" />
          </div>
          <p className="mt-1 text-sm text-purple-300">{word.type} · <span className="text-amber-200">{word.thai}</span></p>
          <div className="mt-5 flex items-start gap-2 rounded-2xl bg-white/[0.05] p-4">
            <p className="min-w-0 flex-1 text-[15px] italic leading-relaxed text-purple-50">“{word.example}”</p>
            <SpeakButton text={word.example} size="sm" />
          </div>
        </div>
      </section>

      {/* Exam set selector */}
      <section>
        <SectionTitle icon="📚" title="เลือกชุดข้อสอบ" subtitle={selectedSet?.description} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {examSetList.map((set) => {
            const active = set.setId === selectedSetId
            return (
              <button
                key={set.setId}
                onClick={() => onChangeSet(set.setId)}
                className={`relative overflow-hidden rounded-3xl border p-5 text-left transition duration-300 hover:-translate-y-1 ${active
                  ? 'border-violet-400/70 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/15 shadow-[0_20px_50px_-25px_rgba(168,85,247,0.8)]'
                  : 'border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                {active && <span className="absolute right-4 top-4 flex h-7 w-7 animate-pop items-center justify-center rounded-full bg-violet-500 text-sm text-white">✓</span>}
                <p className="pr-8 font-display text-lg font-semibold text-white">{set.title}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="chip">❓ {set.totalQuestions} ข้อ</span>
                  <span className="chip">⏱ {set.timeLimitMinutes} นาที</span>
                  <span className="chip">⚡ {set.difficulty}</span>
                </div>
                <p className="mt-3 text-xs text-purple-300/80">Grammar {set.grammarCount} · Reading {set.readingCount}</p>
              </button>
            )
          })}
        </div>
      </section>

      {/* Recommended Grammar Lessons (if weak skills exist) */}
      {recommendedLessons.length > 0 && (
        <section>
          <SectionTitle icon="🎯" title="บทเรียนที่หมูควายแนะนำ" subtitle="จากผลสอบล่าสุด คุณอาจอยากเริ่มจากบทเรียนเหล่านี้" />
          <div className="grid gap-4 sm:grid-cols-2">
            {recommendedLessons.slice(0, 4).map((l) => (
              <button
                key={l.id}
                onClick={() => onSelectLesson(l.id)}
                className="glass glow-card group flex items-center gap-4 rounded-3xl p-5 text-left transition hover:-translate-y-1"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/20 text-2xl">📘</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-white">{l.title}</span>
                  <span className="block text-sm text-purple-300/80">{l.titleThai}</span>
                </span>
                <span className="text-purple-300 transition group-hover:translate-x-1">→</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Weak Grammar Categories */}
      {weakGrammarCategories.length > 0 && (
        <section className="rounded-[2rem] border border-rose-400/20 bg-gradient-to-br from-rose-500/10 to-transparent p-6 sm:p-7">
          <SectionTitle icon="⚠️" title="จุดที่ต้องซ่อม" subtitle="กดเพื่อไปเรียนเรื่องนั้นทันที" />
          <div className="grid gap-3 sm:grid-cols-2">
            {weakGrammarCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectLesson(cat.id)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-rose-400/15 bg-rose-500/[0.07] px-5 py-4 text-left transition hover:-translate-y-0.5 hover:bg-rose-500/15"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-rose-100">{cat.title}</p>
                  <p className="text-xs text-rose-200/70">{cat.titleThai}</p>
                </div>
                <span className="shrink-0 rounded-full bg-rose-500/25 px-3 py-1 text-sm font-bold text-rose-100">
                  {cat.weakRate}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Grammar progress summary */}
      {availableLessons.length > 0 && (
        <section className="glass flex flex-col gap-5 rounded-[2rem] p-6 sm:flex-row sm:items-center sm:p-7">
          <div className="min-w-0 flex-1">
            <p className="eyebrow">📚 Grammar Learning Progress</p>
            <p className="mt-2 text-lg text-white">
              ศึกษาแล้ว <b className="gradient-text font-display text-2xl">{studiedLessons}</b> จาก {availableLessons.length} บทเรียน
            </p>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 transition-all duration-1000" style={{ width: `${Math.max(lessonPercent, 3)}%` }} />
            </div>
          </div>
          <button onClick={() => onNavigate('grammar')} className="btn btn-primary shrink-0">
            🚀 ไปเรียน Grammar
          </button>
        </section>
      )}

      {/* Recent Attempts */}
      {attempts.length > 0 && (
        <section className="glass rounded-[2rem] p-6 sm:p-7">
          <SectionTitle icon="📋" title="ประวัติการสอบล่าสุด" action={<button onClick={() => onNavigate('results')} className="chip transition hover:bg-violet-500/30">ดูผลละเอียด →</button>} />
          <div className="space-y-2.5">
            {attempts.slice(-5).reverse().map((a, i) => (
              <div key={i} className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl bg-white/[0.04] px-4 py-3 text-sm transition hover:bg-white/[0.07]">
                <span className={`flex h-11 w-14 items-center justify-center rounded-xl font-display text-base font-semibold ${a.score.percentage >= 75 ? 'bg-emerald-500/20 text-emerald-200' : a.score.percentage >= 50 ? 'bg-amber-500/20 text-amber-100' : 'bg-rose-500/20 text-rose-200'}`}>
                  {a.score.percentage}%
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-white">{a.setTitle || a.setId || 'legacy'}</span>
                  <span className="block text-xs text-purple-300/80">{new Date(a.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </span>
                <span className="text-xs text-purple-200/80">
                  Grammar {a.score.grammar}/{a.score.grammarQuestions} · Reading {a.score.reading}/{a.score.readingQuestions}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <GlobalStatsPanel />
    </div>
  )
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-center">
      <p className="text-xs text-purple-300/80">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-white">{value}</p>
    </div>
  )
}

function Sparkline({ values }) {
  if (values.length < 2) {
    return (
      <p className="mt-6 rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-purple-300/80">
        ทำข้อสอบอย่างน้อย 2 ครั้งเพื่อดูกราฟพัฒนาการ 📈
      </p>
    )
  }
  const w = 320
  const h = 90
  const pad = 8
  const points = values.map((v, i) => {
    const x = pad + (i * (w - pad * 2)) / (values.length - 1)
    const y = h - pad - (Math.max(0, Math.min(100, v)) / 100) * (h - pad * 2)
    return [x, y]
  })
  const line = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const area = `${line} L${points[points.length - 1][0]} ${h} L${points[0][0]} ${h} Z`

  return (
    <div className="mt-6">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="img" aria-label={`Score trend: ${values.join(', ')}%`}>
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="spark-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#spark-fill)" />
        <path d={line} fill="none" stroke="url(#spark-line)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === points.length - 1 ? 5 : 3} fill={i === points.length - 1 ? '#f472b6' : '#c4b5fd'} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <p className="mt-1 text-right text-xs text-purple-300/70">{values.length} ครั้งล่าสุด</p>
    </div>
  )
}
