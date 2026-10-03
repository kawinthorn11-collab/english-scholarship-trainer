import { useEffect, useState } from 'react'
import Mascot from './Mascot'

const STARS = [
  [8, 12, 0], [22, 64, 1.2], [35, 28, 2.1], [48, 82, 0.6], [61, 18, 1.8], [74, 55, 2.6],
  [86, 9, 0.9], [93, 71, 3.1], [15, 88, 2.4], [55, 44, 3.6], [80, 33, 1.5], [40, 6, 2.9],
]

export function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden>
      <div className="aurora__blob aurora__blob--1" />
      <div className="aurora__blob aurora__blob--2" />
      <div className="aurora__blob aurora__blob--3" />
      <div className="aurora__grid" />
      {STARS.map(([left, top, delay], i) => (
        <span key={i} className="aurora__star" style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }} />
      ))}
    </div>
  )
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden" aria-hidden>
      <div
        className="h-full origin-left bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}

export function BrandLogo({ onClick }) {
  return (
    <button onClick={onClick} className="group flex items-center gap-2.5" aria-label="ไปหน้าแรก">
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-900/50 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <Mascot mood="happy" size={40} className="mt-2" />
      </span>
      <span className="text-left leading-none">
        <span className="block font-display text-lg font-semibold text-white">Scholar<span className="gradient-text">Owl</span></span>
        <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-purple-300/70">Exam Trainer</span>
      </span>
    </button>
  )
}

export function SiteFooter({ onNavigate }) {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row">
        <div className="flex items-center gap-3">
          <Mascot mood="happy" size={44} />
          <div>
            <p className="font-display font-semibold text-white">ScholarOwl</p>
            <p className="text-xs text-purple-300/70">ฝึกสอบชิงทุนภาษาอังกฤษ · Original practice questions only</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-purple-300/80">
          <button onClick={() => onNavigate('dashboard')} className="transition hover:text-white">Dashboard</button>
          <button onClick={() => onNavigate('mock-exam')} className="transition hover:text-white">Mock Exam</button>
          <button onClick={() => onNavigate('academy')} className="transition hover:text-white">Academy</button>
          <button onClick={() => onNavigate('listening')} className="transition hover:text-white">Listening</button>
        </div>
      </div>
    </footer>
  )
}
