// Central registry of all available exam sets.
// Add new sets here as set04, set05, etc.

import set01 from './set01.js'
import set02 from './set02.js'
import set03 from './set03/index.js'

export const examSets = {
  [set01.setId]: set01,
  [set02.setId]: set02,
  [set03.setId]: set03,
}

/**
 * Lightweight metadata list for UI selectors (no questions array).
 */
export const examSetList = Object.values(examSets).map((s) => ({
  setId: s.setId,
  title: s.title,
  description: s.description,
  timeLimitMinutes: s.timeLimitMinutes,
  totalQuestions: s.totalQuestions,
  grammarCount: s.grammarCount,
  readingCount: s.readingCount,
  difficulty: s.difficulty,
}))

export function getExamSet(setId) {
  return examSets[setId] || null
}

export function getQuestions(setId) {
  return examSets[setId]?.questions || []
}

export const DEFAULT_SET_ID = 'set01'
