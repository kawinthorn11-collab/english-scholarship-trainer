import { useState } from 'react'
import SpeakButton from './SpeakButton'

export default function PassagePanel({ passage }) {
  const [collapsed, setCollapsed] = useState(false)

  if (!passage) return null

  return (
    <div className="glass mb-5 overflow-hidden rounded-3xl">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-white/[0.04]"
      >
        <span className="eyebrow">📚 Reading Passage</span>
        <span className="chip">{collapsed ? '▼ Show' : '▲ Hide'}</span>
      </button>
      {!collapsed && (
        <div className="border-t border-white/[0.06] px-5 py-4 text-[15px] leading-relaxed text-purple-100/85" style={{ animation: 'fade-up 0.35s ease both' }}>
          <div className="mb-3 flex justify-end">
            <SpeakButton text={passage} label="Read passage" variant="button" size="sm" />
          </div>
          {passage}
        </div>
      )}
    </div>
  )
}
