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

export default function Results({ selectedSetId, onNavigate, onSelectLesson }) {
  const [expandedId, setExpandedId] = useState(null)

  // Get latest attempt (prefer same set, fallback to any)
  const attempts = getAttempts()
  const setAttempts = attempts.filter((a) => a.setId === selectedSetId)
  const latest = setAttempts.length > 0 ? setAttempts[setAttempts.length - 1] : attempts[attempts.length - 1]

  if (!latest) {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold text-purple-100">📋 Results</h2>
        <p className="text-purple-300">No exam attempts yet. Take a mock exam first!</p>
        <button onClick={() => onNavigate('mock-exam')} className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-500">Start Mock Exam</button>
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-100">📋 Detailed Results</h2>
      <p className="text-sm text-purple-400">{latest.setTitle || attemptSetId}</p>

      <ResultSummary score={score} />

      <ComicCoach onNavigate={onNavigate} />

      {timeUsed > 0 && (
        <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-4 text-center">
          <p className="text-sm text-purple-400">⏱ Time Used</p>
          <p className="mt-1 text-xl font-bold text-purple-100">{formatTime(timeUsed)}</p>
        </div>
      )}

      {weak.length > 0 && (
        <div className="rounded-xl border border-red-700/40 bg-red-900/10 p-5">
          <h3 className="mb-4 text-lg font-semibold text-red-300">⚠️ Weak Skills — Focus Here</h3>
          <div className="space-y-3">
            {recommendations.map((r) => {
              const matchedLesson = findLessonBySkillTag(r.skill)
              const w = weak.find((x) => x.skill === r.skill)
              return (
                <div key={r.skill} className="rounded-lg bg-red-900/20 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-red-200">{r.skill}</p>
                      <p className="text-xs text-red-300/70">{r.message}</p>
                    </div>
                    <span className="rounded-full bg-red-800/50 px-3 py-1 text-sm font-bold text-red-300 whitespace-nowrap">
                      {w?.correct}/{w?.total}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {matchedLesson && matchedLesson.status === 'available' && onSelectLesson && (
                      <button
                        onClick={() => onSelectLesson(matchedLesson.id)}
                        className="rounded-lg bg-purple-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-600"
                      >
                        📘 Study This Grammar
                      </button>
                    )}
                    <button
                      onClick={() => onNavigate('practice')}
                      className="rounded-lg border border-red-600 px-3 py-1.5 text-xs font-semibold text-red-200 transition hover:bg-red-900/40"
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
        <div className="rounded-xl border border-green-700/30 bg-green-900/10 p-5">
          <h3 className="mb-3 text-lg font-semibold text-green-300">✅ Strong Skills</h3>
          <div className="flex flex-wrap gap-2">
            {strong.map((s) => (
              <span key={s.skill} className="rounded-full bg-green-900/30 px-3 py-1 text-sm text-green-300">{s.skill} ({s.correct}/{s.total})</span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 text-lg font-semibold text-purple-200">📝 Question Review</h3>
        <p className="mb-3 text-xs text-purple-400">Click a question to expand the full explanation.</p>
        <div className="space-y-3">
          {score.details.map((detail, idx) => {
            const reviewQuestion = getReviewQuestion(detail.id)
            if (!reviewQuestion) return null
            return (
              <div key={detail.id} className="rounded-lg border border-purple-700/30 bg-purple-900/10 overflow-hidden">
                <button onClick={() => setExpandedId(expandedId === detail.id ? null : detail.id)} className="flex w-full items-center gap-3 p-3 text-left transition hover:bg-purple-900/20">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${detail.isCorrect ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                    {detail.isCorrect ? '✓' : '✗'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm text-purple-200">Q{idx + 1}. {detail.question}</p>
                    <div className="mt-1 flex gap-2">
                      <span className="text-xs text-purple-400">{detail.section}</span>
                      <span className="text-xs text-purple-500">•</span>
                      <span className="text-xs text-purple-400">{detail.skillTag}</span>
                    </div>
                  </div>
                  <span className="text-purple-500">{expandedId === detail.id ? '▲' : '▼'}</span>
                </button>
                {expandedId === detail.id && (
                  <div className="border-t border-purple-700/30 p-4">
                    {(() => {
                      const passage = getPassageForQuestion(reviewQuestion, allQuestions)
                      const title = getPassageTitle(reviewQuestion, allQuestions)
                      if (!passage) return null
                      return (
                        <details open className="mb-4 rounded-lg border border-purple-700/30 bg-purple-950/40">
                          <summary className="cursor-pointer p-3 text-xs font-semibold uppercase tracking-wide text-purple-400">
                            📚 {title || (reviewQuestion.section === 'Grammar' ? 'Grammar Passage' : 'Reading Passage')}
                          </summary>
                          <div className="border-t border-purple-700/30 p-4 text-sm leading-relaxed text-purple-200/80 whitespace-pre-line">
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
        <button onClick={() => onNavigate('mock-exam')} className="rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-500">📝 Retake Exam</button>
        <button onClick={() => onNavigate('practice')} className="rounded-xl border border-purple-600 px-4 py-3 font-semibold text-purple-200 transition hover:bg-purple-900/40">🏋️ Practice Mode</button>
        <button onClick={() => onNavigate('dashboard')} className="rounded-xl border border-purple-600 px-4 py-3 font-semibold text-purple-200 transition hover:bg-purple-900/40">📊 Dashboard</button>
      </div>
    </div>
  )
}
