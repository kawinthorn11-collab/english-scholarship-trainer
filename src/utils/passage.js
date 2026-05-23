/**
 * Resolve a passage for a question by looking it up via passageId.
 *
 * Rules:
 * 1. If question.passage is non-empty, return it.
 * 2. Otherwise find another question in allQuestions where:
 *    q.passageId === question.passageId AND q.passage is non-empty.
 * 3. Return that passage.
 * 4. If still not found, return empty string. In development, log a warning.
 *
 * @param {object} question - The current question object.
 * @param {Array} allQuestions - All questions in the same exam set.
 * @returns {string} The passage text, or '' if none found.
 */
export function getPassageForQuestion(question, allQuestions) {
  if (!question) return ''

  // Inline passage on the question itself
  if (question.passage && question.passage.trim() !== '') {
    return question.passage
  }

  // Look up by passageId
  if (question.passageId && Array.isArray(allQuestions)) {
    const found = allQuestions.find(
      (q) => q.passageId === question.passageId && q.passage && q.passage.trim() !== ''
    )
    if (found) return found.passage
  }

  // Dev-only warning
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn(
      `[passage] No passage found for question id="${question.id}" passageId="${question.passageId}"`
    )
  }
  return ''
}

/**
 * Resolve the passage title from the same group, with the same fallback.
 */
export function getPassageTitle(question, allQuestions) {
  if (!question) return ''
  if (question.passageTitle && question.passageTitle.trim() !== '') {
    return question.passageTitle
  }
  if (question.passageId && Array.isArray(allQuestions)) {
    const found = allQuestions.find(
      (q) => q.passageId === question.passageId && q.passageTitle && q.passageTitle.trim() !== ''
    )
    if (found) return found.passageTitle
  }
  return ''
}
