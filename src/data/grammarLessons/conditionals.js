import { createRichLesson, makeExample, makeWrong } from './richLessonFactory.js'

const conditionals = createRichLesson({
  id: 'conditionals',
  title: 'Conditionals',
  titleThai: 'ประโยคเงื่อนไข (Conditionals)',
  level: 'intermediate',
  relatedSkillTags: ['conditional'],
  shortDescriptionThai: 'ฝึก if-clauses ทุกแบบ ตั้งแต่ zero, first, second, third, mixed conditionals รวมถึง unless และกับดัก would ใน if-clause',
  whyItMattersThai: 'ข้อสอบ cloze ชอบเว้นช่องในประโยคยาวที่มี if/unless เพราะต้องดูทั้งสองฝั่งของประโยคว่าเป็นเหตุการณ์จริง กำลังจะเกิด สมมติ หรือย้อนอดีต นักเรียนไทยมักแปลว่า "ถ้า" แล้วเลือก tense ตามภาษาไทย ทำให้พลาดเรื่อง backshift, would, และ past perfect',
  coreRules: [
    {
      ruleTitle: 'Zero conditional: facts and routines',
      explanationThai: 'ใช้กับความจริงทั่วไป กฎธรรมชาติ หรือสิ่งที่เกิดซ้ำเสมอ ทั้ง if-clause และ main clause ใช้ present simple',
      explanationEnglish: 'Use zero conditional for facts, scientific truths, and regular results. Both clauses use present simple.',
      pattern: 'If + present simple, present simple',
      correctExamples: [
        makeExample('If water reaches 100 degrees Celsius, it boils.', 'ถ้าน้ำถึง 100 องศา มันจะเดือด', 'เป็นความจริงทั่วไป จึงใช้ present simple ทั้งสองฝั่ง'),
        makeExample('If students practise daily, they remember patterns faster.', 'ถ้านักเรียนฝึกทุกวัน จะจำรูปแบบได้เร็วขึ้น', 'พูดถึงผลที่เกิดเป็นประจำ'),
      ],
      wrongExamples: [
        makeWrong('If water will reach 100 degrees, it boils.', 'If water reaches 100 degrees, it boils.', 'หลัง if ไม่ใช้ will เมื่อพูดถึงเงื่อนไขทั่วไป'),
      ],
    },
    {
      ruleTitle: 'First conditional: real future possibility',
      explanationThai: 'ใช้กับเงื่อนไขที่มีโอกาสเกิดจริงในอนาคต if-clause ใช้ present simple แต่ main clause ใช้ will/can/may + base verb',
      explanationEnglish: 'Use first conditional for real future possibilities. The if-clause uses present simple; the main clause uses will/can/may + base verb.',
      pattern: 'If + present simple, will/can/may + V1',
      correctExamples: [
        makeExample('If she studies the lesson tonight, she will pass the quiz.', 'ถ้าเธออ่านบทเรียนคืนนี้ เธอจะผ่านควิซ', 'เงื่อนไขอนาคตที่เป็นไปได้จริง'),
        makeExample('If the school announces the result tomorrow, we can plan the trip.', 'ถ้าโรงเรียนประกาศผลพรุ่งนี้ เราสามารถวางแผนการเดินทางได้', 'main clause ใช้ can + V1'),
      ],
      wrongExamples: [
        makeWrong('If she will study tonight, she will pass.', 'If she studies tonight, she will pass.', 'ใน if-clause ของ first conditional ใช้ present simple ไม่ใช้ will'),
      ],
    },
    {
      ruleTitle: 'Second conditional: unreal or unlikely present/future',
      explanationThai: 'ใช้กับสถานการณ์สมมติในปัจจุบันหรืออนาคตที่ไม่จริงหรือไม่น่าจะเกิด if-clause ใช้ past simple และ main clause ใช้ would/could/might + V1',
      explanationEnglish: 'Use second conditional for unreal or unlikely present/future situations.',
      pattern: 'If + past simple, would/could/might + V1',
      correctExamples: [
        makeExample('If I had more time, I would review every explanation.', 'ถ้าฉันมีเวลามากกว่านี้ ฉันจะทบทวนคำอธิบายทุกข้อ', 'เป็นเรื่องสมมติในปัจจุบัน'),
        makeExample('If he were more careful, he could avoid simple mistakes.', 'ถ้าเขารอบคอบกว่านี้ เขาจะหลีกเลี่ยงข้อผิดพลาดง่าย ๆ ได้', 'ใช้ were ได้กับทุกประธานในภาษาทางการ'),
      ],
      wrongExamples: [
        makeWrong('If I have more time, I would review every explanation.', 'If I had more time, I would review every explanation.', 'would ใน main clause ต้องคู่กับ past simple ใน if-clause เมื่อเป็นสมมติ'),
      ],
    },
    {
      ruleTitle: 'Third conditional: unreal past',
      explanationThai: 'ใช้พูดถึงสิ่งที่ไม่ได้เกิดขึ้นในอดีต และผลลัพธ์ที่คงเกิดไปแล้วถ้าเงื่อนไขนั้นเกิดขึ้น',
      explanationEnglish: 'Use third conditional for unreal past situations and their imagined past results.',
      pattern: 'If + past perfect, would/could/might have + V3',
      correctExamples: [
        makeExample('If they had left earlier, they would have arrived on time.', 'ถ้าพวกเขาออกเร็วกว่านี้ พวกเขาคงมาถึงตรงเวลาแล้ว', 'เงื่อนไขและผลลัพธ์เป็นอดีตที่ไม่เกิดจริง'),
        makeExample('If she had checked the answer, she might have noticed the error.', 'ถ้าเธอตรวจคำตอบ เธออาจเห็นข้อผิดพลาดแล้ว', 'might have + V3 แสดงความเป็นไปได้ในอดีต'),
      ],
      wrongExamples: [
        makeWrong('If they left earlier, they would have arrived on time.', 'If they had left earlier, they would have arrived on time.', 'third conditional ต้องใช้ past perfect ใน if-clause'),
      ],
    },
    {
      ruleTitle: 'Mixed conditional: past condition, present result',
      explanationThai: 'ใช้เมื่อเงื่อนไขเป็นอดีต แต่ผลยังส่งผลถึงปัจจุบัน โครงสร้างที่พบบ่อยคือ If + past perfect, would + V1',
      explanationEnglish: 'Use mixed conditionals when a past condition has a present result.',
      pattern: 'If + past perfect, would + V1',
      correctExamples: [
        makeExample('If I had learned this earlier, I would feel more confident now.', 'ถ้าฉันเรียนเรื่องนี้เร็วกว่านี้ ตอนนี้คงมั่นใจกว่านี้', 'อดีตส่งผลถึงปัจจุบัน'),
        makeExample('If he had saved his notes, he would not need to rewrite them today.', 'ถ้าเขาเก็บโน้ตไว้ วันนี้เขาคงไม่ต้องเขียนใหม่', 'condition เป็นอดีต result เป็นปัจจุบัน'),
      ],
      wrongExamples: [
        makeWrong('If I learned this earlier, I would feel confident now.', 'If I had learned this earlier, I would feel confident now.', 'คำว่า earlier ชี้ไปที่อดีตที่ไม่เกิด ต้องใช้ past perfect'),
      ],
    },
    {
      ruleTitle: 'Unless = if not',
      explanationThai: 'unless แปลว่า if not จึงไม่ต้องใส่ not ซ้ำ ยกเว้นความหมายต้องการปฏิเสธซ้อนจริง ๆ ซึ่งข้อสอบทั่วไปไม่ใช้',
      explanationEnglish: 'Unless means if not, so do not add another not after it in normal exam sentences.',
      pattern: 'Unless + positive clause, main clause',
      correctExamples: [
        makeExample('Unless you read the instructions carefully, you may miss important details.', 'ถ้าคุณไม่อ่านคำสั่งอย่างรอบคอบ คุณอาจพลาดรายละเอียดสำคัญ', 'unless มีความหมายปฏิเสธอยู่แล้ว'),
        makeExample('We will start the meeting unless the principal asks us to wait.', 'เราจะเริ่มประชุม เว้นแต่ผู้อำนวยการขอให้รอ', 'unless = except if'),
      ],
      wrongExamples: [
        makeWrong('Unless you do not study, you will fail.', 'Unless you study, you will fail.', 'unless มี not อยู่ในความหมายแล้ว ไม่ต้องใส่ do not ซ้ำ'),
      ],
    },
  ],
  examPatterns: [
    { patternName: 'if + blank + will', howItAppearsInExamThai: 'ช่องว่างอยู่หลังกริยาใน if-clause และอีกฝั่งมี will', signalWords: ['if', 'will', 'tomorrow', 'next'], trapChoices: ['will + V1 ใน if-clause', 'would + V1 ผิดระดับเงื่อนไข'], examTipThai: 'ถ้าเป็นเหตุการณ์อนาคตจริง ให้เลือก present simple หลัง if' },
    { patternName: 'would + V1 as a second conditional clue', howItAppearsInExamThai: 'main clause มี would/could/might + V1 ให้ย้อนกลับไปเลือก past simple ใน if-clause', signalWords: ['would', 'could', 'might'], trapChoices: ['present simple', 'will'], examTipThai: 'เห็น would + V1 ให้ถามว่าเป็นสมมติปัจจุบันหรือไม่ ถ้าใช่ เลือก past simple' },
    { patternName: 'would have + V3 as a third conditional clue', howItAppearsInExamThai: 'main clause มี would have/could have/might have + V3', signalWords: ['would have', 'could have', 'might have'], trapChoices: ['past simple', 'present perfect'], examTipThai: 'ฝั่ง if ต้องเป็น had + V3' },
    { patternName: 'unless trap', howItAppearsInExamThai: 'ตัวเลือกมี do not / does not หลัง unless', signalWords: ['unless'], trapChoices: ['unless + negative verb'], examTipThai: 'unless = if not อย่าใส่ not ซ้ำ' },
    { patternName: 'mixed time markers', howItAppearsInExamThai: 'มีคำบอกเวลาอดีตใน if-clause และคำว่า now/today ในผลลัพธ์', signalWords: ['earlier', 'last year', 'now', 'today'], trapChoices: ['second conditional ปกติ', 'third conditional ทั้งสองฝั่ง'], examTipThai: 'อดีตส่งผลปัจจุบัน = If + had V3, would + V1' },
  ],
  commonMistakesThaiStudents: [
    { mistake: 'ใส่ will หลัง if', whyItHappensThai: 'แปลว่า "จะ" จากภาษาไทยแล้วใส่ will ทันที', fixThai: 'ใน first conditional ใช้ present simple หลัง if', example: 'ผิด: If it will rain, we will cancel. -> ถูก: If it rains, we will cancel.' },
    { mistake: 'ใช้ would ทั้งสองฝั่ง', whyItHappensThai: 'คิดว่า would แปลว่า "จะ" เหมือนกันทั้งประโยค', fixThai: 'second conditional ใช้ past simple ใน if-clause', example: 'ผิด: If I would know, I would tell you. -> ถูก: If I knew, I would tell you.' },
    { mistake: 'ลืม had + V3 ใน third conditional', whyItHappensThai: 'เห็นอดีตแล้วเลือก past simple', fixThai: 'อดีตที่ไม่เกิดจริงต้อง past perfect', example: 'ผิด: If she studied, she would have passed. -> ถูก: If she had studied, she would have passed.' },
    { mistake: 'ใช้ unless + not', whyItHappensThai: 'แปลตรงตัวว่า "ถ้าไม่" แล้วเติม not', fixThai: 'unless มี not อยู่แล้ว', example: 'ผิด: Unless you do not hurry... -> ถูก: Unless you hurry...' },
    { mistake: 'ไม่ดูเวลาทั้งสองฝั่ง', whyItHappensThai: 'ตอบจากคำเดียวในช่องว่าง', fixThai: 'อ่านก่อนและหลัง comma เพื่อจับ time frame', example: 'If he had slept earlier, he would feel better now.' },
  ],
  quickRulesThai: [
    'Zero: If + present, present = ความจริงทั่วไป',
    'First: If + present, will + V1 = อนาคตที่เป็นไปได้จริง',
    'Second: If + past, would + V1 = สมมติปัจจุบัน/อนาคต',
    'Third: If + had V3, would have V3 = สมมติอดีต',
    'Mixed: If + had V3, would + V1 = อดีตส่งผลปัจจุบัน',
    'unless = if not อย่าใส่ not ซ้ำ',
    'หลัง if ในเงื่อนไขจริงอนาคต ไม่ใช้ will',
  ],
  memoryTipsThai: [
    'จำคู่ tense เป็นคู่ ไม่จำแยกคำ',
    'เห็น would have ให้คิดทันทีว่า if-clause มักเป็น had + V3',
    'เห็น now คู่กับอดีต ให้สงสัย mixed conditional',
    'unless เป็นคำลบในตัวเอง',
  ],
  miniQuiz: [
    { question: 'If the weather _____ better tomorrow, the school will hold the activity outside.', choices: ['is', 'will be', 'would be', 'had been'], correctAnswer: 'is', explanationThai: 'เป็น first conditional: If + present simple, will + V1. ไม่ใช้ will หลัง if; would/had been เป็นระดับสมมติผิดเวลา', skillTag: 'conditional' },
    { question: 'If I _____ more confident, I would volunteer to give the presentation.', choices: ['am', 'were', 'will be', 'had been'], correctAnswer: 'were', explanationThai: 'would + V1 ชี้ second conditional จึงใช้ past simple/were ใน if-clause. am/will be เป็นเงื่อนไขจริง; had been เป็น third conditional', skillTag: 'conditional' },
    { question: 'If she had reviewed the grammar notes, she _____ fewer mistakes.', choices: ['makes', 'will make', 'would make', 'would have made'], correctAnswer: 'would have made', explanationThai: 'if + had V3 เป็น third conditional ผลลัพธ์ต้อง would have + V3. would make เป็นผลปัจจุบันซึ่งไม่เข้ากับบริบทนี้', skillTag: 'conditional' },
    { question: 'Unless the students _____ the instructions, they may answer the wrong section.', choices: ['read', 'do not read', 'will read', 'had read'], correctAnswer: 'read', explanationThai: 'unless = if not จึงใช้กริยาบวก read. do not read เป็นปฏิเสธซ้ำ; will read ไม่ใช้หลัง unless ในเงื่อนไขอนาคต', skillTag: 'conditional' },
    { question: 'If water _____ below zero degrees, it freezes.', choices: ['falls', 'will fall', 'would fall', 'had fallen'], correctAnswer: 'falls', explanationThai: 'เป็นความจริงทั่วไป ใช้ zero conditional: present + present. ตัวเลือกอื่นเป็นอนาคต/สมมติ/อดีต', skillTag: 'conditional' },
    { question: 'If he had saved the file yesterday, he _____ to rewrite it now.', choices: ['does not need', 'will not need', 'would not need', 'would not have needed'], correctAnswer: 'would not need', explanationThai: 'อดีตที่ไม่เกิด (had saved yesterday) ส่งผลถึงปัจจุบัน (now) = mixed conditional: would + V1', skillTag: 'conditional' },
    { question: 'If the committee _____ the budget, the project can begin next month.', choices: ['approves', 'will approve', 'approved', 'had approved'], correctAnswer: 'approves', explanationThai: 'เป็น first conditional มี can begin next month จึงใช้ present simple หลัง if. will approve ผิดกฎ; approved/had approved เปลี่ยนความหมาย', skillTag: 'conditional' },
    { question: 'If I _____ the answer, I would tell you immediately.', choices: ['know', 'knew', 'will know', 'had known'], correctAnswer: 'knew', explanationThai: 'would tell เป็น second conditional ต้องใช้ past simple knew. know/will know เป็นเงื่อนไขจริง; had known จะคู่กับ would have told', skillTag: 'conditional' },
    { question: 'The team would have finished earlier if they _____ enough materials.', choices: ['have', 'had', 'had had', 'will have'], correctAnswer: 'had had', explanationThai: 'would have finished เป็น third conditional ฝั่ง if ต้องใช้ past perfect = had had. had อย่างเดียวเป็น past simple', skillTag: 'conditional' },
    { question: 'If the passage is too long, _____ the sentence before and after the blank first.', choices: ['read', 'will read', 'would read', 'had read'], correctAnswer: 'read', explanationThai: 'เป็นคำแนะนำ/คำสั่งแบบ zero conditional ใช้ base verb ใน imperative main clause. will/would/had read ไม่เข้ารูป', skillTag: 'conditional' },
  ],
  masteryChecklist: [
    'แยก zero, first, second, third, mixed conditional ได้',
    'ไม่ใส่ will ใน if-clause ของ first conditional',
    'ใช้ would + V1 กับ second conditional ได้ถูก',
    'ใช้ would have + V3 กับ third conditional ได้ถูก',
    'จำได้ว่า unless = if not',
    'อ่านเวลาในทั้งสอง clauses ก่อนเลือกคำตอบ',
  ],
})

export default conditionals

