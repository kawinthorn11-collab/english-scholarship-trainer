// Grammar Lesson: Tenses
// Level: foundation
// Covers the 4 most exam-relevant tenses + sequence and time markers.

const tenses = {
  id: 'tenses',
  title: 'Tenses',
  titleThai: 'กาลของกริยา (Tenses)',
  level: 'foundation',
  status: 'available',
  relatedSkillTags: ['tense'],
  shortDescriptionThai: 'Tenses คือการผันกริยาเพื่อบอกเวลาและความสัมพันธ์ของเหตุการณ์ ในข้อสอบ cloze เน้น 4 tense หลัก: Present Simple, Past Simple, Present Perfect, และ Past Perfect รวมถึงการลำดับเหตุการณ์ในเรื่องเล่า',
  whyItMattersThai: 'Tenses เป็นส่วนสำคัญที่สุดของข้อสอบไวยากรณ์ เพราะภาษาไทยไม่ผันกริยาตามเวลา นักเรียนที่ไม่จำสัญญาณเวลา (since, for, ago, by the time) จะเลือก tense ผิดประจำ การเข้าใจ tense ช่วยตอบได้ถึง 30-40% ของข้อสอบไวยากรณ์',

  coreRules: [
    {
      ruleTitle: 'Present Simple — facts, habits, general truths',
      explanationThai: 'ใช้กับสิ่งที่เป็นความจริงทั่วไป กิจวัตรประจำ ความสามารถ และความรู้สึก/ความคิด สัญญาณ: every day, always, usually, often, sometimes, never',
      explanationEnglish: 'Used for general truths, habits, abilities, and feelings/opinions. Signal words: every day, always, usually, often, sometimes, never.',
      pattern: 'subject + V1 (เติม -s กับ he/she/it)',
      correctExamples: [
        {
          sentence: 'The sun rises in the east every morning.',
          translationThai: 'พระอาทิตย์ขึ้นทางทิศตะวันออกทุกเช้า',
          noteThai: 'ความจริงทั่วไป (general truth)',
        },
        {
          sentence: 'She studies Japanese on Saturdays.',
          translationThai: 'เธอเรียนภาษาญี่ปุ่นทุกวันเสาร์',
          noteThai: 'กิจวัตร (habit) — เติม -s กับ she',
        },
        {
          sentence: 'Water boils at 100 degrees Celsius.',
          translationThai: 'น้ำเดือดที่ 100 องศาเซลเซียส',
          noteThai: 'ความจริงทางวิทยาศาสตร์',
        },
      ],
      wrongExamples: [
        {
          sentence: 'He study at university.',
          correction: 'He studies at university.',
          whyWrongThai: 'หลัง he/she/it ต้องเติม -s กับกริยาใน Present Simple',
        },
        {
          sentence: 'Every morning she is going to school.',
          correction: 'Every morning she goes to school.',
          whyWrongThai: 'กิจวัตรใช้ Present Simple ไม่ใช่ Present Continuous',
        },
      ],
    },
    {
      ruleTitle: 'Past Simple — completed past actions',
      explanationThai: 'ใช้กับการกระทำที่เกิดขึ้นและจบในอดีต พร้อมเวลาที่ระบุชัดเจน สัญญาณ: yesterday, last week, ago, in 2020, when I was young',
      explanationEnglish: 'Used for completed past actions with a specific past time. Signal words: yesterday, last week, ago, in 2020, when I was young.',
      pattern: 'subject + V2 (regular: V + -ed | irregular: see verb list)',
      correctExamples: [
        {
          sentence: 'She visited her grandmother last weekend.',
          translationThai: 'เธอไปเยี่ยมยายเมื่อสุดสัปดาห์ที่แล้ว',
          noteThai: '"last weekend" = past time → Past Simple',
        },
        {
          sentence: 'I went to Japan three years ago.',
          translationThai: 'ฉันไปญี่ปุ่นเมื่อสามปีก่อน',
          noteThai: '"ago" = past time → Past Simple',
        },
        {
          sentence: 'The phone rang while I was cooking.',
          translationThai: 'โทรศัพท์ดังขณะที่ฉันกำลังทำอาหาร',
          noteThai: 'past simple (rang) + past continuous (was cooking)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I have visited Tokyo in 2019.',
          correction: 'I visited Tokyo in 2019.',
          whyWrongThai: 'มีเวลาเฉพาะในอดีต (in 2019) ห้ามใช้ Present Perfect ต้องใช้ Past Simple',
        },
        {
          sentence: 'She goed to the market yesterday.',
          correction: 'She went to the market yesterday.',
          whyWrongThai: 'go เป็น irregular verb → went (ไม่ใช่ goed)',
        },
      ],
    },
    {
      ruleTitle: 'Present Perfect — past with present relevance',
      explanationThai: 'ใช้กับการกระทำที่เริ่มในอดีตและยังต่อเนื่องถึงปัจจุบัน หรือมีผลในปัจจุบัน สัญญาณ: since, for, already, yet, just, ever, never, recently',
      explanationEnglish: 'Used for actions starting in the past and continuing to now, or actions with present relevance. Signal words: since, for, already, yet, just, ever, never, recently.',
      pattern: 'subject + has/have + V3',
      correctExamples: [
        {
          sentence: 'She has lived in Bangkok since 2015.',
          translationThai: 'เธออาศัยอยู่ในกรุงเทพตั้งแต่ปี 2015',
          noteThai: '"since 2015" + ยังอาศัยอยู่ → Present Perfect',
        },
        {
          sentence: 'I have already finished my homework.',
          translationThai: 'ฉันทำการบ้านเสร็จแล้ว',
          noteThai: '"already" + ผลในปัจจุบัน → Present Perfect',
        },
        {
          sentence: 'Have you ever been to Chiang Mai?',
          translationThai: 'คุณเคยไปเชียงใหม่ไหม',
          noteThai: '"ever" สำหรับประสบการณ์ → Present Perfect',
        },
        {
          sentence: 'He has worked here for ten years.',
          translationThai: 'เขาทำงานที่นี่มา 10 ปีแล้ว',
          noteThai: '"for + ระยะเวลา" + ยังทำงานอยู่ → Present Perfect',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I have seen him yesterday.',
          correction: 'I saw him yesterday.',
          whyWrongThai: 'มีเวลาเฉพาะในอดีต (yesterday) ห้ามใช้ Present Perfect',
        },
        {
          sentence: 'She has worked here since 5 years.',
          correction: 'She has worked here for 5 years.',
          whyWrongThai: '"since" + จุดเริ่มต้น (since 2020). "for" + ระยะเวลา (for 5 years)',
        },
      ],
    },
    {
      ruleTitle: 'Past Perfect — action before another past action',
      explanationThai: 'ใช้บอกการกระทำที่เกิดก่อนการกระทำในอดีตอีกเหตุการณ์หนึ่ง สัญญาณ: by the time, before, after, when, already, just (ใช้กับอดีต)',
      explanationEnglish: 'Used for an action completed before another past action. Signal words: by the time, before, after, when, already, just.',
      pattern: 'subject + had + V3',
      correctExamples: [
        {
          sentence: 'By the time we arrived, the train had left.',
          translationThai: 'ตอนที่เราไปถึง รถไฟออกไปแล้ว',
          noteThai: 'รถไฟออก (had left) ก่อนเรามาถึง (arrived)',
        },
        {
          sentence: 'After she had finished dinner, she went for a walk.',
          translationThai: 'หลังจากที่เธอกินข้าวเสร็จ เธอออกไปเดิน',
          noteThai: 'กินเสร็จก่อน (had finished) → ออกไปเดิน (went)',
        },
        {
          sentence: 'I had never seen such a beautiful sunset before that day.',
          translationThai: 'ฉันไม่เคยเห็นพระอาทิตย์ตกที่สวยงามขนาดนี้มาก่อนวันนั้น',
          noteThai: '"before that day" + ประสบการณ์ในอดีต',
        },
      ],
      wrongExamples: [
        {
          sentence: 'By the time we arrived, the train left.',
          correction: 'By the time we arrived, the train had left.',
          whyWrongThai: '"By the time + past simple" ในประโยคหลักต้องใช้ Past Perfect (had left)',
        },
        {
          sentence: 'She had go to bed when I called.',
          correction: 'She had gone to bed when I called.',
          whyWrongThai: 'Past Perfect ใช้ V3 (gone) ไม่ใช่ V1 (go)',
        },
      ],
    },
    {
      ruleTitle: 'tense sequence in narratives',
      explanationThai: 'ในเรื่องเล่าในอดีต ใช้ Past Simple เป็นหลักสำหรับเหตุการณ์ตามลำดับ ใช้ Past Continuous บอกการกระทำพื้นหลังที่กำลังเกิด ใช้ Past Perfect บอกการกระทำที่เกิดก่อนเหตุการณ์หลัก',
      explanationEnglish: 'In past narratives, use Past Simple for sequential events, Past Continuous for background actions, and Past Perfect for actions that happened before the main events.',
      pattern: 'main events: Past Simple | background: Past Continuous | earlier: Past Perfect',
      correctExamples: [
        {
          sentence: 'When I arrived at the party, most guests had already left.',
          translationThai: 'ตอนที่ฉันไปถึงงาน แขกส่วนใหญ่กลับไปแล้ว',
          noteThai: 'arrived (past simple) + had left (past perfect — ก่อนหน้า)',
        },
        {
          sentence: 'I was reading a book when the phone rang.',
          translationThai: 'ฉันกำลังอ่านหนังสืออยู่ตอนโทรศัพท์ดัง',
          noteThai: 'was reading (background) + rang (interruption)',
        },
        {
          sentence: 'After he had eaten dinner, he watched TV and went to bed.',
          translationThai: 'หลังจากที่เขากินข้าวเย็นเสร็จ เขาดูทีวีแล้วเข้านอน',
          noteThai: 'had eaten (earlier) → watched, went (sequence)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I read a book when the phone rang.',
          correction: 'I was reading a book when the phone rang.',
          whyWrongThai: 'การกระทำพื้นหลังที่กำลังเกิดอยู่ใช้ Past Continuous (was reading)',
        },
      ],
    },
    {
      ruleTitle: 'time markers and tense matching',
      explanationThai: 'การจำสัญญาณเวลาช่วยให้เลือก tense ถูก: yesterday/ago/last → Past Simple. since/for/already/yet/ever → Present Perfect. by the time/before/after → Past Perfect. every day/usually → Present Simple',
      explanationEnglish: 'Time markers signal which tense to use. Memorize them as anchor points for quick decisions on the exam.',
      pattern: 'time marker + matching tense',
      correctExamples: [
        {
          sentence: 'I have known her for ten years.',
          translationThai: 'ฉันรู้จักเธอมา 10 ปีแล้ว',
          noteThai: '"for + ระยะเวลา" → Present Perfect',
        },
        {
          sentence: 'I knew her when we were in elementary school.',
          translationThai: 'ฉันรู้จักเธอตอนเราเรียนประถม',
          noteThai: '"when + past clause" → Past Simple',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I know her since 2015.',
          correction: 'I have known her since 2015.',
          whyWrongThai: '"since" + จุดเริ่มต้น → Present Perfect (have known) ไม่ใช่ Present Simple',
        },
      ],
    },
  ],

  examPatterns: [
    {
      patternName: 'Past Simple vs Present Perfect (the most common trap)',
      howItAppearsInExamThai: 'ตัวเลือกมีทั้ง V2 และ has/have + V3 ในขณะที่บริบทมีคำเวลาเฉพาะหรือ since/for',
      signalWords: ['yesterday', 'last week', 'ago', 'in 2020', 'since', 'for', 'already', 'yet', 'ever'],
      trapChoices: ['have V3 (เมื่อมี yesterday/ago)', 'V2 (เมื่อมี since/for)'],
      examTipThai: 'มีเวลาเฉพาะในอดีต (yesterday, last week, ago, in 2020) → Past Simple. มี since/for/already/yet/ever → Present Perfect',
    },
    {
      patternName: 'Past Perfect after "by the time"',
      howItAppearsInExamThai: 'โจทย์มี "By the time + past simple, ___" ตัวเลือกมีทั้ง V2, had + V3, has + V3',
      signalWords: ['by the time', 'before', 'after', 'when'],
      trapChoices: ['V2 (เมื่อต้อง past perfect)', 'has V3 (เมื่อต้อง past perfect)'],
      examTipThai: '"By the time + past simple" → ประโยคหลักต้องใช้ Past Perfect (had + V3) เสมอ',
    },
    {
      patternName: 'Past Continuous + Past Simple',
      howItAppearsInExamThai: 'โจทย์เล่าเหตุการณ์ที่กำลังเกิดถูกขัดด้วยเหตุการณ์อื่น',
      signalWords: ['when', 'while', 'as'],
      trapChoices: ['V2 (เมื่อต้อง was/were V-ing)', 'is V-ing (เมื่อต้อง was V-ing)'],
      examTipThai: 'เหตุการณ์พื้นหลังที่กำลังเกิด + ขัดจังหวะ → Past Continuous (was/were V-ing) + Past Simple (V2)',
    },
    {
      patternName: 'since vs for',
      howItAppearsInExamThai: 'โจทย์ Present Perfect ตัวเลือกระยะเวลา ตัวเลือกมีทั้ง for และ since',
      signalWords: ['since 2010', 'for 5 years', 'since I was a child', 'for ages'],
      trapChoices: ['since + ระยะเวลา (ผิด)', 'for + จุดเริ่มต้น (ผิด)'],
      examTipThai: 'since + จุดเริ่มต้น (since 2020, since Monday). for + ระยะเวลา (for 5 years, for ages)',
    },
    {
      patternName: 'narrative sequence with past perfect',
      howItAppearsInExamThai: 'เรื่องเล่าในอดีต โจทย์ทดสอบว่าเหตุการณ์ใดเกิดก่อน',
      signalWords: ['after', 'before', 'when', 'already'],
      trapChoices: ['V2 (สำหรับเหตุการณ์ที่เกิดก่อน)'],
      examTipThai: 'ในเรื่องเล่า เมื่อเหตุการณ์ A เกิดก่อน B → A ใช้ Past Perfect (had + V3), B ใช้ Past Simple (V2)',
    },
  ],

  commonMistakesThaiStudents: [
    {
      mistake: 'ใช้ Present Perfect กับเวลาเฉพาะในอดีต',
      whyItHappensThai: 'นักเรียนเห็น "have/has" แล้วคิดว่าใช้ได้ทุกครั้งที่พูดถึงประสบการณ์',
      fixThai: 'มีเวลาเฉพาะในอดีต (yesterday, in 2020, last week, ago) → ใช้ Past Simple เสมอ ห้ามใช้ Present Perfect',
      example: 'ผิด: I have seen him yesterday. → ถูก: I saw him yesterday.',
    },
    {
      mistake: 'ลืมเติม -s ใน Present Simple',
      whyItHappensThai: 'ภาษาไทยไม่ผันกริยา นักเรียนลืมเติม -s กับ he/she/it',
      fixThai: 'ตรวจประธานก่อน — he/she/it/นามเอกพจน์ + V + s',
      example: 'ผิด: He play tennis on weekends. → ถูก: He plays tennis on weekends.',
    },
    {
      mistake: 'สับสน since กับ for',
      whyItHappensThai: 'ภาษาไทยใช้ "มา" สำหรับทั้งจุดเริ่มต้นและระยะเวลา',
      fixThai: 'since + จุดเวลา (Monday, 2020, I was 10). for + ระยะเวลา (5 days, 10 years, ages)',
      example: 'ผิด: I have lived here since 5 years. → ถูก: I have lived here for 5 years.',
    },
    {
      mistake: 'ไม่ใช้ Past Perfect ในเรื่องเล่า',
      whyItHappensThai: 'ภาษาไทยใช้แค่ "เคย" หรือบอกลำดับด้วยคำเชื่อม ไม่มีการเปลี่ยน tense',
      fixThai: 'เมื่อเหตุการณ์ A เกิดก่อนเหตุการณ์ B ในอดีต ใช้ "had + V3" สำหรับ A',
      example: 'ผิด: When I arrived, the train left. → ถูก: When I arrived, the train had left.',
    },
    {
      mistake: 'ใช้ Past Simple กับกิจวัตรในอดีต',
      whyItHappensThai: 'นักเรียนคิดว่าทุกอย่างในอดีตใช้ V2',
      fixThai: 'ในเรื่องเล่าที่อยู่ในอดีต กิจวัตรประจำวันใช้ Past Simple ได้ แต่ "การกระทำที่กำลังเกิด" ใช้ Past Continuous',
      example: 'ผิด: When I was a child, I am playing in the garden every day. → ถูก: When I was a child, I played in the garden every day.',
    },
  ],

  quickRulesThai: [
    'Present Simple: every day, always, usually, often → V1 (+s กับ he/she/it)',
    'Past Simple: yesterday, ago, last, in 2020 → V2',
    'Present Perfect: since, for, already, yet, ever, just → has/have + V3',
    'Past Perfect: by the time, before, after + past → had + V3',
    'since + จุดเวลา / for + ระยะเวลา',
    'has = he/she/it / have = I/you/we/they',
    'irregular verbs: ต้องท่องจำ (go-went-gone, eat-ate-eaten, see-saw-seen)',
  ],

  memoryTipsThai: [
    'จำสัญญาณเวลาเป็นกุญแจ — เห็นคำเวลาแล้วรู้ tense ทันที',
    'Present Perfect = "อดีตที่ยังต่อเนื่องมาถึงปัจจุบัน"',
    'Past Perfect = "อดีตของอดีต" — เกิดก่อนเหตุการณ์อดีตอื่น',
    'ฝึก irregular verbs 50 ตัวที่พบบ่อยที่สุด — go, eat, see, take, do, make, have, get, write, read',
    'ในเรื่องเล่า: หาเหตุการณ์หลัก (V2) แล้วถามว่ามีอะไรเกิดก่อนหรือไม่ (had + V3)',
  ],

  miniQuiz: [
    {
      question: 'My family _____ to Phuket every summer.',
      choices: ['go', 'goes', 'is going', 'has gone'],
      correctAnswer: 'goes',
      explanationThai: '"every summer" = กิจวัตร → Present Simple. "My family" เป็นเอกพจน์ (collective treated as singular) ต้องเติม -s → goes',
      skillTag: 'tense',
    },
    {
      question: 'She _____ in Tokyo for three years before moving to London.',
      choices: ['lives', 'lived', 'has lived', 'had lived'],
      correctAnswer: 'had lived',
      explanationThai: '"before moving to London" บ่งว่าอาศัยที่ Tokyo ก่อนการย้าย → Past Perfect (had lived) เพื่อบอกอดีตของอดีต',
      skillTag: 'tense',
    },
    {
      question: 'I _____ my best friend since we were in primary school.',
      choices: ['know', 'knew', 'have known', 'had known'],
      correctAnswer: 'have known',
      explanationThai: '"since + จุดเริ่มต้น" + ยังรู้จักอยู่ → Present Perfect (have known)',
      skillTag: 'tense',
    },
    {
      question: 'When the teacher entered the room, the students _____ noisily.',
      choices: ['talk', 'talked', 'were talking', 'have talked'],
      correctAnswer: 'were talking',
      explanationThai: 'นักเรียนกำลังคุยอยู่ (พื้นหลัง) ตอนครูเข้ามา (ขัดจังหวะ) → Past Continuous (were talking) + Past Simple (entered)',
      skillTag: 'tense',
    },
    {
      question: 'I _____ him at the conference last Friday.',
      choices: ['meet', 'met', 'have met', 'had met'],
      correctAnswer: 'met',
      explanationThai: '"last Friday" = เวลาเฉพาะในอดีต → Past Simple (met). ห้ามใช้ Present Perfect กับเวลาเฉพาะ',
      skillTag: 'tense',
    },
    {
      question: 'By the time I finished writing the email, my coffee _____ cold.',
      choices: ['gets', 'got', 'has got', 'had got'],
      correctAnswer: 'had got',
      explanationThai: '"By the time + past simple (finished)" → ประโยคหลักใช้ Past Perfect (had got) เพราะกาแฟเย็นก่อนเขียนเมลเสร็จ',
      skillTag: 'tense',
    },
    {
      question: 'She _____ to that restaurant at least five times.',
      choices: ['goes', 'went', 'has been', 'had been'],
      correctAnswer: 'has been',
      explanationThai: 'ประสบการณ์ที่นับครั้งได้และยังเปิดอยู่ในปัจจุบัน → Present Perfect (has been). "has been to" = เคยไป',
      skillTag: 'tense',
    },
    {
      question: 'After we _____ dinner, we watched a movie together.',
      choices: ['have', 'had', 'have had', 'had had'],
      correctAnswer: 'had had',
      explanationThai: '"After + Past Perfect" บ่งว่าเหตุการณ์เกิดก่อนเหตุการณ์หลัก → had had (Past Perfect ของ have dinner)',
      skillTag: 'tense',
    },
    {
      question: 'My grandfather _____ in this house for over 50 years now.',
      choices: ['lives', 'lived', 'has lived', 'is living'],
      correctAnswer: 'has lived',
      explanationThai: '"for + ระยะเวลา" + "now" + ยังอาศัยอยู่ → Present Perfect (has lived)',
      skillTag: 'tense',
    },
  ],

  masteryChecklist: [
    'ฉันใช้ Present Simple กับกิจวัตรและความจริงทั่วไป',
    'ฉันใช้ Past Simple กับเหตุการณ์ที่จบในอดีต พร้อมเวลาเฉพาะ',
    'ฉันใช้ Present Perfect กับ since/for/already/yet/ever',
    'ฉันใช้ Past Perfect กับ by the time/before/after เพื่อบอกอดีตของอดีต',
    'ฉันแยก since (จุดเวลา) กับ for (ระยะเวลา) ได้',
    'ฉันใช้ Past Continuous + Past Simple ได้ในเรื่องเล่าที่มีเหตุการณ์ขัดจังหวะ',
    'ฉันรู้ irregular verbs ที่พบบ่อย 30+ ตัว',
    'ฉันไม่ใช้ Present Perfect กับเวลาเฉพาะในอดีต (yesterday, ago, in 2020)',
  ],
}

export default tenses
