/**
 * Validates grammar lessons against the schema.
 * Coming-soon lessons are skipped (only available lessons are checked in detail).
 */

const REQUIRED_TOP_FIELDS = ['id', 'title', 'titleThai', 'level', 'relatedSkillTags', 'status']
const REQUIRED_AVAILABLE_FIELDS = [
  'shortDescriptionThai', 'whyItMattersThai', 'coreRules',
  'examPatterns', 'commonMistakesThaiStudents', 'miniQuiz', 'masteryChecklist',
]

export function validateLesson(lesson) {
  const errors = []
  const warnings = []

  for (const f of REQUIRED_TOP_FIELDS) {
    if (lesson[f] === undefined || lesson[f] === null || lesson[f] === '') {
      errors.push(`Missing top-level field: "${f}"`)
    }
  }

  if (!Array.isArray(lesson.relatedSkillTags) || lesson.relatedSkillTags.length === 0) {
    errors.push('relatedSkillTags must be a non-empty array')
  }

  // Skip detailed checks for coming-soon lessons
  if (lesson.status === 'coming-soon') {
    return { valid: errors.length === 0, errors, warnings, skipped: true }
  }

  // Detailed checks for available lessons
  for (const f of REQUIRED_AVAILABLE_FIELDS) {
    if (lesson[f] === undefined || lesson[f] === null) {
      errors.push(`Available lesson missing: "${f}"`)
    }
  }

  if (Array.isArray(lesson.coreRules)) {
    if (lesson.coreRules.length === 0) {
      errors.push('coreRules is empty')
    }
    lesson.coreRules.forEach((rule, i) => {
      if (!rule.ruleTitle) errors.push(`coreRules[${i}] missing ruleTitle`)
      if (!rule.explanationThai || rule.explanationThai.trim() === '') {
        errors.push(`coreRules[${i}] missing explanationThai`)
      }
    })
  }

  if (Array.isArray(lesson.examPatterns)) {
    if (lesson.examPatterns.length === 0) {
      errors.push('examPatterns is empty')
    }
  }

  if (Array.isArray(lesson.commonMistakesThaiStudents)) {
    if (lesson.commonMistakesThaiStudents.length === 0) {
      errors.push('commonMistakesThaiStudents is empty')
    }
  }

  if (Array.isArray(lesson.miniQuiz)) {
    if (lesson.miniQuiz.length === 0) {
      errors.push('miniQuiz is empty')
    }
    lesson.miniQuiz.forEach((q, i) => {
      const prefix = `miniQuiz[${i}]`
      if (!q.question) errors.push(`${prefix} missing question`)
      if (!Array.isArray(q.choices) || q.choices.length !== 4) {
        errors.push(`${prefix} must have exactly 4 choices`)
      } else if (!q.choices.includes(q.correctAnswer)) {
        errors.push(`${prefix} correctAnswer "${q.correctAnswer}" not in choices`)
      }
      if (!q.explanationThai || q.explanationThai.trim() === '') {
        errors.push(`${prefix} missing explanationThai`)
      }
    })
  }

  return { valid: errors.length === 0, errors, warnings, skipped: false }
}

export function validateAllLessons(lessons) {
  const results = []
  for (const lesson of lessons) {
    const r = validateLesson(lesson)
    results.push({ id: lesson.id, ...r })
  }
  return results
}

export function formatLessonReport(results) {
  const lines = []
  lines.push('=== Grammar Lessons Validation Report ===')
  let allValid = true
  for (const r of results) {
    const tag = r.skipped ? '(coming-soon)' : ''
    const status = r.valid ? '✓' : '✗'
    lines.push(`${status} ${r.id} ${tag}`)
    if (!r.valid) {
      allValid = false
      r.errors.forEach((e) => lines.push(`    - ${e}`))
    }
  }
  lines.push('')
  lines.push(allValid ? 'All lessons valid.' : 'Some lessons have errors.')
  return lines.join('\n')
}
