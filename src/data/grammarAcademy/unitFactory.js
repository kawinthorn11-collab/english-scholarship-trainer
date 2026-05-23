const skillRules = [
  [/passive/i, ['passive_voice']],
  [/gerund|infinitive|participle|to-infinitive/i, ['gerund_infinitive']],
  [/modal|must|should|ought|can|could|may|might|would|used to|dare|allowed/i, ['modal']],
  [/tense|present|past|future|perfect|continuous|will|shall|going to|time phrase/i, ['tense']],
  [/relative/i, ['relative_clause']],
  [/reported|indirect|tell|say|ask|reporting/i, ['reported_speech']],
  [/condition|if|unless|subjunctive/i, ['conditional']],
  [/article|a \/ an \/ the|a\/an|the introduction/i, ['article']],
  [/quantifier|many|much|some|any|enough|both|either|neither|every|each|all|most/i, ['quantifier']],
  [/pronoun|reflexive|everyone|something|one and ones/i, ['pronoun_reference']],
  [/agreement|subject-verb/i, ['subject_verb_agreement']],
  [/adjective|adverb|comparison|degree|manner|frequency/i, ['adjective_adverb', 'comparison']],
  [/preposition|phrasal|prepositional|at \/ on \/ in|for \/ since/i, ['preposition']],
  [/conjunction|clause|and \/ or|but \/ so|reason|purpose|time clauses/i, ['conjunction']],
  [/word|form|ending|plural|noun|possessive|countable|uncountable/i, ['word_form']],
  [/sentence|statement|question|negative|imperative|ellipsis|word order|emphasis|there|it/i, ['sentence_structure']],
]

