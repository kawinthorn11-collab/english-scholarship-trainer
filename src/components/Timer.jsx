import { useState, useEffect, useRef } from 'react'

export default function Timer({ durationMinutes, onTimeUp, onElapsedChange }) {
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60)
  const startTimeRef = useRef(null)
  const totalSecondsRef = useRef(durationMinutes * 60)
  const onTimeUpRef = useRef(onTimeUp)
  const onElapsedChangeRef = useRef(onElapsedChange)
  const hasTriggeredRef = useRef(false)

  // Keep refs in sync without restarting the effect
  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  useEffect(() => {
    onElapsedChangeRef.current = onElapsedChange
  }, [onElapsedChange])

  useEffect(() => {
    // Set start time inside effect to avoid impure function call during render
    startTimeRef.current = Date.now()

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      const remaining = Math.max(0, totalSecondsRef.current - elapsed)
      setSecondsLeft(remaining)

      // Report elapsed time
      if (onElapsedChangeRef.current) {
        onElapsedChangeRef.current(elapsed)
      }

      if (remaining <= 0 && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true
        clearInterval(interval)
        onTimeUpRef.current()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, []) // Empty deps — runs once, never restarts

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const isLow = secondsLeft < 60
  const isWarning = secondsLeft < 5 * 60
  const total = durationMinutes * 60 || 1
  const pct = (secondsLeft / total) * 100
  const tone = isLow ? '#fb7185' : isWarning ? '#fbbf24' : '#a78bfa'

  return (
    <div
      className={`flex items-center gap-3 rounded-full border px-4 py-2 font-mono text-lg font-bold tabular-nums ${isLow ? 'animate-pulse border-rose-400/50 bg-rose-500/15 text-rose-200' : isWarning ? 'border-amber-400/40 bg-amber-500/10 text-amber-100' : 'border-white/10 bg-white/[0.06] text-purple-50'}`}
      aria-label={`Time left ${minutes} minutes ${seconds} seconds`}
    >
      <svg width="22" height="22" viewBox="0 0 36 36" className="-rotate-90" aria-hidden>
        <circle cx="18" cy="18" r="15" stroke="rgb(255 255 255 / 0.15)" strokeWidth="5" fill="none" />
        <circle cx="18" cy="18" r="15" stroke={tone} strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray={94.25} strokeDashoffset={94.25 - (94.25 * pct) / 100} style={{ transition: 'stroke-dashoffset 1s linear' }} />
      </svg>
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  )
}
