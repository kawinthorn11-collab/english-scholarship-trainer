// Short lessons that the pig & buffalo teachers read aloud in the floating helper.
// Each tip: { title, text, example? } — `example` is English and can be read aloud.

const examTips = [
  { title: 'อ่านคำถามก่อนอ่านบทความ', text: 'ข้อ Reading ให้กวาดตาดูคำถามก่อน แล้วค่อยกลับไปหา keyword ในบทความ ประหยัดเวลาได้เยอะมาก', example: 'Skim the questions first, then scan for keywords.' },
  { title: 'ข้อไหนติด ข้ามไปก่อน', text: 'อย่าจมกับข้อเดียวเกิน 90 วินาที กดข้อถัดไปแล้วค่อยกลับมาทีหลัง ใช้แผงเลขข้อด้านบนช่วยได้', example: 'Skip it, mark it, come back later.' },
  { title: 'ตัดช้อยส์ผิดก่อน', text: 'ถ้าไม่มั่นใจ ให้ตัดตัวที่ผิดชัด ๆ ออกก่อน โอกาสถูกจะเพิ่มจาก 25% เป็น 50% ทันที', example: 'Eliminate the obviously wrong choices first.' },
  { title: 'เวลา 60 ข้อ 60 นาที', text: 'เฉลี่ย 1 นาทีต่อข้อ แนะนำให้ทำ Grammar ให้เร็ว (~40 วิ/ข้อ) เพื่อเก็บเวลาไว้ให้ Reading', example: 'Grammar fast, reading careful.' },
]

const grammarTips = [
  { title: 'Subject–Verb Agreement', text: 'หาประธานตัวจริงก่อน! วลีที่คั่นกลางอย่าง "of the students" ไม่ได้เปลี่ยนกริยา', example: 'The list of items is on the table.' },
  { title: 'Gerund หลัง Preposition', text: 'หลัง preposition (in, on, of, about, without...) กริยาต้องเป็น V-ing เสมอ', example: 'She is interested in learning Japanese.' },
  { title: 'Passive Voice', text: 'ถ้าประธานเป็น "ผู้ถูกกระทำ" ให้ใช้ be + V3 ดูว่ามี by... หรือไม่ ก็เป็นสัญญาณที่ดี', example: 'The report was written by the committee.' },
  { title: 'Relative Clause', text: 'who = คน, which = สิ่งของ, whose = ของใคร ถ้ามี comma ห้ามใช้ that นะ', example: 'My sister, who lives in Paris, is a doctor.' },
  { title: 'Present Perfect', text: 'เจอ since / for / already / yet / ever / never ให้นึกถึง have/has + V3 ก่อนเลย', example: 'I have lived here since 2020.' },
  { title: 'Parallel Structure', text: 'ของที่เชื่อมด้วย and / or / but ต้องหน้าตาเหมือนกัน เช่น V-ing คู่กับ V-ing', example: 'She likes reading, writing, and swimming.' },
  { title: 'Conditionals Type 2', text: 'If + V2, would + V1 ใช้กับเรื่องสมมติที่ไม่จริงในปัจจุบัน และใช้ were กับทุกประธาน', example: 'If I were you, I would apply for the scholarship.' },
  { title: 'Articles a / an / the', text: 'an ใช้ตามเสียง ไม่ใช่ตัวอักษร: an hour, a university', example: 'It took an hour to visit a university.' },
]

const readingTips = [
  { title: 'Main Idea อยู่ไหน?', text: 'ส่วนใหญ่อยู่ประโยคแรกหรือประโยคสุดท้ายของย่อหน้า อ่านสองจุดนี้ก่อนเสมอ', example: 'The main idea is usually in the topic sentence.' },
  { title: 'ระวังช้อยส์ที่ "จริงแต่ไม่ตอบ"', text: 'ช้อยส์หลอกมักเป็นข้อมูลที่มีในบทความจริง แต่ไม่ได้ตอบคำถามที่ถาม', example: 'True, but not the answer to this question.' },
  { title: 'คำว่า NOT / EXCEPT', text: 'เจอคำถามแบบ NOT TRUE หรือ EXCEPT ให้วงไว้เลย คนพลาดเพราะลืมกลับด้านเยอะมาก', example: 'Which of the following is NOT mentioned?' },
  { title: 'เดาศัพท์จากบริบท', text: 'ดูคำรอบ ๆ เช่น however (ขัดแย้ง), for example (ยกตัวอย่าง), in other words (ความหมายเดียวกัน)', example: 'In other words, the project was abandoned.' },
]

const listeningTips = [
  { title: 'Shadowing', text: 'ฟังหนึ่งรอบ แล้วพูดตามทันทีโดยเลียนแบบจังหวะและเสียงสูงต่ำ ช่วยทั้งฟังและพูด', example: 'Listen, pause, and repeat out loud.' },
  { title: 'ฟังแบบไม่ดูตัวหนังสือ', text: 'กด Hide text ก่อน ฟังให้เข้าใจใจความ แล้วค่อยเปิดดูว่าตรงไหนที่ฟังไม่ทัน', example: 'Hide the text and listen for the main idea.' },
  { title: 'เสียงเชื่อม (Linking)', text: 'native จะพูดคำติดกัน เช่น "pick it up" ฟังเป็น "pi-ki-tup" ลองฟังช้าแล้วค่อยปกติ', example: 'Pick it up and put it on.' },
]

