// รวมข้อสอบทุกชุดให้อยู่ในรูปแบบเดียวกัน เพื่อให้หน้าเว็บใช้ได้ง่าย
//
// question = { n, passage, part, q, choices, answer, topic, why, wrong[], tip, trap?, lesson?, explainEn?, lines? }
// passage  = { part, title, titleTh?, text? (grammar), lines? | paragraphs? (reading) }

import setM from './setM.js'
import set01 from '../examSets/set01.js'
import set02 from '../examSets/set02.js'
import set03 from '../examSets/set03/index.js'

// skillTag ของชุดเก่า → หัวข้อในหน้าแกรมม่า
const TAG_TO_TOPIC = {
  tense: 'verb',
  passive_voice: 'verb',
  subject_verb_agreement: 'verb',
  conjunction: 'conjunction',
  preposition: 'preposition',
  collocation: 'preposition',
  pronoun: 'pronoun',
  word_form: 'word-form',
  gerund_infinitive: 'word-form',
  adjective_adverb: 'word-form',
  comparison: 'word-form',
  parallel_structure: 'parallel',
  relative_clause: 'relative',
  article: 'article',
  modal: 'modal',
  conditional: 'modal',
  pronoun_reference: 'reference',
  main_idea: 'reading',
  detail: 'reading',
  inference: 'reading',
  vocabulary_context: 'reading',
  cause_effect: 'reading',
  writer_purpose: 'reading',
  true_false: 'reading',
  sentence_meaning: 'reading',
  title_selection: 'reading',
}

// ชุดเก่าเฉลยช้อยส์ 2 เกือบทุกข้อ จึงสลับลำดับช้อยส์แบบคงที่ (ได้ลำดับเดิมทุกครั้งที่เปิด)
function seededOrder(seedText, size) {
  let seed = 0
  for (const char of seedText) seed = (seed * 31 + char.charCodeAt(0)) >>> 0
  const random = () => {
    seed = (seed + 0x6d2b79f5) >>> 0
    let t = seed
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const order = Array.from({ length: size }, (_, i) => i)
  for (let i = size - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

// คำอธิบายเดิมอ้างถึง "Option 2" หรือ "ตัวเลือกที่ 2" ต้องเปลี่ยนเลขตามลำดับใหม่
function renumber(text, newPosition) {
  if (!text) return text
  return text.replace(/(Option|option|ตัวเลือกที่|ตัวเลือก)(\s?)([1-4])\b/g, (_, word, space, digit) => (
    `${word}${space}${newPosition[Number(digit) - 1] + 1}`
  ))
}

function normalizeLegacySet(set, { title, subtitle }) {
  const passages = {}
  const questions = set.questions.map((item, index) => {
    const part = item.section === 'Grammar' ? 'grammar' : 'reading'
    if (item.passage && !passages[item.passageId]) {
      passages[item.passageId] = part === 'grammar'
        ? { part, title: item.passageTitle, text: item.passage }
        : { part, title: item.passageTitle, paragraphs: item.passage.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) }
    }
    const order = seededOrder(item.id, item.choices.length)
    const newPosition = item.choices.map((_, i) => order.indexOf(i))
    const fix = (text) => renumber(text, newPosition)
    return {
      n: index + 1,
      passage: item.passageId,
      part,
      q: part === 'reading' ? item.question : '',
      choices: order.map((i) => item.choices[i]),
      answer: newPosition[item.choices.indexOf(item.correctAnswer)],
      topic: TAG_TO_TOPIC[item.skillTag] || null,
      why: fix(item.explanationThai),
      explainEn: fix(item.whyCorrect || item.explanationEnglish),
      wrong: order.map((i) => fix(item.whyWrong?.[String(i + 1)] || '')),
      tip: fix(item.examTrick),
      trap: fix(item.commonMistake),
      lesson: fix(item.miniLesson),
    }
  })
  return { id: set.setId, title, subtitle, timeLimit: set.timeLimitMinutes, passages, questions }
}

function normalizeSet(set) {
  return {
    ...set,
    questions: set.questions.map((item) => ({
      ...item,
      part: set.passages[item.passage].part,
      q: item.q || '',
    })),
  }
}

export const sets = [
  normalizeSet(setM),
  normalizeLegacySet(set01, { title: 'ชุดฝึก 1', subtitle: 'อาสาสมัคร · เรื่องเล่าบนรถไฟ · บทความสุขภาพ' }),
  normalizeLegacySet(set02, { title: 'ชุดฝึก 2', subtitle: 'จิตอาสา · ความทรงจำในโรงเรียน · เรียนออนไลน์' }),
  normalizeLegacySet(set03, { title: 'ชุดฝึก 3', subtitle: 'สิ่งแวดล้อม · สิ่งประดิษฐ์ · การทำงานแบบไฮบริด' }),
]

export function getSet(id) {
  return sets.find((set) => set.id === id) || null
}
