import { useMemo, useState } from 'react'
import { grammarLessons } from '../data/grammarLessons/index.js'
import { examSets } from '../data/examSets/index.js'
import SpeakButton from '../components/SpeakButton'
import SpeechSettings from '../components/SpeechSettings'
import { recordListeningActivity } from '../utils/localStats'
import { PageHeader } from '../components/ui'

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
    <div className="space-y-8">
      <PageHeader
        eyebrow="Listening · ฟังเสียง"
        icon="🎧"
        title="Native Listening Practice"
        subtitle="ฟังประโยคสอบแบบช้า/ปกติ ฝึก shadowing พูดตาม แล้วค่อยเปิดดูตัวหนังสือ — ใช้เสียงจาก browser ไม่ต้องล็อกอิน"
        mood="happy"
      />

      <SpeechSettings />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {sources.map((name) => (
          <button
            key={name}
            onClick={() => { setSource(name); setIndex(0) }}
            className={`rounded-2xl border px-4 py-3.5 text-sm font-semibold transition ${source === name ? 'border-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-900/30' : 'border-white/[0.08] bg-white/[0.04] text-purple-200 hover:bg-white/[0.07]'}`}
          >
            {name}
          </button>
        ))}
      </div>

      {current && (
        <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div aria-hidden className="flex h-12 items-end gap-1">
                {[0, 1, 2, 3, 4].map((bar) => (
                  <span key={bar} className="w-1.5 rounded-full bg-gradient-to-t from-violet-500 to-sky-300" style={{ height: '100%', transformOrigin: 'bottom', animation: `eq ${0.7 + bar * 0.13}s ease-in-out ${bar * 0.1}s infinite` }} />
                ))}
              </div>
              <div>
                <p className="eyebrow">{current.source} · {index + 1}/{filtered.length}</p>
                <h2 className="mt-1 text-xl font-semibold text-white">{current.title}</h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <SpeakButton text={current.text} label="Slow" size="md" variant="button" rate={0.75} />
              <SpeakButton text={current.text} label="Normal" size="md" variant="button" rate={1} />
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/[0.08] bg-black/20 p-6">
            {hidden ? (
              <p className="py-4 text-center text-purple-300/70">🙈 ซ่อนข้อความอยู่ — ฟังก่อน แล้วค่อยกดเปิดดู</p>
            ) : (
              <p className="whitespace-pre-line text-[17px] leading-relaxed text-purple-50">{current.text}</p>
            )}
          </div>

          <div className="relative mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <button onClick={() => setHidden((value) => !value)} className="btn btn-ghost text-sm">
              {hidden ? '👀 Show text' : '🙈 Hide text'}
            </button>
            <button onClick={markRepeated} className="btn btn-ghost text-sm">
              🔁 Repeat counted
            </button>
            <button onClick={markUnderstood} className="btn btn-success text-sm">
              ✓ I understood
            </button>
            <button onClick={next} className="btn btn-primary text-sm">
              Next →
            </button>
          </div>
        </div>
      )}

      <button onClick={() => onNavigate('dashboard')} className="text-sm font-semibold text-purple-300 transition hover:text-white">
        Back to Dashboard
      </button>
    </div>
  )
}
