const STORAGE_KEY = 'exam-trainer-attempts'
const SET_KEY = 'exam-trainer-selected-set'

export function getAttempts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveAttempt(attempt) {
  const attempts = getAttempts()
  attempts.push(attempt)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts))
}

export function clearAttempts() {
  localStorage.removeItem(STORAGE_KEY)
}

export function getSelectedSetId() {
  try {
    return localStorage.getItem(SET_KEY) || null
  } catch {
    return null
  }
}

export function saveSelectedSetId(setId) {
  localStorage.setItem(SET_KEY, setId)
}

// ===== Grammar progress =====
const GRAMMAR_KEY = 'exam-trainer-grammar-progress'

export function getGrammarProgress() {
  try {
    const data = localStorage.getItem(GRAMMAR_KEY)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

export function saveGrammarProgress(progress) {
  localStorage.setItem(GRAMMAR_KEY, JSON.stringify(progress))
}

export function markLessonStudied(lessonId) {
  const progress = getGrammarProgress()
  if (!progress[lessonId]) {
    progress[lessonId] = { studied: false, quizAttempts: 0, bestQuizScore: 0, weakRules: [], mastered: false }
  }
  progress[lessonId].studied = true
  progress[lessonId].lastStudiedAt = new Date().toISOString()
  saveGrammarProgress(progress)
}

export function recordQuizAttempt(lessonId, score, total) {
  const progress = getGrammarProgress()
  if (!progress[lessonId]) {
    progress[lessonId] = { studied: false, quizAttempts: 0, bestQuizScore: 0, weakRules: [], mastered: false }
  }
  progress[lessonId].quizAttempts = (progress[lessonId].quizAttempts || 0) + 1
  const percentage = Math.round((score / total) * 100)
  if (percentage > (progress[lessonId].bestQuizScore || 0)) {
    progress[lessonId].bestQuizScore = percentage
  }
  if (percentage >= 80) {
    progress[lessonId].mastered = true
  }
  progress[lessonId].lastQuizAt = new Date().toISOString()
  saveGrammarProgress(progress)
}
