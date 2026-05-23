import { useMemo, useState } from 'react'
import { academyModuleCatalog, academyStats, getFirstAcademyUnitMeta } from '../data/grammarAcademy/index.js'
import { getAcademyProgressStats, getAcademyUnitKey } from '../utils/academyProgress'
import { searchAcademyCatalog } from '../utils/academySearch'

export default function GrammarAcademy({ moduleId, onNavigate, onSelectAcademyModule, onSelectAcademyUnit }) {
  const [query, setQuery] = useState('')
  const { completedCount, studiedCount, attemptedDrills, progressPercent, progress } = getAcademyProgressStats(academyStats.totalUnits)
  const selectedModule = moduleId ? academyModuleCatalog.find((module) => module.id === moduleId) : null
  const firstUnit = getFirstAcademyUnitMeta()

  const searchResults = useMemo(
    () => searchAcademyCatalog(query, academyModuleCatalog),
    [query]
  )

  const startAcademy = () => {
    const last = progress.lastStudiedUnit
    if (last) {
      onSelectAcademyUnit(last.moduleId, last.unitId)
      return
    }
    if (firstUnit) onSelectAcademyUnit(firstUnit.moduleId, firstUnit.id)
  }

  if (selectedModule) {
    return (
      <div className="space-y-6">
        <button onClick={() => onNavigate('academy')} className="text-sm text-purple-400 underline transition hover:text-purple-200">
          Back to Grammar Academy
        </button>

        <header className="rounded-lg border border-purple-700/40 bg-purple-900/20 p-5">
          <p className="text-xs uppercase tracking-wide text-purple-400">Grammar Academy Module {selectedModule.order}</p>
          <h1 className="mt-1 text-3xl font-bold text-purple-100">{selectedModule.title}</h1>
          <p className="text-purple-300">{selectedModule.titleThai}</p>
          <p className="mt-3 text-sm leading-relaxed text-purple-200/80">{selectedModule.descriptionThai}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Badge>{selectedModule.unitCount} units</Badge>
            <Badge>{selectedModule.practiceCount} drills</Badge>
            <Badge>{selectedModule.estimatedStudyTime}</Badge>
            <Badge>{selectedModule.difficulty}</Badge>
            <Badge>{selectedModule.examImportance}</Badge>
          </div>
        </header>

        <div className="grid gap-3 sm:grid-cols-2">
          {selectedModule.units.map((unit) => {
            const key = getAcademyUnitKey(selectedModule.id, unit.id)
            const completed = Boolean(progress.completedUnits[key])
            const studied = Boolean(progress.studiedUnits[key])
            const score = progress.quizScores[key]?.bestScore
            return (
              <button
                key={unit.id}
                onClick={() => onSelectAcademyUnit(selectedModule.id, unit.id)}
                className="rounded-lg border border-purple-700/40 bg-purple-900/10 p-4 text-left transition hover:border-purple-500/60 hover:bg-purple-900/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-purple-100">{unit.title}</p>
                    <p className="text-xs text-purple-400">{unit.titleThai}</p>
                  </div>
                  {completed && <span className="rounded-full bg-green-900/40 px-2 py-0.5 text-xs text-green-300">Done</span>}
                  {studied && !completed && <span className="rounded-full bg-purple-800/50 px-2 py-0.5 text-xs text-purple-200">Studied</span>}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <Badge>{unit.difficulty}</Badge>
                  <Badge>{unit.examImportance}</Badge>
                  {score >= 0 && <Badge>Best {score}%</Badge>}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-purple-400">Grammar Academy</p>
        <h1 className="text-3xl font-bold text-purple-100">คอร์สแกรมมาร์ตัวแม่</h1>
        <p className="text-sm leading-relaxed text-purple-300">
          เรียน grammar แบบไทยเข้าใจง่าย แต่คิดเป็นระบบเหมือนคนทำข้อสอบเก่ง: อ่านโครงสร้างก่อน แปลทีหลัง ตัดช้อยส์ด้วยเหตุผล แล้วเก็บกับดักให้หมด
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-5">
        <Stat label="Modules" value={academyStats.moduleCount} />
        <Stat label="Units" value={academyStats.totalUnits} />
        <Stat label="Completed" value={completedCount} />
        <Stat label="Studied" value={studiedCount} />
        <Stat label="Drills" value={attemptedDrills} />
      </div>

      <div className="rounded-lg border border-purple-700/40 bg-purple-900/20 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-purple-100">Progress {progressPercent}%</p>
            <p className="mt-1 text-xs text-purple-400">ใช้ localStorage บนอุปกรณ์นี้ ไม่ต้องล็อกอินก็เรียนต่อได้</p>
          </div>
          <button onClick={startAcademy} className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-500">
            เริ่มเรียนแบบตัวแม่
          </button>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-purple-950">
          <div className="h-full rounded-full bg-purple-500" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="rounded-lg border border-purple-700/40 bg-purple-900/10 p-4">
        <label className="mb-2 block text-sm font-semibold text-purple-200">Search Academy</label>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="passive, gerund, preposition, question tags, reported speech..."
          className="w-full rounded-lg border border-purple-700/40 bg-purple-950/60 px-4 py-3 text-purple-100 placeholder-purple-500 focus:border-purple-400 focus:outline-none"
        />
      </div>

      {query.trim() && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-purple-200">Search results</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {searchResults.map((unit) => (
              <button
                key={`${unit.moduleId}-${unit.id}`}
                onClick={() => onSelectAcademyUnit(unit.moduleId, unit.id)}
                className="rounded-lg border border-purple-700/40 bg-purple-900/10 p-4 text-left transition hover:border-purple-500/60 hover:bg-purple-900/30"
              >
                <p className="font-semibold text-purple-100">{unit.title}</p>
                <p className="text-xs text-purple-400">{unit.moduleTitle}</p>
              </button>
            ))}
          </div>
          {searchResults.length === 0 && <p className="text-sm text-purple-400">ไม่เจอหัวข้อนี้ ลองคำอื่น เช่น passive, gerund, tense, article</p>}
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-purple-200">Academy Modules</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {academyModuleCatalog.map((module) => {
            const doneInModule = module.units.filter((unit) => progress.completedUnits[getAcademyUnitKey(module.id, unit.id)]).length
            return (
              <button
                key={module.id}
                onClick={() => onSelectAcademyModule(module.id)}
                className="rounded-lg border border-purple-700/40 bg-purple-900/10 p-5 text-left transition hover:border-purple-500/60 hover:bg-purple-900/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-purple-500">Module {module.order}</p>
                    <h3 className="mt-1 font-semibold text-purple-100">{module.title}</h3>
                    <p className="text-xs text-purple-400">{module.titleThai}</p>
                  </div>
                  <span className="rounded-full bg-purple-800/50 px-2 py-0.5 text-xs text-purple-200">{doneInModule}/{module.unitCount}</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-purple-300/80">{module.descriptionThai}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <Badge>{module.unitCount} units</Badge>
                  <Badge>{module.practiceCount} Q</Badge>
                  <Badge>{module.difficulty}</Badge>
                  <Badge>{module.examImportance}</Badge>
                </div>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-purple-700/40 bg-purple-900/20 p-4 text-center">
      <p className="text-xs text-purple-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-purple-100">{value}</p>
    </div>
  )
}

function Badge({ children }) {
  return <span className="rounded-full bg-purple-800/50 px-2 py-0.5 text-purple-200">{children}</span>
}
