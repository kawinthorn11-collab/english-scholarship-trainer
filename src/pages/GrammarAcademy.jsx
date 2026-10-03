import { useMemo, useState } from 'react'
import { academyModuleCatalog, academyStats, getFirstAcademyUnitMeta } from '../data/grammarAcademy/index.js'
import { getAcademyProgressStats, getAcademyUnitKey } from '../utils/academyProgress'
import { searchAcademyCatalog } from '../utils/academySearch'
import { PageHeader, SectionTitle, StatTile } from '../components/ui'

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
      <div className="space-y-8">
        <button onClick={() => onNavigate('academy')} className="text-sm font-semibold text-purple-300 transition hover:text-white">
          Back to Grammar Academy
        </button>

        <PageHeader
          eyebrow={`Grammar Academy · Module ${selectedModule.order}`}
          icon="🎓"
          title={selectedModule.title}
          subtitle={<><span className="block text-purple-100">{selectedModule.titleThai}</span><span className="mt-2 block">{selectedModule.descriptionThai}</span></>}
          mood="teach"
        >
          <div className="flex flex-wrap gap-2">
            <Badge>{selectedModule.unitCount} units</Badge>
            <Badge>{selectedModule.practiceCount} drills</Badge>
            <Badge>{selectedModule.estimatedStudyTime}</Badge>
            <Badge>{selectedModule.difficulty}</Badge>
            <Badge>{selectedModule.examImportance}</Badge>
          </div>
        </PageHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          {selectedModule.units.map((unit) => {
            const key = getAcademyUnitKey(selectedModule.id, unit.id)
            const completed = Boolean(progress.completedUnits[key])
            const studied = Boolean(progress.studiedUnits[key])
            const score = progress.quizScores[key]?.bestScore
            return (
              <button
                key={unit.id}
                onClick={() => onSelectAcademyUnit(selectedModule.id, unit.id)}
                className="glow-card rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 text-left transition hover:border-violet-400/50 hover:bg-white/[0.07]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-semibold text-white">{unit.title}</p>
                    <p className="text-xs text-purple-300/80">{unit.titleThai}</p>
                  </div>
                  {completed && <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-200">Done</span>}
                  {studied && !completed && <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs text-purple-200">Studied</span>}
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
    <div className="space-y-8">
      <PageHeader
        eyebrow="Grammar Academy"
        icon="🎓"
        title="คอร์สแกรมมาร์ตัวแม่"
        subtitle="เรียน grammar แบบไทยเข้าใจง่าย แต่คิดเป็นระบบเหมือนคนทำข้อสอบเก่ง: อ่านโครงสร้างก่อน แปลทีหลัง ตัดช้อยส์ด้วยเหตุผล แล้วเก็บกับดักให้หมด"
        mood="teach"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button onClick={startAcademy} className="btn btn-primary shrink-0">
            {progress.lastStudiedUnit ? 'เรียนต่อจากเดิม →' : 'เริ่มเรียนแบบตัวแม่ →'}
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex justify-between text-xs text-purple-200/80">
              <span>Progress</span>
              <span className="font-semibold text-white">{progressPercent}%</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 transition-all duration-1000" style={{ width: `${Math.max(progressPercent, 2)}%` }} />
            </div>
            <p className="mt-1.5 text-[11px] text-purple-300/70">บันทึกบนอุปกรณ์นี้ ไม่ต้องล็อกอินก็เรียนต่อได้</p>
          </div>
        </div>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatTile icon="🧩" label="Modules" value={academyStats.moduleCount} />
        <StatTile icon="📑" label="Units" value={academyStats.totalUnits} accent="from-sky-400/40 to-blue-500/10" />
        <StatTile icon="✅" label="Completed" value={completedCount} accent="from-emerald-400/40 to-teal-500/10" />
        <StatTile icon="👀" label="Studied" value={studiedCount} accent="from-amber-400/40 to-orange-500/10" />
        <StatTile icon="✏️" label="Drills" value={attemptedDrills} accent="from-rose-400/40 to-pink-500/10" />
      </div>

      <div className="relative">
        <label htmlFor="academy-search" className="sr-only">Search Academy</label>
        <span aria-hidden className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg">🔍</span>
        <input
          id="academy-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="passive, gerund, preposition, question tags, reported speech..."
          className="input !rounded-full !py-4 !pl-14"
        />
      </div>

      {query.trim() && (
        <section className="space-y-3">
          <SectionTitle icon="🔎" title="Search results" />
          <div className="grid gap-4 sm:grid-cols-2">
            {searchResults.map((unit) => (
              <button
                key={`${unit.moduleId}-${unit.id}`}
                onClick={() => onSelectAcademyUnit(unit.moduleId, unit.id)}
                className="glow-card rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 text-left transition hover:border-violet-400/50 hover:bg-white/[0.07]"
              >
                <p className="font-display text-lg font-semibold text-white">{unit.title}</p>
                <p className="text-xs text-purple-300/80">{unit.moduleTitle}</p>
              </button>
            ))}
          </div>
          {searchResults.length === 0 && <p className="text-sm text-purple-300/80">ไม่เจอหัวข้อนี้ ลองคำอื่น เช่น passive, gerund, tense, article</p>}
        </section>
      )}

      <section className="space-y-3">
        <SectionTitle icon="🧩" title="Academy Modules" subtitle="เรียนตามลำดับ หรือเลือกโมดูลที่อยากเก็บก่อนก็ได้" />
        <div className="grid gap-4 sm:grid-cols-2">
          {academyModuleCatalog.map((module) => {
            const doneInModule = module.units.filter((unit) => progress.completedUnits[getAcademyUnitKey(module.id, unit.id)]).length
            return (
              <button
                key={module.id}
                onClick={() => onSelectAcademyModule(module.id)}
                className="glow-card rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 text-left transition hover:border-violet-400/50 hover:bg-white/[0.07]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-purple-300/60">Module {module.order}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-white">{module.title}</h3>
                    <p className="text-xs text-purple-300/80">{module.titleThai}</p>
                  </div>
                  <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs text-purple-200">{doneInModule}/{module.unitCount}</span>
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

function Badge({ children }) {
  return <span className="chip">{children}</span>
}
