// Original practice sets in the style of well-known international English tests.
// Formats are modelled on TOEIC, TOEFL ITP, IELTS and common Thai entrance exams;
// every sentence, passage and choice was written for this project.
//
// Error-identification sentences mark the four underlined parts as [[A|text]].

export const intlTests = [
  {
    id: 'toeic-p5',
    emoji: '💼',
    title: 'Incomplete Sentences',
    style: 'แนว TOEIC Part 5',
    titleThai: 'เติมคำในประโยคภาษาอังกฤษเชิงธุรกิจ',
    color: 'from-sky-500 to-indigo-500',
    minutes: 6,
    coach: [
      { who: 'buffalo', text: 'ข้อสอบแนวนี้วัด grammar กับคำศัพท์ในที่ทำงาน' },
      { who: 'pig', text: 'อ่านคำรอบช่องว่างก่อน แล้วถามตัวเองว่าช่องนี้ต้องการคำชนิดไหน' },
    ],
    questions: [
      { id: 'tp5-01', question: 'The quarterly report must be submitted ___ Friday at the latest.', choices: ['by', 'until', 'since', 'during'], answer: 'by', explain: 'by = ภายในเวลานั้น ใช้กับกำหนดส่ง ส่วน until ใช้กับการกระทำที่ต่อเนื่องไปจนถึงเวลานั้น' },
      { id: 'tp5-02', question: 'Ms. Lee asked her assistant to make ___ the conference room was ready before 9 a.m.', choices: ['sure', 'certain of', 'confident', 'secure'], answer: 'sure', explain: 'make sure (that) + ประโยค = ทำให้แน่ใจว่า เป็นสำนวนตายตัว' },
      { id: 'tp5-03', question: 'All employees are required to wear their ID badges ___ in the building.', choices: ['while', 'during', 'for', 'among'], answer: 'while', explain: 'while (they are) in the building ละ they are ได้ ส่วน during ต้องตามด้วยคำนาม เช่น during the meeting' },
      { id: 'tp5-04', question: 'The new software will allow our team to process orders more ___.', choices: ['efficient', 'efficiency', 'efficiently', 'efficiencies'], answer: 'efficiently', explain: 'ช่องว่างขยายกริยา process จึงต้องเป็นคำกริยาวิเศษณ์ (adverb) ที่ลงท้าย -ly' },
      { id: 'tp5-05', question: 'Neither the manager nor the employees ___ aware of the schedule change.', choices: ['was', 'were', 'is', 'has been'], answer: 'were', explain: 'neither ... nor ให้กริยาตามประธานตัวที่อยู่ใกล้ที่สุด คือ the employees (พหูพจน์) จึงใช้ were' },
      { id: 'tp5-06', question: 'If the shipment ___ on time, we would not have missed the deadline.', choices: ['arrived', 'had arrived', 'has arrived', 'would arrive'], answer: 'had arrived', explain: 'ส่วนหลังเป็น would not have + V3 คือ If แบบที่ 3 (สมมติเรื่องในอดีต) ส่วน if จึงต้องเป็น had + V3' },
      { id: 'tp5-07', question: 'The hotel offers a free breakfast to ___ guests who stay more than two nights.', choices: ['every', 'each', 'all', 'much'], answer: 'all', explain: 'guests เป็นพหูพจน์ ใช้ all ได้ ส่วน every และ each ต้องตามด้วยนามเอกพจน์ และ much ใช้กับนามนับไม่ได้' },
      { id: 'tp5-08', question: 'Applicants should submit a résumé ___ two letters of recommendation.', choices: ['along with', 'as well', 'besides of', 'in addition'], answer: 'along with', explain: 'along with + คำนาม = พร้อมกับ ส่วน in addition ต้องเป็น in addition to และ besides ไม่ต้องมี of' },
      { id: 'tp5-09', question: 'The marketing director is responsible ___ approving all advertising materials.', choices: ['to', 'of', 'for', 'with'], answer: 'for', explain: 'be responsible for + V-ing/คำนาม เป็นคู่คำ (collocation) ที่ออกสอบบ่อย' },
      { id: 'tp5-10', question: 'Despite ___ a smaller budget, the team completed the project successfully.', choices: ['have', 'having', 'had', 'to have'], answer: 'having', explain: 'despite เป็นบุพบท จึงตามด้วยคำนามหรือ V-ing' },
      { id: 'tp5-11', question: 'Our customer service center is open ___ Monday to Saturday.', choices: ['between', 'at', 'from', 'on'], answer: 'from', explain: 'from ... to ... = ตั้งแต่ ... ถึง ... ถ้าใช้ between ต้องคู่กับ and' },
      { id: 'tp5-12', question: 'The board has not yet decided ___ to expand into the Asian market.', choices: ['whether', 'if', 'that', 'what'], answer: 'whether', explain: 'decide whether to + V1 = ตัดสินใจว่าจะ...หรือไม่ ใช้ if แทนไม่ได้เมื่อตามด้วย to-infinitive' },
    ],
  },
  {
    id: 'toefl-error',
    emoji: '🔎',
    title: 'Error Identification',
    style: 'แนว TOEFL ITP',
    titleThai: 'หาจุดผิดในประโยค',
    color: 'from-rose-500 to-orange-400',
    minutes: 6,
    keepOrder: true,
    coach: [
      { who: 'buffalo', text: 'ประโยคนี้มีส่วนที่ขีดเส้นใต้สี่จุด และมีจุดผิดแค่จุดเดียว' },
      { who: 'pig', text: 'เช็กสามเรื่องก่อนเสมอ ประธานกับกริยา รูปคำ และคำที่ต้องเข้าคู่กัน' },
    ],
    questions: [
      { id: 'te-01', question: '[[A|The number of]] students who [[B|apply for]] the scholarship [[C|have increased]] steadily [[D|over the past]] five years.', answer: 'C', explain: 'the number of ... เป็นประธานเอกพจน์ ต้องใช้ has increased (ต่างจาก a number of ที่เป็นพหูพจน์)' },
      { id: 'te-02', question: 'The professor, [[A|along with]] her students, [[B|are planning]] [[C|a research trip]] to Chiang Mai [[D|next month]].', answer: 'B', explain: 'ประธานจริงคือ The professor (เอกพจน์) ส่วน along with her students เป็นแค่วลีแทรก จึงต้องใช้ is planning' },
      { id: 'te-03', question: 'Rice [[A|is]] one of [[B|the most important]] [[C|crop]] [[D|in]] Southeast Asia.', answer: 'C', explain: 'one of the ... ต้องตามด้วยนามพหูพจน์เสมอ จึงต้องเป็น crops' },
      { id: 'te-04', question: 'She [[A|has lived]] in Bangkok [[B|since]] five years and [[C|speaks]] Thai [[D|fluently]].', answer: 'B', explain: 'five years เป็นช่วงเวลา ต้องใช้ for ส่วน since ใช้กับจุดเริ่มต้น เช่น since 2020' },
      { id: 'te-05', question: 'The library [[A|is closed]] on Sundays, so students [[B|who want]] to study [[C|must to go]] to the café [[D|nearby]].', answer: 'C', explain: 'หลัง modal verb (must, can, should) ใช้กริยาช่องหนึ่งโดยไม่มี to จึงต้องเป็น must go' },
      { id: 'te-06', question: '[[A|Although]] the weather was bad, [[B|but]] the festival [[C|continued]] [[D|as planned]].', answer: 'B', explain: 'although กับ but ใช้คู่กันในประโยคเดียวไม่ได้ ต้องเลือกใช้คำใดคำหนึ่ง' },
      { id: 'te-07', question: 'Water [[A|boils]] at 100 degrees Celsius and [[B|freezing]] [[C|at]] zero [[D|degrees]].', answer: 'B', explain: 'and เชื่อมกริยาสองตัวที่ต้องมีรูปเดียวกัน (parallel structure) คือ boils ... and freezes' },
      { id: 'te-08', question: 'The report [[A|that]] [[B|was written]] by the committee [[C|were]] [[D|very detailed]].', answer: 'C', explain: 'ประธานคือ The report (เอกพจน์) ส่วน that was written by the committee เป็นส่วนขยาย จึงต้องใช้ was' },
      { id: 'te-09', question: 'Many people [[A|believe]] that [[B|learning]] a second language is [[C|more easier]] [[D|in]] childhood.', answer: 'C', explain: 'easier เป็นขั้นกว่าอยู่แล้ว จะเติม more ซ้ำอีกไม่ได้' },
      { id: 'te-10', question: 'The museum, [[A|which]] opened in 1998, [[B|attract]] thousands of [[C|visitors]] [[D|every]] year.', answer: 'B', explain: 'ประธาน The museum เป็นเอกพจน์และพูดถึงความจริงทั่วไป จึงต้องใช้ attracts' },
    ],
  },
  {
    id: 'ielts-tfng',
    emoji: '🚲',
    title: 'True / False / Not Given',
    style: 'แนว IELTS Reading',
    titleThai: 'อ่านแล้วตัดสินว่าข้อความจริง เท็จ หรือไม่ได้กล่าวถึง',
    color: 'from-emerald-500 to-teal-500',
    minutes: 8,
    keepOrder: true,
    passageTitle: 'The Return of the Bicycle',
    passage: `In the 1970s, bicycles were the most common form of transport in many Asian cities. As incomes rose, however, millions of people switched to motorcycles and cars, and by the early 2000s cycling had almost disappeared from city streets. Recently, the trend has begun to reverse. In several large cities, local governments have built protected bicycle lanes and introduced bike-sharing schemes, which allow residents to rent a bicycle for a short trip using a mobile phone.

Supporters argue that cycling reduces traffic congestion and air pollution. A survey carried out in one city found that 40 percent of bike-share users had previously made the same journey by car or taxi. Critics, on the other hand, point out that hot weather and heavy rain make cycling unpleasant for much of the year. They also note that some bike-sharing companies expanded too quickly: thousands of unused bicycles were left piled on pavements, and several companies went out of business.

Despite these problems, city planners remain optimistic. They believe that, with better lanes and more shade from trees, cycling could once again become a normal part of daily life.`,
    coach: [
      { who: 'buffalo', text: 'TRUE คือบทความพูดตรงกัน FALSE คือบทความพูดขัดกัน' },
      { who: 'pig', text: 'ส่วน NOT GIVEN คือบทความไม่ได้พูดถึงเลย ห้ามเดาจากความรู้ของเราเองนะ' },
    ],
    questions: [
      { id: 'tf-01', question: 'In the 1970s, bicycles were widely used in many Asian cities.', choices: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explain: 'บทความบอกว่า bicycles were the most common form of transport ตรงกับข้อความ' },
      { id: 'tf-02', question: 'Cycling became more popular as people’s incomes increased.', choices: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explain: 'บทความบอกว่าเมื่อรายได้เพิ่ม คนเปลี่ยนไปใช้มอเตอร์ไซค์และรถยนต์ การปั่นจักรยานจึงลดลง ขัดกับข้อความ' },
      { id: 'tf-03', question: 'Bike-sharing schemes let people rent bicycles with a mobile phone.', choices: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explain: 'บทความเขียนว่า rent a bicycle for a short trip using a mobile phone' },
      { id: 'tf-04', question: 'All of the bike-share users in the survey used to travel by car or taxi.', choices: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explain: 'ผลสำรวจบอกแค่ 40 เปอร์เซ็นต์ ไม่ใช่ทั้งหมด ระวังคำว่า All ในโจทย์' },
      { id: 'tf-05', question: 'Using a shared bicycle is cheaper than taking a bus.', choices: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'NOT GIVEN', explain: 'บทความไม่ได้พูดถึงราคาเลย จึงตอบ NOT GIVEN' },
      { id: 'tf-06', question: 'Some bike-sharing companies closed down.', choices: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explain: 'several companies went out of business แปลว่าบางบริษัทปิดกิจการ ความหมายตรงกัน แม้ใช้คำต่างกัน' },
      { id: 'tf-07', question: 'City planners think more trees could help to encourage cycling.', choices: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explain: 'บทความบอกว่า with ... more shade from trees, cycling could become normal again' },
      { id: 'tf-08', question: 'The government plans to ban cars from city centres.', choices: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'NOT GIVEN', explain: 'ไม่มีส่วนไหนพูดถึงการห้ามรถยนต์ จึงตอบ NOT GIVEN' },
    ],
  },
  {
    id: 'vocab-context',
    emoji: '🧠',
    title: 'Vocabulary in Context',
    style: 'แนว TOEFL / ข้อสอบเข้ามหาวิทยาลัย',
    titleThai: 'เดาความหมายศัพท์วิชาการจากบริบท',
    color: 'from-violet-500 to-fuchsia-500',
    minutes: 5,
    coach: [
      { who: 'pig', text: 'ถ้าไม่รู้ความหมาย ให้ดูคำรอบ ๆ ว่าประโยคเป็นบวกหรือลบ' },
      { who: 'buffalo', text: 'แล้วลองแทนคำตอบลงไปในประโยค ข้อไหนอ่านแล้วความหมายลงตัวที่สุด ข้อนั้นแหละ' },
    ],
    questions: [
      { id: 'vc-01', question: 'The new policy had a substantial impact on student enrollment.\n“substantial” is closest in meaning to ___.', choices: ['large', 'small', 'temporary', 'hidden'], answer: 'large', explain: 'substantial = มาก, สำคัญ ผลกระทบที่ substantial คือผลกระทบขนาดใหญ่' },
      { id: 'vc-02', question: 'Scientists are trying to mitigate the effects of climate change.\n“mitigate” is closest in meaning to ___.', choices: ['reduce', 'study', 'increase', 'ignore'], answer: 'reduce', explain: 'mitigate = บรรเทา ลดความรุนแรง ผลของ climate change เป็นเรื่องลบ จึงต้องการลดลง' },
      { id: 'vc-03', question: 'The plan was rejected because it was not feasible.\n“feasible” is closest in meaning to ___.', choices: ['possible', 'popular', 'expensive', 'legal'], answer: 'possible', explain: 'feasible = ทำได้จริง แผนที่ทำไม่ได้จริงจึงถูกปฏิเสธ' },
      { id: 'vc-04', question: 'Her instructions were so ambiguous that nobody knew what to do.\n“ambiguous” is closest in meaning to ___.', choices: ['unclear', 'rude', 'short', 'detailed'], answer: 'unclear', explain: 'ส่วนหลัง nobody knew what to do บอกใบ้ว่าคำสั่งไม่ชัดเจน ambiguous = กำกวม' },
      { id: 'vc-05', question: 'The company decided to allocate more money to research.\n“allocate” is closest in meaning to ___.', choices: ['assign', 'borrow', 'save', 'lose'], answer: 'assign', explain: 'allocate = จัดสรร แบ่งให้ใช้เพื่อจุดประสงค์หนึ่ง ใกล้กับ assign' },
      { id: 'vc-06', question: 'The results of the two experiments were consistent with each other.\n“consistent” is closest in meaning to ___.', choices: ['in agreement', 'surprising', 'incorrect', 'unrelated'], answer: 'in agreement', explain: 'consistent with = สอดคล้องกัน ผลการทดลองตรงกัน' },
      { id: 'vc-07', question: 'Smoking is prohibited anywhere inside the building.\n“prohibited” is closest in meaning to ___.', choices: ['not allowed', 'encouraged', 'common', 'expensive'], answer: 'not allowed', explain: 'prohibited = ถูกห้าม เห็นบ่อยในป้ายประกาศ' },
      { id: 'vc-08', question: 'The professor emphasized the importance of reading every day.\n“emphasized” is closest in meaning to ___.', choices: ['stressed', 'doubted', 'forgot', 'questioned'], answer: 'stressed', explain: 'emphasize = เน้นย้ำ ตรงกับ stress ที่แปลว่าเน้น (ไม่ใช่เครียด)' },
      { id: 'vc-09', question: 'Many coral species are vulnerable to small changes in water temperature.\n“vulnerable to” is closest in meaning to ___.', choices: ['easily harmed by', 'protected from', 'unaware of', 'used to'], answer: 'easily harmed by', explain: 'vulnerable = เปราะบาง ได้รับอันตรายง่าย' },
      { id: 'vc-10', question: 'The evidence was insufficient to prove that he had cheated.\n“insufficient” is closest in meaning to ___.', choices: ['not enough', 'very strong', 'brand new', 'false'], answer: 'not enough', explain: 'in- = ไม่ + sufficient = เพียงพอ จึงแปลว่าไม่เพียงพอ แยกส่วนคำช่วยเดาได้' },
    ],
  },
  {
    id: 'conversation',
    emoji: '💬',
    title: 'Best Response',
    style: 'แนวบทสนทนาในข้อสอบเข้ามหาวิทยาลัย',
    titleThai: 'เลือกคำตอบที่เหมาะกับบทสนทนา',
    color: 'from-amber-400 to-pink-500',
    minutes: 5,
    coach: [
      { who: 'pig', text: 'ข้อสอบบทสนทนาไม่ได้วัดแค่ grammar แต่วัดว่าตอบตรงสถานการณ์ไหม' },
      { who: 'buffalo', text: 'ฟังคำถามให้ดีว่าเขาขออนุญาต ขอบคุณ หรือถามข้อมูล แล้วค่อยเลือกคำตอบ' },
    ],
    questions: [
      { id: 'cv-01', question: 'A: Would you mind if I opened the window?\nB: ___', choices: ['Not at all. Go ahead.', 'Yes, please open it.', 'I’m fine, thank you.', 'You’re welcome.'], answer: 'Not at all. Go ahead.', explain: 'Would you mind ...? แปลว่า คุณรังเกียจไหม ถ้าอนุญาตต้องตอบว่า Not at all (ไม่รังเกียจเลย) ตอบ Yes จะแปลว่ารังเกียจ' },
      { id: 'cv-02', question: 'A: How long have you been studying English?\nB: ___', choices: ['For about six years.', 'Since six years.', 'Very long ago.', 'I study every day.'], answer: 'For about six years.', explain: 'How long ถามระยะเวลา ตอบด้วย for + ช่วงเวลา ส่วน since ต้องตามด้วยจุดเริ่มต้น' },
      { id: 'cv-03', question: 'A: I’m sorry I’m late. The traffic was terrible.\nB: ___', choices: ['That’s all right. We’ve just started.', 'You’re welcome.', 'Congratulations!', 'Me too, thank you.'], answer: 'That’s all right. We’ve just started.', explain: 'เมื่อมีคนขอโทษ ตอบ That’s all right / No problem ส่วน You’re welcome ใช้ตอบคำขอบคุณ' },
      { id: 'cv-04', question: 'A: Could you tell me where the library is?\nB: ___', choices: ['Sure. It’s next to the cafeteria.', 'Yes, I could.', 'It’s open until eight.', 'I like reading books.'], answer: 'Sure. It’s next to the cafeteria.', explain: 'Could you ...? เป็นการขอร้องอย่างสุภาพ ต้องให้ข้อมูลที่ถาม ไม่ใช่ตอบแค่ว่าทำได้' },
      { id: 'cv-05', question: 'A: I passed the scholarship interview!\nB: ___', choices: ['Congratulations! You must be thrilled.', 'Never mind. Better luck next time.', 'That’s too bad.', 'I’m afraid not.'], answer: 'Congratulations! You must be thrilled.', explain: 'เป็นข่าวดี จึงแสดงความยินดี ตัวเลือกอื่นใช้กับข่าวร้าย' },
      { id: 'cv-06', question: 'A: Shall we meet at seven tomorrow?\nB: ___', choices: ['That sounds good to me.', 'Yes, we met.', 'It was fun.', 'I met him yesterday.'], answer: 'That sounds good to me.', explain: 'Shall we ...? เป็นการชวน ตอบรับด้วย That sounds good / Sure ตัวเลือกอื่นใช้ tense อดีตซึ่งไม่ตรงกับนัดพรุ่งนี้' },
      { id: 'cv-07', question: 'A: Do you know what time the exam starts?\nB: ___', choices: ['I’m not sure. Let me check the schedule.', 'Yes, I do it.', 'It started last week.', 'The exam is very difficult.'], answer: 'I’m not sure. Let me check the schedule.', explain: 'คำถามต้องการรู้เวลา ถ้าไม่รู้ก็บอกว่าไม่แน่ใจและจะเช็กให้ ตอบตรงประเด็นที่สุด' },
      { id: 'cv-08', question: 'A: Thank you so much for your help.\nB: ___', choices: ['It was my pleasure.', 'Never mind.', 'Yes, I helped.', 'Help yourself.'], answer: 'It was my pleasure.', explain: 'ตอบคำขอบคุณด้วย It was my pleasure / You’re welcome คนไทยมักใช้ Never mind ผิด เพราะ Never mind แปลว่า ช่างมันเถอะ' },
      { id: 'cv-09', question: 'A: What do you do?\nB: ___', choices: ['I’m a university student.', 'I’m doing my homework.', 'I’m fine, thanks.', 'I do it well.'], answer: 'I’m a university student.', explain: 'What do you do? ถามอาชีพหรือสถานะ ไม่ได้ถามว่ากำลังทำอะไร (What are you doing?)' },
      { id: 'cv-10', question: 'A: Can I borrow your pen for a moment?\nB: ___', choices: ['Sure, here you are.', 'Yes, you borrow.', 'No, thanks.', 'I’d like to.'], answer: 'Sure, here you are.', explain: 'เวลายื่นของให้ใช้ Here you are / Here you go ส่วน No, thanks ใช้ปฏิเสธเวลามีคนเสนอของให้' },
    ],
  },
]

export function getIntlTest(id) {
  return intlTests.find((test) => test.id === id) || null
}

/** Parse "[[A|text]]" markers into parts for rendering. */
export function parseMarked(sentence) {
  const parts = []
  const re = /\[\[([A-D])\|([^\]]+)\]\]/g
  let last = 0
  let match
  while ((match = re.exec(sentence)) !== null) {
    if (match.index > last) parts.push({ text: sentence.slice(last, match.index) })
    parts.push({ label: match[1], text: match[2] })
    last = re.lastIndex
  }
  if (last < sentence.length) parts.push({ text: sentence.slice(last) })
  return parts
}

/** Error-identification questions get choices built from their marked parts. */
export function getChoices(question) {
  if (question.choices) return question.choices
  return parseMarked(question.question).filter((p) => p.label).map((p) => p.label)
}

export function getPlainQuestion(question) {
  return parseMarked(question.question).map((p) => p.text).join('')
}
