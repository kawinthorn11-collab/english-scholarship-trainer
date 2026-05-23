const moodMessages = {
  starter: [
    'วันนี้ยังไม่เริ่มก็ไม่เป็นไร เปิดแอปแล้วถือว่าชนะหมอน 1-0',
    'เริ่มจาก 5 นาทีก่อนตัวแม่ เดี๋ยวสมองค่อยติดเทอร์โบเอง',
    'โจทย์ยากไม่ได้แปลว่าเราแพ้ แปลว่ามันยังไม่รู้จักเรา',
  ],
  focused: [
    'วันนี้อ่านแล้วนะตัวแม่ สมองเริ่มติดเทอร์โบแล้ว',
    'อ่านครบ 30 นาทีแล้ว ถือว่าใจสู้กว่าคนที่เปิดหนังสือแล้วหลับใส่',
    'ค่อย ๆ เก็บ grammar ทีละก้อน เดี๋ยวคะแนนมันหาที่ลงเอง',
  ],
  sleepy: [
    'ถ้าง่วงให้ลดความเร็ว แต่ห้ามลดความฝันนะลูก',
    'วันนี้สมองอาจจะเหมือน Wi-Fi หนึ่งขีด แต่หนึ่งขีดก็ยังโหลดความรู้ได้',
    'อ่านน้อยยังดีกว่าไม่อ่าน ผิดวันนี้ดีกว่าไปงงในห้องสอบ',
  ],
  comeback: [
    'กลับมาแล้วถือว่าชนะ ความสม่ำเสมอไม่ต้องหล่อ แค่กลับมาก็พอ',
    'หายไปแป๊บเดียวไม่เป็นไร ตัวแม่รีสตาร์ตได้เสมอ',
    'เริ่มใหม่ไม่ใช่แพ้ แต่คือกด continue แบบคนมีแผน',
  ],
  examReady: [
    'คะแนนเริ่มสวยแล้วนะ เตรียมเดินเข้าห้องสอบแบบมีแสงหลังได้เลย',
    'ทำข้อสอบครบแล้ว สมองเริ่มจำทางหนีช้อยส์หลอกได้',
    'ถ้าโจทย์จะหลอกเรา มันต้องซ้อมหนักกว่านี้แล้วล่ะ',
  ],
  weakSkillRepair: [
    'Preposition ยังแสบอยู่ แต่ไม่ต้องกลัว เดี๋ยวเราจับมันเข้าคุก grammar เอง',
    'Subject-verb agreement คือคู่รักระยะไกล อยู่ไกลแค่ไหนก็ต้องเข้ากัน',
    'เจอ weak skill แล้วดีนะ อย่างน้อยเรารู้แล้วว่าตัวร้ายอยู่ห้องไหน',
  ],
  streakFire: [
    'สตรีคมาแล้ว ตัวแม่ติดไฟแบบไม่ต้องพึ่งกาแฟ',
    'เรียนต่อเนื่องแบบนี้ คะแนนต้องเริ่มเกรงใจแล้ว',
    'วินัยวันนี้คือคะแนนพรุ่งนี้ จดไว้บนหน้าผากข้อสอบได้เลย',
  ],
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)]
}

export function getCoachMood(stats) {
  if (!stats.lastStudiedAt) return 'starter'
  if ((stats.streakDays || 0) >= 3) return 'streakFire'
  if ((stats.examsCompleted || 0) >= 2 && (stats.correctAnswers || 0) > 0) return 'examReady'
  if (Object.keys(stats.weakSkillCounts || {}).length > 0) return 'weakSkillRepair'
  if ((stats.todayStudySeconds || 0) >= 30 * 60) return 'focused'
  if ((stats.todayStudySeconds || 0) === 0) return 'sleepy'
  return 'focused'
}

export function getComicCoachMessage(stats) {
  const mood = getCoachMood(stats)
  return {
    mood,
    text: pick(moodMessages[mood] || moodMessages.starter),
  }
}

export function getRecommendedCoachAction(stats) {
  const weakSkills = Object.entries(stats.weakSkillCounts || {}).sort((a, b) => b[1] - a[1])
  if (weakSkills.length > 0) {
    return {
      label: `ซ่อมจุดอ่อน: ${weakSkills[0][0]}`,
      target: 'grammar',
    }
  }
  if ((stats.todayStudySeconds || 0) < 15 * 60) {
    return { label: 'เก็บ Grammar Academy สักบท', target: 'academy' }
  }
  return { label: 'ลองฟังเสียง native สักรอบ', target: 'listening' }
}
