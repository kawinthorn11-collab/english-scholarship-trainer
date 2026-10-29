import { isSpeechSupported } from '../utils/speech'
import { normalizeSpeech, speakLine } from '../utils/voice'

const sizeClasses = {
  sm: 'min-h-9 min-w-9 px-2.5 py-1 text-xs',
  md: 'min-h-10 px-4 py-2 text-sm',
  lg: 'min-h-12 px-5 py-3 text-base',
}

/** Reads text aloud with the most natural voice on the device. */
export default function SpeakButton({ text, label = '🔊', size = 'sm', variant = 'icon', rate, speaker = 'narrator', className = '' }) {
  const speechText = normalizeSpeech(String(text || '').replace(/\(\d+\)/g, ' '))
  if (!speechText) return null
  const supported = isSpeechSupported()
  const isIcon = variant === 'icon'

  return (
    <button
      type="button"
      disabled={!supported}
      onClick={(event) => {
        event.stopPropagation()
        speakLine(speechText, { speaker, rate: rate || 1, lineId: `speak-${speechText.slice(0, 30)}` })
      }}
      title={supported ? `ฟัง: ${speechText.slice(0, 80)}` : 'เบราว์เซอร์นี้ไม่รองรับเสียงพูด'}
      aria-label={isIcon ? `ฟัง: ${speechText.slice(0, 60)}` : undefined}
      className={`group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-violet-400/25 bg-violet-500/10 font-semibold text-violet-100 transition hover:-translate-y-0.5 hover:border-violet-300/50 hover:bg-violet-500/25 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${sizeClasses[size] || sizeClasses.sm} ${className}`}
    >
      <span className="transition-transform group-hover:scale-125">🔊</span>
      {!isIcon && <span>{label}</span>}
    </button>
  )
}
