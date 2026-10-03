import { useState, useMemo } from 'react'
import { getLesson } from '../data/grammarLessons/index.js'
import { examSets } from '../data/examSets/index.js'
import SpeakButton from '../components/SpeakButton'
import Mascot from '../components/Mascot'
import { Confetti, ProgressRing } from '../components/ui'
import { recordQuizAttempt } from '../utils/storage'
import { shuffle } from '../utils/shuffle'
import { recordGrammarDrillCompleted, recordQuestionAnswered } from '../utils/localStats'
import { sendLearningEvent } from '../utils/globalStats'

export default function GrammarDrill({ lessonId, onNavigate, onSelectLesson }) {
  const lesson = getLesson(lessonId)

  const drillQuestions = useMemo(() => {
    if (!lesson || lesson.status !== 'available') return []

    const miniQuizQs = lesson.miniQuiz.map((q, i) => ({
      id: `${lessonId}-mini-${i}`,
      question: q.question,
      choices: shuffle(q.choices),
      correctAnswer: q.correctAnswer,
      explanationThai: q.explanationThai,
      source: 'lesson',
      skillTag: q.skillTag || lesson.relatedSkillTags?.[0],
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
            skillTag: q.skillTag,
          })
        }
      }
    }

    return [...miniQuizQs, ...shuffle(relatedExamQs).slice(0, 8)]
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
        <button onClick={() => onNavigate('grammar')} className="mt-4 btn btn-primary">
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
    const isCorrect = choice === currentQuestion.correctAnswer
    setSelectedAnswer(choice)
    setShowResult(true)
    recordQuestionAnswered(currentQuestion.skillTag, isCorrect)
    sendLearningEvent('question_answered', { skillTag: currentQuestion.skillTag })
    if (isCorrect) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (isLast) {
      const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer ? 0 : 0)
      const percentage = Math.round((finalScore / drillQuestions.length) * 100)
      recordQuizAttempt(lessonId, finalScore, drillQuestions.length)
      recordGrammarDrillCompleted(lessonId, percentage)
      sendLearningEvent('grammar_drill_completed', { lessonId, score: percentage })
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
      <div className="space-y-8 text-center">
        {percentage >= 80 && <Confetti />}
        <p className="eyebrow justify-center">✅ Drill Complete</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">{grade}!</h1>
        <p className="text-sm text-purple-300/80">{lesson.title}</p>
        <div className="glass flex flex-col items-center justify-center gap-6 rounded-[2rem] p-8 sm:flex-row">
          <ProgressRing percent={percentage} size={170}>
            <p className="font-display text-4xl font-semibold text-white">{score}/{drillQuestions.length}</p>
            <p className="text-sm text-purple-300">{percentage}%</p>
          </ProgressRing>
          <Mascot mood={percentage >= 80 ? 'cheer' : percentage >= 60 ? 'happy' : 'oops'} size={140} />
        </div>
        <p className="text-xs text-purple-300/80">Progress saved on this device for guest mode.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => { setCurrentIndex(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setFinished(false) }}
            className="btn btn-primary flex-1"
          >
            Retry Drill
          </button>
          <button
            onClick={() => onSelectLesson(lessonId)}
            className="flex-1 btn btn-ghost"
          >
            Review Lesson
          </button>
          <button
            onClick={() => onNavigate('grammar')}
            className="flex-1 btn btn-ghost"
          >
            Hub
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
            <p className="eyebrow">📖 Grammar Drill</p>
            <h1 className="mt-1 text-2xl font-semibold text-white">{lesson.title}</h1>
          </div>
          <div className="flex gap-2">
            <span className="chip">ข้อ {currentIndex + 1}/{drillQuestions.length}</span>
            <span className="chip">⭐ {score}</span>
          </div>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / drillQuestions.length) * 100}%` }}
          />
        </div>
      </header>

      <div className="glass rounded-[1.75rem] p-5 sm:p-8">
        <p className="mb-1 text-xs text-purple-300/80">
          {currentQuestion.source === 'lesson' ? 'From the lesson quiz' : `From ${currentQuestion.sourceSet}`}
        </p>
        <div className="mb-4 flex flex-wrap items-start gap-2">
          <p className="min-w-0 flex-1 text-lg font-medium leading-relaxed text-white sm:text-xl">{currentQuestion.question}</p>
          <SpeakButton text={currentQuestion.question} label="Question" variant="button" size="sm" />
        </div>
        <div className="space-y-3">
          {currentQuestion.choices.map((choice, idx) => {
            const isSelected = selectedAnswer === choice
            const isCorrect = choice === currentQuestion.correctAnswer
            let cls = 'border-white/[0.08] bg-white/[0.03] hover:border-violet-400/50'
            if (showResult) {
              if (isCorrect) cls = 'border-emerald-400/80 bg-emerald-500/15 animate-pop'
              else if (isSelected) cls = 'border-rose-400/80 bg-rose-500/15 animate-shake'
            } else if (isSelected) {
              cls = 'border-violet-400 bg-violet-500/20'
            }
            return (
              <div key={idx} className="flex items-stretch gap-2">
                <button
                  onClick={() => handleSelect(choice)}
                  disabled={showResult}
                  className={`min-w-0 flex-1 rounded-2xl border px-4 py-3.5 text-left text-white transition ${cls}`}
                >
                  <span className="mr-2 font-bold text-purple-300/80">{idx + 1}.</span>
                  {choice}
                  {showResult && isCorrect && <span className="ml-2 text-xs font-bold text-emerald-300">✓ ถูกต้อง</span>}
                  {showResult && isSelected && !isCorrect && <span className="ml-2 text-xs font-bold text-rose-300">✕ คำตอบของคุณ</span>}
                </button>
                <SpeakButton text={choice} label={`Choice ${idx + 1}`} size="sm" />
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
              {selectedAnswer === currentQuestion.correctAnswer ? 'ถูกต้อง! 🎉' : `คำตอบที่ถูกคือ: ${currentQuestion.correctAnswer}`}
            </p>
            {selectedAnswer !== currentQuestion.correctAnswer && (
              <p className="mt-1 text-xs text-rose-200/80">Your answer: {selectedAnswer}</p>
            )}
            <p className="mt-1 text-[15px] leading-relaxed text-purple-100/85">{currentQuestion.explanationThai}</p>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {showResult && (
          <button
            onClick={handleNext}
            className="btn btn-primary flex-1"
          >
            {isLast ? 'Finish Drill' : 'Next Question'}
          </button>
        )}
        <button
          onClick={() => onNavigate('grammar')}
          className="btn btn-ghost text-sm"
        >
          Exit Drill
        </button>
      </div>
    </div>
  )
}
