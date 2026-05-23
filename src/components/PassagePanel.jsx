import { useState } from 'react'

export default function PassagePanel({ passage }) {
  const [collapsed, setCollapsed] = useState(false)

  if (!passage) return null

  return (
    <div className="mb-4 rounded-xl border border-purple-700/30 bg-purple-950/40 overflow-hidden">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-purple-900/30"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-purple-400">
          📖 Reading Passage
        </span>
        <span className="text-xs text-purple-400">
          {collapsed ? '▼ Show' : '▲ Hide'}
        </span>
      </button>
      {!collapsed && (
        <div className="border-t border-purple-700/20 px-4 py-3 text-sm leading-relaxed text-purple-200/80">
          {passage}
        </div>
      )}
    </div>
  )
}
