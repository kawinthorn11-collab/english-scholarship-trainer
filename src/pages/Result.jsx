import { getSet } from '../data/sets'
import { getTopic } from '../data/grammarTopics'
import { getAttempt, scoreOf, weakTopics } from '../lib/exam'
import { href } from '../lib/router'
import SpeakButton from '../components/SpeakButton'

function verdict(total) {
  if (total >= 50) return 'ยอดเยี่ยม! ระดับนี้มีลุ้นทุนแน่นอน รักษามาตรฐานไว้'
  if (total >= 40) return 'ดีมาก เก็บจุดอ่อนอีกนิดก็พร้อมสอบแล้ว'
  if (total >= 30) return 'ผ่านครึ่งแล้ว ทบทวนหัวข้อที่พลาดบ่อยด้านล่าง แล้วลองทำใหม่'
  return 'ไม่เป็นไร เริ่มจากดูเฉลยทีละข้อ แล้วทบทวนหัวข้อที่แนะนำด้านล่าง'
}

export default function Result({ setId, query }) {
  const set = getSet(setId)
  const from = query.get('from') === 'timed' ? 'timed' : 'practice'
  const attempt = getAttempt(`${setId}:${from}`)

  if (!set || !attempt) {
    return (
      <div className="page narrow">
        <p>ยังไม่มีผลคะแนนของชุดนี้</p>
        <a className="btn btn-primary" href={href('/exam')}>เลือกชุดข้อสอบ</a>
      </div>
    )
  }

  const score = scoreOf(set, attempt.answers)
  const weak = weakTopics(set, attempt.answers).slice(0, 5)
  const percent = Math.round((score.total / score.max) * 100)
  const summary = `ได้ ${score.total} จาก ${score.max} คะแนน. Grammar ${score.grammar} จาก ${score.grammarMax}. Reading ${score.reading} จาก ${score.readingMax}. ${verdict(score.total)}${weak.length ? ` หัวข้อที่ควรทบทวนก่อน คือ ${weak.slice(0, 3).map((item) => getTopic(item.topic)?.title).join(', ')}` : ''}`

  return (
    <div className="page narrow">
      <a className="back" href={href('/exam')}>← ข้อสอบทั้งหมด</a>
      <section className="card score-card">
        <p className="eyebrow">{set.title} · {from === 'timed' ? 'จำลองสอบ' : 'ฝึกทีละข้อ'}</p>
        <div className="score-ring" style={{ '--p': percent }}>
          <strong>{score.total}</strong>
          <span>จาก {score.max}</span>
        </div>
        <p className="verdict-text">{verdict(score.total)}</p>
        <div className="score-split">
          <div><span className="muted small">Grammar</span><b>{score.grammar}/{score.grammarMax}</b></div>
          <div><span className="muted small">Reading</span><b>{score.reading}/{score.readingMax}</b></div>
        </div>
        <SpeakButton id="result-summary" text={summary} label="ฟังครูสรุปผล" />
      </section>

      <section className="card">
        <h2>ดูเฉลยทีละข้อ</h2>
        <p className="muted small">กดเลขข้อเพื่อดูคำอธิบาย สีเขียว = ถูก สีแดง = ผิด สีเทา = ไม่ได้ตอบ</p>
        {['grammar', 'reading'].map((part) => (
          <div key={part}>
            <p className="eyebrow">{part === 'grammar' ? 'Part I · Grammar' : 'Part II · Reading'}</p>
            <div className="qgrid">
              {set.questions.filter((item) => item.part === part).map((item) => {
                const picked = attempt.answers[item.n]
                const state = picked === undefined ? ' is-skip' : picked === item.answer ? ' is-right' : ' is-wrong'
                return (
                  <a key={item.n} className={`qcell${state}`} href={href(`/exam/${setId}/review?from=${from}&q=${item.n}`)}>
                    {item.n}
                  </a>
                )
              })}
            </div>
          </div>
        ))}
        <a className="btn btn-primary" href={href(`/exam/${setId}/review?from=${from}&q=1`)}>เริ่มดูเฉลยตั้งแต่ข้อ 1</a>
      </section>

      {weak.length > 0 && (
        <section className="card">
          <h2>หัวข้อที่ควรทบทวน</h2>
          <ul className="weak-list">
            {weak.map((item) => {
              const topic = getTopic(item.topic)
              if (!topic) return null
              return (
                <li key={item.topic}>
                  <a href={href(`/grammar/${topic.id}`)}>
                    <span aria-hidden="true">{topic.emoji}</span>
                    <span className="weak-title">{topic.title}</span>
                    <span className="weak-count">ผิด {item.wrong}/{item.total}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <div className="row-actions">
        <a className="btn" href={href(`/exam/${setId}${from === 'timed' ? '/timed' : ''}`)}>ทำชุดนี้ใหม่</a>
        <a className="btn" href={href('/exam')}>ลองชุดอื่น</a>
      </div>
    </div>
  )
}
