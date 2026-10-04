import { useState, useRef } from 'react'
import { getExamSet } from '../data/examSets/index.js'
import QuestionCard from '../components/QuestionCard'
import ExplanationPanel from '../components/ExplanationPanel'
import { getPassageForQuestion, getPassageTitle } from '../utils/passage'
import SpeakButton from '../components/SpeakButton'
import { recordQuestionAnswered } from '../utils/localStats'
import { sendLearningEvent } from '../utils/globalStats'
import Mascot from '../components/Mascot'
import { speakLine } from '../utils/voice'
import { PageHeader } from '../components/ui'

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
    speakLine(isCorrect ? 'ถูกต้อง! เก่งมาก' : `ยังไม่ใช่นะ คำตอบที่ถูกคือ ${currentQuestion.correctAnswer}`, { speaker: isCorrect ? 'pig' : 'buffalo', lineId: 'practice-feedback' })
  }

  const handleNext = () => { navigateTo(Math.min(filteredQuestions.length - 1, currentIndex + 1)) }
  const handlePrev = () => { navigateTo(Math.max(0, currentIndex - 1)) }

  const prevPassageId = currentIndex > 0 ? filteredQuestions[currentIndex - 1]?.passageId : null
  const isSamePassageAsPrev = currentQuestion?.passageId && prevPassageId && currentQuestion.passageId === prevPassageId

  if (!section) {
    return (
      <div className="space-y-10">
        <PageHeader
          eyebrow="Practice Mode"
          icon="🏋️"
          title="ฝึกทีละข้อ เฉลยทันที"
          subtitle={`${examSet?.title || 'No set selected'} — เลือกพาร์ทที่อยากฝึก ตอบแล้วครูหมูกับครูควายจะอธิบายให้ทันทีว่าทำไมถูกหรือผิด`}
          mood="teach"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <SectionCard icon="📖" title="Grammar" desc="Part I · โครงสร้างประโยค เติมคำ หาจุดผิด" count={grammarCount} tone="from-violet-600/40 to-indigo-600/10" onClick={() => setSection('Grammar')} />
          <SectionCard icon="📚" title="Reading Comprehension" desc="Part II · อ่านจับใจความ หาคำตอบจากบทความ" count={readingCount} tone="from-fuchsia-600/40 to-pink-600/10" onClick={() => setSection('Reading')} />
        </div>
        <button onClick={() => onNavigate('dashboard')} className="text-sm font-semibold text-purple-300 transition hover:text-white">← กลับ Dashboard</button>
      </div>
    )
  }

  const isLastQuestion = currentIndex === filteredQuestions.length - 1

  return (
    <div className="space-y-6" ref={questionAreaRef}>
      <div className="glass rounded-[2rem] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 text-2xl shadow-lg shadow-pink-900/30">🏋️</span>
            <div>
              <h1 className="text-xl font-semibold text-white">{section} Practice</h1>
              <p className="text-xs text-purple-300/80">{examSet?.title}</p>
            </div>
          </div>
          <span className="chip text-sm">{currentIndex + 1} / {filteredQuestions.length}</span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-amber-300 transition-all duration-500" style={{ width: `${((currentIndex + 1) / Math.max(1, filteredQuestions.length)) * 100}%` }} />
        </div>
      </div>

      {currentPassage && (
        <div className="glass-strong sticky top-[4.5rem] z-10 max-h-[45vh] overflow-y-auto rounded-3xl">
          <button onClick={() => setPassageExpanded(!passageExpanded)} className="flex w-full items-center justify-between px-5 py-4 text-left">
            <span className="text-xs font-semibold uppercase tracking-wide text-purple-200">
              📚 {currentPassageTitle || (section === 'Grammar' ? 'Grammar Passage' : 'Reading Passage')}
              {isSamePassageAsPrev && ' (same as previous)'}
            </span>
            <span className="chip">{passageExpanded ? '▲ Hide' : '▼ Show'}</span>
          </button>
          {passageExpanded && (
            <div className="whitespace-pre-line border-t border-white/[0.06] px-5 py-4 text-[15px] leading-relaxed text-purple-100/85">
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
        <div className={`flex animate-pop items-center gap-4 rounded-3xl border p-4 ${selectedAnswer === currentQuestion.correctAnswer ? 'border-emerald-400/40 bg-emerald-500/10' : 'border-rose-400/40 bg-rose-500/10'}`}>
          <Mascot character={selectedAnswer === currentQuestion.correctAnswer ? 'pig' : 'buffalo'} mood={selectedAnswer === currentQuestion.correctAnswer ? 'cheer' : 'oops'} size={72} className="shrink-0" />
          <div>
            <p className={`font-display text-lg font-semibold ${selectedAnswer === currentQuestion.correctAnswer ? 'text-emerald-200' : 'text-rose-200'}`}>
              {selectedAnswer === currentQuestion.correctAnswer ? 'ถูกต้อง! เก่งมาก 🎉' : 'ยังไม่ใช่ ไม่เป็นไรนะ!'}
            </p>
            <p className="text-sm text-purple-100/80">
              {selectedAnswer === currentQuestion.correctAnswer ? 'อ่านคำอธิบายด้านล่างเพื่อจำให้แม่นขึ้น' : `คำตอบที่ถูกคือ: ${currentQuestion.correctAnswer}`}
            </p>
          </div>
        </div>
      )}

      {showResult && <ExplanationPanel question={currentQuestion} />}

      <div className="flex gap-3">
        <button onClick={handlePrev} disabled={currentIndex === 0} className="btn btn-ghost flex-1">← ก่อนหน้า</button>
        {!isLastQuestion ? (
          <button onClick={handleNext} className="btn btn-primary flex-1">ถัดไป →</button>
        ) : (
          <button onClick={() => onNavigate('dashboard')} className="btn btn-success flex-1">✓ จบการฝึก</button>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={() => { setSection(null); setCurrentIndex(0); setShowResult(false); setSelectedAnswer(null) }} className="flex-1 text-sm font-semibold text-purple-300 transition hover:text-white">← เปลี่ยนพาร์ท</button>
        <button onClick={() => onNavigate('dashboard')} className="flex-1 text-sm font-semibold text-purple-300 transition hover:text-white">จบ & กลับ Dashboard</button>
      </div>
    </div>
  )
}

function SectionCard({ icon, title, desc, count, tone, onClick }) {
  return (
    <button onClick={onClick} className="glass glow-card group relative overflow-hidden rounded-[2rem] p-7 text-left transition duration-300 hover:-translate-y-1.5">
      <span aria-hidden className={`pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br ${tone} blur-2xl transition-transform duration-700 group-hover:scale-150`} />
      <span className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/[0.08] text-4xl transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">{icon}</span>
      <span className="relative block font-display text-2xl font-semibold text-white">{title}</span>
      <span className="relative mt-1 block text-sm text-purple-200/75">{desc}</span>
      <span className="relative mt-5 flex items-center justify-between">
        <span className="chip">❓ {count} ข้อ</span>
        <span className="font-semibold text-purple-200 transition-transform group-hover:translate-x-1">เริ่มฝึก →</span>
      </span>
    </button>
  )
}
