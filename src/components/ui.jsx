import { useEffect, useState } from 'react'
import Mascot from './Mascot'
import { prefersReducedMotion } from '../hooks/useMotion'

/** Consistent page heading with an optional mascot on the right. */
export function PageHeader({ eyebrow, title, subtitle, mood, children, icon }) {
  return (
    <header className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-pink-500/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          {eyebrow && <p className="eyebrow">{icon && <span className="text-base">{icon}</span>}{eyebrow}</p>}
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">{title}</h1>
          {subtitle && <p className="max-w-2xl text-[15px] leading-relaxed text-purple-200/80">{subtitle}</p>}
          {children && <div className="pt-2">{children}</div>}
        </div>
        {mood && (
          <div className="mx-auto flex shrink-0 items-end -space-x-5 sm:mx-0">
            <Mascot character="pig" mood={mood === 'teach' ? 'happy' : mood} size={112} />
            <Mascot character="buffalo" mood={mood} size={122} />
          </div>
        )}
      </div>
    </header>
  )
}

/** Section title used inside pages. */
export function SectionTitle({ icon, title, subtitle, action }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
          {icon && <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.07] text-lg">{icon}</span>}
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-purple-300/80">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

function parseCount(value) {
  if (typeof value === 'number') return { num: value, prefix: '', suffix: '', decimals: 0 }
  const match = String(value).match(/^(\D*)(-?\d+(?:\.\d+)?)(.*)$/)
  if (!match) return null
  const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0
  return { prefix: match[1], num: Number(match[2]), suffix: match[3], decimals }
}

/** Animated number. Accepts numbers or strings like "12m", "85%", "1.5h". */
export function CountUp({ value, duration = 1100 }) {
  const parsed = parseCount(value)
  const target = parsed?.num
  const [display, setDisplay] = useState(0)
  const reduce = prefersReducedMotion()

  useEffect(() => {
    if (target === undefined || reduce) return undefined
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, reduce])

  if (!parsed) return <>{value}</>
  const shown = reduce ? parsed.num : display
  return <>{parsed.prefix}{shown.toFixed(parsed.decimals)}{parsed.suffix}</>
}

/** Circular progress ring that animates in. */
export function ProgressRing({ percent = 0, size = 168, stroke = 14, children, color }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const t = window.setTimeout(() => setShown(percent), 80)
    return () => window.clearTimeout(t)
  }, [percent])

  const tone = color || (percent >= 75 ? '#34d399' : percent >= 60 ? '#fbbf24' : percent >= 40 ? '#a78bfa' : '#fb7185')

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgb(255 255 255 / 0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={tone}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * Math.max(0, Math.min(100, shown))) / 100}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.2, 0.8, 0.2, 1)', filter: `drop-shadow(0 0 10px ${tone}88)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  )
}

const CONFETTI_COLORS = ['#a78bfa', '#f472b6', '#fbbf24', '#34d399', '#60a5fa', '#f87171']

/** Lightweight CSS confetti burst. */
export function Confetti({ count = 70 }) {
  const [alive, setAlive] = useState(true)
  const [pieces] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 0.6,
      dur: 2.4 + Math.random() * 1.8,
      drift: (Math.random() - 0.5) * 260,
      spin: (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 720),
      round: Math.random() > 0.6,
    }))
  )

  useEffect(() => {
    const t = window.setTimeout(() => setAlive(false), 5000)
    return () => window.clearTimeout(t)
  }, [])

  if (!alive || prefersReducedMotion()) return null
  return (
    <div aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}vw`,
            background: p.color,
            borderRadius: p.round ? '9999px' : '3px',
            '--delay': `${p.delay}s`,
            '--dur': `${p.dur}s`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  )
}

/** Small stat tile with icon + animated value. */
export function StatTile({ icon, label, value, accent = 'from-violet-500/30 to-fuchsia-500/10' }) {
  return (
    <div className="glass lift group relative overflow-hidden rounded-3xl p-5">
      <div aria-hidden className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${accent} blur-2xl transition-transform duration-500 group-hover:scale-150`} />
      <div className="relative flex items-center gap-4">
        {icon && (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.07] text-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-purple-300/80">{label}</p>
          <p className="mt-0.5 font-display text-2xl font-semibold text-white">
            <CountUp value={value} />
          </p>
        </div>
      </div>
    </div>
  )
}
