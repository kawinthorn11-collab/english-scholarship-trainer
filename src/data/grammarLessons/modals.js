// Grammar Lesson: Modals
// Level: intermediate
// Targets the underused "modal" skill tag in Sets 01–03.

const modals = {
  id: 'modals',
  title: 'Modals',
  titleThai: 'คำกริยาช่วย (Modals)',
  level: 'intermediate',
  status: 'available',
  relatedSkillTags: ['modal'],
  shortDescriptionThai: 'Modals คือคำกริยาช่วย เช่น can, must, should, may ที่บอกความสามารถ ความเป็นไปได้ การให้คำแนะนำ หน้าที่ และการคาดเดา ซึ่งเป็นประเด็นที่พบบ่อยในข้อสอบเติมคำ',
  whyItMattersThai: 'ในข้อสอบ cloze ระดับเข้ามหาวิทยาลัย Modals ถูกใช้ทดสอบว่านักเรียนเข้าใจ "ความหมายแฝง" ของแต่ละคำหรือไม่ — เช่น must ไม่เท่ากับ should และ could ไม่เท่ากับ would ความผิดพลาดเล็ก ๆ ระหว่าง modal สองตัวมักทำให้เสียคะแนน',

  coreRules: [
    {
      ruleTitle: 'can / could — ability and possibility',
      explanationThai: '"can" ใช้บอกความสามารถในปัจจุบันหรือความเป็นไปได้ทั่วไป ส่วน "could" ใช้บอกความสามารถในอดีต ความเป็นไปได้ที่ไม่แน่นอน หรือเพื่อให้สุภาพมากขึ้น',
      explanationEnglish: '"can" expresses present ability or general possibility. "could" expresses past ability, polite requests, or weaker possibility.',
      pattern: 'subject + can/could + base verb (V1)',
      correctExamples: [
        {
          sentence: 'She can speak three languages fluently.',
          translationThai: 'เธอพูดสามภาษาได้คล่อง',
          noteThai: '"can" บอกความสามารถในปัจจุบัน',
        },
        {
          sentence: 'When I was younger, I could run for hours without stopping.',
          translationThai: 'ตอนฉันยังเด็ก ฉันวิ่งได้เป็นชั่วโมงโดยไม่หยุด',
          noteThai: '"could" ใช้กับความสามารถในอดีต',
        },
        {
          sentence: 'Could you please pass me the salt?',
          translationThai: 'ขอเกลือหน่อยได้ไหมคะ',
          noteThai: '"Could" ใช้แทน "Can" เพื่อความสุภาพ',
        },
      ],
      wrongExamples: [
        {
          sentence: 'She can to speak Japanese.',
          correction: 'She can speak Japanese.',
          whyWrongThai: 'หลัง modal ห้ามมี "to" — ใช้ V1 เปล่า ๆ เสมอ',
        },
        {
          sentence: 'I could swim yesterday in the morning. (meaning: I succeeded once)',
          correction: 'I was able to swim yesterday morning. / I managed to swim yesterday morning.',
          whyWrongThai: '"could" ในประโยคบอกเล่าจะหมายถึงความสามารถ "ทั่วไป" ในอดีต ถ้าทำสำเร็จเฉพาะครั้ง ใช้ "was able to" หรือ "managed to"',
        },
      ],
    },
    {
      ruleTitle: 'may / might — possibility and permission',
      explanationThai: '"may" ใช้บอกความเป็นไปได้และการขออนุญาตอย่างเป็นทางการ ส่วน "might" บอกความเป็นไปได้ที่อ่อนกว่า may เล็กน้อย ในข้อสอบทั้งสองตัวมักใช้เพื่อบอก "อาจจะ"',
      explanationEnglish: '"may" expresses possibility or formal permission. "might" expresses weaker possibility. Both translate as "อาจจะ" in Thai but with different strength levels.',
      pattern: 'subject + may/might + base verb',
      correctExamples: [
        {
          sentence: 'It may rain this evening.',
          translationThai: 'ฝนอาจตกตอนเย็นนี้',
          noteThai: '"may" = ความเป็นไปได้ปกติ',
        },
        {
          sentence: 'She might come to the party, but she has not decided yet.',
          translationThai: 'เธออาจจะมางานปาร์ตี้ แต่ยังไม่ได้ตัดสินใจ',
          noteThai: '"might" = ความเป็นไปได้ที่ไม่แน่นอน',
        },
        {
          sentence: 'May I borrow your dictionary?',
          translationThai: 'ขอยืมพจนานุกรมหน่อยได้ไหมคะ',
          noteThai: '"May" ใช้ขออนุญาตอย่างเป็นทางการ',
        },
      ],
      wrongExamples: [
        {
          sentence: 'It may rains tomorrow.',
          correction: 'It may rain tomorrow.',
          whyWrongThai: 'หลัง modal ใช้ V1 เสมอ ห้ามเติม -s แม้ประธานจะเป็นเอกพจน์',
        },
      ],
    },
    {
      ruleTitle: 'must / have to — obligation',
      explanationThai: '"must" แสดงหน้าที่หรือความจำเป็นที่ผู้พูดเป็นคนกำหนด ส่วน "have to" แสดงหน้าที่ที่มาจากภายนอก เช่น กฎ ระเบียบ หรือสถานการณ์ ในข้อสอบเขียนเป็นทางการ "must" มักให้น้ำหนักมากกว่า "have to"',
      explanationEnglish: '"must" expresses internal obligation or strong personal duty. "have to" expresses external obligation from rules or circumstances. Both translate roughly as "ต้อง."',
      pattern: 'subject + must + V1 / subject + have/has to + V1',
      correctExamples: [
        {
          sentence: 'Students must wear the school uniform on weekdays.',
          translationThai: 'นักเรียนต้องใส่ชุดนักเรียนในวันธรรมดา',
          noteThai: '"must" บอกหน้าที่ที่เด็ดขาด',
        },
        {
          sentence: 'I have to finish this report before Friday.',
          translationThai: 'ฉันต้องทำรายงานนี้ให้เสร็จก่อนวันศุกร์',
          noteThai: '"have to" บอกหน้าที่จากเงื่อนไขภายนอก เช่น เส้นตาย',
        },
        {
          sentence: 'You must not park here.',
          translationThai: 'ห้ามจอดตรงนี้',
          noteThai: '"must not" = ห้าม (prohibition)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I must to study hard.',
          correction: 'I must study hard.',
          whyWrongThai: 'หลัง "must" ห้ามมี "to" ต้องใช้ V1 เปล่า ๆ',
        },
        {
          sentence: 'You don\'t must come.',
          correction: 'You don\'t have to come. / You must not come.',
          whyWrongThai: '"must" ไม่ใช้กับ "do/does/did" ในการปฏิเสธ ต้องใช้ "must not" (ห้าม) หรือ "don\'t have to" (ไม่จำเป็นต้อง)',
        },
      ],
    },
    {
      ruleTitle: 'should / ought to — advice',
      explanationThai: '"should" และ "ought to" ใช้ให้คำแนะนำหรือบอกสิ่งที่ "ควรทำ" ในข้อสอบ "should" ใช้บ่อยกว่า "ought to" ทั้งสองตัวอ่อนกว่า must',
      explanationEnglish: '"should" and "ought to" both give advice. "should" is more common; "ought to" is slightly more formal. Both are weaker than "must."',
      pattern: 'subject + should + V1 / subject + ought to + V1',
      correctExamples: [
        {
          sentence: 'You should drink more water during hot weather.',
          translationThai: 'คุณควรดื่มน้ำให้มากขึ้นในช่วงอากาศร้อน',
          noteThai: '"should" = คำแนะนำ',
        },
        {
          sentence: 'Students ought to review their notes every week.',
          translationThai: 'นักเรียนควรทบทวนบันทึกทุกสัปดาห์',
          noteThai: '"ought to" ใช้ในบริบทค่อนข้างเป็นทางการ',
        },
      ],
      wrongExamples: [
        {
          sentence: 'You should to study harder.',
          correction: 'You should study harder.',
          whyWrongThai: 'หลัง "should" ห้ามมี "to" — ต่างจาก "ought" ที่ต้องตามด้วย "to"',
        },
      ],
    },
    {
      ruleTitle: 'will / would — future and polite forms',
      explanationThai: '"will" บอกอนาคต ความตั้งใจ และคำสัญญา ส่วน "would" ใช้ในประโยคเงื่อนไข ใช้เพื่อความสุภาพ และใช้ใน reported speech แทน will',
      explanationEnglish: '"will" expresses future, intention, or promise. "would" appears in conditionals, polite requests, and reported speech as the past form of "will."',
      pattern: 'subject + will/would + V1',
      correctExamples: [
        {
          sentence: 'I will call you tomorrow.',
          translationThai: 'ฉันจะโทรหาคุณพรุ่งนี้',
          noteThai: '"will" บอกอนาคต/คำสัญญา',
        },
        {
          sentence: 'If I had more time, I would travel around Europe.',
          translationThai: 'ถ้าฉันมีเวลามากกว่านี้ ฉันคงจะไปเที่ยวยุโรป',
          noteThai: '"would" ใน Conditional Type 2 (ไม่จริงในปัจจุบัน)',
        },
        {
          sentence: 'Would you mind closing the window?',
          translationThai: 'รบกวนปิดหน้าต่างหน่อยได้ไหมคะ',
          noteThai: '"Would" ใช้ขอร้องอย่างสุภาพ',
        },
      ],
      wrongExamples: [
        {
          sentence: 'If I will have time, I would call you.',
          correction: 'If I had time, I would call you.',
          whyWrongThai: 'ใน if-clause ของเงื่อนไข Type 2 ห้ามใช้ "will" — ต้องใช้ past simple',
        },
      ],
    },
    {
      ruleTitle: 'modal perfect — talking about the past',
      explanationThai: '"modal + have + V3" ใช้พูดถึงความเป็นไปได้หรือการคาดเดาในอดีต เช่น must have done = แน่ใจว่าทำแล้ว, might have done = อาจจะทำแล้ว, should have done = ควรจะทำ (แต่ไม่ได้ทำ), could have done = น่าจะทำได้ (แต่ไม่ได้ทำ)',
      explanationEnglish: 'Modal + have + past participle expresses past possibility or speculation. Each modal carries a different shade: certainty (must have), possibility (might/may have), regret (should have), missed ability (could have).',
      pattern: 'subject + must/might/should/could/would + have + V3',
      correctExamples: [
        {
          sentence: 'She must have left already; the lights are off.',
          translationThai: 'เธอต้องออกไปแล้วแน่ ๆ เพราะไฟปิดหมด',
          noteThai: '"must have" = แน่ใจมากในอดีต',
        },
        {
          sentence: 'I should have studied harder for the exam.',
          translationThai: 'ฉันควรจะอ่านหนังสือให้หนักกว่านี้สำหรับการสอบ (แต่ไม่ได้ทำ)',
          noteThai: '"should have" = เสียดาย ไม่ได้ทำสิ่งที่ควรทำ',
        },
        {
          sentence: 'He might have forgotten the meeting.',
          translationThai: 'เขาอาจจะลืมประชุมไปแล้ว',
          noteThai: '"might have" = เป็นไปได้ในอดีต',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I should studied harder.',
          correction: 'I should have studied harder.',
          whyWrongThai: 'modal perfect ต้องมี "have" คั่นระหว่าง modal กับ V3 เสมอ',
        },
        {
          sentence: 'She must has finished it.',
          correction: 'She must have finished it.',
          whyWrongThai: 'หลัง modal ใช้ "have" เปล่า ๆ ห้ามผัน "has/had" แม้ประธานจะเป็นเอกพจน์',
        },
      ],
    },
  ],

  examPatterns: [
    {
      patternName: 'modal of advice vs obligation',
      howItAppearsInExamThai: 'โจทย์ใช้บริบทคำแนะนำที่ดูเป็นทางการ แต่ตัวเลือกมีทั้ง should/must/have to ทำให้นักเรียนสับสนระหว่าง "ควร" กับ "ต้อง"',
      signalWords: ['recommend', 'suggest', 'advise', 'rule', 'policy', 'must', 'should'],
      trapChoices: ['must (เมื่อบริบทคือคำแนะนำ)', 'should (เมื่อบริบทเป็นกฎเด็ดขาด)'],
      examTipThai: 'อ่านบริบทรอบ ๆ ถ้ามีคำว่า rule/policy/required → must หรือ have to. ถ้ามีคำว่า advise/recommend → should',
    },
    {
      patternName: 'modal perfect for hypothetical past',
      howItAppearsInExamThai: 'ในประโยค If-clause Type 3 หรือประโยคที่บอกความเสียดาย ตัวเลือกจะมี modal perfect ทั้งหลาย',
      signalWords: ['if', 'had + V3', 'wish', 'should', 'could'],
      trapChoices: ['will have done (ใช้กับ Type 3 ไม่ได้)', 'would do (ขาด have)'],
      examTipThai: 'ดูที่ if-clause ก่อน ถ้าเป็น "had + V3" ตัวคำตอบในประโยคหลักต้องเป็น modal + have + V3 เสมอ',
    },
    {
      patternName: 'must vs have to in negative',
      howItAppearsInExamThai: 'ความหมายเปลี่ยนทันทีเมื่อใช้ปฏิเสธ — must not = ห้าม, don\'t have to = ไม่จำเป็น',
      signalWords: ['must not', 'don\'t have to', 'doesn\'t have to', 'not allowed', 'not necessary'],
      trapChoices: ['must not (เมื่อความหมายคือ ไม่จำเป็น)', 'don\'t have to (เมื่อความหมายคือ ห้าม)'],
      examTipThai: 'ถามตัวเอง: "ถ้าไม่ทำจะเกิดอะไร?" — ถ้าผิดกฎ → must not. ถ้าไม่เกิดอะไรเลย → don\'t have to',
    },
    {
      patternName: 'modal in reported speech',
      howItAppearsInExamThai: 'ในข้อสอบ reported speech modal บางตัวต้อง backshift เช่น will → would, can → could, may → might',
      signalWords: ['said', 'told', 'reported', 'mentioned'],
      trapChoices: ['will (ใน reported speech ของอดีต)', 'can (ใน reported speech ของอดีต)'],
      examTipThai: 'ดูที่ verb หลัก ถ้าเป็นอดีต modal ในประโยคย่อยต้อง backshift ตาม',
    },
  ],

  commonMistakesThaiStudents: [
    {
      mistake: 'ใส่ "to" หลัง modal',
      whyItHappensThai: 'นักเรียนคุ้นกับ "want to / need to / have to" จึงเผลอเติม to หลัง modal ทุกตัว',
      fixThai: 'จำว่า: ought to ตัวเดียวที่ตามด้วย to. ตัวอื่นทั้งหมด (can, could, may, might, must, should, will, would) ตามด้วย V1 เปล่า',
      example: 'ผิด: She can to swim. → ถูก: She can swim.',
    },
    {
      mistake: 'ใช้ "must" กับการปฏิเสธโดยใส่ do/does',
      whyItHappensThai: 'นักเรียนใช้รูปปฏิเสธทั่วไปกับ modal ซึ่งผิด',
      fixThai: 'รูปปฏิเสธของ modal คือ modal + not เลย ไม่ต้องใช้ do/does/did',
      example: 'ผิด: He doesn\'t must go. → ถูก: He must not go.',
    },
    {
      mistake: 'แปล "could" ว่าเป็นอดีตของ "can" เสมอ',
      whyItHappensThai: 'ตำราไทยมักสอนว่า could = could (อดีตของ can) ทำให้นักเรียนพลาดเมื่อ could ใช้แสดงความสุภาพ',
      fixThai: 'ดูบริบทก่อน — Could you...? = ขอความสุภาพในปัจจุบัน ไม่ใช่อดีต',
      example: 'Could you help me now? = ช่วยฉันได้ไหมคะตอนนี้ (ปัจจุบัน + สุภาพ)',
    },
    {
      mistake: 'สับสน should have / must have / could have',
      whyItHappensThai: 'ทั้งสามรูปดูเหมือนกัน แต่ความหมายต่างกันมาก',
      fixThai: 'should have = เสียดาย, must have = แน่ใจมาก, could have = น่าจะทำได้แต่ไม่ได้ทำ',
      example: 'I should have called her (ฉันน่าจะโทรหาเธอ — แต่ไม่ได้ทำ) ≠ I must have called her (ฉันคงโทรหาเธอแล้วแน่ ๆ)',
    },
    {
      mistake: 'ใช้ "will" ใน if-clause ของเงื่อนไข Type 1',
      whyItHappensThai: 'นักเรียนคุ้นกับ "will = อนาคต" จึงใส่ใน if-clause',
      fixThai: 'ใน if-clause ของ Type 1 ใช้ present simple. will อยู่ในประโยคหลักเท่านั้น',
      example: 'ผิด: If you will study, you will pass. → ถูก: If you study, you will pass.',
    },
  ],

  quickRulesThai: [
    'หลัง modal ใช้ V1 เสมอ ห้ามมี "to" (ยกเว้น ought to)',
    'modal perfect = modal + have + V3 (เช่น should have done, must have done)',
    'ปฏิเสธ: modal + not เท่านั้น ไม่ใช้ do/does/did',
    'must not ≠ don\'t have to. ตัวแรก = ห้าม, ตัวสอง = ไม่จำเป็น',
    'ใน reported speech: will → would, can → could, may → might',
  ],

  memoryTipsThai: [
    'จำคู่ตรงข้าม: must (ต้อง) ↔ should (ควร) — ระดับความเข้มต่างกัน',
    'ฟัง "feeling" ในข้อความ — ถ้าเสียดายในอดีต = should have, ถ้ามั่นใจในอดีต = must have',
    'modal + V1 เปลือยเสมอ — เห็น modal จบที่ V1 ห้ามผัน',
    'ought to เป็น modal เดียวที่ต้องตามด้วย to — ที่เหลือเป็น V1 เปล่า',
  ],

  miniQuiz: [
    {
      question: 'You _____ wear a helmet when riding a motorcycle. It is the law.',
      choices: ['should', 'must', 'might', 'could'],
      correctAnswer: 'must',
      explanationThai: '"It is the law" บอกว่าเป็นกฎหมายที่บังคับ ใช้ "must" เพื่อแสดงหน้าที่ที่เด็ดขาด ส่วน "should" เบาเกินไปสำหรับเรื่องกฎหมาย',
      skillTag: 'modal',
    },
    {
      question: 'Sarah is not at home. She _____ have gone to the library.',
      choices: ['must', 'should', 'would', 'will'],
      correctAnswer: 'must',
      explanationThai: 'ใช้ "must have + V3" เพื่อบอกการคาดเดาที่มั่นใจมากในอดีต — ไม่อยู่บ้าน → คงไปห้องสมุดแน่ ๆ',
      skillTag: 'modal',
    },
    {
      question: 'Students _____ submit their assignments late without permission.',
      choices: ['must not', 'don\'t have to', 'could not', 'might not'],
      correctAnswer: 'must not',
      explanationThai: '"must not" = ห้าม. บริบทคือกฎห้องเรียน ส่วน "don\'t have to" = ไม่จำเป็น ซึ่งไม่ใช่ความหมายที่ต้องการ',
      skillTag: 'modal',
    },
    {
      question: 'If I had known about the meeting, I _____ have attended.',
      choices: ['will', 'would', 'must', 'should'],
      correctAnswer: 'would',
      explanationThai: 'ประโยค Conditional Type 3 (เงื่อนไขในอดีตที่ไม่เกิด) ใช้ "would have + V3" ในประโยคหลัก ส่วน "must have" บอกความแน่ใจ ไม่ใช่ผลของเงื่อนไข',
      skillTag: 'modal',
    },
    {
      question: 'You _____ open the door. I have a key.',
      choices: ['must not', 'don\'t have to', 'should not', 'could not'],
      correctAnswer: 'don\'t have to',
      explanationThai: '"don\'t have to" = ไม่จำเป็น (เพราะมีกุญแจอยู่แล้ว) ส่วน "must not" = ห้าม ซึ่งไม่ใช่ความหมายที่ต้องการในบริบทนี้',
      skillTag: 'modal',
    },
    {
      question: 'She _____ have been very tired; she fell asleep during dinner.',
      choices: ['should', 'must', 'might', 'would'],
      correctAnswer: 'must',
      explanationThai: 'หลักฐาน (หลับระหว่างมื้อ) → คาดเดาแบบมั่นใจมาก ใช้ "must have + V3"',
      skillTag: 'modal',
    },
    {
      question: 'I _____ call you yesterday, but I lost my phone.',
      choices: ['must', 'should', 'would have', 'would'],
      correctAnswer: 'would have',
      explanationThai: '"would have called" = ตั้งใจจะโทร แต่ไม่ได้โทร เพราะเหตุการณ์ที่บอก (ทำมือถือหาย) ส่วน "should" + V1 ตรงไม่เข้ากับโครงสร้างเวลานี้',
      skillTag: 'modal',
    },
    {
      question: 'You look pale. You _____ see a doctor.',
      choices: ['must', 'should', 'will', 'might'],
      correctAnswer: 'should',
      explanationThai: '"should" ให้คำแนะนำ ส่วน "must" เด็ดขาดเกินไปสำหรับสถานการณ์การแนะนำเรื่องสุขภาพแบบนี้',
      skillTag: 'modal',
    },
  ],

  masteryChecklist: [
    'ฉันรู้ว่าหลัง modal ต้องใช้ V1 เสมอ (ยกเว้น ought to)',
    'ฉันแยกได้ว่า must = หน้าที่/คำสั่ง, should = คำแนะนำ',
    'ฉันรู้ว่า must not ≠ don\'t have to',
    'ฉันใช้ modal perfect (must have / should have / could have / would have) ได้ถูกต้อง',
    'ฉันรู้ว่าใน Conditional Type 3 ใช้ would have + V3 ในประโยคหลัก',
    'ฉันใช้ would และ could เพื่อความสุภาพได้',
    'ฉันรู้กฎ backshift ใน reported speech: will → would, can → could, may → might',
  ],
}

export default modals
