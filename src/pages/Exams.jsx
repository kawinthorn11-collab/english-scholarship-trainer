import { sets } from '../data/sets'
import { getAllAttempts, scoreOf } from '../lib/exam'
import { href } from '../lib/router'

function Status({ set, attempts }) {
  const practice = attempts[`${set.id}:practice`]
  const timed = attempts[`${set.id}:timed`]
  const best = [practice, timed]
    .filter((attempt) => attempt?.finishedAt)
    .map((attempt) => scoreOf(set, attempt.answers).total)
    .sort((a, b) => b - a)[0]
  const inProgress = practice && !practice.finishedAt ? Object.keys(practice.answers).length : 0
  return (
    <p className="muted small">
      {best !== undefined && <>คะแนนดีที่สุด <b>{best}/60</b></>}
      {best !== undefined && inProgress > 0 && ' · '}
      {inProgress > 0 && <>ฝึกค้างไว้ {inProgress} ข้อ</>}
      {best === undefined && inProgress === 0 && 'ยังไม่ได้ทำ'}
    </p>
  )
}

export default function Exams() {
  const attempts = getAllAttempts()
  return (
    <div className="page">
      <header className="page-head">
        <h1>ข้อสอบจำลอง</h1>
        <p className="lead">ทุกชุดมี 60 ข้อ แบ่งเป็น Grammar 30 และ Reading 30 เลือกได้ว่าจะฝึกทีละข้อหรือจับเวลา</p>
      </header>
      <div className="set-list">
        {sets.map((set) => (
          <article key={set.id} className={`card set${set.badge ? ' is-featured' : ''}`}>
            <div className="set-info">
              {set.badge && <span className="badge">{set.badge}</span>}
              <h2>{set.title}</h2>
              <p>{set.subtitle}</p>
              <Status set={set} attempts={attempts} />
            </div>
            <div className="set-actions">
              <a className="btn btn-primary" href={href(`/exam/${set.id}`)}>ฝึกทีละข้อ</a>
              <a className="btn" href={href(`/exam/${set.id}/timed`)}>จับเวลา 60 นาที</a>
            </div>
          </article>
        ))}
      </div>
      <p className="muted small center">ข้อสอบทุกชุดแต่งขึ้นใหม่ตามรูปแบบข้อสอบจริง ไม่ได้คัดลอกข้อสอบที่มีลิขสิทธิ์</p>
    </div>
  )
}
