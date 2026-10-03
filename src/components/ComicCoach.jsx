import { useState } from 'react'
import Mascot, { SpeechBubble } from './Mascot'
import { getLocalStats } from '../utils/localStats'
import { getComicCoachMessage, getRecommendedCoachAction } from '../utils/comicCoachMessages'

const COACH_MOOD_KEY = 'exam-trainer-comic-coach-mood'

const moodToMascot = {
  starter: 'wave',
  focused: 'teach',
  sleepy: 'sleepy',
  comeback: 'wave',
  examReady: 'cheer',
  weakSkillRepair: 'think',
  streakFire: 'fire',
}

export default function ComicCoach({ onNavigate, greeting }) {
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
    <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
      <div aria-hidden className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-violet-600/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="shrink-0">
          <Mascot mood={moodToMascot[coach.mood] || 'happy'} size={150} />
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4">
          <div>
            <p className="eyebrow">🦉 ครูฮูก · โค้ชประจำเครื่องนี้</p>
            {greeting && <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{greeting}</h2>}
          </div>
          <SpeechBubble key={coach.text} text={coach.text} side="left" className="hidden sm:block" />
          <SpeechBubble key={`m-${coach.text}`} text={coach.text} side="bottom" className="sm:hidden" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => onNavigate?.(action.target)} className="btn btn-primary">
              {action.label} →
            </button>
            <button onClick={refresh} className="btn btn-ghost">
              💬 ให้กำลังใจอีกที
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
