// Grammar Academy: a hand-written course of 9 modules.
// Each module file defines its units in full (see defineUnit.js).
import sentenceCore from './m1Sentence.js'
import tenses from './m2Tenses.js'
import passive from './m3Passive.js'
import verbPatterns from './m4VerbPatterns.js'
import modalsConditionals from './m5Modals.js'
import nounsDeterminers from './m6Nouns.js'
import modifiers from './m7Modifiers.js'
import clauses from './m8Clauses.js'
import examStrategy from './m9Strategy.js'

const modules = [sentenceCore, tenses, passive, verbPatterns, modalsConditionals, nounsDeterminers, modifiers, clauses, examStrategy]

export const academyModuleCatalog = modules.map((module, index) => ({
  id: module.id,
  order: index + 1,
  title: module.title,
  titleThai: module.titleThai,
  descriptionThai: module.descriptionThai,
  estimatedStudyTime: module.estimatedStudyTime,
  difficulty: module.difficulty,
  examImportance: module.examImportance,
  memoryTheme: module.memoryTheme,
  unitCount: module.units.length,
  practiceCount: module.practiceCount,
  units: module.units.map((unit) => ({
    id: unit.id,
    title: unit.title,
    titleThai: unit.titleThai,
    moduleId: module.id,
    moduleTitle: module.title,
    difficulty: module.difficulty,
    examImportance: module.examImportance,
  })),
}))

const totalUnits = modules.reduce((n, module) => n + module.units.length, 0)

export const academyStats = {
  moduleCount: modules.length,
  totalUnits,
  totalPracticeQuestions: modules.reduce((n, module) => n + module.practiceCount, 0),
}

const flatUnits = academyModuleCatalog.flatMap((module) => module.units)

export function getAcademyModuleMeta(moduleId) {
  return academyModuleCatalog.find((module) => module.id === moduleId) || null
}

export function getAcademyUnitMeta(moduleId, unitId) {
  return getAcademyModuleMeta(moduleId)?.units.find((unit) => unit.id === unitId) || null
}

export function getFirstAcademyUnitMeta() {
  return flatUnits[0] || null
}

export function getNextAcademyUnitMeta(moduleId, unitId) {
  const index = flatUnits.findIndex((unit) => unit.moduleId === moduleId && unit.id === unitId)
  return index >= 0 ? flatUnits[index + 1] || null : null
}

export function getPreviousAcademyUnitMeta(moduleId, unitId) {
  const index = flatUnits.findIndex((unit) => unit.moduleId === moduleId && unit.id === unitId)
  return index > 0 ? flatUnits[index - 1] : null
}

export async function loadAcademyModule(moduleId) {
  return modules.find((module) => module.id === moduleId) || null
}

export async function loadAcademyUnit(moduleId, unitId) {
  const module = await loadAcademyModule(moduleId)
  if (!module) return { module: null, unit: null }
  return { module, unit: module.units.find((unit) => unit.id === unitId) || null }
}

export async function loadAllAcademyModules() {
  return modules
}
