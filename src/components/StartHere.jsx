import { PokeMascot } from './Duo'
import { getStartSteps } from '../utils/startSteps'

/**
 * First-visit guide: three numbered steps, the next one highlighted with a
 * single big button, so a newcomer always knows what to press.
 */
export default function StartHere({ onNavigate, onOpenTest, onDismiss }) {
  const steps = getStartSteps()
  const next = steps.find((s) => !s.done)
  const doneCount = steps.filter((s) => s.done).length
  const small = typeof window !== 'undefined' && window.innerWidth < 640

  const go = (step) => {
    if (step.testId) onOpenTest?.(step.testId)
    else onNavigate(step.target)
  }

  return (
    <section aria-labelledby="start-here-title" className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-gradient-to-br from-pink-500/25 via-violet-500/20 to-sky-400/20 p-5 shadow-[0_30px_70px_-35px_rgba(255,61,139,0.7)] sm:p-8">
      <div aria-hidden className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-pink-500/30 blur-3xl" />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <div className="flex shrink-0 items-end justify-center -space-x-4">
          <PokeMascot character="pig" mood="wave" size={small ? 72 : 110} />
          <PokeMascot character="buffalo" mood="happy" size={small ? 76 : 116} />
        </div>

        <div className="min-w-0 flex-1 space-y-5">
          <div className="text-center md:text-left">
            <p className="eyebrow justify-center md:justify-start">👋 มาครั้งแรก? เริ่มตรงนี้</p>
            <h2 id="start-here-title" className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              ทำตาม 3 ขั้นนี้ก็พอ
            </h2>
            <p className="mt-1 text-sm text-purple-200/80">ทำไปแล้ว {doneCount} จาก 3 ขั้น · ไม่ต้องสมัคร ระบบจำให้เอง</p>
          </div>

          <ol className="space-y-3">
            {steps.map((step, i) => {
              const isNext = step === next
              return (
                <li key={step.key}>
                  <button
                    onClick={() => go(step)}
                    className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition hover:-translate-y-0.5 ${isNext
                      ? 'border-white/40 bg-white/15 shadow-lg'
                      : step.done
                        ? 'border-emerald-300/30 bg-emerald-500/10'
                        : 'border-white/10 bg-white/[0.04] opacity-80'
                    }`}
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ${step.done ? 'bg-emerald-400 text-emerald-950' : isNext ? 'bg-white text-pink-600' : 'bg-white/15 text-white'}`}>
                      {step.done ? '✓' : i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-white">{step.icon} {step.title}</span>
                      <span className="block text-sm text-purple-100/80">{step.desc}</span>
                    </span>
                    {isNext && <span aria-hidden className="text-xl text-white">→</span>}
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            {next ? (
              <button onClick={() => go(next)} className="btn btn-primary px-7 py-4 text-lg">
                ▶ {next.cta}
              </button>
            ) : (
              <p className="font-semibold text-emerald-200">🎉 ครบ 3 ขั้นแล้ว เก่งมาก! ต่อจากนี้เลือกฝึกจากเมนูด้านล่างได้เลย</p>
            )}
            <button onClick={onDismiss} className="text-sm font-semibold text-purple-200/80 underline-offset-4 hover:text-white hover:underline">
              {next ? 'ข้ามไปก่อน ฉันเลือกเอง' : 'ซ่อนกล่องนี้'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
