import { useEffect } from 'react'
import { getLesson } from '../data/grammarLessons/index.js'
import { examSets } from '../data/examSets/index.js'
import { markLessonStudied } from '../utils/storage'

export default function GrammarLesson({ lessonId, onNavigate, onStartDrill }) {
  const lesson = getLesson(lessonId)

  useEffect(() => {
    if (lesson && lesson.status === 'available') {
      markLessonStudied(lessonId)
    }
  }, [lessonId, lesson])

  if (!lesson) {
    return (
      <div className="text-center text-purple-300">
        <p>Lesson not found.</p>
        <button onClick={() => onNavigate('grammar')} className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-white">
          Back to Grammar Hub
        </button>
      </div>
    )
  }

  const relatedQuestions = []
  for (const [setId, set] of Object.entries(examSets)) {
    for (const q of set.questions) {
      if (lesson.relatedSkillTags.includes(q.skillTag)) {
        relatedQuestions.push({ ...q, fromSetId: setId, fromSetTitle: set.title })
      }
    }
  }

  if (lesson.status !== 'available') {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold text-purple-100">{lesson.title}</h2>
        <p className="text-purple-300">บทเรียนนี้กำลังเตรียมเนื้อหา</p>
        <button onClick={() => onNavigate('grammar')} className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white">
          Back to Grammar Hub
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-purple-100">{lesson.title}</h1>
        <p className="mt-1 text-purple-400">{lesson.titleThai}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Badge>{lesson.level}</Badge>
          <Badge>{lesson.estimatedStudyMinutes || 30} min</Badge>
          <Badge>{lesson.miniQuiz?.length || 0} quiz Q</Badge>
          <Badge>{relatedQuestions.length} exam Q</Badge>
          {lesson.relatedSkillTags.map((t) => <Badge key={t}>{t}</Badge>)}
        </div>
      </header>

      <nav className="sticky top-16 z-40 rounded-lg border border-purple-700/40 bg-[#1a0a2e]/95 p-3 backdrop-blur">
        <div className="flex flex-wrap gap-2 text-xs">
          <AnchorLink href="#why">Why</AnchorLink>
          <AnchorLink href="#rules">Rules</AnchorLink>
          <AnchorLink href="#patterns">Exam traps</AnchorLink>
          <AnchorLink href="#mistakes">Thai mistakes</AnchorLink>
          <AnchorLink href="#eliminate">Eliminate</AnchorLink>
          <AnchorLink href="#quick">Quick rules</AnchorLink>
          <AnchorLink href="#related">Related Q</AnchorLink>
        </div>
      </nav>

      <div className="grid gap-3 sm:grid-cols-3">
        <Callout title="Exam Trap" tone="yellow">
          Read both sides of the blank. Most traps are wrong tense, wrong word form, or agreement with a nearby noun.
        </Callout>
        <Callout title="Thai Student Mistake" tone="red">
          Do not choose only because the Thai translation sounds right. Check the English structure first.
        </Callout>
        <Callout title="Quick Memory Tip" tone="purple">
          Use this order: function, signal words, eliminate impossible choices, then decide by meaning.
        </Callout>
      </div>

      <Section id="why" title="Why this matters">
        <p className="text-sm leading-relaxed text-purple-200/80">{lesson.whyItMattersThai}</p>
      </Section>

      <Section id="rules" title="Core Rules">
        <div className="space-y-3">
          {lesson.coreRules.map((rule, i) => (
            <details key={i} open={i === 0} className="rounded-lg border border-purple-700/30 bg-purple-900/20 p-4">
              <summary className="cursor-pointer font-semibold text-purple-100">
                {i + 1}. {rule.ruleTitle}
              </summary>
              <div className="mt-3">
                <p className="mb-2 text-sm text-purple-300">{rule.explanationThai}</p>
                <p className="mb-3 text-sm italic text-purple-300/80">{rule.explanationEnglish}</p>
                {rule.pattern && (
                  <p className="mb-3 rounded bg-purple-950/60 px-3 py-2 font-mono text-xs text-purple-200">
                    Pattern: {rule.pattern}
                  </p>
                )}
                {rule.correctExamples?.length > 0 && (
                  <ExampleList title="Correct examples" examples={rule.correctExamples} />
                )}
                {rule.wrongExamples?.length > 0 && (
                  <WrongList examples={rule.wrongExamples} />
                )}
              </div>
            </details>
          ))}
        </div>
      </Section>

      <Section id="patterns" title="Exam Patterns">
        <div className="space-y-3">
          {lesson.examPatterns.map((p, i) => (
            <div key={i} className="rounded-lg border border-yellow-700/30 bg-yellow-900/10 p-4">
              <p className="font-semibold text-yellow-200">{p.patternName}</p>
              <p className="mt-1 text-sm text-purple-200/80">{p.howItAppearsInExamThai}</p>
              {p.signalWords?.length > 0 && (
                <p className="mt-2 text-xs text-yellow-300/80">Signal words: {p.signalWords.join(', ')}</p>
              )}
              {p.trapChoices?.length > 0 && (
                <p className="mt-1 text-xs text-red-300/80">Trap choices: {p.trapChoices.join(' | ')}</p>
              )}
              <p className="mt-2 rounded bg-yellow-950/40 p-2 text-xs text-yellow-100">{p.examTipThai}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="mistakes" title="Common Thai Student Mistakes">
        <div className="space-y-3">
          {lesson.commonMistakesThaiStudents.map((m, i) => (
            <div key={i} className="rounded-lg border border-red-700/30 bg-red-900/10 p-4">
              <p className="font-semibold text-red-200">{m.mistake}</p>
              <p className="mt-1 text-sm text-purple-200/80">{m.whyItHappensThai}</p>
              <p className="mt-1 text-sm text-green-300">{m.fixThai}</p>
              {m.example && <p className="mt-1 font-mono text-xs text-purple-300">{m.example}</p>}
            </div>
          ))}
        </div>
      </Section>

      {lesson.eliminationStrategiesThai?.length > 0 && (
        <Section id="eliminate" title="Elimination Strategy">
          <ul className="space-y-2 text-sm text-purple-200/80">
            {lesson.eliminationStrategiesThai.map((item, i) => <li key={i}>- {item}</li>)}
          </ul>
        </Section>
      )}

      <div id="quick" className="grid gap-4 sm:grid-cols-2 scroll-mt-24">
        <Section title="Quick Rules">
          <ul className="space-y-1 text-sm text-purple-200/80">
            {lesson.quickRulesThai.map((r, i) => <li key={i}>- {r}</li>)}
          </ul>
        </Section>
        <Section title="Memory Tips">
          <ul className="space-y-1 text-sm text-purple-200/80">
            {lesson.memoryTipsThai.map((t, i) => <li key={i}>- {t}</li>)}
          </ul>
        </Section>
      </div>

      <Section id="checklist" title="Mastery Checklist">
        <ul className="space-y-1 text-sm text-purple-200/80">
          {lesson.masteryChecklist.map((item, i) => <li key={i}>☐ {item}</li>)}
        </ul>
      </Section>

      <Section id="related" title={`Related exam questions (${relatedQuestions.length})`}>
        {relatedQuestions.length > 0 ? (
          <div className="space-y-2">
            {relatedQuestions.slice(0, 5).map((q) => (
              <div key={q.id} className="rounded-lg border border-purple-700/30 bg-purple-900/10 p-3 text-sm">
                <p className="text-purple-100">{q.question}</p>
                <p className="mt-1 text-xs text-purple-400">{q.fromSetTitle} · {q.skillTag} · {q.difficulty}</p>
              </div>
            ))}
            {relatedQuestions.length > 5 && (
              <p className="text-xs text-purple-400">+{relatedQuestions.length - 5} more in the drill.</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-purple-300/80">{lesson.relatedExamLookupNoteThai || 'No direct exam questions are tagged for this topic yet.'}</p>
        )}
      </Section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => onStartDrill(lesson.id)}
          className="flex-1 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-purple-500"
        >
          Practice This Topic
        </button>
        <button
          onClick={() => onNavigate('grammar')}
          className="flex-1 rounded-xl border border-purple-600 px-6 py-3 font-semibold text-purple-200 transition hover:bg-purple-900/40"
        >
          Back to Grammar Hub
        </button>
      </div>
    </div>
  )
}

function Badge({ children }) {
  return <span className="rounded-full bg-purple-800/50 px-3 py-1 text-purple-200">{children}</span>
}

function AnchorLink({ href, children }) {
  return <a href={href} className="rounded-full bg-purple-900/60 px-3 py-1 text-purple-200 transition hover:bg-purple-700">{children}</a>
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h3 className="mb-3 text-lg font-semibold text-purple-200">{title}</h3>
      {children}
    </section>
  )
}

function Callout({ title, tone, children }) {
  const tones = {
    yellow: 'border-yellow-700/40 bg-yellow-900/10 text-yellow-100',
    red: 'border-red-700/40 bg-red-900/10 text-red-100',
    purple: 'border-purple-700/40 bg-purple-900/20 text-purple-100',
  }
  return (
    <div className={`rounded-lg border p-4 ${tones[tone] || tones.purple}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-2 text-xs leading-relaxed opacity-85">{children}</p>
    </div>
  )
}

function ExampleList({ title, examples }) {
  return (
    <div className="mb-3">
      <p className="mb-1 text-xs font-semibold text-green-400">{title}</p>
      <ul className="space-y-2">
        {examples.map((ex, j) => (
          <li key={j} className="text-sm">
            <p className="text-purple-100">{ex.sentence}</p>
            <p className="text-xs text-purple-400">{ex.translationThai}</p>
            {ex.noteThai && <p className="text-xs text-purple-300/70">{ex.noteThai}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

function WrongList({ examples }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold text-red-400">Wrong examples</p>
      <ul className="space-y-2">
        {examples.map((ex, j) => (
          <li key={j} className="text-sm">
            <p className="text-red-300 line-through">{ex.sentence}</p>
            <p className="text-green-300">→ {ex.correction}</p>
            <p className="text-xs text-purple-300/70">{ex.whyWrongThai}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

