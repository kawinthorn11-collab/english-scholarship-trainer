import grammar1 from './grammar1.js'
import grammar2 from './grammar2.js'
import grammar3 from './grammar3.js'
import reading1 from './reading1.js'
import reading2 from './reading2.js'
import reading3 from './reading3.js'

const set03 = {
  setId: 'set03',
  title: 'Mock Exam Set 03',
  description: 'Original practice exam inspired by the uploaded sample exam format.',
  timeLimitMinutes: 60,
  totalQuestions: 60,
  grammarCount: 30,
  readingCount: 30,
  difficulty: 'medium',
  questions: [
    ...grammar1,
    ...grammar2,
    ...grammar3,
    ...reading1,
    ...reading2,
    ...reading3,
  ],
}

export default set03
