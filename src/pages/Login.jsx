import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Mascot from '../components/Mascot'
import { isSupabaseConfigured } from '../lib/supabaseClient'

function getSafeRedirectPath() {
  const params = new URLSearchParams(window.location.search)
  const redirect = params.get('redirect')
  if (!redirect || !redirect.startsWith('/')) return '/dashboard'
  if (redirect.startsWith('/login') || redirect.startsWith('/register')) return '/dashboard'
  return redirect
}

export default function Login({ onNavigate, onNavigatePath }) {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const goGuest = () => {
    if (onNavigatePath) {
      onNavigatePath('/dashboard', { replace: true })
    } else {
      onNavigate('dashboard', { replace: true })
    }
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="glass mx-auto max-w-md space-y-6 rounded-[2rem] p-7 text-center sm:p-9">
        <Mascot character="pig" mood="wave" size={120} className="mx-auto -mt-2" />
        <h2 className="text-3xl font-semibold text-white">เข้าสู่ระบบ</h2>
        <p className="text-purple-300">ระบบล็อกอินยังไม่ได้ตั้งค่า แต่คุณยังสามารถใช้งานบทเรียนและแบบทดสอบแบบ Guest ได้</p>
        <button
          type="button"
          onClick={goGuest}
          className="btn btn-ghost w-full"
        >
          ใช้งานแบบ Guest
        </button>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    let err
    try {
      const result = await signIn(email.trim(), password)
      err = result?.error
    } catch (error) {
      err = error
    } finally {
      setLoading(false)
    }

    if (err) {
      setError(translateError(err.message || String(err)))
      return
    }

    const redirectPath = getSafeRedirectPath()
    if (onNavigatePath) {
      onNavigatePath(redirectPath, { replace: true })
    } else {
      onNavigate('dashboard', { replace: true })
    }
  }

  return (
    <div className="glass mx-auto max-w-md space-y-6 rounded-[2rem] p-7 sm:p-9">
      <Mascot character="pig" mood="wave" size={120} className="mx-auto -mt-2" />
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-semibold text-white">เข้าสู่ระบบ</h2>
        <p className="text-sm text-purple-300">เข้าสู่ระบบเพื่อซิงก์ความคืบหน้า หรือใช้งานแบบ Guest ได้ทันที</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-purple-200">อีเมล</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-purple-200">รหัสผ่าน</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="animate-shake rounded-2xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-3.5"
        >
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>

      <button
        type="button"
        onClick={goGuest}
        className="btn btn-ghost w-full"
      >
        ใช้งานแบบ Guest
      </button>

      <div className="text-center text-sm text-purple-300/80">
        <span>ยังไม่มีบัญชี? </span>
        <button onClick={() => onNavigate('register')} className="font-semibold text-fuchsia-300 underline-offset-4 hover:text-white hover:underline">
          สมัครสมาชิก
        </button>
      </div>
    </div>
  )
}

function translateError(msg) {
  if (msg.includes('Failed to fetch') || msg.includes('fetch failed')) {
    return 'เชื่อมต่อ Supabase ไม่สำเร็จ แต่คุณยังใช้งานแบบ Guest ได้'
  }
  if (msg.includes('Invalid login')) return 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
  if (msg.includes('Email not confirmed')) return 'กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ'
  if (msg.includes('rate limit')) return 'ลองใหม่อีกครั้งในอีกสักครู่'
  return msg
}
