// Every fixed line the app can speak with a character voice.
// scripts/generateVoices.mjs records these with ElevenLabs; the app plays the
// recording when its key (src/utils/voiceKey.js) is listed in the manifest.
import { duoLessons, encourageLines, feedbackLines, introSkit, pokeLines, praiseLines } from '../src/data/duoLessons.js'
import { landingQuiz, tipsByArea } from '../src/data/mascotTips.js'
import { moodMessages } from '../src/utils/comicCoachMessages.js'
import { intlTests } from '../src/data/intlTests.js'
import { wordDecks } from '../src/data/wordBank.js'
import { examSets } from '../src/data/examSets/index.js'
import { normalizeSpeech, voiceKey } from '../src/utils/voiceKey.js'

const PLAN_INTRO = 'หลักสูตรนี้ใช้วิธีเรียนที่มีงานวิจัยรองรับ ไม่ได้เน้นท่องจำ แต่เน้นฝึกดึงความรู้ออกมาใช้และทบทวนให้ถูกจังหวะ'

/**
 * scope 'core' – lessons, tips, feedback, quizzes, flashcards (recommended first run)
 * scope 'all'  – core + spoken explanations for every mock-exam question
 */
export function collectVoiceLines(scope = 'core') {
  const lines = []
  const add = (speaker, text, group) => {
    const clean = normalizeSpeech(text)
    if (clean) lines.push({ speaker, text: clean, group })
  }

  // Feedback phrases
  for (const who of ['pig', 'buffalo']) {
    Object.values(feedbackLines).forEach((t) => add(who, t, 'feedback'))
  }
  praiseLines.forEach((t) => add('pig', t, 'feedback'))
  encourageLines.forEach((t) => add('buffalo', t, 'feedback'))

  // Classroom lessons
  for (const lesson of duoLessons) {
    for (const line of lesson.lines) {
      add(line.who, line.text, 'lessons')
      if (line.example) add(line.who, line.example, 'lessons')
    }
    add('pig', lesson.quiz.question, 'lessons')
    add('pig', lesson.quiz.explain, 'lessons')
    add('buffalo', lesson.quiz.explain, 'lessons')
  }

  // Landing page, tap-to-talk, coach
  introSkit.forEach((l) => add(l.who, l.text, 'landing'))
  add('buffalo', landingQuiz.explainCorrect, 'landing')
  add('buffalo', landingQuiz.explainWrong, 'landing')
  for (const [who, list] of Object.entries(pokeLines)) list.forEach((t) => add(who, t, 'landing'))
  for (const list of Object.values(moodMessages)) {
    list.forEach((t) => { add('pig', t, 'coach'); add('buffalo', t, 'coach') })
  }

  // Floating helper tips: speaker alternates pig/buffalo by position in each area
  for (const tips of Object.values(tipsByArea)) {
    tips.forEach((tip, i) => {
      const who = i % 2 === 0 ? 'pig' : 'buffalo'
      add(who, tip.title, 'tips')
      add(who, tip.text, 'tips')
      if (tip.example) add(who, tip.example, 'tips')
    })
  }

  // International tests: coaching lines and explanations
  for (const test of intlTests) {
    test.coach.forEach((l) => add('buffalo', l.text, 'tests'))
    test.questions.forEach((q) => add('buffalo', q.explain, 'tests'))
  }
  add('buffalo', PLAN_INTRO, 'tests')

  // Flashcards: word by the pig, example sentence by the buffalo
  for (const deck of wordDecks) {
    for (const w of deck.words) {
      add('pig', w.word, 'words')
      add('buffalo', w.example, 'words')
    }
  }

  if (scope === 'all') {
    for (const set of Object.values(examSets)) {
      for (const q of set.questions) {
        add('buffalo', q.explanationThai, 'explanations')
        add('buffalo', q.examTrick, 'explanations')
      }
    }
  }

  // de-duplicate by key
  const seen = new Map()
  for (const line of lines) {
    const key = voiceKey(line.speaker, line.text)
    if (!seen.has(key)) seen.set(key, { ...line, key })
  }
  return [...seen.values()]
}
