import { useEffect, useState, useSyncExternalStore } from 'react'
import {
  RATES,
  getRate,
  getSpeakingKey,
  hasThaiVoice,
  isSpeechSupported,
  onVoicesReady,
  setRate,
  speak,
  stopSpeaking,
  subscribeSpeech,
} from '../lib/speech'

function useSpeakingKey() {
  return useSyncExternalStore(subscribeSpeech, getSpeakingKey, () => null)
}

function useRate() {
  return useSyncExternalStore(subscribeSpeech, getRate, () => 1)
}

/** ปุ่มกดฟังครูพูด กดอีกครั้งเพื่อหยุด */
export default function SpeakButton({ text, id, label = 'ฟังครูสอน', english = false, size = 'md' }) {
  const speakingKey = useSpeakingKey()
  const active = speakingKey === id
  if (!isSpeechSupported()) return null

  return (
    <button
      type="button"
      className={`speak speak-${size}${active ? ' is-active' : ''}${english ? ' speak-en' : ''}`}
      onClick={() => (active ? stopSpeaking() : speak(text, id, { english }))}
      aria-pressed={active}
      aria-label={label ? undefined : (active ? 'หยุด' : 'ฟังเสียง')}
    >
      <span className="speak-icon" aria-hidden="true">
        {active ? (
          <span className="bars"><i /><i /><i /><i /></span>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
        )}
      </span>
      {label && <span>{active ? 'หยุด' : label}</span>}
    </button>
  )
}

/** ตัวเลือกความเร็วเสียง */
export function RatePicker() {
  const rate = useRate()
  if (!isSpeechSupported()) return null
  return (
    <div className="rate" role="group" aria-label="ความเร็วเสียง">
      {RATES.map((item) => (
        <button
          key={item.value}
          type="button"
          className={item.value === rate ? 'is-active' : ''}
          onClick={() => setRate(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

/** แจ้งเตือนเมื่อเครื่องไม่มีเสียงภาษาไทย */
export function ThaiVoiceNotice() {
  const [missing, setMissing] = useState(false)
  useEffect(() => {
    // รอให้รายการเสียงโหลดเสร็จก่อนค่อยตัดสินว่าไม่มี
    const timer = window.setTimeout(() => setMissing(!hasThaiVoice()), 1500)
    const stop = onVoicesReady(() => setMissing(!hasThaiVoice()))
    return () => {
      window.clearTimeout(timer)
      stop()
    }
  }, [])
  if (!isSpeechSupported()) {
    return <p className="notice">เบราว์เซอร์นี้ไม่รองรับเสียงพูด ลองเปิดด้วย Chrome, Edge หรือ Safari</p>
  }
  if (!missing) return null
  return (
    <p className="notice">
      เครื่องนี้ยังไม่มีเสียงภาษาไทย ครูจะพูดได้เฉพาะส่วนภาษาอังกฤษ
      วิธีเพิ่มเสียงไทย: <b>Android</b> ตั้งค่า → การเข้าถึง → เอาต์พุตการอ่านออกเสียง → ภาษาไทย ·{' '}
      <b>iPhone</b> ตั้งค่า → การช่วยการเข้าถึง → เนื้อหาที่พูด → เสียง → ไทย ·{' '}
      <b>Windows</b> Settings → Time &amp; language → Speech → เพิ่มภาษาไทย
    </p>
  )
}
