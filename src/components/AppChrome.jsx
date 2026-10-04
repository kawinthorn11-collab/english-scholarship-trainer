import { useEffect, useState } from 'react'
import Mascot from './Mascot'

const STARS = [
  [8, 12, 0], [22, 64, 1.2], [35, 28, 2.1], [48, 82, 0.6], [61, 18, 1.8], [74, 55, 2.6],
  [86, 9, 0.9], [93, 71, 3.1], [15, 88, 2.4], [55, 44, 3.6], [80, 33, 1.5], [40, 6, 2.9],
]

const FLOAT_COLORS = ['#ff8cc6', '#ffd27a', '#7ee7ff', '#b9a4ff', '#86efac']
const FLOATS = [
  ['A', 6, 34, 26, 0, 0.16], ['b', 18, 22, 21, 6, 0.2], ['★', 29, 18, 18, 2, 0.35], ['C', 41, 40, 30, 11, 0.12],
  ['?', 53, 26, 23, 4, 0.2], ['!', 64, 24, 20, 14, 0.2], ['♥', 75, 18, 19, 8, 0.3], ['E', 86, 36, 28, 1, 0.14],
  ['z', 94, 22, 24, 16, 0.18], ['★', 12, 14, 17, 10, 0.35], ['G', 70, 30, 27, 19, 0.12], ['✿', 47, 20, 22, 21, 0.25],
]

export function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden>
      <div className="aurora__blob aurora__blob--1" />
      <div className="aurora__blob aurora__blob--2" />
      <div className="aurora__blob aurora__blob--3" />
      <div className="aurora__blob aurora__blob--4" />
      {FLOATS.map(([char, left, size, dur, delay, op], i) => (
        <span key={`f${i}`} className="aurora__float" style={{ left: `${left}%`, fontSize: size, color: FLOAT_COLORS[i % FLOAT_COLORS.length], '--dur': `${dur}s`, '--delay': `${delay}s`, '--op': op }}>
          {char}
        </span>
      ))}
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
    <button onClick={onClick} className="group flex items-center gap-2" aria-label="ไปหน้าแรก">
      <span className="relative flex h-11 w-[4.25rem] items-end justify-center">
        <Mascot character="pig" size={38} className="absolute bottom-0 left-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-rotate-6" />
        <Mascot character="buffalo" size={40} className="absolute bottom-0 right-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6" />
      </span>
      <span className="text-left leading-none">
        <span className="block font-display text-lg font-semibold text-white">Moo<span className="gradient-text">Kwai</span></span>
        <span className="block whitespace-nowrap text-[11px] font-medium text-pink-200/80">หมูควายติวทุน</span>
      </span>
    </button>
  )
}

export function SiteFooter({ onNavigate }) {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row">
        <div className="flex items-center gap-3">
          <Mascot character="pig" mood="wave" size={48} />
          <Mascot character="buffalo" mood="happy" size={50} />
          <div>
            <p className="font-display font-semibold text-white">MooKwai · หมูควายติวทุน</p>
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
