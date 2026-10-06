import { sets } from '../data/sets'
import { grammarTopics } from '../data/grammarTopics'
import { getAllAttempts, scoreOf } from '../lib/exam'
import { href } from '../lib/router'
import SpeakButton from '../components/SpeakButton'

const WELCOME = 'สวัสดีครับ เว็บนี้ช่วยเตรียมสอบชิงทุนภาษาอังกฤษ ข้อสอบมีสองส่วน คือ Grammar สามสิบข้อ และ Reading สามสิบข้อ ทำในหกสิบนาที เริ่มจากชุด M-Style ซึ่งแต่งตามแนวข้อสอบจริง ทุกข้อมีเฉลยละเอียด และกดให้ครูพูดอธิบายได้ ถ้าข้อไหนผิด ให้ไปทบทวนในหมวดแกรมม่าต่อได้เลย'

function LastScore() {
  const attempts = getAllAttempts()
  const done = sets
    .flatMap((set) => ['timed', 'practice'].map((mode) => ({ set, mode, attempt: attempts[`${set.id}:${mode}`] })))
    .filter((item) => item.attempt?.finishedAt)
    .sort((a, b) => b.attempt.finishedAt - a.attempt.finishedAt)
  if (done.length === 0) return null
  const { set, mode, attempt } = done[0]
  const score = scoreOf(set, attempt.answers)
  return (
    <a className="card last-score" href={href(`/result/${set.id}?from=${mode}`)}>
      <span className="muted small">คะแนนล่าสุด · {set.title}</span>
      <strong>{score.total}<small>/{score.max}</small></strong>
      <span className="muted small">ดูผลและเฉลย →</span>
    </a>
  )
}

export default function Home() {
  const main = sets[0]
  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">ติวสอบชิงทุนภาษาอังกฤษ · ใช้ฟรี ไม่ต้องสมัคร</p>
        <h1>ฝึกข้อสอบแนวจริง<br />พร้อม<span className="hl">ครูพูดเฉลยทีละข้อ</span></h1>
        <p className="lead">
          ข้อสอบ 60 ข้อ (Grammar 30 + Reading 30) ใน 60 นาที ทุกข้อบอกว่าทำไมถูก ทำไมช้อยส์อื่นผิด
          และมีเทคนิคจำง่าย กดปุ่มเดียวให้ครูอ่านอธิบายให้ฟังได้เลย
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary btn-lg" href={href(`/exam/${main.id}`)}>เริ่มฝึกชุดแนวข้อสอบจริง</a>
          <SpeakButton id="welcome" text={WELCOME} label="ฟังวิธีใช้" />
        </div>
      </section>

      <LastScore />

      <section className="steps">
        <a className="step card" href={href(`/exam/${main.id}`)}>
          <span className="step-no">1</span>
          <h2>ฝึกทีละข้อ</h2>
          <p>ตอบแล้วเฉลยขึ้นทันที อ่านคำอธิบายหรือกดฟังครูสอน</p>
        </a>
        <a className="step card" href={href('/grammar')}>
          <span className="step-no">2</span>
          <h2>ทบทวนแกรมม่า</h2>
          <p>{grammarTopics.length} หัวข้อที่สรุปจากข้อสอบจริง มีตัวอย่างและแบบฝึก</p>
        </a>
        <a className="step card" href={href(`/exam/${main.id}/timed`)}>
          <span className="step-no">3</span>
          <h2>จำลองสอบ 60 นาที</h2>
          <p>จับเวลาเหมือนห้องสอบ ส่งแล้วดูคะแนนและจุดอ่อน</p>
        </a>
      </section>

      <section className="card format">
        <h2>ข้อสอบมีหน้าตาแบบนี้</h2>
        <div className="format-grid">
          <div>
            <p className="eyebrow">Part I · Grammar · 30 ข้อ</p>
            <p>บทความ 3 เรื่อง เรื่องละ 10 ช่อง ให้เลือกคำเติม เช่น ข่าว เรียงความ และเรื่องสั้น</p>
            <p className="muted small">ออกบ่อย: คำเชื่อม · บุพบท · Tense · สรรพนาม · Parallel · รูปคำ</p>
          </div>
          <div>
            <p className="eyebrow">Part II · Reading · 30 ข้อ</p>
            <p>บทความ 3 เรื่อง ถามคำอ้างอิง (he, them, this ในบรรทัดที่…) รายละเอียด ศัพท์ และการอนุมาน</p>
            <p className="muted small">คำอ้างอิงออกถึง 10 ข้อ เป็นคะแนนที่เก็บได้ง่ายที่สุด</p>
          </div>
        </div>
        <a className="btn" href={href('/exam')}>ดูข้อสอบทั้ง {sets.length} ชุด</a>
      </section>
    </div>
  )
}
