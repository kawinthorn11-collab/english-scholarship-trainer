/**
 * Validates a single exam set object against the Set 01 schema.
 * Returns { valid: boolean, errors: string[], warnings: string[], stats: {...} }.
 * Pure function — usable from both app code and CLI scripts.
 */

const REQUIRED_SET_FIELDS = [
  'setId', 'title', 'description', 'timeLimitMinutes',
  'totalQuestions', 'grammarCount', 'readingCount', 'difficulty', 'questions',
]

const REQUIRED_QUESTION_FIELDS = [
  'id', 'setId', 'section', 'passageId', 'passageTitle', 'passage',
  'question', 'choices', 'correctAnswer', 'skillTag', 'difficulty',
  'explanationThai', 'explanationEnglish', 'whyCorrect', 'whyWrong',
  'examTrick', 'commonMistake', 'miniLesson', 'extraPractice',
]

const VALID_SECTIONS = ['Grammar', 'Reading']
const VALID_DIFFICULTIES = ['easy', 'medium', 'hard']

const REQUIRED_GRAMMAR_TAGS = [
  'preposition', 'article', 'tense', 'passive_voice', 'relative_clause',
  'conjunction', 'pronoun', 'gerund_infinitive', 'word_form',
  'subject_verb_agreement', 'conditional', 'comparison',
  'parallel_structure', 'modal', 'collocation', 'adjective_adverb',
]

const REQUIRED_READING_TAGS = [
  'main_idea', 'detail', 'inference', 'pronoun_reference',
  'vocabulary_context', 'cause_effect', 'writer_purpose',
  'true_false', 'sentence_meaning', 'title_selection',
]

