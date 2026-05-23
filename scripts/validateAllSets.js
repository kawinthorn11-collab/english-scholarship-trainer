// CLI script: validates all exam sets and prints a report.
// Run with: npm run validate:sets
import { validateExamSet, formatValidationReport } from '../src/utils/validateExamSet.js'
import { examSets } from '../src/data/examSets/index.js'

let hasErrors = false

for (const [setId, set] of Object.entries(examSets)) {
  const result = validateExamSet(set)
  console.log(formatValidationReport(result, setId))
  console.log('')
  if (!result.valid) hasErrors = true
}

process.exit(hasErrors ? 1 : 0)
