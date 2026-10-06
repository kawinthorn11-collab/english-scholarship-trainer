import { useCallback, useEffect, useMemo, useState } from 'react'
import Passage from '../components/Passage'
import Explanation from '../components/Explanation'
import { ThaiVoiceNotice } from '../components/SpeakButton'
import { getSet } from '../data/sets'
import { choiceLabel, getAttempt, saveAttempt, startAttempt, teachingScript } from '../lib/exam'
import { href, navigate, replaceQuery } from '../lib/router'
import { speak, stopSpeaking } from '../lib/speech'

const AUTO_KEY = 'est.autoTeach'

function readAuto() {
  try {
    return localStorage.getItem(AUTO_KEY) === '1'
  } catch {
    return false
  }
}

function attemptKey(setId, mode) {
  return `${setId}:${mode}`
}

function formatTime(ms) {
  const total = Math.max(0, Math.round(ms / 1000))
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function useNow(active) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!active) return undefined
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [active])
  return now
}

function TimedIntro({ set, onStart }) {
  return (
    <div className="page narrow">
      <a className="back" href={href('/exam')}>← เลือกชุดข้อสอบ</a>
      <div className="card intro">
        <p className="eyebrow">จำลองสอบจริง</p>
        <h1>{set.title}</h1>
        <ul className="checklist">
          <li><b>60 ข้อ · {set.timeLimit} นาที</b> เหมือนข้อสอบจริง</li>
          <li>Part I Grammar 30 ข้อ แล้วต่อด้วย Part II Reading 30 ข้อ</li>
          <li>ระหว่างสอบจะยังไม่เฉลย เปลี่ยนคำตอบได้จนกว่าจะส่ง</li>
          <li>หมดเวลาแล้วระบบส่งคำตอบให้อัตโนมัติ จากนั้นดูเฉลยและฟังครูอธิบายได้ทุกข้อ</li>
        </ul>
        <p className="muted small">แนะนำ: ทำ Grammar ให้เสร็จใน 20 นาที เหลือ 40 นาทีสำหรับ Reading</p>
        <button type="button" className="btn btn-primary btn-lg" onClick={onStart}>เริ่มจับเวลา</button>
      </div>
    </div>
  )
}

