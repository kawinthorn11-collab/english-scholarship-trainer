# ร่วมพัฒนา ติวทุนอังกฤษ

ขอบคุณที่อยากช่วยน้อง ๆ เตรียมสอบชิงทุนครับ 🙏 ตั้งแต่แก้คำผิดหนึ่งคำไปจนถึงเพิ่มข้อสอบทั้งชุด ช่วยได้หมด

## ไม่เขียนโค้ดก็ช่วยได้

เปิด [Issue ใหม่](../../issues/new/choose) แล้วเลือกแบบฟอร์ม:

| แบบฟอร์ม | ใช้เมื่อ |
| --- | --- |
| ✏️ **เสนอข้อสอบใหม่** | อยากเพิ่มข้อ grammar หรือ reading |
| 🔍 **แจ้งเฉลยผิด / คำอธิบายไม่ชัด** | เจอข้อที่เฉลยผิด หรืออธิบายแล้วงง |
| 🧩 **เสนอบทเรียนแกรมม่า** | มีหัวข้อหรือตัวอย่างที่อยากให้เพิ่ม |
| 🐛 **แจ้งปัญหาการใช้งาน** | เว็บค้าง ปุ่มกดไม่ได้ เสียงไม่ออก ฯลฯ |

## กติกาเรื่องเนื้อหา

- **ห้ามคัดลอกข้อสอบจริงหรือข้อสอบที่มีลิขสิทธิ์** แต่งบทความ โจทย์ และช้อยส์ใหม่ทั้งหมด (เลียนแบบ "รูปแบบ" ได้)
- คำอธิบายภาษาไทยให้เข้าใจง่าย เหมือนรุ่นพี่อธิบายให้น้องฟัง และต้องบอกว่าทำไมช้อยส์อื่นผิดทุกตัว
- คำอธิบายจะถูกอ่านออกเสียง จึงไม่ควรใช้สัญลักษณ์แปลก ๆ หรืออีโมจิในประโยค

## สำหรับคนที่เขียนโค้ด

```bash
git clone https://github.com/kawinthorn11-collab/english-scholarship-trainer.git
cd english-scholarship-trainer
npm install
npm run dev
```

ก่อนเปิด Pull Request ให้รันผ่านทั้งหมด:

```bash
npm run lint
npm run validate
npm run build
```

### เพิ่มข้อสอบชุดใหม่

ดูตัวอย่างที่ `src/data/sets/setM.js` แต่ละชุดมี `passages` และ `questions` 60 ข้อ

```js
// บทความ grammar: ใช้ __(n)__ แทนช่องว่าง
g1: { part: 'grammar', title: '...', titleTh: '...', text: `... too stressed __(1)__ sleep ...` },
// บทความ reading: แยกเป็นบรรทัด เพื่อให้โจทย์อ้างอิง "in line 9" ได้
r1: { part: 'reading', title: '...', lines: ['บรรทัดที่ 1', 'บรรทัดที่ 2'] },

// คำถาม
{
  n: 1, passage: 'g1', topic: 'too-to',          // topic = id ใน src/data/grammarTopics.js
  choices: ['for', 'about', 'to', 'by'], answer: 2, // answer = index ของช้อยส์ที่ถูก (0 = ช้อยส์ 1)
  why: 'อธิบายว่าทำไมถูก',
  wrong: ['ทำไม for ผิด', 'ทำไม about ผิด', '', 'ทำไม by ผิด'], // ช่องของคำตอบที่ถูกเว้นว่าง
  tip: 'เทคนิคจำง่าย',
}
// คำถาม reading มี q: 'โจทย์' และ lines: [บรรทัดที่เป็นหลักฐาน]
```

แล้วเพิ่มชุดใหม่ในรายการ `sets` ที่ `src/data/sets/index.js` และรัน `npm run validate`

### เพิ่มหรือแก้บทเรียนแกรมม่า

แก้ `src/data/grammarTopics.js` แต่ละหัวข้อมี `sections` (หลักการ + ตัวอย่าง), `traps` และ `quiz`

### สไตล์โค้ด

- ใช้คลาสที่มีอยู่ใน `src/styles.css` (`card`, `btn btn-primary`, `choice` ฯลฯ) และสีจากตัวแปร `--accent`, `--right`, `--wrong`
- ปุ่มเสียงใช้ `<SpeakButton id="..." text="..." />` จาก `src/components/SpeakButton.jsx`
- ทุกหน้าต้องใช้งานได้บนมือถือ (กว้างประมาณ 390px) และในโหมดมืด

## การอยู่ร่วมกัน

โปรเจกต์นี้ทำเพื่อการศึกษา ขอให้ทุกคนสุภาพและให้เกียรติกัน ดู [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

---

*English: Contributions are welcome in English too. Open an issue with one of the templates, or fork, run `npm run lint && npm run validate && npm run build`, and open a pull request. All exam content must be original — never copy real or copyrighted exam questions.*
