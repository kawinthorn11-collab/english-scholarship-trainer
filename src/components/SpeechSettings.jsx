import { useState } from 'react'
import Mascot from './Mascot'
import { useSpeech } from '../hooks/useSpeech'
import { useVoice } from '../hooks/useVoice'
import { hasRecordedVoices } from '../utils/voiceClips'
import { getVoicePrefs, getVoicesFor, hasNaturalVoices, hasThaiVoice, pickVoice, qualityLabel, setVoicePref, speakLine, stopVoice, voiceQuality } from '../utils/voice'

const SAMPLES = {
  th: { pig: 'สวัสดีจ้า หมูหวานเองนะ วันนี้มาเรียนภาษาอังกฤษกัน', buffalo: 'สวัสดีครับ ควายขยันเอง ตั้งใจฟังนะ' },
  en: { pig: 'Hello! Practice a little every day.', buffalo: 'Read the question carefully before you answer.' },
}

function deviceTip() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : ''
  if (/iPhone|iPad|iPod|Macintosh/.test(ua) && 'ontouchend' in (typeof document !== 'undefined' ? document : {})) {
    return 'iPhone / iPad: ไปที่ การตั้งค่า → การช่วยการเข้าถึง → เนื้อหาที่พูด → เสียง แล้วดาวน์โหลดเสียง ไทย (Kanya, Narisa) และ English (เลือกแบบ "คุณภาพสูง" หรือ Enhanced) จากนั้นเปิดเว็บใหม่'
  }
  if (/Android/.test(ua)) {
    return 'Android: ไปที่ การตั้งค่า → การจัดการทั่วไป → เอาต์พุตการอ่านออกเสียง → Google Speech Services แล้วติดตั้งข้อมูลเสียงไทยและอังกฤษ (คุณภาพสูง)'
  }
  if (/Edg\//.test(ua)) return 'คุณใช้ Microsoft Edge อยู่ ซึ่งมีเสียงแบบ Natural ที่เป็นธรรมชาติที่สุด เลือกเสียงที่มีคำว่า Natural ได้เลย'
  return 'คอมพิวเตอร์: เปิดเว็บนี้ด้วย Microsoft Edge จะได้เสียงแบบ Natural ทั้งไทยและอังกฤษที่เป็นธรรมชาติที่สุด (ฟรี)'
}

export default function SpeechSettings() {
  const { supported } = useSpeech() // re-renders when the device finishes loading voices
  const voiceState = useVoice()
  const [, setTick] = useState(0)
  const prefs = getVoicePrefs()

  if (!supported) {
    return (
      <div className="glass rounded-3xl p-5 text-sm text-purple-100/80">
        เบราว์เซอร์นี้ยังไม่รองรับเสียงพูด ลองเปิดด้วย Chrome, Edge หรือ Safari เวอร์ชันล่าสุด
      </div>
    )
  }

  const natural = hasNaturalVoices()
  const thai = hasThaiVoice()
  const recorded = hasRecordedVoices()

  const row = (speaker, lang) => {
    const voices = [...getVoicesFor(lang)].sort((a, b) => voiceQuality(b) - voiceQuality(a))
    const current = pickVoice(speaker, lang)
    const key = `${speaker}-${lang}`
    const id = `voice-${key}`
    const playing = voiceState.lineId === `sample-${key}`
    return (
      <div key={key} className="flex flex-col gap-2 rounded-2xl bg-white/[0.05] p-3 sm:flex-row sm:items-center">
        <label htmlFor={id} className="w-24 shrink-0 text-sm font-semibold text-white">{lang === 'th' ? '🇹🇭 ไทย' : '🇬🇧 English'}</label>
        {voices.length ? (
          <select
            id={id}
            value={prefs[key] || ''}
            onChange={(e) => { setVoicePref(key, e.target.value); setTick((n) => n + 1) }}
            className="min-w-0 flex-1 rounded-xl border border-white/15 bg-ink-2 px-3 py-2.5 text-sm text-white focus:border-pink-300 focus:outline-none"
          >
            <option value="">อัตโนมัติ · {current ? `${current.name} (${qualityLabel(current)})` : '-'}</option>
            {voices.map((v) => (
              <option key={v.name} value={v.name}>{v.name} · {qualityLabel(v)}</option>
            ))}
          </select>
        ) : (
          <p className="flex-1 text-sm text-amber-100">เครื่องนี้ยังไม่มีเสียง{lang === 'th' ? 'ภาษาไทย' : 'ภาษาอังกฤษ'}</p>
        )}
        <button
          type="button"
          onClick={() => (playing ? stopVoice() : speakLine(SAMPLES[lang][speaker], { speaker, lineId: `sample-${key}`, useClips: false }))}
          className="shrink-0 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-500/40"
        >
          {playing ? '⏹ หยุด' : '▶ ลองฟัง'}
        </button>
      </div>
    )
  }

  return (
    <div className="glass space-y-5 rounded-[2rem] p-5 sm:p-6">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-white">🎙️ ตั้งค่าเสียงครู</h3>
        <p className="mt-1 text-sm text-purple-100/75">ระบบเลือกเสียงที่เป็นธรรมชาติที่สุดในเครื่องให้อัตโนมัติ เปลี่ยนเองได้ทุกเมื่อ</p>
      </div>

      {recorded && (
        <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-4 text-sm leading-relaxed text-emerald-50">
          ✅ บทเรียน คำอธิบาย และคำศัพท์ ใช้เสียงพากย์ AI แบบธรรมชาติที่อัดไว้แล้ว ทั้งไทยและอังกฤษ ไม่ต้องตั้งค่าอะไรเพิ่ม
          <br />ตัวเลือกด้านล่างใช้กับข้อความอื่น ๆ เช่น โจทย์และบทความในข้อสอบ
        </div>
      )}

      {!recorded && (!natural || !thai) && (
        <div className="rounded-2xl border border-amber-300/30 bg-amber-400/10 p-4 text-sm leading-relaxed text-amber-50">
          💡 {!thai ? 'เครื่องนี้ยังไม่มีเสียงภาษาไทย ' : 'เสียงในเครื่องนี้ยังไม่ใช่แบบธรรมชาติ '}
          {deviceTip()}
        </div>
      )}

      {['pig', 'buffalo'].map((speaker) => (
        <div key={speaker} className="space-y-2">
          <div className="flex items-center gap-3">
            <Mascot character={speaker} mood="happy" talking={voiceState.speaker === speaker} size={46} />
            <p className="font-semibold text-white">{speaker === 'pig' ? 'ครูหมูหวาน' : 'ครูควายขยัน'}</p>
          </div>
          {row(speaker, 'th')}
          {row(speaker, 'en')}
        </div>
      ))}
    </div>
  )
}
