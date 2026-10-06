import SpeakButton, { RatePicker } from './SpeakButton'
import { blankSentence, choiceLabel, teachingScript } from '../lib/exam'
import { getTopic } from '../data/grammarTopics'
import { href } from '../lib/router'

function Sentence({ text }) {
  return text.split(/(\[\[[^\]]+\]\])/).map((part, index) => {
    const match = part.match(/^\[\[(.+)\]\]$/)
    return match ? <mark key={index}>{match[1]}</mark> : <span key={index}>{part}</span>
  })
}

/** เฉลยละเอียดของข้อเดียว พร้อมปุ่มให้ครูพูดสอน */
export default function Explanation({ set, question, chosen }) {
  const answered = chosen !== undefined
  const correct = chosen === question.answer
  const sentence = question.part === 'grammar' ? blankSentence(set, question) : ''
  const topic = question.topic ? getTopic(question.topic) : null
  const others = question.choices
    .map((choice, index) => ({ choice, index, reason: question.wrong[index] }))
    .filter((item) => item.index !== question.answer)

  return (
    <section className={`explain ${answered ? (correct ? 'is-right' : 'is-wrong') : 'is-skipped'}`} aria-live="polite">
      <header className="explain-head">
        <div>
          <p className="verdict">
            {!answered && 'ข้อนี้ยังไม่ได้ตอบ'}
            {answered && correct && 'ถูกต้อง เก่งมาก!'}
            {answered && !correct && `ยังไม่ถูก คุณเลือกช้อยส์ ${choiceLabel(chosen)}`}
          </p>
          <p className="answer-line">
            เฉลย: ช้อยส์ <b>{choiceLabel(question.answer)}</b> · <span lang="en">{question.choices[question.answer]}</span>
          </p>
        </div>
      </header>

      <div className="teacher">
        <div className="teacher-avatar" aria-hidden="true">ครู</div>
        <div className="teacher-body">
          <p className="teacher-hint">กดฟัง ครูจะอธิบายข้อนี้ให้ฟังทีละขั้น</p>
          <div className="teacher-actions">
            <SpeakButton id={`teach-${set.id}-${question.n}`} text={teachingScript(question)} label="ฟังครูอธิบายข้อนี้" size="lg" />
            <RatePicker />
          </div>
        </div>
      </div>

      {sentence && (
        <div className="block">
          <h3>ประโยคที่ถูกต้อง</h3>
          <p className="sentence" lang="en"><Sentence text={sentence} /></p>
          <SpeakButton id={`sentence-${set.id}-${question.n}`} text={sentence.replace(/\[\[|\]\]/g, '')} english label="ฟังสำเนียงอังกฤษ" size="sm" />
        </div>
      )}

      <div className="block">
        <h3>ทำไมตอบข้อนี้</h3>
        <p>{question.why}</p>
        {question.explainEn && <p className="muted" lang="en">{question.explainEn}</p>}
      </div>

      <div className="block">
        <h3>ทำไมช้อยส์อื่นผิด</h3>
        <ul className="wrong-list">
          {others.map((item) => (
            <li key={item.index} className={item.index === chosen ? 'is-picked' : undefined}>
              <span className="wrong-choice"><b>{choiceLabel(item.index)}</b> <span lang="en">{item.choice}</span></span>
              <span>{item.reason || 'ไม่เข้ากับโครงสร้างและความหมายของประโยค'}</span>
            </li>
          ))}
        </ul>
      </div>

      {question.tip && (
        <div className="block tip">
          <h3>เทคนิคทำข้อสอบ</h3>
          <p>{question.tip}</p>
        </div>
      )}

      {question.trap && (
        <div className="block">
          <h3>จุดที่คนไทยมักพลาด</h3>
          <p>{question.trap}</p>
        </div>
      )}

      {question.lesson && (
        <div className="block">
          <h3>สรุปหลัก</h3>
          <p lang="en">{question.lesson}</p>
        </div>
      )}

      {topic && (
        <a className="topic-link" href={href(`/grammar/${topic.id}`)}>
          <span aria-hidden="true">{topic.emoji}</span>
          <span>
            <small>อ่านบทเรียนเต็มของหัวข้อนี้</small>
            {topic.title}
          </span>
          <span aria-hidden="true">→</span>
        </a>
      )}
    </section>
  )
}
