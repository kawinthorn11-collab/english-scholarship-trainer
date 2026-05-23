import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { getUserPlan, isProUser } from '../utils/accessControl'
import { PLANS } from '../data/plans'

export default function Account({ onNavigate }) {
  const { user, subscription, signOut, isGuest } = useAuth()

  if (!isSupabaseConfigured() || isGuest || !user) {
    return (
      <div className="mx-auto max-w-md space-y-4 text-center">
        <h2 className="text-2xl font-bold text-purple-100">บัญชีของฉัน</h2>
        <p className="text-purple-300">กรุณาเข้าสู่ระบบเพื่อดูบัญชีของคุณ</p>
        <div className="flex flex-col gap-3">
          <button onClick={() => onNavigate('login')} className="rounded-lg bg-purple-600 px-4 py-2 text-white">
            เข้าสู่ระบบ
          </button>
          <button onClick={() => onNavigate('register')} className="rounded-lg border border-purple-600 px-4 py-2 text-purple-200">
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
    <div className="mx-auto max-w-lg space-y-6">
      <h2 className="text-2xl font-bold text-purple-100">บัญชีของฉัน</h2>

      <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-5">
        <p className="text-sm text-purple-400">อีเมล</p>
        <p className="mt-1 font-medium text-purple-100">{user.email}</p>
        {user.user_metadata?.display_name && (
          <>
            <p className="mt-3 text-sm text-purple-400">ชื่อที่แสดง</p>
            <p className="mt-1 font-medium text-purple-100">{user.user_metadata.display_name}</p>
          </>
        )}
      </div>

      <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-5">
        <p className="text-sm text-purple-400">แพลนปัจจุบัน</p>
        <div className="mt-2 flex items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-sm font-bold ${isPro ? 'bg-green-900/40 text-green-300' : 'bg-purple-800/50 text-purple-200'}`}>
            {planData.nameThai}
          </span>
          {isPro && subscription?.current_period_end && (
            <span className="text-xs text-purple-400">
              ต่ออายุ: {new Date(subscription.current_period_end).toLocaleDateString('th-TH')}
            </span>
          )}
        </div>
        {!isPro && (
          <button
            onClick={() => onNavigate('dashboard')}
            className="mt-4 w-full rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition hover:bg-purple-500"
          >
            กลับไปเรียนต่อ
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={() => onNavigate('dashboard')} className="rounded-lg border border-purple-600 px-4 py-2 text-purple-200 transition hover:bg-purple-900/40">
          กลับ Dashboard
        </button>
        <button onClick={handleSignOut} className="rounded-lg border border-red-600/50 px-4 py-2 text-red-300 transition hover:bg-red-900/20">
          ออกจากระบบ
        </button>
      </div>
    </div>
  )
}

