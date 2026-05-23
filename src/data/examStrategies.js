export const examStrategies = [
  { id: '60-minute-plan', title: '60-minute exam plan', titleThai: 'แผนทำข้อสอบ 60 นาที', stepsThai: ['Grammar รอบแรก 22-25 นาที', 'Reading 30-32 นาที', 'ทวนข้อที่ทำเครื่องหมาย 3-5 นาที'], tipThai: 'อย่าให้ข้อ grammar ยากหนึ่งข้อกินเวลา reading' },
  { id: 'grammar-cloze', title: 'Grammar cloze strategy', titleThai: 'กลยุทธ์ grammar cloze', stepsThai: ['อ่านก่อนและหลังช่องว่าง', 'ระบุชนิดคำ', 'ดู signal word', 'ตัดตัวเลือกผิด grammar', 'เลือกจากความหมายที่เหลือ'], tipThai: 'POS -> Signal -> Eliminate -> Meaning' },
  { id: 'reading-passage', title: 'Reading passage strategy', titleThai: 'กลยุทธ์ reading passage', stepsThai: ['อ่านคำถามก่อนแบบเร็ว', 'อ่าน topic sentence', 'scan keyword', 'ตอบจาก evidence'], tipThai: 'อย่าตอบจากความรู้ส่วนตัวถ้า passage ไม่ได้บอก' },
  { id: 'review-mistakes', title: 'How to review mistakes', titleThai: 'วิธีทวนข้อผิด', stepsThai: ['บันทึก skillTag', 'เขียนเหตุผลที่ผิด', 'ทบทวนบทเรียนที่เกี่ยวข้อง', 'ทำ drill ซ้ำ'], tipThai: 'ข้อผิดซ้ำคือแผนที่บอกว่าควรเรียนอะไรต่อ' },
  { id: 'track-weak-skills', title: 'How to track weak skills', titleThai: 'ติดตามจุดอ่อน', stepsThai: ['ดู Results', 'จัดกลุ่ม grammar/reading', 'เลือก 2 skill ต่อรอบ', 'วัดคะแนนหลังฝึก'], tipThai: 'แก้ทีละ skill จะเห็นผลเร็วกว่าฝึกแบบกระจาย' },
  { id: 'elimination', title: 'How to use elimination', titleThai: 'การตัดตัวเลือก', stepsThai: ['ตัดผิดชนิดคำ', 'ตัดผิด tense/agreement', 'ตัดผิด logic', 'เทียบตัวเลือกที่เหลือกับบริบท'], tipThai: 'ไม่ต้องรู้คำตอบทันที แค่ตัดให้เหลือ 2 ตัวก่อนก็เพิ่มโอกาสมาก' },
  { id: 'avoid-overthinking', title: 'How to avoid overthinking', titleThai: 'ไม่คิดวนเกินไป', stepsThai: ['ตั้งเวลา 60-75 วินาทีต่อข้อยาก', 'ทำเครื่องหมายไว้', 'ไปข้อถัดไป', 'กลับมาด้วยมุมมองใหม่'], tipThai: 'คำตอบที่ถูกมักมีหลักฐาน grammar หรือ passage ชัดเจน' },
  { id: 'time-allocation', title: 'Time allocation', titleThai: 'การแบ่งเวลา', stepsThai: ['Grammar เฉลี่ยไม่เกิน 45-50 วินาทีต่อข้อ', 'Reading เฉลี่ย passage ละ 5 นาที', 'เหลือเวลาทวน'], tipThai: 'ดูนาฬิกาทุก 10-15 ข้อ' },
  { id: 'score-improvement', title: 'Score improvement plan', titleThai: 'แผนเพิ่มคะแนน', stepsThai: ['ทำ mock exam', 'วิเคราะห์ weak skills', 'เรียนบทที่เกี่ยวข้อง', 'ทำ drill', 'สอบซ้ำหลัง 2-3 วัน'], tipThai: 'อย่าสอบซ้ำทันทีโดยไม่ทวน เพราะจะผิด pattern เดิม' },
  { id: '7-day-plan', title: '7-day study plan', titleThai: 'แผน 7 วัน', stepsThai: ['วัน 1 diagnostic', 'วัน 2-4 grammar weak skills', 'วัน 5 reading strategies', 'วัน 6 full mock', 'วัน 7 review'], tipThai: 'เหมาะกับรอบเร่งด่วน' },
  { id: '14-day-plan', title: '14-day study plan', titleThai: 'แผน 14 วัน', stepsThai: ['สลับ grammar กับ reading', 'ทำ drill ทุกวัน', 'mock exam 3 ครั้ง', 'ทวน error log'], tipThai: 'มีเวลาพอให้เห็นคะแนนขยับถ้าทวนข้อผิดจริงจัง' },
  { id: '30-day-plan', title: '30-day study plan', titleThai: 'แผน 30 วัน', stepsThai: ['ปู grammar 20 หมวด', 'อ่าน strategy 10 แบบ', 'สะสม vocabulary', 'mock สัปดาห์ละ 2 ครั้ง', 'ทวน weak skills รายสัปดาห์'], tipThai: 'เหมาะกับการสร้างพื้นฐานจริง ไม่ใช่แค่จำเทคนิค' },
]

export default examStrategies

