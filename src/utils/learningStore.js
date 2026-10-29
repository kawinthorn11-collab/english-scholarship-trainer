// Local, per-device learning records:
//  - mistake notebook (retrieval practice: a mistake leaves the notebook after
//    being answered correctly twice in a row on review)
//  - Leitner boxes for vocabulary flashcards (spaced repetition)
//  - study-plan checklist

const MISTAKES_KEY = 'mk-mistakes-v1'
const CARDS_KEY = 'mk-cards-v1'
const PLAN_KEY = 'mk-plan-v1'

// Days until a card in box n is due again.
export const BOX_INTERVAL_DAYS = [0, 1, 2, 4, 8, 16]
const DAY = 86_400_000

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage is optional
  }
}

/* ---------------- mistakes ---------------- */

export function getMistakes() {
  return read(MISTAKES_KEY, [])
}

/**
 * Save a wrongly answered question.
 * item: { id, source, question, choices, answer, explain, passage? }
 */
export function addMistake(item) {
  if (!item?.id || !item.answer || !Array.isArray(item.choices)) return
  const list = getMistakes().filter((m) => m.id !== item.id)
  list.unshift({ ...item, streak: 0, addedAt: Date.now() })
  write(MISTAKES_KEY, list.slice(0, 200))
}

/** Record a review answer; returns true when the mistake is mastered and removed. */
export function reviewMistake(id, correct) {
  const list = getMistakes()
  const item = list.find((m) => m.id === id)
  if (!item) return false
  item.streak = correct ? (item.streak || 0) + 1 : 0
  item.reviewedAt = Date.now()
  const mastered = item.streak >= 2
  write(MISTAKES_KEY, mastered ? list.filter((m) => m.id !== id) : list)
  return mastered
}

export function removeMistake(id) {
  write(MISTAKES_KEY, getMistakes().filter((m) => m.id !== id))
}

/** Helper for exam questions from the mock-exam data format. */
export function mistakeFromExamQuestion(q, source) {
  return {
    id: `exam-${q.id}`,
    source,
    question: q.question,
    passage: q.passage || '',
    choices: q.choices,
    answer: q.correctAnswer,
    explain: q.explanationThai || q.whyCorrect || '',
  }
}

/* ---------------- flashcards (Leitner) ---------------- */

export function getCardStates() {
  return read(CARDS_KEY, {})
}

export function isDue(state, now = Date.now()) {
  if (!state) return true
  return now >= state.due
}

export function gradeCard(word, remembered) {
  const states = getCardStates()
  const prev = states[word] || { box: 0 }
  const box = remembered ? Math.min(prev.box + 1, BOX_INTERVAL_DAYS.length - 1) : 1
  const due = Date.now() + BOX_INTERVAL_DAYS[box] * DAY
  states[word] = { box, due, seen: (prev.seen || 0) + 1 }
  write(CARDS_KEY, states)
  return states[word]
}

/* ---------------- study plan ---------------- */

export function getPlanChecks() {
  return read(PLAN_KEY, {})
}

export function togglePlanCheck(taskId) {
  const checks = getPlanChecks()
  if (checks[taskId]) delete checks[taskId]
  else checks[taskId] = Date.now()
  write(PLAN_KEY, checks)
  return checks
}

/* ---------------- international test best scores ---------------- */

const INTL_BEST_KEY = 'mk-intl-best-v1'

export function getIntlBest() {
  return read(INTL_BEST_KEY, {})
}

export function saveIntlBest(id, pct) {
  const best = getIntlBest()
  if (best[id] === undefined || pct > best[id]) {
    best[id] = pct
    write(INTL_BEST_KEY, best)
  }
}
