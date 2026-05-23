import { useState, useRef } from 'react'
import { getExamSet } from '../data/examSets/index.js'
import QuestionCard from '../components/QuestionCard'
import ExplanationPanel from '../components/ExplanationPanel'
import { getPassageForQuestion, getPassageTitle } from '../utils/passage'
import SpeakButton from '../components/SpeakButton'
import { recordQuestionAnswered } from '../utils/localStats'
import { sendLearningEvent } from '../utils/globalStats'

export default function Practice({ selectedSetId, onNavigate }) {
  const examSet = getExamSet(selectedSetId)
  const allQuestions = examSet?.questions || []

  const [section, setSection] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [passageExpanded, setPassageExpanded] = useState(true)
  const questionAreaRef = useRef(null)

  const filteredQuestions = section
    ? allQuestions.filter((q) => q.section === section)
    : []

  const currentQuestion = filteredQuestions[currentIndex]
  const currentPassage = currentQuestion ? getPassageForQuestion(currentQuestion, allQuestions) : ''
  const currentPassageTitle = currentQuestion ? getPassageTitle(currentQuestion, allQuestions) : ''

  const grammarCount = allQuestions.filter((q) => q.section === 'Grammar').length
  const readingCount = allQuestions.filter((q) => q.section === 'Reading').length

  const scrollToTop = () => {
    if (questionAreaRef.current) {
      questionAreaRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const navigateTo = (newIndex) => {
    const newQuestion = filteredQuestions[newIndex]
    const newPassageId = newQuestion?.passageId || null
    const oldPassageId = currentQuestion?.passageId || null
    if (newPassageId && newPassageId !== oldPassageId) {
      setPassageExpanded(true)
    }
    setSelectedAnswer(null)
    setShowResult(false)
    setCurrentIndex(newIndex)
    setTimeout(scrollToTop, 50)
  }

  const handleSelect = (choice) => {
    if (showResult) return
    const isCorrect = choice === currentQuestion.correctAnswer
    recordQuestionAnswered(currentQuestion.skillTag, isCorrect)
    sendLearningEvent('question_answered', { skillTag: currentQuestion.skillTag })
    setSelectedAnswer(choice)
    setShowResult(true)
  }

  const handleNext = () => { navigateTo(Math.min(filteredQuestions.length - 1, currentIndex + 1)) }
  const handlePrev = () => { navigateTo(Math.max(0, currentIndex - 1)) }

  const prevPassageId = currentIndex > 0 ? filteredQuestions[currentIndex - 1]?.passageId : null
  const isSamePassageAsPrev = currentQuestion?.passageId && prevPassageId && currentQuestion.passageId === prevPassageId

  if (!section) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-purple-100">🏋️ Practice Mode</h2>
        <p className="text-sm text-purple-400">{examSet?.title || 'No set selected'}</p>
        <p className="text-purple-300">Choose a section to practice:</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button onClick={() => setSection('Grammar')} className="flex-1 rounded-xl border border-purple-600 bg-purple-900/30 px-6 py-6 text-center transition hover:bg-purple-800/40">
            <div className="text-3xl">📖</div>
            <p className="mt-2 text-lg font-semibold text-purple-100">Grammar</p>
            <p className="text-sm text-purple-400">{grammarCount} questions</p>
          </button>
          <button onClick={() => setSection('Reading')} className="flex-1 rounded-xl border border-purple-600 bg-purple-900/30 px-6 py-6 text-center transition hover:bg-purple-800/40">
            <div className="text-3xl">📚</div>
            <p className="mt-2 text-lg font-semibold text-purple-100">Reading Comprehension</p>
            <p className="text-sm text-purple-400">{readingCount} questions</p>
          </button>
        </div>
        <button onClick={() => onNavigate('dashboard')} className="text-sm text-purple-400 underline transition hover:text-purple-200">← Back to Dashboard</button>
      </div>
    )
  }

  const isLastQuestion = currentIndex === filteredQuestions.length - 1

  return (
    <div className="space-y-4" ref={questionAreaRef}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-purple-100">🏋️ {section} Practice</h2>
          <p className="text-xs text-purple-400">{examSet?.title}</p>
        </div>
        <span className="text-sm text-purple-400">{currentIndex + 1} / {filteredQuestions.length}</span>
      </div>

      {currentPassage && (
        <div className="sticky top-16 z-10 rounded-lg border border-purple-700/30 bg-purple-950/95 backdrop-blur">
          <button onClick={() => setPassageExpanded(!passageExpanded)} className="flex w-full items-center justify-between p-3 text-left">
            <span className="text-xs font-semibold uppercase tracking-wide text-purple-400">
              📚 {currentPassageTitle || (section === 'Grammar' ? 'Grammar Passage' : 'Reading Passage')}
              {isSamePassageAsPrev && ' (same as previous)'}
            </span>
            <span className="text-xs text-purple-400">{passageExpanded ? '▲ Hide' : '▼ Show'}</span>
          </button>
          {passageExpanded && (
            <div className="border-t border-purple-700/30 p-4 text-sm leading-relaxed text-purple-200/80 whitespace-pre-line">
              <div className="mb-3 flex justify-end">
                <SpeakButton text={currentPassage} label="Read passage" variant="button" size="sm" />
              </div>
              {currentPassage}
            </div>
          )}
        </div>
      )}

      <QuestionCard question={{ ...currentQuestion, passage: '' }} selectedAnswer={selectedAnswer} onSelect={handleSelect} showResult={showResult} questionNumber={currentIndex + 1} hideSkillTag={false} />

      {showResult && (
        <div className={`rounded-lg p-3 text-center font-semibold ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
          {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct! ถูกต้อง!' : `✗ Incorrect. คำตอบที่ถูกคือ: ${currentQuestion.correctAnswer}`}
        </div>
      )}

      {showResult && <ExplanationPanel question={currentQuestion} />}

      <div className="flex gap-3">
        <button onClick={handlePrev} disabled={currentIndex === 0} className="flex-1 rounded-lg border border-purple-600 px-4 py-2 font-semibold text-purple-200 transition hover:bg-purple-900/40 disabled:opacity-30">← Previous</button>
        {!isLastQuestion ? (
          <button onClick={handleNext} className="flex-1 rounded-lg bg-purple-700 px-4 py-2 font-semibold text-white transition hover:bg-purple-600">Next →</button>
        ) : (
          <button onClick={() => onNavigate('dashboard')} className="flex-1 rounded-lg bg-green-700 px-4 py-2 font-semibold text-white transition hover:bg-green-600">✓ Finish Practice</button>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={() => { setSection(null); setCurrentIndex(0); setShowResult(false); setSelectedAnswer(null) }} className="flex-1 text-sm text-purple-400 underline transition hover:text-purple-200">← Change Section</button>
        <button onClick={() => onNavigate('dashboard')} className="flex-1 text-sm text-purple-400 underline transition hover:text-purple-200">Finish & Back to Dashboard</button>
      </div>
    </div>
  )
}
