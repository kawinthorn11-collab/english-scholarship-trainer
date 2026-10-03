import { useId } from 'react'
import { useTypewriter } from '../hooks/useMotion'

/**
 * ครูฮูก (Professor Owl) — the animated cartoon teacher used across the app.
 *
 * moods: happy | wave | teach | think | cheer | sleepy | fire | oops
 */
export default function Mascot({ mood = 'happy', size = 160, className = '', title = 'ครูฮูก' }) {
  const rawId = useId()
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '')
  const bodyGrad = `owl-body-${id}`
  const bellyGrad = `owl-belly-${id}`
  const flameGrad = `owl-flame-${id}`

  return (
    <div className={`mascot mascot--${mood} inline-block select-none ${className}`} style={{ width: size }} role="img" aria-label={title}>
      <svg viewBox="0 0 200 230" width="100%" height="100%">
        <defs>
          <linearGradient id={bodyGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="55%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#5b21b6" />
          </linearGradient>
          <radialGradient id={bellyGrad} cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ddd6fe" />
          </radialGradient>
          <radialGradient id={flameGrad} cx="50%" cy="80%" r="70%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="45%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ground shadow */}
        <ellipse className="m-shadow" cx="100" cy="222" rx="46" ry="7" fill="#000" opacity="0.35" />

        {mood === 'fire' && (
          <path
            className="m-flame"
            d="M100 6 C 128 40 168 62 170 122 C 172 180 140 214 100 214 C 60 214 28 180 30 122 C 32 80 58 70 66 40 C 76 62 84 66 88 58 C 92 40 92 24 100 6 Z"
            fill={`url(#${flameGrad})`}
            opacity="0.9"
          />
        )}

        <g className="m-body">
          {/* wings (behind body) */}
          <path className="m-wing-l" d="M54 122 C 26 136 22 178 48 196 C 54 172 58 146 54 122 Z" fill="#5b21b6" />
          <g className="m-wing-r">
            <path d="M146 122 C 174 136 178 178 152 196 C 146 172 142 146 146 122 Z" fill="#5b21b6" />
            {mood === 'teach' && (
              <g>
                <line x1="160" y1="190" x2="176" y2="232" stroke="#fcd34d" strokeWidth="4" strokeLinecap="round" />
                <circle cx="177" cy="234" r="4" fill="#f472b6" />
              </g>
            )}
          </g>

          {/* ear tufts */}
          <path d="M60 74 L48 30 L86 58 Z" fill="#6d28d9" />
          <path d="M140 74 L152 30 L114 58 Z" fill="#6d28d9" />

          {/* body */}
          <path d="M100 46 C 150 46 162 94 160 140 C 158 190 132 210 100 210 C 68 210 42 190 40 140 C 38 94 50 46 100 46 Z" fill={`url(#${bodyGrad})`} />

          {/* belly + feathers */}
          <ellipse cx="100" cy="162" rx="38" ry="40" fill={`url(#${bellyGrad})`} />
          <g fill="none" stroke="#c4b5fd" strokeWidth="2.4" strokeLinecap="round">
            <path d="M80 150 q6 7 12 0" />
            <path d="M96 150 q6 7 12 0" />
            <path d="M112 150 q6 7 12 0" />
            <path d="M88 166 q6 7 12 0" />
            <path d="M104 166 q6 7 12 0" />
            <path d="M96 182 q6 7 12 0" />
          </g>

          {/* face discs */}
          <circle cx="74" cy="104" r="28" fill="#ede9fe" />
          <circle cx="126" cy="104" r="28" fill="#ede9fe" />

          {/* eyes */}
          <circle cx="74" cy="104" r="19" fill="#fff" />
          <circle cx="126" cy="104" r="19" fill="#fff" />
          {mood === 'cheer' ? (
            <g fill="none" stroke="#1e1b4b" strokeWidth="5" strokeLinecap="round">
              <path d="M63 108 q11 -14 22 0" />
              <path d="M115 108 q11 -14 22 0" />
            </g>
          ) : (
            <g className="m-pupils">
              <circle cx="74" cy="105" r="10.5" fill="#1e1b4b" />
              <circle cx="126" cy="105" r="10.5" fill="#1e1b4b" />
              <circle cx="78" cy="101" r="3.6" fill="#fff" />
              <circle cx="130" cy="101" r="3.6" fill="#fff" />
            </g>
          )}
          {mood !== 'cheer' && (
            <g>
              <ellipse className="m-lid" cx="74" cy="104" rx="21" ry="21" fill="#8b5cf6" />
              <ellipse className="m-lid" cx="126" cy="104" rx="21" ry="21" fill="#8b5cf6" />
            </g>
          )}

          {/* glasses */}
          <g fill="none" stroke="#312e81" strokeWidth="4">
            <circle cx="74" cy="104" r="23" />
            <circle cx="126" cy="104" r="23" />
            <path d="M97 101 q3 -5 6 0" strokeLinecap="round" />
          </g>

          {/* beak */}
          <path d="M92 124 L108 124 L100 138 Z" fill="#fb923c" stroke="#ea580c" strokeWidth="2" strokeLinejoin="round" />

          {/* cheeks */}
          <ellipse cx="54" cy="130" rx="8" ry="4.5" fill="#f472b6" opacity="0.6" />
          <ellipse cx="146" cy="130" rx="8" ry="4.5" fill="#f472b6" opacity="0.6" />

          {/* feet */}
          <g fill="#fb923c">
            <ellipse cx="86" cy="210" rx="10" ry="5" />
            <ellipse cx="114" cy="210" rx="10" ry="5" />
          </g>

          {/* graduation cap */}
          <g>
            <path d="M70 40 L70 56 Q100 68 130 56 L130 40 Z" fill="#312e81" />
            <path d="M100 18 L154 36 L100 54 L46 36 Z" fill="#1e1b4b" />
            <path d="M100 18 L154 36 L100 54 L46 36 Z" fill="none" stroke="#4338ca" strokeWidth="1.5" />
            <g className="m-tassel">
              <path d="M100 34 L140 42 L140 62" fill="none" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
              <path d="M135 60 L145 60 L143 74 L137 74 Z" fill="#facc15" />
            </g>
            <circle cx="100" cy="34" r="3.5" fill="#facc15" />
          </g>

          {mood === 'oops' && <path d="M160 82 q-6 10 0 14 q6 -4 0 -14 Z" fill="#7dd3fc" />}
        </g>

        {/* mood extras */}
        {mood === 'sleepy' && (
          <g fill="#c4b5fd" fontFamily="Kanit, sans-serif" fontWeight="700">
            <text className="m-float-icon" x="150" y="40" fontSize="20">z</text>
            <text className="m-float-icon" x="164" y="26" fontSize="16">z</text>
            <text className="m-float-icon" x="176" y="14" fontSize="12">z</text>
          </g>
        )}
        {mood === 'think' && (
          <g fill="#fcd34d" fontFamily="Kanit, sans-serif" fontWeight="700">
            <text className="m-float-icon" x="160" y="48" fontSize="30">?</text>
            <text className="m-float-icon" x="22" y="56" fontSize="20">?</text>
          </g>
        )}
        {(mood === 'cheer' || mood === 'fire') && (
          <g fill="#fde047">
            <path className="m-sparkle" d="M22 60 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z" />
            <path className="m-sparkle" d="M176 70 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" />
            <path className="m-sparkle" d="M168 160 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" fill="#f9a8d4" />
          </g>
        )}
      </svg>
    </div>
  )
}

/** Speech bubble with a typewriter effect, pointing at the mascot. */
export function SpeechBubble({ text, side = 'left', className = '', children }) {
  const { shown, done } = useTypewriter(text)
  const tail = side === 'left'
    ? 'left-[-9px] top-7 border-r-[10px] border-y-[9px] border-y-transparent border-r-white/10'
    : side === 'bottom'
      ? 'left-10 bottom-[-10px] border-t-[10px] border-x-[9px] border-x-transparent border-t-white/10'
      : 'right-[-9px] top-7 border-l-[10px] border-y-[9px] border-y-transparent border-l-white/10'

  return (
    <div className={`relative rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl sm:p-5 ${className}`}>
      <span aria-hidden className={`absolute h-0 w-0 ${tail}`} />
      <p className="sr-only">{text}</p>
      <p aria-hidden className={`min-h-[3em] text-[15px] leading-relaxed text-purple-50 ${done ? '' : 'typing-caret'}`}>
        {shown}
      </p>
      {children}
    </div>
  )
}