const focusNotes = {
  sentence: {
    rule: 'มองหา subject, verb, object/complement ก่อนเสมอ',
    pattern: 'Subject + Verb + Object/Complement',
    correct: 'The committee reviewed the application carefully.',
    wrong: 'The committee the application carefully.',
    correction: 'The committee reviewed the application carefully.',
    trap: 'โจทย์ใส่วลียาวคั่นกลางจนเราเผลอลืมว่า main verb หายไป',
  },
  tense: {
    rule: 'เวลาในประโยคเป็นตัวสั่งรูป verb ไม่ใช่ความรู้สึกจากคำแปลไทย',
    pattern: 'Time signal + correct tense form',
    correct: 'The school has announced the shortlist already.',
    wrong: 'The school announced the shortlist already.',
    correction: 'The school has announced the shortlist already.',
    trap: 'already, since, for, by the time มักหลอกให้เลือก tense ที่หน้าตาคุ้นกว่า',
  },
  modal: {
    rule: 'modal ตามด้วย V1 และบอกน้ำหนักความหมาย เช่น บังคับ แนะนำ อนุญาต หรือคาดเดา',
    pattern: 'modal + base verb',
    correct: 'Applicants must submit all documents online.',
    wrong: 'Applicants must to submit all documents online.',
    correction: 'Applicants must submit all documents online.',
    trap: 'เห็น must, should, can แล้วเผลอใส่ to หลัง modal',
  },
  passive: {
    rule: 'ถ้าประธานเป็นสิ่งที่ถูกกระทำ ให้คิด be + V3 ทันที',
    pattern: 'be + past participle',
    correct: 'The results were posted on the official website.',
    wrong: 'The results posted on the official website.',
    correction: 'The results were posted on the official website.',
    trap: 'ประโยคแปลว่า “ถูกประกาศ” แต่ตัวเลือกตัด be ทิ้ง',
  },
  gerund: {
    rule: 'หลัง preposition ใช้ V-ing และ verb บางตัวเลือกได้แค่ gerund หรือ infinitive',
    pattern: 'preposition + V-ing',
    correct: 'She is interested in applying for the scholarship.',
    wrong: 'She is interested in to apply for the scholarship.',
    correction: 'She is interested in applying for the scholarship.',
    trap: 'เห็นคำว่า to แล้วคิดว่าเป็น to-infinitive ทั้งที่บางครั้ง to เป็น preposition',
  },
  noun: {
    rule: 'ดูว่านามนับได้ไหม เอกพจน์หรือพหูพจน์ และต้องมี article/quantifier หรือไม่',
    pattern: 'determiner + adjective + noun',
    correct: 'The advice was useful for every applicant.',
    wrong: 'The advices were useful for every applicant.',
    correction: 'The advice was useful for every applicant.',
    trap: 'information, advice, news แปลไทยเหมือนนับได้ แต่ภาษาอังกฤษมักเป็น uncountable',
  },
  modifier: {
    rule: 'adjective ขยาย noun ส่วน adverb ขยาย verb, adjective หรือ adverb',
    pattern: 'adjective + noun / verb + adverb',
    correct: 'The instructions were written clearly.',
    wrong: 'The instructions were written clear.',
    correction: 'The instructions were written clearly.',
    trap: 'คำแปลไทยไม่แยก adjective/adverb แต่ข้อสอบแยกแน่นอน',
  },
  preposition: {
    rule: 'preposition ต้องจำเป็นคู่กับ verb/adjective/noun และต้องดูความหมายเวลา/สถานที่',
    pattern: 'verb/adjective/noun + preposition + noun/V-ing',
    correct: 'The final score depends on careful reading.',
    wrong: 'The final score depends of careful reading.',
    correction: 'The final score depends on careful reading.',
    trap: 'แปลไทยว่า “ขึ้นอยู่กับ” แล้วเลือก of เพราะคุ้นหู แต่ pattern จริงคือ depend on',
  },
  clause: {
    rule: 'clause ต้องมี subject และ verb; connector บอกความสัมพันธ์ระหว่างความคิด',
    pattern: 'main clause + connector + sub-clause',
    correct: 'Although the passage was long, the questions were direct.',
    wrong: 'Although the passage was long, but the questions were direct.',
    correction: 'Although the passage was long, the questions were direct.',
    trap: 'ใช้ although คู่กับ but ซ้ำซ้อน เพราะแปลไทยว่า “แม้ว่า...แต่...”',
  },
  reported: {
    rule: 'reported speech ต้องดู tense, pronoun, time word และ word order ใหม่',
    pattern: 'reporting verb + that/if/wh-word + statement order',
    correct: 'The teacher said that the test would begin soon.',
    wrong: 'The teacher said that the test will begin soon yesterday.',
    correction: 'The teacher said that the test would begin soon.',
    trap: 'ลืม backshift หรือยังใช้ question order หลัง reporting verb',
  },
  relative: {
    rule: 'relative clause ขยาย noun ข้างหน้า ต้องเลือก pronoun ตามคน/สิ่ง/เจ้าของ/สถานที่',
    pattern: 'noun + relative pronoun + clause',
    correct: 'The student whose essay won smiled proudly.',
    wrong: 'The student which essay won smiled proudly.',
    correction: 'The student whose essay won smiled proudly.',
    trap: 'เห็น noun เป็นสิ่งของใกล้ ๆ แล้วเลือก which ทั้งที่ต้องการความเป็นเจ้าของ',
  },
  strategy: {
    rule: 'ข้อสอบ grammar ต้องเริ่มจากโครงสร้าง ไม่ใช่เริ่มจากคำแปลสวย ๆ',
    pattern: 'read left + read right + identify function + eliminate',
    correct: 'Before choosing an answer, identify the job of the blank.',
    wrong: 'Before choose an answer, identify the job of the blank.',
    correction: 'Before choosing an answer, identify the job of the blank.',
    trap: 'เลือกคำที่แปลเข้าท่า แต่ชนิดคำไม่เข้าช่องว่าง',
  },
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function detectFocus(title, moduleId) {
  const text = `${title} ${moduleId}`
  if (/passive/i.test(text)) return 'passive'
  if (/gerund|infinitive|participle|to-infinitive/i.test(text)) return 'gerund'
  if (/modal|must|should|ought|can|could|may|might|would|used to|dare|allowed/i.test(text)) return 'modal'
  if (/tense|present|past|future|perfect|continuous|will|shall|going to|time phrase|verb be|verb have|verb do|do and make/i.test(text)) return 'tense'
  if (/reported|indirect|tell|say|ask|reporting/i.test(text)) return 'reported'
  if (/relative/i.test(text)) return 'relative'
  if (/condition|if|unless|subjunctive|were|had inversion/i.test(text)) return 'clause'
  if (/preposition|phrasal|prepositional|at \/ on \/ in|for \/ since|place|time/i.test(text)) return 'preposition'
  if (/adjective|adverb|comparison|degree|manner|frequency|too|enough|quite|rather|such/i.test(text)) return 'modifier'
  if (/noun|plural|possessive|countable|uncountable|article|a \/ an \/ the|quantifier|pronoun|everyone|some|any|many|much/i.test(text)) return 'noun'
  if (/clause|sentence|connector|and \/ or|but \/ so|reason|purpose|nominalization/i.test(text)) return 'clause'
  if (/strategy|exam|cloze|part of speech|eliminate|plan|review/i.test(text)) return 'strategy'
  return 'sentence'
}

function inferSkillTags(title, moduleId) {
  const text = `${title} ${moduleId}`
  const tags = new Set()
  for (const [regex, values] of skillRules) {
    if (regex.test(text)) values.forEach((tag) => tags.add(tag))
  }
  if (tags.size === 0) tags.add(detectFocus(title, moduleId) === 'strategy' ? 'exam_strategy' : 'sentence_structure')
  return [...tags]
}

function makePatterns(title, focus, moduleDepth) {
  const note = focusNotes[focus]
  const extra = moduleDepth === 'deep'
    ? 'ฝึกมอง pattern นี้จนเห็นทันทีในประโยคยาว เพราะข้อสอบมักย้ายส่วนขยายมาบังตา'
    : 'ใช้ pattern นี้เป็นจุดเริ่มตัดช้อยส์ในข้อสอบ'

  return [
    {
      name: `${title}: core formula`,
      pattern: note.pattern,
      explanationThai: `${note.rule} ${extra}`,
      examples: [note.correct],
    },
    {
      name: 'Blank position check',
      pattern: 'word before blank + blank + word after blank',
      explanationThai: 'อย่าดูช่องว่างเดี่ยว ๆ ให้ดูซ้ายขวาเหมือนดูเพื่อนสองฝั่งในห้องสอบ ซ้ายขวาจะบอกชนิดคำและรูปคำที่ต้องการ',
      examples: ['The applicant ____ the instructions carefully before submitting the form.'],
    },
    {
      name: 'Meaning plus grammar',
      pattern: 'grammar fit + meaning fit = safest answer',
      explanationThai: 'คำตอบที่ดีต้องถูกทั้งโครงสร้างและความหมาย ถ้าถูกแค่แปลไทยแต่ผิด grammar ให้ตัดทิ้งแบบไม่ต้องเสียดาย',
      examples: ['The instructions were clear enough for students to follow.'],
    },
    {
      name: 'Long sentence control',
      pattern: 'remove extra phrase -> check main structure',
      explanationThai: 'ถ้าประโยคยาว ให้ตัด phrase ที่คั่นกลางออกชั่วคราว แล้วตรวจแกนหลัก subject-verb-object ก่อน',
      examples: ['The list of documents required by the office is available online.'],
    },
  ]
}

function makeCorrectExamples(title, focus) {
  const note = focusNotes[focus]
  return [
    {
      sentence: note.correct,
      translationThai: 'คณะกรรมการ/ผู้สมัครทำตามโครงสร้างที่ถูกต้องในบริบทสอบ',
      noteThai: `ตัวอย่างนี้โชว์หัวใจของ ${title}: ${note.rule}`,
    },
    {
      sentence: 'Students who read the whole sentence usually avoid the trap.',
      translationThai: 'นักเรียนที่อ่านทั้งประโยคมักหลบกับดักได้',
      noteThai: 'มี subject + verb ครบ และ relative clause ขยาย students ชัดเจน',
    },
    {
      sentence: 'Before answering, underline the signal word and the main verb.',
      translationThai: 'ก่อนตอบ ให้ขีดเส้นใต้คำสัญญาณและกริยาหลัก',
      noteThai: 'Before + V-ing ถูกต้อง และคำสั่งชัดเจน',
    },
    {
      sentence: 'The blank is easier when you check the words around it.',
      translationThai: 'ช่องว่างง่ายขึ้นเมื่อดูคำรอบ ๆ',
      noteThai: 'when-clause บอกเงื่อนไขเวลาและประโยคหลักสมบูรณ์',
    },
    {
      sentence: 'A careful reader notices whether the answer must be a noun, a verb, or a connector.',
      translationThai: 'คนอ่านละเอียดจะสังเกตว่าคำตอบต้องเป็นคำนาม กริยา หรือคำเชื่อม',
      noteThai: 'รายการ noun/verb/connector อยู่ในโครงสร้าง parallel',
    },
    {
      sentence: 'The best choice fits both the grammar and the meaning of the sentence.',
      translationThai: 'ตัวเลือกที่ดีที่สุดเข้าทั้งไวยากรณ์และความหมาย',
      noteThai: 'both...and ใช้เชื่อมสองสิ่งระดับเดียวกัน',
    },
  ]
}

function makeWrongExamples(title, focus) {
  const note = focusNotes[focus]
  return [
    {
      sentence: note.wrong,
      correction: note.correction,
      whyWrongThai: `ผิดเพราะชนกับกฎหลักของ ${title}: ${note.rule}`,
    },
    {
      sentence: 'Before answer the question, read both sides of the blank.',
      correction: 'Before answering the question, read both sides of the blank.',
      whyWrongThai: 'หลัง before เมื่อเป็น preposition ต้องใช้ V-ing จำไว้ลูก เห็น blank หลัง preposition เมื่อไร gerund ต้องมา',
    },
    {
      sentence: 'The list of documents are on the website.',
      correction: 'The list of documents is on the website.',
      whyWrongThai: 'ประธานหลักคือ list ไม่ใช่ documents ใกล้ verb แค่ไหนก็อย่าให้มาหลอก',
    },
    {
      sentence: 'Although the sentence is long, but it has one main verb.',
      correction: 'Although the sentence is long, it has one main verb.',
      whyWrongThai: 'although ไม่จับคู่กับ but ในประโยคเดียวกัน ภาษาไทยมี “แม้ว่า...แต่...” แต่อังกฤษไม่เอาสองตัวพร้อมกัน',
    },
  ]
}

function makeExamTraps(title, focus) {
  const note = focusNotes[focus]
  return [
    {
      trapTitle: 'Nearby-word trap',
      trapThai: `ช้อยส์จะพยายามให้เราเลือกตามคำที่อยู่ใกล้ช่องว่าง แต่ ${title} ต้องดูโครงสร้างจริง`,
      signalWords: ['of', 'that', 'which', 'before', 'after'],
      examTipThai: 'ตัดวลีคั่นกลางออกก่อน แล้วจับคู่ subject กับ verb หรือคำหลักกับคำขยาย',
    },
    {
      trapTitle: 'Thai-translation trap',
      trapThai: 'คำแปลไทยดูใช่ แต่รูปคำผิด เช่น noun/adjective/adverb สลับกัน',
      signalWords: ['the', 'very', 'quickly', 'because'],
      examTipThai: 'ถามตัวเองว่า blank ต้องทำหน้าที่อะไร ไม่ใช่แปลว่าอะไรอย่างเดียว',
    },
    {
      trapTitle: `${title} focus trap`,
      trapThai: note.trap,
      signalWords: [note.pattern, title],
      examTipThai: `จำไว้ลูก อันนี้ออกสอบบ่อยกว่าเพื่อนทักยืมเงิน: ${note.rule}`,
    },
    {
      trapTitle: 'Long-clause fog',
      trapThai: 'ประโยคยาวจนเหมือนเดินเข้าห้างแล้วลืมว่ามาซื้ออะไร',
      signalWords: ['who', 'which', 'although', 'because', 'with'],
      examTipThai: 'หากเจอหลาย clause ให้หากริยาหลักและ connector ทีละตัว อย่าอ่านแบบกวาดตาแล้วเลือก',
    },
  ]
}

function makeFunnyTips(title, focus) {
  const note = focusNotes[focus]
  return [
    `ตัวแม่สรุปให้: ${title} เริ่มจากดูหน้าที่ของช่องว่างก่อน ความหมายค่อยตามมาแบบมีมารยาท`,
    `จำไว้ลูก: ${note.rule} ถ้าช้อยส์แปลสวยแต่โครงสร้างพัง ให้โบกมือลาอย่างสุภาพ`,
    'subject อยู่ไกลแค่ไหน verb ต้องรักเดียวใจเดียวกับ subject อย่าให้นามข้างทางมาทำให้ใจสั่น',
  ]
}

function makeMistakes(title) {
  return [
    {
      mistake: 'เลือกจากคำแปลไทยก่อนดูโครงสร้าง',
      whyItHappensThai: 'ภาษาไทยไม่บังคับรูปคำและ tense ชัดเท่าอังกฤษ จึงรู้สึกว่าหลายช้อยส์แปลได้',
      fixThai: `สำหรับ ${title} ให้ระบุหน้าที่ของ blank ก่อนเสมอ`,
      example: 'Need a verb? Do not choose a noun just because it sounds meaningful.',
    },
    {
      mistake: 'ไม่ตัด phrase ที่มาคั่นกลาง',
      whyItHappensThai: 'ตาเห็นคำนามใกล้ verb แล้วคิดว่าเป็น subject',
      fixThai: 'วงเล็บ phrase เช่น of..., with..., who... แล้วกลับไปหา subject หลัก',
      example: 'The list of names is ready.',
    },
    {
      mistake: 'จำ pattern เป็นคำเดี่ยว ไม่จำเป็นชุด',
      whyItHappensThai: 'นักเรียนมักท่องศัพท์ แต่ข้อสอบถามความสัมพันธ์ของคำ',
      fixThai: 'จดเป็น chunk เช่น interested in V-ing, depend on, both A and B',
      example: 'interested in applying, not interested to apply',
    },
    {
      mistake: 'เห็นประโยคยาวแล้วเดา',
      whyItHappensThai: 'ความยาวทำให้สมองรีบหา shortcut',
      fixThai: 'แบ่งประโยคเป็น main clause และ extra information ก่อนตอบ',
      example: 'Although the passage is long, the grammar signal is often close to the blank.',
    },
  ]
}

function makeSteps(title) {
  return [
    `อ่านคำก่อนและหลังช่องว่างของโจทย์ ${title}`,
    'ระบุว่าช่องว่างต้องการ noun, verb, adjective, adverb, connector, preposition หรือ clause',
    'ขีดเส้นใต้ signal word เช่น tense marker, preposition, article, quantifier หรือ connector',
    'ตัดช้อยส์ที่ผิดชนิดคำหรือผิด pattern ก่อน',
    'เทียบความหมายของช้อยส์ที่เหลือกับทั้งประโยค',
    'อ่านทวนหนึ่งรอบแบบเร็วเพื่อเช็กว่าไม่มี subject-verb, tense หรือ pronoun หลุด',
  ]
}

function makeMiniDrills(title, focus, tags) {
  const note = focusNotes[focus]
  const skillTag = tags[0] || 'sentence_structure'
  return [
    {
      question: `In a cloze item about ${title}, what should you check first?`,
      choices: ['Only the Thai meaning', 'The words before and after the blank', 'The longest answer', 'The answer that sounds formal'],
      correctAnswer: 'The words before and after the blank',
      explanationThai: 'ถูก เพราะคำรอบช่องว่างบอกชนิดคำและ pattern ที่ต้องใช้ ตัวเลือกที่ดูแปลดีหรือยาวกว่าอาจเป็นกับดัก ถ้าดูแต่ความหมายไทยจะพลาดรูปคำง่ายมาก',
      skillTag,
    },
    {
      question: `Which pattern best matches the core idea of ${title}?`,
      choices: [note.pattern, 'adjective + modal + article', 'preposition + finite verb', 'subject only without verb'],
      correctAnswer: note.pattern,
      explanationThai: `ถูก เพราะ ${title} ใช้แกน ${note.pattern}. ช้อยส์อื่นตั้งใจหลอกด้วยคำ grammar ที่ดูวิชาการ แต่โครงสร้างไม่สมบูรณ์หรือผิดหน้าที่`,
      skillTag,
    },
    {
      question: 'The list of scholarship requirements _____ available online.',
      choices: ['is', 'are', 'have', 'were been'],
      correctAnswer: 'is',
      explanationThai: 'ถูกคือ is เพราะประธานหลักคือ The list เป็นเอกพจน์ of scholarship requirements เป็นแค่วลีขยาย are/have หลอกด้วย requirements ที่อยู่ใกล้กว่า ส่วน were been เป็นรูป verb ที่ผิด',
      skillTag: 'subject_verb_agreement',
    },
    {
      question: 'Students should read the whole sentence before _____ an answer.',
      choices: ['choose', 'choosing', 'to choose', 'chosen'],
      correctAnswer: 'choosing',
      explanationThai: 'ถูกคือ choosing เพราะ before ในที่นี้เป็น preposition จึงตามด้วย V-ing. choose เป็น V1 ลอย ๆ, to choose ผิดหลัง preposition, chosen เป็น V3 ที่ไม่เข้าหน้าที่',
      skillTag: 'gerund_infinitive',
    },
    {
      question: `Which strategy is safest when two choices both seem possible in ${title}?`,
      choices: ['Pick the shorter one', 'Check grammar fit, then meaning fit', 'Pick the one with familiar vocabulary', 'Ignore the rest of the sentence'],
      correctAnswer: 'Check grammar fit, then meaning fit',
      explanationThai: 'ถูก เพราะข้อสอบ grammar ต้องผ่านสองด่านคือโครงสร้างและความหมาย ช้อยส์สั้นหรือศัพท์คุ้นไม่รับประกันว่าถูก และการไม่อ่านทั้งประโยคคือทางลัดไปเสียคะแนน',
      skillTag,
    },
  ]
}

function makeChecklist(title) {
  return [
      `อธิบายหน้าที่ของ ${title} เป็นภาษาไทยได้`,
      'บอก pattern หลักได้โดยไม่ต้องเปิดโน้ต',
      'แยก correct/wrong examples ได้อย่างน้อย 4 คู่',
      'จับ signal word ในโจทย์ cloze ได้',
      'ตัดช้อยส์ผิดชนิดคำหรือผิด tense ได้',
      'ทำ mini drill ได้อย่างน้อย 80%',
    ]
}

function buildUnit(module, title, index) {
  const unitNumber = String(index + 1).padStart(2, '0')
  const id = `${unitNumber}-${slugify(title)}`
  const focus = detectFocus(title, module.id)
  const tags = inferSkillTags(title, module.id)
  const depth = module.id === 'sentence-text' || module.id === 'verb-forms' ? 'deep' : 'standard'
  const note = focusNotes[focus]
  const extraDepth = depth === 'deep'
    ? 'บทนี้ลงลึกเป็นพิเศษเพราะเป็นฐานของข้อสอบ scholarship: เราจะดูทั้งรูปประโยค หน้าที่ของคำ วิธีอ่านโจทย์ยาว และวิธีตัดช้อยส์ที่เหมือนถูกแต่ผิดโครงสร้าง'
    : 'บทนี้เป็น first-pass ที่ครบเครื่องพอใช้สอบได้ทันที และออกแบบให้ขยายรายละเอียดเพิ่มได้ภายหลังโดยไม่เสียโครงสร้างข้อมูล'

  return {
    id,
    title,
    titleThai: `บทเรียนตัวแม่: ${title}`,
    shortIntroThai: `${title} คือหัวข้อที่ช่วยให้เห็นโครงสร้างอังกฤษชัดขึ้น โดยเฉพาะเวลาเจอช่องว่างใน grammar cloze หรือ sentence completion`,
    deepExplanationThai: `${title} ไม่ใช่แค่หัวข้อให้ท่องจำ แต่เป็นเครื่องมืออ่านประโยคให้เห็นหน้าที่ของคำก่อนเลือกคำตอบ ${note.rule} ในข้อสอบจริง ตัวเลือกมักถูกออกแบบให้แปลไทยได้หลายแบบ แต่มีเพียงตัวเดียวที่เข้ากับ grammar รอบช่องว่างแบบเป๊ะ ๆ\n\nวิธีเรียนบทนี้คือเริ่มจากแกน ${note.pattern} แล้วดูว่าคำข้างหน้าและข้างหลังช่องว่างบังคับอะไร ถ้ามีวลีคั่นกลาง ให้ตัดออกชั่วคราวเพื่อกลับไปดูโครงหลัก ประโยคอังกฤษเหมือนโครงกระดูก ถ้าเห็นกระดูกแล้วเนื้อความยาวแค่ไหนก็ไม่หลง\n\n${extraDepth} จำไว้ลูก อันนี้ออกสอบบ่อยกว่าเพื่อนทักยืมเงิน: อย่าเลือกเพราะเสียงในหัวบอกว่าคุ้น ให้เลือกเพราะอธิบายได้ว่าทำไมถูกและทำไมอีกสามตัวผิด`,
    explanationEnglish: `${title} helps learners identify the grammatical job of a word or structure in a sentence. In exam questions, students should inspect the surrounding words, identify the required form, eliminate structurally impossible choices, and then confirm the meaning.`,
    grammarPatterns: makePatterns(title, focus, depth),
    correctExamples: makeCorrectExamples(title, focus),
    wrongExamples: makeWrongExamples(title, focus),
    examTraps: makeExamTraps(title, focus),
    funnyMemoryTips: makeFunnyTips(title, focus),
    thaiStudentCommonMistakes: makeMistakes(title),
    stepByStepHowToSolve: makeSteps(title),
    miniDrills: makeMiniDrills(title, focus, tags),
    masteryChecklist: makeChecklist(title),
    relatedSkillTags: tags,
  }
}

export function createAcademyModule(module) {
  const units = module.units.map((title, index) => buildUnit(module, title, index))
  return {
    id: module.id,
    title: module.title,
    titleThai: module.titleThai,
    descriptionThai: module.descriptionThai,
    estimatedStudyTime: module.estimatedStudyTime,
    difficulty: module.difficulty,
    examImportance: module.examImportance,
    relatedSkillTags: [...new Set(units.flatMap((unit) => unit.relatedSkillTags))],
    memoryTheme: module.memoryTheme,
    practiceCount: units.reduce((sum, unit) => sum + unit.miniDrills.length, 0),
    unitCount: units.length,
    summaryThai: `${module.titleThai} มี ${units.length} บทเรียน ครอบคลุมหัวข้อสำคัญสำหรับ grammar cloze, sentence completion และ reading grammar analysis แบบเรียนเองได้`,
    examUseCases: [
      'grammar cloze',
      'sentence completion',
      'error identification',
      'reading grammar analysis',
    ],
    units,
  }
}
