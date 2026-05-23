const LOCAL_STATS_KEY = 'exam-trainer-local-stats'
const memoryStore = { value: null }

const emptyStats = {
  totalStudySeconds: 0,
  todayStudySeconds: 0,
  todayKey: getTodayKey(),
  examsStarted: 0,
  examsCompleted: 0,
  grammarLessonsCompleted: 0,
  grammarDrillsCompleted: 0,
  totalQuestionsAnswered: 0,
  correctAnswers: 0,
  weakSkillCounts: {},
  lastActiveAt: null,
  lastStudiedAt: null,
  streakDays: 0,
  studyStreakDays: 0,
  lastStudyDate: null,
  listeningSeconds: 0,
  listenedItems: 0,
  repeatedItems: 0,
  totalSessions: 0,
}

function canUseStorage() {
  return typeof localStorage !== 'undefined'
}

function readRaw() {
  try {
    if (!canUseStorage()) return memoryStore.value
    return localStorage.getItem(LOCAL_STATS_KEY)
  } catch {
    return memoryStore.value
  }
}

function writeRaw(value) {
  const serialized = JSON.stringify(value)
  memoryStore.value = serialized
  try {
    if (canUseStorage()) localStorage.setItem(LOCAL_STATS_KEY, serialized)
  } catch {
    // local fallback is best-effort only
  }
}

function safeParse(raw) {
  try {
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function getTodayKey(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

function normalizeStats(stats) {
  const todayKey = getTodayKey()
  const normalized = {
    ...emptyStats,
    ...stats,
    weakSkillCounts: stats.weakSkillCounts || {},
  }

  if (normalized.todayKey !== todayKey) {
    normalized.todayStudySeconds = 0
    normalized.todayKey = todayKey
  }
  normalized.studyStreakDays = normalized.studyStreakDays || normalized.streakDays || 0

  return normalized
}

function updateStats(mutator) {
  const stats = normalizeStats(safeParse(readRaw()))
  mutator(stats)
  writeRaw(stats)
  return stats
}

function updateStreak(stats) {
  const today = getTodayKey()
  if (stats.lastStudyDate === today) return

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayKey = getTodayKey(yesterday)
  stats.streakDays = stats.lastStudyDate === yesterdayKey ? (stats.streakDays || 0) + 1 : 1
  stats.studyStreakDays = stats.streakDays
  stats.lastStudyDate = today
}

export function getLocalStats() {
  return normalizeStats(safeParse(readRaw()))
}

export function recordStudySeconds(seconds) {
  const safeSeconds = Math.max(0, Math.min(Number(seconds) || 0, 60))
  if (safeSeconds <= 0) return getLocalStats()

  return updateStats((stats) => {
    stats.totalStudySeconds += safeSeconds
    stats.todayStudySeconds += safeSeconds
    stats.lastActiveAt = new Date().toISOString()
    stats.lastStudiedAt = new Date().toISOString()
    updateStreak(stats)
  })
}

export function recordStudySessionStarted() {
  return updateStats((stats) => {
    stats.totalSessions += 1
    stats.lastActiveAt = new Date().toISOString()
    stats.lastStudiedAt = new Date().toISOString()
    updateStreak(stats)
  })
}

export function recordExamStarted() {
  return updateStats((stats) => {
    stats.examsStarted += 1
    stats.lastActiveAt = new Date().toISOString()
    stats.lastStudiedAt = new Date().toISOString()
    updateStreak(stats)
  })
}

export function recordExamCompleted(score) {
  return updateStats((stats) => {
    stats.examsCompleted += 1
    if (score?.details?.length) {
      for (const detail of score.details) {
        stats.totalQuestionsAnswered += 1
        if (detail.isCorrect) stats.correctAnswers += 1
        if (!detail.isCorrect && detail.skillTag) {
          stats.weakSkillCounts[detail.skillTag] = (stats.weakSkillCounts[detail.skillTag] || 0) + 1
        }
      }
    }
    stats.lastActiveAt = new Date().toISOString()
    stats.lastStudiedAt = new Date().toISOString()
    updateStreak(stats)
  })
}

export function recordGrammarLessonCompleted(lessonId) {
  return updateStats((stats) => {
    const key = `lesson:${lessonId}`
    stats.completedLessonIds = stats.completedLessonIds || {}
    if (!stats.completedLessonIds[key]) {
      stats.grammarLessonsCompleted += 1
      stats.completedLessonIds[key] = new Date().toISOString()
    }
    stats.lastActiveAt = new Date().toISOString()
    stats.lastStudiedAt = new Date().toISOString()
    updateStreak(stats)
  })
}

export function recordGrammarDrillCompleted(lessonId, score) {
  return updateStats((stats) => {
    stats.grammarDrillsCompleted += 1
    stats.lastGrammarDrill = { lessonId, score, completedAt: new Date().toISOString() }
    stats.lastActiveAt = new Date().toISOString()
    stats.lastStudiedAt = new Date().toISOString()
    updateStreak(stats)
  })
}

export function recordQuestionAnswered(skillTag, isCorrect) {
  return updateStats((stats) => {
    stats.totalQuestionsAnswered += 1
    if (isCorrect) stats.correctAnswers += 1
    if (!isCorrect && skillTag) {
      stats.weakSkillCounts[skillTag] = (stats.weakSkillCounts[skillTag] || 0) + 1
    }
    stats.lastActiveAt = new Date().toISOString()
    stats.lastStudiedAt = new Date().toISOString()
    updateStreak(stats)
  })
}

export function recordListeningActivity({ seconds = 0, repeated = false } = {}) {
  return updateStats((stats) => {
    stats.listeningSeconds += Math.max(0, Number(seconds) || 0)
    stats.listenedItems += 1
    if (repeated) stats.repeatedItems += 1
    stats.lastActiveAt = new Date().toISOString()
    stats.lastStudiedAt = new Date().toISOString()
    updateStreak(stats)
  })
}

export function resetLocalStatsForDebug() {
  memoryStore.value = null
  try {
    if (canUseStorage()) localStorage.removeItem(LOCAL_STATS_KEY)
  } catch {
    // ignore debug reset errors
  }
}
