// Grammar Lessons Registry
// Each lesson is a separate module file. All 20 categories are available.

import modals from './modals.js'
import collocations from './collocations.js'
import parallelStructure from './parallelStructure.js'
import wordForms from './wordForms.js'
import conjunctions from './conjunctions.js'
import prepositions from './prepositions.js'
import tenses from './tenses.js'
import gerundsInfinitives from './gerundsInfinitives.js'
import relativeClauses from './relativeClauses.js'
import articles from './articles.js'
import passiveVoice from './passiveVoice.js'
import pronounsReference from './pronounsReference.js'
import subjectVerbAgreement from './subjectVerbAgreement.js'
import conditionals from './conditionals.js'
import adjectivesAdverbs from './adjectivesAdverbs.js'
import comparisons from './comparisons.js'
import quantifiers from './quantifiers.js'
import reportedSpeech from './reportedSpeech.js'
import sentenceStructure from './sentenceStructure.js'
import examClozeStrategy from './examClozeStrategy.js'

const extraMiniQuizByLesson = {
  modals: [
    { question: 'Applicants _____ submit the form before the deadline; late forms will not be accepted.', choices: ['must', 'might', 'can', 'would'], correctAnswer: 'must', explanationThai: 'deadline และ will not be accepted แสดงข้อบังคับ จึงใช้ must. might/can/would อ่อนเกินไปหรือผิดความหมาย', skillTag: 'modal' },
    { question: 'You _____ want to review the explanation again if the pattern is still unclear.', choices: ['must', 'might', 'should to', 'can to'], correctAnswer: 'might', explanationThai: 'might แสดงความเป็นไปได้/คำแนะนำอ่อน ๆ เหมาะกับบริบท. should/can ห้ามตามด้วย to', skillTag: 'modal' },
  ],
  collocations: [
    { question: 'The teacher asked students to _____ attention to the signal words in each sentence.', choices: ['pay', 'give', 'make', 'take'], correctAnswer: 'pay', explanationThai: 'collocation ที่ถูกคือ pay attention. give/make/take ไม่ใช้กับ attention ในความหมายนี้', skillTag: 'collocation' },
    { question: 'Regular practice can _____ a significant difference to a student’s confidence.', choices: ['make', 'do', 'take', 'have'], correctAnswer: 'make', explanationThai: 'collocation คือ make a difference. do/take/have ไม่ใช่รูปที่ใช้ในบริบทนี้', skillTag: 'collocation' },
  ],
  'parallel-structure': [
    { question: 'The course helps students read faster, write more clearly, and _____ more confidently.', choices: ['speak', 'speaking', 'to speak', 'spoken'], correctAnswer: 'speak', explanationThai: 'รายการใช้ verb base ต่อเนื่อง: read, write, and speak. ตัวเลือกอื่นไม่ parallel', skillTag: 'parallel_structure' },
    { question: 'A good answer should be accurate, concise, and _____.', choices: ['logical', 'logically', 'logic', 'to be logical'], correctAnswer: 'logical', explanationThai: 'รายการ adjective: accurate, concise, and logical. logically เป็น adverb ไม่ parallel', skillTag: 'parallel_structure' },
  ],
  'word-forms': [
    { question: 'The final _____ will be announced on the school website.', choices: ['decide', 'decision', 'decisive', 'decisively'], correctAnswer: 'decision', explanationThai: 'หลัง the final ต้องการ noun. decision เป็นคำนาม; decide เป็น verb; decisive เป็น adjective; decisively เป็น adverb', skillTag: 'word_form' },
    { question: 'The instructions were written _____ so that all applicants could understand them.', choices: ['clear', 'clearly', 'clarity', 'clearance'], correctAnswer: 'clearly', explanationThai: 'ขยายกริยา were written ต้องใช้ adverb clearly. clear เป็น adjective', skillTag: 'word_form' },
  ],
  conjunctions: [
    { question: 'The passage was long, _____ the questions were straightforward.', choices: ['but', 'because', 'so', 'if'], correctAnswer: 'but', explanationThai: 'สองฝั่งมีความขัดแย้ง: passage ยาว แต่คำถามตรง จึงใช้ but', skillTag: 'conjunction' },
    { question: 'Students should read the whole sentence _____ choosing an answer.', choices: ['before', 'although', 'because', 'unless'], correctAnswer: 'before', explanationThai: 'ต้องการ conjunction/preposition บอกลำดับเวลา: before choosing. although/because/unless ไม่เข้าความหมาย', skillTag: 'conjunction' },
  ],
  prepositions: [
    { question: 'Many students are interested _____ applying for international scholarships.', choices: ['in', 'on', 'at', 'for'], correctAnswer: 'in', explanationThai: 'pattern คือ interested in + V-ing/noun. ตัวเลือกอื่นผิด collocation', skillTag: 'preposition' },
    { question: 'The result depends _____ how carefully you read the context.', choices: ['on', 'in', 'at', 'for'], correctAnswer: 'on', explanationThai: 'depend on เป็น preposition pattern ที่ถูก', skillTag: 'preposition' },
  ],
  tenses: [
    { question: 'By the time the teacher arrived, the students _____ the first exercise.', choices: ['finished', 'had finished', 'have finished', 'will finish'], correctAnswer: 'had finished', explanationThai: 'By the time + past event ชี้ว่าอีกเหตุการณ์เกิดก่อนในอดีต ต้องใช้ past perfect: had finished', skillTag: 'tense' },
  ],
  'gerunds-infinitives': [
    { question: 'The school encouraged students _____ every explanation after the exam.', choices: ['review', 'to review', 'reviewing', 'reviewed'], correctAnswer: 'to review', explanationThai: 'encourage someone to do something เป็น pattern ที่ถูก', skillTag: 'gerund_infinitive' },
  ],
  'relative-clauses': [
    { question: 'The student _____ essay won the prize thanked her English teacher.', choices: ['who', 'whose', 'which', 'where'], correctAnswer: 'whose', explanationThai: 'ต้องการแสดงความเป็นเจ้าของ essay ของ student จึงใช้ whose', skillTag: 'relative_clause' },
  ],
  articles: [
    { question: 'The school organized _____ interview for shortlisted applicants.', choices: ['a', 'an', 'the', '-'], correctAnswer: 'an', explanationThai: 'interview ขึ้นต้นเสียงสระและกล่าวถึงครั้งหนึ่งทั่วไป ใช้ an interview', skillTag: 'article' },
  ],
  'passive-voice': [
    { question: 'The final results will _____ on the official website tomorrow.', choices: ['announce', 'be announced', 'announced', 'be announcing'], correctAnswer: 'be announced', explanationThai: 'results เป็นสิ่งที่ถูกประกาศ และมี will จึงใช้ passive: will be + V3', skillTag: 'passive_voice' },
  ],
  'pronouns-reference': [
    { question: 'The teachers gave the students extra exercises because _____ needed more practice.', choices: ['they', 'it', 'he', 'she'], correctAnswer: 'they', explanationThai: 'สรรพนามต้องอ้างถึง students ซึ่งเป็นพหูพจน์ จึงใช้ they. it/he/she ไม่ตรงจำนวน/เพศ', skillTag: 'pronoun_reference' },
  ],
  'subject-verb-agreement': [
    { question: 'The list of required documents _____ available on the website.', choices: ['is', 'are', 'have', 'were'], correctAnswer: 'is', explanationThai: 'ประธานหลักคือ The list เอกพจน์ ส่วน of required documents เป็น phrase จึงใช้ is', skillTag: 'subject_verb_agreement' },
  ],
}

