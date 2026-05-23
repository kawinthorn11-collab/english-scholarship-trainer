// CLI: validate all grammar lessons
import { validateAllLessons, formatLessonReport } from '../src/utils/validateGrammarLessons.js'
import { grammarLessons } from '../src/data/grammarLessons/index.js'

const results = validateAllLessons(grammarLessons)
console.log(formatLessonReport(results))

const hasErrors = results.some((r) => !r.valid)
process.exit(hasErrors ? 1 : 0)
