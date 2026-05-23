import { useSpeech } from '../hooks/useSpeech'

export default function SpeechSettings() {
  const { supported, preferences, setPreferences, speak, stop, voices } = useSpeech()

  return (
    <div className="rounded-xl border border-purple-700/40 bg-purple-900/20 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-semibold text-purple-100">Native Speech Settings</h3>
          <p className="text-xs text-purple-400">
            {supported ? `${voices.length} English voices available` : 'This browser does not support speech synthesis'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={preferences.lang}
            onChange={(event) => setPreferences({ lang: event.target.value })}
            className="rounded-lg border border-purple-700/40 bg-purple-950 px-3 py-2 text-sm text-purple-100"
          >
            <option value="auto">Auto</option>
            <option value="en-US">US English</option>
            <option value="en-GB">UK English</option>
          </select>
          <select
            value={preferences.rate}
            onChange={(event) => setPreferences({ rate: Number(event.target.value) })}
            className="rounded-lg border border-purple-700/40 bg-purple-950 px-3 py-2 text-sm text-purple-100"
          >
            <option value={0.75}>Slow</option>
            <option value={1}>Normal</option>
          </select>
          <button onClick={() => speak('This is a native English pronunciation practice.')} className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-purple-500">
            Test voice
          </button>
          <button onClick={stop} className="rounded-lg border border-purple-600 px-3 py-2 text-sm font-semibold text-purple-200 transition hover:bg-purple-900/40">
            Stop
          </button>
        </div>
      </div>
    </div>
  )
}
