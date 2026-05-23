// Grammar Lesson: Articles
// Level: foundation
// One of the most common skill tags missed by Thai students.

const articles = {
  id: 'articles',
  title: 'Articles',
  titleThai: 'คำนำหน้านาม (Articles)',
  level: 'foundation',
  status: 'available',
  relatedSkillTags: ['article'],
  shortDescriptionThai: 'Articles คือคำเล็ก ๆ ที่อยู่หน้าคำนาม ได้แก่ a, an, the และการ "ไม่ใช้" article (zero article) นักเรียนไทยมักเผลอข้ามเพราะภาษาไทยไม่มี article แต่ในข้อสอบ cloze articles เป็นตัวเลือกที่ทดสอบบ่อยมาก',
  whyItMattersThai: 'ในข้อสอบเข้ามหาวิทยาลัย Articles เป็นจุดที่นักเรียนไทยมักผิด เพราะภาษาไทยไม่มีระบบ article เลย ความผิดพลาดเล็ก ๆ เช่น "an university" หรือ "the my friend" ทำให้เสียคะแนนได้ง่าย การเข้าใจกฎ "first mention vs second mention" และ "specific vs general" จะช่วยตัดตัวเลือกผิดได้ทันที',

  coreRules: [
    {
      ruleTitle: 'a vs an — choose by sound, not spelling',
      explanationThai: 'ใช้ "a" หน้าเสียงพยัญชนะ และ "an" หน้าเสียงสระ — สำคัญคือ "เสียง" ไม่ใช่ตัวอักษร เช่น "an hour" (ตัว h เงียบ ออกเสียงเป็นสระ /aʊ/) และ "a university" (u ออกเสียง /yu/ เป็นเสียงพยัญชนะ)',
      explanationEnglish: 'Choose "a" or "an" based on the SOUND of the next word, not the letter. "an hour" (silent h, vowel sound), "a university" (consonant /j/ sound).',
      pattern: 'a + consonant sound | an + vowel sound',
      correctExamples: [
        {
          sentence: 'It will take about an hour to finish.',
          translationThai: 'ใช้เวลาประมาณหนึ่งชั่วโมงในการทำให้เสร็จ',
          noteThai: '"hour" → h เงียบ เริ่มด้วยเสียงสระ → an',
        },
        {
          sentence: 'She is studying at a university in Chiang Mai.',
          translationThai: 'เธอกำลังเรียนที่มหาวิทยาลัยในเชียงใหม่',
          noteThai: '"university" → ออกเสียง /yu/ เป็นเสียงพยัญชนะ → a',
        },
        {
          sentence: 'I bought an umbrella before the rain started.',
          translationThai: 'ฉันซื้อร่มก่อนฝนตก',
          noteThai: '"umbrella" → /ʌ/ เสียงสระ → an',
        },
        {
          sentence: 'He gave me a useful piece of advice.',
          translationThai: 'เขาให้คำแนะนำที่มีประโยชน์',
          noteThai: '"useful" → /yu/ เสียงพยัญชนะ → a',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I waited for an hour an a half.',
          correction: 'I waited for an hour and a half.',
          whyWrongThai: '"half" → /h/ เสียงพยัญชนะ → a (ไม่ใช่ an)',
        },
        {
          sentence: 'She is an university student.',
          correction: 'She is a university student.',
          whyWrongThai: '"university" ออกเสียง /yu/ เป็นเสียงพยัญชนะ → ใช้ a ไม่ใช่ an',
        },
      ],
    },
    {
      ruleTitle: 'first mention (a/an) vs second mention (the)',
      explanationThai: 'การใช้ article ครั้งแรก = a/an (เพราะผู้ฟังยังไม่รู้ว่าหมายถึงตัวไหน). การกล่าวถึงครั้งที่สอง = the (เพราะระบุเฉพาะแล้ว)',
      explanationEnglish: 'First mention: use "a/an" (the listener doesn\'t know which one). Second mention or specific reference: use "the."',
      pattern: 'first mention: a/an + noun | later mention: the + noun',
      correctExamples: [
        {
          sentence: 'I saw a cat in the garden. The cat was eating from a small bowl.',
          translationThai: 'ฉันเห็นแมวตัวหนึ่งในสวน แมวตัวนั้นกำลังกินจากชามใบเล็ก',
          noteThai: 'a cat (ครั้งแรก) → The cat (ครั้งที่สอง) | a small bowl (ครั้งแรก)',
        },
        {
          sentence: 'There is a museum near my house. The museum opens at 10 a.m.',
          translationThai: 'มีพิพิธภัณฑ์อยู่ใกล้บ้านฉัน พิพิธภัณฑ์เปิดเวลา 10 โมง',
          noteThai: 'a museum (แนะนำ) → the museum (พิพิธภัณฑ์ที่เพิ่งพูดถึง)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I saw the cat in the garden. (without prior mention)',
          correction: 'I saw a cat in the garden.',
          whyWrongThai: 'ถ้าไม่มีการพูดถึงแมวมาก่อน ใช้ "a cat" (กล่าวถึงครั้งแรก)',
        },
      ],
    },
    {
      ruleTitle: 'the — for unique or specific things',
      explanationThai: 'ใช้ "the" กับสิ่งที่มีเพียงหนึ่งเดียว (the sun, the moon, the world), สิ่งที่ผู้ฟังรู้แล้วว่าหมายถึงตัวไหน, หรือคำนามที่มี clause ขยายเฉพาะเจาะจง',
      explanationEnglish: 'Use "the" for unique items (the sun, the moon), things the listener already knows, or nouns specified by a modifier or clause.',
      pattern: 'the + unique noun | the + noun + specifying clause',
      correctExamples: [
        {
          sentence: 'The sun rises in the east.',
          translationThai: 'พระอาทิตย์ขึ้นทางทิศตะวันออก',
          noteThai: 'sun, east = สิ่งที่มีเพียงหนึ่ง → the',
        },
        {
          sentence: 'Please close the door behind you.',
          translationThai: 'กรุณาปิดประตูข้างหลังคุณด้วย',
          noteThai: 'the door = ประตูเฉพาะที่ทั้งคนพูดและคนฟังรู้ว่าหมายถึงตัวไหน',
        },
        {
          sentence: 'The book that I borrowed yesterday is on the table.',
          translationThai: 'หนังสือที่ฉันยืมมาเมื่อวานอยู่บนโต๊ะ',
          noteThai: 'the book + relative clause ระบุเฉพาะ → the',
        },
        {
          sentence: 'She is the best student in the class.',
          translationThai: 'เธอเป็นนักเรียนที่ดีที่สุดในห้อง',
          noteThai: 'the + superlative (best, biggest, oldest)',
        },
      ],
      wrongExamples: [
        {
          sentence: 'A sun is bright today.',
          correction: 'The sun is bright today.',
          whyWrongThai: 'sun เป็นสิ่งที่มีหนึ่งเดียว → ใช้ the เสมอ',
        },
        {
          sentence: 'She is best student in class.',
          correction: 'She is the best student in the class.',
          whyWrongThai: 'หลัง superlative (best) ต้องมี the และ "in the class" ใช้ the เพราะระบุห้องเฉพาะ',
        },
      ],
    },
    {
      ruleTitle: 'zero article — no article needed',
      explanationThai: 'ห้ามใช้ article กับ: คำนามนับไม่ได้แบบทั่วไป (water, music, advice), คำนามพหูพจน์แบบทั่วไป (cats, books), ชื่อเฉพาะ (Bangkok, Mary, Mount Everest), และมื้ออาหาร (breakfast, lunch, dinner)',
      explanationEnglish: 'No article (zero article) before: uncountable nouns in general sense, plural nouns in general sense, proper names, and meal names.',
      pattern: '∅ + uncountable/plural general | ∅ + proper noun | ∅ + meal',
      correctExamples: [
        {
          sentence: 'Water is essential for life.',
          translationThai: 'น้ำเป็นสิ่งจำเป็นต่อชีวิต',
          noteThai: 'water = นามนับไม่ได้แบบทั่วไป → ไม่ใช้ article',
        },
        {
          sentence: 'Cats are independent animals.',
          translationThai: 'แมวเป็นสัตว์ที่อิสระ',
          noteThai: 'cats = พหูพจน์ทั่วไป → ไม่ใช้ article',
        },
        {
          sentence: 'I usually have breakfast at 7 a.m.',
          translationThai: 'ฉันมักทานข้าวเช้าเวลา 7 โมง',
          noteThai: 'breakfast = ชื่อมื้ออาหาร → ไม่ใช้ article',
        },
        {
          sentence: 'Mary lives in Bangkok with her family.',
          translationThai: 'แมรี่อาศัยอยู่ในกรุงเทพกับครอบครัว',
          noteThai: 'Mary, Bangkok = ชื่อเฉพาะ → ไม่ใช้ article',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The water is essential for the life.',
          correction: 'Water is essential for life.',
          whyWrongThai: 'water และ life ในความหมายทั่วไป → ไม่ใช้ article',
        },
        {
          sentence: 'I usually have the breakfast at 7 a.m.',
          correction: 'I usually have breakfast at 7 a.m.',
          whyWrongThai: 'มื้ออาหารทั่วไป → ไม่ใช้ article. ใช้ the breakfast ได้เฉพาะเมื่อระบุมื้อนั้นเฉพาะ',
        },
      ],
    },
    {
      ruleTitle: 'general vs specific reference',
      explanationThai: 'ความหมายทั่วไป (generic) → ไม่ใช้ article (พหูพจน์/นามนับไม่ได้) หรือ a/an (เอกพจน์ที่หมายถึงประเภท). ความหมายเฉพาะ → ใช้ the',
      explanationEnglish: 'For general meanings, use no article (plural/uncountable) or "a/an" (singular as a category). For specific meanings, use "the."',
      pattern: 'general: ∅ + plural/uncountable | a/an + singular | specific: the + noun',
      correctExamples: [
        {
          sentence: 'Dogs are loyal animals. (general)',
          translationThai: 'สุนัขเป็นสัตว์ที่ซื่อสัตย์',
          noteThai: 'dogs = ทั่วไป → ไม่ใช้ article',
        },
        {
          sentence: 'A dog is a loyal animal. (general singular)',
          translationThai: 'สุนัขเป็นสัตว์ที่ซื่อสัตย์',
          noteThai: 'a dog = ตัวอย่างของประเภท → ใช้ a',
        },
        {
          sentence: 'The dog in our garden is very friendly. (specific)',
          translationThai: 'สุนัขในสวนของเราเป็นมิตรมาก',
          noteThai: 'the dog = สุนัขตัวเฉพาะ → ใช้ the',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The dogs are loyal animals.',
          correction: 'Dogs are loyal animals.',
          whyWrongThai: 'พูดถึงสุนัขทั่วไป (ทุกตัว) → ไม่ใช้ article. "The dogs" หมายถึงสุนัขเฉพาะกลุ่ม',
        },
      ],
    },
    {
      ruleTitle: 'fixed phrases with/without articles',
      explanationThai: 'มีวลีตายตัวที่ต้องจำ — ใช้ article: in the morning, in the afternoon, in the evening, the United States, the Internet. ไม่ใช้ article: at noon, at midnight, at night, by car, by bus, on foot, at home, at school',
      explanationEnglish: 'Memorize fixed phrases. With "the": in the morning, in the United States, the Internet. Without article: at noon, by car, on foot, at home, at school.',
      pattern: 'fixed phrase (memorize)',
      correctExamples: [
        {
          sentence: 'I always read in the morning before work.',
          translationThai: 'ฉันมักอ่านหนังสือตอนเช้าก่อนทำงาน',
          noteThai: '"in the morning" — ตายตัว ใช้ the',
        },
        {
          sentence: 'She goes to school by bus every day.',
          translationThai: 'เธอไปโรงเรียนโดยรถบัสทุกวัน',
          noteThai: '"by bus" — ตายตัว ไม่ใช้ article',
        },
        {
          sentence: 'We will arrive at noon.',
          translationThai: 'เราจะมาถึงตอนเที่ยง',
          noteThai: '"at noon" — ตายตัว ไม่ใช้ article',
        },
      ],
      wrongExamples: [
        {
          sentence: 'I always read in morning.',
          correction: 'I always read in the morning.',
          whyWrongThai: '"in the morning" ตายตัว ห้ามละ the',
        },
        {
          sentence: 'She goes to school by the bus.',
          correction: 'She goes to school by bus.',
          whyWrongThai: '"by + วิธีเดินทาง" ไม่ใช้ article — by car, by bus, by train, on foot',
        },
      ],
    },
  ],

  examPatterns: [
    {
      patternName: 'a vs an by sound',
      howItAppearsInExamThai: 'โจทย์มีคำที่ขึ้นต้นด้วยตัวอักษรหลอก เช่น hour (h เงียบ), university (u เป็นเสียง /yu/), MBA (เริ่ม /ɛm/)',
      signalWords: ['hour', 'honest', 'university', 'unique', 'European', 'one-hour', 'MBA', 'NGO'],
      trapChoices: ['a hour (ผิด)', 'an university (ผิด)', 'a MBA (ผิด)'],
      examTipThai: 'อ่านคำดัง ๆ ในใจ — เริ่มด้วยเสียงสระ → an. เริ่มด้วยเสียงพยัญชนะ → a',
    },
    {
      patternName: 'first mention vs second mention',
      howItAppearsInExamThai: 'โจทย์มีบทความที่กล่าวถึงสิ่งหนึ่งหลายครั้ง ตัวเลือกระหว่าง a/an, the',
      signalWords: ['ครั้งแรก: a/an', 'ครั้งที่สอง+: the'],
      trapChoices: ['the (ครั้งแรกที่ยังไม่ระบุ)', 'a (ครั้งที่สองที่ผู้ฟังรู้แล้ว)'],
      examTipThai: 'ดูบริบท — ถ้าเพิ่งพูดถึงครั้งแรก → a/an. ถ้าพูดต่อจากเดิม → the',
    },
    {
      patternName: 'zero article with general plurals/uncountables',
      howItAppearsInExamThai: 'โจทย์พูดถึงสิ่งทั่วไป เช่น Water, Books, Education ตัวเลือกมีทั้ง a, the, ∅',
      signalWords: ['general statement', 'plural without specific reference', 'uncountable + general meaning'],
      trapChoices: ['the (กับนามทั่วไป)', 'a (กับนามนับไม่ได้)'],
      examTipThai: 'พหูพจน์/นามนับไม่ได้ ในความหมายทั่วไป → ไม่ใช้ article',
    },
    {
      patternName: 'the + superlative / unique noun',
      howItAppearsInExamThai: 'โจทย์มี superlative (best, longest) หรือ unique noun (sun, moon) ตัวเลือกระหว่าง a, the, ∅',
      signalWords: ['best', 'longest', 'tallest', 'sun', 'moon', 'world', 'earth', 'sky'],
      trapChoices: ['a (กับ unique)', '∅ (กับ superlative)'],
      examTipThai: 'superlative และ unique noun → ต้องมี the เสมอ',
    },
    {
      patternName: 'fixed phrase trap',
      howItAppearsInExamThai: 'โจทย์มีวลีตายตัว เช่น "by bus" "in the morning" ตัวเลือกระหว่าง a, the, ∅',
      signalWords: ['by + transport', 'in the morning/afternoon/evening', 'at noon/midnight/night', 'at home', 'at school'],
      trapChoices: ['the bus (ใน "by bus" ผิด)', '∅ morning (ใน "in the morning" ผิด)'],
      examTipThai: 'จำวลีตายตัวเป็นกลุ่ม — by + เครื่องบิน/รถ/เรือ ไม่มี article. in the + ส่วนของวัน มี the. at + noon/midnight/night ไม่มี',
    },
  ],

  commonMistakesThaiStudents: [
    {
      mistake: 'ลืมใส่ article กับ singular countable noun',
      whyItHappensThai: 'ภาษาไทยไม่มี article — นักเรียนเลยเผลอข้าม',
      fixThai: 'singular countable noun ในประโยค ต้องมี article (a/an/the) หรือ possessive (my/your) เสมอ',
      example: 'ผิด: I bought book yesterday. → ถูก: I bought a book yesterday.',
    },
    {
      mistake: 'ใช้ "an" หน้าคำที่เริ่มด้วยตัวสระแต่ออกเสียงพยัญชนะ',
      whyItHappensThai: 'นักเรียนดูตัวอักษรไม่ใช่เสียง',
      fixThai: 'อ่านออกเสียง — university เริ่ม /yu/ → a, hour เริ่ม /aʊ/ → an',
      example: 'ผิด: an university → ถูก: a university',
    },
    {
      mistake: 'ใช้ "the" กับนามทั่วไป (general)',
      whyItHappensThai: 'แปลตามภาษาไทยที่ไม่มี article ทำให้เผลอใส่ the ทุกที่',
      fixThai: 'นามทั่วไปแบบพหูพจน์/นับไม่ได้ → ไม่ใช้ article',
      example: 'ผิด: The water is essential. → ถูก: Water is essential.',
    },
    {
      mistake: 'ใช้ "a/an" กับ possessive',
      whyItHappensThai: 'นักเรียนคิดว่าต้องมี article กับนามเอกพจน์',
      fixThai: 'ห้ามใช้ a/an/the คู่กับ possessive (my, your, his, her) — เลือกอย่างใดอย่างหนึ่ง',
      example: 'ผิด: a my book → ถูก: my book / a book',
    },
    {
      mistake: 'ใช้ article กับชื่อเฉพาะ',
      whyItHappensThai: 'นักเรียนเผลอใส่ "the" หน้าชื่อ',
      fixThai: 'ชื่อคน/เมือง/ประเทศส่วนใหญ่ ไม่ใช้ article (ยกเว้น the United States, the Philippines, the Netherlands)',
      example: 'ผิด: I live in the Bangkok. → ถูก: I live in Bangkok.',
    },
  ],

  quickRulesThai: [
    'a = หน้าเสียงพยัญชนะ. an = หน้าเสียงสระ — ฟังเสียง ไม่ใช่ตัวอักษร',
    'ครั้งแรก → a/an. ครั้งที่สอง/เฉพาะเจาะจง → the',
    'นามทั่วไปแบบพหูพจน์/นับไม่ได้ → ไม่ใช้ article',
    'superlative (best, biggest) → ต้องมี the',
    'unique noun (sun, moon, world) → ต้องมี the',
    'ห้ามใช้ a/an/the คู่กับ my/your/his/her',
    'ชื่อเฉพาะส่วนใหญ่ไม่ใช้ article (ยกเว้น the United States)',
    'in the morning/afternoon/evening (มี the) แต่ at noon/midnight/night (ไม่มี)',
  ],

  memoryTipsThai: [
    'จำคู่ตรงข้าม: a/an = "หนึ่งใน..." (introducing). the = "ตัวเฉพาะ..." (specifying)',
    'นามนับไม่ได้ + general meaning = no article',
    'ฟังเสียงคำให้แม่น — university (a), umbrella (an), hour (an), honest (an)',
    'ทบทวน fixed phrases ทุกสัปดาห์ — by bus, on foot, at noon, in the morning',
    'ใน reading passage สังเกตว่า a/an มาก่อน the เสมอเมื่อพูดถึงสิ่งเดียวกัน',
  ],

  miniQuiz: [
    {
      question: 'She is studying _____ European history at the university.',
      choices: ['a', 'an', 'the', '(no article)'],
      correctAnswer: '(no article)',
      explanationThai: '"European history" เป็นนามทั่วไป (วิชาทั่วไป) → ไม่ใช้ article. ส่วน "an European" ผิดเพราะ European เริ่มด้วยเสียง /yu/ ไม่ใช่สระ',
      skillTag: 'article',
    },
    {
      question: 'It will take _____ hour to drive to the airport.',
      choices: ['a', 'an', 'the', '(no article)'],
      correctAnswer: 'an',
      explanationThai: '"hour" → h เงียบ เริ่มด้วยเสียงสระ /aʊ/ → an',
      skillTag: 'article',
    },
    {
      question: 'I saw a strange dog in the park. _____ dog was chasing a butterfly.',
      choices: ['A', 'An', 'The', 'No article needed'],
      correctAnswer: 'The',
      explanationThai: 'การกล่าวถึงครั้งที่สอง (สุนัขตัวที่เพิ่งเห็นแล้ว) → ใช้ "The" ส่วน A/An ใช้กับการกล่าวถึงครั้งแรก',
      skillTag: 'article',
    },
    {
      question: '_____ honest person always tells the truth.',
      choices: ['A', 'An', 'The', '(no article)'],
      correctAnswer: 'An',
      explanationThai: '"honest" → h เงียบ เริ่มด้วยเสียงสระ /ɒ/ → an',
      skillTag: 'article',
    },
    {
      question: '_____ Earth orbits around _____ Sun.',
      choices: ['An / the', 'The / the', 'The / a', '(no article) / (no article)'],
      correctAnswer: 'The / the',
      explanationThai: 'Earth และ Sun เป็น unique nouns (มีหนึ่งเดียว) → ต้องใช้ the ทั้งคู่',
      skillTag: 'article',
    },
    {
      question: 'Children usually like _____ chocolate, but my son prefers _____ chocolate from Belgium.',
      choices: ['the / the', 'a / the', '(no article) / the', '(no article) / a'],
      correctAnswer: '(no article) / the',
      explanationThai: 'ครั้งแรก "chocolate" หมายถึงทั่วไป → ไม่ใช้ article. ครั้งที่สอง "chocolate from Belgium" ระบุเฉพาะด้วย "from Belgium" → the',
      skillTag: 'article',
    },
    {
      question: 'My grandfather always has _____ breakfast at 6 a.m.',
      choices: ['a', 'an', 'the', '(no article)'],
      correctAnswer: '(no article)',
      explanationThai: 'มื้ออาหารในความหมายทั่วไป (กิจวัตร) → ไม่ใช้ article. ใช้ "the breakfast" ได้เฉพาะเมื่อระบุมื้อนั้นเฉพาะ',
      skillTag: 'article',
    },
    {
      question: 'Sarah is _____ best student in our class this semester.',
      choices: ['a', 'an', 'the', '(no article)'],
      correctAnswer: 'the',
      explanationThai: 'หลัง superlative (best) ต้องใช้ "the" เสมอ',
      skillTag: 'article',
    },
    {
      question: 'I usually go to school _____ bus, but today I am going _____ foot.',
      choices: ['by / by', 'by / on', 'the / on', 'a / on'],
      correctAnswer: 'by / on',
      explanationThai: '"by bus" ตายตัว ไม่ใช้ article (by + วิธีเดินทาง). "on foot" ตายตัว ไม่ใช้ article',
      skillTag: 'article',
    },
  ],

  masteryChecklist: [
    'ฉันเลือก a/an จากเสียง ไม่ใช่ตัวอักษร',
    'ฉันใช้ a/an สำหรับ first mention และ the สำหรับ second mention',
    'ฉันใช้ the กับ unique noun (sun, moon, world)',
    'ฉันใช้ the กับ superlative (best, biggest, tallest)',
    'ฉันไม่ใช้ article กับนามทั่วไป (water, music, dogs)',
    'ฉันไม่ใช้ article กับชื่อเฉพาะส่วนใหญ่ (Mary, Bangkok)',
    'ฉันรู้ fixed phrases (in the morning, by bus, at noon)',
    'ฉันไม่ใช้ a/an/the คู่กับ possessive',
  ],
}

export default articles
