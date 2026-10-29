import { useState } from 'react'
import Mascot, { SpeechBubble } from '../components/Mascot'
import { ListenButton } from '../components/Duo'
import { SectionTitle } from '../components/ui'
import { getPlanChecks, togglePlanCheck } from '../utils/learningStore'

// Learning-science methods the site is built around (e.g. Dunlosky et al., 2013;
// Brown, Roediger & McDaniel, "Make It Stick").
const methods = [
  { icon: '🧠', name: 'Retrieval Practice', thai: 'ฝึกดึงความรู้ออกมาเอง', desc: 'ทำข้อสอบแล้วนึกคำตอบเองก่อนดูเฉลย ได้ผลกว่าอ่านโน้ตซ้ำ', target: 'mistakes', cta: 'สมุดข้อผิด' },
  { icon: '📅', name: 'Spaced Repetition', thai: 'ทบทวนแบบเว้นระยะ', desc: 'ทบทวนตอนที่ใกล้จะลืม เว้นช่วงยาวขึ้นเรื่อย ๆ จำได้นานแต่ใช้เวลาน้อย', target: 'words', cta: 'บัตรคำศัพท์' },
  { icon: '🔀', name: 'Interleaving', thai: 'ฝึกสลับหัวข้อ', desc: 'ทำข้อสอบที่ผสมหลายเรื่อง ฝึกให้แยกออกว่าข้อนี้วัดอะไร เหมือนในห้องสอบจริง', target: 'tests', cta: 'คลังข้อสอบ' },
  { icon: '🎧', name: 'Comprehensible Input + Shadowing', thai: 'ฟังสิ่งที่เข้าใจ แล้วพูดตาม', desc: 'ฟังภาษาที่ยากกว่าระดับเรานิดหน่อย แล้วพูดตามทันที ช่วยทั้งฟังและพูด', target: 'listening', cta: 'ฝึกฟัง' },
  { icon: '👩‍🏫', name: 'I do · We do · You do', thai: 'ดูตัวอย่าง ลองด้วยกัน แล้วทำเอง', desc: 'ครูหมูกับครูควายอธิบายพร้อมตัวอย่างก่อน แล้วค่อยให้ลองตอบเอง', target: 'class', cta: 'ห้องเรียนหมูควาย' },
]

const levels = [
  { code: 'A2', label: 'พื้นฐาน', desc: 'อ่านประโยคสั้น ๆ เรื่องใกล้ตัวได้ รู้ tense หลัก' },
  { code: 'B1', label: 'ใช้งานได้', desc: 'อ่านบทความทั่วไปจับใจความได้ ใช้ grammar ส่วนใหญ่ถูก' },
  { code: 'B2', label: 'คล่องแคล่ว', desc: 'อ่านบทความวิชาการได้ แยกรายละเอียดและความหมายแฝงได้' },
]

