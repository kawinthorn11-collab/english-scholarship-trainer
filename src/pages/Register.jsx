import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Mascot from '../components/Mascot'
import { getSupabaseDebugInfo, isSupabaseConfigured } from '../lib/supabaseClient'

export default function Register({ onNavigate, onNavigatePath }) {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
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
        <Mascot mood="cheer" size={120} className="mx-auto -mt-2" />
        <h2 className="text-3xl font-semibold text-white">สมัครสมาชิก</h2>
        <p className="text-purple-300">ระบบสมัครสมาชิกยังไม่ได้ตั้งค่า แต่คุณยังสามารถใช้งานบทเรียนและแบบทดสอบแบบ Guest ได้</p>
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
    let result
    try {
      result = await signUp(email.trim(), password, displayName.trim())
    } catch (err) {
      result = { error: err }
    } finally {
      setLoading(false)
    }

    const { data, error: err } = result || {}
    if (err) {
      const diagnostic = {
        ...getSupabaseDebugInfo(),
        errorName: err?.name || 'UnknownError',
        errorMessage: err?.message || String(err),
      }
      console.warn('Supabase signup diagnostic', diagnostic)
      setError(translateError(diagnostic.errorMessage))
      return
    }

    if (data?.session) {
      if (onNavigatePath) {
        onNavigatePath('/dashboard', { replace: true })
      } else {
        onNavigate('dashboard', { replace: true })
      }
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="glass mx-auto max-w-md space-y-6 rounded-[2rem] p-7 text-center sm:p-9">
        <Mascot mood="cheer" size={120} className="mx-auto -mt-2" />
        <h2 className="text-3xl font-semibold text-emerald-300">สมัครสำเร็จ</h2>
        <p className="text-purple-300">กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี หรือใช้งานแบบ Guest ต่อได้ทันที</p>
        <button onClick={() => onNavigate('login')} className="btn btn-primary">
          ไปหน้าเข้าสู่ระบบ
        </button>
        <button
          type="button"
          onClick={goGuest}
          className="btn btn-ghost ml-2"
        >
          ใช้งานแบบ Guest
        </button>
      </div>
    )
  }

  return (
    <div className="glass mx-auto max-w-md space-y-6 rounded-[2rem] p-7 sm:p-9">
      <Mascot mood="cheer" size={120} className="mx-auto -mt-2" />
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-semibold text-white">สมัครสมาชิก</h2>
        <p className="text-sm text-purple-300">สมัครสมาชิกเพื่อซิงก์ความคืบหน้า หรือใช้งานแบบ Guest ได้ทันที</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-purple-200">ชื่อที่แสดง</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="input"
            placeholder="ชื่อของคุณ"
          />
        </div>
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
          <label className="mb-1.5 block text-sm font-medium text-purple-200">รหัสผ่าน อย่างน้อย 6 ตัวอักษร</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
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
          {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
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
        <span>มีบัญชีแล้ว? </span>
        <button onClick={() => onNavigate('login')} className="font-semibold text-fuchsia-300 underline-offset-4 hover:text-white hover:underline">
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  )
}

function translateError(msg) {
  if (msg === 'Failed to fetch' || msg?.includes('Failed to fetch') || msg?.includes('fetch failed')) {
    return 'เชื่อมต่อ Supabase ไม่สำเร็จ แต่คุณยังใช้งานแบบ Guest ได้'
  }
  if (msg.includes('already registered')) return 'อีเมลนี้ถูกใช้แล้ว'
  if (msg.includes('password')) return 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
  if (msg.includes('rate limit')) return 'ลองใหม่อีกครั้งในอีกสักครู่'
  return msg
}
