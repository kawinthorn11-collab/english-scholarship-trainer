import { getEnglishSpeechText } from '../utils/speech'
import { useSpeech } from '../hooks/useSpeech'

const sizeClasses = {
  sm: 'min-h-9 min-w-9 px-2.5 py-1 text-xs',
  md: 'min-h-10 px-4 py-2 text-sm',
  lg: 'min-h-12 px-5 py-3 text-base',
}

export default function SpeakButton({ text, label = '🔊', size = 'sm', variant = 'icon', lang, rate, className = '' }) {
  const { supported, speak } = useSpeech()
  const speechText = getEnglishSpeechText(text)
  if (!speechText) return null

  const isIcon = variant === 'icon'
  return (
    <button
      type="button"
      disabled={!supported}
      onClick={(event) => {
        event.stopPropagation()
        speak(speechText, { lang, rate })
      }}
      title={supported ? `Speak: ${speechText.slice(0, 80)}` : 'Speech is not supported in this browser'}
      aria-label={isIcon ? `Listen: ${speechText.slice(0, 60)}` : undefined}
      className={`group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-violet-400/25 bg-violet-500/10 font-semibold text-violet-100 transition hover:-translate-y-0.5 hover:border-violet-300/50 hover:bg-violet-500/25 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${sizeClasses[size] || sizeClasses.sm} ${className}`}
    >
      <span className="transition-transform group-hover:scale-125">🔊</span>
      {!isIcon && <span>{label}</span>}
    </button>
  )
}
