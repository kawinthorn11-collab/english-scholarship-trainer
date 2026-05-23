const ACADEMY_PROGRESS_KEY = 'exam-trainer-academy-progress'

const defaultProgress = {
  completedUnits: {},
  studiedUnits: {},
  quizScores: {},
  lastStudiedUnit: null,
  weakTopics: {},
}

function safeParse(raw) {
  try {
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function getAcademyProgress() {
  const stored = safeParse(localStorage.getItem(ACADEMY_PROGRESS_KEY))
  return {
    ...defaultProgress,
    ...stored,
    completedUnits: stored.completedUnits || {},
    studiedUnits: stored.studiedUnits || {},
    quizScores: stored.quizScores || {},
    weakTopics: stored.weakTopics || {},
  }
}

export function saveAcademyProgress(progress) {
  localStorage.setItem(ACADEMY_PROGRESS_KEY, JSON.stringify({
    ...defaultProgress,
    ...progress,
  }))
}

export function getAcademyUnitKey(moduleId, unitId) {
  return `${moduleId}:${unitId}`
}

export function markAcademyUnitStudied(moduleId, unitId) {
  const progress = getAcademyProgress()
  const key = getAcademyUnitKey(moduleId, unitId)
  progress.studiedUnits[key] = {
    moduleId,
    unitId,
    studiedAt: new Date().toISOString(),
  }
  progress.lastStudiedUnit = { moduleId, unitId, studiedAt: new Date().toISOString() }
  saveAcademyProgress(progress)
}

export function markAcademyUnitComplete(moduleId, unitId) {
  const progress = getAcademyProgress()
  const key = getAcademyUnitKey(moduleId, unitId)
  progress.completedUnits[key] = {
    moduleId,
    unitId,
    completedAt: new Date().toISOString(),
  }
  progress.studiedUnits[key] = progress.studiedUnits[key] || {
    moduleId,
    unitId,
    studiedAt: new Date().toISOString(),
  }
  progress.lastStudiedUnit = { moduleId, unitId, studiedAt: new Date().toISOString() }
  saveAcademyProgress(progress)
}

export function recordAcademyDrillAttempt(moduleId, unitId, score, total, wrongTopics = []) {
  const progress = getAcademyProgress()
  const key = getAcademyUnitKey(moduleId, unitId)
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0
  const previous = progress.quizScores[key] || { attempts: 0, bestScore: 0 }

  progress.quizScores[key] = {
    moduleId,
    unitId,
    attempts: previous.attempts + 1,
    bestScore: Math.max(previous.bestScore || 0, percentage),
    latestScore: percentage,
    latestRawScore: score,
    latestTotal: total,
    lastAttemptAt: new Date().toISOString(),
  }

  for (const topic of wrongTopics) {
    progress.weakTopics[topic] = (progress.weakTopics[topic] || 0) + 1
  }

  if (percentage >= 80) {
    progress.completedUnits[key] = {
      moduleId,
      unitId,
      completedAt: new Date().toISOString(),
    }
  }

  progress.lastStudiedUnit = { moduleId, unitId, studiedAt: new Date().toISOString() }
  saveAcademyProgress(progress)
}

export function getAcademyProgressStats(totalUnits) {
  const progress = getAcademyProgress()
  const completedCount = Object.keys(progress.completedUnits).length
  const studiedCount = Object.keys(progress.studiedUnits).length
  const attemptedDrills = Object.keys(progress.quizScores).length
  return {
    completedCount,
    studiedCount,
    attemptedDrills,
    progressPercent: totalUnits > 0 ? Math.round((completedCount / totalUnits) * 100) : 0,
    progress,
  }
}
