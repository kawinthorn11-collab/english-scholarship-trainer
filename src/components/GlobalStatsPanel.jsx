import { useEffect, useState } from 'react'
import { fetchPublicGlobalStats } from '../utils/globalStats'

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
    ['Online now', loading ? '...' : stats.active_now_count || 0],
    ['Learners/devices', loading ? '...' : stats.total_devices || 1],
    ['Total study', loading ? '...' : formatHours(stats.total_study_seconds)],
    ['Lessons + drills', loading ? '...' : (Number(stats.total_lessons_completed || 0) + Number(stats.total_drills_completed || 0))],
    ['Exams done', loading ? '...' : stats.total_exams_completed || 0],
    ['Questions', loading ? '...' : stats.total_questions_answered || 0],
    ['Today', loading ? '...' : formatMinutes(stats.today_study_seconds)],
  ]

  return (
    <section className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-5">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-purple-100">Learning Pulse</h2>
          <p className="text-xs text-purple-400">{sourceLabel}</p>
        </div>
        {stats?.unavailable && <p className="text-xs text-yellow-300">Supabase ไม่พร้อม ใช้ localStorage แทน</p>}
      </div>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-7">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-purple-700/40 bg-purple-950/40 p-3">
            <p className="text-xs text-purple-400">{label}</p>
            <p className="mt-1 text-xl font-bold text-purple-100">{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