export default function Quiz({ setId, mode, query }) {
  const set = getSet(setId)
  const sourceMode = mode === 'review' ? (query.get('from') === 'timed' ? 'timed' : 'practice') : mode
  const key = attemptKey(setId, sourceMode)

  // ฝึกทีละข้อ: ถ้ายังไม่มีรอบที่ทำค้างอยู่ ให้เริ่มรอบใหม่ทันที
  const [attempt, setAttempt] = useState(() => {
    const saved = getAttempt(key)
    if (mode === 'practice' && set && (!saved || saved.finishedAt)) return startAttempt(key, 'practice')
    return saved
  })
  const [auto, setAuto] = useState(readAuto)
  const [showGrid, setShowGrid] = useState(false)
  const [confirmSubmit, setConfirmSubmit] = useState(false)

  const answers = useMemo(() => attempt?.answers || {}, [attempt])
  const timedActive = mode === 'timed' && attempt && !attempt.finishedAt
  const now = useNow(Boolean(timedActive))

  const initialN = () => {
    const fromQuery = Number(query.get('q'))
    if (set && fromQuery >= 1 && fromQuery <= set.questions.length) return fromQuery
    const firstOpen = set?.questions.find((item) => answers[item.n] === undefined)
    return firstOpen ? firstOpen.n : 1
  }
  const [current, setCurrent] = useState(initialN)

  const finish = useCallback(() => {
    if (!attempt) return
    const done = { ...attempt, finishedAt: Date.now() }
    saveAttempt(key, done)
    stopSpeaking()
    navigate(`/result/${setId}?from=${sourceMode}`)
  }, [attempt, key, setId, sourceMode])

  // หมดเวลา → ส่งอัตโนมัติ
  useEffect(() => {
    if (timedActive && attempt.deadline && now >= attempt.deadline) finish()
  }, [timedActive, attempt, now, finish])

  useEffect(() => {
    replaceQuery(mode === 'practice' ? `/exam/${setId}` : `/exam/${setId}/${mode}`, mode === 'review' ? { from: sourceMode, q: current } : { q: current })
    stopSpeaking()
  }, [current, mode, setId, sourceMode])

  useEffect(() => () => stopSpeaking(), [])

  const question = set?.questions.find((item) => item.n === current)
  const isRevealed = useCallback((n) => {
    if (mode === 'review') return true
    if (mode === 'practice') return answers[n] !== undefined
    return false
  }, [mode, answers])

  const choose = useCallback((index) => {
    if (!attempt || !question) return
    if (mode === 'review') return
    if (mode === 'practice' && answers[question.n] !== undefined) return
    const next = { ...attempt, answers: { ...attempt.answers, [question.n]: index } }
    setAttempt(next)
    saveAttempt(key, next)
    if (mode === 'practice' && auto) speak(teachingScript(question), `teach-${set.id}-${question.n}`)
  }, [attempt, question, mode, answers, key, auto, set])

  const go = useCallback((n) => {
    if (!set) return
    const clamped = Math.min(Math.max(n, 1), set.questions.length)
    setCurrent(clamped)
    setShowGrid(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [set])

  // คีย์ลัด: 1–4 เลือกคำตอบ, ← → เปลี่ยนข้อ
  useEffect(() => {
    const onKey = (event) => {
      if (event.target.closest?.('input, textarea')) return
      if (['1', '2', '3', '4'].includes(event.key)) choose(Number(event.key) - 1)
      if (event.key === 'ArrowRight') go(current + 1)
      if (event.key === 'ArrowLeft') go(current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [choose, go, current])

  if (!set) {
    return (
      <div className="page narrow">
        <p>ไม่พบชุดข้อสอบนี้</p>
        <a className="btn" href={href('/exam')}>กลับไปเลือกชุด</a>
      </div>
    )
  }

  if (mode === 'timed' && (!attempt || attempt.finishedAt)) {
    return <TimedIntro set={set} onStart={() => setAttempt(startAttempt(key, 'timed', set.timeLimit))} />
  }

  if (mode === 'review' && !attempt) {
    return (
      <div className="page narrow">
        <p>ยังไม่มีคำตอบให้ดูเฉลย ลองทำข้อสอบชุดนี้ก่อนนะ</p>
        <a className="btn btn-primary" href={href(`/exam/${setId}`)}>เริ่มทำ</a>
      </div>
    )
  }

  if (!question || !attempt) return null

  const answeredCount = set.questions.filter((item) => answers[item.n] !== undefined).length
  const revealed = isRevealed(question.n)
  const chosen = answers[question.n]
  const remaining = timedActive ? attempt.deadline - now : 0
  const isLast = current === set.questions.length

  return (
    <div className="quiz">
      <div className="quiz-bar">
        <div className="quiz-bar-inner">
          <a className="back" href={href('/exam')} onClick={() => stopSpeaking()}>← ออก</a>
          <div className="quiz-bar-title">
            <span>{set.title}</span>
            <small>
              {mode === 'practice' && 'ฝึกทีละข้อ · เฉลยทันที'}
              {mode === 'timed' && 'จำลองสอบ · เฉลยหลังส่ง'}
              {mode === 'review' && 'ดูเฉลย'}
            </small>
          </div>
          {timedActive && <span className={`timer${remaining < 5 * 60 * 1000 ? ' is-low' : ''}`}>⏱ {formatTime(remaining)}</span>}
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowGrid((value) => !value)} aria-expanded={showGrid}>
            ข้อ {current}/{set.questions.length} ▾
          </button>
        </div>
        <div className="progress" aria-hidden="true"><span style={{ width: `${(answeredCount / set.questions.length) * 100}%` }} /></div>
      </div>

      {showGrid && (
        <div className="grid-sheet">
          <div className="grid-legend">
            <span><i className="dot" /> ยังไม่ทำ</span>
            {mode === 'timed' ? <span><i className="dot is-done" /> ตอบแล้ว</span> : (
              <>
                <span><i className="dot is-right" /> ถูก</span>
                <span><i className="dot is-wrong" /> ผิด</span>
              </>
            )}
          </div>
          {['grammar', 'reading'].map((part) => (
            <div key={part}>
              <p className="eyebrow">{part === 'grammar' ? 'Part I · Grammar' : 'Part II · Reading'}</p>
              <div className="qgrid">
                {set.questions.filter((item) => item.part === part).map((item) => {
                  const picked = answers[item.n]
                  let state = ''
                  if (picked !== undefined) state = isRevealed(item.n) ? (picked === item.answer ? ' is-right' : ' is-wrong') : ' is-done'
                  return (
                    <button key={item.n} type="button" className={`qcell${state}${item.n === current ? ' is-current' : ''}`} onClick={() => go(item.n)}>
                      {item.n}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="quiz-body">
        <Passage set={set} question={question} answers={answers} reveal={isRevealed} onJump={go} />

        <div className="qpanel">
          <div className="card question">
            <p className="eyebrow">ข้อ {question.n} · {question.part === 'grammar' ? 'Grammar' : 'Reading'}</p>
            <h2 className="question-text" lang={question.q ? 'en' : undefined}>
              {question.q || <>เลือกคำที่เหมาะสมที่สุดสำหรับช่องว่าง <span className="blank-ref">({question.n})</span></>}
            </h2>
            <div className="choices" role="list">
              {question.choices.map((choice, index) => {
                let state = ''
                if (revealed) {
                  if (index === question.answer) state = ' is-right'
                  else if (index === chosen) state = ' is-wrong'
                  else state = ' is-dim'
                } else if (index === chosen) {
                  state = ' is-picked'
                }
                return (
                  <button
                    key={index}
                    type="button"
                    role="listitem"
                    className={`choice${state}`}
                    onClick={() => choose(index)}
                    disabled={revealed}
                  >
                    <span className="choice-num">{choiceLabel(index)}</span>
                    <span className="choice-text" lang="en">{choice}</span>
                    {revealed && index === question.answer && <span className="choice-mark" aria-label="คำตอบที่ถูก">✓</span>}
                    {revealed && index === chosen && index !== question.answer && <span className="choice-mark" aria-label="คำตอบที่เลือก">✗</span>}
                  </button>
                )
              })}
            </div>
            {mode === 'practice' && !revealed && <p className="muted small hint">เลือกคำตอบ แล้วเฉลยพร้อมคำอธิบายจะขึ้นทันที</p>}
          </div>

          {revealed && <Explanation set={set} question={question} chosen={chosen} />}

          {mode === 'practice' && (
            <label className="switch">
              <input
                type="checkbox"
                checked={auto}
                onChange={(event) => {
                  setAuto(event.target.checked)
                  try {
                    localStorage.setItem(AUTO_KEY, event.target.checked ? '1' : '0')
                  } catch {
                    // ignore
                  }
                }}
              />
              <span>ให้ครูพูดอธิบายอัตโนมัติหลังตอบ</span>
            </label>
          )}
          {revealed && <ThaiVoiceNotice />}

          <div className="qnav">
            <button type="button" className="btn" onClick={() => go(current - 1)} disabled={current === 1}>← ข้อก่อน</button>
            {!isLast && (
              <button type="button" className="btn btn-primary" onClick={() => go(current + 1)}>
                {mode === 'practice' && !revealed ? 'ข้ามไปก่อน →' : 'ข้อต่อไป →'}
              </button>
            )}
            {isLast && mode !== 'review' && (
              <button type="button" className="btn btn-primary" onClick={() => (mode === 'timed' ? setConfirmSubmit(true) : finish())}>
                {mode === 'timed' ? 'ส่งคำตอบ' : 'ดูผลคะแนน'}
              </button>
            )}
            {isLast && mode === 'review' && (
              <a className="btn btn-primary" href={href(`/result/${setId}?from=${sourceMode}`)}>กลับไปหน้าคะแนน</a>
            )}
          </div>

          {mode !== 'review' && !isLast && (
            <button
              type="button"
              className="link-btn"
              onClick={() => (mode === 'timed' ? setConfirmSubmit(true) : finish())}
            >
              {mode === 'timed' ? 'ส่งคำตอบตอนนี้' : `จบรอบนี้และดูผลคะแนน (ทำไปแล้ว ${answeredCount} ข้อ)`}
            </button>
          )}
        </div>
      </div>

      {confirmSubmit && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="submit-title">
          <div className="modal-card">
            <h2 id="submit-title">ส่งคำตอบเลยไหม?</h2>
            <p>ตอบแล้ว {answeredCount} จาก {set.questions.length} ข้อ{answeredCount < set.questions.length ? ' ข้อที่ยังไม่ตอบจะนับเป็นผิด' : ''}</p>
            <div className="modal-actions">
              <button type="button" className="btn" onClick={() => setConfirmSubmit(false)}>กลับไปทำต่อ</button>
              <button type="button" className="btn btn-primary" onClick={finish}>ส่งคำตอบ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
