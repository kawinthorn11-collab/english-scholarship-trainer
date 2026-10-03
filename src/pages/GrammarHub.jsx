import { grammarLessons, findLessonsBySkillTags } from '../data/grammarLessons/index.js'
import { getAttempts, getGrammarProgress } from '../utils/storage'
import { examSets } from '../data/examSets/index.js'
import { PageHeader, SectionTitle, StatTile } from '../components/ui'

function countRelatedQuestions(skillTags) {
  let count = 0
  for (const set of Object.values(examSets)) {
    for (const q of set.questions) {
      if (skillTags.includes(q.skillTag)) count++
    }
  }
  return count
}

export default function GrammarHub({ onNavigate, onSelectLesson }) {
  const attempts = getAttempts()
  const progress = getGrammarProgress()
  const completedLessons = grammarLessons.filter((l) => l.status === 'available')
  const comingSoonLessons = grammarLessons.filter((l) => l.status !== 'available')
  const totalMiniQuiz = grammarLessons.reduce((sum, l) => sum + (l.miniQuiz?.length || 0), 0)
  const studiedCount = completedLessons.filter((l) => progress[l.id]?.studied).length
  const masteredCount = completedLessons.filter((l) => progress[l.id]?.mastered).length

  let weakSkillTags = []
  if (attempts.length > 0) {
    const latest = attempts[attempts.length - 1]
    if (latest.weakSkills) {
      weakSkillTags = latest.weakSkills.map((s) => s.skill).filter(Boolean)
    }
  }

  const recommendedLessons = weakSkillTags.length > 0
    ? findLessonsBySkillTags(weakSkillTags).filter((l) => l.status === 'available')
    : []
  const recommendedNext = recommendedLessons[0]
    || completedLessons.find((l) => !progress[l.id]?.studied)
    || completedLessons.find((l) => !progress[l.id]?.mastered)
    || completedLessons[0]

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Grammar Lessons"
        icon="📖"
        title="เรียน Grammar แบบเข้าใจจริง"
        subtitle="บทเรียนเป็นระบบ พร้อม exam traps, common mistakes, mini quizzes และข้อสอบที่เกี่ยวข้อง — ครูฮูกสรุปให้ทีละหัวข้อ"
        mood="teach"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon="📚" label="Available lessons" value={`${completedLessons.length}/20`} />
        <StatTile icon="✏️" label="Mini quiz bank" value={totalMiniQuiz} accent="from-amber-400/40 to-orange-500/10" />
        <StatTile icon="👀" label="Studied" value={studiedCount} accent="from-sky-400/40 to-blue-500/10" />
        <StatTile icon="🏆" label="Mastered" value={masteredCount} accent="from-emerald-400/40 to-teal-500/10" />
      </div>

      {recommendedNext && (
        <div className="rainbow-border rounded-[2rem]">
          <div className="flex flex-col gap-4 rounded-[1.95rem] bg-ink-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="eyebrow">⭐ Recommended next</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{recommendedNext.title}</h3>
              <p className="mt-1 text-sm text-purple-300/80">{recommendedNext.shortDescriptionThai}</p>
            </div>
            <button
              onClick={() => onSelectLesson(recommendedNext.id)}
              className="btn btn-primary shrink-0"
            >
              เริ่มบทเรียน →
            </button>
          </div>
        </div>
      )}

      {recommendedLessons.length > 0 && (
        <div>
          <SectionTitle icon="🎯" title="แนะนำจากผลสอบล่าสุด" />
          <div className="grid gap-4 sm:grid-cols-2">
            {recommendedLessons.map((l) => (
              <LessonCard
                key={l.id}
                lesson={l}
                progress={progress[l.id]}
                relatedCount={countRelatedQuestions(l.relatedSkillTags)}
                onSelect={() => onSelectLesson(l.id)}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <SectionTitle icon="🗂️" title="All Grammar Categories" subtitle="เลือกหัวข้อที่อยากเรียนได้เลย" />
        <div className="grid gap-4 sm:grid-cols-2">
          {completedLessons.map((l) => (
            <LessonCard
              key={l.id}
              lesson={l}
              progress={progress[l.id]}
              relatedCount={countRelatedQuestions(l.relatedSkillTags)}
              onSelect={() => onSelectLesson(l.id)}
            />
          ))}
        </div>
      </div>

      {comingSoonLessons.length > 0 && (
        <div>
          <SectionTitle icon="⏳" title="Coming soon" />
          <div className="grid gap-4 sm:grid-cols-2">
            {comingSoonLessons.map((l) => (
              <LessonCard
                key={l.id}
                lesson={l}
                progress={progress[l.id]}
                relatedCount={countRelatedQuestions(l.relatedSkillTags)}
                onSelect={() => {}}
              />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onNavigate('dashboard')}
        className="text-sm font-semibold text-purple-300 transition hover:text-white"
      >
        Back to Dashboard
      </button>
    </div>
  )
}

function LessonCard({ lesson, progress, relatedCount, onSelect }) {
  const isAvailable = lesson.status === 'available'
  const studied = progress?.studied
  const mastered = progress?.mastered
  const bestScore = progress?.bestQuizScore

  return (
    <button
      onClick={onSelect}
      disabled={!isAvailable}
      className={`glow-card rounded-3xl border p-5 text-left transition ${
        isAvailable
          ? 'border-white/[0.08] bg-white/[0.03] hover:border-violet-400/50 hover:bg-white/[0.07] cursor-pointer'
          : 'border-white/[0.05] bg-white/[0.03] cursor-not-allowed opacity-60'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="font-display text-lg font-semibold text-white">{lesson.title}</p>
          <p className="text-xs text-purple-300/80">{lesson.titleThai}</p>
        </div>
        {!isAvailable && (
          <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs text-purple-300">
            Coming soon
          </span>
        )}
        {isAvailable && mastered && (
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-200">
            Mastered
          </span>
        )}
        {isAvailable && studied && !mastered && (
          <span className="rounded-full bg-violet-500/25 px-2 py-0.5 text-xs text-purple-200">
            Studied
          </span>
        )}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-purple-300/70">
        {lesson.shortDescriptionThai}
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-purple-300">
          {lesson.level}
        </span>
        <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-purple-300">
          {relatedCount} exam Q
        </span>
        <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-purple-300">
          {lesson.miniQuiz?.length || 0} quiz Q
        </span>
        {lesson.estimatedStudyMinutes && (
          <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-purple-300">
            {lesson.estimatedStudyMinutes} min
          </span>
        )}
        {bestScore > 0 && (
          <span className="rounded-full bg-blue-900/40 px-2 py-0.5 text-blue-300">
            Best: {bestScore}%
          </span>
        )}
      </div>
    </button>
  )
}
