import { getEnglishSpeechText } from '../utils/speech'
import { useSpeech } from '../hooks/useSpeech'

const sizeClasses = {
  sm: 'min-h-8 px-2 py-1 text-xs',
  md: 'min-h-10 px-3 py-2 text-sm',
  lg: 'min-h-12 px-4 py-3 text-base',
}

export default function SpeakButton({ text, label = '🔊', size = 'sm', variant = 'icon', lang, rate, className = '' }) {
  const { supported, speak } = useSpeech()
  const speechText = getEnglishSpeechText(text)
  if (!speechText) return null

  const buttonLabel = variant === 'icon' ? '🔊' : label
  return (
    <button
      type="button"
      disabled={!supported}
      onClick={(event) => {
        event.stopPropagation()
        speak(speechText, { lang, rate })
      }}
      title={supported ? `Speak: ${speechText.slice(0, 80)}` : 'Speech is not supported in this browser'}
      className={`inline-flex items-center justify-center rounded-lg border border-purple-600/50 bg-purple-950/50 font-semibold text-purple-100 transition hover:bg-purple-800/50 disabled:cursor-not-allowed disabled:opacity-40 ${sizeClasses[size] || sizeClasses.sm} ${className}`}
    >
      {buttonLabel}
    </button>
  )
}
