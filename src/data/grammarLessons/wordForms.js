// Grammar Lesson: Word Forms
// Level: foundation
// Targets the underused "word_form" skill tag.

const wordForms = {
  id: 'word-forms',
  title: 'Word Forms',
  titleThai: 'รูปคำ (Word Forms)',
  level: 'foundation',
  status: 'available',
  relatedSkillTags: ['word_form'],
  shortDescriptionThai: 'Word Forms คือการเลือกใช้รูปคำที่ถูกต้องในประโยค เช่น เลือก noun (คำนาม), verb (คำกริยา), adjective (คำคุณศัพท์), หรือ adverb (คำกริยาวิเศษณ์) ตามตำแหน่งของคำในประโยค',
  whyItMattersThai: 'ในข้อสอบ cloze ตัวเลือก 4 ตัวมักเป็นคำตระกูลเดียวกัน เช่น care / careful / carefully / careless นักเรียนที่ดูแค่ความหมายโดยไม่สนใจตำแหน่งในประโยคจะพลาดทันที การเข้าใจหน้าที่ของแต่ละรูปคำจึงสำคัญมาก',

  coreRules: [
    {
      ruleTitle: 'identifying the slot: noun, verb, adjective, or adverb',
      explanationThai: 'ก่อนเลือกตอบ ต้องดูคำข้างเคียงเพื่อรู้ว่า "ที่ว่าง" ต้องการรูปคำชนิดใด — ก่อนคำนามต้องการ adjective, หลังกริยาช่วย/be ต้องการ adjective, ขยายกริยาต้องการ adverb',
      explanationEnglish: 'Before choosing an answer, identify what part of speech the slot needs by looking at neighboring words. Adjectives modify nouns; adverbs modify verbs/adjectives.',
      pattern: 'article/possessive + ___ + noun → adjective | verb + ___ → adverb',
      correctExamples: [
        {
          sentence: 'She gave a careful answer to every question.',
          translationThai: 'เธอตอบทุกคำถามอย่างระมัดระวัง',
          noteThai: '"a careful answer" — ก่อน noun ต้องการ adjective',
        },
        {
          sentence: 'She answered every question carefully.',
          translationThai: 'เธอตอบทุกคำถามอย่างระมัดระวัง',
          noteThai: '"answered carefully" — ขยาย verb ต้องการ adverb',
        },
        {
          sentence: 'The road was extremely dangerous after the rain.',
          translationThai: 'ถนนอันตรายมากหลังจากฝนตก',
          noteThai: '"extremely + dangerous (adj)" — adverb ขยาย adjective',
        },
        {
          sentence: 'Her carelessness caused the accident.',
          translationThai: 'ความประมาทของเธอทำให้เกิดอุบัติเหตุ',
          noteThai: '"Her ___" — หลัง possessive ต้องการ noun',
        },
      ],
      wrongExamples: [
        {
          sentence: 'She gave a carefully answer.',
          correction: 'She gave a careful answer.',
          whyWrongThai: 'ก่อน noun "answer" ต้องการ adjective — careful ไม่ใช่ carefully',
        },
        {
          sentence: 'He works very careful.',
          correction: 'He works very carefully.',
          whyWrongThai: 'หลังกริยา "works" ต้องการ adverb — carefully ไม่ใช่ careful',
        },
      ],
    },
    {
      ruleTitle: 'noun forms: countable, uncountable, and abstract',
      explanationThai: 'รูปคำนามใช้เป็นประธาน กรรม หรือหลัง preposition. คำนามนับได้ใช้กับ a/an/the หรือเติม -s. คำนามนับไม่ได้ (knowledge, advice, news) ห้ามเติม -s',
      explanationEnglish: 'Noun forms function as subjects, objects, or follow prepositions. Countable nouns take a/an/the; uncountable nouns (knowledge, advice, news) do not take -s.',
      pattern: 'subject/object slot needs a noun form',
      correctExamples: [
        {
          sentence: 'His success comes from years of hard work.',
          translationThai: 'ความสำเร็จของเขามาจากการทำงานหนักหลายปี',
          noteThai: '"His ___" + verb — ต้องการ noun (success)',
        },
        {
          sentence: 'I need some advice about this problem.',
          translationThai: 'ฉันต้องการคำแนะนำเกี่ยวกับปัญหานี้',
          noteThai: '"advice" เป็นนามนับไม่ได้ ห้ามเติม -s',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I need some advices.',
          correction: 'I need some advice. / I need some pieces of advice.',
          whyWrongThai: '"advice" เป็นนามนับไม่ได้ ห้ามเติม -s',
        },
        {
          sentence: 'Her successful made her family proud.',
          correction: 'Her success made her family proud.',
          whyWrongThai: 'หลัง "Her" ต้องการ noun (success) ไม่ใช่ adjective (successful)',
        },
      ],
    },
    {
      ruleTitle: 'adjective vs adverb forms',
      explanationThai: 'Adjective ขยายคำนาม. Adverb ขยายกริยา, adjective หรือ adverb อื่น. Adverb ส่วนใหญ่เติม -ly จาก adjective แต่บางตัวมีรูปต่างกัน เช่น good/well, fast/fast, hard/hard',
      explanationEnglish: 'Adjectives modify nouns; adverbs modify verbs, adjectives, or other adverbs. Most adverbs add -ly to the adjective, but some are irregular (good→well, fast→fast).',
      pattern: 'be/seem/look + adjective | action verb + adverb',
      correctExamples: [
        {
          sentence: 'She speaks English fluently.',
          translationThai: 'เธอพูดภาษาอังกฤษคล่อง',
          noteThai: 'ขยายกริยา "speaks" ใช้ adverb (fluently)',
        },
        {
          sentence: 'Her English is very fluent.',
          translationThai: 'ภาษาอังกฤษของเธอคล่องมาก',
          noteThai: 'หลัง "is" ใช้ adjective (fluent)',
        },
        {
          sentence: 'He runs fast every morning.',
          translationThai: 'เขาวิ่งเร็วทุกเช้า',
          noteThai: '"fast" เป็นทั้ง adjective และ adverb (ไม่มี fastly)',
        },
        {
          sentence: 'She did well on the test.',
          translationThai: 'เธอทำข้อสอบได้ดี',
          noteThai: '"well" เป็น adverb ของ "good"',
        },
      ],
      wrongExamples: [
        {
          sentence: 'She did good on the test.',
          correction: 'She did well on the test.',
          whyWrongThai: 'ขยายกริยา "did" ต้องใช้ adverb — well ไม่ใช่ good',
        },
        {
          sentence: 'He runs fastly.',
          correction: 'He runs fast.',
          whyWrongThai: '"fast" ไม่มีรูป "fastly" — fast ใช้เป็น adverb ได้เลย',
        },
      ],
    },
    {
      ruleTitle: 'verb forms in different tenses and structures',
      explanationThai: 'รูปกริยาเปลี่ยนตามเวลา (V1, V2, V3, V-ing) และตามโครงสร้าง (passive, perfect, infinitive). การเลือกรูปต้องดูประธาน เวลา และโครงสร้างไวยากรณ์รอบ ๆ',
      explanationEnglish: 'Verb forms change based on tense (V1, V2, V3, V-ing) and structure (passive, perfect, infinitive). Pick the form that matches subject, tense, and surrounding grammar.',
      pattern: 'subject + correct verb form (matches tense and structure)',
      correctExamples: [
        {
          sentence: 'The book was written by a famous author.',
          translationThai: 'หนังสือเล่มนั้นเขียนโดยนักเขียนชื่อดัง',
          noteThai: '"was + V3" = past passive',
        },
        {
          sentence: 'She wants to study abroad next year.',
          translationThai: 'เธออยากเรียนต่อต่างประเทศปีหน้า',
          noteThai: 'หลัง "wants" ใช้ to-infinitive',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The book was wrote by a famous author.',
          correction: 'The book was written by a famous author.',
          whyWrongThai: 'passive voice ต้องใช้ V3 (written) ไม่ใช่ V2 (wrote)',
        },
      ],
    },
    {
      ruleTitle: 'common word family transformations',
      explanationThai: 'รากคำเดียวกันอาจมีรูปต่าง ๆ เช่น care (n/v) → careful (adj) → carefully (adv) → careless (adj) การจำตระกูลคำช่วยให้เลือกได้แม่น',
      explanationEnglish: 'A single root often produces multiple forms: care (n/v) → careful (adj) → carefully (adv) → careless (adj). Knowing word families helps pick the right form quickly.',
      pattern: 'noun ↔ verb ↔ adjective ↔ adverb (related forms)',
      correctExamples: [
        {
          sentence: 'Honesty is the best policy. (noun)',
          translationThai: 'ความซื่อสัตย์คือนโยบายที่ดีที่สุด',
          noteThai: 'noun form: honesty',
        },
        {
          sentence: 'She is an honest person. (adjective)',
          translationThai: 'เธอเป็นคนซื่อสัตย์',
          noteThai: 'adjective form: honest',
        },
        {
          sentence: 'He answered honestly. (adverb)',
          translationThai: 'เขาตอบอย่างซื่อสัตย์',
          noteThai: 'adverb form: honestly',
        },
      ],
      wrongExamples: [
        {
          sentence: 'Honest is the best policy.',
          correction: 'Honesty is the best policy.',
          whyWrongThai: 'ในตำแหน่งประธาน ต้องการ noun (Honesty) ไม่ใช่ adjective (Honest)',
        },
      ],
    },
  ],

  examPatterns: [
    {
      patternName: '4 word forms from same root',
      howItAppearsInExamThai: 'ตัวเลือกเป็นคำตระกูลเดียวกัน เช่น care / careful / carefully / careless',
      signalWords: ['คำที่อยู่ก่อนช่องว่าง: a/an/the/his/her, be, seem, look, very + adjective + ?', 'คำที่อยู่หลังช่องว่าง: noun ตัวอื่น, verb ตัวอื่น'],
      trapChoices: ['adjective form (เมื่อต้องการ adverb)', 'adverb form (เมื่อต้องการ adjective)'],
      examTipThai: 'ดูตำแหน่งของช่องว่างก่อน — ก่อน noun = adjective, หลัง verb = adverb, หลัง be = adjective หรือ noun ขึ้นอยู่กับความหมาย',
    },
    {
      patternName: 'noun vs adjective in subject position',
      howItAppearsInExamThai: 'ช่องว่างอยู่ตำแหน่งประธาน เช่น "____ is important." ตัวเลือกมีทั้ง noun และ adjective',
      signalWords: ['___ + is/are/was/were', 'his/her/my/the + ___'],
      trapChoices: ['adjective form (จะกลายเป็นประโยคไม่สมบูรณ์)'],
      examTipThai: 'ตำแหน่งประธานต้องการ noun เสมอ เช่น "Honesty is..." ไม่ใช่ "Honest is..."',
    },
    {
      patternName: 'adverb intensifying adjective',
      howItAppearsInExamThai: 'ช่องว่างอยู่ก่อน adjective เช่น "____ important" ตัวเลือกมีทั้ง adjective (extreme) และ adverb (extremely)',
      signalWords: ['very, quite, extremely, highly, completely + ___ + adjective'],
      trapChoices: ['adjective form (เพราะคุ้นเคยกว่า)'],
      examTipThai: 'ก่อน adjective ใช้ adverb เพื่อเพิ่มระดับ — extremely important, highly competitive',
    },
    {
      patternName: 'adverb after action verb',
      howItAppearsInExamThai: 'ช่องว่างอยู่หลังกริยา action เช่น "She works ___" ตัวเลือกมีทั้ง adjective และ adverb',
      signalWords: ['action verb + ___', 'verb + adverb pattern'],
      trapChoices: ['adjective form (เพราะดูชินตา)'],
      examTipThai: 'หลังกริยา action (work, study, drive, speak, run) ใช้ adverb',
    },
  ],

  commonMistakesThaiStudents: [
    {
      mistake: 'ใช้ adjective ขยาย verb',
      whyItHappensThai: 'ภาษาไทยไม่มีการเปลี่ยนรูปคำตามหมวด นักเรียนเลยใช้ "good" ขยายทุกอย่าง',
      fixThai: 'หลังกริยา action ใช้ adverb (-ly) เช่น do well, run fast, drive carefully',
      example: 'ผิด: She did good. → ถูก: She did well.',
    },
    {
      mistake: 'ใช้ noun เป็น adjective',
      whyItHappensThai: 'นักเรียนคิดว่าคำที่หมายความใกล้กันใช้แทนกันได้',
      fixThai: 'ก่อน noun อีกตัวต้องเป็น adjective. ก่อน is/are/was/were ก็ต้องเป็น adjective หรือ noun (ขึ้นอยู่กับความหมาย)',
      example: 'ผิด: She is success. → ถูก: She is successful. / Her success is...',
    },
    {
      mistake: 'เพิ่ม -ly ในที่ที่ไม่ต้องการ',
      whyItHappensThai: 'นักเรียนจำกฎ "adverb เติม -ly" แล้วใช้ทุกที่',
      fixThai: 'ก่อน noun = adjective (ไม่ -ly). หลัง be/seem/look = adjective (ไม่ -ly). หลัง action verb = adverb (-ly)',
      example: 'ผิด: A carefully driver → ถูก: A careful driver',
    },
    {
      mistake: 'สับสน good/well',
      whyItHappensThai: 'good ดู "ใช้ได้ทั่วไป" ทำให้ใช้แทน well ในบริบท adverb',
      fixThai: 'good = adjective, well = adverb (ของ good). ขยายกริยาใช้ well',
      example: 'ผิด: He plays guitar good. → ถูก: He plays guitar well.',
    },
    {
      mistake: 'เติม -s กับนามนับไม่ได้',
      whyItHappensThai: 'นักเรียนคิดว่าทุก noun เติม -s เป็น plural ได้',
      fixThai: 'นามนับไม่ได้ (advice, news, information, knowledge, equipment) ห้ามเติม -s ใช้ "much/some/a piece of" แทน',
      example: 'ผิด: many advices → ถูก: much advice / many pieces of advice',
    },
  ],

  quickRulesThai: [
    'ก่อน noun ใช้ adjective (a careful answer)',
    'หลัง action verb ใช้ adverb (works carefully)',
    'หลัง be/seem/look/feel ใช้ adjective (is careful)',
    'ก่อน adjective ใช้ adverb เพิ่มระดับ (extremely important)',
    'ตำแหน่งประธาน/หลัง possessive ใช้ noun (his success)',
    'good = adjective, well = adverb',
    'fast = ทั้ง adjective และ adverb (ไม่มี fastly)',
  ],

  memoryTipsThai: [
    'ฝึกแยกหมวดคำ 4 ตระกูล: noun, verb, adjective, adverb',
    'จำคำที่ใช้บ่อยพร้อมรูปทั้ง 4: care/careful/carefully/careless, success/succeed/successful/successfully',
    'ใช้คำถาม "ตำแหน่งนี้ทำหน้าที่อะไร?" — ประธาน, ขยายอะไร, หลังคำอะไร',
    'ก่อนตอบ อ่านคำซ้าย-ขวาของช่องว่างก่อน เพื่อระบุหมวดคำที่ต้องการ',
  ],

  miniQuiz: [
    {
      question: '_____ is essential for any difficult exam.',
      choices: ['Prepare', 'Preparation', 'Prepared', 'Preparing'],
      correctAnswer: 'Preparation',
      explanationThai: 'ตำแหน่งประธานของประโยค ต้องการ noun — Preparation. ส่วน Prepare เป็น verb, Prepared เป็น adjective/V3, Preparing อาจเป็น gerund ได้แต่ noun เต็มรูป (Preparation) ตรงกว่า',
      skillTag: 'word_form',
    },
    {
      question: 'The students worked _____ on their group project.',
      choices: ['cooperative', 'cooperation', 'cooperatively', 'cooperate'],
      correctAnswer: 'cooperatively',
      explanationThai: 'หลังกริยา "worked" ต้องการ adverb เพื่อบอกวิธีการทำงาน — cooperatively ส่วน cooperative เป็น adjective, cooperation เป็น noun, cooperate เป็น verb',
      skillTag: 'word_form',
    },
    {
      question: 'She gave a _____ explanation of the difficult concept.',
      choices: ['clear', 'clearly', 'clarity', 'clarify'],
      correctAnswer: 'clear',
      explanationThai: 'ก่อน noun "explanation" ต้องการ adjective — clear ส่วน clearly เป็น adverb, clarity เป็น noun, clarify เป็น verb',
      skillTag: 'word_form',
    },
    {
      question: 'The new policy is _____ effective in reducing traffic.',
      choices: ['extreme', 'extremely', 'extremity', 'extremes'],
      correctAnswer: 'extremely',
      explanationThai: 'ก่อน adjective "effective" ต้องการ adverb เพื่อเพิ่มระดับ — extremely ส่วน extreme เป็น adjective, extremity และ extremes เป็น noun',
      skillTag: 'word_form',
    },
    {
      question: 'His _____ to learn new languages is impressive.',
      choices: ['able', 'ably', 'ability', 'enable'],
      correctAnswer: 'ability',
      explanationThai: 'หลัง possessive "His" ต้องการ noun — ability ส่วน able เป็น adjective, ably เป็น adverb, enable เป็น verb',
      skillTag: 'word_form',
    },
    {
      question: 'She handled the difficult situation _____.',
      choices: ['profession', 'professional', 'professionally', 'professionals'],
      correctAnswer: 'professionally',
      explanationThai: 'หลังกริยา "handled" + the difficult situation (กรรม) ต้องการ adverb เพื่อขยายกริยา — professionally ส่วน professional เป็น adjective, profession/professionals เป็น noun',
      skillTag: 'word_form',
    },
    {
      question: 'My grandfather is a very _____ man with many stories to tell.',
      choices: ['wise', 'wisely', 'wisdom', 'wisest'],
      correctAnswer: 'wise',
      explanationThai: 'ก่อน noun "man" และหลัง "very" ต้องการ adjective — wise ส่วน wisely เป็น adverb, wisdom เป็น noun, wisest เป็น superlative ที่ต้องมี the นำหน้า',
      skillTag: 'word_form',
    },
    {
      question: 'The team\'s _____ to win the championship motivated them all year.',
      choices: ['determine', 'determined', 'determination', 'determinedly'],
      correctAnswer: 'determination',
      explanationThai: 'หลัง possessive "team\'s" ต้องการ noun — determination ส่วน determine เป็น verb, determined เป็น adjective/V3, determinedly เป็น adverb',
      skillTag: 'word_form',
    },
  ],

  masteryChecklist: [
    'ฉันแยกหมวดคำได้ 4 ประเภท: noun, verb, adjective, adverb',
    'ฉันรู้ว่าก่อน noun ใช้ adjective',
    'ฉันรู้ว่าหลัง action verb ใช้ adverb',
    'ฉันรู้ว่าหลัง be/seem/look ใช้ adjective',
    'ฉันรู้ว่าก่อน adjective อีกตัวใช้ adverb',
    'ฉันแยกตระกูลคำได้ เช่น care → careful → carefully → careless',
    'ฉันใช้ good/well, fast/fast ได้ถูกต้อง',
    'ฉันรู้ว่านามนับไม่ได้ (advice, news, knowledge) ห้ามเติม -s',
  ],
}

export default wordForms
