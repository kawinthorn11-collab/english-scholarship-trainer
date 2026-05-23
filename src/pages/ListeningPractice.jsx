import { useMemo, useState } from 'react'
import { grammarLessons } from '../data/grammarLessons/index.js'
import { examSets } from '../data/examSets/index.js'
import SpeakButton from '../components/SpeakButton'
import SpeechSettings from '../components/SpeechSettings'
import { recordListeningActivity } from '../utils/localStats'

function buildListeningItems() {
  const grammarExamples = grammarLessons.flatMap((lesson) =>
    (lesson.coreRules || []).flatMap((rule) =>
      (rule.correctExamples || []).slice(0, 2).map((example) => {
        const text = typeof example === 'string' ? example : example.sentence
        return {
          source: 'Grammar examples',
          title: lesson.title,
          text,
        }
      })
    )
  )

  const examSentences = Object.values(examSets).flatMap((set) =>
    set.questions.slice(0, 15).map((question) => ({
      source: 'Exam sentences',
      title: set.title,
      text: question.question,
    }))
  )

  const readingPassages = Object.values(examSets).flatMap((set) => {
    const seen = new Set()
    return set.questions
      .filter((question) => question.passage && !seen.has(question.passageId) && seen.add(question.passageId))
      .slice(0, 8)
      .map((question) => ({
        source: 'Reading passages',
        title: question.passageTitle || set.title,
        text: question.passage,
      }))
  })

  const collocations = [
    'pay attention to signal words',
    'make a significant difference',
    'take responsibility for your progress',
    'have difficulty with prepositions',
    'reach a conclusion after reading carefully',
  ].map((text) => ({ source: 'Vocabulary/collocations', title: 'Academic collocation', text }))

  return [...grammarExamples, ...examSentences, ...readingPassages, ...collocations].filter((item) => item.text)
}

export default function ListeningPractice({ onNavigate }) {
  const items = useMemo(() => buildListeningItems(), [])
  const [source, setSource] = useState('Grammar examples')
  const [index, setIndex] = useState(0)
  const [hidden, setHidden] = useState(false)
  const filtered = items.filter((item) => item.source === source)
  const current = filtered[index] || filtered[0]

  const sources = [...new Set(items.map((item) => item.source))]

  const next = () => setIndex((value) => (value + 1) % filtered.length)
  const markUnderstood = () => {
    recordListeningActivity({ seconds: 8 })
    next()
  }
  const markRepeated = () => {
    recordListeningActivity({ seconds: 8, repeated: true })
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-wide text-purple-400">Listening / ฟังเสียง</p>
        <h1 className="text-3xl font-bold text-purple-100">Native Listening Practice</h1>
        <p className="mt-2 text-sm text-purple-300">ใช้เสียงจาก browser ไม่ต้องใช้ backend ไม่ต้องล็อกอิน ฝึกฟังประโยคสอบแบบช้า/ปกติได้เลย</p>
      </header>

      <SpeechSettings />

      <div className="grid gap-2 sm:grid-cols-4">
        {sources.map((name) => (
          <button
            key={name}
            onClick={() => { setSource(name); setIndex(0) }}
            className={`rounded-lg border px-3 py-3 text-sm font-semibold transition ${source === name ? 'border-purple-400 bg-purple-700 text-white' : 'border-purple-700/40 bg-purple-900/20 text-purple-200 hover:bg-purple-900/40'}`}
          >
            {name}
          </button>
        ))}
      </div>

      {current && (
        <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs text-purple-400">{current.source}</p>
              <h2 className="font-semibold text-purple-100">{current.title}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <SpeakButton text={current.text} label="Slow" size="md" variant="button" rate={0.75} />
              <SpeakButton text={current.text} label="Normal" size="md" variant="button" rate={1} />
            </div>
          </div>

          <div className="rounded-lg border border-purple-700/40 bg-purple-950/50 p-4">
            {hidden ? (
              <p className="text-purple-500">Text hidden. Listen first, then reveal.</p>
            ) : (
              <p className="whitespace-pre-line text-sm leading-relaxed text-purple-100">{current.text}</p>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button onClick={() => setHidden((value) => !value)} className="rounded-lg border border-purple-600 px-4 py-2 text-sm font-semibold text-purple-200 transition hover:bg-purple-900/40">
              {hidden ? 'Show text' : 'Hide text'}
            </button>
            <button onClick={markRepeated} className="rounded-lg border border-purple-600 px-4 py-2 text-sm font-semibold text-purple-200 transition hover:bg-purple-900/40">
              Repeat counted
            </button>
            <button onClick={markUnderstood} className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600">
              I understood
            </button>
            <button onClick={next} className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-500">
              Next
            </button>
          </div>
        </div>
      )}

      <button onClick={() => onNavigate('dashboard')} className="text-sm text-purple-400 underline transition hover:text-purple-200">
        Back to Dashboard
      </button>
    </div>
  )
}
