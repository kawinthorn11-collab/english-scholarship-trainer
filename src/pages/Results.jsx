import { useState } from 'react'
import { getExamSet } from '../data/examSets/index.js'
import ResultSummary from '../components/ResultSummary'
import QuestionCard from '../components/QuestionCard'
import ExplanationPanel from '../components/ExplanationPanel'
import ComicCoach from '../components/ComicCoach'
import SpeakButton from '../components/SpeakButton'
import { analyzeWeakSkills, getRecommendations } from '../utils/analysis'
import { getAttempts } from '../utils/storage'
import { getPassageForQuestion, getPassageTitle } from '../utils/passage'
import { findLessonBySkillTag } from '../data/grammarLessons/index.js'
import Mascot from '../components/Mascot'
import { SectionTitle } from '../components/ui'

export default function Results({ selectedSetId, onNavigate, onSelectLesson }) {
  const [expandedId, setExpandedId] = useState(null)

  // Get latest attempt (prefer same set, fallback to any)
  const attempts = getAttempts()
  const setAttempts = attempts.filter((a) => a.setId === selectedSetId)
  const latest = setAttempts.length > 0 ? setAttempts[setAttempts.length - 1] : attempts[attempts.length - 1]

  if (!latest) {
    return (
      <div className="glass mx-auto max-w-lg space-y-5 rounded-[2rem] p-10 text-center">
        <Mascot mood="think" size={150} className="mx-auto" />
        <h1 className="text-3xl font-semibold text-white">ยังไม่มีผลสอบเลย</h1>
        <p className="text-purple-200/80">ลองทำข้อสอบจำลองสักชุด แล้วครูฮูกจะวิเคราะห์จุดอ่อนให้ทันที!</p>
        <button onClick={() => onNavigate('mock-exam')} className="btn btn-primary px-8 py-4">📝 เริ่มทำ Mock Exam</button>
      </div>
    )
  }

  // Use the set from the attempt for question lookup
  const attemptSetId = latest.setId || selectedSetId
  const examSet = getExamSet(attemptSetId)
  const allQuestions = examSet?.questions || []

  const score = latest.score
  const timeUsed = latest.timeUsedSeconds || 0
  const shuffledQuestions = latest.shuffledQuestions || null
  const { weak, strong } = analyzeWeakSkills(score.details)
  const recommendations = getRecommendations(weak)

  // Build shuffled choices map
  const shuffledChoicesMap = {}
  if (shuffledQuestions) {
    shuffledQuestions.forEach((sq) => { shuffledChoicesMap[sq.id] = sq.choices })
  }

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}m ${s}s`
  }

  const getReviewQuestion = (questionId) => {
    const original = allQuestions.find((q) => q.id === questionId)
    if (!original) return null
    if (shuffledChoicesMap[questionId]) {
      return { ...original, choices: shuffledChoicesMap[questionId] }
    }
    return original
  }

  return (
    <div className="space-y-10">
      <div className="text-center">
        <p className="eyebrow justify-center">📋 Detailed Results</p>
        <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">ผลสอบล่าสุดของคุณ</h1>
        <p className="mt-2 text-sm text-purple-300/80">{latest.setTitle || attemptSetId}{timeUsed > 0 && ` · ⏱ ใช้เวลา ${formatTime(timeUsed)}`}</p>
      </div>

      <ResultSummary score={score} celebrate={false} />

      <ComicCoach onNavigate={onNavigate} />

      {weak.length > 0 && (
        <div className="rounded-[2rem] border border-rose-400/20 bg-gradient-to-br from-rose-500/10 to-transparent p-6 sm:p-7">
          <SectionTitle icon="⚠️" title="Weak Skills — โฟกัสตรงนี้" subtitle="ซ่อมจุดเหล่านี้ คะแนนจะขึ้นเร็วที่สุด" />
          <div className="grid gap-4 md:grid-cols-2">
            {recommendations.map((r) => {
              const matchedLesson = findLessonBySkillTag(r.skill)
              const w = weak.find((x) => x.skill === r.skill)
              return (
                <div key={r.skill} className="rounded-3xl border border-rose-400/15 bg-rose-500/[0.07] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-rose-100">{r.skill}</p>
                      <p className="mt-1 text-xs leading-relaxed text-rose-200/75">{r.message}</p>
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-rose-500/25 px-3 py-1 text-sm font-bold text-rose-100">
                      {w?.correct}/{w?.total}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {matchedLesson && matchedLesson.status === 'available' && onSelectLesson && (
                      <button
                        onClick={() => onSelectLesson(matchedLesson.id)}
                        className="btn btn-primary !px-4 !py-2 text-xs"
                      >
                        📘 Study This Grammar
                      </button>
                    )}
                    <button
                      onClick={() => onNavigate('practice')}
                      className="btn btn-ghost !px-4 !py-2 text-xs"
                    >
                      🏋️ Practice This Skill
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {strong.length > 0 && (
        <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-6 sm:p-7">
          <SectionTitle icon="💪" title="Strong Skills" subtitle="จุดแข็งที่ทำได้ดีแล้ว รักษาไว้นะ!" />
          <div className="flex flex-wrap gap-2">
            {strong.map((s) => (
              <span key={s.skill} className="rounded-full border border-emerald-400/20 bg-emerald-500/15 px-4 py-1.5 text-sm text-emerald-100">{s.skill} ({s.correct}/{s.total})</span>
            ))}
          </div>
        </div>
      )}

      <div>
        <SectionTitle icon="📝" title="ทบทวนทีละข้อ" subtitle="กดที่ข้อเพื่อดูคำอธิบายแบบเต็ม" />
        <div className="space-y-3">
          {score.details.map((detail, idx) => {
            const reviewQuestion = getReviewQuestion(detail.id)
            if (!reviewQuestion) return null
            return (
              <div key={detail.id} className={`glass overflow-hidden rounded-3xl transition ${expandedId === detail.id ? 'ring-1 ring-violet-400/40' : ''}`}>
                <button onClick={() => setExpandedId(expandedId === detail.id ? null : detail.id)} className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/[0.04]">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${detail.isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                    {detail.isCorrect ? '✓' : '✗'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-[15px] text-white">Q{idx + 1}. {detail.question}</p>
                    <div className="mt-1 flex gap-2 text-xs text-purple-300/80">
                      <span>{detail.section}</span>
                      <span>•</span>
                      <span>{detail.skillTag}</span>
                    </div>
                  </div>
                  <span className={`text-purple-300 transition-transform duration-300 ${expandedId === detail.id ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {expandedId === detail.id && (
                  <div className="border-t border-white/[0.06] p-4 sm:p-5" style={{ animation: 'fade-up 0.4s ease both' }}>
                    {(() => {
                      const passage = getPassageForQuestion(reviewQuestion, allQuestions)
                      const title = getPassageTitle(reviewQuestion, allQuestions)
                      if (!passage) return null
                      return (
                        <details open className="mb-5 rounded-3xl border border-white/[0.07] bg-white/[0.03]">
                          <summary className="cursor-pointer px-5 py-4 text-xs font-semibold uppercase tracking-wide text-purple-200">
                            📚 {title || (reviewQuestion.section === 'Grammar' ? 'Grammar Passage' : 'Reading Passage')}
                          </summary>
                          <div className="whitespace-pre-line border-t border-white/[0.06] px-5 py-4 text-[15px] leading-relaxed text-purple-100/85">
                            <div className="mb-3 flex justify-end">
                              <SpeakButton text={passage} label="Read passage" variant="button" size="sm" />
                            </div>
                            {passage}
                          </div>
                        </details>
                      )
                    })()}
                    <QuestionCard question={{ ...reviewQuestion, passage: '' }} selectedAnswer={detail.userAnswer} onSelect={() => {}} showResult={true} questionNumber={idx + 1} hideSkillTag={false} />
                    <ExplanationPanel question={reviewQuestion} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <button onClick={() => onNavigate('mock-exam')} className="btn btn-primary py-4">📝 สอบใหม่อีกครั้ง</button>
        <button onClick={() => onNavigate('practice')} className="btn btn-ghost py-4">🏋️ Practice Mode</button>
        <button onClick={() => onNavigate('dashboard')} className="btn btn-ghost py-4">🏠 Dashboard</button>
      </div>
    </div>
  )
}
