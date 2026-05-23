import { academyModuleCatalog, academyStats, loadAllAcademyModules } from '../src/data/grammarAcademy/index.js'

const REQUIRED_MODULE_FIELDS = [
  'id',
  'title',
  'titleThai',
  'descriptionThai',
  'estimatedStudyTime',
  'difficulty',
  'units',
  'summaryThai',
  'examUseCases',
  'memoryTheme',
  'practiceCount',
]

const REQUIRED_UNIT_FIELDS = [
  'id',
  'title',
  'titleThai',
  'shortIntroThai',
  'deepExplanationThai',
  'explanationEnglish',
  'grammarPatterns',
  'correctExamples',
  'wrongExamples',
  'examTraps',
  'funnyMemoryTips',
  'thaiStudentCommonMistakes',
  'stepByStepHowToSolve',
  'miniDrills',
  'masteryChecklist',
  'relatedSkillTags',
]

function isBlank(value) {
  return value === undefined || value === null || value === ''
}

function validateModule(module, seenModuleIds, seenUnitIds) {
  const errors = []

  if (seenModuleIds.has(module.id)) errors.push(`Duplicate module id: ${module.id}`)
  seenModuleIds.add(module.id)

  for (const field of REQUIRED_MODULE_FIELDS) {
    if (isBlank(module[field])) errors.push(`Module ${module.id} missing ${field}`)
  }

  if (!Array.isArray(module.units) || module.units.length === 0) {
    errors.push(`Module ${module.id} has no units`)
    return errors
  }

  for (const unit of module.units) {
    const unitKey = `${module.id}:${unit.id}`
    if (seenUnitIds.has(unit.id)) errors.push(`Duplicate unit id: ${unit.id}`)
    seenUnitIds.add(unit.id)

    for (const field of REQUIRED_UNIT_FIELDS) {
      if (isBlank(unit[field])) errors.push(`Unit ${unitKey} missing ${field}`)
    }

    if (String(unit.deepExplanationThai || '').length < 220) {
      errors.push(`Unit ${unitKey} deepExplanationThai is too short`)
    }
    if (!Array.isArray(unit.grammarPatterns) || unit.grammarPatterns.length < 4) {
      errors.push(`Unit ${unitKey} needs at least 4 grammarPatterns`)
    }
    if (!Array.isArray(unit.correctExamples) || unit.correctExamples.length < 6) {
      errors.push(`Unit ${unitKey} needs at least 6 correctExamples`)
    }
    if (!Array.isArray(unit.wrongExamples) || unit.wrongExamples.length < 4) {
      errors.push(`Unit ${unitKey} needs at least 4 wrongExamples`)
    }
    if (!Array.isArray(unit.examTraps) || unit.examTraps.length < 4) {
      errors.push(`Unit ${unitKey} needs at least 4 examTraps`)
    }
    if (!Array.isArray(unit.funnyMemoryTips) || unit.funnyMemoryTips.length < 3) {
      errors.push(`Unit ${unitKey} needs at least 3 funnyMemoryTips`)
    }
    if (!Array.isArray(unit.miniDrills) || unit.miniDrills.length < 5) {
      errors.push(`Unit ${unitKey} needs at least 5 miniDrills`)
    } else {
      unit.miniDrills.forEach((question, index) => {
        const prefix = `Unit ${unitKey} miniDrills[${index}]`
        if (!question.question) errors.push(`${prefix} missing question`)
        if (!Array.isArray(question.choices) || question.choices.length !== 4) {
          errors.push(`${prefix} must have exactly 4 choices`)
        } else if (!question.choices.includes(question.correctAnswer)) {
          errors.push(`${prefix} correctAnswer is not in choices`)
        }
        if (!question.explanationThai || question.explanationThai.length < 80) {
          errors.push(`${prefix} explanationThai is missing or too short`)
        }
      })
    }
    if (!Array.isArray(unit.masteryChecklist) || unit.masteryChecklist.length < 6) {
      errors.push(`Unit ${unitKey} needs at least 6 masteryChecklist items`)
    }
  }

  return errors
}

const modules = await loadAllAcademyModules()
const seenModuleIds = new Set()
const seenUnitIds = new Set()
const errors = modules.flatMap((module) => validateModule(module, seenModuleIds, seenUnitIds))
const totalUnits = modules.reduce((sum, module) => sum + module.units.length, 0)
const totalQuestions = modules.reduce((sum, module) => sum + module.units.reduce((unitSum, unit) => unitSum + unit.miniDrills.length, 0), 0)

console.log('=== Grammar Academy Validation Report ===')
console.log(`Modules: ${modules.length}`)
console.log(`Catalog modules: ${academyModuleCatalog.length}`)
console.log(`Units: ${totalUnits}`)
console.log(`Catalog units: ${academyStats.totalUnits}`)
console.log(`Mini drill questions: ${totalQuestions}`)

if (modules.length !== academyModuleCatalog.length) {
  errors.push(`Expected ${academyModuleCatalog.length} modules, found ${modules.length}`)
}
if (totalUnits !== academyStats.totalUnits) {
  errors.push(`Expected ${academyStats.totalUnits} units, found ${totalUnits}`)
}
if (totalUnits < 198) {
  errors.push(`Expected at least 198 units, found ${totalUnits}`)
}
if (totalQuestions < 990) {
  errors.push(`Expected at least 990 mini drill questions, found ${totalQuestions}`)
}

if (errors.length > 0) {
  console.log('')
  console.log('Errors:')
  errors.forEach((error) => console.log(`- ${error}`))
  process.exit(1)
}

console.log('')
console.log('All academy modules valid.')
