import { useEffect, useState } from 'react'
import Mascot, { SpeechBubble } from '../components/Mascot'
import { Confetti } from '../components/ui'
import { duoCast, duoLessons, encourageLines, getDuoLesson, praiseLines } from '../data/duoLessons'
import { useVoice } from '../hooks/useVoice'
import { hasThaiVoice, speakLine, stopVoice } from '../utils/voice'
import { isSpeechSupported } from '../utils/speech'
import { recordListeningActivity } from '../utils/localStats'
import { useSpeech } from '../hooks/useSpeech'

const DONE_KEY = 'duo-lessons-done'

function readDone() {
  try {
    return JSON.parse(localStorage.getItem(DONE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveDone(next) {
  try {
    localStorage.setItem(DONE_KEY, JSON.stringify(next))
  } catch {
    // optional
  }
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)]
}

export default function ClassRoom({ onNavigate }) {
  const [lessonId, setLessonId] = useState(duoLessons[0].id)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [slow, setSlow] = useState(false)
  const [listenOnly, setListenOnly] = useState(false)
  const [picked, setPicked] = useState(null)
  const [done, setDone] = useState(readDone)
  const voice = useVoice()
  useSpeech() // re-render once the device's voices finish loading

  const lesson = getDuoLesson(lessonId)
  const total = lesson.lines.length
  const inQuiz = step >= total
  const line = inQuiz ? null : lesson.lines[step]
  const rate = slow ? 0.8 : 1
  const thaiVoice = hasThaiVoice()

  // Auto-play: speak the current line, then move on.
  useEffect(() => {
    if (!playing) return undefined
    let cancelled = false
    const run = async () => {
      if (step < total) {
        const current = lesson.lines[step]
        const text = current.example ? `${current.text} ${current.example}` : current.text
        const finished = await speakLine(text, { speaker: current.who, lineId: `${lesson.id}-${step}`, rate })
        if (!finished || cancelled) return
        await new Promise((resolve) => window.setTimeout(resolve, 380))
        if (!cancelled) setStep((value) => value + 1)
      } else {
        setPlaying(false)
        recordListeningActivity({ seconds: total * 4 })
        await speakLine(`ถึงเวลาทดสอบ! ${lesson.quiz.question}`, { speaker: 'pig', lineId: `${lesson.id}-quiz`, rate })
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [playing, step, lesson, total, rate])

  useEffect(() => () => stopVoice(), [])

  const openLesson = (id) => {
    stopVoice()
    setLessonId(id)
    setStep(0)
    setPicked(null)
    setPlaying(false)
    setStarted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const play = () => {
    setStarted(true)
    if (inQuiz) {
      setStep(0)
      setPicked(null)
    }
    setPlaying(true)
  }

  const pause = () => {
    setPlaying(false)
    stopVoice()
  }

  const goTo = (next) => {
    stopVoice()
    setStarted(true)
    setPicked(null)
    setStep(Math.max(0, Math.min(total, next)))
  }

  const replayLine = () => {
    if (!line) return
    setPlaying(false)
    const text = line.example ? `${line.text} ${line.example}` : line.text
    speakLine(text, { speaker: line.who, lineId: `${lesson.id}-${step}`, rate })
  }

  const answer = (choice) => {
    if (picked) return
    setPicked(choice)
    const correct = choice === lesson.quiz.answer
    if (correct) {
      const next = { ...done, [lesson.id]: true }
      setDone(next)
      saveDone(next)
    }
    speakLine(`${correct ? pick(praiseLines) : pick(encourageLines)} ${lesson.quiz.explain}`, {
      speaker: correct ? 'pig' : 'buffalo',
      lineId: `${lesson.id}-answer`,
      rate,
    })
  }

  const nextLesson = () => {
    const index = duoLessons.findIndex((item) => item.id === lesson.id)
    openLesson(duoLessons[(index + 1) % duoLessons.length].id)
  }

  const correct = picked && picked === lesson.quiz.answer
  const speaker = line?.who
  const pigMood = picked ? (correct ? 'cheer' : 'happy') : inQuiz ? 'think' : speaker === 'pig' ? 'teach' : 'happy'
  const buffaloMood = picked ? (correct ? 'cheer' : 'oops') : inQuiz ? 'think' : speaker === 'buffalo' ? 'teach' : 'happy'
  const doneCount = Object.keys(done).length

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="text-center">
        <p className="eyebrow justify-center">🎧 ฟังก่อน อ่านทีหลัง</p>
        <h1 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">
          ห้องเรียน<span className="gradient-text">หมูควาย</span> 🐷🐃
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[15px] text-purple-100/80">
          บทละ 1 นาที กด ▶ แล้วฟังครูหมูหวานกับครูควายขยันคุยกัน จบแล้วตอบคำถาม 1 ข้อ
        </p>
      </div>

      {/* Stage */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/15 shadow-[0_40px_80px_-40px_rgba(255,61,139,0.6)]">
        {picked && correct && <Confetti key={lesson.id} />}
        <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${lesson.color} opacity-30`} />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgba(255,255,255,0.18),transparent_60%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="relative p-5 sm:p-8">
          {/* lesson title + progress */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${lesson.color} text-2xl shadow-lg`}>{lesson.emoji}</span>
              <div>
                <h2 className="text-xl font-semibold text-white sm:text-2xl">{lesson.title}</h2>
                <p className="text-sm text-white/75">{lesson.titleThai}</p>
              </div>
            </div>
            <div className="flex gap-1.5" aria-label={`ขั้นที่ ${Math.min(step + 1, total + 1)} จาก ${total + 1}`}>
              {Array.from({ length: total + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={i === total ? 'คำถาม' : `ประโยคที่ ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-white' : i < step ? 'w-2.5 bg-white/70' : 'w-2.5 bg-white/25'}`}
                />
              ))}
            </div>
          </div>

          {/* characters + bubble */}
          <div className="mt-6 grid items-end gap-4 sm:grid-cols-[auto_1fr_auto]">
            <div className={`hidden flex-col items-center transition-all duration-500 sm:flex ${speaker === 'pig' || !speaker ? 'scale-100 opacity-100' : 'scale-90 opacity-80'}`}>
              <Mascot character="pig" mood={pigMood} talking={voice.speaker === 'pig'} size={170} />
              <span className="chip mt-1">🐷 {duoCast.pig.short}</span>
            </div>

            <div className="min-h-[220px] self-center">
              {!started ? (
                <div className="flex flex-col items-center gap-4 py-6 text-center">
                  <button
                    onClick={play}
                    className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl text-pink-600 shadow-[0_0_0_10px_rgba(255,255,255,0.15),0_20px_50px_-10px_rgba(255,61,139,0.9)] transition hover:scale-110"
                    aria-label="เริ่มฟังบทเรียน"
                  >
                    <span aria-hidden className="absolute inset-0 rounded-full border-4 border-white/60" style={{ animation: 'ping-soft 1.8s ease-out infinite' }} />
                    <span className="ml-1.5">▶</span>
                  </button>
                  <p className="font-display text-lg text-white">กดเพื่อฟังบทเรียน</p>
                </div>
              ) : line ? (
                <div key={`${lesson.id}-${step}`} className="space-y-4" style={{ animation: 'fade-up 0.45s ease both' }}>
                  <p className="text-sm font-semibold text-white/80">
                    {duoCast[line.who].emoji} {duoCast[line.who].name}
                  </p>
                  {listenOnly ? (
                    <div className="flex items-center gap-4 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
                      <EqBars active={Boolean(voice.speaker)} />
                      <p className="text-white/85">โหมดฟังอย่างเดียว — ตั้งใจฟังนะ 👂</p>
                    </div>
                  ) : (
                    <SpeechBubble text={line.text} tone={line.who} side={line.who === 'pig' ? 'left' : 'right'} className="text-lg" />
                  )}
                  {line.example && !listenOnly && (
                    <div className="flex items-center gap-3 rounded-2xl border border-yellow-200/30 bg-yellow-300/15 px-4 py-3 shadow-lg" style={{ animation: 'pop 0.45s 0.3s cubic-bezier(0.2,1.4,0.4,1) both' }}>
                      <span className="text-xl">🇬🇧</span>
                      <p className="min-w-0 flex-1 font-display text-lg text-yellow-50 sm:text-xl">{line.example}</p>
                      <button onClick={() => speakLine(line.example, { speaker: line.who, rate })} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 transition hover:scale-110 hover:bg-white/30" aria-label="ฟังประโยคตัวอย่าง">🔊</button>
                    </div>
                  )}
                </div>
              ) : (
                <Quiz lesson={lesson} picked={picked} onPick={answer} rate={rate} />
              )}
            </div>

            <div className={`hidden flex-col items-center transition-all duration-500 sm:flex ${speaker === 'buffalo' || !speaker ? 'scale-100 opacity-100' : 'scale-90 opacity-80'}`}>
              <Mascot character="buffalo" mood={buffaloMood} talking={voice.speaker === 'buffalo'} size={170} />
              <span className="chip mt-1">🐃 {duoCast.buffalo.short}</span>
            </div>
          </div>

          {/* mobile cast */}
          <div className="mt-4 flex items-end justify-center gap-6 sm:hidden">
            <Mascot character="pig" mood={pigMood} talking={voice.speaker === 'pig'} size={speaker === 'pig' ? 120 : 96} className="transition-all duration-500" />
            <Mascot character="buffalo" mood={buffaloMood} talking={voice.speaker === 'buffalo'} size={speaker === 'buffalo' ? 120 : 96} className="transition-all duration-500" />
          </div>

          {/* controls */}
          {started && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <IconButton label="ย้อนกลับ" onClick={() => goTo(step - 1)} disabled={step === 0}>⏮</IconButton>
              {playing ? (
                <button onClick={pause} className="btn btn-primary h-14 w-14 !p-0 text-2xl" aria-label="หยุด">⏸</button>
              ) : (
                <button onClick={play} className="btn btn-primary h-14 w-14 !p-0 text-2xl" aria-label="เล่น">▶</button>
              )}
              <IconButton label="ถัดไป" onClick={() => goTo(step + 1)} disabled={inQuiz}>⏭</IconButton>
              <IconButton label="ฟังประโยคนี้อีกครั้ง" onClick={replayLine} disabled={inQuiz}>🔁</IconButton>
              <Toggle on={slow} onClick={() => setSlow((v) => !v)}>🐢 ช้า</Toggle>
              <Toggle on={listenOnly} onClick={() => setListenOnly((v) => !v)}>👂 ฟังอย่างเดียว</Toggle>
            </div>
          )}

          {inQuiz && picked && (
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row" style={{ animation: 'fade-up 0.4s ease both' }}>
              <button onClick={nextLesson} className="btn btn-primary">บทถัดไป →</button>
              <button onClick={() => { setPicked(null); setStep(0); setPlaying(true) }} className="btn btn-ghost">🔁 ฟังบทนี้อีกครั้ง</button>
            </div>
          )}

          {!isSpeechSupported() && (
            <p className="mt-5 text-center text-xs text-white/70">เบราว์เซอร์นี้ไม่รองรับเสียงพูด ตัวการ์ตูนจะยังขยับปากและแสดงข้อความให้อ่านแทน</p>
          )}
          {isSpeechSupported() && started && !thaiVoice && (
            <p className="mt-5 text-center text-xs text-white/70">💡 เครื่องนี้ยังไม่มีเสียงภาษาไทย จึงจะได้ยินเฉพาะภาษาอังกฤษ (เพิ่มเสียงไทยได้ในการตั้งค่าภาษาของเครื่อง)</p>
          )}
        </div>
      </section>

      {/* Lesson picker */}
      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">เลือกบทเรียน</h2>
            <p className="text-sm text-purple-100/70">ผ่านแล้ว {doneCount}/{duoLessons.length} บท · บทละประมาณ 1 นาที</p>
          </div>
          <button onClick={() => onNavigate('listening')} className="chip transition hover:bg-pink-500/30">🎧 ฝึกฟังเพิ่ม →</button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {duoLessons.map((item) => {
            const active = item.id === lesson.id
            return (
              <button
                key={item.id}
                onClick={() => openLesson(item.id)}
                className={`group relative overflow-hidden rounded-3xl border p-4 text-left transition duration-300 hover:-translate-y-1 ${active ? 'border-white/60 bg-white/15 shadow-[0_20px_40px_-20px_rgba(255,61,139,0.8)]' : 'border-white/10 bg-white/[0.05] hover:border-white/30'}`}
              >
                <span aria-hidden className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${item.color} opacity-40 blur-xl transition-transform duration-500 group-hover:scale-150`} />
                <span className={`relative mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-xl shadow-md transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110`}>{item.emoji}</span>
                <span className="relative block text-sm font-semibold leading-snug text-white">{item.title}</span>
                <span className="relative mt-1 block text-[11px] text-white/60">{item.titleThai}</span>
                {done[item.id] && <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-xs font-bold text-emerald-950">✓</span>}
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function Quiz({ lesson, picked, onPick, rate }) {
  const { quiz } = lesson
  return (
    <div className="space-y-4" style={{ animation: 'fade-up 0.45s ease both' }}>
      <div className="flex items-start gap-3">
        <span className="chip shrink-0">❓ คำถาม</span>
        <button onClick={() => speakLine(quiz.question, { speaker: 'pig', rate })} className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition hover:scale-110" aria-label="ฟังคำถาม">🔊</button>
      </div>
      <p className="font-display text-xl leading-relaxed text-white sm:text-2xl">{quiz.question}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {quiz.choices.map((choice, i) => {
          const isAnswer = choice === quiz.answer
          const isPicked = choice === picked
          let tone = 'border-white/20 bg-white/10 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/20'
          if (picked) {
            if (isAnswer) tone = 'border-emerald-300 bg-emerald-400/25 animate-pop'
            else if (isPicked) tone = 'border-rose-300 bg-rose-400/25 animate-shake'
            else tone = 'border-white/10 bg-white/5 opacity-50'
          }
          return (
            <button
              key={choice}
              onClick={() => onPick(choice)}
              disabled={Boolean(picked)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-base font-medium text-white transition ${tone}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/20 text-sm font-bold">{i + 1}</span>
              <span className="min-w-0 flex-1">{choice}</span>
              {picked && isAnswer && <span>✅</span>}
              {isPicked && !isAnswer && <span>❌</span>}
            </button>
          )
        })}
      </div>
      {picked && (
        <p className={`rounded-2xl px-4 py-3 text-[15px] ${picked === quiz.answer ? 'bg-emerald-400/20 text-emerald-50' : 'bg-rose-400/20 text-rose-50'}`} style={{ animation: 'fade-up 0.35s ease both' }}>
          {picked === quiz.answer ? '🎉 ' : '💡 '}{quiz.explain}
        </p>
      )}
    </div>
  )
}

function IconButton({ label, onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg text-white backdrop-blur transition hover:scale-110 hover:bg-white/20 disabled:opacity-30 disabled:hover:scale-100"
    >
      {children}
    </button>
  )
}

function Toggle({ on, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${on ? 'border-white bg-white text-pink-600 shadow-lg' : 'border-white/20 bg-white/10 text-white hover:bg-white/20'}`}
    >
      {children}
    </button>
  )
}

function EqBars({ active }) {
  return (
    <div aria-hidden className="flex h-10 items-end gap-1">
      {[0, 1, 2, 3, 4, 5].map((bar) => (
        <span
          key={bar}
          className="w-1.5 rounded-full bg-gradient-to-t from-pink-400 to-yellow-200"
          style={{ height: '100%', transformOrigin: 'bottom', transform: active ? undefined : 'scaleY(0.25)', animation: active ? `eq ${0.5 + bar * 0.09}s ease-in-out ${bar * 0.07}s infinite` : 'none' }}
        />
      ))}
    </div>
  )
}
