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

  return (
    <div className={`font-mono text-lg font-bold ${isLow ? 'text-red-400 animate-pulse' : 'text-purple-200'}`}>
      ⏱ {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  )
}
