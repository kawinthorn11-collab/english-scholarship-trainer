import { useEffect, useState } from 'react'
import Mascot, { SpeechBubble } from './Mascot'
import SpeakButton from './SpeakButton'
import { getTipArea, getTipsForPage } from '../data/mascotTips'

const SEEN_KEY = 'exam-trainer-owl-greeted'

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

/** Floating ครูฮูก that teaches a short tip relevant to the current page. */
export default function MascotHelper({ page }) {
  const area = getTipArea(page)
  const tips = getTipsForPage(page)
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [peek, setPeek] = useState(false)
  const [prevArea, setPrevArea] = useState(area)

  if (prevArea !== area) {
    setPrevArea(area)
    setIndex(0)
  }

  // Say hi once per browser session (not during the exam).
  useEffect(() => {
    if (area === 'exam' || hasGreeted()) return undefined
    const show = window.setTimeout(() => setPeek(true), 1800)
    const hide = window.setTimeout(() => { setPeek(false); markGreeted() }, 7800)
    return () => { window.clearTimeout(show); window.clearTimeout(hide) }
  }, [area])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const tip = tips[index % tips.length]
  const nextTip = () => setIndex((i) => (i + 1) % tips.length)

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="glass-strong w-[min(22rem,calc(100vw-2rem))] origin-bottom-right animate-pop rounded-3xl p-5" role="dialog" aria-label="ครูฮูกสอน">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="eyebrow">🦉 ครูฮูกสอน · {index % tips.length + 1}/{tips.length}</p>
            <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-purple-300 transition hover:bg-white/10 hover:text-white" aria-label="ปิด">
              ✕
            </button>
          </div>
          <h3 className="text-lg font-semibold text-white">{tip.title}</h3>
          <SpeechBubble key={`${area}-${index}`} text={tip.text} side="bottom" className="mt-3 !bg-white/[0.05]">
            {tip.example && (
              <div className="mt-3 flex items-center gap-2 rounded-2xl bg-violet-500/15 px-3 py-2">
                <p className="min-w-0 flex-1 text-sm italic text-violet-100">“{tip.example}”</p>
                <SpeakButton text={tip.example} size="sm" />
              </div>
            )}
          </SpeechBubble>
          <div className="mt-4 flex gap-2">
            <button onClick={nextTip} className="btn btn-primary flex-1 !py-2.5 text-sm">ทิปถัดไป →</button>
          </div>
        </div>
      )}

      {!open && peek && (
        <button onClick={() => { setOpen(true); setPeek(false); markGreeted() }} className="glass-strong animate-pop rounded-2xl rounded-br-sm px-4 py-3 text-left text-sm text-purple-50 shadow-xl">
          สวัสดี! ฉันคือ <b>ครูฮูก</b> 🦉<br />
          <span className="text-purple-300">กดที่ฉันเพื่อรับเทคนิคสอบได้เลย</span>
        </button>
      )}

      <button
        onClick={() => { setOpen((v) => !v); setPeek(false); markGreeted() }}
        className="group relative flex h-14 w-14 sm:h-[76px] sm:w-[76px] items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-violet-600/90 to-fuchsia-600/80 shadow-[0_16px_40px_-12px_rgba(168,85,247,0.8)] backdrop-blur transition hover:scale-105 active:scale-95"
        aria-label={open ? 'ปิดครูฮูก' : 'เปิดครูฮูกสอน'}
        aria-expanded={open}
      >
        {!open && <span aria-hidden className="absolute inset-0 rounded-full border-2 border-fuchsia-400/60" style={{ animation: 'ping-soft 2.4s ease-out infinite' }} />}
        <Mascot mood={open ? 'teach' : 'wave'} size={62} className="-mb-2 w-[46px]! sm:w-[62px]! transition-transform group-hover:-rotate-6" />
      </button>
    </div>
  )
}
