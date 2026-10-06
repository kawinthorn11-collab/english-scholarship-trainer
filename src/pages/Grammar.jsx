import { grammarTopics } from '../data/grammarTopics'
import { href } from '../lib/router'

export default function Grammar() {
  const grammar = grammarTopics.filter((topic) => !['reference', 'reading'].includes(topic.id))
  const reading = grammarTopics.filter((topic) => ['reference', 'reading'].includes(topic.id))
  const byCount = (a, b) => b.items.length - a.items.length

  const renderList = (topics) => (
    <div className="topic-list">
      {topics.sort(byCount).map((topic) => (
        <a key={topic.id} className="card topic-card" href={href(`/grammar/${topic.id}`)}>
          <span className="topic-emoji" aria-hidden="true">{topic.emoji}</span>
          <span className="topic-text">
            <strong>{topic.title}</strong>
            <span className="muted small" lang="en">{topic.en}</span>
          </span>
          <span className="topic-count">{topic.items.length} ข้อ</span>
        </a>
      ))}
    </div>
  )

  return (
    <div className="page">
      <header className="page-head">
        <h1>หมวดแกรมม่าจากข้อสอบจริง</h1>
        <p className="lead">
          แต่ละหัวข้อสรุปมาจากจุดที่ข้อสอบเข้าจริงถามจริง ตัวเลขด้านขวาคือจำนวนข้อที่ออกในข้อสอบ 1 ชุด
          เรียงจากออกบ่อยที่สุด ทุกบทกดฟังครูสอนได้ และมีแบบฝึกท้ายบท
        </p>
      </header>
      <h2 className="section-title">Part I · Grammar</h2>
      {renderList(grammar)}
      <h2 className="section-title">Part II · Reading</h2>
      {renderList(reading)}
    </div>
  )
}
