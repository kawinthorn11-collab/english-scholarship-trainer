// Bite-sized "listen first" lessons taught by ครูหมูหวาน (pig) and ครูควายขยัน (buffalo).
// Every line is short so it can be read aloud; `example` is an English sentence that
// is shown on a card and spoken in an English voice after the line.

export const duoCast = {
  pig: { name: 'ครูหมูหวาน', short: 'หมูหวาน', emoji: '🐷', tone: 'pig' },
  buffalo: { name: 'ครูควายขยัน', short: 'ควายขยัน', emoji: '🐃', tone: 'buffalo' },
}

export const duoLessons = [
  {
    id: 'sva',
    emoji: '🤝',
    title: 'Subject–Verb Agreement',
    titleThai: 'ประธานกับกริยาต้องเข้าคู่กัน',
    color: 'from-pink-500 to-orange-400',
    lines: [
      { who: 'pig', text: 'ควายขยัน! ประโยคนี้ใช้ is หรือ are ดีอะ?', example: 'The list of items ___ on the table.' },
      { who: 'buffalo', text: 'ใจเย็นหมูหวาน หาประธานตัวจริงก่อน' },
      { who: 'buffalo', text: 'of items เป็นแค่ของแถม ประธานจริงคือ list ตัวเดียว' },
      { who: 'pig', text: 'อ๋อ! list เป็นเอกพจน์ ก็ต้องใช้ is', example: 'The list of items is on the table.' },
      { who: 'buffalo', text: 'ถูกต้อง! ข้อสอบชอบเอานามพหูพจน์มาวางใกล้ ๆ กริยาเพื่อหลอก' },
      { who: 'pig', text: 'จำไว้: ตัดวลีตรงกลางทิ้ง แล้วดูประธานจริงเสมอ!' },
    ],
    quiz: {
      question: 'The students in my class ___ very friendly.',
      choices: ['is', 'are', 'was', 'be'],
      answer: 'are',
      explain: 'ประธานจริงคือ The students ซึ่งเป็นพหูพจน์ จึงใช้ are',
    },
  },
  {
    id: 'look-forward',
    emoji: '🎁',
    title: 'look forward to + V-ing',
    titleThai: 'to ที่ไม่ใช่ to-infinitive',
    color: 'from-amber-400 to-pink-500',
    lines: [
      { who: 'buffalo', text: 'หมูหวาน ลองเติมคำนี้ดู', example: 'I look forward to ___ you.' },
      { who: 'pig', text: 'ง่ายมาก! to ตามด้วยกริยาช่องหนึ่ง ก็ see ไง' },
      { who: 'buffalo', text: 'ผิดจ้า! to ในวลีนี้เป็น preposition' },
      { who: 'buffalo', text: 'หลัง preposition กริยาต้องเติม ing', example: 'I look forward to seeing you.' },
      { who: 'pig', text: 'โอ้โห หลอกเนียนมาก แล้วมีคำแบบนี้อีกไหม?' },
      { who: 'buffalo', text: 'มี! be used to, object to, when it comes to', example: 'I am used to waking up early.' },
    ],
    quiz: {
      question: 'She is looking forward to ___ the scholarship results.',
      choices: ['receive', 'receiving', 'received', 'be received'],
      answer: 'receiving',
      explain: 'look forward to ตัว to เป็น preposition จึงต้องตามด้วย V-ing',
    },
  },
  {
    id: 'present-perfect',
    emoji: '⏳',
    title: 'Present Perfect: since / for',
    titleThai: 'เจอ since กับ for นึกถึง have + V3',
    color: 'from-sky-400 to-violet-500',
    lines: [
      { who: 'pig', text: 'ควายขยันอยู่ที่นี่มานานแค่ไหนแล้ว?' },
      { who: 'buffalo', text: 'อยู่มาตั้งแต่ปี 2020 พูดเป็นอังกฤษว่าแบบนี้', example: 'I have lived here since 2020.' },
      { who: 'pig', text: 'ทำไมใช้ have lived ไม่ใช่ lived เฉย ๆ ล่ะ?' },
      { who: 'buffalo', text: 'เพราะเริ่มในอดีตแล้วยังอยู่ถึงตอนนี้ไง' },
      { who: 'pig', text: 'แล้ว since กับ for ต่างกันยังไง?' },
      { who: 'buffalo', text: 'since ตามด้วยจุดเริ่มต้น for ตามด้วยช่วงเวลา', example: 'I have studied English for five years.' },
    ],
    quiz: {
      question: 'He ___ in Bangkok since he was a child.',
      choices: ['lives', 'lived', 'has lived', 'is living'],
      answer: 'has lived',
      explain: 'มี since บอกจุดเริ่มต้นที่ต่อเนื่องถึงปัจจุบัน ใช้ has + V3',
    },
  },
  {
    id: 'passive',
    emoji: '🔄',
    title: 'Passive Voice',
    titleThai: 'ประธานโดนกระทำ ใช้ be + V3',
    color: 'from-emerald-400 to-sky-500',
    lines: [
      { who: 'buffalo', text: 'หมูหวาน รายงานนี้เขียนเองหรือมีคนเขียนให้?' },
      { who: 'pig', text: 'กรรมการเขียนให้! รายงานไม่ได้ลุกขึ้นมาเขียนตัวเอง' },
      { who: 'buffalo', text: 'นั่นแหละ ประธานถูกกระทำ ต้องใช้ passive', example: 'The report was written by the committee.' },
      { who: 'pig', text: 'สูตรคือ be บวกกริยาช่องสาม จำง่ายมาก' },
      { who: 'buffalo', text: 'ถ้าเห็น by ตามหลัง เป็นสัญญาณที่ดีว่าเป็น passive' },
    ],
    quiz: {
      question: 'This bridge ___ in 1932.',
      choices: ['built', 'was built', 'has build', 'building'],
      answer: 'was built',
      explain: 'สะพานไม่ได้สร้างตัวเอง เป็นผู้ถูกกระทำในอดีต ใช้ was + V3',
    },
  },
  {
    id: 'relative',
    emoji: '🔗',
    title: 'who / which / whose',
    titleThai: 'Relative Clause แบบเข้าใจง่าย',
    color: 'from-fuchsia-500 to-indigo-500',
    lines: [
      { who: 'pig', text: 'who กับ which ใช้ต่างกันยังไงนะ?' },
      { who: 'buffalo', text: 'who ใช้กับคน which ใช้กับสิ่งของ', example: 'The teacher who helped me is kind.' },
      { who: 'pig', text: 'แล้ว whose ล่ะ?' },
      { who: 'buffalo', text: 'whose แปลว่า ของใคร ใช้บอกความเป็นเจ้าของ', example: 'The student whose bag is red is my friend.' },
      { who: 'pig', text: 'มีกับดักอะไรอีกไหม?' },
      { who: 'buffalo', text: 'ถ้ามีคอมม่าคั่นอยู่ ห้ามใช้ that เด็ดขาด!' },
    ],
    quiz: {
      question: 'My sister, ___ lives in Paris, is a doctor.',
      choices: ['that', 'which', 'who', 'whose'],
      answer: 'who',
      explain: 'sister เป็นคน และมีคอมม่าคั่น จึงใช้ who (ห้ามใช้ that)',
    },
  },
  {
    id: 'if2',
    emoji: '💭',
    title: 'If แบบสมมติ (Type 2)',
    titleThai: 'If + V2, would + V1',
    color: 'from-violet-500 to-pink-500',
    lines: [
      { who: 'pig', text: 'ถ้าหมูหวานรวย จะซื้อขนมทั้งร้านเลย!' },
      { who: 'buffalo', text: 'นี่คือเรื่องสมมติที่ไม่จริงตอนนี้ ใช้ if แบบที่สอง', example: 'If I were rich, I would buy all the snacks.' },
      { who: 'pig', text: 'เดี๋ยวนะ ทำไมใช้ I were ไม่ใช่ I was?' },
      { who: 'buffalo', text: 'ในเงื่อนไขสมมติ ข้อสอบชอบ were กับทุกประธาน' },
      { who: 'pig', text: 'สูตรคือ if กริยาช่องสอง แล้วตามด้วย would กริยาช่องหนึ่ง' },
    ],
    quiz: {
      question: 'If I ___ you, I would apply for the scholarship.',
      choices: ['am', 'was', 'were', 'be'],
      answer: 'were',
      explain: 'If แบบสมมติ ใช้ were กับทุกประธาน: If I were you...',
    },
  },
  {
    id: 'parallel',
    emoji: '🚂',
    title: 'Parallel Structure',
    titleThai: 'ของที่เชื่อมกันต้องหน้าตาเหมือนกัน',
    color: 'from-orange-400 to-yellow-400',
    lines: [
      { who: 'buffalo', text: 'ประโยคนี้ผิดตรงไหน ลองฟังดู', example: 'She likes reading, writing, and to swim.' },
      { who: 'pig', text: 'อืม ฟังแล้วสะดุดตรงท้าย ๆ' },
      { who: 'buffalo', text: 'ใช่! สองตัวแรกเป็น ing ตัวสุดท้ายก็ต้องเป็น ing ด้วย', example: 'She likes reading, writing, and swimming.' },
      { who: 'pig', text: 'เหมือนขบวนรถไฟ ทุกตู้ต้องเป็นแบบเดียวกัน!' },
      { who: 'buffalo', text: 'เจอ and, or, but ให้เช็กหน้าตาคำสองฝั่งเสมอ' },
    ],
    quiz: {
      question: 'The job requires patience, creativity, and ___.',
      choices: ['work hard', 'hard-working', 'to work hard', 'hard work'],
      answer: 'hard work',
      explain: 'patience กับ creativity เป็นคำนาม ตัวที่สามก็ต้องเป็นคำนาม: hard work',
    },
  },
  {
    id: 'main-idea',
    emoji: '📖',
    title: 'หา Main Idea ให้ไว',
    titleThai: 'เทคนิค Reading ที่ใช้ได้จริง',
    color: 'from-teal-400 to-emerald-500',
    lines: [
      { who: 'pig', text: 'บทความยาวมาก อ่านไม่ทันเลยควายขยัน' },
      { who: 'buffalo', text: 'ไม่ต้องอ่านทุกคำ อ่านประโยคแรกกับประโยคสุดท้ายของย่อหน้าก่อน' },
      { who: 'buffalo', text: 'ใจความหลักมักซ่อนอยู่ตรงนั้น', example: 'The main idea is usually in the topic sentence.' },
      { who: 'pig', text: 'แล้วถ้าเจอคำว่า however ล่ะ?' },
      { who: 'buffalo', text: 'however แปลว่าเรื่องกำลังจะหักมุม ให้อ่านส่วนหลังให้ดี' },
      { who: 'pig', text: 'สรุป: อ่านหัวท้าย ดูคำเชื่อม แล้วค่อยตอบ!' },
    ],
    quiz: {
      question: 'Where is the main idea of a paragraph usually found?',
      choices: ['In the middle', 'In the first or last sentence', 'In the longest word', 'In the title only'],
      answer: 'In the first or last sentence',
      explain: 'ใจความหลักมักอยู่ประโยคแรก (topic sentence) หรือประโยคสรุปท้ายย่อหน้า',
    },
  },
  {
    id: 'not-except',
    emoji: '🚫',
    title: 'กับดัก NOT / EXCEPT',
    titleThai: 'คำถามกลับด้านที่คนพลาดบ่อย',
    color: 'from-rose-500 to-orange-400',
    lines: [
      { who: 'buffalo', text: 'หมูหวาน ระวังคำถามแบบนี้นะ', example: 'Which of the following is NOT mentioned?' },
      { who: 'pig', text: 'อ้าว หมูหวานเผลอหาข้อที่มีในบทความทุกที!' },
      { who: 'buffalo', text: 'นั่นแหละกับดัก ต้องหาข้อที่ไม่มีต่างหาก' },
      { who: 'pig', text: 'ต่อไปเห็น NOT หรือ EXCEPT จะวงไว้ก่อนเลย!' },
      { who: 'buffalo', text: 'ดีมาก แล้วตัดช้อยส์ที่เจอในบทความทิ้งทีละข้อ' },
    ],
    quiz: {
      question: 'เจอคำถาม "All of the following are true EXCEPT" ควรหาอะไร?',
      choices: ['ข้อที่จริง', 'ข้อที่ไม่จริง', 'ข้อที่ยาวที่สุด', 'ข้อแรกเสมอ'],
      answer: 'ข้อที่ไม่จริง',
      explain: 'EXCEPT แปลว่า ยกเว้น จึงต้องหาข้อเดียวที่ไม่จริง',
    },
  },
  {
    id: 'time',
    emoji: '⏱️',
    title: 'บริหารเวลาในห้องสอบ',
    titleThai: '60 ข้อ 60 นาที ทำยังไงให้ทัน',
    color: 'from-indigo-500 to-sky-400',
    lines: [
      { who: 'pig', text: 'ข้อสอบหกสิบข้อ หกสิบนาที หมูหวานกลัวไม่ทัน!' },
      { who: 'buffalo', text: 'แบ่งเวลาแบบนี้ Grammar ข้อละประมาณสี่สิบวินาที' },
      { who: 'buffalo', text: 'เก็บเวลาที่เหลือไว้ให้ Reading ซึ่งต้องอ่านเยอะกว่า' },
      { who: 'pig', text: 'แล้วถ้าเจอข้อยากมาก ๆ ล่ะ?' },
      { who: 'buffalo', text: 'ข้ามไปก่อน! อย่าจมกับข้อเดียวเกินหนึ่งนาทีครึ่ง', example: 'Skip it, mark it, and come back later.' },
      { who: 'pig', text: 'ข้อไหนไม่รู้จริง ๆ ห้ามเว้นว่าง ตัดช้อยส์แล้วเดาอย่างมีหลักการ!' },
    ],
    quiz: {
      question: 'เจอข้อที่ยากมากระหว่างสอบ ควรทำอย่างไร?',
      choices: ['คิดจนกว่าจะได้', 'ข้ามไปก่อนแล้วค่อยกลับมา', 'ปล่อยว่างไว้เลย', 'ส่งข้อสอบทันที'],
      answer: 'ข้ามไปก่อนแล้วค่อยกลับมา',
      explain: 'ข้ามข้อยากไปก่อนเพื่อเก็บคะแนนข้อง่าย แล้วค่อยกลับมาทำ',
    },
  },
]

export function getDuoLesson(id) {
  return duoLessons.find((lesson) => lesson.id === id) || duoLessons[0]
}

// Short things the teachers say when you tap them.
export const pokeLines = {
  pig: [
    'อุ๊ย จั๊กจี้! มาเรียนกันเถอะ',
    'หมูหวานพร้อมสอนแล้ว ฟังกันนะ!',
    'Practice makes perfect!',
    'เรียนวันละนิด เดี๋ยวคะแนนพุ่งเอง',
  ],
  buffalo: [
    'ใครว่าควายโง่ ควายตัวนี้สอบได้ทุนนะ!',
    'ใจเย็น ๆ อ่านโจทย์ให้ครบก่อนตอบ',
    'Slow and steady wins the race.',
    'ข้อผิดคือครูที่ดีที่สุด',
  ],
}

export const praiseLines = ['เก่งมาก! ถูกต้องเลย', 'สุดยอด! Excellent!', 'เยี่ยมไปเลย! Great job!']
export const encourageLines = ['ไม่เป็นไรนะ ฟังเฉลยแล้วจำไว้', 'เกือบแล้ว! ลองดูเฉลยกัน', 'ผิดวันนี้ ดีกว่าผิดในห้องสอบ!']
