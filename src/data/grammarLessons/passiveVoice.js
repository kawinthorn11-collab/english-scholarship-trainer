// Grammar Lesson: Passive Voice
// Level: intermediate
// Tested in all three exam sets — important for cloze questions.

const passiveVoice = {
  id: 'passive-voice',
  title: 'Passive Voice',
  titleThai: 'ประโยคถูกกระทำ (Passive Voice)',
  level: 'intermediate',
  status: 'available',
  relatedSkillTags: ['passive_voice'],
  shortDescriptionThai: 'Passive Voice คือโครงสร้างที่ประธานเป็น "ผู้ถูกกระทำ" แทนที่จะเป็น "ผู้กระทำ" ใช้รูป be + V3 (past participle) ในข้อสอบ cloze ตัวเลือกมักรวม active และ passive ทำให้นักเรียนสับสนได้ง่าย',
  whyItMattersThai: 'Passive Voice พบบ่อยในบทความวิชาการ ข่าว และเอกสารทางการ ในข้อสอบเข้ามหาวิทยาลัย Passive Voice ทดสอบทั้งการเลือก be (is/was/has been/will be) ที่ตรงกับ tense และการเลือก V3 ที่ถูกต้อง การเข้าใจกฎจะช่วยตอบได้ทันทีโดยไม่ต้องเดา',

  coreRules: [
    {
      ruleTitle: 'basic structure: be + V3 (past participle)',
      explanationThai: 'โครงสร้างหลักของ Passive Voice คือ "be + V3" โดย "be" เปลี่ยนตาม tense (am/is/are, was/were, has been/have been, will be) ส่วน V3 เป็นรูปกริยาช่องที่ 3 ของกริยาหลัก',
      explanationEnglish: 'Passive structure: be + past participle (V3). The "be" verb changes by tense; the V3 stays the same.',
      pattern: 'subject + be (tense) + V3 + (by + agent)',
      correctExamples: [
        {
          sentence: 'The book is read by many students.',
          translationThai: 'หนังสือเล่มนี้ถูกอ่านโดยนักเรียนหลายคน',
          noteThai: 'present passive: is + read (V3 ของ read = read)',
        },
        {
          sentence: 'The window was broken last night.',
          translationThai: 'หน้าต่างถูกทุบเมื่อคืน',
          noteThai: 'past passive: was + broken (V3 ของ break)',
        },
        {
          sentence: 'The report has been completed.',
          translationThai: 'รายงานได้รับการทำเสร็จแล้ว',
          noteThai: 'present perfect passive: has been + completed',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The window was broke last night.',
          correction: 'The window was broken last night.',
          whyWrongThai: 'Passive Voice ใช้ V3 (broken) ไม่ใช่ V2 (broke)',
        },
        {
          sentence: 'The book is reading by many students.',
          correction: 'The book is read by many students.',
          whyWrongThai: '"is reading" คือ active continuous (กำลังอ่าน). passive ใช้ "is read" (V3)',
        },
      ],
    },
    {
      ruleTitle: 'passive in different tenses',
      explanationThai: 'Passive ในแต่ละ tense ใช้รูป be ที่ต่างกัน: Present Simple = is/are + V3. Past Simple = was/were + V3. Present Perfect = has/have been + V3. Past Perfect = had been + V3. Future = will be + V3. Modal = modal + be + V3',
      explanationEnglish: 'Passive form changes by tense: Present (is/are V3), Past (was/were V3), Present Perfect (has/have been V3), Past Perfect (had been V3), Future (will be V3), Modal (modal + be + V3).',
      pattern: 'be (matching tense) + V3',
      correctExamples: [
        {
          sentence: 'Letters are delivered every morning.',
          translationThai: 'จดหมายถูกส่งทุกเช้า',
          noteThai: 'Present Simple passive: are + delivered',
        },
        {
          sentence: 'The bridge was built in 1995.',
          translationThai: 'สะพานถูกสร้างในปี 1995',
          noteThai: 'Past Simple passive: was + built',
        },
        {
          sentence: 'The new policy has been announced today.',
          translationThai: 'นโยบายใหม่ได้รับการประกาศวันนี้',
          noteThai: 'Present Perfect passive: has been + announced',
        },
        {
          sentence: 'The project will be finished by next month.',
          translationThai: 'โครงการจะเสร็จภายในเดือนหน้า',
          noteThai: 'Future passive: will be + finished',
        },
        {
          sentence: 'This room must be cleaned before the guests arrive.',
          translationThai: 'ห้องนี้ต้องถูกทำความสะอาดก่อนแขกมาถึง',
          noteThai: 'Modal passive: must + be + cleaned',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The new policy has announced today.',
          correction: 'The new policy has been announced today.',
          whyWrongThai: 'Present Perfect Passive ต้องมี "been" ระหว่าง has/have กับ V3',
        },
        {
          sentence: 'This room must cleaned before guests arrive.',
          correction: 'This room must be cleaned before guests arrive.',
          whyWrongThai: 'Modal Passive ต้องมี "be" ระหว่าง modal กับ V3 — must be cleaned',
        },
      ],
    },
    {
      ruleTitle: 'subject-verb agreement in passive',
      explanationThai: 'รูป be ต้องตรงกับประธาน (singular/plural) และ tense ที่ต้องการ. ถ้าประธานเป็นพหูพจน์ ใช้ are/were/have been/etc. ถ้าเป็นเอกพจน์ ใช้ is/was/has been/etc.',
      explanationEnglish: 'The "be" verb must agree with the subject in number (singular/plural) and tense.',
      pattern: 'singular: is/was/has been + V3 | plural: are/were/have been + V3',
      correctExamples: [
        {
          sentence: 'The students are taught by an experienced teacher.',
          translationThai: 'นักเรียนถูกสอนโดยครูที่มีประสบการณ์',
          noteThai: 'plural subject (students) → are taught',
        },
        {
          sentence: 'The student is taught by an experienced teacher.',
          translationThai: 'นักเรียนถูกสอนโดยครูที่มีประสบการณ์',
          noteThai: 'singular subject (student) → is taught',
        },
        {
          sentence: 'Donations are welcomed throughout the year.',
          translationThai: 'การบริจาคได้รับการต้อนรับตลอดปี',
          noteThai: 'donations (plural) → are welcomed',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The students is taught by the teacher.',
          correction: 'The students are taught by the teacher.',
          whyWrongThai: 'students เป็นพหูพจน์ → ต้องใช้ are ไม่ใช่ is',
        },
      ],
    },
    {
      ruleTitle: 'agent with "by" — when to include',
      explanationThai: 'หลัง passive voice ใช้ "by + ผู้กระทำ" เมื่อ (1) ผู้กระทำสำคัญ (2) ผู้กระทำเฉพาะเจาะจง (3) ในการบอกผู้แต่ง/ผู้สร้าง. ถ้าผู้กระทำไม่สำคัญหรือไม่รู้ว่าใคร ก็ละ "by + agent" ได้',
      explanationEnglish: 'Use "by + agent" after passive when: (1) the doer is important, (2) specific, or (3) crucial information. Skip "by + agent" if the doer is unknown or unimportant.',
      pattern: 'subject + be + V3 + by + agent (optional)',
      correctExamples: [
        {
          sentence: 'The novel was written by a famous author.',
          translationThai: 'นวนิยายเล่มนี้เขียนโดยนักเขียนชื่อดัง',
          noteThai: 'ผู้แต่งสำคัญ → ระบุ by + agent',
        },
        {
          sentence: 'The window was broken yesterday.',
          translationThai: 'หน้าต่างถูกทุบเมื่อวาน',
          noteThai: 'ไม่รู้ว่าใครทุบ → ไม่ระบุ agent',
        },
        {
          sentence: 'The cake was decorated with fresh flowers.',
          translationThai: 'เค้กถูกตกแต่งด้วยดอกไม้สด',
          noteThai: 'with + เครื่องมือ/วัสดุ (ไม่ใช่ by — ไม่ใช่ผู้กระทำ)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The cake was decorated by fresh flowers.',
          correction: 'The cake was decorated with fresh flowers.',
          whyWrongThai: 'flowers เป็นวัสดุ ไม่ใช่ผู้กระทำ → ใช้ with ไม่ใช่ by',
        },
      ],
    },
    {
      ruleTitle: 'when to use passive (preferred situations)',
      explanationThai: 'ใช้ Passive Voice เมื่อ (1) ผู้กระทำไม่สำคัญหรือไม่รู้ว่าใคร (2) ต้องการเน้นประธาน/ผลของการกระทำ (3) ในเอกสารวิชาการ/รายงาน/ข่าวสำหรับความเป็นกลาง',
      explanationEnglish: 'Use passive when (1) the agent is unknown or unimportant, (2) you want to emphasize the subject or result, (3) for academic/news writing for objectivity.',
      pattern: 'context determines voice — passive for emphasis on receiver',
      correctExamples: [
        {
          sentence: 'My bicycle was stolen last night.',
          translationThai: 'จักรยานของฉันถูกขโมยเมื่อคืน',
          noteThai: 'ไม่รู้ว่าใครขโมย → passive เหมาะสม',
        },
        {
          sentence: 'The Mona Lisa was painted by Leonardo da Vinci.',
          translationThai: 'ภาพโมนาลิซ่าถูกวาดโดยเลโอนาร์โด ดา วินชี',
          noteThai: 'เน้นที่ภาพ (ประธาน) มากกว่าผู้วาด → passive',
        },
        {
          sentence: 'Three studies have been conducted on this topic.',
          translationThai: 'มีการศึกษาวิจัย 3 ครั้งเกี่ยวกับหัวข้อนี้',
          noteThai: 'งานวิชาการ — เน้นที่ผลการศึกษา ไม่ใช่ผู้วิจัย',
        },
      ],
      wrongExamples: [
        {
          sentence: 'Someone stole my bicycle last night.',
          correction: 'My bicycle was stolen last night. (passive is more natural here)',
          whyWrongThai: 'ไม่รู้ว่าใครขโมย → passive เหมาะกว่า. active "Someone stole" ก็ใช้ได้แต่ฟังดูเหมือนรู้ผู้กระทำ',
        },
      ],
    },
    {
      ruleTitle: 'common irregular V3 forms',
      explanationThai: 'V3 (past participle) ของกริยา irregular ต้องท่องจำ เช่น break-broke-broken, write-wrote-written, take-took-taken, give-gave-given, see-saw-seen, do-did-done, go-went-gone, eat-ate-eaten',
      explanationEnglish: 'Memorize irregular V3 forms — they appear constantly in passive voice: broken, written, taken, given, seen, done, gone, eaten.',
      pattern: 'irregular: V1-V2-V3 (must memorize)',
      correctExamples: [
        {
          sentence: 'The letter was written by my grandmother.',
          translationThai: 'จดหมายถูกเขียนโดยคุณยายของฉัน',
          noteThai: 'write → wrote → written (V3)',
        },
        {
          sentence: 'The cake was eaten before noon.',
          translationThai: 'เค้กถูกกินก่อนเที่ยง',
          noteThai: 'eat → ate → eaten (V3)',
        },
        {
          sentence: 'These photos were taken last summer.',
          translationThai: 'รูปเหล่านี้ถูกถ่ายเมื่อหน้าร้อนที่แล้ว',
          noteThai: 'take → took → taken (V3)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The letter was wrote by my grandmother.',
          correction: 'The letter was written by my grandmother.',
          whyWrongThai: 'V3 ของ write คือ written ไม่ใช่ wrote (ซึ่งเป็น V2)',
        },
        {
          sentence: 'The cake was ate before noon.',
          correction: 'The cake was eaten before noon.',
          whyWrongThai: 'V3 ของ eat คือ eaten ไม่ใช่ ate (V2)',
        },
      ],
    },
  ],

  examPatterns: [
    {
      patternName: 'active vs passive trap',
      howItAppearsInExamThai: 'ตัวเลือก 4 ตัวมีทั้ง active (V1, V2, V-ing) และ passive (was V3, is V3, has been V3) ทดสอบว่าประธานเป็นผู้กระทำหรือผู้ถูกกระทำ',
      signalWords: ['the book', 'the report', 'the bridge', 'the patient', 'donations', 'rules'],
      trapChoices: ['active form (เมื่อต้อง passive)', 'passive form (เมื่อต้อง active)'],
      examTipThai: 'ถามตัวเอง: "ประธานทำสิ่งนี้เอง หรือถูกกระทำ?" ถ้าถูกกระทำ → passive (be + V3)',
    },
    {
      patternName: 'tense matching in passive',
      howItAppearsInExamThai: 'ตัวเลือกเป็น be ในรูปต่างกัน (is, was, has been, will be) ทดสอบว่าเลือก tense ตรงกับเวลาในประโยคหรือไม่',
      signalWords: ['yesterday', 'last week', 'every day', 'since 2010', 'next month', 'by tomorrow'],
      trapChoices: ['was (กับเวลาปัจจุบัน)', 'is (กับเวลาอดีต)', 'will be (กับเวลาอดีต)'],
      examTipThai: 'จับเวลาในประโยคก่อน — past time = was/were V3. present = is/are V3. perfect = has/have been V3. future = will be V3',
    },
    {
      patternName: 'modal passive trap',
      howItAppearsInExamThai: 'ตัวเลือกหลัง modal เช่น "must ___ done" ตัวเลือกมีทั้ง done, be done, has been done',
      signalWords: ['must', 'should', 'can', 'could', 'might', 'will'],
      trapChoices: ['V3 alone (ขาด be)', 'has been V3 (ผิดโครงสร้าง)'],
      examTipThai: 'หลัง modal + passive ใช้ "modal + be + V3" เสมอ — must be done, should be cleaned, can be seen',
    },
    {
      patternName: 'V3 (past participle) form trap',
      howItAppearsInExamThai: 'ตัวเลือกมีรูป V2 (past simple) และ V3 (past participle) ของ irregular verbs',
      signalWords: ['written/wrote', 'broken/broke', 'taken/took', 'eaten/ate', 'gone/went'],
      trapChoices: ['V2 form (ใน passive ผิด)'],
      examTipThai: 'Passive ใช้ V3 เสมอ — write→written (ไม่ใช่ wrote), break→broken (ไม่ใช่ broke), take→taken (ไม่ใช่ took)',
    },
    {
      patternName: 'subject-verb agreement in passive',
      howItAppearsInExamThai: 'ประธานพหูพจน์/เอกพจน์ที่ดูสับสน ตัวเลือก be มีทั้ง is/are หรือ was/were',
      signalWords: ['donations', 'students', 'rules', 'each + noun', 'every + noun'],
      trapChoices: ['is + plural subject (ผิด)', 'are + singular (ผิด)'],
      examTipThai: 'ดูประธานหลัก — ห้ามดูคำที่อยู่ใกล้กริยาเท่านั้น. each/every + noun ใช้ singular verb',
    },
    {
      patternName: 'by vs with in passive',
      howItAppearsInExamThai: 'หลัง passive voice ตัวเลือก by, with, of, from',
      signalWords: ['written by', 'painted by', 'cut with', 'decorated with', 'made of', 'made from'],
      trapChoices: ['with + ผู้กระทำ (ผิด)', 'by + เครื่องมือ (ผิด)'],
      examTipThai: 'by + ผู้กระทำ (คน/สัตว์/สิ่งที่ทำการกระทำ). with + เครื่องมือ/วัสดุ',
    },
  ],

  commonMistakesThaiStudents: [
    {
      mistake: 'ใช้ V2 แทน V3 ใน passive',
      whyItHappensThai: 'นักเรียนสับสนระหว่าง V2 (past simple) และ V3 (past participle) เพราะ regular verbs มีรูปเหมือนกัน (worked-worked) แต่ irregular ต่างกัน',
      fixThai: 'ในประโยค passive ใช้ V3 เสมอ — ท่อง irregular V3: broken, written, taken, given, seen, eaten, done, gone',
      example: 'ผิด: The window was broke. → ถูก: The window was broken.',
    },
    {
      mistake: 'ลืม "be" ในรูป perfect/modal passive',
      whyItHappensThai: 'นักเรียนเขียน "has done" ในความหมาย passive แทนที่จะเป็น "has been done"',
      fixThai: 'Perfect Passive ต้องมี "been" — has/have/had + been + V3. Modal Passive ต้องมี "be" — must/should/can + be + V3',
      example: 'ผิด: The work has finished. → ถูก: The work has been finished. (ถ้าหมายถึงงานถูกทำเสร็จ)',
    },
    {
      mistake: 'สับสนประธานเอกพจน์/พหูพจน์',
      whyItHappensThai: 'ภาษาไทยไม่มีการผันกริยาตามจำนวน',
      fixThai: 'ดูประธานหลัก — students = พหูพจน์ → are/were. student = เอกพจน์ → is/was',
      example: 'ผิด: The students is taught well. → ถูก: The students are taught well.',
    },
    {
      mistake: 'ใช้ active เมื่อควรใช้ passive',
      whyItHappensThai: 'ภาษาไทยมีโครงสร้างที่ใช้ active ได้เกือบทุกกรณี',
      fixThai: 'ถ้าประธานเป็นผู้ถูกกระทำ (จดหมายถูกเขียน, รถถูกขโมย) ใช้ passive — be + V3',
      example: 'ผิด: My car stole last night. → ถูก: My car was stolen last night.',
    },
    {
      mistake: 'ใช้ with แทน by กับผู้กระทำ',
      whyItHappensThai: 'นักเรียนแปลทั้ง by และ with เป็น "ด้วย/โดย" เหมือนกัน',
      fixThai: 'by + ผู้กระทำ (คน/สิ่งที่กระทำ) เช่น by John, by a dog. with + เครื่องมือ/วัสดุ เช่น with a pen, with flowers',
      example: 'ผิด: The book was written with my brother. → ถูก: The book was written by my brother.',
    },
  ],

  quickRulesThai: [
    'Passive structure: subject + be + V3 + (by + agent)',
    'V3 ของ irregular verbs ต้องท่องจำ — broken, written, taken, given, seen',
    'Present passive: is/are + V3. Past passive: was/were + V3',
    'Perfect passive: has/have/had + been + V3 (ห้ามลืม been)',
    'Modal passive: modal + be + V3 (ห้ามลืม be)',
    'รูป be ต้องตรงทั้ง subject (singular/plural) และ tense',
    'by + ผู้กระทำ. with + เครื่องมือ',
    'ใช้ passive เมื่อไม่รู้ผู้กระทำ หรือต้องการเน้นประธาน',
  ],

  memoryTipsThai: [
    'สูตรง่าย: passive = "ถูก + กริยา" ในภาษาไทย → be + V3',
    'ท่อง V3 ของ 30 irregular verbs ที่พบบ่อย — break, write, take, give, see, do, go, eat, drive, drink',
    'ทดสอบ active vs passive: ลองเปลี่ยนประธานเป็นกรรม — ถ้าได้ ก็ใช้ passive ได้',
    'จำว่า perfect passive ต้องมี 3 ส่วน: has/have/had + been + V3',
    'ในข้อสอบเขียนวิชาการ passive ดูเป็นทางการกว่า active',
  ],

  miniQuiz: [
    {
      question: 'The new library _____ in 2020 with funding from local donations.',
      choices: ['built', 'was built', 'has built', 'is building'],
      correctAnswer: 'was built',
      explanationThai: '"in 2020" = past time. ห้องสมุดเป็นผู้ถูกสร้าง (passive) → was built. ส่วน built เป็น V2 ใน active, has built ผิดเพราะ tense, is building เป็น active continuous',
      skillTag: 'passive_voice',
    },
    {
      question: 'These shoes _____ in Italy and are very comfortable.',
      choices: ['make', 'made', 'are made', 'are making'],
      correctAnswer: 'are made',
      explanationThai: 'shoes เป็นพหูพจน์ + ผู้ถูกผลิต → are made. ส่วน make เป็น V1 ผิดรูป, made เป็น V2 ผิด, are making เป็น active',
      skillTag: 'passive_voice',
    },
    {
      question: 'The report must _____ before the end of the week.',
      choices: ['submit', 'submitted', 'be submitted', 'has submitted'],
      correctAnswer: 'be submitted',
      explanationThai: 'Modal passive: must + be + V3 → must be submitted. ตัวเลือกอื่นขาด "be"',
      skillTag: 'passive_voice',
    },
    {
      question: 'The novel _____ by a famous British author last year.',
      choices: ['wrote', 'written', 'was written', 'has been written'],
      correctAnswer: 'was written',
      explanationThai: '"last year" = past time. นวนิยายเป็นผู้ถูกเขียน → was written. ส่วน written เป็น V3 อย่างเดียวขาด be, has been written ผิด tense',
      skillTag: 'passive_voice',
    },
    {
      question: 'The cake _____ already _____ when we arrived.',
      choices: ['has / eaten', 'had / been eaten', 'was / eaten', 'is / eaten'],
      correctAnswer: 'had / been eaten',
      explanationThai: 'เหตุการณ์เกิดก่อนเหตุการณ์อดีตอื่น (when we arrived) + passive → Past Perfect Passive: had been eaten',
      skillTag: 'passive_voice',
    },
    {
      question: 'New rules _____ to all employees by the management next Monday.',
      choices: ['will explain', 'will be explained', 'are explained', 'have been explained'],
      correctAnswer: 'will be explained',
      explanationThai: '"next Monday" = future time. rules เป็นผู้ถูกอธิบาย → Future Passive: will be explained',
      skillTag: 'passive_voice',
    },
    {
      question: 'The painting was completed _____ a single brush over three months.',
      choices: ['by', 'with', 'from', 'of'],
      correctAnswer: 'with',
      explanationThai: 'a single brush เป็นเครื่องมือ (ไม่ใช่ผู้กระทำ) → with. ถ้าเป็นผู้กระทำ (เช่น by the artist) จึงใช้ by',
      skillTag: 'passive_voice',
    },
    {
      question: 'A new bridge _____ in our city for over a year now.',
      choices: ['has built', 'has been building', 'has been built', 'was built'],
      correctAnswer: 'has been built',
      explanationThai: '"for over a year now" + passive → Present Perfect Passive: has been built. ส่วน has built ผิดเพราะ active perfect, has been building เป็น perfect continuous active',
      skillTag: 'passive_voice',
    },
    {
      question: 'Each of the documents _____ carefully before the meeting.',
      choices: ['was reviewed', 'were reviewed', 'are reviewed', 'review'],
      correctAnswer: 'was reviewed',
      explanationThai: '"Each + noun" เป็นเอกพจน์เสมอ + past + passive → was reviewed. ส่วน were reviewed ผิดเพราะ each เป็นเอกพจน์',
      skillTag: 'passive_voice',
    },
  ],

  masteryChecklist: [
    'ฉันรู้โครงสร้าง: subject + be + V3 + (by + agent)',
    'ฉันใช้ V3 (past participle) ใน passive voice เสมอ',
    'ฉันท่อง V3 ของ irregular verbs 30+ ตัวที่พบบ่อย',
    'ฉันแยก by (ผู้กระทำ) จาก with (เครื่องมือ) ได้',
    'ฉันใช้ has/have been + V3 ใน Present Perfect Passive',
    'ฉันใช้ modal + be + V3 ใน Modal Passive',
    'ฉันแยก active กับ passive ได้จากบทบาทของประธาน (ผู้กระทำ vs ผู้ถูกกระทำ)',
    'ฉันผัน be ตาม subject (singular/plural) และ tense',
  ],
}

export default passiveVoice
