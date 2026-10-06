import { Fragment, useEffect, useRef } from 'react'
import SpeakButton from './SpeakButton'

/** เลขบรรทัดที่โจทย์พูดถึง เช่น "in line 9" หรือ "(lines 7–8)" */
function linesMentioned(text) {
  const lines = new Set()
  const re = /lines?\s+(\d+)(?:\s*[–-]\s*(\d+))?/gi
  let match
  while ((match = re.exec(text || '')) !== null) {
    const from = Number(match[1])
    const to = Number(match[2] || match[1])
    for (let line = from; line <= to; line += 1) lines.add(line)
  }
  return lines
}

function passageSpeechText(passage) {
  if (passage.text) return passage.text
  if (passage.lines) return passage.lines.join(' ')
  return passage.paragraphs.join(' ')
}

function ClozeText({ set, passage, question, answers, reveal, onJump }) {
  const paragraphs = passage.text.split(/\n+/)
  return paragraphs.map((paragraph, pIndex) => (
    <p key={pIndex}>
      {paragraph.split(/(__\(\d+\)__)/).map((part, index) => {
        const match = part.match(/^__\((\d+)\)__$/)
        if (!match) return <Fragment key={index}>{part}</Fragment>
        const n = Number(match[1])
        const item = set.questions.find((entry) => entry.n === n)
        const chosen = answers[n]
        const shown = chosen !== undefined ? item.choices[chosen] : null
        const state = reveal(n) && chosen !== undefined ? (chosen === item.answer ? ' is-right' : ' is-wrong') : ''
        return (
          <button
            key={index}
            type="button"
            className={`blank${n === question.n ? ' is-current' : ''}${shown ? ' is-filled' : ''}${state}`}
            onClick={() => onJump?.(n)}
            aria-label={`ไปข้อ ${n}`}
          >
            <span className="blank-num">{n}</span>
            {shown && <span className="blank-word">{shown}</span>}
          </button>
        )
      })}
    </p>
  ))
}

function LineText({ passage, question, revealed }) {
  const asked = linesMentioned(question.q)
  const evidence = new Set(revealed ? question.lines || [] : [])
  return (
    <ol className="lines">
      {passage.lines.map((line, index) => {
        const number = index + 1
        // บรรทัดยาวอาจตัดขึ้นบรรทัดใหม่บนจอเล็ก จึงใส่เลขทุกบรรทัดและแรเงาสลับกันให้เห็นว่าเป็นบรรทัดเดียวกัน
        const classes = [asked.has(number) && 'is-asked', evidence.has(number) && 'is-evidence'].filter(Boolean).join(' ')
        return (
          <li key={number} className={classes || undefined}>
            <span className={`line-no${number % 5 === 0 ? ' is-five' : ''}`}>{number}</span>
            <span>{line}</span>
          </li>
        )
      })}
    </ol>
  )
}

export default function Passage({ set, question, answers, reveal, onJump }) {
  const passage = set.passages[question.passage]
  const isGrammar = passage.part === 'grammar'
  const bodyRef = useRef(null)

  // เลื่อนบทความให้เห็นช่องว่างหรือบรรทัดที่โจทย์ถาม
  useEffect(() => {
    const body = bodyRef.current
    const target = body?.querySelector('.is-current, .is-asked')
    if (!body) return
    if (!target) {
      body.scrollTop = 0
      return
    }
    const top = target.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop
    body.scrollTo({ top: Math.max(0, top - body.clientHeight / 3), behavior: 'smooth' })
  }, [question.n])
  const count = set.questions.filter((item) => item.passage === question.passage)
  const first = count[0]?.n
  const last = count[count.length - 1]?.n

  return (
    <article className="passage">
      <header className="passage-head">
        <div>
          <p className="eyebrow">
            {isGrammar ? 'Part I · Grammar' : 'Part II · Reading'} · ข้อ {first}–{last}
          </p>
          <h2 className="passage-title">{passage.title}</h2>
          {passage.titleTh && <p className="muted small">{passage.titleTh}</p>}
        </div>
        <SpeakButton id={`passage-${set.id}-${question.passage}`} text={passageSpeechText(passage).replace(/__\((\d+)\)__/g, ' blank ')} english label="ฟังบทความ" size="sm" />
      </header>
      <div className="passage-body" ref={bodyRef}>
        {isGrammar && <ClozeText set={set} passage={passage} question={question} answers={answers} reveal={reveal} onJump={onJump} />}
        {!isGrammar && passage.lines && <LineText passage={passage} question={question} revealed={reveal(question.n)} />}
        {!isGrammar && passage.paragraphs && passage.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
    </article>
  )
}
