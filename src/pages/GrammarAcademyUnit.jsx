import { useEffect, useState } from 'react'
import { getNextAcademyUnitMeta, getPreviousAcademyUnitMeta, loadAcademyUnit } from '../data/grammarAcademy/index.js'
import { markAcademyUnitComplete, markAcademyUnitStudied } from '../utils/academyProgress'
import SpeakButton from '../components/SpeakButton'
import ComicCoach from '../components/ComicCoach'
import { recordGrammarLessonCompleted } from '../utils/localStats'
import { sendLearningEvent } from '../utils/globalStats'

export default function GrammarAcademyUnit({ moduleId, unitId, onNavigate, onSelectAcademyUnit, onStartAcademyDrill }) {
  const [state, setState] = useState({ loading: true, module: null, unit: null })
  const nextUnit = getNextAcademyUnitMeta(moduleId, unitId)
  const previousUnit = getPreviousAcademyUnitMeta(moduleId, unitId)

  useEffect(() => {
    let active = true
    loadAcademyUnit(moduleId, unitId).then(({ module, unit }) => {
      if (!active) return
      setState({ loading: false, module, unit })
      if (unit) markAcademyUnitStudied(moduleId, unitId)
    })
    return () => {
      active = false
    }
  }, [moduleId, unitId])

  if (state.loading) {
    return <p className="py-12 text-center text-purple-300">กำลังเปิดบทเรียนตัวแม่...</p>
  }

  if (!state.unit || !state.module) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-purple-300">Academy unit not found.</p>
        <button onClick={() => onNavigate('academy')} className="rounded-lg bg-purple-600 px-4 py-2 text-white">
          Back to Academy
        </button>
      </div>
    )
  }

  const { module, unit } = state

  const completeUnit = () => {
    markAcademyUnitComplete(moduleId, unitId)
    recordGrammarLessonCompleted(unitId)
    sendLearningEvent('grammar_lesson_completed', { lessonId: unitId })
    if (nextUnit) onSelectAcademyUnit(nextUnit.moduleId, nextUnit.id)
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <button onClick={() => onSelectAcademyUnit(moduleId, null)} className="text-sm text-purple-400 underline transition hover:text-purple-200">
          Back to {module.title}
        </button>
        <p className="text-xs uppercase tracking-wide text-purple-400">{module.title}</p>
        <h1 className="text-3xl font-bold text-purple-100">{unit.title}</h1>
        <p className="text-purple-300">{unit.titleThai}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          {unit.relatedSkillTags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
          <Badge>{unit.miniDrills.length} drill Q</Badge>
        </div>
      </header>

      <nav className="sticky top-16 z-40 rounded-lg border border-purple-700/40 bg-[#1a0a2e]/95 p-3 backdrop-blur">
        <div className="flex flex-wrap gap-2 text-xs">
          <Anchor href="#explain">Explain</Anchor>
          <Anchor href="#patterns">Patterns</Anchor>
          <Anchor href="#examples">Examples</Anchor>
          <Anchor href="#traps">Traps</Anchor>
          <Anchor href="#tips">Tips</Anchor>
          <Anchor href="#drill">Mini drill</Anchor>
        </div>
      </nav>

      <Section id="explain" title="ตัวแม่อธิบายให้">
        <p className="whitespace-pre-line text-sm leading-relaxed text-purple-200/85">{unit.deepExplanationThai}</p>
        <p className="mt-4 rounded-lg border border-purple-700/40 bg-purple-900/20 p-4 text-sm leading-relaxed text-purple-200/80">{unit.explanationEnglish}</p>
      </Section>

      <Section id="patterns" title="Grammar Patterns">
        <div className="space-y-3">
          {unit.grammarPatterns.map((pattern) => (
            <div key={pattern.name} className="rounded-lg border border-purple-700/40 bg-purple-900/20 p-4">
              <p className="font-semibold text-purple-100">{pattern.name}</p>
              <p className="mt-2 rounded bg-purple-950/60 px-3 py-2 font-mono text-xs text-purple-200">{pattern.pattern}</p>
              <p className="mt-2 text-sm text-purple-300/85">{pattern.explanationThai}</p>
              <p className="mt-2 text-xs text-purple-400">Example: {pattern.examples?.[0]}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="examples" title="Correct Examples">
        <div className="space-y-3">
          {unit.correctExamples.map((example, index) => (
            <div key={index} className="rounded-lg border border-green-700/30 bg-green-900/10 p-4">
              <div className="flex flex-wrap items-start gap-2">
                <p className="min-w-0 flex-1 text-sm font-semibold text-green-200">{example.sentence}</p>
                <SpeakButton text={example.sentence} label="Example" size="sm" />
              </div>
              <p className="mt-1 text-xs text-purple-300">{example.translationThai}</p>
              <p className="mt-1 text-xs text-green-100/80">{example.noteThai}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Wrong Examples">
        <div className="space-y-3">
          {unit.wrongExamples.map((example, index) => (
            <div key={index} className="rounded-lg border border-red-700/30 bg-red-900/10 p-4">
              <div className="flex flex-wrap items-start gap-2">
                <p className="min-w-0 flex-1 text-sm text-red-300 line-through">{example.sentence}</p>
                <SpeakButton text={example.sentence} label="Wrong" size="sm" />
              </div>
              <div className="mt-1 flex flex-wrap items-start gap-2">
                <p className="min-w-0 flex-1 text-sm font-semibold text-green-300">{example.correction}</p>
                <SpeakButton text={example.correction} label="Correction" size="sm" />
              </div>
              <p className="mt-1 text-xs text-purple-300">{example.whyWrongThai}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="traps" title="Exam Traps">
        <div className="grid gap-3 sm:grid-cols-2">
          {unit.examTraps.map((trap) => (
            <div key={trap.trapTitle} className="rounded-lg border border-yellow-700/30 bg-yellow-900/10 p-4">
              <p className="font-semibold text-yellow-200">{trap.trapTitle}</p>
              <p className="mt-1 text-sm text-purple-200/85">{trap.trapThai}</p>
              <p className="mt-2 text-xs text-yellow-100">{trap.examTipThai}</p>
            </div>
          ))}
        </div>
      </Section>

      <div id="tips" className="grid gap-4 sm:grid-cols-2 scroll-mt-24">
        <Section title="Funny Memory Tips">
          <ul className="space-y-2 text-sm text-purple-200/85">
            {unit.funnyMemoryTips.map((tip) => <li key={tip}>- {tip}</li>)}
          </ul>
        </Section>
        <Section title="Thai Student Mistakes">
          <ul className="space-y-3 text-sm text-purple-200/85">
            {unit.thaiStudentCommonMistakes.map((mistake) => (
              <li key={mistake.mistake}>
                <span className="font-semibold text-red-200">{mistake.mistake}</span>
                <br />
                {mistake.fixThai}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Step-by-step Solve">
        <ol className="space-y-2 text-sm text-purple-200/85">
          {unit.stepByStepHowToSolve.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}
        </ol>
      </Section>

      <Section id="drill" title="Mini Drill Preview">
        <div className="space-y-3">
          {unit.miniDrills.map((question, index) => (
            <div key={question.question} className="rounded-lg border border-purple-700/40 bg-purple-900/10 p-4">
              <div className="flex flex-wrap items-start gap-2">
                <p className="min-w-0 flex-1 text-sm font-semibold text-purple-100">{index + 1}. {question.question}</p>
                <SpeakButton text={question.question} label="Question" size="sm" />
              </div>
              <p className="mt-2 text-xs text-purple-400">4 choices พร้อมเฉลยละเอียดในโหมด Drill</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Mastery Checklist">
        <ul className="space-y-2 text-sm text-purple-200/85">
          {unit.masteryChecklist.map((item) => <li key={item}>☐ {item}</li>)}
        </ul>
      </Section>

      <ComicCoach onNavigate={onNavigate} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <button onClick={() => onStartAcademyDrill(moduleId, unitId)} className="flex-1 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-500">
          Start Academy Drill
        </button>
        <button onClick={completeUnit} className="flex-1 rounded-xl border border-green-600 px-5 py-3 font-semibold text-green-200 transition hover:bg-green-900/30">
          Mark Complete and Continue
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {previousUnit && (
          <button onClick={() => onSelectAcademyUnit(previousUnit.moduleId, previousUnit.id)} className="flex-1 rounded-lg border border-purple-700 px-4 py-2 text-sm text-purple-200 transition hover:bg-purple-900/40">
            Previous Unit
          </button>
        )}
        {nextUnit && (
          <button onClick={() => onSelectAcademyUnit(nextUnit.moduleId, nextUnit.id)} className="flex-1 rounded-lg border border-purple-700 px-4 py-2 text-sm text-purple-200 transition hover:bg-purple-900/40">
            Next Unit
          </button>
        )}
        <button onClick={() => onNavigate('academy')} className="flex-1 rounded-lg border border-purple-700 px-4 py-2 text-sm text-purple-200 transition hover:bg-purple-900/40">
          Back to Academy
        </button>
      </div>
    </div>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-3 text-lg font-semibold text-purple-200">{title}</h2>
      {children}
    </section>
  )
}

function Anchor({ href, children }) {
  return <a href={href} className="rounded-full bg-purple-900/60 px-3 py-1 text-purple-200 transition hover:bg-purple-700">{children}</a>
}

function Badge({ children }) {
  return <span className="rounded-full bg-purple-800/50 px-3 py-1 text-purple-200">{children}</span>
}
