// Grammar Lesson: Prepositions
// Level: foundation
// Most common skill tag in the exam sets — high-priority lesson.

const prepositions = {
  id: 'prepositions',
  title: 'Prepositions',
  titleThai: 'คำบุพบท (Prepositions)',
  level: 'foundation',
  status: 'available',
  relatedSkillTags: ['preposition'],
  shortDescriptionThai: 'Prepositions คือคำเล็ก ๆ เช่น in, on, at, for, by, with, of, to ที่บอกความสัมพันธ์ระหว่างคำต่าง ๆ ในประโยค การเลือก preposition ผิดเพียงตัวเดียวก็ทำให้ความหมายเปลี่ยนหรือผิดไวยากรณ์ทันที',
  whyItMattersThai: 'ในข้อสอบ cloze ระดับเข้ามหาวิทยาลัย Prepositions เป็นหนึ่งในคำที่ทดสอบบ่อยที่สุด เพราะภาษาไทยไม่มีระบบ preposition ที่ตายตัวเหมือนอังกฤษ นักเรียนต้อง "จำเป็นคู่" ระหว่างคำกริยา/คำคุณศัพท์กับ preposition ตายตัว ไม่สามารถแปลตามความหมายในใจได้',

  coreRules: [
    {
      ruleTitle: 'prepositions of time: in / on / at',
      explanationThai: 'in ใช้กับช่วงเวลายาว (เดือน ปี ฤดูกาล ส่วนของวัน). on ใช้กับวัน (วันที่ วันในสัปดาห์ วันพิเศษ). at ใช้กับเวลาเฉพาะจุด (เวลานาฬิกา จุดเวลาในวัน เช่น noon, midnight)',
      explanationEnglish: '"in" for long time periods (months, years, seasons, parts of the day). "on" for days (dates, weekdays, special days). "at" for specific points (clock times, noon, midnight, night).',
      pattern: 'in + month/year/season | on + day/date | at + specific time',
      correctExamples: [
        {
          sentence: 'The festival takes place in December every year.',
          translationThai: 'งานเทศกาลจัดในเดือนธันวาคมทุกปี',
          noteThai: '"in" + เดือน',
        },
        {
          sentence: 'My birthday is on June 15th.',
          translationThai: 'วันเกิดฉันคือวันที่ 15 มิถุนายน',
          noteThai: '"on" + วันที่',
        },
        {
          sentence: 'The meeting starts at 9:00 a.m.',
          translationThai: 'การประชุมเริ่มเวลา 9 โมงเช้า',
          noteThai: '"at" + เวลานาฬิกา',
        },
        {
          sentence: 'I usually study in the evening.',
          translationThai: 'ฉันมักอ่านหนังสือตอนเย็น',
          noteThai: '"in" + ช่วงของวัน (the morning/evening) แต่ "at night" (ยกเว้น)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I will see you at Monday.',
          correction: 'I will see you on Monday.',
          whyWrongThai: 'วันในสัปดาห์ใช้ "on" ไม่ใช่ at',
        },
        {
          sentence: 'She was born on 1998.',
          correction: 'She was born in 1998.',
          whyWrongThai: 'ปีใช้ "in" ไม่ใช่ on',
        },
      ],
    },
    {
      ruleTitle: 'prepositions of place: in / on / at',
      explanationThai: 'in ใช้กับพื้นที่ปิด/ภายใน (in the room, in Bangkok). on ใช้กับพื้นผิว/เส้น (on the table, on the wall, on the road). at ใช้กับจุดเฉพาะ (at the door, at the bus stop, at the meeting)',
      explanationEnglish: '"in" for enclosed/inside spaces. "on" for surfaces/lines. "at" for specific points or locations.',
      pattern: 'in + city/country/room | on + surface/street | at + specific point',
      correctExamples: [
        {
          sentence: 'She lives in a small village in northern Thailand.',
          translationThai: 'เธออาศัยในหมู่บ้านเล็ก ๆ ทางเหนือของไทย',
          noteThai: '"in" + พื้นที่/ประเทศ',
        },
        {
          sentence: 'The book is on the kitchen table.',
          translationThai: 'หนังสืออยู่บนโต๊ะในครัว',
          noteThai: '"on" + พื้นผิว',
        },
        {
          sentence: 'I will meet you at the entrance of the library.',
          translationThai: 'ฉันจะรอคุณที่ทางเข้าห้องสมุด',
          noteThai: '"at" + จุดเฉพาะ',
        },
        {
          sentence: 'There is a large painting on the wall.',
          translationThai: 'มีภาพวาดใหญ่บนผนัง',
          noteThai: '"on" + ผนัง (พื้นผิวแนวตั้ง)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'She works in a bank at Bangkok.',
          correction: 'She works in a bank in Bangkok.',
          whyWrongThai: 'เมือง/ประเทศใช้ "in" ไม่ใช่ at',
        },
      ],
    },
    {
      ruleTitle: 'verb + preposition (fixed pairs)',
      explanationThai: 'กริยาหลายตัวมี preposition คู่ตายตัวที่ต้องจำ เช่น depend on, agree with, listen to, look at, wait for, apologize for. ห้ามเดาจากการแปล',
      explanationEnglish: 'Many verbs are followed by a fixed preposition. These pairs must be memorized — they cannot be guessed from translation.',
      pattern: 'verb + fixed preposition + noun/pronoun/V-ing',
      correctExamples: [
        {
          sentence: 'I am waiting for the bus to arrive.',
          translationThai: 'ฉันกำลังรอรถบัสมา',
          noteThai: '"wait for" ตายตัว ไม่ใช่ wait',
        },
        {
          sentence: 'Please listen to the announcement carefully.',
          translationThai: 'กรุณาฟังประกาศอย่างตั้งใจ',
          noteThai: '"listen to" ตายตัว ห้ามใช้ listen at',
        },
        {
          sentence: 'Success depends on hard work and patience.',
          translationThai: 'ความสำเร็จขึ้นอยู่กับการทำงานหนักและความอดทน',
          noteThai: '"depend on" ตายตัว',
        },
        {
          sentence: 'Everyone agreed with my proposal.',
          translationThai: 'ทุกคนเห็นด้วยกับข้อเสนอของฉัน',
          noteThai: '"agree with + คน/ความคิด" ตายตัว',
        },
      ],
      wrongExamples: [
        {
          sentence: 'Please listen at the teacher.',
          correction: 'Please listen to the teacher.',
          whyWrongThai: '"listen to" ตายตัว ห้ามใช้ at',
        },
        {
          sentence: 'I am waiting at my friend at the station.',
          correction: 'I am waiting for my friend at the station.',
          whyWrongThai: '"wait for + คน/สิ่ง" ตายตัว ส่วน at บอกตำแหน่งสถานที่',
        },
      ],
    },
    {
      ruleTitle: 'adjective + preposition (fixed pairs)',
      explanationThai: 'คำคุณศัพท์หลายตัวมี preposition คู่ตายตัว เช่น good at, afraid of, proud of, interested in, married to, famous for, similar to, different from',
      explanationEnglish: 'Many adjectives are paired with a fixed preposition. Each adjective takes only one preposition by convention.',
      pattern: 'be + adjective + fixed preposition + noun/V-ing',
      correctExamples: [
        {
          sentence: 'She is good at solving difficult math problems.',
          translationThai: 'เธอเก่งในการแก้โจทย์คณิตศาสตร์ที่ยาก',
          noteThai: '"good at" ตายตัว ห้ามใช้ in/on',
        },
        {
          sentence: 'My grandfather is afraid of flying.',
          translationThai: 'คุณตาฉันกลัวการขึ้นเครื่องบิน',
          noteThai: '"afraid of" ตายตัว ห้ามใช้ from/about',
        },
        {
          sentence: 'They are proud of their daughter\'s achievement.',
          translationThai: 'พวกเขาภูมิใจในความสำเร็จของลูกสาว',
          noteThai: '"proud of" ตายตัว',
        },
        {
          sentence: 'This city is famous for its night markets.',
          translationThai: 'เมืองนี้มีชื่อเสียงด้านตลาดกลางคืน',
          noteThai: '"famous for + สิ่ง" ตายตัว',
        },
      ],
      wrongExamples: [
        {
          sentence: 'He is good in English.',
          correction: 'He is good at English.',
          whyWrongThai: '"good at" ตายตัวสำหรับทักษะ ห้ามใช้ in',
        },
        {
          sentence: 'She is afraid from snakes.',
          correction: 'She is afraid of snakes.',
          whyWrongThai: '"afraid of" ตายตัว ห้ามใช้ from',
        },
      ],
    },
    {
      ruleTitle: 'preposition after passive voice',
      explanationThai: 'หลัง passive voice ใช้ "by" บอกผู้กระทำ และใช้ "with" บอกเครื่องมือ/วิธีการ. การสับสนระหว่าง by กับ with เป็นกับดักที่พบบ่อยในข้อสอบ',
      explanationEnglish: 'In passive voice, "by" introduces the agent (who did it), while "with" introduces the instrument or method (what was used).',
      pattern: 'be + V3 + by + agent / be + V3 + with + instrument',
      correctExamples: [
        {
          sentence: 'The novel was written by a famous author.',
          translationThai: 'นวนิยายเล่มนี้เขียนโดยนักเขียนชื่อดัง',
          noteThai: '"by + ผู้เขียน" (ผู้กระทำ)',
        },
        {
          sentence: 'The cake was decorated with fresh flowers.',
          translationThai: 'เค้กถูกตกแต่งด้วยดอกไม้สด',
          noteThai: '"with + เครื่องมือ/วัสดุ"',
        },
        {
          sentence: 'The window was broken by a stone.',
          translationThai: 'หน้าต่างถูกทุบโดยก้อนหิน',
          noteThai: 'ในกรณีนี้ "by" + สิ่งที่เป็นตัวกระทำ',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The letter was written with my brother.',
          correction: 'The letter was written by my brother.',
          whyWrongThai: 'ผู้เขียน (ผู้กระทำ) ใช้ "by" ไม่ใช่ with',
        },
        {
          sentence: 'The fish was caught by a net.',
          correction: 'The fish was caught with a net. (or: The fish was caught by the fisherman.)',
          whyWrongThai: 'อวน (เครื่องมือ) ใช้ "with" ไม่ใช่ by',
        },
      ],
    },
    {
      ruleTitle: 'common prepositions: for / of / to / from',
      explanationThai: 'for บอกจุดประสงค์/ผู้รับ. of บอกความเป็นเจ้าของ/ส่วนหนึ่ง. to บอกทิศทาง/ผู้รับ. from บอกจุดเริ่มต้น/แหล่งกำเนิด',
      explanationEnglish: '"for" expresses purpose/recipient. "of" expresses possession/part of. "to" expresses direction/recipient. "from" expresses origin/source.',
      pattern: 'verb/noun + for/of/to/from + noun',
      correctExamples: [
        {
          sentence: 'I bought a present for my mother.',
          translationThai: 'ฉันซื้อของขวัญให้แม่',
          noteThai: '"for + ผู้รับประโยชน์"',
        },
        {
          sentence: 'She is the leader of our team.',
          translationThai: 'เธอเป็นหัวหน้าของทีมเรา',
          noteThai: '"of" บอกความเป็นเจ้าของ/ส่วนหนึ่ง',
        },
        {
          sentence: 'He gave the book to his friend.',
          translationThai: 'เขาให้หนังสือแก่เพื่อน',
          noteThai: '"to + ผู้รับ" หลังกริยา give/send/show',
        },
        {
          sentence: 'This recipe is from my grandmother.',
          translationThai: 'สูตรอาหารนี้มาจากคุณยายของฉัน',
          noteThai: '"from + แหล่งกำเนิด"',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I bought a gift to my mother.',
          correction: 'I bought a gift for my mother.',
          whyWrongThai: 'หลังกริยา buy ใช้ "for + ผู้รับ" ส่วน to ใช้กับ give/send/show',
        },
      ],
    },
  ],

  examPatterns: [
    {
      patternName: 'time preposition trap (in/on/at)',
      howItAppearsInExamThai: 'โจทย์มีคำบอกเวลา เช่น Monday, June, 9 a.m. ตัวเลือก in/on/at ดูใช้ได้ทุกตัว',
      signalWords: ['Monday', 'June', '2025', 'morning', 'noon', 'midnight', 'weekend'],
      trapChoices: ['at + day (ผิด)', 'in + clock time (ผิด)', 'on + month (ผิด)'],
      examTipThai: 'จำกฎ: in + ช่วงยาว (เดือน ปี ฤดูกาล), on + วัน (date วันสัปดาห์), at + จุดเฉพาะ (เวลานาฬิกา noon)',
    },
    {
      patternName: 'adjective + preposition trap',
      howItAppearsInExamThai: 'ตัวเลือก preposition 4 ตัว แต่คำคุณศัพท์มี preposition ตายตัวเพียงตัวเดียว',
      signalWords: ['good', 'afraid', 'proud', 'interested', 'married', 'famous', 'similar', 'different'],
      trapChoices: ['good in (ผิด)', 'afraid from (ผิด)', 'proud about (ผิด)', 'interested on (ผิด)'],
      examTipThai: 'จำคู่ตายตัว: good at, afraid of, proud of, interested in, married to, famous for, similar to, different from',
    },
    {
      patternName: 'by vs with in passive voice',
      howItAppearsInExamThai: 'ประโยค passive ที่มีตัวเลือก by, with, of, from',
      signalWords: ['was/were + V3', 'tool', 'agent', 'pen', 'knife', 'author', 'artist'],
      trapChoices: ['with + ผู้กระทำ (ผิด)', 'by + เครื่องมือ (ผิด)'],
      examTipThai: 'by + ผู้กระทำ (คน). with + เครื่องมือ/วัสดุ (สิ่งของ). ดูว่าหลัง preposition คือใคร/อะไร',
    },
    {
      patternName: 'verb + preposition fixed pair',
      howItAppearsInExamThai: 'ตัวเลือก preposition 4 ตัว นักเรียนเดาตามการแปลแล้วผิด',
      signalWords: ['depend', 'rely', 'wait', 'listen', 'look', 'apologize', 'agree', 'consist'],
      trapChoices: ['depend in/at (ผิด)', 'wait at (เมื่อหมายถึงสิ่งที่รอ)', 'listen at (ผิด)'],
      examTipThai: 'ตายตัวต้องจำ: depend on, rely on, wait for, listen to, look at, apologize for, agree with, consist of',
    },
    {
      patternName: 'percent/half/most + of',
      howItAppearsInExamThai: 'หลังคำบอกปริมาณตามด้วย noun phrase ตัวเลือก in/of/at/on',
      signalWords: ['percent', 'half', 'most', 'all', 'some', 'none'],
      trapChoices: ['in/at/on (ผิดทั้งหมด)'],
      examTipThai: 'หลัง quantifier (percent, half, most, all, some) ใช้ "of" + noun phrase เสมอ',
    },
  ],

  commonMistakesThaiStudents: [
    {
      mistake: 'แปลคำต่อคำจากไทยเป็นอังกฤษ',
      whyItHappensThai: 'นักเรียนคิดในใจว่า "ใน" = in, "ที่" = at, แต่ภาษาอังกฤษมีคู่ตายตัวที่ต้องจำเป็นคู่ ๆ',
      fixThai: 'อย่าแปลตามความรู้สึก — จำกริยา/คุณศัพท์พร้อม preposition เป็นหน่วยเดียว',
      example: 'ผิด: I am interested on music. → ถูก: I am interested in music.',
    },
    {
      mistake: 'สับสน in/on/at สำหรับเวลา',
      whyItHappensThai: 'ทั้ง 3 ตัวแปลใกล้กันในไทย ("ใน" "ตอน" "ที่")',
      fixThai: 'จำกฎ: in + ยาว (เดือน ปี), on + วัน, at + จุด (เวลานาฬิกา)',
      example: 'ผิด: I will go to school in Monday. → ถูก: I will go to school on Monday.',
    },
    {
      mistake: 'ลืมใส่ preposition กับกริยาเฉพาะ',
      whyItHappensThai: 'ในไทยกริยาบางตัวไม่ต้องมี preposition แต่ในอังกฤษต้องมี',
      fixThai: 'จำกริยาที่ต้องมี preposition: listen to, wait for, look at, depend on, rely on',
      example: 'ผิด: I am waiting my friend. → ถูก: I am waiting for my friend.',
    },
    {
      mistake: 'ใช้ "with" แทน "by" ใน passive voice',
      whyItHappensThai: 'นักเรียนคิดว่า "by" และ "with" แปลเป็น "ด้วย/โดย" เหมือนกัน',
      fixThai: 'by + ผู้กระทำ (คน). with + เครื่องมือ (สิ่งของ). ทดสอบ: หลัง preposition คือใคร/อะไร',
      example: 'ผิด: The book was written with John. → ถูก: The book was written by John.',
    },
    {
      mistake: 'สับสน at/in สำหรับสถานที่',
      whyItHappensThai: 'ภาษาไทยใช้ "ที่" สำหรับเกือบทุกสถานที่',
      fixThai: 'in + พื้นที่/อาคาร/เมือง/ประเทศ. at + จุดเฉพาะ (the door, the bus stop, the meeting). on + พื้นผิว/ถนน',
      example: 'ผิด: She lives at Bangkok. → ถูก: She lives in Bangkok.',
    },
  ],

  quickRulesThai: [
    'in + เดือน/ปี/ฤดูกาล/ส่วนของวัน (in June, in 2025, in the morning)',
    'on + วัน/วันที่ (on Monday, on June 5)',
    'at + เวลานาฬิกา/จุดเฉพาะ (at 9 a.m., at noon, at the door)',
    'good at, afraid of, proud of, interested in, married to, famous for',
    'depend on, rely on, wait for, listen to, look at, apologize for, agree with',
    'by + ผู้กระทำ (passive). with + เครื่องมือ',
    'percent/half/most + of + noun',
  ],

  memoryTipsThai: [
    'จำเป็นคู่: verb+preposition และ adjective+preposition',
    'ภาพในใจ: in = ในกล่อง, on = บนพื้น, at = จุด',
    'เวลา: ยาวไป short — in (ยาวสุด) → on (กลาง) → at (สั้นสุด)',
    'ทำแฟลชการ์ด adjective+preposition แล้วทบทวนสัปดาห์ละ 3 ครั้ง',
    'อ่านข้อสอบเก่า สังเกตคู่คำที่เห็นบ่อย — มักซ้ำ',
  ],

  miniQuiz: [
    {
      question: 'My family always celebrates Songkran _____ April.',
      choices: ['at', 'on', 'in', 'by'],
      correctAnswer: 'in',
      explanationThai: 'เดือน (April) ใช้ "in" ส่วน at ใช้กับเวลานาฬิกา on ใช้กับวัน by ใช้บอกผู้กระทำ',
      skillTag: 'preposition',
    },
    {
      question: 'She is very interested _____ traditional Thai music.',
      choices: ['at', 'on', 'in', 'about'],
      correctAnswer: 'in',
      explanationThai: '"interested in" เป็น adjective + preposition ตายตัว ห้ามใช้ at/on/about',
      skillTag: 'preposition',
    },
    {
      question: 'The report was written _____ a senior researcher.',
      choices: ['with', 'by', 'from', 'of'],
      correctAnswer: 'by',
      explanationThai: 'หลัง passive voice ใช้ "by" + ผู้กระทำ ส่วน "with" ใช้กับเครื่องมือ',
      skillTag: 'preposition',
    },
    {
      question: 'My grandfather is afraid _____ heights.',
      choices: ['from', 'about', 'of', 'with'],
      correctAnswer: 'of',
      explanationThai: '"afraid of" ตายตัว ห้ามใช้ from/about/with',
      skillTag: 'preposition',
    },
    {
      question: 'Please wait _____ me at the entrance.',
      choices: ['at', 'for', 'on', 'to'],
      correctAnswer: 'for',
      explanationThai: '"wait for + คน/สิ่ง" ตายตัว ห้ามใช้ at (at = ตำแหน่ง ไม่ใช่ผู้รับการรอ)',
      skillTag: 'preposition',
    },
    {
      question: 'About sixty percent _____ the students passed the exam.',
      choices: ['in', 'of', 'at', 'on'],
      correctAnswer: 'of',
      explanationThai: 'หลัง percent/half/most ใช้ "of + noun phrase" ตายตัว',
      skillTag: 'preposition',
    },
    {
      question: 'The artist drew the portrait _____ a single pencil.',
      choices: ['by', 'with', 'from', 'of'],
      correctAnswer: 'with',
      explanationThai: '"with + เครื่องมือ" ในประโยค passive/ใช้เครื่องมือ ส่วน by ใช้กับผู้กระทำ',
      skillTag: 'preposition',
    },
    {
      question: 'She has lived in Bangkok _____ 2010.',
      choices: ['since', 'in', 'from', 'at'],
      correctAnswer: 'since',
      explanationThai: '"since + จุดเริ่มต้น" ใช้กับ Present Perfect (has lived) ส่วน "from" ต้องคู่กับ "to" และ "in" ใช้กับช่วงระยะ',
      skillTag: 'preposition',
    },
  ],

  masteryChecklist: [
    'ฉันแยก in/on/at สำหรับเวลาได้ (in June, on Monday, at 9 a.m.)',
    'ฉันแยก in/on/at สำหรับสถานที่ได้ (in Bangkok, on the table, at the door)',
    'ฉันจำคู่ adjective + preposition หลัก ๆ ได้',
    'ฉันจำคู่ verb + preposition หลัก ๆ ได้',
    'ฉันใช้ by + ผู้กระทำ และ with + เครื่องมือ ใน passive voice ได้',
    'ฉันใช้ "of" หลัง quantifier (percent, half, most) ได้',
    'ฉันรู้ว่า since + จุดเริ่มต้น และ for + ระยะเวลา',
  ],
}

export default prepositions
