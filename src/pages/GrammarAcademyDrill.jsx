import { useEffect, useState } from 'react'
import { loadAcademyUnit } from '../data/grammarAcademy/index.js'
import SpeakButton from '../components/SpeakButton'
import Mascot from '../components/Mascot'
import { Confetti, ProgressRing } from '../components/ui'
import { recordAcademyDrillAttempt } from '../utils/academyProgress'
import { recordGrammarDrillCompleted, recordQuestionAnswered } from '../utils/localStats'
import { sendLearningEvent } from '../utils/globalStats'

export default function GrammarAcademyDrill({ moduleId, unitId, onNavigate, onSelectAcademyUnit }) {
  const [state, setState] = useState({ loading: true, module: null, unit: null })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    let active = true
    loadAcademyUnit(moduleId, unitId).then(({ module, unit }) => {
      if (!active) return
      setState({ loading: false, module, unit })
      setCurrentIndex(0)
      setAnswers({})
      setFinished(false)
    })
    return () => {
      active = false
    }
  }, [moduleId, unitId])

  if (state.loading) {
    return <p className="py-12 text-center text-purple-300">กำลังเปิด Academy Drill...</p>
  }

  if (!state.unit || !state.module) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-purple-300">Academy drill not found.</p>
        <button onClick={() => onNavigate('academy')} className="btn btn-primary">
          Back to Academy
        </button>
      </div>
    )
  }

  const { module, unit } = state
  const questions = unit.miniDrills
  const currentQuestion = questions[currentIndex]
  const selectedAnswer = answers[currentIndex]
  const showResult = Boolean(selectedAnswer)
  const score = questions.reduce((sum, question, index) => sum + (answers[index] === question.correctAnswer ? 1 : 0), 0)
  const isLast = currentIndex === questions.length - 1

  const selectAnswer = (choice) => {
    if (selectedAnswer) return
    recordQuestionAnswered(currentQuestion.skillTag, choice === currentQuestion.correctAnswer)
    sendLearningEvent('question_answered', { skillTag: currentQuestion.skillTag })
    setAnswers((current) => ({ ...current, [currentIndex]: choice }))
  }

  const finishDrill = () => {
    const wrongTopics = questions
      .filter((question, index) => answers[index] !== question.correctAnswer)
      .map((question) => question.skillTag)
      .filter(Boolean)
    const percentage = Math.round((score / questions.length) * 100)
    recordAcademyDrillAttempt(moduleId, unitId, score, questions.length, wrongTopics)
    recordGrammarDrillCompleted(unitId, percentage)
    sendLearningEvent('grammar_drill_completed', { lessonId: unitId, score: percentage })
    setFinished(true)
  }

  const nextQuestion = () => {
    if (isLast) {
      finishDrill()
    } else {
      setCurrentIndex((index) => index + 1)
    }
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="space-y-8 text-center">
        {percentage >= 80 && <Confetti />}
        <p className="eyebrow justify-center">🎓 Academy Drill Complete</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">{percentage >= 80 ? 'เยี่ยมไปเลย!' : percentage >= 50 ? 'ดีมาก ไปต่อกัน!' : 'ไม่เป็นไร ลองใหม่อีกรอบนะ'}</h1>
        <p className="text-purple-300">{module.title} / {unit.title}</p>
        <div className="glass flex flex-col items-center justify-center gap-6 rounded-[2rem] p-8 sm:flex-row">
          <ProgressRing percent={percentage} size={170}>
            <p className="font-display text-4xl font-semibold text-white">{score}/{questions.length}</p>
            <p className="text-sm text-purple-300">{percentage}%</p>
          </ProgressRing>
          <Mascot mood={percentage >= 80 ? 'cheer' : percentage >= 50 ? 'happy' : 'oops'} size={140} />
        </div>
        <p className="text-xs text-purple-300/80">บันทึกคะแนนลง localStorage แล้ว ใช้งานแบบ Guest ได้เต็มระบบ</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button onClick={() => { setCurrentIndex(0); setAnswers({}); setFinished(false) }} className="flex-1 btn btn-primary">
            Retry Drill
          </button>
          <button onClick={() => onSelectAcademyUnit(moduleId, unitId)} className="flex-1 btn btn-ghost">
            Review Unit
          </button>
          <button onClick={() => onNavigate('academy')} className="flex-1 btn btn-ghost">
            Back to Academy
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="glass rounded-[2rem] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">🎓 {module.title}</p>
            <h1 className="mt-1 text-2xl font-semibold text-white">{unit.title} Drill</h1>
          </div>
          <div className="flex gap-2">
            <span className="chip">ข้อ {currentIndex + 1}/{questions.length}</span>
            <span className="chip">⭐ {score}</span>
          </div>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 transition-all duration-500" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>
      </header>

      <div className="glass rounded-[1.75rem] p-5 sm:p-8">
        <div className="mb-4 flex flex-wrap items-start gap-2">
          <p className="min-w-0 flex-1 text-lg font-medium leading-relaxed text-white sm:text-xl">{currentQuestion.question}</p>
          <SpeakButton text={currentQuestion.question} label="Question" variant="button" size="sm" />
        </div>
        <div className="space-y-3">
          {currentQuestion.choices.map((choice) => {
            const isSelected = selectedAnswer === choice
            const isCorrect = currentQuestion.correctAnswer === choice
            let classes = 'border-white/[0.08] bg-white/[0.03] hover:border-violet-400/50'
            if (showResult && isCorrect) classes = 'border-emerald-400/80 bg-emerald-500/15 animate-pop'
            if (showResult && isSelected && !isCorrect) classes = 'border-rose-400/80 bg-rose-500/15 animate-shake'
            return (
              <div key={choice} className="flex items-stretch gap-2">
                <button
                  onClick={() => selectAnswer(choice)}
                  disabled={showResult}
                  className={`min-w-0 flex-1 rounded-2xl border px-4 py-3.5 text-left text-white transition ${classes}`}
                >
                  {choice}
                  {showResult && isCorrect && <span className="ml-2 text-xs font-bold text-emerald-300">✓ ถูกต้อง</span>}
                  {showResult && isSelected && !isCorrect && <span className="ml-2 text-xs font-bold text-rose-300">✕ คำตอบของคุณ</span>}
                </button>
                <SpeakButton text={choice} label="Choice" size="sm" />
              </div>
            )
          })}
        </div>
      </div>

      {showResult && (
        <div className={`flex animate-pop flex-col gap-4 rounded-3xl border p-5 sm:flex-row sm:items-center ${selectedAnswer === currentQuestion.correctAnswer ? 'border-emerald-400/30 bg-emerald-500/10' : 'border-rose-400/30 bg-rose-500/10'}`}>
          <Mascot mood={selectedAnswer === currentQuestion.correctAnswer ? 'cheer' : 'oops'} size={80} className="shrink-0 self-center" />
          <div>
            <p className={`font-display text-lg font-semibold ${selectedAnswer === currentQuestion.correctAnswer ? 'text-emerald-200' : 'text-rose-200'}`}>
              {selectedAnswer === currentQuestion.correctAnswer ? 'ถูกต้อง ตัวแม่ยิ้มแล้ว 🎉' : `คำตอบที่ถูกคือ ${currentQuestion.correctAnswer}`}
            </p>
            <p className="mt-1 text-[15px] leading-relaxed text-purple-100/85">{currentQuestion.explanationThai}</p>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {showResult && (
          <button onClick={nextQuestion} className="flex-1 btn btn-primary">
            {isLast ? 'Finish Drill' : 'Next Question'}
          </button>
        )}
        <button onClick={() => onSelectAcademyUnit(moduleId, unitId)} className="btn btn-ghost text-sm">
          Exit
        </button>
      </div>
    </div>
  )
}
