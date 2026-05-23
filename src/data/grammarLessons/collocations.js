// Grammar Lesson: Collocations
// Level: intermediate
// Targets the underused "collocation" skill tag.

const collocations = {
  id: 'collocations',
  title: 'Collocations',
  titleThai: 'การจับคู่คำ (Collocations)',
  level: 'intermediate',
  status: 'available',
  relatedSkillTags: ['collocation'],
  shortDescriptionThai: 'Collocations คือคำที่เจ้าของภาษามักใช้คู่กันโดยธรรมชาติ เช่น "make a decision" ไม่ใช่ "do a decision" การรู้จักคู่คำที่ถูกต้องช่วยให้เลือกคำตอบที่ดูเหมือนถูกหลายตัวได้แม่นยำขึ้น',
  whyItMattersThai: 'ในข้อสอบ cloze ระดับเข้ามหาวิทยาลัย ตัวเลือก 4 ตัวมักเป็นคำที่ความหมายใกล้เคียงกัน (เช่น do/make/take/have) แต่มีเพียงตัวเดียวเท่านั้นที่ "เข้าคู่" กับคำข้างเคียงโดยถูกต้อง การจำ collocation ที่พบบ่อยจึงสำคัญมาก',

  coreRules: [
    {
      ruleTitle: 'verb + noun collocations: do vs make vs take vs have',
      explanationThai: 'กริยาทั่วไปอย่าง do, make, take, have ใช้คู่กับคำนามต่างกัน แม้แปลเป็นไทยอาจเหมือนกัน เช่น "ทำการตัดสินใจ" = make a decision ไม่ใช่ do a decision',
      explanationEnglish: 'General verbs (do, make, take, have) pair with specific nouns. The Thai meaning may be the same, but English speakers use only one combination by convention.',
      pattern: 'verb + (article) + noun (fixed pair)',
      correctExamples: [
        {
          sentence: 'She made an important decision last night.',
          translationThai: 'เธอตัดสินใจสำคัญเมื่อคืน',
          noteThai: '"make a decision" — ตายตัว ห้ามใช้ "do"',
        },
        {
          sentence: 'He took a deep breath before speaking.',
          translationThai: 'เขาสูดหายใจลึก ๆ ก่อนพูด',
          noteThai: '"take a breath" — ตายตัว ห้ามใช้ "make"',
        },
        {
          sentence: 'I had a long conversation with my teacher.',
          translationThai: 'ฉันคุยกับครูของฉันยาวมาก',
          noteThai: '"have a conversation" — ตายตัว ห้ามใช้ "do"',
        },
        {
          sentence: 'Please do me a favor and close the window.',
          translationThai: 'ช่วยปิดหน้าต่างให้หน่อยได้ไหม',
          noteThai: '"do someone a favor" — ตายตัว',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I did a mistake on the test.',
          correction: 'I made a mistake on the test.',
          whyWrongThai: '"make a mistake" เป็น collocation ที่ตายตัว ห้ามใช้ "do"',
        },
        {
          sentence: 'He made a shower this morning.',
          correction: 'He took a shower this morning.',
          whyWrongThai: '"take a shower" ตายตัว ห้ามใช้ "make"',
        },
      ],
    },
    {
      ruleTitle: 'verb + preposition collocations',
      explanationThai: 'หลายกริยาในภาษาอังกฤษมีคู่ preposition ที่ตายตัว เช่น depend on (ไม่ใช่ depend in), apologize for (ไม่ใช่ apologize about ในความหมายขอโทษ)',
      explanationEnglish: 'Many English verbs are followed by a fixed preposition. Using the wrong preposition produces an unnatural or incorrect sentence.',
      pattern: 'verb + fixed preposition + noun/V-ing',
      correctExamples: [
        {
          sentence: 'Success depends on hard work and patience.',
          translationThai: 'ความสำเร็จขึ้นอยู่กับการทำงานหนักและความอดทน',
          noteThai: '"depend on" ตายตัว',
        },
        {
          sentence: 'She apologized for being late.',
          translationThai: 'เธอขอโทษที่มาสาย',
          noteThai: '"apologize for + V-ing" ตายตัว',
        },
        {
          sentence: 'They are looking forward to the holiday.',
          translationThai: 'พวกเขากำลังตั้งตารอวันหยุด',
          noteThai: '"look forward to + noun/V-ing" ตายตัว',
        },
        {
          sentence: 'I am interested in learning Japanese.',
          translationThai: 'ฉันสนใจการเรียนภาษาญี่ปุ่น',
          noteThai: '"interested in + noun/V-ing" ตายตัว',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I am interested on art.',
          correction: 'I am interested in art.',
          whyWrongThai: 'หลัง "interested" ใช้ "in" เสมอ',
        },
        {
          sentence: 'She apologized about coming late.',
          correction: 'She apologized for coming late.',
          whyWrongThai: '"apologize for + เหตุผล" ตายตัว ห้ามใช้ about',
        },
      ],
    },
    {
      ruleTitle: 'adjective + preposition collocations',
      explanationThai: 'คำคุณศัพท์หลายตัวมี preposition ตายตัว เช่น good at (ไม่ใช่ good in/on), afraid of (ไม่ใช่ afraid for), proud of (ไม่ใช่ proud about)',
      explanationEnglish: 'Many adjectives are paired with a fixed preposition that students must memorize as a unit.',
      pattern: 'be + adjective + fixed preposition + noun/V-ing',
      correctExamples: [
        {
          sentence: 'She is good at solving difficult problems.',
          translationThai: 'เธอเก่งในการแก้ปัญหาที่ยาก',
          noteThai: '"good at" ตายตัว',
        },
        {
          sentence: 'My brother is afraid of dogs.',
          translationThai: 'พี่ชายฉันกลัวสุนัข',
          noteThai: '"afraid of" ตายตัว',
        },
        {
          sentence: 'They are proud of their daughter\'s achievements.',
          translationThai: 'พวกเขาภูมิใจในความสำเร็จของลูกสาว',
          noteThai: '"proud of" ตายตัว',
        },
      ],
      wrongExamples: [
        {
          sentence: 'He is good in math.',
          correction: 'He is good at math.',
          whyWrongThai: '"good at" ตายตัวในภาษาอังกฤษ ห้ามใช้ in',
        },
      ],
    },
    {
      ruleTitle: 'noun + noun collocations and abstract pairs',
      explanationThai: 'การจับคู่คำเชิงนามธรรม เช่น "rest on a foundation" "hinge on a decision" "rely on someone" มีลำดับความเป็นทางการต่างกัน ในข้อสอบเขียนจะเห็น rest on หรือ depend on มากที่สุด',
      explanationEnglish: 'Abstract collocations like "success rests on," "an argument hinges on," and "we rely on someone" each carry a slightly different shade of meaning and formality.',
      pattern: 'noun/subject + verb + on + noun (abstract relationship)',
      correctExamples: [
        {
          sentence: 'His success rested on years of patient effort.',
          translationThai: 'ความสำเร็จของเขาขึ้นอยู่กับความพยายามหลายปี',
          noteThai: '"rest on" สำหรับฐานเชิงนามธรรม',
        },
        {
          sentence: 'The whole case hinges on this single piece of evidence.',
          translationThai: 'คดีทั้งหมดขึ้นอยู่กับหลักฐานชิ้นนี้เพียงชิ้นเดียว',
          noteThai: '"hinge on" = ขึ้นอยู่กับสิ่งสำคัญที่สุด',
        },
        {
          sentence: 'We rely on each other during difficult times.',
          translationThai: 'พวกเราพึ่งพากันในยามยาก',
          noteThai: '"rely on someone" สำหรับความสัมพันธ์ระหว่างคน',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The plan rested in his decision.',
          correction: 'The plan rested on his decision.',
          whyWrongThai: '"rest on" ตายตัว ห้ามใช้ rest in',
        },
      ],
    },
  ],

  examPatterns: [
    {
      patternName: '4 verbs that all mean "ทำ" but only one fits',
      howItAppearsInExamThai: 'ตัวเลือกมี do, make, take, have ทั้ง 4 ตัว ดูเหมือนถูกหลายตัว แต่ผู้ออกข้อสอบกำหนด collocation เฉพาะ',
      signalWords: ['mistake', 'decision', 'shower', 'breath', 'conversation', 'favor', 'choice'],
      trapChoices: ['do a decision', 'make a shower', 'have a mistake'],
      examTipThai: 'จำคู่หลัก: make + ความคิด/สิ่งสร้าง (decision, mistake, choice). take + การกระทำสั้น ๆ (shower, breath, look). do + งาน/หน้าที่ (homework, favor). have + ประสบการณ์ (conversation, party)',
    },
    {
      patternName: 'preposition trap with familiar adjectives',
      howItAppearsInExamThai: 'ตัวเลือก preposition 4 ตัว แต่คำคุณศัพท์มี preposition ตายตัวเพียงตัวเดียว',
      signalWords: ['good', 'afraid', 'proud', 'interested', 'married', 'famous'],
      trapChoices: ['good in', 'afraid for', 'proud about', 'interested on'],
      examTipThai: 'อย่าแปลแล้วเดา preposition จากภาษาไทย — ต้องจำคู่ตายตัว: good at, afraid of, proud of, interested in, married to, famous for',
    },
    {
      patternName: 'verb + preposition that students translate wrong',
      howItAppearsInExamThai: 'ตัวเลือกมี on, in, at, for, about ทั้งที่ดูเหมือนใช้ได้ทั้งหมด',
      signalWords: ['depend', 'apologize', 'rely', 'consist', 'belong'],
      trapChoices: ['depend in', 'apologize about', 'rely in'],
      examTipThai: 'จำกริยา + preposition ตายตัว: depend on, rely on, consist of, belong to, apologize for, agree with',
    },
    {
      patternName: 'formal collocations in academic passages',
      howItAppearsInExamThai: 'บทความทางวิชาการมักใช้คำคู่ที่เป็นทางการ เช่น "rest on" "hinge on" "stem from" ตัวเลือกมีคำที่ใกล้เคียงเช่น "depend on" "stand on" "come from"',
      signalWords: ['success', 'argument', 'theory', 'failure', 'decision'],
      trapChoices: ['rely (สำหรับสิ่งของ)', 'come (สำหรับเหตุผล)'],
      examTipThai: 'ในข้อความวิชาการเลือก collocation ที่เป็นทางการกว่า — rest on > depend on, stem from > come from',
    },
  ],

  commonMistakesThaiStudents: [
    {
      mistake: 'แปลคำต่อคำจากไทยเป็นอังกฤษ',
      whyItHappensThai: '"ทำการตัดสินใจ" → "do a decision" เพราะ "ทำ" = "do" ในใจ',
      fixThai: 'collocation ไม่ใช่การแปลตามความหมายของกริยา — ต้องจำเป็นคู่ ๆ ทุกคู่',
      example: 'ผิด: do a decision → ถูก: make a decision',
    },
    {
      mistake: 'ใช้ preposition ผิดกับ adjective',
      whyItHappensThai: 'ในไทยใช้ "ใน" สำหรับเกือบทุกความหมาย เลยเอา in มาใส่กับ adjective ทุกตัว',
      fixThai: 'จำคู่: good at, afraid of, proud of, interested in. คนละ preposition ทั้งหมด ห้ามใช้ in รวบ',
      example: 'ผิด: She is good in English. → ถูก: She is good at English.',
    },
    {
      mistake: 'ใช้ "do" กับการกระทำที่จริง ๆ ใช้ make/take/have',
      whyItHappensThai: '"do" ดูเป็นกริยากลางที่ใช้ได้ทุกอย่าง แต่จริง ๆ มีคู่จำกัด',
      fixThai: 'do = หน้าที่/งาน (homework, exercise, favor) เท่านั้น. ที่อื่นต้องใช้ make/take/have',
      example: 'ผิด: do a phone call → ถูก: make a phone call',
    },
    {
      mistake: 'เปลี่ยน preposition เพราะคิดว่า "ฟังดูดีกว่า"',
      whyItHappensThai: 'นักเรียนเดา preposition จากความรู้สึก ไม่ได้จำเป็นคู่',
      fixThai: 'ทุก verb-preposition collocation ต้องเรียนเป็นคู่ตายตัว ไม่ใช่เลือกตามความรู้สึก',
      example: 'ผิด: I depend in my parents. → ถูก: I depend on my parents.',
    },
    {
      mistake: 'ใช้ collocation ที่เป็นภาษาพูดในข้อสอบเขียน',
      whyItHappensThai: 'ฟัง YouTube หรือซีรีส์มามาก เลยเอา collocation แบบไม่เป็นทางการมาใช้',
      fixThai: 'ในข้อสอบเขียนใช้ collocation ที่เป็นทางการ เช่น make a decision (ไม่ใช่ go with, pick)',
      example: 'ผิด (ในข้อสอบ): pick a choice → ถูก: make a choice',
    },
  ],

  quickRulesThai: [
    'collocation เรียนเป็นคู่ ไม่ใช่แปลคำต่อคำ',
    'make + สิ่งที่สร้างขึ้น (decision, mistake, choice, plan)',
    'take + การกระทำสั้น ๆ (shower, breath, look, walk)',
    'do + หน้าที่/งาน (homework, exercise, favor, business)',
    'have + ประสบการณ์ (conversation, meeting, party, lunch)',
    'good at, afraid of, proud of, interested in — adjective + preposition คู่ตายตัว',
    'depend on, rely on, agree with, consist of — verb + preposition คู่ตายตัว',
  ],

  memoryTipsThai: [
    'จด collocation เป็นคู่บนการ์ดเล็ก ทบทวนทุกวัน',
    'อ่านข้อสอบเก่า ๆ แล้วทำเครื่องหมายคู่คำที่เห็นบ่อย — มักซ้ำ',
    'ฟังเพลงและหนัง สังเกตคู่คำที่เจ้าของภาษาใช้บ่อย',
    'เมื่อเจอคำตอบ 4 ตัวที่แปลคล้ายกัน ตัด 3 ตัวที่ "ฟังดูแปลก" ออกก่อน',
    'จำ "make + idea/plan", "take + action", "do + duty", "have + experience"',
  ],

  miniQuiz: [
    {
      question: 'Please don\'t _____ noise while the baby is sleeping.',
      choices: ['do', 'make', 'take', 'have'],
      correctAnswer: 'make',
      explanationThai: '"make noise" เป็น collocation ตายตัว ส่วน "do noise" / "take noise" / "have noise" ไม่ใช่ภาษาอังกฤษที่ถูกต้อง',
      skillTag: 'collocation',
    },
    {
      question: 'She is very interested _____ classical music.',
      choices: ['on', 'in', 'at', 'about'],
      correctAnswer: 'in',
      explanationThai: '"interested in" เป็น adjective + preposition ตายตัว ไม่สามารถใช้ on / at / about ได้',
      skillTag: 'collocation',
    },
    {
      question: 'The success of the project _____ on careful planning.',
      choices: ['hangs', 'depends', 'stays', 'lives'],
      correctAnswer: 'depends',
      explanationThai: '"depend on" เป็น collocation ที่ใช้แสดงความสัมพันธ์เชิงสาเหตุ ส่วน hang/stay/live + on ไม่ตรงความหมาย',
      skillTag: 'collocation',
    },
    {
      question: 'I need to _____ a phone call before the meeting starts.',
      choices: ['do', 'make', 'take', 'have'],
      correctAnswer: 'make',
      explanationThai: '"make a phone call" เป็น collocation ตายตัว ส่วน "take a call" หมายถึงการ "รับ" สาย ไม่ใช่ "โทร"',
      skillTag: 'collocation',
    },
    {
      question: 'My grandmother is afraid _____ heights.',
      choices: ['of', 'from', 'about', 'with'],
      correctAnswer: 'of',
      explanationThai: '"afraid of" เป็น adjective + preposition ตายตัว ห้ามใช้ from/about/with',
      skillTag: 'collocation',
    },
    {
      question: 'Let\'s _____ a short break before continuing.',
      choices: ['do', 'make', 'take', 'have'],
      correctAnswer: 'take',
      explanationThai: '"take a break" เป็น collocation ตายตัว ส่วน "have a break" ใช้ได้ในภาษาพูด แต่ "take a break" เป็นทางการกว่าและพบในข้อสอบบ่อยกว่า',
      skillTag: 'collocation',
    },
    {
      question: 'The team apologized _____ being late to the presentation.',
      choices: ['about', 'on', 'for', 'in'],
      correctAnswer: 'for',
      explanationThai: '"apologize for + เหตุผล/V-ing" เป็น collocation ตายตัว ส่วน apologize about ไม่ใช่ภาษาอังกฤษมาตรฐาน',
      skillTag: 'collocation',
    },
    {
      question: 'She is very proud _____ her son\'s graduation.',
      choices: ['about', 'with', 'of', 'on'],
      correctAnswer: 'of',
      explanationThai: '"proud of" เป็น adjective + preposition ตายตัว ห้ามใช้ about/with/on',
      skillTag: 'collocation',
    },
  ],

  masteryChecklist: [
    'ฉันรู้ความแตกต่างระหว่าง do, make, take, have ในการจับคู่กับคำนาม',
    'ฉันจำคู่ adjective + preposition หลักได้ (good at, afraid of, proud of, interested in)',
    'ฉันจำคู่ verb + preposition หลักได้ (depend on, rely on, apologize for, agree with)',
    'ฉันรู้ว่า collocation ต้องเรียนเป็นคู่ ไม่ใช่แปลคำต่อคำจากไทย',
    'ฉันใช้ collocation ที่เป็นทางการในข้อสอบเขียน (make a decision ไม่ใช่ go with)',
  ],
}

export default collocations
