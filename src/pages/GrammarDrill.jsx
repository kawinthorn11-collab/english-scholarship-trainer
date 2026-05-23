import { useState, useMemo } from 'react'
import { getLesson } from '../data/grammarLessons/index.js'
import { examSets } from '../data/examSets/index.js'
import { recordQuizAttempt } from '../utils/storage'
import { shuffle } from '../utils/shuffle'

export default function GrammarDrill({ lessonId, onNavigate, onSelectLesson }) {
  const lesson = getLesson(lessonId)

  // Build the drill: combine miniQuiz + related exam questions
  const drillQuestions = useMemo(() => {
    if (!lesson || lesson.status !== 'available') return []

    const miniQuizQs = lesson.miniQuiz.map((q, i) => ({
      id: `${lessonId}-mini-${i}`,
      question: q.question,
      choices: shuffle(q.choices),
      correctAnswer: q.correctAnswer,
      explanationThai: q.explanationThai,
      source: 'lesson',
    }))

    const relatedExamQs = []
    for (const set of Object.values(examSets)) {
      for (const q of set.questions) {
        if (lesson.relatedSkillTags.includes(q.skillTag)) {
          relatedExamQs.push({
            id: q.id,
            question: q.question,
            choices: shuffle([...q.choices]),
            correctAnswer: q.correctAnswer,
            explanationThai: q.explanationThai,
            source: 'exam',
            sourceSet: set.title,
          })
        }
      }
    }

    return [...miniQuizQs, ...shuffle(relatedExamQs).slice(0, 8)] // cap exam questions for focused drill
  }, [lessonId, lesson])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  if (!lesson || lesson.status !== 'available') {
    return (
      <div className="text-center text-purple-300">
        <p>Drill not available for this lesson.</p>
        <button onClick={() => onNavigate('grammar')} className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-white">
          Back to Grammar Hub
        </button>
      </div>
    )
  }

  if (drillQuestions.length === 0) {
    return (
      <div className="text-center text-purple-300">
        <p>No drill questions available.</p>
      </div>
    )
  }

  const currentQuestion = drillQuestions[currentIndex]
  const isLast = currentIndex === drillQuestions.length - 1

  const handleSelect = (choice) => {
    if (showResult) return
    setSelectedAnswer(choice)
    setShowResult(true)
    if (choice === currentQuestion.correctAnswer) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (isLast) {
      // Save progress
      recordQuizAttempt(lessonId, score, drillQuestions.length)
      setFinished(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  if (finished) {
    const percentage = Math.round((score / drillQuestions.length) * 100)
    const grade = percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Keep practicing'
    return (
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-bold text-purple-100">🎉 Drill Complete!</h2>
        <p className="text-sm text-purple-400">{lesson.title}</p>
        <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-6">
          <p className="text-4xl font-bold text-purple-100">{score}/{drillQuestions.length}</p>
          <p className="mt-2 text-lg text-purple-300">{percentage}% — {grade}</p>
          <p className="mt-2 text-xs text-purple-400">Progress saved on this device for guest mode.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => { setCurrentIndex(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setFinished(false) }}
            className="flex-1 rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-500"
          >
            🔁 Retry Drill
          </button>
          <button
            onClick={() => onSelectLesson(lessonId)}
            className="flex-1 rounded-xl border border-purple-600 px-4 py-3 font-semibold text-purple-200 transition hover:bg-purple-900/40"
          >
            📘 Review Lesson
          </button>
          <button
            onClick={() => onNavigate('grammar')}
            className="flex-1 rounded-xl border border-purple-600 px-4 py-3 font-semibold text-purple-200 transition hover:bg-purple-900/40"
          >
            ← Hub
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-purple-100">🏋️ {lesson.title} Drill</h2>
          <p className="text-xs text-purple-400">
            Question {currentIndex + 1} of {drillQuestions.length} • Score: {score}
          </p>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-purple-900/50">
        <div
          className="h-full rounded-full bg-purple-500 transition-all"
          style={{ width: `${((currentIndex + 1) / drillQuestions.length) * 100}%` }}
        />
      </div>

      <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-6">
        <p className="mb-1 text-xs text-purple-400">
          {currentQuestion.source === 'lesson' ? 'From the lesson quiz' : `From ${currentQuestion.sourceSet}`}
        </p>
        <p className="mb-4 text-lg font-medium text-purple-100">{currentQuestion.question}</p>
        <div className="space-y-2">
          {currentQuestion.choices.map((choice, idx) => {
            const isSelected = selectedAnswer === choice
            const isCorrect = choice === currentQuestion.correctAnswer
            let cls = 'border-purple-700/40 bg-purple-900/10 hover:border-purple-500/60'
            if (showResult) {
              if (isCorrect) cls = 'border-green-500 bg-green-900/30'
              else if (isSelected) cls = 'border-red-500 bg-red-900/30'
            } else if (isSelected) {
              cls = 'border-purple-400 bg-purple-800/40'
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(choice)}
                disabled={showResult}
                className={`w-full rounded-lg border p-3 text-left text-purple-100 transition ${cls}`}
              >
                <span className="mr-2 font-bold text-purple-400">{idx + 1}.</span>
                {choice}
                {showResult && isCorrect && <span className="ml-2 text-green-400">✓</span>}
                {showResult && isSelected && !isCorrect && <span className="ml-2 text-red-400">✗</span>}
              </button>
            )
          })}
        </div>
      </div>

      {showResult && (
        <div className="rounded-lg border border-purple-600/30 bg-purple-950/50 p-4 text-sm">
          <p className={`font-semibold ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
            {selectedAnswer === currentQuestion.correctAnswer ? '✓ ถูกต้อง!' : `✗ คำตอบที่ถูกคือ: ${currentQuestion.correctAnswer}`}
          </p>
          {selectedAnswer !== currentQuestion.correctAnswer && (
            <p className="mt-1 text-xs text-red-200/80">Your answer: {selectedAnswer}</p>
          )}
          <p className="mt-2 text-purple-200/80">{currentQuestion.explanationThai}</p>
        </div>
      )}

      <div className="flex gap-3">
        {showResult && (
          <button
            onClick={handleNext}
            className="flex-1 rounded-lg bg-purple-700 px-4 py-2 font-semibold text-white transition hover:bg-purple-600"
          >
            {isLast ? 'Finish Drill' : 'Next Question →'}
          </button>
        )}
        <button
          onClick={() => onNavigate('grammar')}
          className="rounded-lg border border-purple-600 px-4 py-2 text-sm font-semibold text-purple-200 transition hover:bg-purple-900/40"
        >
          Exit Drill
        </button>
      </div>
    </div>
  )
}
