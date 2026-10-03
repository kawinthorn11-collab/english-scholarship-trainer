import { useState } from 'react'
import Mascot, { SpeechBubble } from '../components/Mascot'
import { CountUp, Confetti } from '../components/ui'
import { examSetList } from '../data/examSets/index.js'
import { getAvailableLessons } from '../data/grammarLessons/index.js'
import { academyStats } from '../data/grammarAcademy/index.js'
import { landingQuiz } from '../data/mascotTips'

const features = [
  { icon: '📝', title: 'Mock Exam เสมือนจริง', desc: '60 ข้อ 60 นาที จับเวลาเหมือนห้องสอบ พร้อมสลับข้อทุกครั้ง', tone: 'from-violet-500/40 to-indigo-500/10', span: 'lg:col-span-2' },
  { icon: '🦉', title: 'ครูฮูกช่วยสอน', desc: 'ตัวการ์ตูนคอยให้ทิปและกำลังใจทุกหน้า', tone: 'from-fuchsia-500/40 to-pink-500/10' },
  { icon: '💡', title: 'เฉลยละเอียดสองภาษา', desc: 'รู้ว่าทำไมถูก ทำไมผิด พร้อม exam trick', tone: 'from-amber-400/40 to-orange-500/10' },
  { icon: '📚', title: 'Grammar Academy', desc: 'คอร์ส grammar เป็นระบบ ตั้งแต่พื้นฐานจนถึงกับดักข้อสอบ', tone: 'from-emerald-400/40 to-teal-500/10' },
  { icon: '🎯', title: 'วิเคราะห์จุดอ่อน', desc: 'บอกเลยว่าควรซ่อมเรื่องไหนก่อน แล้วพาไปบทเรียนที่ใช่', tone: 'from-rose-400/40 to-red-500/10', span: 'lg:col-span-2' },
  { icon: '🎧', title: 'ฝึกฟังเสียง Native', desc: 'ฟังประโยคสอบแบบช้า/ปกติ ฝึก shadowing ได้ทันที', tone: 'from-sky-400/40 to-blue-500/10' },
]

const steps = [
  { icon: '🎯', title: 'ทำข้อสอบจำลอง', desc: 'วัดระดับตัวเองด้วยข้อสอบ 60 ข้อ' },
  { icon: '🔍', title: 'ดูจุดอ่อน', desc: 'ระบบวิเคราะห์ทักษะที่ยังพลาด' },
  { icon: '📘', title: 'เรียนกับครูฮูก', desc: 'เข้าบทเรียน + drill ตรงจุด' },
  { icon: '🏆', title: 'คะแนนพุ่ง!', desc: 'กลับมาสอบใหม่แล้วเห็นพัฒนาการ' },
]

const marqueeWords = ['substantial', 'mitigate', 'feasible', 'consequently', 'advocate', 'comprehensive', 'inevitable', 'prominent', 'sustain', 'enhance', 'diligent', 'ambiguous']

