/**
 * ProGuard — wraps content that requires Pro subscription.
 * Phase A: NOT connected to routing yet. Will be used in Phase B.
 *
 * Usage (Phase B):
 *   <ProGuard onNavigate={navigate}>
 *     <ProOnlyContent />
 *   </ProGuard>
 */
import { useAuth } from '../context/AuthContext'
import { isProUser } from '../utils/accessControl'

export default function ProGuard({ children, onNavigate, featureName }) {
  const { subscription, isGuest } = useAuth()

  // In guest/demo mode, allow access (Phase A behavior — no gating yet)
  if (isGuest) {
    return children
  }

  if (!isProUser(subscription)) {
    return (
      <div className="mx-auto max-w-md space-y-4 rounded-xl border border-purple-600/40 bg-purple-900/20 p-6 text-center">
        <div className="text-4xl">🔒</div>
        <h3 className="text-lg font-semibold text-purple-100">
          {featureName || 'เนื้อหานี้'} สำหรับสมาชิก Pro
        </h3>
        <p className="text-sm text-purple-300">
          อัปเกรดเป็น Pro เพื่อเข้าถึงเนื้อหาทั้งหมด
        </p>
        <button
          onClick={() => onNavigate('pricing')}
          className="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition hover:bg-purple-500"
        >
          ⬆️ อัปเกรดเป็น Pro
        </button>
      </div>
    )
  }

  return children
}
