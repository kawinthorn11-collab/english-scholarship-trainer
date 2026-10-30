import { getCardStates, getIntlBest } from './learningStore'
import { getAttempts } from './storage'

const DISMISS_KEY = 'mk-start-dismissed-v1'

function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback
  } catch {
    return fallback
  }
}

/** The three first steps every newcomer is walked through, with done flags. */
export function getStartSteps() {
  const lessonsDone = Object.keys(readJSON('duo-lessons-done', {})).length
  const testsDone = Object.keys(getIntlBest()).length + getAttempts().length
  const cardsSeen = Object.keys(getCardStates()).length

  return [
    {
      key: 'class',
      icon: '🎧',
      title: 'ฟังครูหมูควายสอน 1 บท',
      desc: 'กดฟังเฉย ๆ ก็ได้ ประมาณ 1 นาที แล้วตอบคำถาม 1 ข้อ',
      cta: 'เริ่มบทเรียนแรก (1 นาที)',
      target: 'class',
      done: lessonsDone > 0,
    },
    {
      key: 'test',
      icon: '📝',
      title: 'ลองทำข้อสอบสั้น 10 ข้อ',
      desc: 'ข้อสอบเลือกคำตอบในบทสนทนา ตอบผิดก็มีเฉลยภาษาไทย',
      cta: 'ลองข้อสอบ 10 ข้อ',
      testId: 'conversation',
      done: testsDone > 0,
    },
    {
      key: 'words',
      icon: '🃏',
      title: 'ทบทวนคำศัพท์ 1 ชุด',
      desc: 'เปิดบัตรคำ กดฟังเสียง แล้วบอกว่าจำได้ไหม',
      cta: 'เปิดบัตรคำศัพท์',
      target: 'words',
      done: cardsSeen > 0,
    },
  ]
}

export function isStartDismissed() {
  return readJSON(DISMISS_KEY, false) === true
}

export function dismissStart() {
  try {
    localStorage.setItem(DISMISS_KEY, 'true')
  } catch {
    // optional
  }
}

/** True when the visitor has never studied anything on this device. */
export function isBrandNew() {
  return getStartSteps().every((s) => !s.done)
}
