import { useSpeech } from '../hooks/useSpeech'

export default function SpeechSettings() {
  const { supported, preferences, setPreferences, speak, stop, voices } = useSpeech()

  return (
    <div className="glass rounded-3xl p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-semibold text-white"><span>🎙️</span>Native Speech Settings</h3>
          <p className="text-xs text-purple-400">
            {supported ? `${voices.length} English voices available` : 'This browser does not support speech synthesis'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={preferences.lang}
            onChange={(event) => setPreferences({ lang: event.target.value })}
            className="rounded-full border border-white/10 bg-ink-2 px-4 py-2 text-sm text-purple-100 focus:border-violet-400 focus:outline-none"
          >
            <option value="auto">Auto</option>
            <option value="en-US">US English</option>
            <option value="en-GB">UK English</option>
          </select>
          <select
            value={preferences.rate}
            onChange={(event) => setPreferences({ rate: Number(event.target.value) })}
            className="rounded-full border border-white/10 bg-ink-2 px-4 py-2 text-sm text-purple-100 focus:border-violet-400 focus:outline-none"
          >
            <option value={0.75}>Slow</option>
            <option value={1}>Normal</option>
          </select>
          <button onClick={() => speak('This is a native English pronunciation practice.')} className="btn btn-primary !px-4 !py-2 text-sm">
            Test voice
          </button>
          <button onClick={stop} className="btn btn-ghost !px-4 !py-2 text-sm">
            Stop
          </button>
        </div>
      </div>
    </div>
  )
}
