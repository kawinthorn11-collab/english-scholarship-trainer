import { getAttempts, getGrammarProgress } from '../utils/storage'
import { getStatsFromAttempts } from '../utils/analysis'
import { examSetList, getExamSet } from '../data/examSets/index.js'
import { findLessonsBySkillTags, getAvailableLessons } from '../data/grammarLessons/index.js'

export default function Dashboard({ onNavigate, selectedSetId, onChangeSet, onSelectLesson }) {
  const attempts = getAttempts()
  const setAttempts = attempts.filter((a) => a.setId === selectedSetId)
  const stats = getStatsFromAttempts(setAttempts)
  const selectedSet = getExamSet(selectedSetId)
  const grammarProgress = getGrammarProgress()

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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-purple-100">📊 Dashboard</h1>

      {/* Exam Set Selector */}
      <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-5">
        <h3 className="mb-3 text-lg font-semibold text-purple-200">📚 Select Exam Set</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {examSetList.map((set) => (
            <button
              key={set.setId}
              onClick={() => onChangeSet(set.setId)}
              className={`rounded-lg border p-4 text-left transition ${
                set.setId === selectedSetId
                  ? 'border-purple-400 bg-purple-800/40'
                  : 'border-purple-700/40 bg-purple-900/10 hover:border-purple-500/60 hover:bg-purple-900/30'
              }`}
            >
              <p className="font-semibold text-purple-100">{set.title}</p>
              <p className="mt-1 text-xs text-purple-400">
                {set.totalQuestions} questions • {set.timeLimitMinutes} min • {set.difficulty}
              </p>
              <p className="mt-1 text-xs text-purple-500">
                Grammar: {set.grammarCount} | Reading: {set.readingCount}
              </p>
            </button>
          ))}
        </div>
      </div>

      {selectedSet && (
        <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-4">
          <p className="text-sm text-purple-400">Currently selected:</p>
          <p className="mt-1 font-semibold text-purple-100">{selectedSet.title}</p>
          <p className="mt-1 text-xs text-purple-400">{selectedSet.description}</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Attempts" value={stats.total} />
        <StatCard label="Best Score" value={stats.total > 0 ? `${stats.best}%` : '-'} />
        <StatCard label="Latest Score" value={stats.total > 0 ? `${stats.latest}%` : '-'} />
        <StatCard label="Average" value={stats.total > 0 ? `${stats.average}%` : '-'} />
      </div>

      {/* Recommended Grammar Lessons (if weak skills exist) */}
      {recommendedLessons.length > 0 && (
        <div className="rounded-xl border border-purple-600/40 bg-purple-900/20 p-5">
          <h3 className="mb-3 text-lg font-semibold text-purple-200">🎯 Recommended Grammar Lessons</h3>
          <p className="mb-3 text-xs text-purple-400">
            จากผลสอบล่าสุด คุณอาจอยากเริ่มจากบทเรียนเหล่านี้:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {recommendedLessons.slice(0, 4).map((l) => (
              <button
                key={l.id}
                onClick={() => onSelectLesson(l.id)}
                className="rounded-lg border border-purple-700/40 bg-purple-900/10 p-3 text-left transition hover:border-purple-500/60 hover:bg-purple-900/30"
              >
                <p className="font-medium text-purple-100">{l.title}</p>
                <p className="text-xs text-purple-400">{l.titleThai}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Weak Grammar Categories */}
      {weakGrammarCategories.length > 0 && (
        <div className="rounded-xl border border-red-700/40 bg-red-900/10 p-5">
          <h3 className="mb-3 text-lg font-semibold text-red-300">⚠️ Weak Grammar Categories</h3>
          <div className="space-y-2">
            {weakGrammarCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectLesson(cat.id)}
                className="flex w-full items-center justify-between rounded-lg bg-red-900/20 px-4 py-3 text-left transition hover:bg-red-900/40"
              >
                <div>
                  <p className="font-medium text-red-200">{cat.title}</p>
                  <p className="text-xs text-red-300/70">{cat.titleThai}</p>
                </div>
                <span className="rounded-full bg-red-800/50 px-3 py-1 text-sm font-bold text-red-300">
                  {cat.weakRate}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid gap-3 sm:grid-cols-4">
        <button
          onClick={() => onNavigate('mock-exam')}
          className="rounded-xl bg-purple-600 px-4 py-4 font-semibold text-white shadow-lg transition hover:bg-purple-500"
        >
          📝 Start Mock Exam
        </button>
        <button
          onClick={() => onNavigate('practice')}
          className="rounded-xl border border-purple-600 px-4 py-4 font-semibold text-purple-200 transition hover:bg-purple-900/40"
        >
          🏋️ Practice Mode
        </button>
        <button
          onClick={() => onNavigate('grammar')}
          className="rounded-xl border border-purple-600 px-4 py-4 font-semibold text-purple-200 transition hover:bg-purple-900/40"
        >
          📚 Grammar Lessons
        </button>
        <button
          onClick={() => onNavigate('academy')}
          className="rounded-xl border border-purple-600 px-4 py-4 font-semibold text-purple-200 transition hover:bg-purple-900/40"
        >
          Grammar Academy
        </button>
      </div>

      {/* Grammar progress summary */}
      {availableLessons.length > 0 && (
        <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-5">
          <h3 className="mb-3 text-lg font-semibold text-purple-200">📚 Grammar Learning Progress</h3>
          <p className="mb-3 text-xs text-purple-400">
            {availableLessons.length} บทเรียนพร้อมเรียน • {Object.keys(grammarProgress).filter(id => grammarProgress[id]?.studied).length} บทเรียนที่ศึกษาแล้ว
          </p>
          <button
            onClick={() => onNavigate('grammar')}
            className="rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-600"
          >
            🚀 Start Grammar Learning
          </button>
        </div>
      )}

      {/* Recent Attempts */}
      {attempts.length > 0 && (
        <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-5">
          <h3 className="mb-3 text-lg font-semibold text-purple-200">📋 Recent Attempts</h3>
          <div className="space-y-2">
            {attempts.slice(-5).reverse().map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-purple-950/40 px-4 py-2 text-sm">
                <span className="text-purple-300">{new Date(a.date).toLocaleDateString()}</span>
                <span className="text-xs text-purple-500">{a.setTitle || a.setId || 'legacy'}</span>
                <span className="font-bold text-purple-100">{a.score.percentage}%</span>
                <span className="text-purple-400">
                  G:{a.score.grammar}/{a.score.grammarQuestions} R:{a.score.reading}/{a.score.readingQuestions}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-4 text-center">
      <p className="text-sm text-purple-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-purple-100">{value}</p>
    </div>
  )
}