export function validateExamSet(examSet) {
  const errors = []
  const warnings = []

  // 1) Top-level structure
  if (!examSet || typeof examSet !== 'object') {
    return { valid: false, errors: ['Exam set is not an object'], warnings: [], stats: null }
  }

  for (const field of REQUIRED_SET_FIELDS) {
    if (examSet[field] === undefined || examSet[field] === null) {
      errors.push(`Missing top-level field: "${field}"`)
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors, warnings, stats: null }
  }

  // 2) Question count checks
  const questions = examSet.questions
  if (!Array.isArray(questions)) {
    errors.push('"questions" must be an array')
    return { valid: false, errors, warnings, stats: null }
  }

  if (questions.length !== 60) {
    errors.push(`Expected exactly 60 questions, got ${questions.length}`)
  }

  if (questions.length !== examSet.totalQuestions) {
    errors.push(`totalQuestions (${examSet.totalQuestions}) does not match questions.length (${questions.length})`)
  }

  const grammarQs = questions.filter((q) => q.section === 'Grammar')
  const readingQs = questions.filter((q) => q.section === 'Reading')

  if (grammarQs.length !== 30) {
    errors.push(`Expected 30 Grammar questions, got ${grammarQs.length}`)
  }
  if (readingQs.length !== 30) {
    errors.push(`Expected 30 Reading questions, got ${readingQs.length}`)
  }
  if (grammarQs.length !== examSet.grammarCount) {
    errors.push(`grammarCount (${examSet.grammarCount}) does not match grammar questions count (${grammarQs.length})`)
  }
  if (readingQs.length !== examSet.readingCount) {
    errors.push(`readingCount (${examSet.readingCount}) does not match reading questions count (${readingQs.length})`)
  }

  // 3) Per-question checks
  const seenIds = new Set()
  const seenQuestionTexts = new Set()
  const skillTagCounts = {}
  const passageIds = new Set()

  // Pre-build a map of passageId → passage text (from any question that has it)
  const passageTextByPassageId = {}
  questions.forEach((q) => {
    if (q.passageId && q.passage && q.passage.trim() !== '') {
      passageTextByPassageId[q.passageId] = q.passage
    }
  })

  questions.forEach((q, idx) => {
    const prefix = `Q${idx + 1} (id="${q.id || 'unknown'}"):`

    // Required fields
    for (const f of REQUIRED_QUESTION_FIELDS) {
      if (q[f] === undefined || q[f] === null) {
        errors.push(`${prefix} missing field "${f}"`)
      }
    }

    // ID uniqueness
    if (q.id) {
      if (seenIds.has(q.id)) {
        errors.push(`${prefix} duplicate question id "${q.id}"`)
      } else {
        seenIds.add(q.id)
      }
    }

    // setId match
    if (q.setId !== examSet.setId) {
      errors.push(`${prefix} setId "${q.setId}" does not match exam set "${examSet.setId}"`)
    }

    // Section
    if (!VALID_SECTIONS.includes(q.section)) {
      errors.push(`${prefix} invalid section "${q.section}" (must be "Grammar" or "Reading")`)
    }

    // Difficulty
    if (!VALID_DIFFICULTIES.includes(q.difficulty)) {
      errors.push(`${prefix} invalid difficulty "${q.difficulty}"`)
    }

    // Choices
    if (!Array.isArray(q.choices)) {
      errors.push(`${prefix} choices must be an array`)
    } else if (q.choices.length !== 4) {
      errors.push(`${prefix} expected 4 choices, got ${q.choices.length}`)
    } else {
      const choiceSet = new Set(q.choices)
      if (choiceSet.size !== 4) {
        errors.push(`${prefix} duplicate choices detected`)
      }
      // correctAnswer must be in choices (text match)
      if (!q.choices.includes(q.correctAnswer)) {
        errors.push(`${prefix} correctAnswer "${q.correctAnswer}" not found in choices`)
      }
    }

    // Question text uniqueness
    if (q.question) {
      const key = `${q.section}::${q.question.trim()}`
      if (seenQuestionTexts.has(key)) {
        errors.push(`${prefix} duplicate question text within same section`)
      } else {
        seenQuestionTexts.add(key)
      }
    }

    // whyWrong has all 4 keys
    if (q.whyWrong && typeof q.whyWrong === 'object') {
      for (const key of ['1', '2', '3', '4']) {
        if (!(key in q.whyWrong)) {
          errors.push(`${prefix} whyWrong missing key "${key}"`)
        }
      }
    } else {
      errors.push(`${prefix} whyWrong must be an object`)
    }

    // Non-empty explanation fields
    const textFields = [
      'explanationThai', 'explanationEnglish', 'whyCorrect',
      'examTrick', 'commonMistake', 'miniLesson',
    ]
    for (const f of textFields) {
      if (typeof q[f] !== 'string' || q[f].trim() === '') {
        errors.push(`${prefix} field "${f}" is empty`)
      }
    }

    // extraPractice
    if (q.extraPractice && typeof q.extraPractice === 'object') {
      const ep = q.extraPractice
      if (!ep.question || !ep.question.trim()) errors.push(`${prefix} extraPractice.question is empty`)
      if (!Array.isArray(ep.choices) || ep.choices.length !== 4) {
        errors.push(`${prefix} extraPractice.choices must be array of 4`)
      }
      if (!ep.answer || !ep.choices?.includes(ep.answer)) {
        errors.push(`${prefix} extraPractice.answer not in choices`)
      }
      if (!ep.explanation || !ep.explanation.trim()) {
        errors.push(`${prefix} extraPractice.explanation is empty`)
      }
    } else {
      errors.push(`${prefix} extraPractice missing or invalid`)
    }

    // Reading must have a passage somewhere — either inline or shared via passageId
    if (q.section === 'Reading') {
      const inlinePassage = q.passage && q.passage.trim() !== ''
      const sharedPassage = q.passageId && passageTextByPassageId[q.passageId]
      if (!inlinePassage && !sharedPassage) {
        errors.push(`${prefix} Reading question must have a passage (inline or via shared passageId "${q.passageId}")`)
      }
    }
    if (!q.passageId || q.passageId.trim() === '') {
      errors.push(`${prefix} passageId is required`)
    }

    // Track skill tags and passages
    if (q.skillTag) {
      skillTagCounts[q.skillTag] = (skillTagCounts[q.skillTag] || 0) + 1
    }
    if (q.passageId) passageIds.add(q.passageId)
  })

  // 4) Skill tag coverage warnings
  const grammarTagsUsed = new Set(grammarQs.map((q) => q.skillTag))
  const readingTagsUsed = new Set(readingQs.map((q) => q.skillTag))

  for (const tag of REQUIRED_GRAMMAR_TAGS) {
    if (!grammarTagsUsed.has(tag)) {
      warnings.push(`Grammar skill tag not used: "${tag}"`)
    }
  }
  for (const tag of REQUIRED_READING_TAGS) {
    if (!readingTagsUsed.has(tag)) {
      warnings.push(`Reading skill tag not used: "${tag}"`)
    }
  }

  // 5) Stats
  const stats = {
    totalQuestions: questions.length,
    grammarCount: grammarQs.length,
    readingCount: readingQs.length,
    passageCount: passageIds.size,
    passageIds: Array.from(passageIds),
    skillTagDistribution: skillTagCounts,
    grammarTagsCovered: Array.from(grammarTagsUsed).sort(),
    readingTagsCovered: Array.from(readingTagsUsed).sort(),
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    stats,
  }
}

export function formatValidationReport(result, setId = '') {
  const lines = []
  lines.push(`=== Validation Report${setId ? ' for ' + setId : ''} ===`)
  lines.push(`Status: ${result.valid ? '✓ VALID' : '✗ INVALID'}`)
  if (result.stats) {
    lines.push(`Total questions: ${result.stats.totalQuestions}`)
    lines.push(`Grammar: ${result.stats.grammarCount} | Reading: ${result.stats.readingCount}`)
    lines.push(`Passages: ${result.stats.passageCount} (${result.stats.passageIds.join(', ')})`)
    lines.push(`Skill tag distribution:`)
    Object.entries(result.stats.skillTagDistribution)
      .sort(([, a], [, b]) => b - a)
      .forEach(([tag, count]) => lines.push(`  ${tag}: ${count}`))
  }
  if (result.errors.length > 0) {
    lines.push(`\nErrors (${result.errors.length}):`)
    result.errors.forEach((e) => lines.push(`  ✗ ${e}`))
  }
  if (result.warnings.length > 0) {
    lines.push(`\nWarnings (${result.warnings.length}):`)
    result.warnings.forEach((w) => lines.push(`  ⚠ ${w}`))
  }
  return lines.join('\n')
}
