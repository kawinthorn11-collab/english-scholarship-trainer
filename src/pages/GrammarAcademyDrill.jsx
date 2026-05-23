import { useEffect, useState } from 'react'
import { loadAcademyUnit } from '../data/grammarAcademy/index.js'
import SpeakButton from '../components/SpeakButton'
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
        <button onClick={() => onNavigate('academy')} className="rounded-lg bg-purple-600 px-4 py-2 text-white">
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
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold text-purple-100">Academy Drill Complete</h1>
        <p className="text-purple-300">{module.title} / {unit.title}</p>
        <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-6">
          <p className="text-5xl font-bold text-purple-100">{score}/{questions.length}</p>
          <p className="mt-2 text-lg text-purple-300">{percentage}%</p>
          <p className="mt-2 text-xs text-purple-400">บันทึกคะแนนลง localStorage แล้ว ใช้งานแบบ Guest ได้เต็มระบบ</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button onClick={() => { setCurrentIndex(0); setAnswers({}); setFinished(false) }} className="flex-1 rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-500">
            Retry Drill
          </button>
          <button onClick={() => onSelectAcademyUnit(moduleId, unitId)} className="flex-1 rounded-xl border border-purple-600 px-4 py-3 font-semibold text-purple-200 transition hover:bg-purple-900/40">
            Review Unit
          </button>
          <button onClick={() => onNavigate('academy')} className="flex-1 rounded-xl border border-purple-600 px-4 py-3 font-semibold text-purple-200 transition hover:bg-purple-900/40">
            Back to Academy
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs uppercase tracking-wide text-purple-400">{module.title}</p>
        <h1 className="text-2xl font-bold text-purple-100">{unit.title} Drill</h1>
        <p className="text-xs text-purple-400">Question {currentIndex + 1} of {questions.length} / Score {score}</p>
      </header>

      <div className="h-2 overflow-hidden rounded-full bg-purple-950">
        <div className="h-full rounded-full bg-purple-500 transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-5">
        <div className="mb-4 flex flex-wrap items-start gap-2">
          <p className="min-w-0 flex-1 text-lg font-semibold text-purple-100">{currentQuestion.question}</p>
          <SpeakButton text={currentQuestion.question} label="Question" variant="button" size="sm" />
        </div>
        <div className="space-y-2">
          {currentQuestion.choices.map((choice) => {
            const isSelected = selectedAnswer === choice
            const isCorrect = currentQuestion.correctAnswer === choice
            let classes = 'border-purple-700/40 bg-purple-900/10 hover:border-purple-500/60'
            if (showResult && isCorrect) classes = 'border-green-500 bg-green-900/30'
            if (showResult && isSelected && !isCorrect) classes = 'border-red-500 bg-red-900/30'
            return (
              <div key={choice} className="flex items-stretch gap-2">
                <button
                  onClick={() => selectAnswer(choice)}
                  disabled={showResult}
                  className={`min-w-0 flex-1 rounded-lg border p-3 text-left text-purple-100 transition ${classes}`}
                >
                  {choice}
                  {showResult && isCorrect && <span className="ml-2 text-green-300">correct</span>}
                  {showResult && isSelected && !isCorrect && <span className="ml-2 text-red-300">wrong</span>}
                </button>
                <SpeakButton text={choice} label="Choice" size="sm" />
              </div>
            )
          })}
        </div>
      </div>

      {showResult && (
        <div className="rounded-lg border border-purple-700/40 bg-purple-950/60 p-4">
          <p className={`font-semibold ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-300' : 'text-red-300'}`}>
            {selectedAnswer === currentQuestion.correctAnswer ? 'ถูกต้อง ตัวแม่ยิ้มแล้ว' : `คำตอบที่ถูกคือ ${currentQuestion.correctAnswer}`}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-purple-200/85">{currentQuestion.explanationThai}</p>
        </div>
      )}

      <div className="flex gap-3">
        {showResult && (
          <button onClick={nextQuestion} className="flex-1 rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-500">
            {isLast ? 'Finish Drill' : 'Next Question'}
          </button>
        )}
        <button onClick={() => onSelectAcademyUnit(moduleId, unitId)} className="rounded-lg border border-purple-600 px-4 py-3 text-sm font-semibold text-purple-200 transition hover:bg-purple-900/40">
          Exit
        </button>
      </div>
    </div>
  )
}
