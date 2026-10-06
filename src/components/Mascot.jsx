import { useId } from 'react'
import { useTypewriter } from '../hooks/useMotion'

/**
 * The two cartoon teachers.
 *   character: 'pig' (ครูหมูหวาน) | 'buffalo' (ครูควายขยัน)
 *   mood: happy | wave | teach | think | cheer | sleepy | fire | oops
 *   talking: animate the mouth (e.g. while a voice line plays)
 */
export default function Mascot({ character = 'pig', mood = 'happy', talking = false, size = 160, className = '', title }) {
  const rawId = useId()
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, '')
  const label = title || (character === 'buffalo' ? 'ครูควายขยัน' : 'ครูหมูหวาน')
  const Character = character === 'buffalo' ? Buffalo : Pig

  return (
    <div
      className={`mascot mascot--${mood} ${talking ? 'mascot--talking' : ''} inline-block select-none ${className}`}
      style={{ width: size }}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 200 220" width="100%" height="100%">
        <ellipse className="m-shadow" cx="100" cy="212" rx="50" ry="7" fill="#000" opacity="0.3" />
        {mood === 'fire' && <Flame id={id} />}
        <Character id={id} mood={mood} talking={talking} />
        <MoodExtras mood={mood} />
      </svg>
    </div>
  )
}

function Flame({ id }) {
  return (
    <g>
      <defs>
        <radialGradient id={`flame-${id}`} cx="50%" cy="80%" r="70%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="45%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        className="m-flame"
        d="M100 0 C 130 36 172 58 174 120 C 176 182 142 214 100 214 C 58 214 24 182 26 120 C 28 76 56 66 64 34 C 74 58 84 62 88 54 C 92 36 92 18 100 0 Z"
        fill={`url(#flame-${id})`}
        opacity="0.9"
      />
    </g>
  )
}

function Eyes({ mood, lx, rx, y, lidColor, rWhite = 13, ryWhite = 15, pupil = 8 }) {
  if (mood === 'cheer') {
    return (
      <g fill="none" stroke="#2d1b3d" strokeWidth="5" strokeLinecap="round">
        <path d={`M${lx - 10} ${y + 3} q10 -13 20 0`} />
        <path d={`M${rx - 10} ${y + 3} q10 -13 20 0`} />
      </g>
    )
  }
  return (
    <g>
      <ellipse cx={lx} cy={y} rx={rWhite} ry={ryWhite} fill="#fff" />
      <ellipse cx={rx} cy={y} rx={rWhite} ry={ryWhite} fill="#fff" />
      <g className="m-pupils">
        <circle cx={lx + 1} cy={y + 2} r={pupil} fill="#2d1b3d" />
        <circle cx={rx + 1} cy={y + 2} r={pupil} fill="#2d1b3d" />
        <circle cx={lx + 4} cy={y - 2} r={pupil * 0.38} fill="#fff" />
        <circle cx={rx + 4} cy={y - 2} r={pupil * 0.38} fill="#fff" />
        <circle cx={lx - 2} cy={y + 5} r={pupil * 0.18} fill="#fff" />
        <circle cx={rx - 2} cy={y + 5} r={pupil * 0.18} fill="#fff" />
      </g>
      <ellipse className="m-lid" cx={lx} cy={y} rx={rWhite + 2} ry={ryWhite + 2} fill={lidColor} />
      <ellipse className="m-lid" cx={rx} cy={y} rx={rWhite + 2} ry={ryWhite + 2} fill={lidColor} />
    </g>
  )
}

