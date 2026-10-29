import { intlTests } from '../data/intlTests'
import { examSetList } from '../data/examSets/index.js'
import { getIntlBest, getMistakes } from '../utils/learningStore'
import { PageHeader, SectionTitle } from '../components/ui'

export default function TestsHub({ onNavigate, onOpenTest }) {
  const mistakes = getMistakes().length
  const best = getIntlBest()

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="คลังข้อสอบ"
        icon="📝"
        title="เลือกข้อสอบที่อยากฝึก"
        subtitle="มีทั้งข้อสอบจำลองแนวทุน และข้อสอบแนวสากล TOEIC · TOEFL · IELTS ทุกข้อแต่งขึ้นใหม่ พร้อมเฉลยภาษาไทยและเสียงอธิบาย"
        mood="teach"
      />

      <section>
        <SectionTitle icon="🎓" title="ข้อสอบแนวทุนมหาวิทยาลัยนานาชาติ" subtitle={`${examSetList.length} ชุด ชุดละ 60 ข้อ (Grammar 30 + Reading 30)`} />
        <div className="grid gap-4 sm:grid-cols-3">
          <HubCard icon="⏱️" title="Mock Exam" desc="จับเวลา 60 นาทีเหมือนสอบจริง แล้วดูผลและจุดอ่อน" tone="from-violet-600 to-indigo-600" onClick={() => onNavigate('mock-exam')} />
          <HubCard icon="🏋️" title="Practice" desc="ทำทีละข้อ เฉลยทันที เหมาะกับช่วงฝึกพื้นฐาน" tone="from-fuchsia-600 to-pink-500" onClick={() => onNavigate('practice')} />
          <HubCard icon="📊" title="ผลสอบล่าสุด" desc="ทบทวนทุกข้อพร้อมคำอธิบายแบบเต็ม" tone="from-slate-600 to-slate-500" onClick={() => onNavigate('results')} />
        </div>
      </section>

      <section>
        <SectionTitle icon="🌏" title="ข้อสอบแนวสากล" subtitle="ฝึกรูปแบบข้อสอบที่ใช้ทั่วโลก ชุดละ 5–8 นาที" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {intlTests.map((test) => (
            <button
              key={test.id}
              onClick={() => onOpenTest(test.id)}
              className="glass glow-card group relative overflow-hidden rounded-[1.75rem] p-6 text-left transition duration-300 hover:-translate-y-1"
            >
              <span aria-hidden className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${test.color} opacity-40 blur-2xl transition-transform duration-500 group-hover:scale-150`} />
              <span className={`relative mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${test.color} text-2xl shadow-lg transition-transform duration-300 group-hover:-rotate-12`}>{test.emoji}</span>
              <span className="relative block text-xs font-semibold text-pink-200">{test.style}</span>
              <span className="relative mt-1 block font-display text-xl font-semibold text-white">{test.title}</span>
              <span className="relative mt-1 block text-sm text-purple-100/75">{test.titleThai}</span>
              <span className="relative mt-4 flex flex-wrap gap-2">
                <span className="chip">❓ {test.questions.length} ข้อ</span>
                <span className="chip">⏱ ~{test.minutes} นาที</span>
                {best[test.id] !== undefined && <span className="chip !border-emerald-300/40 !bg-emerald-400/15 !text-emerald-100">ดีที่สุด {best[test.id]}%</span>}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <button
          onClick={() => onNavigate('mistakes')}
          className="group flex w-full flex-col gap-4 rounded-[2rem] border border-rose-300/25 bg-gradient-to-br from-rose-500/15 to-orange-400/10 p-6 text-left transition hover:-translate-y-1 sm:flex-row sm:items-center"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-500/30 text-3xl">📒</span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-xl font-semibold text-white">สมุดข้อผิด</span>
            <span className="block text-sm text-rose-100/80">ข้อที่เคยตอบผิดจะถูกเก็บไว้ตรงนี้ ตอบถูก 2 ครั้งติดถึงจะออกจากสมุด</span>
          </span>
          <span className="chip shrink-0 text-sm">{mistakes} ข้อรอทบทวน →</span>
        </button>
      </section>
    </div>
  )
}

function HubCard({ icon, title, desc, tone, onClick }) {
  return (
    <button onClick={onClick} className={`group relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${tone} p-6 text-left shadow-[0_20px_40px_-24px_rgba(0,0,0,0.9)] transition duration-300 hover:-translate-y-1.5`}>
      <span aria-hidden className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-xl transition-transform duration-500 group-hover:scale-150" />
      <span className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl">{icon}</span>
      <span className="relative block font-display text-xl font-semibold text-white">{title}</span>
      <span className="relative mt-1 block text-sm text-white/85">{desc}</span>
    </button>
  )
}
