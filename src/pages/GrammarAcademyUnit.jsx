import { useEffect, useState } from 'react'
import { getNextAcademyUnitMeta, getPreviousAcademyUnitMeta, loadAcademyUnit } from '../data/grammarAcademy/index.js'
import { markAcademyUnitComplete, markAcademyUnitStudied } from '../utils/academyProgress'
import SpeakButton from '../components/SpeakButton'
import ComicCoach from '../components/ComicCoach'
import Mascot from '../components/Mascot'
import { PageHeader } from '../components/ui'
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
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center text-purple-200">
        <Mascot character="buffalo" mood="think" size={130} />
        <p className="animate-pulse">ครูหมูกับครูควายกำลังเปิดบทเรียนให้...</p>
      </div>
    )
  }

  if (!state.unit || !state.module) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-purple-300">Academy unit not found.</p>
        <button onClick={() => onNavigate('academy')} className="btn btn-primary">
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
    <div className="space-y-8">
      <button onClick={() => onSelectAcademyUnit(moduleId, null)} className="text-sm font-semibold text-purple-300 transition hover:text-white">
        ← Back to {module.title}
      </button>
      <PageHeader eyebrow={module.title} icon="🎓" title={unit.title} subtitle={unit.titleThai} mood="teach">
        <div className="flex flex-wrap gap-2">
          {unit.relatedSkillTags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
          <Badge>✏️ {unit.miniDrills.length} drill Q</Badge>
        </div>
      </PageHeader>

      <nav className="sticky top-[4.5rem] z-40 rounded-3xl border border-white/10 bg-ink/80 p-3 shadow-xl shadow-black/30 backdrop-blur-xl">
        <div className="flex gap-2 overflow-x-auto text-xs">
          <Anchor href="#explain">Explain</Anchor>
          <Anchor href="#patterns">Patterns</Anchor>
          <Anchor href="#examples">Examples</Anchor>
          <Anchor href="#traps">Traps</Anchor>
          <Anchor href="#tips">Tips</Anchor>
          <Anchor href="#drill">Mini drill</Anchor>
        </div>
      </nav>

      <Section id="explain" title="ตัวแม่อธิบายให้">
        <p className="whitespace-pre-line text-[15px] leading-relaxed text-purple-100/85">{unit.deepExplanationThai}</p>
        <p className="mt-4 rounded-3xl border border-white/[0.08] bg-white/[0.04] p-5 text-[15px] leading-relaxed text-purple-100/85">{unit.explanationEnglish}</p>
      </Section>

      <Section id="patterns" title="Grammar Patterns">
        <div className="space-y-3">
          {unit.grammarPatterns.map((pattern) => (
            <div key={pattern.name} className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-5">
              <p className="font-semibold text-purple-100">{pattern.name}</p>
              <p className="mt-2 rounded-xl bg-black/25 px-3 py-2 font-mono text-xs text-purple-200">{pattern.pattern}</p>
              <p className="mt-2 text-sm text-purple-300/85">{pattern.explanationThai}</p>
              <p className="mt-2 text-xs text-purple-300/80">Example: {pattern.examples?.[0]}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="examples" title="Correct Examples">
        <div className="space-y-3">
          {unit.correctExamples.map((example, index) => (
            <div key={index} className="rounded-3xl border border-emerald-400/25 bg-emerald-500/10 p-5">
              <div className="flex flex-wrap items-start gap-2">
                <p className="min-w-0 flex-1 text-sm font-semibold text-emerald-200">{example.sentence}</p>
                <SpeakButton text={example.sentence} label="Example" size="sm" />
              </div>
              <p className="mt-1 text-xs text-purple-300">{example.translationThai}</p>
              <p className="mt-1 text-xs text-emerald-100/80">{example.noteThai}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Wrong Examples">
        <div className="space-y-3">
          {unit.wrongExamples.map((example, index) => (
            <div key={index} className="rounded-3xl border border-rose-400/25 bg-rose-500/10 p-5">
              <div className="flex flex-wrap items-start gap-2">
                <p className="min-w-0 flex-1 text-sm text-rose-300 line-through">{example.sentence}</p>
                <SpeakButton text={example.sentence} label="Wrong" size="sm" />
              </div>
              <div className="mt-1 flex flex-wrap items-start gap-2">
                <p className="min-w-0 flex-1 text-sm font-semibold text-emerald-300">{example.correction}</p>
                <SpeakButton text={example.correction} label="Correction" size="sm" />
              </div>
              <p className="mt-1 text-xs text-purple-300">{example.whyWrongThai}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="traps" title="Exam Traps">
        <div className="grid gap-4 sm:grid-cols-2">
          {unit.examTraps.map((trap) => (
            <div key={trap.trapTitle} className="rounded-3xl border border-amber-400/25 bg-amber-500/10 p-5">
              <p className="font-semibold text-amber-200">{trap.trapTitle}</p>
              <p className="mt-1 text-sm text-purple-200/85">{trap.trapThai}</p>
              <p className="mt-2 text-xs text-amber-100">{trap.examTipThai}</p>
            </div>
          ))}
        </div>
      </Section>

      <div id="tips" className="grid gap-4 sm:grid-cols-2 scroll-mt-40">
        <Section title="Funny Memory Tips">
          <ul className="space-y-2 text-sm text-purple-200/85">
            {unit.funnyMemoryTips.map((tip) => <li key={tip} className="flex gap-3"><span className="mt-0.5 text-fuchsia-300">✦</span><span>{tip}</span></li>)}
          </ul>
        </Section>
        <Section title="Thai Student Mistakes">
          <ul className="space-y-3 text-sm text-purple-200/85">
            {unit.thaiStudentCommonMistakes.map((mistake) => (
              <li key={mistake.mistake}>
                <span className="font-semibold text-rose-200">{mistake.mistake}</span>
                <br />
                {mistake.fixThai}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Step-by-step Solve">
        <ol className="space-y-3 text-[15px] text-purple-100/85">
          {unit.stepByStepHowToSolve.map((step, index) => <li key={step} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold text-white">{index + 1}</span><span className="pt-0.5">{step}</span></li>)}
        </ol>
      </Section>

      <Section id="drill" title="Mini Drill Preview">
        <div className="space-y-3">
          {unit.miniDrills.map((question, index) => (
            <div key={question.question} className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-start gap-2">
                <p className="min-w-0 flex-1 text-sm font-semibold text-purple-100">{index + 1}. {question.question}</p>
                <SpeakButton text={question.question} label="Question" size="sm" />
              </div>
              <p className="mt-2 text-xs text-purple-300/80">4 choices พร้อมเฉลยละเอียดในโหมด Drill</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Mastery Checklist">
        <ul className="space-y-2 text-sm text-purple-200/85">
          {unit.masteryChecklist.map((item) => <li key={item} className="flex items-start gap-3 rounded-2xl bg-white/[0.03] px-4 py-2.5"><span className="text-emerald-300">☐</span><span>{item}</span></li>)}
        </ul>
      </Section>

      <ComicCoach onNavigate={onNavigate} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <button onClick={() => onStartAcademyDrill(moduleId, unitId)} className="btn btn-primary flex-1">
          Start Academy Drill
        </button>
        <button onClick={completeUnit} className="btn btn-success flex-1">
          Mark Complete and Continue
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {previousUnit && (
          <button onClick={() => onSelectAcademyUnit(previousUnit.moduleId, previousUnit.id)} className="btn btn-ghost flex-1 text-sm">
            Previous Unit
          </button>
        )}
        {nextUnit && (
          <button onClick={() => onSelectAcademyUnit(nextUnit.moduleId, nextUnit.id)} className="btn btn-ghost flex-1 text-sm">
            Next Unit
          </button>
        )}
        <button onClick={() => onNavigate('academy')} className="btn btn-ghost flex-1 text-sm">
          Back to Academy
        </button>
      </div>
    </div>
  )
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

function Anchor({ href, children }) {
  return <a href={href} className="whitespace-nowrap rounded-full bg-violet-500/15 px-3.5 py-1.5 font-semibold text-purple-100 transition hover:bg-violet-500/40 hover:text-white">{children}</a>
}

function Badge({ children }) {
  return <span className="chip">{children}</span>
}
