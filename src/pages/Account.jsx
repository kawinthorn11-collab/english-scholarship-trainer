import { useSyncExternalStore } from 'react'
import { useAuth } from '../context/AuthContext'
import Mascot from '../components/Mascot'
import { StatTile } from '../components/ui'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { getSyncStatus, subscribeSync, syncNow } from '../utils/cloudSync'
import { getAttempts } from '../utils/storage'
import { getLocalStats } from '../utils/localStats'
import { getCardStates, getMistakes, getPlanChecks } from '../utils/learningStore'

function useSyncStatus() {
  return useSyncExternalStore(subscribeSync, getSyncStatus, getSyncStatus)
}

export default function Account({ onNavigate }) {
  const { user, signOut, isGuest } = useAuth()
  const sync = useSyncStatus()

  if (!isSupabaseConfigured() || isGuest || !user) {
    return (
      <div className="glass mx-auto max-w-md space-y-6 rounded-[2rem] p-7 text-center sm:p-9">
        <Mascot character="pig" mood="happy" size={120} className="mx-auto -mt-2" />
        <h1 className="text-3xl font-semibold text-white">พื้นที่สมาชิก</h1>
        <p className="text-purple-100/80">สมัครสมาชิกฟรี เพื่อเก็บความคืบหน้าไว้ในบัญชี แล้วเรียนต่อได้ทุกเครื่อง ทั้งมือถือและคอมพิวเตอร์</p>
        <div className="flex flex-col gap-3">
          <button onClick={() => onNavigate('register')} className="btn btn-primary">สมัครสมาชิกฟรี</button>
          <button onClick={() => onNavigate('login')} className="btn btn-ghost">เข้าสู่ระบบ</button>
        </div>
      </div>
    )
  }

  const name = user.user_metadata?.display_name || user.email?.split('@')[0]
  const attempts = getAttempts()
  const stats = getLocalStats()
  const best = attempts.reduce((m, a) => Math.max(m, a.score?.percentage || 0), 0)
  const cards = Object.values(getCardStates())
  const planDone = Object.keys(getPlanChecks()).length

  const handleSignOut = async () => {
    await signOut()
    onNavigate('dashboard', { replace: true })
  }

  const syncLabel = {
    idle: 'ยังไม่ได้ซิงก์',
    syncing: 'กำลังซิงก์...',
    synced: `ซิงก์แล้ว${sync.lastSyncedAt ? ` · ${new Date(sync.lastSyncedAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}` : ''}`,
    error: 'ซิงก์ไม่สำเร็จ',
  }[sync.state]

  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-pink-500/25 via-violet-500/20 to-sky-400/20 p-6 sm:p-8">
        <div className="relative flex flex-col items-center gap-6 sm:flex-row">
          <div className="flex shrink-0 items-end -space-x-4">
            <Mascot character="pig" mood="wave" size={110} />
            <Mascot character="buffalo" mood="happy" size={118} />
          </div>
          <div className="min-w-0 flex-1 space-y-2 text-center sm:text-left">
            <p className="eyebrow">👤 พื้นที่สมาชิก</p>
            <h1 className="text-3xl font-semibold text-white">สวัสดี {name}</h1>
            <p className="break-all text-sm text-purple-100/75">{user.email}</p>
            <p className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${sync.state === 'error' ? 'bg-rose-500/20 text-rose-100' : sync.state === 'synced' ? 'bg-emerald-500/20 text-emerald-100' : 'bg-white/10 text-white'}`}>
              {sync.state === 'syncing' ? '⏳' : sync.state === 'error' ? '⚠️' : '☁️'} {syncLabel}
            </p>
          </div>
        </div>
        {sync.error && <p className="relative mt-4 rounded-2xl bg-rose-500/15 px-4 py-3 text-sm text-rose-100">{sync.error}</p>}
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatTile icon="📝" label="ทำข้อสอบจำลอง" value={attempts.length} />
        <StatTile icon="🏆" label="คะแนนสูงสุด" value={`${best}%`} accent="from-amber-400/40 to-orange-500/10" />
        <StatTile icon="⏳" label="เวลาเรียนรวม" value={`${((stats.totalStudySeconds || 0) / 3600).toFixed(1)}h`} accent="from-sky-400/40 to-blue-500/10" />
        <StatTile icon="🃏" label="คำศัพท์ที่ฝึกแล้ว" value={cards.length} accent="from-emerald-400/40 to-teal-500/10" />
        <StatTile icon="📒" label="ข้อรอทบทวน" value={getMistakes().length} accent="from-rose-400/40 to-pink-500/10" />
        <StatTile icon="🗺️" label="งานในหลักสูตร" value={`${planDone}/20`} accent="from-violet-400/40 to-fuchsia-500/10" />
      </section>

      <section className="glass space-y-3 rounded-[2rem] p-6">
        <h2 className="text-lg font-semibold text-white">ความคืบหน้าของคุณถูกเก็บไว้ในบัญชี</h2>
        <p className="text-[15px] text-purple-100/80">ผลสอบ สมุดข้อผิด บัตรคำศัพท์ และหลักสูตร จะซิงก์อัตโนมัติทุก 30 วินาที เข้าสู่ระบบบนเครื่องอื่นก็เรียนต่อจากเดิมได้ทันที</p>
        <div className="flex flex-wrap gap-3 pt-1">
          <button onClick={() => syncNow(user.id)} disabled={sync.state === 'syncing'} className="btn btn-primary">☁️ ซิงก์ตอนนี้</button>
          <button onClick={() => onNavigate('plan')} className="btn btn-ghost">ไปหลักสูตรของฉัน →</button>
        </div>
      </section>

      <button onClick={handleSignOut} className="btn border border-rose-400/40 text-rose-200 hover:bg-rose-500/10">ออกจากระบบ</button>
    </div>
  )
}
