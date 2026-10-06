import { useEffect, useState } from 'react'

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
}

export function useTypewriter(text, speed = 22) {
  const [count, setCount] = useState(0)
  const [prevText, setPrevText] = useState(text)

  if (prevText !== text) {
    setPrevText(text)
    setCount(0)
  }

  const reduce = prefersReducedMotion()

  useEffect(() => {
    if (reduce || count >= text.length) return undefined
    const t = window.setTimeout(() => setCount((c) => Math.min(text.length, c + 1)), speed)
    return () => window.clearTimeout(t)
  }, [count, text, speed, reduce])

  if (reduce) return { shown: text, done: true }
  return { shown: text.slice(0, count), done: count >= text.length }
}
