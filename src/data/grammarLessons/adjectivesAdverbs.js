import { createRichLesson, makeExample, makeWrong } from './richLessonFactory.js'

const adjectivesAdverbs = createRichLesson({
  id: 'adjectives-adverbs',
  title: 'Adjectives vs Adverbs',
  titleThai: 'คำคุณศัพท์และคำกริยาวิเศษณ์ (Adjectives vs Adverbs)',
  level: 'foundation',
  relatedSkillTags: ['adjective_adverb'],
  shortDescriptionThai: 'แยก adjective ที่ขยาย noun จาก adverb ที่ขยาย verb/adjective/adverb พร้อมกับดัก hard/hardly, late/lately, high/highly',
  whyItMattersThai: 'ข้อสอบ cloze มักเว้นช่องหน้า noun หลัง linking verb หรือหลังกริยา เพื่อวัดว่าผู้สอบรู้ชนิดคำหรือไม่ ภาษาไทยไม่เปลี่ยนรูปคำชัดเจนเหมือนอังกฤษ นักเรียนจึงมักเลือกคำที่แปลถูกแต่ตำแหน่งผิด',
  coreRules: [
    {
      ruleTitle: 'Adjectives modify nouns',
      explanationThai: 'adjective ใช้ขยายคำนามหรือสรรพนาม มักอยู่หน้าคำนาม หรือหลัง verb to be/linking verb',
      explanationEnglish: 'Adjectives describe nouns or pronouns. They usually appear before nouns or after linking verbs.',
      pattern: 'adjective + noun | be/seem/become + adjective',
      correctExamples: [
        makeExample('The careful student checked every answer.', 'นักเรียนที่รอบคอบตรวจทุกคำตอบ', 'careful ขยาย student ซึ่งเป็น noun'),
        makeExample('The instructions are clear.', 'คำสั่งชัดเจน', 'clear อยู่หลัง are และบอกสภาพของ instructions'),
      ],
      wrongExamples: [makeWrong('The carefully student checked every answer.', 'The careful student checked every answer.', 'หน้าคำนามต้องใช้ adjective ไม่ใช่ adverb')],
    },
    {
      ruleTitle: 'Adverbs modify verbs, adjectives, and other adverbs',
      explanationThai: 'adverb ใช้บอกว่ากริยาเกิดขึ้นอย่างไร หรือเพิ่มระดับ adjective/adverb อื่น',
      explanationEnglish: 'Adverbs describe verbs, adjectives, or other adverbs.',
      pattern: 'verb + adverb | adverb + adjective | adverb + adverb',
      correctExamples: [
        makeExample('She answered the question carefully.', 'เธอตอบคำถามอย่างรอบคอบ', 'carefully ขยายกริยา answered'),
        makeExample('The passage was extremely difficult.', 'บทอ่านยากมาก', 'extremely ขยาย adjective difficult'),
      ],
      wrongExamples: [makeWrong('She answered the question careful.', 'She answered the question carefully.', 'หลัง action verb ต้องใช้ adverb เพื่อบอกวิธีทำ')],
    },
    {
      ruleTitle: 'Linking verbs take adjectives',
      explanationThai: 'หลัง linking verbs เช่น be, seem, become, feel, look, sound, taste, smell ใช้ adjective เพราะคำหลังบอกสภาพของประธาน',
      explanationEnglish: 'After linking verbs, use adjectives because they describe the subject.',
      pattern: 'subject + linking verb + adjective',
      correctExamples: [
        makeExample('The explanation sounds reasonable.', 'คำอธิบายฟังดูสมเหตุสมผล', 'reasonable บอกสภาพของ explanation'),
        makeExample('He felt nervous before the interview.', 'เขารู้สึกประหม่าก่อนสัมภาษณ์', 'nervous เป็น adjective หลัง felt'),
      ],
      wrongExamples: [makeWrong('The explanation sounds reasonably.', 'The explanation sounds reasonable.', 'sound เป็น linking verb จึงต้องใช้ adjective')],
    },
    {
      ruleTitle: '-ly usually marks adverbs, but not always',
      explanationThai: 'หลาย adverb เติม -ly เช่น quick -> quickly แต่คำบางคำลงท้าย -ly เป็น adjective เช่น friendly, lonely, lovely',
      explanationEnglish: 'Many adverbs end in -ly, but some -ly words are adjectives.',
      pattern: 'quick -> quickly | friendly = adjective',
      correctExamples: [
        makeExample('The speaker explained the idea clearly.', 'ผู้พูดอธิบายแนวคิดอย่างชัดเจน', 'clearly เป็น adverb'),
        makeExample('The staff were friendly to all visitors.', 'เจ้าหน้าที่เป็นมิตรกับผู้มาเยือนทุกคน', 'friendly เป็น adjective'),
      ],
      wrongExamples: [makeWrong('The staff behaved friendly.', 'The staff behaved in a friendly way.', 'friendly เป็น adjective ไม่ใช่ adverb ปกติ')],
    },
    {
      ruleTitle: 'Hard/hardly, late/lately, high/highly',
      explanationThai: 'บางคู่หน้าตาคล้ายกันแต่ความหมายต่างกันมาก: hard = อย่างหนัก, hardly = แทบจะไม่; late = สาย, lately = เมื่อเร็ว ๆ นี้; high = สูงทางกายภาพ, highly = อย่างมาก/อย่างยิ่ง',
      explanationEnglish: 'Some adverb pairs have very different meanings and are common exam traps.',
      pattern: 'hard != hardly | late != lately | high != highly',
      correctExamples: [
        makeExample('She works hard to improve her score.', 'เธอทำงานหนักเพื่อเพิ่มคะแนน', 'hard = อย่างหนัก'),
        makeExample('She hardly understood the passage.', 'เธอแทบไม่เข้าใจบทอ่าน', 'hardly = แทบจะไม่'),
        makeExample('The teacher highly recommends this strategy.', 'ครูแนะนำกลยุทธ์นี้อย่างมาก', 'highly = อย่างมาก'),
      ],
      wrongExamples: [makeWrong('She works hardly every day.', 'She works hard every day.', 'hardly แปลว่าแทบจะไม่ ไม่ได้แปลว่าหนัก')],
    },
  ],
  examPatterns: [
    { patternName: 'blank before noun', howItAppearsInExamThai: 'ช่องว่างอยู่หน้าคำนาม เช่น ___ decision', signalWords: ['noun after blank'], trapChoices: ['adverb -ly'], examTipThai: 'ถ้าคำหลังเป็น noun และช่องว่างขยาย noun ให้เลือก adjective' },
    { patternName: 'blank after action verb', howItAppearsInExamThai: 'ช่องว่างหลังกริยา action เช่น explained ___', signalWords: ['explain', 'answer', 'work', 'drive'], trapChoices: ['adjective'], examTipThai: 'ถ้าบอกว่าทำกริยาอย่างไร ให้เลือก adverb' },
    { patternName: 'linking verb trap', howItAppearsInExamThai: 'ช่องว่างหลัง look/sound/feel/seem', signalWords: ['look', 'sound', 'feel', 'seem', 'become'], trapChoices: ['adverb -ly'], examTipThai: 'หลัง linking verb ใช้ adjective' },
    { patternName: 'degree adverb before adjective', howItAppearsInExamThai: 'ช่องว่างหน้าคำคุณศัพท์ เช่น ___ important', signalWords: ['important', 'difficult', 'useful'], trapChoices: ['adjective'], examTipThai: 'คำที่เพิ่มระดับ adjective ต้องเป็น adverb เช่น very/extremely/highly' },
    { patternName: 'look-alike adverbs', howItAppearsInExamThai: 'ตัวเลือกมี hard/hardly หรือ late/lately', signalWords: ['hard', 'hardly', 'late', 'lately'], trapChoices: ['คำที่แปลผิดบริบท'], examTipThai: 'แปลคู่คำให้แม่นก่อนเลือก เพราะ -ly อาจเปลี่ยนความหมาย' },
  ],
  commonMistakesThaiStudents: [
    { mistake: 'ใช้ adverb หน้าคำนาม', whyItHappensThai: 'เห็น -ly แล้วคิดว่าเป็นคำที่ดูเป็นทางการกว่า', fixThai: 'หน้าคำนามใช้ adjective', example: 'ผิด: carefully plan -> ถูก: careful plan' },
    { mistake: 'ใช้ adjective หลังกริยา action', whyItHappensThai: 'ภาษาไทยไม่แยกรูป "รอบคอบ" กับ "อย่างรอบคอบ"', fixThai: 'หลังกริยาเพื่อบอกวิธีทำ ใช้ adverb', example: 'ผิด: answer careful -> ถูก: answer carefully' },
    { mistake: 'ใช้ adverb หลัง feel/look/sound', whyItHappensThai: 'คิดว่าหลังกริยาต้องเป็น adverb เสมอ', fixThai: 'linking verb ตามด้วย adjective', example: 'ผิด: sounds clearly -> ถูก: sounds clear' },
    { mistake: 'สับสน hard กับ hardly', whyItHappensThai: 'คิดว่า hardly คือรูป adverb ของ hard เสมอ', fixThai: 'hard เป็น adverb ได้อยู่แล้ว; hardly แปลว่าแทบไม่', example: 'work hard ไม่ใช่ work hardly' },
    { mistake: 'แปล high/highly ตรงตัว', whyItHappensThai: 'เห็น highly แล้วคิดว่าสูงทางกายภาพ', fixThai: 'high = สูงจริง; highly = อย่างมาก', example: 'highly successful = ประสบความสำเร็จอย่างมาก' },
  ],
  quickRulesThai: [
    'หน้าคำนามใช้ adjective',
    'หลัง action verb เพื่อบอกวิธีทำ ใช้ adverb',
    'หลัง linking verb ใช้ adjective',
    'very/extremely/highly มักขยาย adjective',
    'hard = อย่างหนัก; hardly = แทบจะไม่',
    'late = สาย; lately = เมื่อเร็ว ๆ นี้',
    'friendly/lovely/lonely เป็น adjective แม้ลงท้าย -ly',
  ],
  memoryTipsThai: [
    'ถามว่า "ขยายใคร" ถ้าขยาย noun = adjective',
    'ถามว่า "ทำอย่างไร" ถ้าตอบกริยา = adverb',
    'look/sound/feel/seem เป็นสะพานไปหา adjective',
    'อย่าเชื่อ -ly อย่างเดียว ต้องดูความหมาย',
  ],
  miniQuiz: [
    { question: 'The scholarship committee made a _____ decision after reviewing all applications.', choices: ['careful', 'carefully', 'care', 'caringly'], correctAnswer: 'careful', explanationThai: 'ช่องว่างหน้าคำนาม decision ต้องใช้ adjective careful. carefully เป็น adverb จึงผิดตำแหน่ง', skillTag: 'adjective_adverb' },
    { question: 'The student explained her answer _____.', choices: ['clear', 'clearly', 'clearness', 'clearing'], correctAnswer: 'clearly', explanationThai: 'explain เป็น action verb ต้องใช้ adverb clearly เพื่อบอกว่าอธิบายอย่างไร', skillTag: 'adjective_adverb' },
    { question: 'The instructions on the form seem _____.', choices: ['confusing', 'confusingly', 'confuse', 'confusion'], correctAnswer: 'confusing', explanationThai: 'seem เป็น linking verb ตามด้วย adjective confusing. confusingly เป็น adverb จึงผิด', skillTag: 'adjective_adverb' },
    { question: 'She works _____ to improve her reading speed.', choices: ['hard', 'hardly', 'hardness', 'harden'], correctAnswer: 'hard', explanationThai: 'work hard = ทำงานหนัก. hardly แปลว่าแทบจะไม่ ซึ่งทำให้ความหมายผิด', skillTag: 'adjective_adverb' },
    { question: 'The new strategy is _____ useful for long cloze passages.', choices: ['high', 'highly', 'height', 'higher'], correctAnswer: 'highly', explanationThai: 'highly ขยาย adjective useful แปลว่าอย่างมาก. high ใช้กับความสูงจริง', skillTag: 'adjective_adverb' },
    { question: 'The speaker gave a _____ organized presentation.', choices: ['good', 'well', 'better', 'best'], correctAnswer: 'well', explanationThai: 'organized เป็น adjective/participle ต้องใช้ adverb well ขยายว่า organized ดีเพียงใด', skillTag: 'adjective_adverb' },
    { question: 'The soup tastes _____, so the students finished it quickly.', choices: ['delicious', 'deliciously', 'delightfully', 'tastefully'], correctAnswer: 'delicious', explanationThai: 'taste เป็น linking verb เมื่อบอกสภาพของ soup จึงใช้ adjective delicious', skillTag: 'adjective_adverb' },
    { question: 'I have not seen him _____ because he has been preparing for exams.', choices: ['late', 'lately', 'later', 'latest'], correctAnswer: 'lately', explanationThai: 'lately = เมื่อเร็ว ๆ นี้ เหมาะกับ present perfect. late แปลว่าสาย', skillTag: 'adjective_adverb' },
    { question: 'The teacher spoke _____ enough for everyone to understand.', choices: ['slow', 'slowly', 'slowness', 'slower'], correctAnswer: 'slowly', explanationThai: 'spoke เป็น action verb ต้องใช้ adverb slowly เพื่อบอกวิธีพูด', skillTag: 'adjective_adverb' },
    { question: 'The exam was surprisingly _____ for students who had practised the patterns.', choices: ['easy', 'easily', 'ease', 'easier'], correctAnswer: 'easy', explanationThai: 'หลัง was ใช้ adjective easy บอกสภาพของ exam. surprisingly เป็น adverb ที่ขยาย easy อยู่แล้ว', skillTag: 'adjective_adverb' },
  ],
  masteryChecklist: [
    'แยกได้ว่า adjective ขยาย noun',
    'แยกได้ว่า adverb ขยาย verb/adjective/adverb',
    'ใช้ adjective หลัง linking verbs ได้',
    'รู้ความต่างของ hard/hardly',
    'รู้ความต่างของ late/lately และ high/highly',
    'ตัดตัวเลือกผิดชนิดคำใน cloze ได้',
  ],
})

export default adjectivesAdverbs

