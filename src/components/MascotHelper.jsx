import { useEffect, useState } from 'react'
import Mascot, { SpeechBubble } from './Mascot'
import { getTipArea, getTipsForPage } from '../data/mascotTips'
import { useVoice } from '../hooks/useVoice'
import { speakLine, stopVoice } from '../utils/voice'

const SEEN_KEY = 'exam-trainer-duo-greeted'

function hasGreeted() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return true
  }
}

function markGreeted() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    // optional
  }
}

/** Floating pig & buffalo that teach (and read aloud) a short tip for the current page. */
export default function MascotHelper({ page }) {
  const area = getTipArea(page)
  const tips = getTipsForPage(page)
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [peek, setPeek] = useState(false)
  const [prevArea, setPrevArea] = useState(area)
  const voice = useVoice()

  if (prevArea !== area) {
    setPrevArea(area)
    setIndex(0)
  }

  // Say hi once per browser session (not during the exam).
  useEffect(() => {
    if (area === 'exam' || hasGreeted()) return undefined
    const show = window.setTimeout(() => setPeek(true), 1800)
    const hide = window.setTimeout(() => { setPeek(false); markGreeted() }, 8000)
    return () => { window.clearTimeout(show); window.clearTimeout(hide) }
  }, [area])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const tip = tips[index % tips.length]
  const speaker = index % 2 === 0 ? 'pig' : 'buffalo'
  const lineId = `tip-${area}-${index}`
  const speaking = voice.lineId === lineId

  const sayTip = (i = index) => {
    const t = tips[i % tips.length]
    speakLine(`${t.title}. ${t.text} ${t.example || ''}`, { speaker: i % 2 === 0 ? 'pig' : 'buffalo', lineId: `tip-${area}-${i}` })
  }

  const nextTip = () => {
    const next = (index + 1) % tips.length
    setIndex(next)
    sayTip(next)
  }

  const toggle = () => {
    if (open) {
      stopVoice()
      setOpen(false)
    } else {
      setOpen(true)
      sayTip()
    }
    setPeek(false)
    markGreeted()
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="glass-strong relative w-[min(23rem,calc(100vw-2rem))] origin-bottom-right animate-pop overflow-hidden rounded-[2rem] p-5" role="dialog" aria-label="หมูควายสอน">
          <div aria-hidden className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${speaker === 'pig' ? 'bg-pink-500/40' : 'bg-sky-400/40'}`} />
          <div className="relative mb-3 flex items-center justify-between gap-2">
            <p className="eyebrow">{speaker === 'pig' ? '🐷 ครูหมูหวานสอน' : '🐃 ครูควายขยันสอน'} · {index % tips.length + 1}/{tips.length}</p>
            <button onClick={toggle} className="flex h-8 w-8 items-center justify-center rounded-full text-pink-100 transition hover:bg-white/10 hover:text-white" aria-label="ปิด">
              ✕
            </button>
          </div>
          <div className="relative flex items-end gap-3">
            <Mascot character={speaker} mood="teach" talking={speaking} size={84} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold leading-snug text-white">{tip.title}</h3>
            </div>
          </div>
          <SpeechBubble key={lineId} text={tip.text} tone={speaker} side="bottom" className="relative mt-3">
            {tip.example && (
              <p className="mt-3 rounded-2xl bg-yellow-300/15 px-3 py-2 font-display text-[15px] text-yellow-50">🇬🇧 {tip.example}</p>
            )}
          </SpeechBubble>
          <div className="relative mt-4 flex gap-2">
            <button onClick={() => (speaking ? stopVoice() : sayTip())} className="btn btn-ghost !px-4 !py-2.5 text-sm">
              {speaking ? '⏹ หยุด' : '🔊 ฟังอีกครั้ง'}
            </button>
            <button onClick={nextTip} className="btn btn-primary flex-1 !py-2.5 text-sm">ทิปถัดไป →</button>
          </div>
        </div>
      )}

      {!open && peek && (
        <button onClick={toggle} className="glass-strong animate-pop rounded-2xl rounded-br-sm px-4 py-3 text-left text-sm text-pink-50 shadow-xl">
          สวัสดี! เราคือ <b>หมูหวาน</b> กับ <b>ควายขยัน</b> 🐷🐃<br />
          <span className="text-pink-200/80">กดที่เรา แล้วฟังเทคนิคสอบได้เลย 🔊</span>
        </button>
      )}

      <button
        onClick={toggle}
        className="group relative flex h-16 w-[5.5rem] items-end justify-center rounded-full border border-white/20 bg-gradient-to-br from-pink-500 to-orange-400 shadow-[0_16px_40px_-10px_rgba(255,61,139,0.9)] transition hover:scale-105 active:scale-95 sm:h-[76px] sm:w-[6.5rem]"
        aria-label={open ? 'ปิดหมูควายสอน' : 'เปิดหมูควายสอน (มีเสียง)'}
        aria-expanded={open}
      >
        {!open && <span aria-hidden className="absolute inset-0 rounded-full border-2 border-pink-300/70" style={{ animation: 'ping-soft 2.4s ease-out infinite' }} />}
        <Mascot character="pig" mood={open ? 'teach' : 'wave'} talking={voice.speaker === 'pig' && open} size={46} className="-mb-1 -mr-2 transition-transform group-hover:-rotate-6" />
        <Mascot character="buffalo" mood="happy" talking={voice.speaker === 'buffalo' && open} size={48} className="-mb-1 transition-transform group-hover:rotate-6" />
      </button>
    </div>
  )
}
