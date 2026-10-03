import { useEffect } from 'react'

const SELECTOR = [
  '[data-page-root] > * > *',
  '[data-page-root] > * > * > .grid > *',
  '[data-page-root] > * > section > *',
  '[data-reveal]',
].join(',')

/**
 * Adds a staggered fade/slide-in to page sections as they scroll into view.
 * Purely cosmetic: if React later replaces an element's className, the element
 * simply shows without the effect.
 */
export function useScrollReveal(routeKey) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined

    const elements = Array.from(document.querySelectorAll(SELECTOR)).filter(
      (el) => !el.classList.contains('fixed') && !el.classList.contains('sticky') && !el.closest('.fixed')
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          el.classList.add('is-visible')
          observer.unobserve(el)
          // Drop the reveal styles afterwards so hover transitions are not delayed.
          window.setTimeout(() => {
            el.classList.remove('reveal', 'is-visible')
            el.style.removeProperty('--reveal-delay')
          }, 1400)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    const groupCounters = new Map()
    elements.forEach((el) => {
      const parent = el.parentElement
      const n = groupCounters.get(parent) || 0
      groupCounters.set(parent, n + 1)
      el.style.setProperty('--reveal-delay', `${Math.min(n, 8) * 70}ms`)
      el.classList.add('reveal')
      observer.observe(el)
    })

    return () => {
      observer.disconnect()
      elements.forEach((el) => el.classList.remove('reveal'))
    }
  }, [routeKey])
}
