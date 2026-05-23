// Grammar Lesson: Subject-Verb Agreement
// Level: foundation
// Common trap in cloze passages because Thai doesn't conjugate verbs by number.

const subjectVerbAgreement = {
  id: 'subject-verb-agreement',
  title: 'Subject-Verb Agreement',
  titleThai: 'ความสอดคล้องระหว่างประธานและกริยา (Subject-Verb Agreement)',
  level: 'foundation',
  status: 'available',
  relatedSkillTags: ['subject_verb_agreement'],
  shortDescriptionThai: 'Subject-Verb Agreement คือกฎที่บอกว่าประธานและกริยาต้องสอดคล้องกันในด้านจำนวน — ประธานเอกพจน์ใช้กริยาเอกพจน์ ประธานพหูพจน์ใช้กริยาพหูพจน์ ในข้อสอบ cloze มักมีคำหรือวลีคั่นระหว่างประธานกับกริยา เพื่อทดสอบว่านักเรียนจะหาประธานจริงเจอหรือไม่',
  whyItMattersThai: 'ภาษาไทยไม่ผันกริยาตามจำนวน นักเรียนไทยจึงผิดบ่อยเมื่อ (1) มีวลียาวคั่นระหว่างประธานกับกริยา (2) มีคำเหมือนพหูพจน์แต่จริงเป็นเอกพจน์ (each, every, one of, news) (3) มี "there is/there are" ที่ต้องดูคำที่ตามหลัง การเข้าใจกฎจะช่วยตอบได้ทันทีโดยไม่ต้องเดา',

  coreRules: [
    {
      ruleTitle: 'singular subject + singular verb / plural subject + plural verb',
      explanationThai: 'หลักพื้นฐาน: ประธานเอกพจน์ (he/she/it หรือนามนับได้เอกพจน์) ใช้กริยาเอกพจน์ (เติม -s ใน Present Simple). ประธานพหูพจน์ (we/they หรือนามพหูพจน์) ใช้กริยาพหูพจน์ (ไม่เติม -s). กฎนี้ใช้กับ Present Simple และ Present Perfect (has vs have)',
      explanationEnglish: 'Singular subjects (he/she/it, singular nouns) take singular verbs (with -s in present simple). Plural subjects (we/they, plural nouns) take plural verbs (no -s). This applies to present simple and to has/have.',
      pattern: 'singular subject + V + s | plural subject + V (no -s)',
      correctExamples: [
        {
          sentence: 'My brother works at a bank in the city.',
          translationThai: 'พี่ชายฉันทำงานที่ธนาคารในเมือง',
          noteThai: '"My brother" เอกพจน์ → works (เติม -s)',
        },
        {
          sentence: 'My brothers work at the same company.',
          translationThai: 'พี่น้องชายฉันทำงานที่บริษัทเดียวกัน',
          noteThai: '"My brothers" พหูพจน์ → work (ไม่เติม -s)',
        },
        {
          sentence: 'She has finished her assignment already.',
          translationThai: 'เธอทำการบ้านเสร็จแล้ว',
          noteThai: '"She" เอกพจน์ → has',
        },
        {
          sentence: 'They have finished their assignments already.',
          translationThai: 'พวกเขาทำการบ้านเสร็จแล้ว',
          noteThai: '"They" พหูพจน์ → have',
        },
      ],
      wrongExamples: [
        {
          sentence: 'My brother work at a bank.',
          correction: 'My brother works at a bank.',
          whyWrongThai: '"My brother" เอกพจน์ → ต้องเติม -s กับ work',
        },
        {
          sentence: 'They has finished already.',
          correction: 'They have finished already.',
          whyWrongThai: '"They" พหูพจน์ → ใช้ have ไม่ใช่ has',
        },
      ],
    },
    {
      ruleTitle: 'subject separated from verb by a phrase (the most common trap)',
      explanationThai: 'เมื่อมีวลีคั่นระหว่างประธานกับกริยา (เช่น of phrase, prepositional phrase, relative clause) อย่าหลงให้นามที่ใกล้กริยามากที่สุดควบคุมการผัน — ต้องดูประธานหลัก (head noun) จริง',
      explanationEnglish: 'When a phrase separates the subject and verb (especially "of" phrases or prepositional phrases), do not let the noun nearest the verb control agreement. Find the head noun.',
      pattern: 'head noun + [intervening phrase] + verb (matches head noun)',
      correctExamples: [
        {
          sentence: 'The book on the shelves is mine.',
          translationThai: 'หนังสือบนชั้นเป็นของฉัน',
          noteThai: 'ประธานหลักคือ "The book" (เอกพจน์) → is. "shelves" เป็นแค่นามใน prepositional phrase',
        },
        {
          sentence: 'A box of chocolates was on the table.',
          translationThai: 'กล่องช็อกโกแลตอยู่บนโต๊ะ',
          noteThai: 'ประธานหลักคือ "A box" (เอกพจน์) → was. "chocolates" ไม่ใช่ประธาน',
        },
        {
          sentence: 'The students in the back row are talking too much.',
          translationThai: 'นักเรียนที่นั่งแถวหลังคุยเสียงดังเกินไป',
          noteThai: 'ประธานหลักคือ "The students" (พหูพจน์) → are',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The book on the shelves are mine.',
          correction: 'The book on the shelves is mine.',
          whyWrongThai: '"shelves" ใกล้กริยา แต่ไม่ใช่ประธาน — ประธานคือ "The book" (เอกพจน์) → is',
        },
        {
          sentence: 'A box of chocolates were on the table.',
          correction: 'A box of chocolates was on the table.',
          whyWrongThai: '"chocolates" ใกล้กริยา แต่ประธานหลักคือ "A box" → was',
        },
      ],
    },
    {
      ruleTitle: 'each / every / either / neither + singular',
      explanationThai: 'each, every, either, neither, anyone, everyone, someone, no one + นามเอกพจน์ → กริยาเอกพจน์เสมอ. คำเหล่านี้แม้บ่งความหลายอย่าง แต่ในไวยากรณ์ถือเป็นเอกพจน์',
      explanationEnglish: '"Each, every, either, neither, anyone, everyone, someone, no one" + singular noun → singular verb. These words may suggest multiple items but are grammatically singular.',
      pattern: 'each/every/either/neither + singular noun + singular verb',
      correctExamples: [
        {
          sentence: 'Each student has to submit an essay by Friday.',
          translationThai: 'นักเรียนแต่ละคนต้องส่งเรียงความภายในวันศุกร์',
          noteThai: '"Each student" เอกพจน์ → has',
        },
        {
          sentence: 'Every classroom in this school is air-conditioned.',
          translationThai: 'ห้องเรียนทุกห้องในโรงเรียนนี้มีแอร์',
          noteThai: '"Every classroom" เอกพจน์ → is',
        },
        {
          sentence: 'Neither answer is correct.',
          translationThai: 'คำตอบทั้งสองไม่ถูก',
          noteThai: '"Neither answer" เอกพจน์ → is',
        },
        {
          sentence: 'Everyone knows about the new policy.',
          translationThai: 'ทุกคนรู้เรื่องนโยบายใหม่',
          noteThai: '"Everyone" เอกพจน์ → knows (เติม -s)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'Each students have to submit an essay.',
          correction: 'Each student has to submit an essay.',
          whyWrongThai: '"Each + นามเอกพจน์" และ verb เอกพจน์ — student (ไม่ -s) + has',
        },
        {
          sentence: 'Everyone know about it.',
          correction: 'Everyone knows about it.',
          whyWrongThai: '"Everyone" เป็นเอกพจน์ → ต้องเติม -s กับ know',
        },
      ],
    },
    {
      ruleTitle: 'one of + plural noun + singular verb',
      explanationThai: '"one of + นามพหูพจน์" → กริยาเอกพจน์ เพราะประธานหลักคือ "one" (เอกพจน์) แม้นามที่ตามมาเป็นพหูพจน์',
      explanationEnglish: '"one of + plural noun" takes a singular verb because the head subject is "one," not the plural noun.',
      pattern: 'one of + plural noun + singular verb',
      correctExamples: [
        {
          sentence: 'One of my friends is coming to dinner tonight.',
          translationThai: 'เพื่อนคนหนึ่งของฉันจะมาทานข้าวเย็นนี้',
          noteThai: 'ประธานหลักคือ "One" → is (ไม่ใช่ are)',
        },
        {
          sentence: 'One of the students has won a national award.',
          translationThai: 'นักเรียนคนหนึ่งได้รับรางวัลระดับชาติ',
          noteThai: '"One of the students" → has',
        },
      ],
      wrongExamples: [
        {
          sentence: 'One of my friends are coming tonight.',
          correction: 'One of my friends is coming tonight.',
          whyWrongThai: 'ประธานหลักคือ "One" (เอกพจน์) → is. "friends" ใกล้กริยาแต่ไม่ใช่ประธาน',
        },
        {
          sentence: 'One of the students have won an award.',
          correction: 'One of the students has won an award.',
          whyWrongThai: '"One" เป็นประธานเอกพจน์ → has',
        },
      ],
    },
    {
      ruleTitle: 'there is / there are',
      explanationThai: '"There is" + นามเอกพจน์/นับไม่ได้. "There are" + นามพหูพจน์. กริยาผันตามคำที่ตามมาหลัง there is/are',
      explanationEnglish: '"There is" + singular/uncountable noun. "There are" + plural noun. The verb agrees with the noun that follows.',
      pattern: 'There is + singular noun | There are + plural noun',
      correctExamples: [
        {
          sentence: 'There is a book on the table.',
          translationThai: 'มีหนังสือเล่มหนึ่งบนโต๊ะ',
          noteThai: '"a book" เอกพจน์ → is',
        },
        {
          sentence: 'There are five books on the table.',
          translationThai: 'มีหนังสือ 5 เล่มบนโต๊ะ',
          noteThai: '"five books" พหูพจน์ → are',
        },
        {
          sentence: 'There is some milk in the fridge.',
          translationThai: 'มีนมอยู่ในตู้เย็น',
          noteThai: '"milk" นับไม่ได้ → is',
        },
        {
          sentence: 'There are several reasons for the delay.',
          translationThai: 'มีเหตุผลหลายอย่างสำหรับความล่าช้า',
          noteThai: '"several reasons" พหูพจน์ → are',
        },
      ],
      wrongExamples: [
        {
          sentence: 'There is many books on the table.',
          correction: 'There are many books on the table.',
          whyWrongThai: '"books" พหูพจน์ → ใช้ are',
        },
        {
          sentence: 'There are an apple in the bowl.',
          correction: 'There is an apple in the bowl.',
          whyWrongThai: '"an apple" เอกพจน์ → ใช้ is',
        },
      ],
    },
    {
      ruleTitle: 'compound subjects with and / or / nor',
      explanationThai: '"A and B" → กริยาพหูพจน์เสมอ. "A or B" / "A nor B" / "Either A or B" / "Neither A nor B" → กริยาผันตามประธานที่อยู่ใกล้กริยาที่สุด (proximity rule)',
      explanationEnglish: '"A and B" always takes a plural verb. "A or B" / "Either A or B" / "Neither A nor B" agree with the closer subject (proximity rule).',
      pattern: 'A and B + plural verb | A or B + verb agrees with B (closer one)',
      correctExamples: [
        {
          sentence: 'My brother and my sister are coming home tonight.',
          translationThai: 'พี่ชายและพี่สาวของฉันจะกลับบ้านคืนนี้',
          noteThai: '"and" → พหูพจน์ → are',
        },
        {
          sentence: 'Either the manager or his assistants are responsible.',
          translationThai: 'ไม่ผู้จัดการก็ผู้ช่วย เป็นผู้รับผิดชอบ',
          noteThai: '"assistants" ใกล้กริยา (พหูพจน์) → are',
        },
        {
          sentence: 'Neither the students nor the teacher knows the answer.',
          translationThai: 'ทั้งนักเรียนและครูไม่รู้คำตอบ',
          noteThai: '"the teacher" ใกล้กริยา (เอกพจน์) → knows',
        },
      ],
      wrongExamples: [
        {
          sentence: 'My brother and my sister is coming.',
          correction: 'My brother and my sister are coming.',
          whyWrongThai: '"A and B" = พหูพจน์ → are',
        },
        {
          sentence: 'Either the manager or his assistants is responsible.',
          correction: 'Either the manager or his assistants are responsible.',
          whyWrongThai: '"assistants" (พหูพจน์) ใกล้กริยา → are. กฎ proximity',
        },
      ],
    },
    {
      ruleTitle: 'collective nouns and quantifying expressions',
      explanationThai: 'collective nouns เช่น team, family, committee, group, government — ส่วนใหญ่ใช้กริยาเอกพจน์ในข้อสอบเป็นทางการ ส่วน "a number of + พหูพจน์" → กริยาพหูพจน์ และ "the number of + พหูพจน์" → กริยาเอกพจน์',
      explanationEnglish: 'Collective nouns (team, family, committee, group, government) typically take singular verbs in formal exam English. "a number of + plural" → plural verb. "the number of + plural" → singular verb.',
      pattern: 'collective noun + singular verb (usually) | a number of + plural verb | the number of + singular verb',
      correctExamples: [
        {
          sentence: 'The committee has decided to postpone the meeting.',
          translationThai: 'คณะกรรมการตัดสินใจเลื่อนการประชุม',
          noteThai: '"committee" → ใช้ has (เอกพจน์ในความหมายขององค์กร)',
        },
        {
          sentence: 'A number of students have failed the exam.',
          translationThai: 'นักเรียนจำนวนหนึ่งสอบตก',
          noteThai: '"a number of + พหูพจน์" → have (พหูพจน์)',
        },
        {
          sentence: 'The number of students has increased this year.',
          translationThai: 'จำนวนนักเรียนเพิ่มขึ้นในปีนี้',
          noteThai: '"the number" → has (เอกพจน์)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'A number of students has failed the exam.',
          correction: 'A number of students have failed the exam.',
          whyWrongThai: '"a number of" + พหูพจน์ → กริยาพหูพจน์ (have) เสมอ',
        },
        {
          sentence: 'The number of students have increased.',
          correction: 'The number of students has increased.',
          whyWrongThai: '"the number" เป็นประธานหลัก (เอกพจน์) → has',
        },
      ],
    },
    {
      ruleTitle: 'uncountable subjects + singular verb',
      explanationThai: 'นามนับไม่ได้ (advice, information, news, equipment, knowledge, furniture, traffic) → กริยาเอกพจน์เสมอ แม้ความหมายดูเหมือนพหูพจน์',
      explanationEnglish: 'Uncountable nouns (advice, information, news, equipment, knowledge, furniture, traffic) always take singular verbs.',
      pattern: 'uncountable noun + singular verb',
      correctExamples: [
        {
          sentence: 'The information she gave us was very useful.',
          translationThai: 'ข้อมูลที่เธอให้เรามีประโยชน์มาก',
          noteThai: '"information" นับไม่ได้ → was',
        },
        {
          sentence: 'The news is shocking.',
          translationThai: 'ข่าวนี้น่าตกใจ',
          noteThai: '"news" นับไม่ได้แม้ลงท้ายด้วย -s → is',
        },
        {
          sentence: 'The traffic in Bangkok is heavy during rush hour.',
          translationThai: 'การจราจรในกรุงเทพหนาแน่นช่วงเวลาเร่งด่วน',
          noteThai: '"traffic" นับไม่ได้ → is',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The information were very useful.',
          correction: 'The information was very useful.',
          whyWrongThai: '"information" นับไม่ได้ (เอกพจน์) → was',
        },
        {
          sentence: 'The news are shocking.',
          correction: 'The news is shocking.',
          whyWrongThai: '"news" ลงท้ายด้วย -s แต่นับไม่ได้ → is',
        },
      ],
    },
  ],

  examPatterns: [
    {
      patternName: 'phrase between subject and verb (#1 trap)',
      howItAppearsInExamThai: 'โจทย์มี prepositional phrase หรือ relative clause คั่นระหว่างประธานกับกริยา ตัวเลือก is/are หรือ has/have',
      signalWords: ['the book on the shelves', 'a box of chocolates', 'the students in the room', 'the leader of the team'],
      trapChoices: ['plural verb (เมื่อประธานหลักเป็นเอกพจน์)', 'singular verb (เมื่อประธานหลักเป็นพหูพจน์)'],
      examTipThai: 'ขีดเส้นใต้ประธานหลักก่อน — ตัดวลี "of + noun" หรือ "in + place" ออก แล้วดูว่าประธานคืออะไร',
    },
    {
      patternName: 'each/every/one of + verb',
      howItAppearsInExamThai: 'โจทย์มี each, every, one of, anyone, everyone + กริยา ตัวเลือก is/are, has/have',
      signalWords: ['each', 'every', 'one of', 'anyone', 'everyone', 'someone', 'no one'],
      trapChoices: ['plural verb (เพราะรู้สึกว่าหลายอย่าง)'],
      examTipThai: 'each/every/anyone/everyone/one of → กริยาเอกพจน์เสมอ จำสูตร "each = สิ่งหนึ่ง"',
    },
    {
      patternName: 'a number of vs the number of',
      howItAppearsInExamThai: 'ตัวเลือก has/have, is/are หลัง "a/the number of + พหูพจน์"',
      signalWords: ['a number of', 'the number of'],
      trapChoices: ['has + a number of (ผิด)', 'have + the number of (ผิด)'],
      examTipThai: '"a number of" = หลายคน → พหูพจน์ (have/are). "the number of" = จำนวน → เอกพจน์ (has/is)',
    },
    {
      patternName: 'either/or, neither/nor (proximity rule)',
      howItAppearsInExamThai: 'โจทย์มี either A or B / neither A nor B + กริยา',
      signalWords: ['either ... or', 'neither ... nor', 'not only ... but also'],
      trapChoices: ['plural verb เมื่อ B (ใกล้กริยา) เป็นเอกพจน์', 'singular verb เมื่อ B เป็นพหูพจน์'],
      examTipThai: 'กริยาผันตามประธานตัวที่อยู่ใกล้กริยาที่สุด (B) — ดู B แล้วเลือก',
    },
    {
      patternName: 'uncountable noun trap',
      howItAppearsInExamThai: 'ตัวเลือก is/are หลังนามนับไม่ได้',
      signalWords: ['advice', 'information', 'news', 'equipment', 'knowledge', 'furniture', 'traffic', 'water', 'rice'],
      trapChoices: ['plural verb เพราะลงท้ายด้วย -s (news)', 'plural verb เพราะคิดว่ามีหลายอย่าง'],
      examTipThai: 'นามนับไม่ได้ → กริยาเอกพจน์เสมอ. news ลงท้าย -s แต่ใช้ is',
    },
    {
      patternName: 'gerund subject + singular verb',
      howItAppearsInExamThai: 'ประธานเป็น V-ing (gerund) เช่น "Studying English ___ helpful"',
      signalWords: ['V-ing as subject', 'practising', 'reading', 'studying'],
      trapChoices: ['plural verb (เพราะ -ing ดูเหมือนกริยา)'],
      examTipThai: 'Gerund subject (V-ing) → กริยาเอกพจน์เสมอ. "Reading is fun" ไม่ใช่ "Reading are fun"',
    },
    {
      patternName: 'there is / there are with first noun',
      howItAppearsInExamThai: 'ประโยคขึ้นต้น There + ตัวเลือก is/are + นามตามมา',
      signalWords: ['there is', 'there are'],
      trapChoices: ['is + plural', 'are + singular'],
      examTipThai: 'ดูคำที่ตามหลัง there is/are โดยตรง — เอกพจน์/uncountable → is. พหูพจน์ → are',
    },
  ],

  commonMistakesThaiStudents: [
    {
      mistake: 'ลืมเติม -s หลังประธานเอกพจน์',
      whyItHappensThai: 'ภาษาไทยไม่ผันกริยา — นักเรียนเลยลืมเติม -s กับ he/she/it',
      fixThai: 'ตรวจประธานก่อน — he/she/it/นามเอกพจน์ + V + s ใน Present Simple',
      example: 'ผิด: She play tennis. → ถูก: She plays tennis.',
    },
    {
      mistake: 'ดูคำที่ใกล้กริยาแทนประธานหลัก',
      whyItHappensThai: 'นักเรียนเลือกกริยาตามคำที่ใกล้ที่สุดแทนที่จะหาประธาน',
      fixThai: 'ตัด prepositional phrase และ relative clause ออก แล้วดูประธานหลัก',
      example: 'ผิด: The book on the shelves are mine. → ถูก: The book on the shelves is mine.',
    },
    {
      mistake: 'ใช้กริยาพหูพจน์กับ each/every',
      whyItHappensThai: 'นักเรียนคิดว่า "each/every" หมายถึงหลายคน',
      fixThai: 'each/every/anyone/everyone → กริยาเอกพจน์เสมอ',
      example: 'ผิด: Each student have a book. → ถูก: Each student has a book.',
    },
    {
      mistake: 'ใช้กริยาพหูพจน์กับนามนับไม่ได้',
      whyItHappensThai: 'news, information, advice ลงท้ายด้วย -s หรือดูเหมือนพหูพจน์',
      fixThai: 'นามนับไม่ได้ → กริยาเอกพจน์เสมอ. ทดสอบ: ใส่ "many" ได้หรือไม่ — ถ้าไม่ได้ ก็เป็นนามนับไม่ได้',
      example: 'ผิด: The news are shocking. → ถูก: The news is shocking.',
    },
    {
      mistake: 'ใช้กริยาเอกพจน์กับประธาน "and"',
      whyItHappensThai: 'นักเรียนดูคำที่ใกล้กริยาแทนการดูทั้งคู่',
      fixThai: '"A and B" = พหูพจน์เสมอ → are/have',
      example: 'ผิด: My brother and my sister is coming. → ถูก: My brother and my sister are coming.',
    },
    {
      mistake: 'สับสน a number of กับ the number of',
      whyItHappensThai: 'ทั้งสองวลีดูคล้ายกันมาก',
      fixThai: '"a number of + พหูพจน์" = หลายคน (พหูพจน์ verb). "the number of + พหูพจน์" = จำนวน (เอกพจน์ verb)',
      example: 'ผิด: A number of students has failed. → ถูก: A number of students have failed.',
    },
  ],

  quickRulesThai: [
    'ประธานเอกพจน์ + V (Present Simple ต้อง +s)',
    'ประธานพหูพจน์ + V (ไม่ +s)',
    'each/every/anyone/everyone/one of + เอกพจน์ verb เสมอ',
    '"a number of + พหูพจน์" → พหูพจน์ verb. "the number of + พหูพจน์" → เอกพจน์ verb',
    'A and B → พหูพจน์ verb. Either/Neither A or/nor B → ตามตัวที่ใกล้กริยาที่สุด',
    'There is + เอกพจน์/uncountable. There are + พหูพจน์',
    'นามนับไม่ได้ (news, information, advice, equipment) → เอกพจน์ verb เสมอ',
    'Gerund subject (V-ing) → เอกพจน์ verb',
    'Collective nouns (team, family, committee) → ปกติเอกพจน์ verb ในข้อสอบ',
  ],

  memoryTipsThai: [
    'ขีดเส้นใต้ประธานหลักก่อนเลือกกริยา',
    'ตัด prepositional phrase ออกชั่วคราว ("on the shelves" "of chocolates") เพื่อหาประธานจริง',
    'จำสูตร "each = หนึ่งเดียว" → เอกพจน์ verb เสมอ',
    'ทดสอบ "many" — ถ้าใส่ many ได้ = นับได้พหูพจน์ (verb พหูพจน์). ถ้าใส่ไม่ได้ = นับไม่ได้/เอกพจน์',
    'จำคู่ตรงข้าม: "a number of" (หลายคน) vs "the number of" (จำนวน)',
    'There is/are: ดูคำตามหลังเสมอ — กริยาผันตามนามตัวแรกที่ตามมา',
  ],

  miniQuiz: [
    {
      question: 'The leader of the volunteers _____ planning the next event.',
      choices: ['is', 'are', 'have', 'were'],
      correctAnswer: 'is',
      explanationThai: 'ประธานหลักคือ "The leader" (เอกพจน์) ส่วน "of the volunteers" เป็น prepositional phrase ไม่ใช่ประธาน → is',
      skillTag: 'subject_verb_agreement',
    },
    {
      question: 'Each of the candidates _____ been interviewed individually.',
      choices: ['has', 'have', 'are', 'were'],
      correctAnswer: 'has',
      explanationThai: '"Each of the candidates" → ประธานหลักคือ "Each" (เอกพจน์) → has. ส่วน "candidates" เป็น of-phrase ไม่ใช่ประธาน',
      skillTag: 'subject_verb_agreement',
    },
    {
      question: 'A number of teachers _____ joined the new training program.',
      choices: ['has', 'have', 'is', 'was'],
      correctAnswer: 'have',
      explanationThai: '"A number of + พหูพจน์" = หลายคน → กริยาพหูพจน์ (have). ส่วน "the number of" จะใช้ has',
      skillTag: 'subject_verb_agreement',
    },
    {
      question: 'There _____ several reasons why the project was delayed.',
      choices: ['is', 'are', 'has', 'have'],
      correctAnswer: 'are',
      explanationThai: '"several reasons" พหูพจน์ → are. กริยาผันตามคำที่ตามหลัง there',
      skillTag: 'subject_verb_agreement',
    },
    {
      question: 'Neither the principal nor the teachers _____ available this afternoon.',
      choices: ['is', 'are', 'has', 'was'],
      correctAnswer: 'are',
      explanationThai: 'กฎ proximity: กริยาผันตามประธานตัวที่อยู่ใกล้กริยา ("teachers" พหูพจน์) → are',
      skillTag: 'subject_verb_agreement',
    },
    {
      question: 'The information you gave me _____ very helpful.',
      choices: ['is', 'are', 'were', 'have been'],
      correctAnswer: 'is',
      explanationThai: '"information" เป็นนามนับไม่ได้ → กริยาเอกพจน์ (is) เสมอ',
      skillTag: 'subject_verb_agreement',
    },
    {
      question: 'One of my best friends _____ moving to Singapore next month.',
      choices: ['is', 'are', 'have', 'were'],
      correctAnswer: 'is',
      explanationThai: '"One of + พหูพจน์" → ประธานหลักคือ "One" (เอกพจน์) → is. ส่วน "friends" เป็น of-phrase',
      skillTag: 'subject_verb_agreement',
    },
    {
      question: 'Studying English regularly _____ confidence and fluency.',
      choices: ['build', 'builds', 'are building', 'have built'],
      correctAnswer: 'builds',
      explanationThai: 'Gerund subject "Studying English regularly" เป็นเอกพจน์ → builds (เติม -s)',
      skillTag: 'subject_verb_agreement',
    },
    {
      question: 'The committee _____ already announced its final decision.',
      choices: ['has', 'have', 'is', 'are'],
      correctAnswer: 'has',
      explanationThai: '"The committee" เป็น collective noun ในความหมายขององค์กรเดียวกัน → has (เอกพจน์)',
      skillTag: 'subject_verb_agreement',
    },
  ],

  masteryChecklist: [
    'ฉันเติม -s กับกริยาเมื่อประธานเป็น he/she/it/นามเอกพจน์ใน Present Simple',
    'ฉันหาประธานหลักได้แม้มีวลีคั่นระหว่างประธานกับกริยา',
    'ฉันใช้กริยาเอกพจน์กับ each/every/anyone/everyone/one of',
    'ฉันแยก "a number of" (พหูพจน์) จาก "the number of" (เอกพจน์) ได้',
    'ฉันใช้ proximity rule กับ either/or, neither/nor',
    'ฉันใช้กริยาเอกพจน์กับนามนับไม่ได้ (news, information, advice)',
    'ฉันใช้กริยาเอกพจน์กับ gerund subject (V-ing)',
    'ฉันแยก There is + เอกพจน์ จาก There are + พหูพจน์ ได้',
  ],
}

export default subjectVerbAgreement
