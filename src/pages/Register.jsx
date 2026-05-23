import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
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
      <div className="mx-auto max-w-md space-y-4 text-center">
        <h2 className="text-2xl font-bold text-purple-100">สมัครสมาชิก</h2>
        <p className="text-purple-300">ระบบสมัครสมาชิกยังไม่ได้ตั้งค่า แต่คุณยังสามารถใช้งานบทเรียนและแบบทดสอบแบบ Guest ได้</p>
        <button
          type="button"
          onClick={goGuest}
          className="w-full rounded-lg border border-purple-500 px-4 py-3 font-semibold text-purple-100 transition hover:bg-purple-900/40"
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
      <div className="mx-auto max-w-md space-y-4 text-center">
        <h2 className="text-2xl font-bold text-green-400">สมัครสำเร็จ</h2>
        <p className="text-purple-300">กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี หรือใช้งานแบบ Guest ต่อได้ทันที</p>
        <button onClick={() => onNavigate('login')} className="rounded-lg bg-purple-600 px-4 py-2 text-white">
          ไปหน้าเข้าสู่ระบบ
        </button>
        <button
          type="button"
          onClick={goGuest}
          className="ml-2 rounded-lg border border-purple-500 px-4 py-2 font-semibold text-purple-100 transition hover:bg-purple-900/40"
        >
          ใช้งานแบบ Guest
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-purple-100">สมัครสมาชิก</h2>
        <p className="text-sm text-purple-300">สมัครสมาชิกเพื่อซิงก์ความคืบหน้า หรือใช้งานแบบ Guest ได้ทันที</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-purple-300">ชื่อที่แสดง</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="w-full rounded-lg border border-purple-700/40 bg-purple-900/30 px-4 py-2 text-purple-100 placeholder-purple-500 focus:border-purple-400 focus:outline-none"
            placeholder="ชื่อของคุณ"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-purple-300">อีเมล</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-purple-700/40 bg-purple-900/30 px-4 py-2 text-purple-100 placeholder-purple-500 focus:border-purple-400 focus:outline-none"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-purple-300">รหัสผ่าน อย่างน้อย 6 ตัวอักษร</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-lg border border-purple-700/40 bg-purple-900/30 px-4 py-2 text-purple-100 placeholder-purple-500 focus:border-purple-400 focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="rounded-lg bg-red-900/30 p-3 text-sm text-red-300">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-500 disabled:opacity-50"
        >
          {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
        </button>
      </form>

      <button
        type="button"
        onClick={goGuest}
        className="w-full rounded-lg border border-purple-500 px-4 py-3 font-semibold text-purple-100 transition hover:bg-purple-900/40"
      >
        ใช้งานแบบ Guest
      </button>

      <div className="text-center text-sm text-purple-400">
        <span>มีบัญชีแล้ว? </span>
        <button onClick={() => onNavigate('login')} className="text-purple-200 underline hover:text-white">
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
