import { useState } from 'react'
import Mascot, { SpeechBubble } from '../components/Mascot'
import QuizRunner from '../components/QuizRunner'
import { getMistakes, removeMistake, reviewMistake } from '../utils/learningStore'

export default function Mistakes({ onNavigate }) {
  const [items, setItems] = useState(getMistakes)
  const [reviewing, setReviewing] = useState(null)

  const refresh = () => setItems(getMistakes())

  if (reviewing) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="eyebrow justify-center">📒 ทบทวนสมุดข้อผิด</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">ตอบให้ได้โดยไม่ดูเฉลย</h1>
          <p className="mt-1 text-sm text-purple-100/75">ข้อไหนตอบถูก 2 ครั้งติดกัน จะออกจากสมุดเอง</p>
        </div>
        <QuizRunner
          questions={reviewing}
          onAnswer={(q, correct) => reviewMistake(q.id, correct)}
          onExit={() => { setReviewing(null); refresh() }}
          exitLabel="← กลับสมุด"
        />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <header className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose-500/30 blur-3xl" />
        <div className="relative flex flex-col items-center gap-6 sm:flex-row">
          <Mascot character="buffalo" mood="teach" size={130} className="shrink-0" />
          <div className="min-w-0 flex-1 space-y-3">
            <p className="eyebrow">📒 สมุดข้อผิด · Retrieval practice</p>
            <h1 className="text-3xl font-semibold text-white">ข้อผิดคือครูที่ดีที่สุด</h1>
            <SpeechBubble
              tone="buffalo"
              side="left"
              text="งานวิจัยด้านการเรียนรู้พบว่า การฝึกดึงความรู้ออกมาเองแบบไม่ดูเฉลย ช่วยให้จำได้นานกว่าการอ่านซ้ำ ลองทบทวนข้อผิดทุกวันนะ"
            />
          </div>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="glass space-y-4 rounded-[2rem] p-10 text-center">
          <Mascot character="pig" mood="cheer" size={130} className="mx-auto" />
          <h2 className="text-2xl font-semibold text-white">สมุดว่างเปล่า เยี่ยมมาก!</h2>
          <p className="text-purple-100/80">ข้อที่ตอบผิดจากการฝึก ข้อสอบจำลอง และข้อสอบแนวสากล จะถูกเก็บไว้ที่นี่อัตโนมัติ</p>
          <button onClick={() => onNavigate('tests')} className="btn btn-primary">ไปทำข้อสอบ →</button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-between gap-4 rounded-[2rem] border border-white/15 bg-gradient-to-r from-pink-500/20 to-orange-400/15 p-6 sm:flex-row">
            <div>
              <p className="font-display text-2xl font-semibold text-white">{items.length} ข้อรอทบทวน</p>
              <p className="text-sm text-pink-50/80">ทบทวนครั้งละไม่เกิน 10 ข้อ ใช้เวลาประมาณ 5 นาที</p>
            </div>
            <button onClick={() => setReviewing(items.slice(0, 10))} className="btn btn-primary px-8 py-4 text-lg">▶ เริ่มทบทวน</button>
          </div>

          <ul className="space-y-3">
            {items.map((m) => (
              <li key={m.id} className="glass flex items-start gap-4 rounded-3xl p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-rose-500/25 text-sm font-bold text-rose-100">{m.streak || 0}/2</span>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 whitespace-pre-line text-[15px] text-white">{m.question.replace(/\[\[([A-D])\|([^\]]+)\]\]/g, '$2')}</p>
                  <p className="mt-1 text-xs text-purple-200/70">{m.source}</p>
                </div>
                <button onClick={() => { removeMistake(m.id); refresh() }} className="shrink-0 rounded-full px-3 py-1.5 text-xs text-purple-200 transition hover:bg-white/10 hover:text-white" aria-label="ลบข้อนี้ออกจากสมุด">
                  ลบ
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
