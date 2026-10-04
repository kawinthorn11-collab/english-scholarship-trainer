import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Mascot from './Mascot'
import { isSupabaseConfigured } from '../lib/supabaseClient'

// Reserved for future paid/protected mode.
export default function AuthGuard({ children, onNavigate, redirectPath = '/' }) {
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (loading || !isSupabaseConfigured() || isAuthenticated) return

    const safeRedirect = redirectPath && redirectPath !== '/login' && redirectPath !== '/register'
      ? redirectPath
      : '/dashboard'
    const loginPath = `/login?redirect=${encodeURIComponent(safeRedirect)}`
    window.history.replaceState({}, '', loginPath)
    onNavigate?.('login', { replace: true })
  }, [isAuthenticated, loading, onNavigate, redirectPath])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-purple-300">กำลังตรวจสอบสถานะการเข้าสู่ระบบ...</p>
      </div>
    )
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="glass mx-auto max-w-md space-y-6 rounded-[2rem] p-7 text-center sm:p-9">
        <Mascot character="buffalo" mood="think" size={120} className="mx-auto -mt-2" />
        <h2 className="text-3xl font-semibold text-white">เข้าสู่ระบบยังไม่พร้อมใช้งาน</h2>
        <p className="text-purple-300">ระบบล็อกอินยังไม่ได้ตั้งค่า กรุณาตั้งค่า Supabase ก่อน</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-purple-300">กำลังพาไปหน้าเข้าสู่ระบบ...</p>
      </div>
    )
  }

  return children
}
