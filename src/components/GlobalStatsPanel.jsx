import { useEffect, useState } from 'react'
import { fetchPublicGlobalStats } from '../utils/globalStats'
import { CountUp } from './ui'

function formatHours(seconds) {
  const hours = (Number(seconds || 0) / 3600).toFixed(1)
  return `${hours}h`
}

function formatMinutes(seconds) {
  return `${Math.round(Number(seconds || 0) / 60)}m`
}

export default function GlobalStatsPanel() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let active = true
    const refresh = async () => {
      const next = await fetchPublicGlobalStats()
      if (active) setStats(next)
    }
    refresh()
    const id = window.setInterval(refresh, 30_000)
    return () => {
      active = false
      window.clearInterval(id)
    }
  }, [])

  const loading = !stats
  const sourceLabel = stats?.source === 'global'
    ? 'สถิติรวมจากผู้ใช้ทั้งหมด'
    : 'สถิติเฉพาะเครื่องนี้'

  const cards = [
    ['🟢', 'Online now', loading ? null : stats.active_now_count || 0],
    ['👥', 'Learners', loading ? null : stats.total_devices || 1],
    ['⏳', 'Total study', loading ? null : formatHours(stats.total_study_seconds)],
    ['📘', 'Lessons + drills', loading ? null : (Number(stats.total_lessons_completed || 0) + Number(stats.total_drills_completed || 0))],
    ['📝', 'Exams done', loading ? null : stats.total_exams_completed || 0],
    ['❓', 'Questions', loading ? null : stats.total_questions_answered || 0],
    ['☀️', 'Today', loading ? null : formatMinutes(stats.today_study_seconds)],
  ]

  return (
    <section className="glass rounded-[2rem] p-6 sm:p-7">
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Learning Pulse
          </h2>
          <p className="text-sm text-purple-300/80">{sourceLabel}</p>
        </div>
        {stats?.unavailable && <p className="text-xs text-amber-300">Supabase ไม่พร้อม ใช้ localStorage แทน</p>}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {cards.map(([icon, label, value]) => (
          <div key={label} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 transition hover:bg-white/[0.07]">
            <p className="text-lg">{icon}</p>
            <p className="mt-1 font-display text-xl font-semibold text-white">
              {value === null ? <span className="inline-block h-5 w-10 animate-pulse rounded bg-white/10" /> : <CountUp value={value} />}
            </p>
            <p className="text-[11px] text-purple-300/80">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
