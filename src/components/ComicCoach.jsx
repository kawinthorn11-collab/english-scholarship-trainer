import { useState } from 'react'
import { getLocalStats } from '../utils/localStats'
import { getComicCoachMessage, getRecommendedCoachAction } from '../utils/comicCoachMessages'

const COACH_MOOD_KEY = 'exam-trainer-comic-coach-mood'

export default function ComicCoach({ onNavigate }) {
  const stats = getLocalStats()
  const initial = getComicCoachMessage(stats)
  const [coach, setCoach] = useState(() => {
    const savedMood = typeof localStorage !== 'undefined' ? localStorage.getItem(COACH_MOOD_KEY) : ''
    return savedMood ? { ...initial, mood: savedMood } : initial
  })
  const action = getRecommendedCoachAction(stats)

  const refresh = () => {
    const next = getComicCoachMessage(getLocalStats())
    setCoach(next)
    try {
      localStorage.setItem(COACH_MOOD_KEY, next.mood)
    } catch {
      // local coach mood is optional
    }
  }

  return (
    <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="mx-auto flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-purple-500 bg-purple-950 text-5xl shadow-lg shadow-purple-950/50 sm:mx-0">
          {coach.mood === 'streakFire' ? '🔥' : coach.mood === 'examReady' ? '🎓' : coach.mood === 'sleepy' ? '😴' : '😎'}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wide text-purple-400">Comic Coach / โค้ชตัวแม่ประจำเครื่องนี้</p>
          <div className="mt-2 rounded-2xl rounded-tl-sm border border-purple-600/40 bg-purple-950/60 p-4">
            <p className="text-sm leading-relaxed text-purple-100">{coach.text}</p>
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <button onClick={refresh} className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-500">
              ให้กำลังใจอีกที
            </button>
            <button onClick={() => onNavigate?.(action.target)} className="rounded-lg border border-purple-600 px-4 py-2 text-sm font-semibold text-purple-200 transition hover:bg-purple-900/40">
              {action.label}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
