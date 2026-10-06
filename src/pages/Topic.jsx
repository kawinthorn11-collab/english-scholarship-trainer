import { useEffect, useState } from 'react'
import SpeakButton, { RatePicker, ThaiVoiceNotice } from '../components/SpeakButton'
import { getTopic, grammarTopics } from '../data/grammarTopics'
import { sets } from '../data/sets'
import { choiceLabel, sectionScript, topicScript } from '../lib/exam'
import { href } from '../lib/router'
import { stopSpeaking } from '../lib/speech'

function QuizItem({ item, index, picked, onPick }) {
  const revealed = picked !== undefined
  return (
    <li className="mini">
      <p className="mini-q" lang="en"><span className="muted">{index + 1}.</span> {item.q}</p>
      <div className="mini-choices">
        {item.choices.map((choice, i) => {
          let state = ''
          if (revealed) state = i === item.answer ? ' is-right' : i === picked ? ' is-wrong' : ' is-dim'
          return (
            <button key={i} type="button" className={`choice choice-sm${state}`} disabled={revealed} onClick={() => onPick(i)}>
              <span className="choice-num">{choiceLabel(i)}</span>
              <span className="choice-text" lang="en">{choice}</span>
            </button>
          )
        })}
      </div>
      {revealed && (
        <p className={`mini-why ${picked === item.answer ? 'is-right' : 'is-wrong'}`}>
          <b>{picked === item.answer ? 'ถูกต้อง' : `เฉลย ${choiceLabel(item.answer)}`}</b> · {item.why}
        </p>
      )}
    </li>
  )
}

export default function Topic({ id }) {
  const topic = getTopic(id)
  const [picks, setPicks] = useState({})
  useEffect(() => () => stopSpeaking(), [])

  if (!topic) {
    return (
      <div className="page narrow">
        <p>ไม่พบบทเรียนนี้</p>
        <a className="btn" href={href('/grammar')}>กลับไปหมวดแกรมม่า</a>
      </div>
    )
  }

  const mainSet = sets[0]
  const done = Object.keys(picks).length
  const correct = topic.quiz.filter((item, index) => picks[index] === item.answer).length
  const index = grammarTopics.indexOf(topic)
  const next = grammarTopics[(index + 1) % grammarTopics.length]

  return (
    <div className="page narrow">
      <a className="back" href={href('/grammar')}>← หมวดแกรมม่าทั้งหมด</a>

      <header className="lesson-head">
        <span className="lesson-emoji" aria-hidden="true">{topic.emoji}</span>
        <h1>{topic.title}</h1>
        <p className="muted" lang="en">{topic.en}</p>
        <p className="lead">{topic.summary}</p>
        <div className="teacher-actions">
          <SpeakButton id={`topic-${topic.id}`} text={topicScript(topic)} label="ฟังครูสอนทั้งบท" size="lg" />
          <RatePicker />
        </div>
        <ThaiVoiceNotice />
      </header>

      <section className="card exam-items">
        <h2>ในข้อสอบจริงออกที่ข้อ</h2>
        <p className="muted small">กดเลขข้อเพื่อลองทำข้อที่ทดสอบจุดเดียวกันในชุด {mainSet.title}</p>
        <div className="chips">
          {topic.items.map((n) => (
            <a key={n} className="chip" href={href(`/exam/${mainSet.id}?q=${n}`)}>ข้อ {n}</a>
          ))}
        </div>
      </section>

      {topic.sections.map((section, i) => (
        <section key={i} className="card lesson-section">
          <div className="lesson-section-head">
            <h2>{section.head}</h2>
            <SpeakButton id={`topic-${topic.id}-${i}`} text={sectionScript(section)} label="ฟัง" size="sm" />
          </div>
          <p>{section.text}</p>
          <ul className="examples">
            {section.examples.map(([en, th], j) => (
              <li key={j}>
                <span className="ex-en" lang="en">{en}</span>
                <span className="ex-th">{th}</span>
                <SpeakButton id={`ex-${topic.id}-${i}-${j}`} text={en} english label="" size="round" />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="card traps">
        <h2>กับดักที่ต้องระวัง</h2>
        <ul>
          {topic.traps.map((trap, i) => <li key={i}>{trap}</li>)}
        </ul>
      </section>

      <section className="card">
        <div className="lesson-section-head">
          <h2>แบบฝึกท้ายบท</h2>
          {done > 0 && <span className="pill">{correct}/{topic.quiz.length} ถูก</span>}
        </div>
        <ol className="mini-list">
          {topic.quiz.map((item, i) => (
            <QuizItem key={i} item={item} index={i} picked={picks[i]} onPick={(choice) => setPicks((prev) => ({ ...prev, [i]: choice }))} />
          ))}
        </ol>
        {done === topic.quiz.length && (
          <button type="button" className="btn" onClick={() => setPicks({})}>ทำแบบฝึกอีกครั้ง</button>
        )}
      </section>

      <a className="card next-topic" href={href(`/grammar/${next.id}`)}>
        <span className="muted small">บทต่อไป</span>
        <strong>{next.emoji} {next.title} →</strong>
      </a>
    </div>
  )
}