const weeks = [
  {
    title: 'สัปดาห์ที่ 1 · วัดระดับและปูพื้น',
    goal: 'รู้ว่าตัวเองอ่อนตรงไหน และเริ่มนิสัยเรียนวันละนิด',
    tasks: [
      { id: 'w1-exam', label: 'ทำ Mock Exam 1 ชุดเพื่อวัดระดับ', target: 'mock-exam' },
      { id: 'w1-class', label: 'ฟังห้องเรียนหมูควาย 3 บทแรก', target: 'class' },
      { id: 'w1-words', label: 'บัตรคำ Academic Core 1 (วันละ 10 ใบ)', target: 'words' },
      { id: 'w1-mistakes', label: 'ทบทวนสมุดข้อผิดจาก Mock Exam', target: 'mistakes' },
      { id: 'w1-listen', label: 'ฝึกฟังและพูดตาม 10 นาที', target: 'listening' },
    ],
  },
  {
    title: 'สัปดาห์ที่ 2 · Grammar ที่ออกสอบบ่อย',
    goal: 'เก็บโครงสร้างหลัก: passive, relative clause, conditionals',
    tasks: [
      { id: 'w2-class', label: 'ห้องเรียน: Passive, who/which, If Type 2', target: 'class' },
      { id: 'w2-toeic', label: 'ข้อสอบแนว TOEIC Part 5', test: 'toeic-p5' },
      { id: 'w2-grammar', label: 'เรียน Grammar บทที่ Dashboard แนะนำ', target: 'grammar' },
      { id: 'w2-words', label: 'บัตรคำ Academic Core 2', target: 'words' },
      { id: 'w2-mistakes', label: 'ทบทวนสมุดข้อผิด 2 ครั้งในสัปดาห์', target: 'mistakes' },
    ],
  },
  {
    title: 'สัปดาห์ที่ 3 · Reading',
    goal: 'อ่านเร็วขึ้น จับ main idea และไม่ติดกับดักคำถาม',
    tasks: [
      { id: 'w3-class', label: 'ห้องเรียน: หา Main Idea และกับดัก NOT/EXCEPT', target: 'class' },
      { id: 'w3-ielts', label: 'ข้อสอบแนว IELTS True/False/Not Given', test: 'ielts-tfng' },
      { id: 'w3-vocab', label: 'Vocabulary in Context', test: 'vocab-context' },
      { id: 'w3-words', label: 'บัตรคำ Signal Words', target: 'words' },
      { id: 'w3-practice', label: 'Practice พาร์ท Reading 1 ชุด', target: 'practice' },
    ],
  },
  {
    title: 'สัปดาห์ที่ 4 · จำลองสอบจริง',
    goal: 'ทำข้อสอบแบบจับเวลา และเก็บจุดอ่อนที่เหลือ',
    tasks: [
      { id: 'w4-class', label: 'ห้องเรียน: Parallel และการบริหารเวลา', target: 'class' },
      { id: 'w4-error', label: 'ข้อสอบแนว TOEFL หาจุดผิด', test: 'toefl-error' },
      { id: 'w4-conv', label: 'บทสนทนา Best Response', test: 'conversation' },
      { id: 'w4-exam', label: 'Mock Exam ชุดใหม่ จับเวลา 60 นาที', target: 'mock-exam' },
      { id: 'w4-mistakes', label: 'เคลียร์สมุดข้อผิดให้เหลือน้อยที่สุด', target: 'mistakes' },
    ],
  },
]

const routine = [
  { min: 5, icon: '🃏', text: 'บัตรคำศัพท์' },
  { min: 10, icon: '🐷', text: 'บทเรียนหรือข้อสอบตามแผน' },
  { min: 5, icon: '📒', text: 'ทบทวนสมุดข้อผิด' },
  { min: 5, icon: '🎧', text: 'ฟังแล้วพูดตาม' },
]

