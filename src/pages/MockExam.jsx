import { useState, useRef, useEffect } from 'react'
import { getExamSet } from '../data/examSets/index.js'
import QuestionCard from '../components/QuestionCard'
import Timer from '../components/Timer'
import ConfirmModal from '../components/ConfirmModal'
import { calculateScore } from '../utils/scoring'
import { analyzeWeakSkills } from '../utils/analysis'
import { saveAttempt } from '../utils/storage'
import { shuffleExam } from '../utils/shuffle'
import { getPassageForQuestion, getPassageTitle } from '../utils/passage'

export default function MockExam({ selectedSetId, onNavigate, onExamStart, onExamEnd }) {
  const examSet = getExamSet(selectedSetId)
  const allQuestions = examSet?.questions || []

  // Shuffle once on mount
  const [examQuestions] = useState(() => shuffleExam(allQuestions))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [finalTimeUsed, setFinalTimeUsed] = useState(0)
  const elapsedRef = useRef(0)
  const questionAreaRef = useRef(null)

  const timeLimitMinutes = examSet?.timeLimitMinutes || 60

  // Signal exam start on mount
  useEffect(() => {
    if (onExamStart) onExamStart()
  }, [])

  // beforeunload guard
  useEffect(() => {
    if (submitted) return
    const handleBeforeUnload = (e) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [submitted])

  const currentQuestion = examQuestions[currentIndex]

  const scrollToTop = () => {
    if (questionAreaRef.current) {
      questionAreaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSelect = (choice) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: choice }))
  }

  const handleElapsedChange = (elapsed) => { elapsedRef.current = elapsed }

  const goToQuestion = (idx) => {
    setCurrentIndex(idx)
    setTimeout(scrollToTop, 50)
  }

  const doSubmit = () => {
    if (submitted) return
    const result = calculateScore(examQuestions, answers)
    const { weak } = analyzeWeakSkills(result.details)

    const attempt = {
      id: `attempt-${Date.now()}`,
      date: new Date().toISOString(),
      setId: selectedSetId,
      setTitle: examSet?.title || selectedSetId,
      score: result,
      answers,
      weakSkills: weak,
      timeUsedSeconds: elapsedRef.current,
      shuffledQuestions: examQuestions.map((q) => ({ id: q.id, choices: q.choices })),
    }

    saveAttempt(attempt)
    setScore(result)
    setFinalTimeUsed(elapsedRef.current)
    setSubmitted(true)
    setShowConfirm(false)
    if (onExamEnd) onExamEnd()
  }

  const handleSubmitClick = () => { setShowConfirm(true) }
  const handleTimeUp = () => { doSubmit() }

  const answeredCount = Object.keys(answers).length
  const unansweredCount = examQuestions.length - answeredCount

  const confirmMessage = unansweredCount > 0
    ? `You have ${unansweredCount} unanswered question${unansweredCount > 1 ? 's' : ''}. Are you sure you want to submit?`
    : 'Submit your exam now?'

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}m ${s}s`
  }

  if (!examSet) {
    return (
      <div className="text-center text-purple-300">
        <p>Exam set not found. Please select a valid set from the Dashboard.</p>
        <button onClick={() => onNavigate('dashboard')} className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-white">Go to Dashboard</button>
      </div>
    )
  }

  if (submitted && score) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-purple-100">✅ Exam Submitted!</h2>
        <p className="text-sm text-purple-400">{examSet.title}</p>
        <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-6 text-center">
          <p className="text-4xl font-bold text-purple-100">{score.percentage}%</p>
          <p className="mt-2 text-purple-300">{score.total}/{score.totalQuestions} correct</p>
          <p className="mt-1 text-sm text-purple-400">Grammar: {score.grammar}/{score.grammarQuestions} | Reading: {score.reading}/{score.readingQuestions}</p>
          <p className="mt-2 text-sm text-purple-400">⏱ Time used: {formatTime(finalTimeUsed)}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onNavigate('results')} className="flex-1 rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-500">View Detailed Results</button>
          <button onClick={() => onNavigate('dashboard')} className="flex-1 rounded-xl border border-purple-600 px-4 py-3 font-semibold text-purple-200 transition hover:bg-purple-900/40">Back to Dashboard</button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4" ref={questionAreaRef}>
      {showConfirm && (
        <ConfirmModal title="Submit Exam" message={confirmMessage} onConfirm={doSubmit} onCancel={() => setShowConfirm(false)} />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-purple-100">📝 Mock Exam</h2>
          <p className="text-xs text-purple-400">{examSet.title}</p>
        </div>
        <Timer durationMinutes={timeLimitMinutes} onTimeUp={handleTimeUp} onElapsedChange={handleElapsedChange} />
      </div>

      <div className="flex items-center justify-between text-sm text-purple-300">
        <span>Question {currentIndex + 1} of {examQuestions.length}</span>
        <span>{answeredCount}/{examQuestions.length} answered</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-purple-900/50">
        <div className="h-full rounded-full bg-purple-500 transition-all" style={{ width: `${((currentIndex + 1) / examQuestions.length) * 100}%` }} />
      </div>

      <div className="flex flex-wrap gap-2">
        {examQuestions.map((q, idx) => (
          <button key={q.id} onClick={() => goToQuestion(idx)} className={`h-8 w-8 rounded-md text-xs font-bold transition ${idx === currentIndex ? 'bg-purple-500 text-white' : answers[q.id] ? 'bg-purple-700/60 text-purple-200' : 'bg-purple-900/40 text-purple-400'}`}>
            {idx + 1}
          </button>
        ))}
      </div>

      {currentQuestion && (() => {
        const passage = getPassageForQuestion(currentQuestion, allQuestions)
        const title = getPassageTitle(currentQuestion, allQuestions)
        if (!passage) return null
        return (
          <div className="sticky top-16 z-10 rounded-lg border border-purple-700/30 bg-purple-950/95 backdrop-blur">
            <details open>
              <summary className="cursor-pointer p-3 text-xs font-semibold uppercase tracking-wide text-purple-400">
                📚 {title || (currentQuestion.section === 'Grammar' ? 'Grammar Passage' : 'Reading Passage')} (click to show/hide)
              </summary>
              <div className="border-t border-purple-700/30 p-4 text-sm leading-relaxed text-purple-200/80 whitespace-pre-line">
                {passage}
              </div>
            </details>
          </div>
        )
      })()}

      <QuestionCard question={{ ...currentQuestion, passage: '' }} selectedAnswer={answers[currentQuestion.id]} onSelect={handleSelect} showResult={false} questionNumber={currentIndex + 1} hideSkillTag={true} />

      <div className="flex gap-3">
        <button onClick={() => goToQuestion(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} className="flex-1 rounded-lg border border-purple-600 px-4 py-2 font-semibold text-purple-200 transition hover:bg-purple-900/40 disabled:opacity-30">← Previous</button>
        {currentIndex < examQuestions.length - 1 ? (
          <button onClick={() => goToQuestion(currentIndex + 1)} className="flex-1 rounded-lg bg-purple-700 px-4 py-2 font-semibold text-white transition hover:bg-purple-600">Next →</button>
        ) : (
          <button onClick={handleSubmitClick} className="flex-1 rounded-lg bg-green-700 px-4 py-2 font-semibold text-white transition hover:bg-green-600">Submit Exam ✓</button>
        )}
      </div>

      {currentIndex < examQuestions.length - 1 && answeredCount === examQuestions.length && (
        <button onClick={handleSubmitClick} className="w-full rounded-lg bg-green-700/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600">All answered — Submit Early ✓</button>
      )}
    </div>
  )
}
