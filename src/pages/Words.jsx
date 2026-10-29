import { useState } from 'react'
import Mascot, { SpeechBubble } from '../components/Mascot'
import { Confetti } from '../components/ui'
import { wordDecks } from '../data/wordBank'
import { BOX_INTERVAL_DAYS, getCardStates, gradeCard, isDue } from '../utils/learningStore'
import { speakLine } from '../utils/voice'
import { useVoice } from '../hooks/useVoice'

const SESSION_SIZE = 10

function buildSession(deck, states) {
  const due = deck.words.filter((w) => isDue(states[w.word]))
  // new words first, then the ones the learner struggled with (lower boxes)
  due.sort((a, b) => (states[a.word]?.box ?? -1) - (states[b.word]?.box ?? -1))
  return due.slice(0, SESSION_SIZE)
}

export default function Words() {
  const [states, setStates] = useState(getCardStates)
  const [deckId, setDeckId] = useState(null)
  const [queue, setQueue] = useState([])
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(0)
  const voice = useVoice()

  const deck = wordDecks.find((d) => d.id === deckId)
  const card = queue[0]

  const start = (id) => {
    const d = wordDecks.find((x) => x.id === id)
    setDeckId(id)
    const session = buildSession(d, getCardStates())
    // nothing due yet: allow an early review of the whole deck
    setQueue(session.length ? session : d.words.slice(0, SESSION_SIZE))
    setFlipped(false)
    setDone(0)
  }

  const say = (text, speaker = 'pig') => speakLine(text, { speaker, lineId: `word-${text}` })

  const grade = (remembered) => {
    gradeCard(card.word, remembered)
    setStates(getCardStates())
    setFlipped(false)
    setDone((n) => n + 1)
    // forgotten cards come back once more at the end of this session
    setQueue((q) => (remembered ? q.slice(1) : [...q.slice(1), card]))
  }

  if (deck) {
    if (!card) {
      return (
        <div className="glass space-y-5 rounded-[2rem] p-10 text-center">
          <Confetti count={40} />
          <Mascot character="pig" mood="cheer" size={140} className="mx-auto" />
          <h1 className="text-3xl font-semibold text-white">ทบทวนครบแล้ว!</h1>
          <p className="text-purple-100/80">ทบทวนไป {done} ครั้ง คำที่จำได้จะกลับมาให้ทบทวนในอีก {BOX_INTERVAL_DAYS[1]}–{BOX_INTERVAL_DAYS[5]} วัน ยิ่งจำได้ ยิ่งเว้นนาน</p>
          <button onClick={() => setDeckId(null)} className="btn btn-primary">เลือกชุดคำศัพท์อื่น</button>
        </div>
      )
    }

    return (
      <div className="mx-auto max-w-xl space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => setDeckId(null)} className="text-sm font-semibold text-purple-200 transition hover:text-white">← ชุดคำศัพท์</button>
          <span className="chip">เหลือ {queue.length} ใบ</span>
        </div>

        <button
          onClick={() => setFlipped((f) => !f)}
          className="relative block h-80 w-full [perspective:1200px]"
          aria-label={flipped ? 'พลิกกลับด้านหน้า' : 'พลิกดูความหมาย'}
        >
          <span
            className="relative block h-full w-full rounded-[2rem] transition-transform duration-500 [transform-style:preserve-3d]"
            style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}
          >
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-white/15 bg-gradient-to-br from-violet-600/50 to-pink-500/40 p-6 [backface-visibility:hidden]">
              <span className="text-xs font-semibold uppercase tracking-widest text-pink-100">{deck.title} · {card.type}</span>
              <span className="font-display text-5xl font-semibold text-white">{card.word}</span>
              <span className="text-sm text-pink-50/80">นึกความหมายในใจก่อน แล้วแตะเพื่อพลิก</span>
            </span>
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-white/15 bg-gradient-to-br from-sky-600/50 to-emerald-500/40 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <span className="font-display text-3xl font-semibold text-white">{card.thai}</span>
              <span className="text-center text-lg italic text-sky-50">“{card.example}”</span>
            </span>
          </span>
        </button>

        <div className="flex justify-center gap-3">
          <button onClick={() => say(card.word)} className="btn btn-ghost">🔊 คำศัพท์</button>
          <button onClick={() => say(card.example, 'buffalo')} className="btn btn-ghost">🔊 ประโยคตัวอย่าง</button>
        </div>

        {flipped ? (
          <div className="grid grid-cols-2 gap-3" style={{ animation: 'fade-up 0.3s ease both' }}>
            <button onClick={() => grade(false)} className="btn border border-rose-300/40 bg-rose-500/20 py-4 text-rose-50 hover:bg-rose-500/30">😵 ยังไม่แม่น</button>
            <button onClick={() => grade(true)} className="btn btn-success py-4">😎 จำได้แล้ว</button>
          </div>
        ) : (
          <button onClick={() => setFlipped(true)} className="btn btn-primary w-full py-4">พลิกดูความหมาย</button>
        )}

        <div className="flex items-end gap-3">
          <Mascot character="pig" mood="teach" size={70} talking={voice.speaker === 'pig'} className="shrink-0" />
          <p className="text-sm text-purple-100/75">พูดคำศัพท์ออกเสียงตามทุกครั้ง การพูดออกมาช่วยให้จำได้ดีกว่าอ่านในใจ</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <header className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-400/25 blur-3xl" />
        <div className="relative flex flex-col items-center gap-6 sm:flex-row">
          <Mascot character="pig" mood="wave" size={130} className="shrink-0" />
          <div className="min-w-0 flex-1 space-y-3">
            <p className="eyebrow">🃏 บัตรคำศัพท์ · Spaced repetition</p>
            <h1 className="text-3xl font-semibold text-white">จำศัพท์แบบไม่ต้องท่องซ้ำทั้งวัน</h1>
            <SpeechBubble
              tone="pig"
              side="left"
              text="คำไหนจำได้ จะเว้นไปทบทวนอีก 1, 2, 4, 8 และ 16 วัน คำไหนลืม จะกลับมาเร็วขึ้น เหมือนระบบ Leitner ที่นักเรียนทั่วโลกใช้"
            />
          </div>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {wordDecks.map((d) => {
          const due = d.words.filter((w) => isDue(states[w.word])).length
          const mastered = d.words.filter((w) => (states[w.word]?.box || 0) >= 4).length
          return (
            <button key={d.id} onClick={() => start(d.id)} className="glass glow-card rounded-[1.75rem] p-6 text-left transition hover:-translate-y-1">
              <p className="font-display text-xl font-semibold text-white">{d.title}</p>
              <p className="text-sm text-purple-100/75">{d.titleThai}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-sky-300" style={{ width: `${(mastered / d.words.length) * 100}%` }} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="chip">{d.words.length} คำ</span>
                <span className="chip">จำแม่นแล้ว {mastered}</span>
                <span className={`chip ${due ? '!border-amber-300/50 !bg-amber-400/20 !text-amber-50' : ''}`}>{due ? `ถึงเวลาทบทวน ${due}` : 'ยังไม่ถึงรอบ'}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
