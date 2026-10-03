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
import SpeakButton from '../components/SpeakButton'
import { recordExamCompleted, recordExamStarted, recordQuestionAnswered } from '../utils/localStats'
import { sendLearningEvent } from '../utils/globalStats'
import Mascot from '../components/Mascot'
import ResultSummary from '../components/ResultSummary'

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
  const startedRef = useRef(false)
  const elapsedRef = useRef(0)
  const questionAreaRef = useRef(null)

  const timeLimitMinutes = examSet?.timeLimitMinutes || 60

  // Signal exam start on mount
  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    if (onExamStart) onExamStart()
    recordExamStarted()
    sendLearningEvent('exam_started', { examSetId: selectedSetId })
  }, [onExamStart, selectedSetId])

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
    recordExamCompleted(result.percentage)
    result.details.forEach((detail) => {
      recordQuestionAnswered(detail.skillTag, detail.isCorrect)
      sendLearningEvent('question_answered', { skillTag: detail.skillTag })
    })
    sendLearningEvent('exam_completed', {
      examSetId: selectedSetId,
      score: result.percentage,
    })
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
      <div className="glass mx-auto max-w-md space-y-4 rounded-[2rem] p-8 text-center text-purple-200">
        <Mascot mood="oops" size={130} className="mx-auto" />
        <p>Exam set not found. Please select a valid set from the Dashboard.</p>
        <button onClick={() => onNavigate('dashboard')} className="btn btn-primary">Go to Dashboard</button>
      </div>
    )
  }

  if (submitted && score) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <p className="eyebrow justify-center">✅ Exam Submitted</p>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">ส่งข้อสอบเรียบร้อย!</h1>
          <p className="mt-2 text-sm text-purple-300/80">{examSet.title} · ⏱ ใช้เวลา {formatTime(finalTimeUsed)}</p>
        </div>
        <ResultSummary score={score} />
        <div className="flex flex-col gap-3 sm:flex-row">
          <button onClick={() => onNavigate('results')} className="btn btn-primary flex-1 py-4">ดูเฉลยละเอียด →</button>
          <button onClick={() => onNavigate('dashboard')} className="btn btn-ghost flex-1 py-4">กลับ Dashboard</button>
        </div>
      </div>
    )
  }

  const progressPct = examQuestions.length ? (answeredCount / examQuestions.length) * 100 : 0

  return (
    <div className="space-y-6" ref={questionAreaRef}>
      {showConfirm && (
        <ConfirmModal title="ส่งข้อสอบ?" message={confirmMessage} confirmLabel="ส่งข้อสอบ" cancelLabel="ทำต่อ" onConfirm={doSubmit} onCancel={() => setShowConfirm(false)} />
      )}

      <div className="glass rounded-[2rem] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-2xl shadow-lg shadow-fuchsia-900/30">📝</span>
            <div>
              <h1 className="text-xl font-semibold text-white">Mock Exam</h1>
              <p className="text-xs text-purple-300/80">{examSet.title}</p>
            </div>
          </div>
          <Timer durationMinutes={timeLimitMinutes} onTimeUp={handleTimeUp} onElapsedChange={handleElapsedChange} />
        </div>

        <div className="mt-5 flex items-center justify-between text-sm text-purple-200/90">
          <span>ข้อ <b className="text-white">{currentIndex + 1}</b> / {examQuestions.length}</span>
          <span>ตอบแล้ว <b className="text-white">{answeredCount}</b> / {examQuestions.length}</span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>

        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-semibold text-purple-200">แผงเลขข้อ (กดเพื่อกระโดดไปข้อนั้น)</summary>
          <div className="mt-3 grid grid-cols-8 gap-2 sm:grid-cols-12">
            {examQuestions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => goToQuestion(idx)}
                aria-label={`Question ${idx + 1}`}
                className={`aspect-square rounded-xl text-xs font-bold transition hover:scale-110 ${idx === currentIndex ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-900/40' : answers[q.id] ? 'bg-violet-500/30 text-violet-100' : 'bg-white/[0.05] text-purple-300/80 hover:bg-white/10'}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </details>
      </div>

      {currentQuestion && (() => {
        const passage = getPassageForQuestion(currentQuestion, allQuestions)
        const title = getPassageTitle(currentQuestion, allQuestions)
        if (!passage) return null
        return (
          <div className="glass-strong sticky top-[4.5rem] z-10 max-h-[45vh] overflow-y-auto rounded-3xl">
            <details open>
              <summary className="cursor-pointer px-5 py-4 text-xs font-semibold uppercase tracking-wide text-purple-200">
                📚 {title || (currentQuestion.section === 'Grammar' ? 'Grammar Passage' : 'Reading Passage')} <span className="normal-case text-purple-300/70">(กดเพื่อซ่อน/แสดง)</span>
              </summary>
              <div className="whitespace-pre-line border-t border-white/[0.06] px-5 py-4 text-[15px] leading-relaxed text-purple-100/85">
                <div className="mb-3 flex justify-end">
                  <SpeakButton text={passage} label="Read passage" variant="button" size="sm" />
                </div>
                {passage}
              </div>
            </details>
          </div>
        )
      })()}

      <QuestionCard question={{ ...currentQuestion, passage: '' }} selectedAnswer={answers[currentQuestion.id]} onSelect={handleSelect} showResult={false} questionNumber={currentIndex + 1} hideSkillTag={true} />

      <div className="flex gap-3">
        <button onClick={() => goToQuestion(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} className="btn btn-ghost flex-1">← ก่อนหน้า</button>
        {currentIndex < examQuestions.length - 1 ? (
          <button onClick={() => goToQuestion(currentIndex + 1)} className="btn btn-primary flex-1">ถัดไป →</button>
        ) : (
          <button onClick={handleSubmitClick} className="btn btn-success flex-1">ส่งข้อสอบ ✓</button>
        )}
      </div>

      {currentIndex < examQuestions.length - 1 && answeredCount === examQuestions.length && (
        <button onClick={handleSubmitClick} className="btn btn-success w-full animate-pop">ตอบครบแล้ว — ส่งข้อสอบเลย ✓</button>
      )}
    </div>
  )
}