const generalTips = [
  { title: 'สวัสดี! เราคือหมูหวานกับควายขยัน', text: 'กดที่เราได้ตลอด เราจะพูดสอนเทคนิค grammar และวิธีทำข้อสอบให้ฟังทีละนิด ไม่ต้องอ่านเยอะ!', example: 'Practice a little every day.' },
  { title: 'วางแผนวันละ 20 นาที', text: 'ทำ Drill 10 นาที + ฟัง 5 นาที + ทบทวนข้อผิด 5 นาที ทำทุกวันจะเห็นผลภายใน 2 สัปดาห์', example: 'Consistency beats intensity.' },
  { title: 'ข้อผิดคือครูที่ดีที่สุด', text: 'หลังทำข้อสอบ ให้เปิดหน้า Results แล้วอ่านคำอธิบายข้อที่ผิดทุกข้อ นี่คือจุดที่คะแนนขึ้นเร็วที่สุด', example: 'Every mistake is a lesson.' },
  ...grammarTips.slice(0, 2),
]

const tipsByArea = {
  landing: generalTips,
  dashboard: [...generalTips, ...grammarTips.slice(2, 4)],
  exam: examTips,
  practice: [...examTips.slice(2), ...readingTips.slice(0, 2), ...grammarTips.slice(0, 2)],
  results: [generalTips[2], ...readingTips.slice(1), ...examTips.slice(0, 2)],
  grammar: grammarTips,
  listening: listeningTips,
  auth: generalTips.slice(0, 2),
}

export function getTipArea(page = '') {
  if (page === 'mock-exam') return 'exam'
  if (page.startsWith('grammar') || page.startsWith('academy')) return 'grammar'
  if (page === 'login' || page === 'register' || page === 'account') return 'auth'
  return tipsByArea[page] ? page : 'dashboard'
}

export function getTipsForPage(page) {
  return tipsByArea[getTipArea(page)] || generalTips
}

// "Word of the day" for the dashboard — academic words common in scholarship exams.
export const academicWords = [
  { word: 'substantial', type: 'adj.', thai: 'มาก, สำคัญ, เป็นชิ้นเป็นอัน', example: 'The scholarship covers a substantial part of the tuition.' },
  { word: 'mitigate', type: 'v.', thai: 'บรรเทา, ลดความรุนแรง', example: 'Trees help mitigate the effects of air pollution.' },
  { word: 'feasible', type: 'adj.', thai: 'เป็นไปได้, ทำได้จริง', example: 'The plan is feasible if we start early.' },
  { word: 'consequently', type: 'adv.', thai: 'ดังนั้น, ผลที่ตามมาคือ', example: 'He studied every day; consequently, his score improved.' },
  { word: 'advocate', type: 'v./n.', thai: 'สนับสนุน, ผู้สนับสนุน', example: 'Many experts advocate learning a second language early.' },
  { word: 'comprehensive', type: 'adj.', thai: 'ครอบคลุม, ละเอียดทุกด้าน', example: 'The course offers a comprehensive review of grammar.' },
  { word: 'deteriorate', type: 'v.', thai: 'แย่ลง, เสื่อมลง', example: 'Without practice, language skills can deteriorate.' },
  { word: 'inevitable', type: 'adj.', thai: 'หลีกเลี่ยงไม่ได้', example: 'Mistakes are inevitable when you learn something new.' },
  { word: 'prominent', type: 'adj.', thai: 'โดดเด่น, มีชื่อเสียง', example: 'She became a prominent researcher in her field.' },
  { word: 'sustain', type: 'v.', thai: 'รักษาไว้, ทำให้คงอยู่', example: 'It is hard to sustain motivation without clear goals.' },
  { word: 'ambiguous', type: 'adj.', thai: 'กำกวม, ตีความได้หลายแบบ', example: 'The question was ambiguous, so many students got it wrong.' },
  { word: 'enhance', type: 'v.', thai: 'เพิ่มพูน, ทำให้ดีขึ้น', example: 'Reading every day can enhance your vocabulary.' },
  { word: 'subsequent', type: 'adj.', thai: 'ที่ตามมา, ภายหลัง', example: 'Subsequent studies confirmed the results.' },
  { word: 'diligent', type: 'adj.', thai: 'ขยัน, อุตสาหะ', example: 'Diligent students review their mistakes carefully.' },
]

export function getWordOfTheDay(date = new Date()) {
  const dayIndex = Math.floor(date.getTime() / 86_400_000)
  return academicWords[dayIndex % academicWords.length]
}

// A tiny interactive quiz used on the landing page.
export const landingQuiz = {
  question: 'She is looking forward to ___ the scholarship results.',
  choices: ['receive', 'receiving', 'received', 'be received'],
  answer: 'receiving',
  explainCorrect: 'เก่งมาก! "look forward to" ตามด้วย V-ing เพราะ to ตรงนี้เป็น preposition ไม่ใช่ to-infinitive',
  explainWrong: 'เกือบแล้ว! "look forward to" ตัว to เป็น preposition จึงต้องตามด้วย V-ing → receiving',
}
