// Grammar Lesson: Parallel Structure
// Level: intermediate
// Targets the underused "parallel_structure" skill tag.

const parallelStructure = {
  id: 'parallel-structure',
  title: 'Parallel Structure',
  titleThai: 'โครงสร้างขนาน (Parallel Structure)',
  level: 'intermediate',
  status: 'available',
  relatedSkillTags: ['parallel_structure'],
  shortDescriptionThai: 'Parallel Structure คือกฎที่บอกว่าเมื่อเชื่อมคำหรือวลีหลายตัวด้วย and / or / but / nor คำในแต่ละตำแหน่งต้องมีรูปแบบไวยากรณ์เดียวกัน เช่น V-ing ทั้งหมด หรือ to-infinitive ทั้งหมด',
  whyItMattersThai: 'ในข้อสอบ cloze ระดับสูง ตัวเลือกมักเป็นรูปแบบที่ใกล้เคียงกัน (เช่น read, reading, to read, readed) นักเรียนที่ไม่สังเกตคำข้างเคียงจะเลือกผิด การจำกฎ parallel structure ช่วยให้ตัดตัวเลือกได้ทันที',

  coreRules: [
    {
      ruleTitle: 'parallel verbs in a list',
      explanationThai: 'เมื่อมีคำกริยาหลายตัวเชื่อมกันด้วย and / or ทุกตัวต้องอยู่ในรูปเดียวกัน — ทั้งหมดเป็น V1, V-ing, V-ed, หรือ to-infinitive',
      explanationEnglish: 'When verbs are joined by and/or, all items must share the same form: all base, all -ing, all past, or all to-infinitive.',
      pattern: 'verb1, verb2, and verb3 — same form for all',
      correctExamples: [
        {
          sentence: 'She enjoys reading, swimming, and cooking.',
          translationThai: 'เธอชอบอ่านหนังสือ ว่ายน้ำ และทำอาหาร',
          noteThai: 'ทั้ง 3 ตัวเป็น V-ing เพราะตามหลัง enjoy',
        },
        {
          sentence: 'I want to study, to travel, and to make new friends.',
          translationThai: 'ฉันอยากเรียน ท่องเที่ยว และมีเพื่อนใหม่',
          noteThai: 'ทั้ง 3 ตัวเป็น to-infinitive (to + V1)',
        },
        {
          sentence: 'He woke up early, took a shower, and went to work.',
          translationThai: 'เขาตื่นเช้า อาบน้ำ และไปทำงาน',
          noteThai: 'ทั้ง 3 ตัวเป็น past simple ในการเล่าเหตุการณ์ลำดับ',
        },
      ],
      wrongExamples: [
        {
          sentence: 'She enjoys reading, to swim, and cooking.',
          correction: 'She enjoys reading, swimming, and cooking.',
          whyWrongThai: '"to swim" ผิดรูปแบบ ทั้ง 3 ต้องเป็น V-ing เพราะตามหลัง enjoy',
        },
        {
          sentence: 'I plan to study hard, work part-time, and traveling.',
          correction: 'I plan to study hard, work part-time, and travel.',
          whyWrongThai: '"traveling" ผิดรูปแบบ — ตามหลัง plan to ทั้ง 3 ต้องเป็น V1',
        },
      ],
    },
    {
      ruleTitle: 'parallel nouns and adjectives',
      explanationThai: 'เมื่อนำคำนามหรือคำคุณศัพท์มาเชื่อมกัน ทุกตัวต้องเป็นคำชนิดเดียวกัน ห้ามผสมกัน เช่น noun + adjective + verb เข้าด้วยกัน',
      explanationEnglish: 'When nouns or adjectives are joined, every item must be the same part of speech. Mixing categories breaks parallelism.',
      pattern: 'adj1 + and + adj2 / noun1 + and + noun2 (same category)',
      correctExamples: [
        {
          sentence: 'The hotel was clean, comfortable, and affordable.',
          translationThai: 'โรงแรมสะอาด สบาย และราคาประหยัด',
          noteThai: 'adjective ทั้ง 3 ตัว',
        },
        {
          sentence: 'My brother is good at math, science, and English.',
          translationThai: 'พี่ชายฉันเก่งคณิตศาสตร์ วิทยาศาสตร์ และอังกฤษ',
          noteThai: 'noun ทั้ง 3 ตัว',
        },
      ],
      wrongExamples: [
        {
          sentence: 'The hotel was clean, comfortable, and had good service.',
          correction: 'The hotel was clean, comfortable, and well-served.',
          whyWrongThai: 'สองตัวแรกเป็น adjective แต่ตัวที่สามเป็นวลี — ผิด parallel ต้องทำให้เป็น adjective ทั้งหมด',
        },
      ],
    },
    {
      ruleTitle: 'parallel structure with correlative conjunctions',
      explanationThai: 'คำเชื่อมแบบคู่ เช่น both...and, either...or, neither...nor, not only...but also ต้องเชื่อมคำที่มีโครงสร้างเดียวกันทั้งสองข้าง',
      explanationEnglish: 'Correlative conjunctions like both/and, either/or, neither/nor, not only/but also must join grammatically equal elements on both sides.',
      pattern: 'either + X + or + X (same form on both sides)',
      correctExamples: [
        {
          sentence: 'She is both intelligent and hardworking.',
          translationThai: 'เธอทั้งฉลาดและขยัน',
          noteThai: 'adjective ทั้ง 2 ข้าง',
        },
        {
          sentence: 'You can either take a taxi or walk to the station.',
          translationThai: 'คุณจะนั่งแท็กซี่หรือเดินไปสถานีก็ได้',
          noteThai: 'V1 ทั้ง 2 ข้าง',
        },
        {
          sentence: 'Not only did she finish the report, but she also presented it.',
          translationThai: 'เธอไม่เพียงทำรายงานเสร็จ แต่ยังนำเสนอด้วย',
          noteThai: 'past simple verb ทั้ง 2 ข้าง',
        },
      ],
      wrongExamples: [
        {
          sentence: 'She is not only intelligent but also works hard.',
          correction: 'She is not only intelligent but also hardworking. / Not only is she intelligent, but she also works hard.',
          whyWrongThai: 'ข้างหน้าเป็น adjective แต่ข้างหลังเป็นกริยา + adverb — ต้องทำให้เป็นรูปเดียวกันทั้งสองข้าง',
        },
      ],
    },
    {
      ruleTitle: 'parallel structure in comparisons',
      explanationThai: 'เมื่อเปรียบเทียบสองสิ่ง ทั้งสองข้างของ "than" หรือ "as...as" ต้องมีโครงสร้างเดียวกัน เช่น เปรียบกริยากับกริยา ไม่ใช่กริยากับนาม',
      explanationEnglish: 'In comparisons with "than" or "as...as," both items must share the same form. Comparing a verb to a noun, or an adjective to a noun phrase, breaks parallelism.',
      pattern: 'X + comparison word + X (matching form)',
      correctExamples: [
        {
          sentence: 'Reading books is more relaxing than watching TV.',
          translationThai: 'การอ่านหนังสือผ่อนคลายกว่าการดูทีวี',
          noteThai: 'V-ing ทั้ง 2 ข้าง',
        },
        {
          sentence: 'It is easier to ask for help than to solve the problem alone.',
          translationThai: 'การขอความช่วยเหลือง่ายกว่าการแก้ปัญหาคนเดียว',
          noteThai: 'to-infinitive ทั้ง 2 ข้าง',
        },
      ],
      wrongExamples: [
        {
          sentence: 'Reading books is more relaxing than to watch TV.',
          correction: 'Reading books is more relaxing than watching TV.',
          whyWrongThai: 'ข้างหน้า "than" เป็น V-ing แต่ข้างหลังเป็น to-infinitive — ผิด ต้องเป็นรูปเดียวกัน',
        },
      ],
    },
  ],

  examPatterns: [
    {
      patternName: 'mixed forms in a list of activities',
      howItAppearsInExamThai: 'โจทย์เป็นประโยคที่มีรายการกิจกรรม เช่น "I enjoy reading, writing, and ____" ตัวเลือกมีรูป V1, V-ing, to-infinitive และ past',
      signalWords: ['enjoy', 'like', 'love', 'hate', 'finish', 'practice', 'and', 'or'],
      trapChoices: ['to + V1 (เมื่อต้องเป็น V-ing)', 'V-ed (เมื่อต้องเป็น V-ing)'],
      examTipThai: 'ดู 2-3 ตัวก่อนช่องว่างก่อน — ถ้าเป็น V-ing ทั้งหมด คำตอบต้องเป็น V-ing ด้วย',
    },
    {
      patternName: 'correlative conjunction trap',
      howItAppearsInExamThai: 'โจทย์ใช้ either...or / neither...nor / not only...but also โดยให้ช่องว่างอยู่ฝั่งใดฝั่งหนึ่ง',
      signalWords: ['either', 'or', 'neither', 'nor', 'not only', 'but also', 'both', 'and'],
      trapChoices: ['คำที่ต่างชนิดกับฝั่งตรงข้าม'],
      examTipThai: 'ดูฝั่งตรงข้ามของคำเชื่อม — ถ้าเป็น noun ฝั่งของช่องว่างต้องเป็น noun เช่นกัน ถ้าเป็น verb ต้องเป็น verb',
    },
    {
      patternName: 'comparison parallelism',
      howItAppearsInExamThai: 'ประโยคเปรียบเทียบที่ใช้ than หรือ as...as โดยช่องว่างอยู่ฝั่งใดฝั่งหนึ่ง',
      signalWords: ['than', 'as ... as', 'more than', 'less than', 'rather than'],
      trapChoices: ['รูปต่างจากฝั่งตรงข้าม เช่น V-ing vs. to-infinitive'],
      examTipThai: 'ดูฝั่งตรงข้ามของ than — ถ้าเป็น V-ing ก็ตอบ V-ing',
    },
    {
      patternName: 'parallel verbs after "decided to" or "wants to"',
      howItAppearsInExamThai: 'หลัง "decided to" / "wants to" + รายการกริยาหลายตัว ต้องเป็น V1 ทุกตัว',
      signalWords: ['decided to', 'wants to', 'plans to', 'hopes to'],
      trapChoices: ['to + V1 (ซ้ำ to)', 'V-ing (เปลี่ยนรูป)'],
      examTipThai: 'หลัง "to" ตัวแรก ที่เหลือเป็น V1 เปล่า — เช่น "decided to study, work, and travel" ห้ามมี to ซ้ำ',
    },
  ],

  commonMistakesThaiStudents: [
    {
      mistake: 'ผสม V-ing กับ to-infinitive ในรายการเดียวกัน',
      whyItHappensThai: 'นักเรียนเห็นกริยาหลายตัวแล้วเลือกรูปที่ "ดูถูก" ของแต่ละตัว แต่ลืมว่าทั้งหมดต้องเป็นรูปเดียวกัน',
      fixThai: 'อ่านกริยาหลัก (enjoy / want / plan) ก่อน แล้วใช้รูปที่ตรงตามนั้นทุกตัว',
      example: 'ผิด: I enjoy reading, to swim, and cooking. → ถูก: I enjoy reading, swimming, and cooking.',
    },
    {
      mistake: 'ใส่ to ซ้ำในรายการ to-infinitive',
      whyItHappensThai: 'นักเรียนคิดว่าทุกตัวในรายการต้องมี to เพื่อความสมดุล',
      fixThai: 'หลัง to ตัวแรก ที่เหลือเป็น V1 เปล่า — to + V1, V1, and V1',
      example: 'ผิด: She decided to study, to work, and to travel. → ถูก (รูปสั้น): She decided to study, work, and travel.',
    },
    {
      mistake: 'ผสม adjective กับ verb ใน correlative pair',
      whyItHappensThai: 'นักเรียนแปลในใจแล้วได้ความหมายใกล้เคียง เลยไม่สังเกตว่าหมวดคำต่างกัน',
      fixThai: 'ตรวจสอบว่าทั้ง 2 ข้างของ either/or, neither/nor, not only/but also เป็นหมวดคำเดียวกัน',
      example: 'ผิด: She is not only beautiful but also speaks well. → ถูก: She is not only beautiful but also articulate.',
    },
    {
      mistake: 'ลืมตรวจ parallel ในประโยคยาว',
      whyItHappensThai: 'ประโยคยาวทำให้รายการดูซ้อนกัน นักเรียนสนใจความหมายแต่ลืมตรวจรูปแบบ',
      fixThai: 'ขีดเส้นใต้คำที่เชื่อมด้วย and/or/but ทั้งหมด แล้วเปรียบเทียบรูป',
      example: 'ผิด: He spends his time at the gym, in the library, and reading at home. → ถูก: He spends his time at the gym, in the library, and at home reading.',
    },
  ],

  quickRulesThai: [
    'and/or/but/nor เชื่อมคำหรือวลีที่มีรูปแบบเดียวกัน',
    'หลัง enjoy/finish/consider/practice ใช้ V-ing ทุกตัวในรายการ',
    'หลัง decided to/want to/plan to ใช้ V1 ทุกตัวในรายการ',
    'either/or, neither/nor, not only/but also ต้องเชื่อมคำชนิดเดียวกันทั้ง 2 ข้าง',
    'than และ as...as ต้องมีรูปเดียวกันทั้ง 2 ข้าง',
  ],

  memoryTipsThai: [
    'อ่านประโยคเป็นกลุ่มที่เชื่อมด้วย and/or/but — ตรวจดูว่าทุกตัวมีรูปเดียวกันหรือไม่',
    'จำสูตร: "ถ้าตัวแรกเป็น X ตัวที่เหลือต้องเป็น X"',
    'เทคนิคตัดตัวเลือก: ดู 2-3 คำก่อนช่องว่าง ถ้าเป็น V-ing คำตอบต้อง V-ing',
    'ในประโยคเปรียบเทียบ ดูฝั่งของ than/as เป็นเครื่องบอกรูปแบบ',
  ],

  miniQuiz: [
    {
      question: 'She likes singing, dancing, and _____ on stage.',
      choices: ['act', 'to act', 'acting', 'acted'],
      correctAnswer: 'acting',
      explanationThai: 'หลัง "likes" ใช้ V-ing 2 ตัวก่อนหน้าเป็น singing, dancing — ตัวที่ 3 ต้องเป็น acting (V-ing) เพื่อรักษา parallel structure',
      skillTag: 'parallel_structure',
    },
    {
      question: 'The students plan to review their notes, finish their homework, and _____ for the exam.',
      choices: ['preparation', 'preparing', 'to prepare', 'prepare'],
      correctAnswer: 'prepare',
      explanationThai: 'หลัง "plan to" รายการกริยาทั้งหมดต้องเป็น V1 — review, finish, prepare ส่วน "to prepare" จะซ้ำ to และ "preparing" ผิดรูป',
      skillTag: 'parallel_structure',
    },
    {
      question: 'My new apartment is small, bright, and _____.',
      choices: ['has good location', 'in a good location', 'conveniently located', 'with convenience'],
      correctAnswer: 'conveniently located',
      explanationThai: 'สองตัวแรก (small, bright) เป็น adjective ตัวที่สามต้องเป็น adjective ด้วย — "conveniently located" เป็น adjective phrase ส่วนตัวอื่นเป็น preposition phrase หรือ verb phrase',
      skillTag: 'parallel_structure',
    },
    {
      question: 'She is not only a talented musician but also _____.',
      choices: ['paints beautifully', 'a beautiful painter', 'painting beautifully', 'paint beautifully'],
      correctAnswer: 'a beautiful painter',
      explanationThai: '"not only X but also Y" ต้องมีรูปแบบเดียวกัน. ฝั่ง not only เป็น noun phrase (a talented musician) — ฝั่ง but also จึงต้องเป็น noun phrase ด้วย (a beautiful painter)',
      skillTag: 'parallel_structure',
    },
    {
      question: 'Studying alone is sometimes more effective than _____ in a group.',
      choices: ['to study', 'study', 'studying', 'studied'],
      correctAnswer: 'studying',
      explanationThai: 'ฝั่งหน้าของ "than" คือ "Studying alone" (V-ing) ฝั่งหลังต้องเป็น V-ing เช่นกัน คือ "studying in a group"',
      skillTag: 'parallel_structure',
    },
    {
      question: 'You can either submit your essay online or _____ it in person.',
      choices: ['delivering', 'to deliver', 'deliver', 'delivered'],
      correctAnswer: 'deliver',
      explanationThai: '"either ... or ..." ต้องเชื่อมรูปเดียวกัน. ฝั่ง either เป็น V1 (submit) ฝั่ง or จึงต้องเป็น V1 (deliver)',
      skillTag: 'parallel_structure',
    },
    {
      question: 'My morning routine is to wake up early, _____ a healthy breakfast, and exercise for 30 minutes.',
      choices: ['eating', 'eat', 'to eat', 'ate'],
      correctAnswer: 'eat',
      explanationThai: 'หลัง "to" ตัวแรก รายการที่เหลือใช้ V1 เปล่า — wake up, eat, exercise. การใส่ to หรือ V-ing จะผิด parallel',
      skillTag: 'parallel_structure',
    },
    {
      question: 'The teacher praised the students for being polite, attentive, and _____.',
      choices: ['hard work', 'work hard', 'hardworking', 'they worked hard'],
      correctAnswer: 'hardworking',
      explanationThai: 'สองตัวแรก (polite, attentive) เป็น adjective ตัวที่สามต้องเป็น adjective ด้วย — "hardworking" เป็น adjective ส่วนตัวอื่นเป็น noun, verb phrase, หรือประโยค',
      skillTag: 'parallel_structure',
    },
  ],

  masteryChecklist: [
    'ฉันเข้าใจว่า and/or/but ต้องเชื่อมคำที่มีรูปแบบเดียวกัน',
    'ฉันรู้ว่าหลัง enjoy/like/finish/practice ใช้ V-ing ทั้งรายการ',
    'ฉันรู้ว่าหลัง decided to / want to / plan to ใช้ V1 ทั้งรายการ',
    'ฉันใช้ either/or, neither/nor, not only/but also กับคำชนิดเดียวกันได้',
    'ฉันใช้ than และ as...as กับรูปแบบเดียวกันทั้งสองข้างได้',
    'ฉันสามารถตรวจ parallel structure ในประโยคยาวได้',
  ],
}

export default parallelStructure
