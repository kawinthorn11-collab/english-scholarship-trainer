// ตัวช่วยเกี่ยวกับข้อสอบ: ประโยคเต็ม บทพูดของครู คะแนน และการบันทึกความคืบหน้า

const CHOICE_LABELS = ['1', '2', '3', '4']

export function choiceLabel(index) {
  return CHOICE_LABELS[index] || String(index + 1)
}

/** ประโยคเต็มที่มีช่องว่างข้อ n โดยเติมคำตอบที่ถูกของทุกช่องในประโยคนั้น */
export function blankSentence(set, question) {
  const passage = set.passages[question.passage]
  if (!passage?.text) return ''
  const marker = `__(${question.n})__`
  const sentences = passage.text.replace(/\s*\n\s*/g, ' ').match(/[^.!?]+[.!?]+['’]?|[^.!?]+$/g) || []
  const sentence = sentences.find((item) => item.includes(marker))
  if (!sentence) return ''
  return sentence
    .trim()
    .replace(/__\((\d+)\)__/g, (_, num) => {
      const other = set.questions.find((item) => item.n === Number(num))
      return other ? `[[${other.choices[other.answer]}]]` : '___'
    })
}

/** บทพูดของครูสำหรับเฉลยข้อนี้ */
export function teachingScript(question) {
  const correct = question.choices[question.answer]
  const parts = [`ข้อ ${question.n} ตอบช้อยส์ ${choiceLabel(question.answer)} คือ ${correct}.`, question.why]
  question.wrong.forEach((reason, index) => {
    if (index !== question.answer && reason) {
      parts.push(`ช้อยส์ ${choiceLabel(index)} ${question.choices[index]} ผิดเพราะ ${reason}`)
    }
  })
  if (question.tip) parts.push(`เทคนิคจำง่าย: ${question.tip}`)
  if (question.trap) parts.push(`ระวัง: ${question.trap}`)
  return parts.join(' ')
}

/** บทพูดของครูสำหรับบทเรียนแกรมม่า */
export function topicScript(topic) {
  const parts = [`บทเรียนเรื่อง ${topic.title}.`, topic.summary]
  topic.sections.forEach((section) => {
    parts.push(sectionScript(section))
  })
  if (topic.traps.length) parts.push(`จุดที่ต้องระวัง: ${topic.traps.join(' ')}`)
  return parts.join(' ')
}

export function sectionScript(section) {
  const examples = section.examples.map(([en, th]) => `${en} ${th}`).join(' ')
  return `${section.head}. ${section.text} ตัวอย่าง: ${examples}`
}

export function scoreOf(set, answers) {
  let grammar = 0
  let reading = 0
  set.questions.forEach((question) => {
    if (answers[question.n] === question.answer) {
      if (question.part === 'grammar') grammar += 1
      else reading += 1
    }
  })
  return {
    grammar,
    reading,
    total: grammar + reading,
    grammarMax: set.questions.filter((question) => question.part === 'grammar').length,
    readingMax: set.questions.filter((question) => question.part === 'reading').length,
    max: set.questions.length,
  }
}

/** หัวข้อที่ตอบผิดมากที่สุด เรียงจากมากไปน้อย */
export function weakTopics(set, answers) {
  const counts = {}
  set.questions.forEach((question) => {
    if (!question.topic) return
    const entry = (counts[question.topic] ||= { topic: question.topic, wrong: 0, total: 0 })
    entry.total += 1
    if (answers[question.n] !== question.answer) entry.wrong += 1
  })
  return Object.values(counts)
    .filter((entry) => entry.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong || b.total - a.total)
}

// ── บันทึกความคืบหน้าในเครื่อง ──────────────────────────────

const STORE_KEY = 'est.progress.v1'

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {}
  } catch {
    return {}
  }
}

function writeStore(store) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store))
  } catch {
    // โหมดส่วนตัวบางเบราว์เซอร์บันทึกไม่ได้ ใช้งานต่อได้ตามปกติ
  }
}

/** attempt = { mode: 'practice' | 'timed', answers: {n: index}, startedAt, deadline?, finishedAt? } */
export function getAttempt(setId) {
  return readStore()[setId] || null
}

export function saveAttempt(setId, attempt) {
  const store = readStore()
  store[setId] = attempt
  writeStore(store)
}

export function startAttempt(setId, mode, minutes) {
  const now = Date.now()
  const attempt = {
    mode,
    answers: {},
    startedAt: now,
    deadline: mode === 'timed' ? now + minutes * 60 * 1000 : null,
    finishedAt: null,
  }
  saveAttempt(setId, attempt)
  return attempt
}

export function getAllAttempts() {
  return readStore()
}