export default function Landing({ onNavigate }) {
  const totalQuestions = examSetList.reduce((sum, set) => sum + (set.totalQuestions || 0), 0)
  const lessonsCount = getAvailableLessons().length

  return (
    <div className="space-y-28 pb-10 sm:space-y-36">
      {/* HERO */}
      <section className="relative grid items-center gap-12 pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:pt-14">
        <div className="space-y-7 text-center lg:text-left">
          <span className="chip animate-fade-up">✨ ฝึกสอบชิงทุนแบบมีครูส่วนตัว</span>
          <h1 className="animate-fade-up text-4xl font-semibold leading-[1.15] text-white [animation-delay:80ms] sm:text-5xl lg:text-6xl">
            เตรียมสอบชิงทุน
            <br />
            ภาษาอังกฤษ <span className="gradient-text">ให้ปังกว่าที่เคย</span>
          </h1>
          <p className="mx-auto max-w-xl animate-fade-up text-lg leading-relaxed text-purple-200/80 [animation-delay:160ms] lg:mx-0">
            ข้อสอบจำลอง เฉลยละเอียด วิเคราะห์จุดอ่อน และ <b className="text-white">ครูฮูก</b> ที่จะคอยสอนเทคนิคให้ทุกก้าว — เรียนสนุก ไม่น่าเบื่อ ไม่แออัด
          </p>
          <div className="flex animate-fade-up flex-col items-center gap-3 [animation-delay:240ms] sm:flex-row sm:justify-center lg:justify-start">
            <button onClick={() => onNavigate('dashboard')} className="btn btn-primary w-full px-8 py-4 text-lg sm:w-auto">
              เริ่มเรียนเลย 🚀
            </button>
            <button onClick={() => onNavigate('mock-exam')} className="btn btn-ghost w-full px-8 py-4 text-lg sm:w-auto">
              ลองทำข้อสอบจำลอง
            </button>
          </div>
          <div className="grid animate-fade-up grid-cols-3 gap-3 pt-4 [animation-delay:320ms]">
            <HeroStat value={totalQuestions} suffix="+" label="ข้อสอบเสมือนจริง" />
            <HeroStat value={lessonsCount} label="บทเรียน Grammar" />
            <HeroStat value={academyStats.totalUnits} label="ยูนิตใน Academy" />
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
          <div aria-hidden className="absolute inset-0 m-auto h-80 w-80 rounded-full bg-gradient-to-br from-violet-600/40 via-fuchsia-500/30 to-amber-400/20 blur-3xl" />
          <div aria-hidden className="absolute inset-0 m-auto h-[22rem] w-[22rem] animate-spin-slow rounded-full border border-dashed border-white/10" />
          <SpeechBubble
            side="bottom"
            className="relative z-10 mb-4 w-full max-w-sm animate-pop"
            text="Hello! ฉันคือครูฮูก 🦉 วันนี้มาเก็บคะแนน grammar กันสักนิดไหม? ฉันจะสอนทีละขั้นเลย!"
          />
          <div className="relative">
            <Mascot mood="wave" size={260} className="relative z-10 drop-shadow-[0_30px_40px_rgba(124,58,237,0.45)]" />
            <FloatingChip className="-left-16 top-10 [animation-delay:0s]" icon="📖" text="Grammar" />
            <FloatingChip className="-right-14 top-24 [animation-delay:1.2s]" icon="🎧" text="Listening" />
            <FloatingChip className="-left-10 bottom-14 [animation-delay:2.1s]" icon="⏱" text="60 ข้อ / 60 นาที" />
            <FloatingChip className="-right-10 bottom-4 [animation-delay:0.6s]" icon="💡" text="เฉลยละเอียด" />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="relative -mx-4 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" aria-hidden>
        <div className="flex w-max animate-marquee gap-4">
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={i} className="glass whitespace-nowrap rounded-full px-5 py-2.5 font-display text-lg text-purple-100">
              <span className="mr-2 text-fuchsia-300">✦</span>{word}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="space-y-10">
        <SectionIntro eyebrow="ทำไมต้อง ScholarOwl" title={<>ครบทุกอย่างที่ต้องใช้ <span className="gradient-text">ในที่เดียว</span></>} subtitle="ออกแบบมาให้อ่านง่าย ไม่รก มีจังหวะ และสนุกจนลืมว่ากำลังติวอยู่" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className={`glass glow-card lift group relative overflow-hidden rounded-[1.75rem] p-7 ${f.span || ''}`}>
              <div aria-hidden className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${f.tone} blur-2xl transition-transform duration-700 group-hover:scale-150`} />
              <div className="relative">
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.08] text-3xl transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                  {f.icon}
                </span>
                <h3 className="mb-2 text-xl font-semibold text-white">{f.title}</h3>
                <p className="text-[15px] leading-relaxed text-purple-200/75">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRY IT — mascot teaches */}
      <section className="space-y-10">
        <SectionIntro eyebrow="ลองเรียนกับครูฮูก" title="ลองตอบดูสักข้อ 👇" subtitle="ตอบผิดก็ไม่เป็นไร ครูฮูกจะอธิบายให้ทันที" />
        <MiniQuiz />
      </section>

      {/* STEPS */}
      <section className="space-y-10">
        <SectionIntro eyebrow="เส้นทางสู่ทุน" title="4 ขั้นตอนง่าย ๆ" />
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent lg:block" />
          {steps.map((s, i) => (
            <div key={s.title} className="glass lift relative rounded-[1.75rem] p-6 text-center">
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-3xl shadow-lg shadow-fuchsia-900/40">
                {s.icon}
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-300 text-xs font-bold text-amber-950">{i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-1 text-sm text-purple-200/75">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="rainbow-border rounded-[2.25rem]">
          <div className="relative overflow-hidden rounded-[2.2rem] bg-[#140f2e] px-6 py-12 sm:px-12">
            <div aria-hidden className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-fuchsia-600/25 blur-3xl" />
            <div className="relative flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
              <Mascot mood="cheer" size={170} className="shrink-0" />
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">พร้อมคว้าทุนแล้วใช่ไหม?</h2>
                <p className="text-lg text-purple-200/80">เริ่มวันนี้ วันละ 20 นาที ไม่ต้องสมัครก็ใช้ได้ทันที ความคืบหน้าบันทึกไว้ในเครื่องให้อัตโนมัติ</p>
              </div>
              <button onClick={() => onNavigate('dashboard')} className="btn btn-primary shrink-0 px-8 py-4 text-lg">
                ไปที่ Dashboard →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function HeroStat({ value, suffix = '', label }) {
  return (
    <div className="glass rounded-2xl px-3 py-4 text-center">
      <p className="font-display text-2xl font-semibold text-white sm:text-3xl"><CountUp value={value} />{suffix}</p>
      <p className="mt-1 text-[11px] text-purple-300/80 sm:text-xs">{label}</p>
    </div>
  )
}

function FloatingChip({ icon, text, className = '' }) {
  return (
    <span className={`glass-strong absolute z-20 hidden animate-float items-center gap-2 whitespace-nowrap rounded-2xl px-3.5 py-2 text-sm font-semibold text-white shadow-xl sm:flex ${className}`}>
      <span className="text-lg">{icon}</span>{text}
    </span>
  )
}

function SectionIntro({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl space-y-3 text-center">
      <p className="eyebrow justify-center">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="text-purple-200/75">{subtitle}</p>}
    </div>
  )
}

function MiniQuiz() {
  const [picked, setPicked] = useState(null)
  const correct = picked === landingQuiz.answer
  const mood = picked == null ? 'teach' : correct ? 'cheer' : 'oops'
  const message = picked == null
    ? 'เติมคำในช่องว่างให้ถูกต้อง เลือกคำตอบที่คิดว่าใช่เลย!'
    : correct ? landingQuiz.explainCorrect : landingQuiz.explainWrong

  return (
    <div className="glass mx-auto grid max-w-4xl items-center gap-8 rounded-[2rem] p-6 sm:p-10 md:grid-cols-[auto_1fr]">
      {picked && correct && <Confetti key={picked} count={50} />}
      <div className="flex flex-col items-center gap-4">
        <Mascot mood={mood} size={170} />
      </div>
      <div className="space-y-5">
        <SpeechBubble key={message} side="left" text={message} className="hidden md:block" />
        <SpeechBubble key={`m-${message}`} side="bottom" text={message} className="md:hidden" />
        <p className="font-display text-xl text-white sm:text-2xl">{landingQuiz.question}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {landingQuiz.choices.map((choice, i) => {
            const isPicked = picked === choice
            const isAnswer = choice === landingQuiz.answer
            let tone = 'border-white/10 bg-white/[0.04] hover:border-violet-400/60 hover:bg-white/[0.08]'
            if (picked) {
              if (isAnswer) tone = 'border-emerald-400 bg-emerald-500/15 animate-pop'
              else if (isPicked) tone = 'border-rose-400 bg-rose-500/15 animate-shake'
              else tone = 'border-white/5 bg-white/[0.02] opacity-50'
            }
            return (
              <button
                key={choice}
                onClick={() => !picked && setPicked(choice)}
                disabled={Boolean(picked)}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left font-medium text-white transition ${tone}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm font-bold">{i + 1}</span>
                {choice}
                {picked && isAnswer && <span className="ml-auto">✅</span>}
                {isPicked && !isAnswer && <span className="ml-auto">❌</span>}
              </button>
            )
          })}
        </div>
        {picked && (
          <button onClick={() => setPicked(null)} className="text-sm font-semibold text-purple-300 underline-offset-4 transition hover:text-white hover:underline">
            ↺ ลองอีกครั้ง
          </button>
        )}
      </div>
    </div>
  )
}
