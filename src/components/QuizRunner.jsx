import { useState } from 'react'
import Mascot from './Mascot'
import { ListenButton } from './Duo'
import SpeakButton from './SpeakButton'
import { Confetti, ProgressRing } from './ui'
import { shuffle } from '../utils/shuffle'
import { speakLine } from '../utils/voice'
import { feedbackLines } from '../data/duoLessons'
import { getChoices, getPlainQuestion, parseMarked } from '../data/intlTests'

/**
 * One-question-at-a-time quiz with instant feedback.
 * questions: [{ id, question, choices?, answer, explain, passage? }]
 * Questions written with [[A|...]] markers are rendered as error identification.
 */
export default function QuizRunner({ questions, keepOrder = false, passage, passageTitle, onAnswer, onFinish, onExit, exitLabel = 'กลับ' }) {
  const [deck, setDeck] = useState(() => buildDeck(questions, keepOrder))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showPassage, setShowPassage] = useState(true)

  const total = deck.length
  const q = deck[index]

  const choose = (choice) => {
    if (picked || !q) return
    const correct = choice === q.answer
    setPicked(choice)
    if (correct) setScore((s) => s + 1)
    onAnswer?.(q, correct)
    speakLine(correct ? feedbackLines.correct : feedbackLines.wrong, { speaker: correct ? 'pig' : 'buffalo', lineId: 'quiz-feedback' })
  }

  const next = () => {
    if (index + 1 >= total) {
      setFinished(true)
      onFinish?.(score, total)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
  }

  const restart = () => {
    setDeck(buildDeck(questions, keepOrder))
    setIndex(0)
    setPicked(null)
    setScore(0)
    setFinished(false)
  }

  if (total === 0) return null

  if (finished) {
    const pct = Math.round((score / total) * 100)
    return (
      <div className="glass space-y-6 rounded-[2rem] p-8 text-center" style={{ animation: 'fade-up 0.5s ease both' }}>
        {pct >= 80 && <Confetti />}
        <p className="eyebrow justify-center">สรุปผล</p>
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <ProgressRing percent={pct} size={170}>
            <p className="font-display text-4xl font-semibold text-white">{score}/{total}</p>
            <p className="text-sm text-purple-200">{pct}%</p>
          </ProgressRing>
          <Mascot character={pct >= 60 ? 'pig' : 'buffalo'} mood={pct >= 80 ? 'cheer' : pct >= 60 ? 'happy' : 'teach'} size={140} />
        </div>
        <p className="mx-auto max-w-md text-purple-100/85">
          {pct >= 80 ? 'เยี่ยมมาก! ลองชุดอื่นต่อได้เลย' : 'ข้อที่ตอบผิดถูกเก็บไว้ในสมุดข้อผิดแล้ว กลับไปทบทวนพรุ่งนี้ จะจำได้แม่นขึ้นมาก'}
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={restart} className="btn btn-primary">🔁 ทำชุดนี้อีกครั้ง</button>
          {onExit && <button onClick={onExit} className="btn btn-ghost">{exitLabel}</button>}
        </div>
      </div>
    )
  }

  const isError = /\[\[[A-D]\|/.test(q.question)
  const parts = isError ? parseMarked(q.question) : null
  const partText = (label) => parts?.find((p) => p.label === label)?.text
  const questionPassage = passage || q.passage
  const correct = picked === q.answer

  return (
    <div className="space-y-5">
      <div className="glass rounded-3xl p-4 sm:p-5">
        <div className="flex items-center justify-between text-sm text-purple-100/85">
          <span>ข้อ <b className="text-white">{index + 1}</b> / {total}</span>
          <span>ถูก <b className="text-white">{score}</b></span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-pink-400 via-orange-300 to-yellow-200 transition-all duration-500" style={{ width: `${((index + (picked ? 1 : 0)) / total) * 100}%` }} />
        </div>
      </div>

      {questionPassage && (
        <div className="glass-strong max-h-[42vh] overflow-y-auto rounded-3xl">
          <button onClick={() => setShowPassage((v) => !v)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
            <span className="text-xs font-semibold uppercase tracking-wide text-pink-100">📚 {passageTitle || 'Reading passage'}</span>
            <span className="chip">{showPassage ? '▲ ซ่อน' : '▼ แสดง'}</span>
          </button>
          {showPassage && (
            <div className="whitespace-pre-line border-t border-white/[0.06] px-5 py-4 text-[15px] leading-relaxed text-purple-50/90">
              <div className="mb-3 flex justify-end"><SpeakButton text={questionPassage} label="ฟังบทความ" variant="button" size="sm" /></div>
              {questionPassage}
            </div>
          )}
        </div>
      )}

      <div key={q.id} className="glass rounded-[1.75rem] p-5 sm:p-8" style={{ animation: 'fade-up 0.35s ease both' }}>
        <div className="mb-6 flex items-start gap-3">
          <p className="min-w-0 flex-1 whitespace-pre-line text-lg leading-relaxed text-white sm:text-xl">
            {isError
              ? parts.map((p, i) => (p.label
                ? <span key={i} className="mx-0.5 inline-flex items-baseline gap-1 rounded-md bg-white/10 px-1.5 underline decoration-pink-300 decoration-2 underline-offset-4"><sup className="text-xs font-bold text-pink-200">{p.label}</sup>{p.text}</span>
                : <span key={i}>{p.text}</span>))
              : q.question}
          </p>
          <SpeakButton text={isError ? getPlainQuestion(q) : q.question} size="sm" />
        </div>
        {isError && <p className="-mt-3 mb-5 text-sm text-pink-100/80">ส่วนไหนผิด?</p>}

        <div className={`grid gap-3 ${q.choices.length === 3 || q.choices.some((c) => c.length > 28) ? '' : 'sm:grid-cols-2'}`}>
          {q.choices.map((choice, i) => {
            const isAnswer = choice === q.answer
            const isPicked = choice === picked
            let tone = 'border-white/15 bg-white/[0.06] hover:-translate-y-0.5 hover:border-pink-300/60 hover:bg-white/[0.1]'
            if (picked) {
              if (isAnswer) tone = 'border-emerald-300 bg-emerald-400/20 animate-pop'
              else if (isPicked) tone = 'border-rose-300 bg-rose-400/20 animate-shake'
              else tone = 'border-white/5 bg-white/[0.03] opacity-50'
            }
            return (
              <button
                key={choice}
                onClick={() => choose(choice)}
                disabled={Boolean(picked)}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-base text-white transition ${tone}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/15 text-sm font-bold">{isError ? choice : i + 1}</span>
                <span className="min-w-0 flex-1">{isError ? partText(choice) : choice}</span>
                {picked && isAnswer && <span aria-label="คำตอบที่ถูก">✅</span>}
                {isPicked && !isAnswer && <span aria-label="คำตอบของคุณ">❌</span>}
              </button>
            )
          })}
        </div>

        {picked && (
          <div className={`mt-6 flex flex-col gap-4 rounded-3xl border p-5 sm:flex-row sm:items-start ${correct ? 'border-emerald-300/30 bg-emerald-400/10' : 'border-rose-300/30 bg-rose-400/10'}`} style={{ animation: 'fade-up 0.35s ease both' }}>
            <Mascot character={correct ? 'pig' : 'buffalo'} mood={correct ? 'cheer' : 'teach'} size={76} className="shrink-0 self-center" />
            <div className="min-w-0 flex-1 space-y-3">
              <p className={`font-display text-lg font-semibold ${correct ? 'text-emerald-100' : 'text-rose-100'}`}>
                {correct ? 'ถูกต้อง! 🎉' : `คำตอบที่ถูกคือ ${isError ? `${q.answer} · ${partText(q.answer)}` : q.answer}`}
              </p>
              <p className="text-[15px] leading-relaxed text-purple-50/90">{q.explain}</p>
              <ListenButton text={q.explain} speaker="buffalo" label="ฟังคำอธิบาย" />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {onExit && <button onClick={onExit} className="btn btn-ghost">{exitLabel}</button>}
        <button onClick={next} disabled={!picked} className="btn btn-primary flex-1">
          {index + 1 >= total ? 'ดูผลสรุป' : 'ข้อถัดไป →'}
        </button>
      </div>
    </div>
  )
}

function buildDeck(questions, keepOrder) {
  return questions.map((q) => {
    const choices = getChoices(q)
    const marked = /\[\[[A-D]\|/.test(q.question)
    return { ...q, choices: keepOrder || marked || !q.choices ? choices : shuffle(choices) }
  })
}
