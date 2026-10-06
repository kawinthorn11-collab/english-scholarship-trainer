// ตรวจข้อสอบทุกชุดและบทเรียนแกรมม่า: npm run validate
import { sets } from '../src/data/sets/index.js'
import { grammarTopics } from '../src/data/grammarTopics.js'

const errors = []
const fail = (where, message) => errors.push(`${where}: ${message}`)
const topicIds = new Set(grammarTopics.map((topic) => topic.id))

for (const set of sets) {
  const where = set.id
  if (set.questions.length !== 60) fail(where, `ต้องมี 60 ข้อ แต่มี ${set.questions.length}`)
  const grammar = set.questions.filter((q) => q.part === 'grammar').length
  if (grammar !== 30) fail(where, `Grammar ต้องมี 30 ข้อ แต่มี ${grammar}`)

  set.questions.forEach((q, index) => {
    const at = `${where} ข้อ ${q.n}`
    if (q.n !== index + 1) fail(at, `เลขข้อไม่เรียงกัน (ตำแหน่ง ${index + 1})`)
    const passage = set.passages[q.passage]
    if (!passage) return fail(at, `ไม่พบบทความ ${q.passage}`)
    if (q.choices.length !== 4) fail(at, 'ต้องมี 4 ช้อยส์')
    if (new Set(q.choices).size !== q.choices.length) fail(at, 'ช้อยส์ซ้ำกัน')
    if (!(q.answer >= 0 && q.answer < q.choices.length)) fail(at, 'answer ไม่ถูกต้อง')
    if (!q.why || q.why.length < 20) fail(at, 'คำอธิบาย (why) สั้นเกินไปหรือไม่มี')
    if (q.wrong.length !== q.choices.length) fail(at, 'wrong ต้องมีเท่าจำนวนช้อยส์')
    if (q.wrong[q.answer]) fail(at, 'wrong ของช้อยส์ที่ถูกต้องเป็นค่าว่าง')
    if (q.topic && !topicIds.has(q.topic)) fail(at, `ไม่มีหัวข้อ ${q.topic}`)
    if (q.part === 'grammar' && !passage.text.includes(`__(${q.n})__`)) fail(at, 'ไม่พบช่องว่างในบทความ')
    if (q.part === 'reading' && !q.q) fail(at, 'ไม่มีโจทย์')
    if (set.id === 'setM') {
      if (!q.topic) fail(at, 'ต้องระบุ topic')
      if (!q.tip) fail(at, 'ต้องมีเทคนิค (tip)')
      q.wrong.forEach((reason, i) => {
        if (i !== q.answer && !reason) fail(at, `ไม่มีเหตุผลว่าทำไมช้อยส์ ${i + 1} ผิด`)
      })
      if (q.part === 'reading') {
        for (const line of q.lines || []) {
          if (!passage.lines[line - 1]) fail(at, `ไม่มีบรรทัด ${line}`)
        }
        // คำถาม "X in line N" ต้องมีคำ X อยู่ในบรรทัดนั้นจริง
        const ref = q.q.match(/['"“]([^'"”]+)['"”]\s*(?:\(line \d+\)|in line (\d+))/i)
        if (ref && ref[2]) {
          const word = ref[1].replace(/\s*\.\.\.?$/, '')
          const line = passage.lines[Number(ref[2]) - 1] || ''
          if (!new RegExp(`\\b${word}\\b`, 'i').test(line)) fail(at, `ไม่พบ "${word}" ในบรรทัด ${ref[2]}`)
        }
      }
    }
  })
}

for (const topic of grammarTopics) {
  const at = `grammar/${topic.id}`
  if (!topic.sections.length) fail(at, 'ไม่มีเนื้อหา')
  topic.quiz.forEach((item, i) => {
    if (!(item.answer >= 0 && item.answer < item.choices.length)) fail(at, `แบบฝึกข้อ ${i + 1} answer ไม่ถูกต้อง`)
    if (!item.why) fail(at, `แบบฝึกข้อ ${i + 1} ไม่มีคำอธิบาย`)
  })
}

if (errors.length) {
  console.error(`พบปัญหา ${errors.length} จุด`)
  errors.forEach((error) => console.error(` - ${error}`))
  process.exit(1)
}

console.log(`ผ่าน: ข้อสอบ ${sets.length} ชุด (${sets.length * 60} ข้อ) และบทเรียนแกรมม่า ${grammarTopics.length} หัวข้อ`)
