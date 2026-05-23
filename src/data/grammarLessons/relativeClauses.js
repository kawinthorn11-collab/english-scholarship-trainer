// Grammar Lesson: Relative Clauses
// Level: intermediate
// 10+ exam questions tag this skill across Sets 01-03.

const relativeClauses = {
  id: 'relative-clauses',
  title: 'Relative Clauses',
  titleThai: 'อนุประโยคขยายนาม (Relative Clauses)',
  level: 'intermediate',
  status: 'available',
  relatedSkillTags: ['relative_clause'],
  shortDescriptionThai: 'Relative Clauses คืออนุประโยคที่ขยายคำนาม โดยขึ้นต้นด้วย who, whom, which, that, whose, where, when ในข้อสอบ cloze ตัวเลือกเหล่านี้ดูใช้ได้แต่ละตัวมีกฎตายตัว — เลือกตัวเดียวที่ตรงกับชนิดของคำที่ขยาย',
  whyItMattersThai: 'ในข้อสอบไวยากรณ์ระดับเข้ามหาวิทยาลัย Relative Clauses พบบ่อยมาก (10+ ข้อในชุด 01-03) นักเรียนที่จำกฎ "who สำหรับคน which สำหรับสิ่งของ" อย่างเดียวจะพลาดในข้อที่ใช้ whose, where, when หรือ defining vs non-defining',

  coreRules: [
    {
      ruleTitle: 'who / whom — for people',
      explanationThai: 'who ใช้แทนคน เป็นประธานของอนุประโยค. whom ใช้แทนคน เป็นกรรม (object) ของอนุประโยค ในภาษาเขียนเป็นทางการนิยมใช้ whom เมื่อเป็นกรรม แต่ภาษาพูดใช้ who แทนได้',
      explanationEnglish: '"who" replaces a person and acts as the subject of the clause. "whom" replaces a person as the object. Formal writing prefers "whom"; spoken English often uses "who."',
      pattern: 'noun (person) + who + verb (subject) | noun (person) + whom + subject + verb (object)',
      correctExamples: [
        {
          sentence: 'The teacher who taught me English is retiring.',
          translationThai: 'คุณครูที่สอนฉันภาษาอังกฤษกำลังเกษียณ',
          noteThai: 'who = ประธานของ taught (ครูเป็นผู้สอน)',
        },
        {
          sentence: 'The student whom I met yesterday is from Japan.',
          translationThai: 'นักเรียนที่ฉันเจอเมื่อวานเป็นชาวญี่ปุ่น',
          noteThai: 'whom = กรรมของ met (ฉันเป็นผู้เจอ นักเรียนเป็นผู้ถูกเจอ)',
        },
        {
          sentence: 'Anyone who wishes to apply must submit the form by Friday.',
          translationThai: 'ใครก็ตามที่ประสงค์จะสมัครต้องส่งแบบฟอร์มภายในวันศุกร์',
          noteThai: 'anyone + who = ประธานของ wishes',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The teacher which taught me is retiring.',
          correction: 'The teacher who taught me is retiring.',
          whyWrongThai: '"which" ใช้กับสิ่งของ ส่วน "who" ใช้กับคน — ครูเป็นคน',
        },
        {
          sentence: 'The friend who I called yesterday answered.',
          correction: 'The friend whom I called yesterday answered. (informal: who is also accepted)',
          whyWrongThai: 'ในข้อสอบเขียนเป็นทางการ เมื่อเป็นกรรม (ฉันโทรหาเพื่อน) ใช้ "whom"',
        },
      ],
    },
    {
      ruleTitle: 'which / that — for things',
      explanationThai: 'which และ that ใช้แทนสิ่งของ ในประโยค defining (ไม่มี comma) ใช้ทั้ง which และ that ได้ ในประโยค non-defining (มี comma) ใช้ which เท่านั้น ห้าม that',
      explanationEnglish: '"which" and "that" replace things. In defining clauses (no commas), both are acceptable. In non-defining clauses (with commas), only "which" is allowed.',
      pattern: 'noun (thing) + which/that + clause | noun, which + clause (non-defining)',
      correctExamples: [
        {
          sentence: 'The book which I bought yesterday is fascinating.',
          translationThai: 'หนังสือที่ฉันซื้อเมื่อวานน่าสนใจมาก',
          noteThai: 'defining clause: which หรือ that ก็ได้',
        },
        {
          sentence: 'The book that I bought yesterday is fascinating.',
          translationThai: 'หนังสือที่ฉันซื้อเมื่อวานน่าสนใจมาก',
          noteThai: 'defining clause: that ใช้ได้',
        },
        {
          sentence: 'The library, which was built in 1985, has been renovated.',
          translationThai: 'ห้องสมุดที่สร้างปี 1985 ได้รับการปรับปรุงใหม่',
          noteThai: 'non-defining clause (มี comma) → ต้องใช้ which เท่านั้น',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The library, that was built in 1985, has been renovated.',
          correction: 'The library, which was built in 1985, has been renovated.',
          whyWrongThai: 'หลัง comma (non-defining clause) ใช้ "which" เท่านั้น ห้ามใช้ that',
        },
      ],
    },
    {
      ruleTitle: 'whose — possession',
      explanationThai: 'whose แสดงความเป็นเจ้าของ ใช้ได้กับทั้งคนและสิ่งของ มาแทนที่ his/her/its/their + noun',
      explanationEnglish: '"whose" shows possession and works for both people and things. It replaces his/her/its/their + noun.',
      pattern: 'noun + whose + noun + clause',
      correctExamples: [
        {
          sentence: 'I met a writer whose novels have won several awards.',
          translationThai: 'ฉันเจอนักเขียนคนหนึ่งที่นวนิยายของเขาได้รับรางวัลหลายรายการ',
          noteThai: 'whose = ของนักเขียนคนนั้น (his novels)',
        },
        {
          sentence: 'The car whose engine was making strange noises is now repaired.',
          translationThai: 'รถยนต์ที่เครื่องยนต์ส่งเสียงแปลก ๆ ได้รับการซ่อมแล้ว',
          noteThai: 'whose ใช้กับสิ่งของได้ (its engine)',
        },
        {
          sentence: 'The student whose paper ranked first thanked the teacher.',
          translationThai: 'นักเรียนที่ผลงานได้ที่หนึ่งขอบคุณครู',
          noteThai: 'whose paper = paper ของนักเรียนคนนั้น',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I met a writer who his novels won awards.',
          correction: 'I met a writer whose novels won awards.',
          whyWrongThai: '"who his" ผิดโครงสร้าง — ใช้ "whose" แทน his',
        },
      ],
    },
    {
      ruleTitle: 'where — places, when — times',
      explanationThai: 'where ใช้แทนสถานที่ (= in/at/to which). when ใช้แทนเวลา (= at/in/on which). ทั้งสองตัวมาแทน preposition + which',
      explanationEnglish: '"where" replaces places (in/at/to which). "when" replaces times (at/in/on which). Both are equivalent to preposition + which.',
      pattern: 'noun (place) + where + clause | noun (time) + when + clause',
      correctExamples: [
        {
          sentence: 'This is the café where I first met my best friend.',
          translationThai: 'นี่คือคาเฟ่ที่ฉันเจอเพื่อนสนิทครั้งแรก',
          noteThai: 'where = at the café',
        },
        {
          sentence: 'I will never forget the day when I graduated.',
          translationThai: 'ฉันจะไม่มีวันลืมวันที่ฉันเรียนจบ',
          noteThai: 'when = on the day',
        },
        {
          sentence: 'The library, where I spend most of my weekends, opens at 9 a.m.',
          translationThai: 'ห้องสมุดที่ฉันใช้เวลาเกือบทุกสุดสัปดาห์ เปิดตอน 9 โมงเช้า',
          noteThai: 'non-defining where + comma',
        },
      ],
      wrongExamples: [
        {
          sentence: 'This is the café which I first met my best friend.',
          correction: 'This is the café where I first met my best friend.',
          whyWrongThai: 'cafe เป็นสถานที่ ใช้ "where" หรือใช้ "which" ต้องมี at — at which I first met',
        },
      ],
    },
    {
      ruleTitle: 'defining vs non-defining clauses (the comma rule)',
      explanationThai: 'Defining clause (จำเป็น): ไม่มี comma ระบุว่าเป็นใคร/อะไร — เช่น "The students who study hard pass." Non-defining clause (เพิ่มเติม): มี comma ใส่ข้อมูลเสริมที่ตัดออกได้ — เช่น "My brother, who studies in Bangkok, called me."',
      explanationEnglish: 'Defining clauses (no commas) identify which one. Non-defining clauses (with commas) add extra information. The comma changes both meaning and which relative pronouns are allowed.',
      pattern: 'noun + RP + clause (defining) | noun, RP + clause, ... (non-defining)',
      correctExamples: [
        {
          sentence: 'The student who got the highest score will receive a scholarship.',
          translationThai: 'นักเรียนที่ได้คะแนนสูงสุดจะได้รับทุน',
          noteThai: 'defining clause — บอกว่านักเรียนคนใด ตัดออกไม่ได้',
        },
        {
          sentence: 'My brother, who lives in Bangkok, is a doctor.',
          translationThai: 'พี่ชายของฉัน (ซึ่งอาศัยอยู่ในกรุงเทพ) เป็นหมอ',
          noteThai: 'non-defining clause — ข้อมูลเสริม ตัด "who lives in Bangkok" ออกประโยคยังครบ',
        },
      ],
      wrongExamples: [
        {
          sentence: 'My mother who is a teacher cooks well.',
          correction: 'My mother, who is a teacher, cooks well.',
          whyWrongThai: 'ฉันมีแม่คนเดียว — ใช้ non-defining clause มี comma คั่นเพื่อบอกข้อมูลเสริม',
        },
      ],
    },
    {
      ruleTitle: 'omitting the relative pronoun (defining clauses only)',
      explanationThai: 'ใน defining clause สามารถละ relative pronoun ได้ถ้ามันเป็นกรรม (object) ของอนุประโยค ใน non-defining clause ห้ามละ',
      explanationEnglish: 'In defining clauses, the relative pronoun can be omitted if it is the object of the clause. Never omit in non-defining clauses.',
      pattern: 'noun + (omitted RP) + subject + verb (object position)',
      correctExamples: [
        {
          sentence: 'The book I bought yesterday is interesting.',
          translationThai: 'หนังสือที่ฉันซื้อเมื่อวานน่าสนใจ',
          noteThai: 'ละ "which/that" ได้ (object of bought)',
        },
        {
          sentence: 'The book that I bought yesterday is interesting.',
          translationThai: 'หนังสือที่ฉันซื้อเมื่อวานน่าสนใจ',
          noteThai: 'แบบไม่ละก็ใช้ได้',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The book is on the table I bought yesterday.',
          correction: 'The book that I bought yesterday is on the table. / The book I bought yesterday is on the table.',
          whyWrongThai: 'การละ relative pronoun ต้องไม่ทำให้ลำดับคำเปลี่ยนความหมาย ในตัวอย่างผิดทำให้ดูเหมือน "table" ที่ซื้อเมื่อวาน',
        },
      ],
    },
    {
      ruleTitle: '"that" vs "what" — common trap',
      explanationThai: '"that" ใช้นำ relative clause หรือ noun clause ที่สมบูรณ์. "what" ใช้แทน "the thing(s) that" — มี noun อยู่ในตัว ห้ามมี antecedent นำหน้า',
      explanationEnglish: '"that" introduces a relative clause referring back to a noun. "what" means "the thing(s) that" and contains its own noun reference, so it cannot follow an antecedent.',
      pattern: 'noun + that + clause | (no antecedent) + what + clause',
      correctExamples: [
        {
          sentence: 'I believe that honesty is the best policy.',
          translationThai: 'ฉันเชื่อว่าความซื่อสัตย์คือนโยบายที่ดีที่สุด',
          noteThai: '"that" + complete clause (noun clause)',
        },
        {
          sentence: 'I don\'t understand what he said.',
          translationThai: 'ฉันไม่เข้าใจสิ่งที่เขาพูด',
          noteThai: '"what" = "the thing that" — ไม่มี antecedent',
        },
        {
          sentence: 'The book that I am reading is excellent.',
          translationThai: 'หนังสือที่ฉันกำลังอ่านยอดเยี่ยม',
          noteThai: '"that" หลัง book (antecedent)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The book what I am reading is excellent.',
          correction: 'The book that I am reading is excellent.',
          whyWrongThai: 'มี antecedent (the book) แล้ว ห้ามใช้ "what" — ใช้ "that" หรือ "which"',
        },
        {
          sentence: 'I don\'t understand that he said.',
          correction: 'I don\'t understand what he said.',
          whyWrongThai: 'ไม่มี antecedent — ต้องใช้ "what" = "the thing that"',
        },
      ],
    },
  ],

  examPatterns: [
    {
      patternName: 'who vs which trap',
      howItAppearsInExamThai: 'โจทย์มี antecedent ที่อาจเป็นคนหรือสิ่งของ ตัวเลือกมี who, which, that, whose',
      signalWords: ['the teacher', 'the student', 'the writer', 'the book', 'the program', 'the policy'],
      trapChoices: ['which (เมื่อ antecedent เป็นคน)', 'who (เมื่อ antecedent เป็นสิ่งของ)'],
      examTipThai: 'คน → who/whom. สิ่งของ → which/that. สถานที่ → where. เวลา → when. ความเป็นเจ้าของ → whose',
    },
    {
      patternName: 'that after a comma (forbidden)',
      howItAppearsInExamThai: 'โจทย์มี comma หน้าช่องว่าง ตัวเลือก that, which, who',
      signalWords: ['comma + RP', 'non-defining clause'],
      trapChoices: ['that (หลัง comma — ผิด)'],
      examTipThai: 'หลัง comma → ห้ามใช้ that. ใช้ which (สิ่งของ) หรือ who (คน)',
    },
    {
      patternName: 'whose — easy to forget',
      howItAppearsInExamThai: 'โจทย์มีโครงสร้าง "noun + RP + noun + clause" บ่งความเป็นเจ้าของ',
      signalWords: ['whose + noun', 'noun + RP + his/her/its/their (ผิด)'],
      trapChoices: ['who his (ผิด)', 'which its (ผิด)'],
      examTipThai: 'ถ้าเห็น "his/her/its/their" หลัง relative pronoun → ใช้ "whose" แทน',
    },
    {
      patternName: 'where vs which for places',
      howItAppearsInExamThai: 'โจทย์มี antecedent ที่เป็นสถานที่ ตัวเลือก where, which, when',
      signalWords: ['the room', 'the city', 'the country', 'the office'],
      trapChoices: ['which (สำหรับสถานที่ที่ไม่มี preposition)', 'when (สำหรับสถานที่)'],
      examTipThai: 'สถานที่ + clause สมบูรณ์ → where. สถานที่ + preposition (in/at) + which → ก็ได้แต่ wordy',
    },
    {
      patternName: 'what vs that trap',
      howItAppearsInExamThai: 'โจทย์มี clause หลังกริยา (know, believe, understand) หรือหลัง antecedent',
      signalWords: ['know', 'believe', 'understand', 'remember'],
      trapChoices: ['what (เมื่อมี antecedent)', 'that (เมื่อไม่มี antecedent)'],
      examTipThai: 'มี noun ก่อน RP → that. ไม่มี noun → what (= the thing that)',
    },
    {
      patternName: 'sentential which (refers to whole clause)',
      howItAppearsInExamThai: 'โจทย์ใช้ which อ้างถึงทั้งประโยคก่อนหน้า ไม่ใช่ noun ตัวใดตัวหนึ่ง',
      signalWords: ['comma + which', 'main clause + comma + which'],
      trapChoices: ['that (ผิดเสมอหลัง comma)', 'who (ผิดเพราะไม่ใช่คน)'],
      examTipThai: 'หลัง comma + อ้างถึงทั้งสถานการณ์ → ใช้ which เท่านั้น (sentential relative clause)',
    },
  ],

  commonMistakesThaiStudents: [
    {
      mistake: 'ใช้ which กับคน',
      whyItHappensThai: 'นักเรียนคิดว่า which ใช้ได้ทั้งคนและสิ่งของ',
      fixThai: 'who/whom = คน. which/that = สิ่งของ. แยกเด็ดขาด',
      example: 'ผิด: The student which won the prize is my friend. → ถูก: The student who won the prize is my friend.',
    },
    {
      mistake: 'ใช้ that หลัง comma',
      whyItHappensThai: 'นักเรียนคิดว่า that ใช้ได้ทุกที่',
      fixThai: 'หลัง comma (non-defining clause) ห้ามใช้ that ใช้ which (สิ่งของ) หรือ who (คน)',
      example: 'ผิด: My brother, that lives in Tokyo, called me. → ถูก: My brother, who lives in Tokyo, called me.',
    },
    {
      mistake: 'ใช้ what แทน that',
      whyItHappensThai: 'ภาษาไทยใช้ "ที่/ซึ่ง" สำหรับทั้ง that และ what',
      fixThai: 'มี antecedent (noun ก่อนหน้า) → that/which. ไม่มี antecedent → what',
      example: 'ผิด: The book what I read was great. → ถูก: The book that I read was great.',
    },
    {
      mistake: 'ลืม whose สำหรับความเป็นเจ้าของ',
      whyItHappensThai: 'นักเรียนพยายามใช้ "who his" หรือ "which its" ซึ่งผิด',
      fixThai: 'ความเป็นเจ้าของ → whose (สำหรับทั้งคนและสิ่งของ)',
      example: 'ผิด: The man who his car was stolen called the police. → ถูก: The man whose car was stolen called the police.',
    },
    {
      mistake: 'สับสน where กับ which สำหรับสถานที่',
      whyItHappensThai: 'นักเรียนคิดว่า which ใช้กับสิ่งของได้ทุกชนิด',
      fixThai: 'สถานที่ + clause สมบูรณ์ → where. ดูว่าหลัง RP ขาด preposition (in/at/on) หรือไม่',
      example: 'ผิด: The café which I met you was small. → ถูก: The café where I met you was small.',
    },
    {
      mistake: 'ใช้ comma ผิดที่',
      whyItHappensThai: 'นักเรียนใส่ comma ตามความรู้สึก',
      fixThai: 'Defining clause (จำเป็น): ไม่มี comma. Non-defining clause (เพิ่มเติม): มี comma',
      example: 'ผิด: My only sister who lives abroad called me. → ถูก: My only sister, who lives abroad, called me. (ฉันมีพี่สาวคนเดียว ใช้ non-defining)',
    },
  ],

  quickRulesThai: [
    'who/whom = คน. which/that = สิ่งของ. whose = ความเป็นเจ้าของ. where = สถานที่. when = เวลา',
    'หลัง comma → ห้ามใช้ "that" — ใช้ which (สิ่งของ) หรือ who (คน)',
    'มี antecedent → that/which. ไม่มี antecedent → what',
    'whose + noun (ห้ามใช้ "who his" หรือ "which its")',
    'Defining clause (ไม่มี comma): จำเป็น ระบุว่าเป็นใคร/อะไร',
    'Non-defining clause (มี comma): ข้อมูลเสริม ตัดออกได้',
    'ใน defining clause สามารถละ relative pronoun ได้ถ้าเป็นกรรม',
  ],

  memoryTipsThai: [
    'ตารางจำ: who/whom (คน), which/that (สิ่งของ), whose (เจ้าของ), where (ที่), when (เวลา)',
    'สอบแยก defining vs non-defining: "ตัด clause ออกแล้วประโยคยังครบหรือไม่?" — ครบ = non-defining (มี comma)',
    'ดู comma เป็นสัญญาณ — ถ้ามี comma ตัด that ออกจากตัวเลือกทันที',
    'ดู "his/her/its/their + noun" หลัง RP → เปลี่ยนเป็น whose',
  ],

  miniQuiz: [
    {
      question: 'The doctor _____ treated my grandfather is very experienced.',
      choices: ['which', 'who', 'whose', 'where'],
      correctAnswer: 'who',
      explanationThai: 'antecedent คือ "the doctor" (คน) และ RP เป็นประธานของ "treated" → ใช้ who. ส่วน which ใช้กับสิ่งของ, whose ใช้กับเจ้าของ, where ใช้กับสถานที่',
      skillTag: 'relative_clause',
    },
    {
      question: 'The new policy, _____ was announced yesterday, will take effect next month.',
      choices: ['that', 'which', 'who', 'where'],
      correctAnswer: 'which',
      explanationThai: 'หลัง comma (non-defining clause) ห้ามใช้ "that" — ใช้ "which" สำหรับสิ่งของ (the policy)',
      skillTag: 'relative_clause',
    },
    {
      question: 'I met a writer _____ novels have been translated into many languages.',
      choices: ['who', 'whom', 'whose', 'which'],
      correctAnswer: 'whose',
      explanationThai: '"whose + noun (novels)" บ่งความเป็นเจ้าของ — นวนิยายของนักเขียนคนนั้น',
      skillTag: 'relative_clause',
    },
    {
      question: 'This is the school _____ I studied for six years.',
      choices: ['who', 'which', 'where', 'when'],
      correctAnswer: 'where',
      explanationThai: 'antecedent คือ "the school" (สถานที่) → ใช้ where. หลัง where ตามด้วย clause ที่สมบูรณ์ "I studied for six years"',
      skillTag: 'relative_clause',
    },
    {
      question: 'I will never forget the day _____ my daughter was born.',
      choices: ['who', 'which', 'where', 'when'],
      correctAnswer: 'when',
      explanationThai: 'antecedent คือ "the day" (เวลา) → ใช้ when. ส่วน where ใช้กับสถานที่ ไม่ใช่เวลา',
      skillTag: 'relative_clause',
    },
    {
      question: 'The students _____ submitted their assignments on time received full credit.',
      choices: ['who', 'which', 'whose', 'where'],
      correctAnswer: 'who',
      explanationThai: '"the students" (คน) + RP เป็นประธานของ "submitted" → who',
      skillTag: 'relative_clause',
    },
    {
      question: 'The book _____ I borrowed from the library has many illustrations.',
      choices: ['who', 'which', 'whose', 'where'],
      correctAnswer: 'which',
      explanationThai: 'antecedent คือ "the book" (สิ่งของ) + RP เป็นกรรมของ "borrowed" → ใช้ which (หรือ that ก็ได้ในที่นี้ แต่ตัวเลือกมีแค่ which)',
      skillTag: 'relative_clause',
    },
    {
      question: 'She lent me a novel, _____ I finished in just two days.',
      choices: ['that', 'which', 'what', 'where'],
      correctAnswer: 'which',
      explanationThai: 'หลัง comma (non-defining) ห้ามใช้ that. antecedent คือ "a novel" (สิ่งของ) → ใช้ which',
      skillTag: 'relative_clause',
    },
    {
      question: 'I don\'t understand _____ he is trying to say.',
      choices: ['that', 'which', 'what', 'who'],
      correctAnswer: 'what',
      explanationThai: 'ไม่มี antecedent ก่อน RP → ใช้ "what" = "the thing that". ส่วน that/which ต้องมี antecedent นำหน้า',
      skillTag: 'relative_clause',
    },
  ],

  masteryChecklist: [
    'ฉันแยก who/whom (คน), which/that (สิ่งของ), whose (เจ้าของ), where (ที่), when (เวลา) ได้',
    'ฉันรู้ว่าหลัง comma ห้ามใช้ "that"',
    'ฉันรู้ว่า defining clause ไม่มี comma, non-defining clause มี comma',
    'ฉันใช้ whose ได้กับทั้งคนและสิ่งของ',
    'ฉันรู้ว่า where ใช้กับสถานที่, when ใช้กับเวลา',
    'ฉันแยก that จาก what ได้ (มี/ไม่มี antecedent)',
    'ฉันสามารถละ relative pronoun ได้ใน defining clause เมื่อเป็นกรรม',
  ],
}

export default relativeClauses
