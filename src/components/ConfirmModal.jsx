import { useEffect } from 'react'
import Mascot from './Mascot'

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'ยืนยัน',
  cancelLabel = 'ยกเลิก',
  tone = 'primary',
}) {
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') onCancel?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-md" style={{ animation: 'fade-up 0.25s ease both' }} role="dialog" aria-modal="true" aria-label={title}>
      <div className="glass-strong w-full max-w-md animate-pop rounded-[2rem] p-7 text-center">
        <Mascot mood={tone === 'danger' ? 'oops' : 'think'} size={110} className="mx-auto -mt-2 mb-3" />
        <h3 className="mb-2 text-2xl font-semibold text-white">{title}</h3>
        <p className="mb-7 text-[15px] leading-relaxed text-purple-200/85">{message}</p>
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button onClick={onCancel} className="btn btn-ghost flex-1">
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`btn flex-1 ${tone === 'danger' ? 'bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-lg shadow-rose-900/40' : 'btn-primary'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
