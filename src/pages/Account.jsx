import { useAuth } from '../context/AuthContext'
import Mascot from '../components/Mascot'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { getUserPlan, isProUser } from '../utils/accessControl'
import { PLANS } from '../data/plans'

export default function Account({ onNavigate }) {
  const { user, subscription, signOut, isGuest } = useAuth()

  if (!isSupabaseConfigured() || isGuest || !user) {
    return (
      <div className="glass mx-auto max-w-md space-y-6 rounded-[2rem] p-7 text-center sm:p-9">
        <Mascot character="pig" mood="happy" size={120} className="mx-auto -mt-2" />
        <h2 className="text-3xl font-semibold text-white">บัญชีของฉัน</h2>
        <p className="text-purple-300">กรุณาเข้าสู่ระบบเพื่อดูบัญชีของคุณ</p>
        <div className="flex flex-col gap-3">
          <button onClick={() => onNavigate('login')} className="btn btn-primary">
            เข้าสู่ระบบ
          </button>
          <button onClick={() => onNavigate('register')} className="btn btn-ghost">
            สมัครสมาชิก
          </button>
        </div>
      </div>
    )
  }

  const plan = getUserPlan(subscription)
  const planData = PLANS[plan]
  const isPro = isProUser(subscription)

  const handleSignOut = async () => {
    await signOut()
    onNavigate('login', { replace: true })
  }

  return (
    <div className="glass mx-auto max-w-lg space-y-6 rounded-[2rem] p-7 sm:p-9">
      <Mascot character="pig" mood="happy" size={120} className="mx-auto -mt-2" />
      <h2 className="text-center text-3xl font-semibold text-white">บัญชีของฉัน</h2>

      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6">
        <p className="text-sm text-purple-300/80">อีเมล</p>
        <p className="mt-1 font-medium text-purple-100">{user.email}</p>
        {user.user_metadata?.display_name && (
          <>
            <p className="mt-3 text-sm text-purple-300/80">ชื่อที่แสดง</p>
            <p className="mt-1 font-medium text-purple-100">{user.user_metadata.display_name}</p>
          </>
        )}
      </div>

      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6">
        <p className="text-sm text-purple-300/80">แพลนปัจจุบัน</p>
        <div className="mt-2 flex items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-sm font-bold ${isPro ? 'bg-emerald-500/20 text-emerald-200' : 'bg-violet-500/15 text-purple-200'}`}>
            {planData.nameThai}
          </span>
          {isPro && subscription?.current_period_end && (
            <span className="text-xs text-purple-300/80">
              ต่ออายุ: {new Date(subscription.current_period_end).toLocaleDateString('th-TH')}
            </span>
          )}
        </div>
        {!isPro && (
          <button
            onClick={() => onNavigate('dashboard')}
            className="mt-4 w-full btn btn-primary"
          >
            กลับไปเรียนต่อ
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={() => onNavigate('dashboard')} className="btn btn-ghost">
          กลับ Dashboard
        </button>
        <button onClick={handleSignOut} className="btn border border-rose-400/40 text-rose-200 hover:bg-rose-500/10">
          ออกจากระบบ
        </button>
      </div>
    </div>
  )
}

