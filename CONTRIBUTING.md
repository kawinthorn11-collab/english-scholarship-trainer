# ร่วมพัฒนา MooKwai · หมูควายติวทุน

ขอบคุณที่อยากช่วยน้อง ๆ เตรียมสอบชิงทุนครับ 🙏
ทุกการช่วยเหลือมีค่า ตั้งแต่แก้คำผิดหนึ่งคำไปจนถึงเขียนฟีเจอร์ใหม่

## ไม่เขียนโค้ดก็ช่วยได้

เปิด [Issue ใหม่](../../issues/new/choose) แล้วเลือกแบบฟอร์ม:

| แบบฟอร์ม | ใช้เมื่อ |
| --- | --- |
| ✏️ **เสนอข้อสอบใหม่** | อยากเพิ่มข้อ grammar หรือ reading |
| 🔍 **แจ้งเฉลยผิด / คำอธิบายไม่ชัด** | เจอข้อที่เฉลยผิด หรืออธิบายแล้วงง |
| 🐷 **เสนอบทเรียนหมูควาย** | มีไอเดียหัวข้อหรือบทสนทนาใหม่ |
| 🐛 **แจ้งปัญหาการใช้งาน** | เว็บค้าง ปุ่มกดไม่ได้ เสียงไม่ออก ฯลฯ |

ผู้ดูแลจะนำเนื้อหาไปใส่ในเว็บให้ และใส่ชื่อคุณเป็นผู้ร่วมพัฒนา

## กติกาเรื่องเนื้อหา

- **ห้ามคัดลอกข้อสอบจริงหรือข้อสอบที่มีลิขสิทธิ์** ให้แต่งใหม่เองทั้งหมด (โจทย์ บทความ และช้อยส์)
- ภาษาอังกฤษต้องถูกต้องตามหลัก ถ้าไม่แน่ใจ เขียนหมายเหตุไว้ได้
- คำอธิบายภาษาไทยให้สั้น เข้าใจง่าย เหมือนรุ่นพี่อธิบายให้น้องฟัง
- บทสนทนาหมูควายให้แต่ละประโยค **สั้น** (อ่านออกเสียงไม่เกิน 5 วินาที) เพราะจะถูกพูดออกเสียง

## สำหรับคนที่เขียนโค้ด

### เริ่มต้น

```bash
git clone https://github.com/kawinthorn11-collab/english-scholarship-trainer.git
cd english-scholarship-trainer
npm install
npm run dev
```

### ขั้นตอนส่งงาน

1. Fork repo แล้วสร้าง branch ใหม่ เช่น `add-set04-grammar` หรือ `fix-q12-explanation`
2. แก้ไขแล้วรันคำสั่งตรวจให้ผ่านทั้งหมด:
   ```bash
   npm run lint
   npm run build
   npm run validate:sets
   npm run validate:grammar
   npm run validate:academy
   npm run validate:speech
   ```
3. เปิด Pull Request อธิบายว่าเปลี่ยนอะไร ถ้าเปลี่ยนหน้าตาให้แนบภาพหน้าจอ

ถ้าเพิ่งเริ่ม ลองดู Issue ที่ติดป้าย [`good first issue`](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

### เพิ่มบทเรียนหมูควาย

แก้ไฟล์ `src/data/duoLessons.js` แล้วเพิ่ม object ต่อท้ายอาร์เรย์ `duoLessons`:

```js
{
  id: 'articles',                       // ไม่ซ้ำกับบทอื่น
  emoji: '🅰️',
  title: 'a / an / the',
  titleThai: 'ใช้ article ให้ถูก',
  color: 'from-sky-400 to-pink-500',    // คลาส gradient ของ Tailwind
  lines: [
    { who: 'pig', text: 'an hour หรือ a hour ดีนะ?' },
    { who: 'buffalo', text: 'ดูที่เสียง ไม่ใช่ตัวอักษร h ในคำนี้ไม่ออกเสียง', example: 'It took an hour.' },
  ],
  quiz: {
    question: 'She is ___ university student.',
    choices: ['a', 'an', 'the', '-'],
    answer: 'a',
    explain: 'university ออกเสียง "ยู" เป็นเสียงพยัญชนะ จึงใช้ a',
  },
},
```

- `who` เป็น `'pig'` หรือ `'buffalo'`
- `example` (ไม่บังคับ) คือประโยคภาษาอังกฤษที่จะขึ้นการ์ดและอ่านด้วยเสียงอังกฤษ
- `answer` ต้องตรงกับข้อความในช้อยส์ตัวใดตัวหนึ่งทุกตัวอักษร

### เพิ่มข้อสอบ

ข้อสอบแต่ละชุดอยู่ใน `src/data/examSets/` (ดูตัวอย่างโครงสร้างที่ `set03/`)
แต่ละข้อต้องมีฟิลด์: `id`, `section`, `question`, `choices` (4 ตัว), `correctAnswer`, `skillTag`, `difficulty`,
`explanationThai`, `explanationEnglish`, `whyCorrect`, `whyWrong`, `examTrick`, `commonMistake`, `miniLesson`

สร้างชุดใหม่แล้วอย่าลืมลงทะเบียนใน `src/data/examSets/index.js` และรัน `npm run validate:sets`

### สไตล์โค้ด

- ใช้ Tailwind utility class และคลาสที่มีอยู่ใน `src/index.css` (`glass`, `btn btn-primary`, `chip` ฯลฯ)
- ตัวการ์ตูนใช้ `<Mascot character="pig|buffalo" mood="..." />` จาก `src/components/Mascot.jsx`
- เสียงพูดใช้ `speakLine(text, { speaker })` จาก `src/utils/voice.js`
- ทุกหน้าต้องใช้งานได้บนมือถือ (กว้างประมาณ 390px)

## การอยู่ร่วมกัน

โปรเจกต์นี้ทำเพื่อการศึกษา ขอให้ทุกคนสุภาพและให้เกียรติกัน ดู [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

---

*English: Contributions are welcome in English too. Open an issue with one of the templates, or fork, run the checks above, and open a pull request. All exam content must be original — never copy real or copyrighted exam questions.*
