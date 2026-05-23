import { useEffect, useState } from 'react'
import {
  getAvailableEnglishVoices,
  getEnglishSpeechText,
  getSpeechPreferences,
  isSpeechSupported,
  saveSpeechPreferences,
  speakEnglish,
  stopSpeech,
} from '../utils/speech'

export function useSpeech() {
  const [preferences, setPreferencesState] = useState(getSpeechPreferences)
  const [voices, setVoices] = useState(() => getAvailableEnglishVoices())
  const supported = isSpeechSupported()

  useEffect(() => {
    if (!supported) return undefined
    const handleVoices = () => setVoices(getAvailableEnglishVoices())
    window.speechSynthesis.addEventListener?.('voiceschanged', handleVoices)
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', handleVoices)
  }, [supported])

  const setPreferences = (next) => {
    const merged = { ...preferences, ...next }
    setPreferencesState(merged)
    saveSpeechPreferences(merged)
  }

  const speak = (text, options = {}) => speakEnglish(getEnglishSpeechText(text), { ...preferences, ...options })

  return {
    supported,
    preferences,
    voices,
    setPreferences,
    speak,
    stop: stopSpeech,
  }
}
