import { useEffect } from 'react'
import { getLesson } from '../data/grammarLessons/index.js'
import { examSets } from '../data/examSets/index.js'
import { markLessonStudied } from '../utils/storage'
import SpeakButton from '../components/SpeakButton'
import ComicCoach from '../components/ComicCoach'
import { PageHeader } from '../components/ui'
import { recordGrammarLessonCompleted } from '../utils/localStats'
import { sendLearningEvent } from '../utils/globalStats'

export default function GrammarLesson({ lessonId, onNavigate, onStartDrill }) {
  const lesson = getLesson(lessonId)

  useEffect(() => {
    if (lesson && lesson.status === 'available') {
      markLessonStudied(lessonId)
      recordGrammarLessonCompleted(lessonId)
      sendLearningEvent('grammar_lesson_completed', { lessonId })
    }
  }, [lessonId, lesson])

  if (!lesson) {
    return (
      <div className="glass mx-auto max-w-md space-y-4 rounded-[2rem] p-8 text-center text-purple-200">
        <p>Lesson not found.</p>
        <button onClick={() => onNavigate('grammar')} className="mt-4 btn btn-primary">
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
        <h2 className="text-3xl font-semibold text-white">{lesson.title}</h2>
        <p className="text-purple-300">บทเรียนนี้กำลังเตรียมเนื้อหา</p>
        <button onClick={() => onNavigate('grammar')} className="btn btn-primary">
          Back to Grammar Hub
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Grammar Lesson" icon="📖" title={lesson.title} subtitle={lesson.titleThai} mood="teach">
        <div className="flex flex-wrap gap-2">
          <Badge>⚡ {lesson.level}</Badge>
          <Badge>⏱ {lesson.estimatedStudyMinutes || 30} min</Badge>
          <Badge>✏️ {lesson.miniQuiz?.length || 0} quiz Q</Badge>
          <Badge>📝 {relatedQuestions.length} exam Q</Badge>
          {lesson.relatedSkillTags.map((t) => <Badge key={t}>{t}</Badge>)}
        </div>
      </PageHeader>

      <nav className="sticky top-[4.5rem] z-40 rounded-3xl border border-white/10 bg-ink/80 p-3 shadow-xl shadow-black/30 backdrop-blur-xl">
        <div className="flex gap-2 overflow-x-auto text-xs">
          <AnchorLink href="#why">Why</AnchorLink>
          <AnchorLink href="#rules">Rules</AnchorLink>
          <AnchorLink href="#patterns">Exam traps</AnchorLink>
          <AnchorLink href="#mistakes">Thai mistakes</AnchorLink>
          <AnchorLink href="#eliminate">Eliminate</AnchorLink>
          <AnchorLink href="#quick">Quick rules</AnchorLink>
          <AnchorLink href="#related">Related Q</AnchorLink>
        </div>
      </nav>

      <div className="grid gap-4 sm:grid-cols-3">
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
        <p className="text-[15px] leading-relaxed text-purple-100/85">{lesson.whyItMattersThai}</p>
      </Section>

      <Section id="rules" title="Core Rules">
        <div className="space-y-3">
          {lesson.coreRules.map((rule, i) => (
            <details key={i} open={i === 0} className="rounded-3xl border border-white/[0.07] bg-white/[0.04] p-5">
              <summary className="cursor-pointer font-semibold text-purple-100">
                {i + 1}. {rule.ruleTitle}
              </summary>
              <div className="mt-3">
                <p className="mb-2 text-sm text-purple-300">{rule.explanationThai}</p>
                <p className="mb-3 text-sm italic text-purple-300/80">{rule.explanationEnglish}</p>
                {rule.pattern && (
                  <p className="mb-3 rounded-xl bg-black/25 px-3 py-2 font-mono text-xs text-purple-200">
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
            <div key={i} className="rounded-3xl border border-amber-400/25 bg-amber-500/10 p-5">
              <p className="font-semibold text-amber-200">{p.patternName}</p>
              <p className="mt-1 text-sm text-purple-200/80">{p.howItAppearsInExamThai}</p>
              {p.signalWords?.length > 0 && (
                <p className="mt-2 text-xs text-amber-300/80">Signal words: {p.signalWords.join(', ')}</p>
              )}
              {p.trapChoices?.length > 0 && (
                <p className="mt-1 text-xs text-rose-300/80">Trap choices: {p.trapChoices.join(' | ')}</p>
              )}
              <p className="mt-2 rounded-xl bg-amber-500/10 p-2 text-xs text-amber-100">{p.examTipThai}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="mistakes" title="Common Thai Student Mistakes">
        <div className="space-y-3">
          {lesson.commonMistakesThaiStudents.map((m, i) => (
            <div key={i} className="rounded-3xl border border-rose-400/25 bg-rose-500/10 p-5">
              <p className="font-semibold text-rose-200">{m.mistake}</p>
              <p className="mt-1 text-sm text-purple-200/80">{m.whyItHappensThai}</p>
              <p className="mt-1 text-sm text-emerald-300">{m.fixThai}</p>
              {m.example && <p className="mt-1 font-mono text-xs text-purple-300">{m.example}</p>}
            </div>
          ))}
        </div>
      </Section>

      {lesson.eliminationStrategiesThai?.length > 0 && (
        <Section id="eliminate" title="Elimination Strategy">
          <ul className="space-y-2 text-sm text-purple-200/80">
            {lesson.eliminationStrategiesThai.map((item, i) => <li key={i} className="flex gap-3"><span className="mt-0.5 text-fuchsia-300">✦</span><span>{item}</span></li>)}
          </ul>
        </Section>
      )}

      <div id="quick" className="grid gap-4 sm:grid-cols-2 scroll-mt-40">
        <Section title="Quick Rules">
          <ul className="space-y-1 text-sm text-purple-200/80">
            {lesson.quickRulesThai.map((r, i) => <li key={i} className="flex gap-3"><span className="mt-0.5 text-fuchsia-300">✦</span><span>{r}</span></li>)}
          </ul>
        </Section>
        <Section title="Memory Tips">
          <ul className="space-y-1 text-sm text-purple-200/80">
            {lesson.memoryTipsThai.map((t, i) => <li key={i} className="flex gap-3"><span className="mt-0.5 text-fuchsia-300">✦</span><span>{t}</span></li>)}
          </ul>
        </Section>
      </div>

      <Section id="checklist" title="Mastery Checklist">
        <ul className="space-y-1 text-sm text-purple-200/80">
          {lesson.masteryChecklist.map((item, i) => <li key={i} className="flex items-start gap-3 rounded-2xl bg-white/[0.03] px-4 py-2.5"><span className="text-emerald-300">☐</span><span>{item}</span></li>)}
        </ul>
      </Section>

      <Section id="related" title={`Related exam questions (${relatedQuestions.length})`}>
        {relatedQuestions.length > 0 ? (
          <div className="space-y-2">
            {relatedQuestions.slice(0, 5).map((q) => (
              <div key={q.id} className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-3 text-sm">
                <div className="flex flex-wrap items-start gap-2">
                  <p className="min-w-0 flex-1 text-purple-100">{q.question}</p>
                  <SpeakButton text={q.question} label="Question" size="sm" />
                </div>
                <p className="mt-1 text-xs text-purple-300/80">{q.fromSetTitle} · {q.skillTag} · {q.difficulty}</p>
              </div>
            ))}
            {relatedQuestions.length > 5 && (
              <p className="text-xs text-purple-300/80">+{relatedQuestions.length - 5} more in the drill.</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-purple-300/80">{lesson.relatedExamLookupNoteThai || 'No direct exam questions are tagged for this topic yet.'}</p>
        )}
      </Section>

      <ComicCoach onNavigate={onNavigate} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => onStartDrill(lesson.id)}
          className="btn btn-primary flex-1"
        >
          Practice This Topic
        </button>
        <button
          onClick={() => onNavigate('grammar')}
          className="flex-1 btn btn-ghost"
        >
          Back to Grammar Hub
        </button>
      </div>
    </div>
  )
}

function Badge({ children }) {
  return <span className="chip">{children}</span>
}

function AnchorLink({ href, children }) {
  return <a href={href} className="whitespace-nowrap rounded-full bg-violet-500/15 px-3.5 py-1.5 font-semibold text-purple-100 transition hover:bg-violet-500/40 hover:text-white">{children}</a>
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="glass scroll-mt-40 rounded-[2rem] p-6 sm:p-7">
      <h2 className="mb-4 flex items-center gap-3 text-xl font-semibold text-white">
        <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-violet-400 to-fuchsia-400" />
        {title}
      </h2>
      {children}
    </section>
  )
}

function Callout({ title, tone, children }) {
  const tones = {
    yellow: 'border-amber-400/25 bg-amber-500/10 text-amber-100',
    red: 'border-rose-400/25 bg-rose-500/10 text-rose-100',
    purple: 'border-violet-400/25 bg-violet-500/10 text-purple-100',
  }
  const icons = { yellow: '🪤', red: '⚠️', purple: '🧠' }
  return (
    <div className={`rounded-3xl border p-5 ${tones[tone] || tones.purple}`}>
      <p className="flex items-center gap-2 font-semibold"><span className="text-xl">{icons[tone] || icons.purple}</span>{title}</p>
      <p className="mt-2 text-sm leading-relaxed opacity-85">{children}</p>
    </div>
  )
}

function ExampleList({ title, examples }) {
  return (
    <div className="mb-3">
      <p className="mb-1 text-xs font-semibold text-emerald-400">{title}</p>
      <ul className="space-y-2">
        {examples.map((ex, j) => (
          <li key={j} className="text-sm">
            <div className="flex flex-wrap items-start gap-2">
              <p className="min-w-0 flex-1 text-purple-100">{ex.sentence}</p>
              <SpeakButton text={ex.sentence} label="Example" size="sm" />
            </div>
            <p className="text-xs text-purple-300/80">{ex.translationThai}</p>
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
      <p className="mb-1 text-xs font-semibold text-rose-400">Wrong examples</p>
      <ul className="space-y-2">
        {examples.map((ex, j) => (
          <li key={j} className="text-sm">
            <div className="flex flex-wrap items-start gap-2">
              <p className="min-w-0 flex-1 text-rose-300 line-through">{ex.sentence}</p>
              <SpeakButton text={ex.sentence} label="Wrong" size="sm" />
            </div>
            <p className="text-emerald-300">→ {ex.correction}</p>
            <p className="text-xs text-purple-300/70">{ex.whyWrongThai}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
