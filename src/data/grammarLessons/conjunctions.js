// Grammar Lesson: Conjunctions and Connectors
// Level: foundation
// Targets the "conjunction" skill tag (used in Sets 01–02 but underused in Set 03).

const conjunctions = {
  id: 'conjunctions',
  title: 'Conjunctions and Connectors',
  titleThai: 'คำเชื่อมและคำสันธาน (Conjunctions and Connectors)',
  level: 'foundation',
  status: 'available',
  relatedSkillTags: ['conjunction'],
  shortDescriptionThai: 'คำเชื่อม (Conjunctions) ใช้เชื่อมประโยค วลี หรือคำเข้าด้วยกัน เพื่อแสดงความสัมพันธ์ทางตรรกะ เช่น เหตุ-ผล (because, so), ความขัดแย้ง (but, although), เงื่อนไข (if, unless), หรือเวลา (when, while)',
  whyItMattersThai: 'ในข้อสอบ cloze คำเชื่อมเป็นกุญแจที่บอกว่าประโยคสองประโยคเชื่อมกันอย่างไร — สาเหตุ ผลลัพธ์ ความขัดแย้ง หรือเงื่อนไข นักเรียนที่ใช้ผิดจะทำให้ความหมายของประโยคเปลี่ยนทันที',

  coreRules: [
    {
      ruleTitle: 'cause and effect: because, so, since, therefore',
      explanationThai: '"because" และ "since" บอกเหตุ. "so" และ "therefore" บอกผล. ทั้งคู่เชื่อมเหตุ-ผล แต่ "because Y" หมายถึง Y เป็นเหตุ ส่วน "so Y" หมายถึง Y เป็นผล',
      explanationEnglish: '"because" and "since" introduce a cause. "so" and "therefore" introduce a result. The clauses they head go in opposite directions of the cause-effect relationship.',
      pattern: 'X because Y (Y = cause) | X, so Y (Y = result)',
      correctExamples: [
        {
          sentence: 'I stayed home because it was raining heavily.',
          translationThai: 'ฉันอยู่บ้านเพราะฝนตกหนัก',
          noteThai: '"because" + เหตุ (ฝนตก) → ผล (อยู่บ้าน)',
        },
        {
          sentence: 'It was raining heavily, so I stayed home.',
          translationThai: 'ฝนตกหนัก ฉันเลยอยู่บ้าน',
          noteThai: '"so" + ผล (อยู่บ้าน) — เหตุอยู่ก่อนหน้า',
        },
        {
          sentence: 'Since the bus was delayed, we took a taxi.',
          translationThai: 'เพราะรถบัสล่าช้า เราจึงนั่งแท็กซี่',
          noteThai: '"Since" = เพราะ (เป็นทางการกว่า because)',
        },
        {
          sentence: 'The road was closed; therefore, we had to find another route.',
          translationThai: 'ถนนถูกปิด ดังนั้นเราจึงต้องหาเส้นทางอื่น',
          noteThai: '"therefore" เป็นทางการ ใช้ในข้อความเขียน',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I stayed home so it was raining heavily.',
          correction: 'I stayed home because it was raining heavily.',
          whyWrongThai: '"so" บอกผล แต่ในประโยคนี้ "ฝนตก" คือเหตุของการอยู่บ้าน ต้องใช้ "because"',
        },
        {
          sentence: 'It was raining, therefore I stayed home.',
          correction: 'It was raining; therefore, I stayed home. / It was raining, so I stayed home.',
          whyWrongThai: '"therefore" ต้องนำหน้าด้วย ; (semicolon) หรือใช้ในประโยคใหม่ ส่วน "so" ใช้กับ comma ได้',
        },
      ],
    },
    {
      ruleTitle: 'contrast: but, although, even though, however',
      explanationThai: '"but" เชื่อมประโยคสั้น. "although / even though / though" เริ่มประโยคย่อยที่แสดงความขัดแย้ง. "however" เป็นทางการและตามด้วย comma',
      explanationEnglish: '"but" joins clauses informally. "although/even though/though" begin subordinate contrast clauses. "however" is formal and is followed by a comma.',
      pattern: 'X but Y | Although X, Y | X. However, Y',
      correctExamples: [
        {
          sentence: 'The film was long, but it was very enjoyable.',
          translationThai: 'หนังเรื่องนี้ยาว แต่สนุกมาก',
          noteThai: '"but" เชื่อม 2 ประโยค',
        },
        {
          sentence: 'Although the test was difficult, most students passed.',
          translationThai: 'ถึงแม้ข้อสอบจะยาก แต่นักเรียนส่วนใหญ่สอบผ่าน',
          noteThai: '"Although" + ประโยคย่อย, ประโยคหลัก',
        },
        {
          sentence: 'She studied hard. However, she did not get the highest score.',
          translationThai: 'เธอเรียนหนัก อย่างไรก็ตาม เธอไม่ได้คะแนนสูงสุด',
          noteThai: '"However" ขึ้นต้นประโยคใหม่ + comma',
        },
        {
          sentence: 'Even though it was cold, we went swimming.',
          translationThai: 'แม้ว่าจะหนาว เราก็ไปว่ายน้ำ',
          noteThai: '"Even though" เน้นความขัดแย้งแรงกว่า although',
        },
      ],
      wrongExamples: [
        {
          sentence: 'Although it was raining, but we went out.',
          correction: 'Although it was raining, we went out. / It was raining, but we went out.',
          whyWrongThai: 'ห้ามใช้ "Although" คู่กับ "but" ในประโยคเดียว — เลือกอย่างใดอย่างหนึ่ง',
        },
        {
          sentence: 'She is tired, however, she will continue.',
          correction: 'She is tired; however, she will continue.',
          whyWrongThai: '"however" ต้องนำหน้าด้วย ; (semicolon) หรือขึ้นต้นประโยคใหม่',
        },
      ],
    },
    {
      ruleTitle: 'condition: if, unless, when, as long as',
      explanationThai: '"if" บอกเงื่อนไข ("ถ้า"). "unless" = "if not" ("ถ้าไม่..."). "when" บอกเวลาเงื่อนไขที่จะเกิดแน่นอน. "as long as" = "ตราบใดที่"',
      explanationEnglish: '"if" introduces a condition. "unless" means "if not." "when" introduces a definite time/condition. "as long as" emphasizes a continuing condition.',
      pattern: 'If/Unless/When/As long as + clause, main clause',
      correctExamples: [
        {
          sentence: 'If you study hard, you will pass the exam.',
          translationThai: 'ถ้าเรียนหนัก จะสอบผ่าน',
          noteThai: 'Type 1 conditional: if + present, will + V1',
        },
        {
          sentence: 'You will be late unless you leave now.',
          translationThai: 'คุณจะสาย ถ้าไม่ออกเดี๋ยวนี้',
          noteThai: '"unless" = if not (ความหมายเชิงปฏิเสธในตัว ห้ามเติม not อีก)',
        },
        {
          sentence: 'As long as you stay calm, the interview will go well.',
          translationThai: 'ตราบใดที่คุณยังสงบ การสัมภาษณ์จะราบรื่น',
          noteThai: '"as long as" = ตราบเท่าที่',
        },
      ],
      wrongExamples: [
        {
          sentence: 'You will be late unless you don\'t leave now.',
          correction: 'You will be late unless you leave now.',
          whyWrongThai: '"unless" มีความหมายปฏิเสธในตัวอยู่แล้ว ห้ามเติม "not" หรือ "don\'t" อีก',
        },
      ],
    },
    {
      ruleTitle: 'time: when, while, as, before, after',
      explanationThai: '"when" บอกเวลาที่เกิด. "while" บอกระยะเวลาที่กำลังเกิด (ใช้กับ continuous บ่อย). "as" บอกความพร้อมกัน. "before/after" บอกลำดับ',
      explanationEnglish: '"when" marks a point in time. "while" indicates a duration (often with continuous). "as" suggests simultaneity. "before/after" mark sequence.',
      pattern: 'When/While/Before/After + clause, main clause',
      correctExamples: [
        {
          sentence: 'When the bell rang, all the students stood up.',
          translationThai: 'เมื่อเสียงระฆังดัง นักเรียนทุกคนก็ลุกขึ้น',
          noteThai: '"When" + เหตุการณ์เฉพาะจุด',
        },
        {
          sentence: 'I was reading while she was cooking dinner.',
          translationThai: 'ฉันอ่านหนังสือขณะที่เธอทำอาหาร',
          noteThai: '"while" + การกระทำที่ดำเนินพร้อมกัน',
        },
        {
          sentence: 'After the meeting ended, we all went out for dinner.',
          translationThai: 'หลังจากประชุมจบ พวกเราออกไปกินข้าวด้วยกัน',
          noteThai: '"After" + ลำดับเหตุการณ์',
        },
      ],
      wrongExamples: [
        {
          sentence: 'While I waiting, she came in.',
          correction: 'While I was waiting, she came in.',
          whyWrongThai: '"while" + clause สมบูรณ์ มี subject + verb (was waiting)',
        },
      ],
    },
    {
      ruleTitle: 'addition: and, also, moreover, furthermore, in addition',
      explanationThai: '"and" เชื่อมง่าย ๆ. "also" อยู่กลางประโยค ขยายข้อมูลเพิ่ม. "moreover / furthermore / in addition" เป็นทางการ ใช้ขึ้นต้นประโยคใหม่',
      explanationEnglish: '"and" joins simply. "also" adds information mid-sentence. "moreover/furthermore/in addition" are formal connectors that begin a new sentence.',
      pattern: 'X. Moreover/Furthermore/In addition, Y',
      correctExamples: [
        {
          sentence: 'The book is interesting, and the language is easy to follow.',
          translationThai: 'หนังสือน่าสนใจ และภาษาก็เข้าใจง่าย',
          noteThai: '"and" เชื่อม 2 ประโยค',
        },
        {
          sentence: 'She speaks French. Moreover, she can write in three other languages.',
          translationThai: 'เธอพูดฝรั่งเศส ยิ่งกว่านั้น เธอเขียนได้อีก 3 ภาษา',
          noteThai: '"Moreover" ขึ้นต้นประโยคใหม่ + comma',
        },
      ],
      wrongExamples: [
        {
          sentence: 'She speaks French, moreover she can write in three other languages.',
          correction: 'She speaks French; moreover, she can write in three other languages. / She speaks French. Moreover, she can write...',
          whyWrongThai: '"moreover" ต้องตามด้วย ; หรือขึ้นต้นประโยคใหม่ ใช้ comma คั่นไม่ได้',
        },
      ],
    },
  ],

  examPatterns: [
    {
      patternName: 'cause vs effect direction',
      howItAppearsInExamThai: 'โจทย์มี 2 ประโยคที่เชื่อม cause-effect กัน ตัวเลือกมีทั้ง because, so, although, unless',
      signalWords: ['because', 'so', 'since', 'as', 'therefore', 'thus'],
      trapChoices: ['so (เมื่อต้องการ because)', 'because (เมื่อต้องการ so)'],
      examTipThai: 'ถาม "ส่วนนี้คือเหตุหรือผล?" — ถ้าเป็นเหตุ ใช้ because/since. ถ้าเป็นผล ใช้ so/therefore',
    },
    {
      patternName: 'contrast vs continuation',
      howItAppearsInExamThai: 'ตัวเลือกมี although/but/and ในประโยคที่อาจเป็นทั้งความขัดแย้งหรือต่อเนื่อง',
      signalWords: ['although', 'even though', 'but', 'however', 'on the other hand'],
      trapChoices: ['and (เมื่อต้องการความขัดแย้ง)', 'but (เมื่อต้องการความต่อเนื่อง)'],
      examTipThai: 'อ่านความหมายของทั้ง 2 ประโยค — ถ้าตรงข้ามกัน ใช้ although/but. ถ้าเสริมกัน ใช้ and/moreover',
    },
    {
      patternName: 'unless trap with negative meaning',
      howItAppearsInExamThai: 'ตัวเลือกมี if และ unless และตัวเลือกผสม not',
      signalWords: ['unless', 'if ... not', 'or', 'otherwise'],
      trapChoices: ['unless + not (ความหมายผสม)', 'if + positive (เมื่อต้องการ unless)'],
      examTipThai: '"unless" = "if not" ในตัวเอง ห้ามใส่ not เพิ่ม. ดูประโยคหลัก ถ้าเป็นการเตือน → unless',
    },
    {
      patternName: 'formal vs informal connector',
      howItAppearsInExamThai: 'ในข้อความวิชาการมักเลือก moreover/furthermore/therefore แทน and/so',
      signalWords: ['therefore', 'moreover', 'furthermore', 'consequently', 'nevertheless'],
      trapChoices: ['so/and (ในบริบททางการ)'],
      examTipThai: 'ในข้อความวิชาการเลือก connector ที่เป็นทางการกว่า — therefore > so, moreover > and',
    },
    {
      patternName: 'Although vs but pair trap',
      howItAppearsInExamThai: 'นักเรียนชอบใส่ "Although...but" คู่กัน ซึ่งผิดในภาษาอังกฤษ',
      signalWords: ['Although + clause, ___', 'Even though + clause, ___'],
      trapChoices: ['but (เมื่อมี Although อยู่แล้ว)'],
      examTipThai: 'มี Although แล้ว ห้ามมี but ในประโยคเดียวกัน — เลือกอย่างใดอย่างหนึ่งเท่านั้น',
    },
  ],

  commonMistakesThaiStudents: [
    {
      mistake: 'ใช้ "Although...but" คู่กัน',
      whyItHappensThai: 'ภาษาไทยใช้ "ถึงแม้...แต่" คู่กัน นักเรียนเลยแปลตรงตัว',
      fixThai: 'ในภาษาอังกฤษ Although และ but ห้ามอยู่ในประโยคเดียวกัน — ใช้แค่ตัวเดียว',
      example: 'ผิด: Although it was hot, but we played soccer. → ถูก: Although it was hot, we played soccer.',
    },
    {
      mistake: 'ใช้ "so" แทน "because"',
      whyItHappensThai: 'นักเรียนเข้าใจว่าทั้งคู่เชื่อมเหตุ-ผล แต่ลืมว่าทิศทางต่างกัน',
      fixThai: 'X because Y = Y เป็นเหตุ. X so Y = Y เป็นผล. ทดสอบโดยถามว่า Y เป็นเหตุหรือผล',
      example: 'ผิด: I was tired so I stayed up late. → ถูก: I was tired because I stayed up late.',
    },
    {
      mistake: 'เติม "not" หลัง "unless"',
      whyItHappensThai: 'นักเรียนแปล "unless" = "ถ้าไม่" แล้วเลยใส่ not อีก',
      fixThai: '"unless" มี "not" อยู่ในตัวแล้ว — unless you study = if you do not study',
      example: 'ผิด: Unless you don\'t study, you will fail. → ถูก: Unless you study, you will fail.',
    },
    {
      mistake: 'ใช้ "however" กับ comma',
      whyItHappensThai: 'นักเรียนใช้ however เหมือน but',
      fixThai: '"however" = adverbial connector ต้องตามด้วย ; หรือขึ้นต้นประโยคใหม่ ใช้ comma คั่นไม่ได้',
      example: 'ผิด: It was cold, however we swam. → ถูก: It was cold; however, we swam. / It was cold. However, we swam.',
    },
    {
      mistake: 'ใช้ "while" กับ continuous tense ไม่ครบ',
      whyItHappensThai: 'ในไทย "ขณะที่" ใช้กับกริยาธรรมดาก็ได้',
      fixThai: 'หลัง "while" ที่หมายถึงระยะเวลาดำเนิน มักใช้ continuous (was/were + V-ing)',
      example: 'ผิด: While I read, she sang. → ถูก: While I was reading, she was singing.',
    },
  ],

  quickRulesThai: [
    'because + เหตุ. so + ผล. ทิศทางตรงกันข้าม',
    'although/even though + ประโยคย่อย, ประโยคหลัก',
    'ห้ามใช้ Although...but ในประโยคเดียวกัน',
    'unless = if not. ห้ามเติม not เพิ่ม',
    'however ต้องนำหน้าด้วย ; หรือขึ้นต้นประโยคใหม่',
    'while ใช้กับ continuous tense (was/were + V-ing)',
    'moreover/furthermore เป็นทางการ ขึ้นต้นประโยคใหม่',
  ],

  memoryTipsThai: [
    'จับคู่: because-so (ตรงข้ามทิศทาง), although-but (ห้ามคู่), unless-if not (ความหมายเดียวกัน)',
    'ในข้อสอบ ดูว่าประโยค 2 ประโยคเชื่อมกันแบบไหน: เหตุ-ผล, ขัดแย้ง, เพิ่มเติม, เงื่อนไข, เวลา',
    'ทดสอบ "because vs so" โดยพลิกประโยค — ถ้ายังถูกอยู่ ใช้ตัวที่ตรง',
    'จำ punctuation rules: however ; , ส่วน but , ทั่วไป',
  ],

  miniQuiz: [
    {
      question: 'I went to bed early _____ I had to wake up at 5 a.m.',
      choices: ['so', 'because', 'although', 'unless'],
      correctAnswer: 'because',
      explanationThai: '"I had to wake up at 5 a.m." เป็นเหตุ "went to bed early" เป็นผล ใช้ "because" เพื่อเชื่อมเหตุที่ตามมา',
      skillTag: 'conjunction',
    },
    {
      question: '_____ the rain was heavy, the festival continued as planned.',
      choices: ['Because', 'Although', 'Unless', 'So'],
      correctAnswer: 'Although',
      explanationThai: 'ฝนตกหนัก vs. งานยังเดินตามแผน เป็นความขัดแย้ง ใช้ "Although" เริ่มประโยคย่อย ส่วน "Because" ทำให้ความหมายผิด',
      skillTag: 'conjunction',
    },
    {
      question: 'You will miss the train _____ you hurry up.',
      choices: ['if', 'because', 'although', 'unless'],
      correctAnswer: 'unless',
      explanationThai: '"unless" = "if not" — ถ้าไม่รีบ จะตกรถไฟ ส่วน "if" ต้องตามด้วยปฏิเสธ ("if you don\'t hurry") ซึ่งไม่มีในตัวเลือก',
      skillTag: 'conjunction',
    },
    {
      question: 'She studied for hours; _____, she still did not understand the topic.',
      choices: ['because', 'so', 'however', 'although'],
      correctAnswer: 'however',
      explanationThai: 'หลังจาก ; ใช้ "however" เพื่อแสดงความขัดแย้งในรูปทางการ ส่วน "but" ต้องอยู่กลางประโยคไม่ใช่หลัง ;',
      skillTag: 'conjunction',
    },
    {
      question: '_____ I was waiting at the station, I saw an old friend.',
      choices: ['When', 'While', 'Unless', 'Because'],
      correctAnswer: 'While',
      explanationThai: '"was waiting" เป็น past continuous บอกระยะเวลา ใช้ "While" เหมาะที่สุด ส่วน "When" ใช้กับเหตุการณ์เฉพาะจุด ไม่ใช่ระยะเวลา',
      skillTag: 'conjunction',
    },
    {
      question: 'The bridge was damaged in the storm. _____, traffic had to be diverted.',
      choices: ['Because', 'Although', 'Therefore', 'Unless'],
      correctAnswer: 'Therefore',
      explanationThai: 'สะพานเสียหายเป็นเหตุ จราจรต้องเปลี่ยนเส้นทางเป็นผล ใช้ "Therefore" เริ่มประโยคใหม่เพื่อบอกผล',
      skillTag: 'conjunction',
    },
    {
      question: 'She is studying medicine, _____ her brother is studying engineering.',
      choices: ['so', 'while', 'because', 'unless'],
      correctAnswer: 'while',
      explanationThai: '"while" ใช้แสดงการเปรียบเทียบ/ความตรงข้ามระหว่าง 2 ฝ่าย — เธอเรียนแพทย์ พี่ชายเรียนวิศวะ ส่วน "so/because/unless" ไม่ตรงความหมาย',
      skillTag: 'conjunction',
    },
    {
      question: 'You should bring your umbrella _____ it might rain later.',
      choices: ['so', 'unless', 'because', 'although'],
      correctAnswer: 'because',
      explanationThai: '"it might rain" เป็นเหตุ "should bring umbrella" เป็นผล ใช้ "because" เพื่อบอกเหตุ',
      skillTag: 'conjunction',
    },
  ],

  masteryChecklist: [
    'ฉันแยกได้ว่า because vs so ทิศทางต่างกัน',
    'ฉันรู้ว่าห้ามใช้ Although กับ but คู่กัน',
    'ฉันเข้าใจว่า unless = if not (ห้ามเติม not เพิ่ม)',
    'ฉันใช้ however ตามด้วย ; หรือขึ้นต้นประโยคใหม่',
    'ฉันใช้ while กับ continuous tense ได้',
    'ฉันเลือก connector ที่เป็นทางการ (therefore, moreover) สำหรับข้อความวิชาการ',
  ],
}

export default conjunctions