export default function StudyPlan({ onNavigate, onOpenTest }) {
  const [checks, setChecks] = useState(getPlanChecks)
  const totalTasks = weeks.reduce((n, w) => n + w.tasks.length, 0)
  const doneTasks = Object.keys(checks).length
  const pct = Math.round((doneTasks / totalTasks) * 100)

  const open = (task) => (task.test ? onOpenTest(task.test) : onNavigate(task.target))

  return (
    <div className="space-y-12">
      <header className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-gradient-to-br from-pink-500/25 via-violet-500/20 to-sky-400/20 p-6 sm:p-9">
        <div className="relative flex flex-col items-center gap-6 md:flex-row">
          <div className="flex shrink-0 items-end -space-x-5">
            <Mascot character="pig" mood="wave" size={130} />
            <Mascot character="buffalo" mood="teach" size={140} />
          </div>
          <div className="min-w-0 flex-1 space-y-4">
            <p className="eyebrow">🗺️ หลักสูตร 4 สัปดาห์</p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">เรียนวันละ 25 นาที แบบที่นักเรียนทั่วโลกใช้</h1>
            <SpeechBubble
              tone="buffalo"
              side="left"
              text="หลักสูตรนี้ใช้วิธีเรียนที่มีงานวิจัยรองรับ ไม่ได้เน้นท่องจำ แต่เน้นฝึกดึงความรู้ออกมาใช้และทบทวนให้ถูกจังหวะ"
            />
            <div className="flex flex-wrap items-center gap-3">
              <ListenButton text={['หลักสูตรนี้ใช้วิธีเรียนที่มีงานวิจัยรองรับ ไม่ได้เน้นท่องจำ แต่เน้นฝึกดึงความรู้ออกมาใช้และทบทวนให้ถูกจังหวะ']} speaker="buffalo" label="ฟังครูควาย" />
              <span className="chip text-sm">ความคืบหน้า {doneTasks}/{totalTasks} งาน · {pct}%</span>
            </div>
          </div>
        </div>
      </header>

      <section>
        <SectionTitle icon="⏰" title="กิจวัตร 25 นาทีต่อวัน" subtitle="ทำทุกวันดีกว่าอ่านหนักวันเดียว" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {routine.map((r) => (
            <div key={r.text} className="glass rounded-3xl p-5 text-center">
              <p className="text-3xl">{r.icon}</p>
              <p className="mt-2 font-display text-2xl font-semibold text-white">{r.min} นาที</p>
              <p className="text-sm text-purple-100/80">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle icon="🧪" title="5 วิธีเรียนที่งานวิจัยยืนยันว่าได้ผล" subtitle="ใช้ในโรงเรียนและมหาวิทยาลัยทั่วโลก และถูกใส่ไว้ในเว็บนี้แล้ว" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {methods.map((m) => (
            <div key={m.name} className="glass glow-card flex flex-col rounded-[1.75rem] p-6">
              <span className="text-3xl">{m.icon}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{m.name}</h3>
              <p className="text-sm font-semibold text-pink-200">{m.thai}</p>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-purple-100/80">{m.desc}</p>
              <button onClick={() => onNavigate(m.target)} className="mt-4 self-start text-sm font-semibold text-sky-200 transition hover:text-white">
                ใช้ใน{m.cta} →
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle icon="📏" title="ระดับภาษาแบบ CEFR" subtitle="มาตรฐานวัดระดับภาษาที่ใช้ทั่วโลก ข้อสอบทุนมหาวิทยาลัยนานาชาติส่วนใหญ่ต้องการอย่างน้อยระดับกลาง" />
        <div className="grid gap-3 sm:grid-cols-3">
          {levels.map((l, i) => (
            <div key={l.code} className={`rounded-3xl border p-5 ${i === 2 ? 'border-emerald-300/40 bg-emerald-400/10' : 'border-white/10 bg-white/[0.05]'}`}>
              <p className="font-display text-3xl font-semibold text-white">{l.code}</p>
              <p className="text-sm font-semibold text-pink-200">{l.label}</p>
              <p className="mt-2 text-sm text-purple-100/80">{l.desc}</p>
              {i === 2 && <p className="mt-2 text-xs font-semibold text-emerald-200">🎯 เป้าหมายที่ควรฝึกให้ถึง</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle icon="✅" title="แผน 4 สัปดาห์" subtitle="ติ๊กเมื่อทำเสร็จ ความคืบหน้าบันทึกไว้ในเครื่องนี้" />
        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-pink-400 via-orange-300 to-emerald-300 transition-all duration-700" style={{ width: `${Math.max(pct, 2)}%` }} />
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {weeks.map((w) => {
            const weekDone = w.tasks.filter((t) => checks[t.id]).length
            return (
              <div key={w.title} className="glass rounded-[2rem] p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{w.title}</h3>
                    <p className="text-sm text-purple-100/75">{w.goal}</p>
                  </div>
                  <span className={`chip shrink-0 ${weekDone === w.tasks.length ? '!border-emerald-300/50 !bg-emerald-400/20 !text-emerald-50' : ''}`}>{weekDone}/{w.tasks.length}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {w.tasks.map((t) => (
                    <li key={t.id} className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-3 py-2.5">
                      <input
                        id={`plan-${t.id}`}
                        type="checkbox"
                        checked={Boolean(checks[t.id])}
                        onChange={() => setChecks({ ...togglePlanCheck(t.id) })}
                        className="h-5 w-5 shrink-0 accent-pink-500"
                      />
                      <label htmlFor={`plan-${t.id}`} className={`min-w-0 flex-1 text-[15px] ${checks[t.id] ? 'text-purple-200/60 line-through' : 'text-white'}`}>{t.label}</label>
                      <button onClick={() => open(t)} className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-pink-100 transition hover:bg-pink-500/40 hover:text-white">ไป →</button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
