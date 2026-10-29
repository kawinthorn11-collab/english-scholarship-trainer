import { useState, useSyncExternalStore } from 'react'
import Mascot from './Mascot'
import { canPromptInstall, isIOS, isStandalone, promptInstall, subscribeInstall } from '../utils/install'

const DISMISS_KEY = 'mk-install-dismissed'

function wasDismissed() {
  try {
    return localStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

/** Invites learners to install the site as an app on phone, iPad or computer. */
export default function InstallCard() {
  const canPrompt = useSyncExternalStore(subscribeInstall, canPromptInstall, canPromptInstall)
  const [hidden, setHidden] = useState(() => isStandalone() || wasDismissed())
  const ios = isIOS()

  if (hidden || (!canPrompt && !ios)) return null

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // optional
    }
    setHidden(true)
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-sky-500/25 via-violet-500/20 to-pink-500/20 p-5 sm:p-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <img src={`${import.meta.env.BASE_URL}icons/icon-192.png`} alt="" className="h-16 w-16 shrink-0 rounded-2xl shadow-lg" />
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="font-display text-lg font-semibold text-white">ติดตั้ง MooKwai เป็นแอป</p>
          {canPrompt ? (
            <p className="text-sm text-purple-50/80">เปิดจากหน้าจอโฮมได้ทันที เต็มจอ และใช้ได้แม้ไม่มีเน็ต</p>
          ) : (
            <p className="text-sm text-purple-50/85">
              บน iPhone / iPad: กดปุ่ม <b>แชร์</b> <span aria-hidden>⬆️</span> ใน Safari แล้วเลือก <b>“เพิ่มไปยังหน้าจอโฮม”</b>
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {canPrompt && <button onClick={promptInstall} className="btn btn-primary">📲 ติดตั้งเลย</button>}
          <button onClick={dismiss} className="rounded-full px-3 py-2 text-sm text-purple-100/80 transition hover:bg-white/10 hover:text-white">ไว้ทีหลัง</button>
        </div>
        <Mascot character="pig" mood="wave" size={70} className="hidden shrink-0 lg:inline-block" />
      </div>
    </section>
  )
}
