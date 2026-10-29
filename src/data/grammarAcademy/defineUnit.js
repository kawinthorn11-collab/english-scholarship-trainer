// Turns a compact, hand-written unit into the shape the Academy pages use.
//
// patterns:  [name, pattern, explanationThai, example]
// correct:   [sentence, translationThai, noteThai]
// wrong:     [wrongSentence, correction, whyWrongThai]
// traps:     [trapTitle, trapThai, examTipThai]
// mistakes:  [mistake, fixThai]
// drills:    [question, [4 choices], correctAnswer, explanationThai]

export function defineUnit(u) {
  const tag = u.tags[0]
  return {
    id: u.id,
    title: u.title,
    titleThai: u.titleThai,
    shortIntroThai: u.intro,
    deepExplanationThai: u.explain,
    explanationEnglish: u.english,
    grammarPatterns: u.patterns.map(([name, pattern, explanationThai, example]) => ({
      name,
      pattern,
      explanationThai,
      examples: [example],
    })),
    correctExamples: u.correct.map(([sentence, translationThai, noteThai]) => ({ sentence, translationThai, noteThai })),
    wrongExamples: u.wrong.map(([sentence, correction, whyWrongThai]) => ({ sentence, correction, whyWrongThai })),
    examTraps: u.traps.map(([trapTitle, trapThai, examTipThai]) => ({ trapTitle, trapThai, examTipThai })),
    funnyMemoryTips: u.tips,
    thaiStudentCommonMistakes: u.mistakes.map(([mistake, fixThai]) => ({ mistake, fixThai })),
    stepByStepHowToSolve: u.steps,
    miniDrills: u.drills.map(([question, choices, correctAnswer, explanationThai]) => ({
      question,
      choices,
      correctAnswer,
      explanationThai,
      skillTag: tag,
    })),
    masteryChecklist: u.checklist,
    relatedSkillTags: u.tags,
  }
}

export function defineModule(meta, units) {
  return {
    ...meta,
    units,
    unitCount: units.length,
    practiceCount: units.reduce((n, unit) => n + unit.miniDrills.length, 0),
    relatedSkillTags: [...new Set(units.flatMap((unit) => unit.relatedSkillTags))],
    summaryThai: `${meta.titleThai}: ${units.length} บทเรียน พร้อมแบบฝึกหัด ${units.reduce((n, unit) => n + unit.miniDrills.length, 0)} ข้อ`,
    examUseCases: ['grammar cloze', 'sentence completion', 'error identification'],
  }
}
