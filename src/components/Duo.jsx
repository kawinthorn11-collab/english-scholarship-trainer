import { useState } from 'react'
import Mascot from './Mascot'
import { pokeLines } from '../data/duoLessons'
import { useVoice } from '../hooks/useVoice'
import { speakLine, stopVoice } from '../utils/voice'

/** A mascot you can tap: it squishes and says something out loud. */
export function PokeMascot({ character = 'pig', mood = 'happy', size = 160, className = '', line }) {
  const voice = useVoice()
  const [poke, setPoke] = useState(0)
  const [say, setSay] = useState(0)
  const lines = pokeLines[character] || pokeLines.pig
  const talking = voice.speaker === character

  const onPoke = () => {
    setPoke((n) => n + 1)
    const text = line || lines[say % lines.length]
    setSay((n) => n + 1)
    speakLine(text, { speaker: character, lineId: `poke-${character}` })
  }

  return (
    <button
      type="button"
      onClick={onPoke}
      className={`group relative inline-flex cursor-pointer flex-col items-center rounded-full focus-visible:outline-offset-4 ${className}`}
      aria-label={`แตะเพื่อฟัง${character === 'buffalo' ? 'ครูควาย' : 'ครูหมู'}พูด`}
    >
      <span key={poke} className={poke ? 'mascot-poke-wrap inline-block animate-[m-poke_0.6s_cubic-bezier(0.2,1.6,0.4,1)]' : 'inline-block'}>
        <Mascot character={character} mood={talking ? 'happy' : mood} talking={talking} size={size} className="transition-transform duration-300 group-hover:-translate-y-1" />
      </span>
    </button>
  )
}

/** Pill button that reads a text aloud with a character voice. */
export function ListenButton({ text, speaker = 'pig', label = 'ฟังเสียง', className = '' }) {
  const voice = useVoice()
  const id = `listen-${speaker}-${text.slice(0, 24)}`
  const active = voice.lineId === id

  return (
    <button
      type="button"
      onClick={() => (active ? stopVoice() : speakLine(text, { speaker, lineId: id }))}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 ${active ? 'border-white bg-white text-pink-600 shadow-lg' : 'border-white/25 bg-white/10 text-white hover:bg-white/20'} ${className}`}
    >
      <span className={active ? 'animate-pulse' : ''}>{active ? '⏹' : '🔊'}</span>
      {active ? 'กำลังพูด...' : label}
    </button>
  )
}
