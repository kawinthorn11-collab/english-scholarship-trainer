# ติวทุนอังกฤษ · English Scholarship Trainer

**เว็บฝึกข้อสอบภาษาอังกฤษสอบชิงทุนฟรี** แนวข้อสอบเข้ามหาวิทยาลัยนานาชาติ (เช่น ABAC)
เฉลยละเอียดทีละข้อ กดฟังครูพูดอธิบายได้ทุกข้อ และมีหมวดแกรมม่าที่สรุปจากข้อสอบจริง

**👉 ใช้งานได้เลย: https://kawinthorn11-collab.github.io/english-scholarship-trainer/**

ไม่ต้องสมัคร ไม่ต้องติดตั้ง เปิดได้ทั้งมือถือและคอมพิวเตอร์ ความคืบหน้าบันทึกไว้ในเครื่องให้อัตโนมัติ

---

## มีอะไรบ้าง

| | |
| --- | --- |
| 📝 **ชุด M-Style · แนวข้อสอบจริง** | 60 ข้อ แต่งใหม่ทั้งหมด แต่ทดสอบจุดเดียวกับข้อสอบจริงทีละข้อ (Grammar cloze 3 บทความ + Reading 3 บทความที่มีเลขบรรทัด) |
| 📚 **ชุดฝึกเพิ่มอีก 3 ชุด** | รูปแบบเดียวกัน ชุดละ 60 ข้อ รวมทั้งหมด 240 ข้อ |
| ✅ **ฝึกทีละข้อ** | ตอบแล้วเฉลยขึ้นทันที บอกว่าทำไมถูก ทำไมช้อยส์อื่นผิดทีละตัว และเทคนิคจำง่าย |
| 🔊 **ครูพูดสอน** | กดปุ่มเดียว ครูอ่านเฉลยให้ฟัง (ไทยปนอังกฤษ) ปรับความเร็ว ช้า/ปกติ/เร็ว ได้ |
| ⏱️ **จำลองสอบ 60 นาที** | จับเวลาเหมือนห้องสอบ ส่งแล้วได้คะแนน Grammar/Reading และหัวข้อที่ควรทบทวน |
| 🧩 **หมวดแกรมม่าจากข้อสอบจริง** | 13 หัวข้อ เรียงตามที่ออกบ่อย มีหลักการ ตัวอย่าง กับดัก และแบบฝึกท้ายบท |

> เสียงพูดใช้เสียงที่มีในเครื่อง ถ้าไม่มีเสียงภาษาไทย เว็บจะบอกวิธีเพิ่มให้ (Android / iPhone / Windows)

## ข้อสอบจริงออกอะไร

ข้อสอบเข้า 1 ชุด = 60 ข้อ 60 นาที

- **Part I Grammar (30 ข้อ)** บทความ 3 เรื่อง เติมคำ 10 ช่องต่อเรื่อง ออกบ่อยที่สุดคือ คำเชื่อม (6 ข้อ), บุพบท (5), Tense/Passive (4), สรรพนาม, Parallel structure, รูปคำ
- **Part II Reading (30 ข้อ)** บทความ 3 เรื่อง ถามคำอ้างอิง (*"he" in line 6 refers to…*) ถึง 10 ข้อ ที่เหลือเป็นรายละเอียด ศัพท์ในบริบท และการอนุมาน

ข้อสอบทุกข้อในเว็บนี้ **แต่งขึ้นใหม่** ไม่ได้คัดลอกข้อสอบจริง เพราะข้อสอบจริงเป็นลิขสิทธิ์และห้ามเผยแพร่

## สำหรับอาจารย์และรุ่นพี่

- ส่งลิงก์ให้นักเรียนได้เลย ไม่ต้องสมัครบัญชี
- ส่งลิงก์ตรงไปที่ข้อใดข้อหนึ่งได้ เช่น `…/#/exam/setM?q=21` หรือบทเรียน `…/#/grammar/conjunction`
- อยากเพิ่มข้อสอบหรือแก้คำอธิบาย **ไม่ต้องเขียนโค้ด** เปิด [Issue](../../issues/new/choose) แล้วกรอกแบบฟอร์มได้เลย

## รันบนเครื่องตัวเอง

ต้องมี Node.js 22 ขึ้นไป

```bash
npm install
npm run dev        # เปิด http://localhost:5173/english-scholarship-trainer/
```

ก่อนส่งงาน:

```bash
npm run lint
npm run validate   # ตรวจข้อสอบทุกข้อและบทเรียนแกรมม่า
npm run build
```

push เข้า `main` แล้ว GitHub Actions จะ deploy ขึ้น GitHub Pages ให้อัตโนมัติ

## โครงสร้างโปรเจกต์

```
src/
  pages/              Home, Exams, Quiz (ฝึก/จับเวลา/ดูเฉลย), Result, Grammar, Topic
  components/         Passage (บทความ), Explanation (เฉลย), SpeakButton (ปุ่มเสียง)
  lib/                speech.js (เสียงครู), exam.js (คะแนน/บทพูด/บันทึก), router.js
  data/
    sets/setM.js      ชุด M-Style แนวข้อสอบจริง
    sets/index.js     รวมทุกชุดให้อยู่ในรูปแบบเดียวกัน
    examSets/         ชุดฝึก 1–3
    grammarTopics.js  หมวดแกรมม่า 13 หัวข้อ
scripts/validate.js   ตรวจความถูกต้องของข้อมูล
```

เทคโนโลยี: React 19, Vite, CSS ธรรมดา, Web Speech API, GitHub Pages

---

## English summary

A free, open-source trainer for Thai students preparing for English scholarship entrance exams (Assumption University–style: 30 grammar cloze + 30 reading items in 60 minutes).

- **M-Style set**: 60 original questions that each test the same point as the corresponding item of a past paper, plus 3 more practice sets (240 questions)
- **Practice mode** with instant, choice-by-choice Thai explanations; **timed mode** with scoring and weak-topic analysis
- **Spoken teaching**: every explanation and lesson can be read aloud (mixed Thai/English text-to-speech)
- **13 grammar topics** derived from what the real exam tests, each with examples, traps, and a mini quiz

All questions and passages are original. Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