function Mouth({ mood, talking, y, color, inner }) {
  if (talking) {
    return (
      <g className="m-mouth-talk">
        <ellipse cx="100" cy={y + 2} rx="9" ry="7" fill={inner} />
        <ellipse cx="100" cy={y + 6} rx="5" ry="2.6" fill="#ff6b8b" />
      </g>
    )
  }
  if (mood === 'cheer' || mood === 'fire' || mood === 'wave') {
    return (
      <g>
        <path d={`M86 ${y - 2} Q100 ${y + 16} 114 ${y - 2} Z`} fill={inner} />
        <path d={`M93 ${y + 7} Q100 ${y + 12} 107 ${y + 7}`} fill="#ff6b8b" />
      </g>
    )
  }
  if (mood === 'oops' || mood === 'think') {
    return <path d={`M92 ${y + 3} q8 -5 16 0`} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
  }
  if (mood === 'sleepy') {
    return <ellipse cx="100" cy={y + 2} rx="4" ry="3" fill={inner} />
  }
  return <path d={`M88 ${y - 1} Q100 ${y + 10} 112 ${y - 1}`} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
}

function Brows({ mood, lx, rx, y, color }) {
  if (mood !== 'think' && mood !== 'oops' && mood !== 'fire') return null
  const tilt = mood === 'oops' ? 1 : -1
  return (
    <g stroke={color} strokeWidth="4" strokeLinecap="round" className="m-brows">
      <path d={`M${lx - 9} ${y + 3 * tilt} L${lx + 8} ${y - 3 * tilt}`} />
      <path d={`M${rx - 8} ${y - 3 * tilt} L${rx + 9} ${y + 3 * tilt}`} />
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  ครูหมูหวาน                                                          */
/* ------------------------------------------------------------------ */
function Pig({ id, mood, talking }) {
  const body = `pig-body-${id}`
  const head = `pig-head-${id}`
  return (
    <g className="m-body">
      <defs>
        <radialGradient id={body} cx="45%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#ffc6d6" />
          <stop offset="100%" stopColor="#ff7aa5" />
        </radialGradient>
        <radialGradient id={head} cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffd3df" />
          <stop offset="70%" stopColor="#ff9dbb" />
          <stop offset="100%" stopColor="#ff7aa5" />
        </radialGradient>
      </defs>

      {/* curly tail */}
      <path className="m-tail" d="M148 168 c 16 -6 22 8 12 13 c -9 4 -13 -9 -1 -13 c 8 -3 14 2 15 6" fill="none" stroke="#ff7aa5" strokeWidth="5" strokeLinecap="round" />

      {/* legs */}
      <g className="m-legs">
        <rect x="74" y="186" width="18" height="22" rx="8" fill="#ff8fb3" />
        <rect x="108" y="186" width="18" height="22" rx="8" fill="#ff8fb3" />
        <rect x="74" y="200" width="18" height="8" rx="4" fill="#c2185b" />
        <rect x="108" y="200" width="18" height="8" rx="4" fill="#c2185b" />
      </g>

      {/* body + overalls */}
      <ellipse cx="100" cy="160" rx="52" ry="44" fill={`url(#${body})`} />
      <path d="M62 170 Q100 214 138 170 L132 158 L68 158 Z" fill="#38bdf8" />
      <rect x="80" y="150" width="40" height="22" rx="6" fill="#38bdf8" />
      <circle cx="86" cy="156" r="3" fill="#fde047" />
      <circle cx="114" cy="156" r="3" fill="#fde047" />
      <path d="M93 170 h14" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

      {/* arms */}
      <g className="m-arm-l">
        <ellipse cx="56" cy="160" rx="11" ry="19" transform="rotate(28 56 160)" fill="#ff8fb3" />
      </g>
      <g className="m-arm-r">
        <ellipse cx="144" cy="160" rx="11" ry="19" transform="rotate(-28 144 160)" fill="#ff8fb3" />
        {mood === 'teach' && (
          <g>
            <rect x="148" y="168" width="8" height="40" rx="2" transform="rotate(-20 152 188)" fill="#fde047" />
            <path d="M159 205 l-2 10 l-6 -8 Z" fill="#fcd34d" transform="rotate(-20 152 188)" />
          </g>
        )}
      </g>

      <g className="m-head">
        {/* ears */}
        <g className="m-ear-l">
          <path d="M50 66 Q34 22 80 42 Z" fill="#ff8fb3" />
          <path d="M55 60 Q46 34 74 46 Z" fill="#ff5c8d" />
        </g>
        <g className="m-ear-r">
          <path d="M150 66 Q166 22 120 42 Z" fill="#ff8fb3" />
          <path d="M145 60 Q154 34 126 46 Z" fill="#ff5c8d" />
          {/* bow */}
          <g transform="translate(140 40)">
            <path d="M0 0 L-14 -9 L-14 9 Z" fill="#fde047" />
            <path d="M0 0 L14 -9 L14 9 Z" fill="#fde047" />
            <circle r="4.5" fill="#f59e0b" />
          </g>
        </g>

        <ellipse cx="100" cy="94" rx="60" ry="53" fill={`url(#${head})`} />
        {/* hair tuft */}
        <path d="M92 44 q4 -12 10 -2 q4 -12 10 0" fill="none" stroke="#ff7aa5" strokeWidth="4" strokeLinecap="round" />

        <Eyes mood={mood} lx={76} rx={124} y={84} lidColor="#ffb1c8" />
        <Brows mood={mood} lx={76} rx={124} y={64} color="#c2185b" />

        <ellipse cx="60" cy="110" rx="11" ry="6.5" fill="#ff4d8d" opacity="0.4" />
        <ellipse cx="140" cy="110" rx="11" ry="6.5" fill="#ff4d8d" opacity="0.4" />

        {/* snout */}
        <g className="m-snout">
          <ellipse cx="100" cy="113" rx="25" ry="17" fill="#ff7aa5" stroke="#ff5c8d" strokeWidth="2" />
          <ellipse cx="91" cy="113" rx="4.5" ry="7" fill="#a3123f" />
          <ellipse cx="109" cy="113" rx="4.5" ry="7" fill="#a3123f" />
          <ellipse cx="94" cy="105" rx="7" ry="3" fill="#fff" opacity="0.35" />
        </g>

        <Mouth mood={mood} talking={talking} y={136} color="#a3123f" inner="#7a0a33" />
      </g>
    </g>
  )
}

/* ------------------------------------------------------------------ */
/*  ครูควายขยัน                                                         */
/* ------------------------------------------------------------------ */
function Buffalo({ id, mood, talking }) {
  const body = `buf-body-${id}`
  const head = `buf-head-${id}`
  return (
    <g className="m-body">
      <defs>
        <radialGradient id={body} cx="45%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#a9b7e8" />
          <stop offset="100%" stopColor="#5b67a8" />
        </radialGradient>
        <radialGradient id={head} cx="40%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#b8c4f0" />
          <stop offset="75%" stopColor="#7c8acb" />
          <stop offset="100%" stopColor="#5b67a8" />
        </radialGradient>
      </defs>

      {/* tail */}
      <g className="m-tail">
        <path d="M150 168 Q168 176 166 194" fill="none" stroke="#5b67a8" strokeWidth="5" strokeLinecap="round" />
        <path d="M160 192 q6 12 12 0 q-6 6 -12 0" fill="#3f4a85" />
      </g>

      {/* legs */}
      <g className="m-legs">
        <rect x="72" y="184" width="20" height="24" rx="8" fill="#6c79bb" />
        <rect x="108" y="184" width="20" height="24" rx="8" fill="#6c79bb" />
        <rect x="72" y="200" width="20" height="8" rx="4" fill="#2e3566" />
        <rect x="108" y="200" width="20" height="8" rx="4" fill="#2e3566" />
      </g>

      {/* body */}
      <ellipse cx="100" cy="160" rx="56" ry="45" fill={`url(#${body})`} />
      <ellipse cx="100" cy="170" rx="34" ry="26" fill="#c7d0f3" />
      {/* necktie */}
      <g className="m-tie">
        <path d="M92 132 L108 132 L104 141 L96 141 Z" fill="#ef4444" />
        <path d="M96 141 L104 141 L110 178 L100 190 L90 178 Z" fill="#f43f5e" />
        <path d="M95 152 L107 160 M93 168 L109 176" stroke="#fde047" strokeWidth="2.5" />
      </g>

      {/* arms */}
      <g className="m-arm-l">
        <ellipse cx="54" cy="160" rx="12" ry="20" transform="rotate(28 54 160)" fill="#6c79bb" />
      </g>
      <g className="m-arm-r">
        <ellipse cx="146" cy="160" rx="12" ry="20" transform="rotate(-28 146 160)" fill="#6c79bb" />
        {mood === 'teach' && (
          <g>
            <line x1="152" y1="176" x2="176" y2="216" stroke="#fcd34d" strokeWidth="4" strokeLinecap="round" />
            <circle cx="177" cy="218" r="4.5" fill="#fb7185" />
          </g>
        )}
      </g>

      <g className="m-head">
        {/* horns */}
        <path d="M54 66 C 22 66 8 40 24 16 C 28 38 40 50 66 52 Z" fill="#fbecc9" stroke="#e0c58e" strokeWidth="2" />
        <path d="M146 66 C 178 66 192 40 176 16 C 172 38 160 50 134 52 Z" fill="#fbecc9" stroke="#e0c58e" strokeWidth="2" />

        {/* ears */}
        <g className="m-ear-l">
          <ellipse cx="44" cy="86" rx="17" ry="9" transform="rotate(-22 44 86)" fill="#6c79bb" />
          <ellipse cx="46" cy="86" rx="10" ry="4.5" transform="rotate(-22 46 86)" fill="#f9a8d4" />
        </g>
        <g className="m-ear-r">
          <ellipse cx="156" cy="86" rx="17" ry="9" transform="rotate(22 156 86)" fill="#6c79bb" />
          <ellipse cx="154" cy="86" rx="10" ry="4.5" transform="rotate(22 154 86)" fill="#f9a8d4" />
        </g>

        <ellipse cx="100" cy="92" rx="54" ry="50" fill={`url(#${head})`} />

        {/* graduation cap */}
        <g>
          <path d="M76 44 L76 56 Q100 66 124 56 L124 44 Z" fill="#1e1b4b" />
          <path d="M100 26 L142 40 L100 54 L58 40 Z" fill="#312e81" stroke="#4f46e5" strokeWidth="1.5" />
          <g className="m-tassel">
            <path d="M100 39 L132 46 L132 64" fill="none" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
            <path d="M128 62 L136 62 L134 74 L130 74 Z" fill="#fde047" />
          </g>
          <circle cx="100" cy="39" r="3.2" fill="#fde047" />
        </g>

        <Eyes mood={mood} lx={78} rx={122} y={84} lidColor="#8e9bd6" rWhite={12} ryWhite={13} pupil={7.5} />
        {mood !== 'cheer' && (
          <g stroke="#2e3566" strokeWidth="4.5" strokeLinecap="round" className="m-brows-base">
            <path d={mood === 'oops' ? 'M68 66 L86 70' : 'M68 68 L86 65'} />
            <path d={mood === 'oops' ? 'M132 66 L114 70' : 'M132 68 L114 65'} />
          </g>
        )}

        <ellipse cx="62" cy="106" rx="9" ry="5" fill="#f472b6" opacity="0.45" />
        <ellipse cx="138" cy="106" rx="9" ry="5" fill="#f472b6" opacity="0.45" />

        {/* muzzle */}
        <ellipse cx="100" cy="118" rx="34" ry="23" fill="#d3daf6" />
        <ellipse cx="87" cy="113" rx="5" ry="4" fill="#2e3566" />
        <ellipse cx="113" cy="113" rx="5" ry="4" fill="#2e3566" />

        <Mouth mood={mood} talking={talking} y={128} color="#2e3566" inner="#3b1440" />

        {/* little bird friend on the horn */}
        <g className="m-bird">
          <ellipse cx="26" cy="12" rx="8" ry="6.5" fill="#fde047" />
          <circle cx="31" cy="7" r="5" fill="#fde047" />
          <circle cx="32.5" cy="6" r="1.2" fill="#1f2937" />
          <path d="M36 7 l5 1.5 l-5 1.5 Z" fill="#fb923c" />
          <path d="M20 12 q-6 -2 -8 3 q5 1 8 -1 Z" fill="#facc15" />
        </g>
      </g>
    </g>
  )
}

function MoodExtras({ mood }) {
  if (mood === 'sleepy') {
    return (
      <g fill="#c4b5fd" fontFamily="Kanit, sans-serif" fontWeight="700">
        <text className="m-float-icon" x="152" y="44" fontSize="20">z</text>
        <text className="m-float-icon" x="166" y="30" fontSize="16">z</text>
        <text className="m-float-icon" x="178" y="18" fontSize="12">z</text>
      </g>
    )
  }
  if (mood === 'think') {
    return (
      <g fill="#fde047" fontFamily="Kanit, sans-serif" fontWeight="700">
        <text className="m-float-icon" x="162" y="50" fontSize="30">?</text>
        <text className="m-float-icon" x="22" y="58" fontSize="20">?</text>
      </g>
    )
  }
  if (mood === 'oops') {
    return <path className="m-float-icon" d="M166 70 q-7 11 0 15 q7 -4 0 -15 Z" fill="#7dd3fc" />
  }
  if (mood === 'cheer' || mood === 'fire' || mood === 'wave') {
    return (
      <g>
        <path className="m-sparkle" d="M20 60 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z" fill="#fde047" />
        <path className="m-sparkle" d="M178 72 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" fill="#67e8f9" />
        <path className="m-sparkle" d="M170 160 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" fill="#f9a8d4" />
        {mood === 'cheer' && <text className="m-float-icon" x="8" y="150" fontSize="18">❤️</text>}
      </g>
    )
  }
  return null
}

/** Speech bubble with a typewriter effect, pointing at the mascot. */
export function SpeechBubble({ text, side = 'left', className = '', tone = 'default', children }) {
  const { shown, done } = useTypewriter(text)
  const tones = {
    default: 'border-white/15 bg-white/[0.09]',
    pig: 'border-pink-300/30 bg-gradient-to-br from-pink-500/20 to-orange-400/10',
    buffalo: 'border-sky-300/30 bg-gradient-to-br from-indigo-500/25 to-sky-400/10',
  }
  const tailColor = tone === 'pig' ? 'rgb(244 114 182 / 0.45)' : tone === 'buffalo' ? 'rgb(56 189 248 / 0.45)' : 'rgb(255 255 255 / 0.18)'
  const tail = side === 'left'
    ? { className: 'left-[-10px] top-7 border-r-[10px] border-y-[9px] border-y-transparent', style: { borderRightColor: tailColor } }
    : side === 'bottom'
      ? { className: 'left-10 bottom-[-10px] border-t-[10px] border-x-[9px] border-x-transparent', style: { borderTopColor: tailColor } }
      : { className: 'right-[-10px] top-7 border-l-[10px] border-y-[9px] border-y-transparent', style: { borderLeftColor: tailColor } }

  return (
    <div className={`relative rounded-3xl border p-4 backdrop-blur-xl sm:p-5 ${tones[tone] || tones.default} ${className}`}>
      <span aria-hidden className={`absolute h-0 w-0 ${tail.className}`} style={tail.style} />
      <p className="sr-only">{text}</p>
      <p aria-hidden className={`min-h-[1.6em] text-[16px] leading-relaxed text-white ${done ? '' : 'typing-caret'}`}>
        {shown}
      </p>
      {children}
    </div>
  )
}
