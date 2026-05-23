import { getDeviceId } from '../src/utils/deviceId.js'
import {
  getLocalStats,
  recordExamCompleted,
  recordExamStarted,
  recordGrammarDrillCompleted,
  recordGrammarLessonCompleted,
  recordQuestionAnswered,
  recordStudySeconds,
  recordStudySessionStarted,
  resetLocalStatsForDebug,
} from '../src/utils/localStats.js'
import { fetchPublicGlobalStats } from '../src/utils/globalStats.js'

const errors = []

function assert(condition, message) {
  if (!condition) errors.push(message)
}

resetLocalStatsForDebug()

const firstDeviceId = getDeviceId()
const secondDeviceId = getDeviceId()
assert(firstDeviceId && typeof firstDeviceId === 'string', 'device id should be a non-empty string')
assert(firstDeviceId === secondDeviceId, 'device id fallback should remain stable during one runtime')

recordStudySessionStarted()
recordStudySeconds(30)
recordExamStarted()
recordExamCompleted({ details: [] })
recordGrammarLessonCompleted('modals')
recordGrammarDrillCompleted('modals', 80)
recordQuestionAnswered('Modals', false)
recordQuestionAnswered('Modals', true)

const stats = getLocalStats()
assert(stats.totalSessions >= 1, 'totalSessions should increase')
assert(stats.totalStudySeconds >= 30, 'totalStudySeconds should increase')
assert(stats.todayStudySeconds >= 30, 'todayStudySeconds should increase')
assert(stats.examsStarted === 1, 'examsStarted should increase')
assert(stats.examsCompleted === 1, 'examsCompleted should increase')
assert(stats.grammarLessonsCompleted === 1, 'grammarLessonsCompleted should increase')
assert(stats.grammarDrillsCompleted === 1, 'grammarDrillsCompleted should increase')
assert(stats.totalQuestionsAnswered === 2, 'totalQuestionsAnswered should increase')
assert(stats.correctAnswers === 1, 'correctAnswers should increase')
assert(stats.weakSkillCounts.Modals === 1, 'weakSkillCounts should track weak skills')

const publicStats = await fetchPublicGlobalStats()
assert(publicStats && typeof publicStats === 'object', 'fetchPublicGlobalStats should return an object')
assert('total_study_seconds' in publicStats, 'public stats should include total_study_seconds')
assert('today_study_seconds' in publicStats, 'public stats should include today_study_seconds')
assert('total_devices' in publicStats, 'public stats should include total_devices')

if (errors.length > 0) {
  console.error('Analytics validation failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('Analytics validation passed.')
console.log(`Local study seconds: ${stats.totalStudySeconds}`)
console.log(`Public stats source: ${publicStats.source || 'unknown'}`)
