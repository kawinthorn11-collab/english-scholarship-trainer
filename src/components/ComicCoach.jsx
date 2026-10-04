import { useState } from 'react'
import { SpeechBubble } from './Mascot'
import { ListenButton, PokeMascot } from './Duo'
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
  const [turn, setTurn] = useState(0)
  const action = getRecommendedCoachAction(stats)
  const speaker = turn % 2 === 0 ? 'pig' : 'buffalo'

  const refresh = () => {
    const next = getComicCoachMessage(getLocalStats())
    setCoach(next)
    setTurn((t) => t + 1)
    try {
      localStorage.setItem(COACH_MOOD_KEY, next.mood)
    } catch {
      // local coach mood is optional
    }
  }

  const mood = moodToMascot[coach.mood] || 'happy'

  return (
    <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-gradient-to-br from-pink-500/25 via-violet-500/20 to-sky-400/20 p-6 shadow-[0_30px_70px_-35px_rgba(255,61,139,0.7)] sm:p-8">
      <div aria-hidden className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-pink-500/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-sky-400/25 blur-3xl" />
      <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-center">
        <div className="flex shrink-0 items-end -space-x-4">
          <PokeMascot character="pig" mood={speaker === 'pig' ? mood : 'happy'} size={130} />
          <PokeMascot character="buffalo" mood={speaker === 'buffalo' ? mood : 'happy'} size={136} />
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4">
          <div>
            <p className="eyebrow">🐷🐃 ครูหมูหวาน & ครูควายขยัน · แตะตัวการ์ตูนได้นะ</p>
            {greeting && <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{greeting}</h2>}
          </div>
          <SpeechBubble key={coach.text + turn} text={coach.text} tone={speaker} side="left" className="hidden md:block" />
          <SpeechBubble key={`m-${coach.text}${turn}`} text={coach.text} tone={speaker} side="bottom" className="md:hidden" />
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onNavigate?.(action.target)} className="btn btn-primary">
              {action.label} →
            </button>
            <ListenButton text={coach.text} speaker={speaker} />
            <button onClick={refresh} className="btn btn-ghost">
              💬 อีกประโยค
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
