// Grammar Lesson: Gerunds and Infinitives
// Level: intermediate
// Heavily used skill tag in the exam sets.

const gerundsInfinitives = {
  id: 'gerunds-infinitives',
  title: 'Gerunds and Infinitives',
  titleThai: 'Gerund และ Infinitive',
  level: 'intermediate',
  status: 'available',
  relatedSkillTags: ['gerund_infinitive'],
  shortDescriptionThai: 'Gerund (V-ing) และ Infinitive (to + V1) เป็นรูปกริยาที่ใช้แทนคำนามหรือทำหน้าที่อื่น แต่กริยาแต่ละตัวต้องการรูปต่างกัน เช่น enjoy + V-ing, want + to V นักเรียนต้องจำกฎและกริยาที่เกี่ยวข้องเป็นกลุ่ม',
  whyItMattersThai: 'ในข้อสอบ cloze รูปกริยา (V1, V-ing, to V, V-ed) เป็นตัวเลือกที่ปรากฏบ่อย ตัวเลือกทั้ง 4 ดูใช้ได้แต่มีเพียงตัวเดียวที่ตรงกับกริยาหลัก การเข้าใจกฎ "verb + gerund" และ "verb + infinitive" ช่วยตอบได้แม่นยำขึ้น',

  coreRules: [
    {
      ruleTitle: 'verb + gerund (V-ing) — common verbs that take gerund',
      explanationThai: 'กริยาที่ตามด้วย V-ing เสมอ: enjoy, finish, consider, suggest, avoid, mind, practice, miss, deny, admit, postpone, stop (หยุดทำ)',
      explanationEnglish: 'These verbs are always followed by a gerund (-ing form): enjoy, finish, consider, suggest, avoid, mind, practice, miss, deny, admit, postpone, stop (cease).',
      pattern: 'subject + verb + V-ing (no "to")',
      correctExamples: [
        {
          sentence: 'I enjoy reading novels in the evening.',
          translationThai: 'ฉันชอบอ่านนิยายตอนเย็น',
          noteThai: 'enjoy + V-ing เสมอ',
        },
        {
          sentence: 'She finished writing the report last night.',
          translationThai: 'เธอเขียนรายงานเสร็จเมื่อคืน',
          noteThai: 'finish + V-ing',
        },
        {
          sentence: 'He suggested going to a Japanese restaurant.',
          translationThai: 'เขาเสนอให้ไปร้านอาหารญี่ปุ่น',
          noteThai: 'suggest + V-ing (ห้ามใช้ to V)',
        },
        {
          sentence: 'The students avoided talking during the test.',
          translationThai: 'นักเรียนหลีกเลี่ยงการคุยกันระหว่างสอบ',
          noteThai: 'avoid + V-ing',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I enjoy to read books.',
          correction: 'I enjoy reading books.',
          whyWrongThai: '"enjoy" ตามด้วย V-ing เสมอ ห้ามใช้ to-infinitive',
        },
        {
          sentence: 'She suggested to go shopping.',
          correction: 'She suggested going shopping. / She suggested that we go shopping.',
          whyWrongThai: '"suggest" ตามด้วย V-ing หรือ "that + clause"',
        },
      ],
    },
    {
      ruleTitle: 'verb + to-infinitive — common verbs that take "to V"',
      explanationThai: 'กริยาที่ตามด้วย to + V1 เสมอ: want, decide, plan, hope, expect, refuse, agree, learn, manage, promise, offer, fail, prepare',
      explanationEnglish: 'These verbs are always followed by "to + base verb": want, decide, plan, hope, expect, refuse, agree, learn, manage, promise, offer, fail, prepare.',
      pattern: 'subject + verb + to + V1',
      correctExamples: [
        {
          sentence: 'She decided to study abroad next year.',
          translationThai: 'เธอตัดสินใจเรียนต่อต่างประเทศปีหน้า',
          noteThai: 'decide + to V',
        },
        {
          sentence: 'I want to become a doctor.',
          translationThai: 'ฉันอยากเป็นหมอ',
          noteThai: 'want + to V',
        },
        {
          sentence: 'He refused to answer the question.',
          translationThai: 'เขาปฏิเสธที่จะตอบคำถาม',
          noteThai: 'refuse + to V',
        },
        {
          sentence: 'The team managed to finish the project on time.',
          translationThai: 'ทีมทำโครงการเสร็จทันเวลา',
          noteThai: 'manage + to V',
        },
      ],
      wrongExamples: [
        {
          sentence: 'She decided studying abroad.',
          correction: 'She decided to study abroad.',
          whyWrongThai: '"decide" ตามด้วย to + V1 ไม่ใช่ V-ing',
        },
        {
          sentence: 'I want to becoming a doctor.',
          correction: 'I want to become a doctor.',
          whyWrongThai: 'หลัง "to" ใช้ V1 เปล่า ห้ามเติม -ing',
        },
      ],
    },
    {
      ruleTitle: 'verb + object + to-infinitive (verbs of influence)',
      explanationThai: 'กริยาที่ตามด้วย object + to V: encourage, persuade, advise, allow, ask, tell, expect, force, invite, remind, want, would like',
      explanationEnglish: 'These verbs require a noun/pronoun object before "to + base verb": encourage, persuade, advise, allow, ask, tell, expect, force, invite, remind, want, would like.',
      pattern: 'subject + verb + object + to + V1',
      correctExamples: [
        {
          sentence: 'My teacher encouraged me to apply for the scholarship.',
          translationThai: 'ครูของฉันสนับสนุนให้ฉันสมัครทุน',
          noteThai: 'encourage + me + to V',
        },
        {
          sentence: 'She asked her brother to help with the housework.',
          translationThai: 'เธอขอให้พี่ชายช่วยทำงานบ้าน',
          noteThai: 'ask + her brother + to V',
        },
        {
          sentence: 'The doctor advised him to exercise more.',
          translationThai: 'หมอแนะนำให้เขาออกกำลังกายมากขึ้น',
          noteThai: 'advise + him + to V',
        },
      ],
      wrongExamples: [
        {
          sentence: 'My teacher encouraged that I apply for the scholarship.',
          correction: 'My teacher encouraged me to apply for the scholarship.',
          whyWrongThai: '"encourage + object + to V" เป็นโครงสร้างตายตัว',
        },
      ],
    },
    {
      ruleTitle: 'preposition + V-ing (gerund as object of preposition)',
      explanationThai: 'หลัง preposition (in, on, at, of, for, by, about, after, before) ใช้ V-ing เสมอ ห้ามใช้ to V',
      explanationEnglish: 'After any preposition, use V-ing (gerund). Never use "to + V" after a preposition.',
      pattern: 'preposition + V-ing',
      correctExamples: [
        {
          sentence: 'She is good at solving difficult problems.',
          translationThai: 'เธอเก่งในการแก้ปัญหาที่ยาก',
          noteThai: '"at" + V-ing (solving)',
        },
        {
          sentence: 'Thank you for helping me with the project.',
          translationThai: 'ขอบคุณที่ช่วยฉันทำโครงการ',
          noteThai: '"for" + V-ing (helping)',
        },
        {
          sentence: 'After finishing dinner, we went for a walk.',
          translationThai: 'หลังกินข้าวเสร็จ เราออกไปเดิน',
          noteThai: '"After" + V-ing (finishing)',
        },
        {
          sentence: 'He insisted on paying for the meal.',
          translationThai: 'เขายืนยันที่จะจ่ายค่าอาหาร',
          noteThai: '"insist on" + V-ing',
        },
      ],
      wrongExamples: [
        {
          sentence: 'She is good at to solve problems.',
          correction: 'She is good at solving problems.',
          whyWrongThai: 'หลัง preposition (at) ห้ามใช้ to V — ใช้ V-ing เสมอ',
        },
        {
          sentence: 'Thank you for to help me.',
          correction: 'Thank you for helping me.',
          whyWrongThai: 'หลัง "for" ใช้ V-ing (helping) ไม่ใช่ to V',
        },
      ],
    },
    {
      ruleTitle: 'purpose infinitive — to V1 = "in order to"',
      explanationThai: 'ใช้ "to + V1" เพื่อบอกจุดประสงค์ของการกระทำ ความหมาย "เพื่อ/เพื่อจะ" ห้ามใช้ "for + V-ing" ในความหมายนี้กับกริยา',
      explanationEnglish: 'Use "to + base verb" to express purpose ("in order to"). Do not use "for + V-ing" with verbs to express purpose.',
      pattern: 'main clause + to + V1 (purpose)',
      correctExamples: [
        {
          sentence: 'I went to the library to study for my exam.',
          translationThai: 'ฉันไปห้องสมุดเพื่อเตรียมสอบ',
          noteThai: '"to study" บอกจุดประสงค์ของการไป',
        },
        {
          sentence: 'She woke up early to catch the morning train.',
          translationThai: 'เธอตื่นแต่เช้าเพื่อทันรถไฟเช้า',
          noteThai: 'purpose infinitive = ทำเพื่อจะ...',
        },
        {
          sentence: 'They built a new bridge to reduce traffic congestion.',
          translationThai: 'พวกเขาสร้างสะพานใหม่เพื่อลดปัญหาจราจร',
          noteThai: '"to reduce" บอกจุดประสงค์',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I went to the library for studying.',
          correction: 'I went to the library to study.',
          whyWrongThai: 'จุดประสงค์ + กริยา ใช้ "to + V1" ส่วน "for + V-ing" ใช้บอกหน้าที่ของสิ่งของ',
        },
      ],
    },
    {
      ruleTitle: '"to" as preposition vs "to" as infinitive marker',
      explanationThai: 'กับดัก! บางสำนวนใช้ "to" เป็น preposition จึงตามด้วย V-ing ไม่ใช่ V1 เช่น look forward to V-ing, be used to V-ing, get used to V-ing, be accustomed to V-ing, object to V-ing',
      explanationEnglish: 'Some expressions use "to" as a preposition, requiring V-ing afterward (not V1): look forward to, be used to, get used to, be accustomed to, object to.',
      pattern: 'fixed expression + to + V-ing',
      correctExamples: [
        {
          sentence: 'I am looking forward to meeting you next week.',
          translationThai: 'ฉันตั้งตารอที่จะได้พบคุณสัปดาห์หน้า',
          noteThai: '"look forward to" + V-ing — "to" เป็น preposition',
        },
        {
          sentence: 'She is used to working late at night.',
          translationThai: 'เธอชินกับการทำงานดึก',
          noteThai: '"be used to" + V-ing = ชินกับ',
        },
        {
          sentence: 'They objected to changing the meeting time.',
          translationThai: 'พวกเขาไม่เห็นด้วยกับการเปลี่ยนเวลาประชุม',
          noteThai: '"object to" + V-ing',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I am looking forward to meet you.',
          correction: 'I am looking forward to meeting you.',
          whyWrongThai: '"look forward to" ที่ "to" เป็น preposition จึงต้องตามด้วย V-ing (meeting) ไม่ใช่ V1',
        },
        {
          sentence: 'She is used to work late.',
          correction: 'She is used to working late.',
          whyWrongThai: '"be used to" + V-ing = ชินกับ. ส่วน "used to + V1" หมายถึงเคย (ในอดีต) — สองความหมายต่างกัน!',
        },
      ],
    },
    {
      ruleTitle: 'used to (past habit) vs be used to (be accustomed)',
      explanationThai: 'used to + V1 = เคย (กิจวัตรในอดีต ไม่ทำแล้ว). be used to + V-ing = ชินกับ. ทั้งสองโครงสร้างต่างกันมากแม้คล้ายกัน',
      explanationEnglish: '"used to + V1" = past habit (not anymore). "be used to + V-ing" = accustomed to (familiar with). Two different structures.',
      pattern: 'used to + V1 (past habit) | be used to + V-ing (accustomed)',
      correctExamples: [
        {
          sentence: 'I used to play tennis every weekend.',
          translationThai: 'ฉันเคยเล่นเทนนิสทุกสุดสัปดาห์ (แต่ไม่เล่นแล้ว)',
          noteThai: '"used to + V1" = เคย (อดีต)',
        },
        {
          sentence: 'I am used to playing tennis on weekends.',
          translationThai: 'ฉันชินกับการเล่นเทนนิสในวันสุดสัปดาห์',
          noteThai: '"be used to + V-ing" = ชินกับ',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I used to playing tennis.',
          correction: 'I used to play tennis. / I am used to playing tennis.',
          whyWrongThai: 'เลือก: ถ้าหมายถึงเคย ใช้ "used to + V1". ถ้าหมายถึงชิน ใช้ "be used to + V-ing"',
        },
      ],
    },
  ],

  examPatterns: [
    {
      patternName: 'verb + gerund vs infinitive trap',
      howItAppearsInExamThai: 'โจทย์มีกริยาหลัก (enjoy, want, decide, suggest) + ตัวเลือก V1, V-ing, to V, V-ed',
      signalWords: ['enjoy', 'finish', 'consider', 'suggest', 'avoid', 'want', 'decide', 'plan', 'hope'],
      trapChoices: ['enjoy + to V (ผิด)', 'want + V-ing (ผิด)', 'decide + V-ing (ผิด)'],
      examTipThai: 'จำกลุ่ม: enjoy/finish/avoid/suggest/consider + V-ing. want/decide/plan/hope + to V. ดูกริยาหลักก่อนเลือก',
    },
    {
      patternName: 'verb + object + to V trap',
      howItAppearsInExamThai: 'โจทย์มีโครงสร้าง "verb + someone + ?" ตัวเลือกมี V1, to V, V-ing',
      signalWords: ['encourage', 'ask', 'tell', 'advise', 'invite', 'remind', 'expect', 'allow'],
      trapChoices: ['V1 (ขาด to)', 'V-ing (ผิดโครงสร้าง)'],
      examTipThai: 'หลัง verb + object (encourage me, ask her) ใช้ "to + V1" เสมอ',
    },
    {
      patternName: 'preposition + V-ing trap',
      howItAppearsInExamThai: 'หลัง at, on, in, by, for, after, before, of มีตัวเลือก V1, V-ing, to V',
      signalWords: ['good at', 'interested in', 'tired of', 'before/after', 'by + method', 'thank for'],
      trapChoices: ['preposition + to V (ผิด)', 'preposition + V1 (ผิด)'],
      examTipThai: 'หลัง preposition ใช้ V-ing เสมอ — ห้ามใช้ to V หรือ V1',
    },
    {
      patternName: 'look forward to / be used to trap',
      howItAppearsInExamThai: 'โจทย์มี "look forward to ___" หรือ "be used to ___" ตัวเลือก V1, V-ing, to V',
      signalWords: ['look forward to', 'be used to', 'get used to', 'object to', 'in addition to'],
      trapChoices: ['V1 (เพราะคิดว่า to + V1)', 'to V (ซ้ำ to)'],
      examTipThai: '"to" ในกลุ่มสำนวนนี้เป็น preposition → V-ing เสมอ. จำว่า: looking forward to + V-ing',
    },
    {
      patternName: 'purpose infinitive vs for + V-ing',
      howItAppearsInExamThai: 'โจทย์มีจุดประสงค์ของการกระทำ ตัวเลือก for + V-ing, to + V1',
      signalWords: ['went to', 'used for', 'designed for', 'in order to'],
      trapChoices: ['for + V1 (ผิด)', 'to + V-ing (ผิด)'],
      examTipThai: 'จุดประสงค์ของการกระทำ ใช้ "to + V1". หน้าที่ของสิ่งของ ใช้ "for + V-ing" (a knife for cutting)',
    },
  ],

  commonMistakesThaiStudents: [
    {
      mistake: 'ใช้ to V หลัง enjoy/finish/avoid/suggest',
      whyItHappensThai: 'นักเรียนคุ้นกับ "want to" "decide to" จึงเดาว่ากริยาทุกตัวต้องการ to V',
      fixThai: 'จำกลุ่ม V-ing: enjoy, finish, consider, suggest, avoid, mind, practice, miss, deny, admit, postpone',
      example: 'ผิด: I enjoy to read. → ถูก: I enjoy reading.',
    },
    {
      mistake: 'ใช้ V-ing หลัง preposition + to (look forward to)',
      whyItHappensThai: 'นักเรียนเห็น "to" แล้วคิดว่าตามด้วย V1 เสมอ',
      fixThai: 'จำสำนวน: look forward to / be used to / object to / in addition to → ตามด้วย V-ing',
      example: 'ผิด: I look forward to meet you. → ถูก: I look forward to meeting you.',
    },
    {
      mistake: 'ใช้ for + V-ing แทน to + V1 สำหรับจุดประสงค์',
      whyItHappensThai: 'ภาษาไทยใช้ "เพื่อ" ทั้งสองกรณี',
      fixThai: 'จุดประสงค์ของการกระทำ → to + V1. หน้าที่ของสิ่งของ → for + V-ing',
      example: 'ผิด: I went to the library for studying. → ถูก: I went to the library to study.',
    },
    {
      mistake: 'ใช้ to V หลัง preposition (in/on/at/by)',
      whyItHappensThai: 'นักเรียนคิดว่ารูปกริยาที่ "ดูเป็นทางการ" คือ to V',
      fixThai: 'หลัง preposition ทุกตัว ใช้ V-ing เท่านั้น ห้ามใช้ to V',
      example: 'ผิด: She is good at to solve problems. → ถูก: She is good at solving problems.',
    },
    {
      mistake: 'สับสน "used to" กับ "be used to"',
      whyItHappensThai: 'ทั้งสองรูปดูคล้ายกัน แต่ความหมายและโครงสร้างต่างกัน',
      fixThai: 'used to + V1 = เคย (อดีต). be used to + V-ing = ชินกับ',
      example: 'I used to live in Bangkok. (เคย แต่ไม่อยู่แล้ว) ≠ I am used to living in Bangkok. (ชินกับการอยู่)',
    },
  ],

  quickRulesThai: [
    'enjoy/finish/avoid/suggest/consider/practice/mind + V-ing',
    'want/decide/plan/hope/agree/refuse/learn/manage + to V',
    'encourage/ask/tell/advise/invite/expect + object + to V',
    'preposition (in/on/at/by/for/of) + V-ing เสมอ',
    'จุดประสงค์: to + V1. หน้าที่ของสิ่งของ: for + V-ing',
    'look forward to / be used to / object to + V-ing',
    'used to + V1 = เคย / be used to + V-ing = ชิน',
  ],

  memoryTipsThai: [
    'ทำลิสต์กริยา 2 กลุ่ม — กลุ่ม V-ing และกลุ่ม to V — ทบทวนทุกสัปดาห์',
    'จำสูตร: ความสนุก/หลีกเลี่ยง = V-ing. ความตั้งใจ/อนาคต = to V',
    'ทุกครั้งที่เจอ "to" ในโจทย์ ตรวจว่า to นั้นเป็น preposition หรือ infinitive marker',
    'จำคำเตือน "look forward to + V-ing" เป็นตัวอย่างคลาสสิกของ "to" ที่เป็น preposition',
  ],

  miniQuiz: [
    {
      question: 'She enjoys _____ classical music in her free time.',
      choices: ['listen', 'to listen', 'listening', 'listened'],
      correctAnswer: 'listening',
      explanationThai: '"enjoy" ตามด้วย V-ing เสมอ → listening. ส่วน to listen ผิดโครงสร้าง, listen ขาดรูป, listened เป็นอดีต',
      skillTag: 'gerund_infinitive',
    },
    {
      question: 'My parents encouraged me _____ a foreign language.',
      choices: ['learn', 'to learn', 'learning', 'learned'],
      correctAnswer: 'to learn',
      explanationThai: '"encourage + object + to V" ตายตัว → encouraged me to learn',
      skillTag: 'gerund_infinitive',
    },
    {
      question: 'I am looking forward _____ you at the conference.',
      choices: ['meet', 'to meet', 'meeting', 'to meeting'],
      correctAnswer: 'to meeting',
      explanationThai: '"look forward to" ที่ "to" เป็น preposition → ตามด้วย V-ing (meeting) ผลลัพธ์คือ "to meeting"',
      skillTag: 'gerund_infinitive',
    },
    {
      question: 'They went to the gym _____ before the marathon next month.',
      choices: ['for training', 'to train', 'training', 'trained'],
      correctAnswer: 'to train',
      explanationThai: 'จุดประสงค์ของการไป (purpose infinitive) → to + V1 (to train). ส่วน "for training" ใช้กับการบอกหน้าที่ของสิ่งของ',
      skillTag: 'gerund_infinitive',
    },
    {
      question: 'After _____ his homework, Tom went out to play.',
      choices: ['finish', 'to finish', 'finishing', 'finished'],
      correctAnswer: 'finishing',
      explanationThai: 'หลัง preposition "After" ใช้ V-ing → finishing. ห้ามใช้ to V หรือ V1',
      skillTag: 'gerund_infinitive',
    },
    {
      question: 'She is used to _____ early on weekdays.',
      choices: ['wake up', 'to wake up', 'waking up', 'woke up'],
      correctAnswer: 'waking up',
      explanationThai: '"be used to" + V-ing = ชินกับ → waking up. ส่วน "used to + V1" หมายถึงเคย ซึ่งไม่ใช่ความหมายในประโยคนี้',
      skillTag: 'gerund_infinitive',
    },
    {
      question: 'The students decided _____ a charity event next semester.',
      choices: ['organize', 'to organize', 'organizing', 'organized'],
      correctAnswer: 'to organize',
      explanationThai: '"decide" ตามด้วย to + V1 เสมอ → to organize. ส่วน V-ing ผิดโครงสร้าง',
      skillTag: 'gerund_infinitive',
    },
    {
      question: 'My grandfather suggested _____ the train instead of driving.',
      choices: ['take', 'to take', 'taking', 'taken'],
      correctAnswer: 'taking',
      explanationThai: '"suggest" ตามด้วย V-ing → taking. ส่วน to take ผิดโครงสร้าง',
      skillTag: 'gerund_infinitive',
    },
    {
      question: 'He is good at _____ traditional Thai dishes.',
      choices: ['cook', 'to cook', 'cooking', 'cooked'],
      correctAnswer: 'cooking',
      explanationThai: 'หลัง preposition "at" ใช้ V-ing → cooking. ห้ามใช้ to V หรือ V1',
      skillTag: 'gerund_infinitive',
    },
  ],

  masteryChecklist: [
    'ฉันรู้ว่า enjoy/finish/avoid/suggest/consider + V-ing',
    'ฉันรู้ว่า want/decide/plan/hope + to V',
    'ฉันรู้ว่า encourage/ask/tell + object + to V',
    'ฉันรู้ว่าหลัง preposition (in/on/at/by/for) ใช้ V-ing เสมอ',
    'ฉันแยกได้ว่า "look forward to + V-ing" และ "be used to + V-ing"',
    'ฉันแยก used to (เคย) จาก be used to (ชิน) ได้',
    'ฉันใช้ purpose infinitive (to + V1) ได้สำหรับการบอกจุดประสงค์',
  ],
}

export default gerundsInfinitives
