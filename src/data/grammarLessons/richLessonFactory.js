export function createRichLesson(config) {
  return {
    status: 'available',
    estimatedStudyMinutes: config.estimatedStudyMinutes || 35,
    eliminationStrategiesThai: config.eliminationStrategiesThai || [
      'อ่านคำหน้าและคำหลังช่องว่างก่อน อย่าเลือกจากความคุ้นหูอย่างเดียว',
      'ตัดตัวเลือกที่ผิดชนิดคำก่อน เช่น ต้องการ verb แต่ตัวเลือกเป็น noun',
      'ตรวจ subject, tense, pronoun, และ preposition pattern ทีละจุด',
      'มองหาคำสัญญาณ เช่น if, than, by, although, each, every, said that',
      'ถ้าเหลือ 2 ตัวเลือก ให้เทียบกับโครงสร้างทั้งประโยค ไม่ใช่แค่คำใกล้ช่องว่าง',
      'ระวังตัวล่อที่แปลไทยได้ แต่ผิดไวยากรณ์อังกฤษ',
    ],
    relatedExamLookupNoteThai: 'ระบบจะดึงข้อสอบจริงในแอปที่มี skillTag ตรงกับบทเรียนนี้มาให้ฝึกต่อท้ายใน Drill',
    ...config,
  }
}

export const makeExample = (sentence, translationThai, noteThai) => ({
  sentence,
  translationThai,
  noteThai,
})

export const makeWrong = (sentence, correction, whyWrongThai) => ({
  sentence,
  correction,
  whyWrongThai,
})

