import { grammarLessons, findLessonsBySkillTags } from '../data/grammarLessons/index.js'
import { getAttempts, getGrammarProgress } from '../utils/storage'
import { examSets } from '../data/examSets/index.js'
import ComicCoach from '../components/ComicCoach'

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-purple-100">Grammar Lessons</h1>
        <p className="mt-1 text-sm text-purple-300">
          เรียน grammar แบบเป็นระบบ พร้อม exam traps, common mistakes, mini quizzes และข้อสอบที่เกี่ยวข้อง
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <StatPill label="Available lessons" value={`${completedLessons.length}/20`} />
        <StatPill label="Mini quiz bank" value={totalMiniQuiz} />
        <StatPill label="Studied" value={studiedCount} />
        <StatPill label="Mastered" value={masteredCount} />
      </div>

      <ComicCoach onNavigate={onNavigate} />

      {recommendedNext && (
        <div className="rounded-lg border border-purple-600/40 bg-purple-900/20 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-purple-400">Recommended next</p>
              <h3 className="mt-1 text-lg font-semibold text-purple-100">{recommendedNext.title}</h3>
              <p className="mt-1 text-sm text-purple-300/80">{recommendedNext.shortDescriptionThai}</p>
            </div>
            <button
              onClick={() => onSelectLesson(recommendedNext.id)}
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
            >
              Start lesson
            </button>
          </div>
        </div>
      )}

      {recommendedLessons.length > 0 && (
        <div className="rounded-lg border border-purple-600/40 bg-purple-900/20 p-5">
          <h3 className="mb-3 text-lg font-semibold text-purple-200">Recommended from your latest result</h3>
          <div className="grid gap-3 sm:grid-cols-2">
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
        <h3 className="mb-3 text-lg font-semibold text-purple-200">All Grammar Categories</h3>
        <div className="grid gap-3 sm:grid-cols-2">
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
          <h3 className="mb-3 text-lg font-semibold text-purple-200">Coming soon</h3>
          <div className="grid gap-3 sm:grid-cols-2">
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
        className="text-sm text-purple-400 underline transition hover:text-purple-200"
      >
        Back to Dashboard
      </button>
    </div>
  )
}

function StatPill({ label, value }) {
  return (
    <div className="rounded-lg border border-purple-700/40 bg-purple-900/20 p-4">
      <p className="text-xs text-purple-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-purple-100">{value}</p>
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
      className={`rounded-lg border p-4 text-left transition ${
        isAvailable
          ? 'border-purple-700/40 bg-purple-900/10 hover:border-purple-500/60 hover:bg-purple-900/30 cursor-pointer'
          : 'border-purple-900/40 bg-purple-950/30 cursor-not-allowed opacity-60'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="font-semibold text-purple-100">{lesson.title}</p>
          <p className="text-xs text-purple-400">{lesson.titleThai}</p>
        </div>
        {!isAvailable && (
          <span className="rounded-full bg-purple-900/60 px-2 py-0.5 text-xs text-purple-300">
            Coming soon
          </span>
        )}
        {isAvailable && mastered && (
          <span className="rounded-full bg-green-900/40 px-2 py-0.5 text-xs text-green-300">
            Mastered
          </span>
        )}
        {isAvailable && studied && !mastered && (
          <span className="rounded-full bg-purple-700/40 px-2 py-0.5 text-xs text-purple-200">
            Studied
          </span>
        )}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-purple-300/70">
        {lesson.shortDescriptionThai}
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-purple-800/50 px-2 py-0.5 text-purple-300">
          {lesson.level}
        </span>
        <span className="rounded-full bg-purple-800/50 px-2 py-0.5 text-purple-300">
          {relatedCount} exam Q
        </span>
        <span className="rounded-full bg-purple-800/50 px-2 py-0.5 text-purple-300">
          {lesson.miniQuiz?.length || 0} quiz Q
        </span>
        {lesson.estimatedStudyMinutes && (
          <span className="rounded-full bg-purple-800/50 px-2 py-0.5 text-purple-300">
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
