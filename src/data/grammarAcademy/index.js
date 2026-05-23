import { academyOutline, academyTotalUnits } from './academyOutline.js'

const moduleLoaders = {
  'sentence-text': () => import('./sentenceText.js'),
  'verb-forms': () => import('./verbForms.js'),
  'infinitive-gerund-participle': () => import('./infinitiveGerundParticiple.js'),
  'noun-phrase': () => import('./nounPhrase.js'),
  'adjectives-adverbs-prepositions': () => import('./adjectivesAdverbsPrepositions.js'),
  'main-sub-clauses': () => import('./mainClausesSubClauses.js'),
  'reported-relative': () => import('./reportedSpeechRelativeClauses.js'),
  'forms-endings-exam-polish': () => import('./formsEndingsExamPolish.js'),
  'exam-grammar-strategy': () => import('./examGrammarStrategy.js'),
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function makeUnitMeta(module, title, index) {
  const unitNumber = String(index + 1).padStart(2, '0')
  return {
    id: `${unitNumber}-${slugify(title)}`,
    title,
    titleThai: `บทเรียนตัวแม่: ${title}`,
    moduleId: module.id,
    moduleTitle: module.title,
    difficulty: module.difficulty,
    examImportance: module.examImportance,
  }
}

export const academyModuleCatalog = academyOutline.map((module, index) => ({
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
  practiceCount: module.units.length * 5,
  units: module.units.map((title, unitIndex) => makeUnitMeta(module, title, unitIndex)),
}))

export const academyStats = {
  moduleCount: academyModuleCatalog.length,
  totalUnits: academyTotalUnits,
  totalPracticeQuestions: academyTotalUnits * 5,
}

export function getAcademyModuleMeta(moduleId) {
  return academyModuleCatalog.find((module) => module.id === moduleId) || null
}

export function getAcademyUnitMeta(moduleId, unitId) {
  return getAcademyModuleMeta(moduleId)?.units.find((unit) => unit.id === unitId) || null
}

export function getFirstAcademyUnitMeta() {
  return academyModuleCatalog[0]?.units[0] || null
}

export function getNextAcademyUnitMeta(moduleId, unitId) {
  const flatUnits = academyModuleCatalog.flatMap((module) => module.units)
  const index = flatUnits.findIndex((unit) => unit.moduleId === moduleId && unit.id === unitId)
  return index >= 0 ? flatUnits[index + 1] || null : null
}

export function getPreviousAcademyUnitMeta(moduleId, unitId) {
  const flatUnits = academyModuleCatalog.flatMap((module) => module.units)
  const index = flatUnits.findIndex((unit) => unit.moduleId === moduleId && unit.id === unitId)
  return index > 0 ? flatUnits[index - 1] : null
}

export async function loadAcademyModule(moduleId) {
  const loader = moduleLoaders[moduleId]
  if (!loader) return null
  const module = await loader()
  return module.default
}

export async function loadAcademyUnit(moduleId, unitId) {
  const module = await loadAcademyModule(moduleId)
  if (!module) return { module: null, unit: null }
  return {
    module,
    unit: module.units.find((unit) => unit.id === unitId) || null,
  }
}

export async function loadAllAcademyModules() {
  const modules = await Promise.all(academyModuleCatalog.map((module) => loadAcademyModule(module.id)))
  return modules.filter(Boolean)
}