function withQuizExpansion(lesson) {
  const extras = extraMiniQuizByLesson[lesson.id] || []
  if (!Array.isArray(lesson.miniQuiz) || lesson.miniQuiz.length >= 10) return lesson
  return {
    ...lesson,
    miniQuiz: [...lesson.miniQuiz, ...extras].slice(0, 10),
  }
}

const rawLessons = [
  modals,
  collocations,
  parallelStructure,
  wordForms,
  conjunctions,
  prepositions,
  tenses,
  gerundsInfinitives,
  relativeClauses,
  articles,
  passiveVoice,
  pronounsReference,
  subjectVerbAgreement,
  conditionals,
  adjectivesAdverbs,
  comparisons,
  quantifiers,
  reportedSpeech,
  sentenceStructure,
  examClozeStrategy,
]

const lessons = rawLessons.map(withQuizExpansion)

// Convenient lookup
export const grammarLessons = lessons
export const lessonMap = Object.fromEntries(lessons.map((l) => [l.id, l]))

export function getLesson(lessonId) {
  return lessonMap[lessonId] || null
}

export function getAvailableLessons() {
  return lessons.filter((l) => l.status === 'available')
}

/**
 * Find lessons that match the given skill tags.
 * Used by Dashboard "Recommended" and Results "Study This Grammar" links.
 */
export function findLessonsBySkillTags(skillTags) {
  if (!Array.isArray(skillTags) || skillTags.length === 0) return []
  return lessons.filter((l) =>
    l.relatedSkillTags.some((tag) => skillTags.includes(tag))
  )
}

/**
 * Map a single skill tag to the most relevant lesson (or null).
 */
export function findLessonBySkillTag(skillTag) {
  return lessons.find((l) => l.relatedSkillTags.includes(skillTag)) || null
}

