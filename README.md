# MooKwai · หมูควายติวทุน 🐷🐃

**เว็บติวสอบชิงทุนภาษาอังกฤษฟรี** ที่มีครูหมูหวานกับครูควายขยันคอยพูดสอนให้ฟัง
ทำขึ้นเพื่อช่วยน้อง ๆ ที่อยากสอบชิงทุนเรียนมหาวิทยาลัยนานาชาติ (เช่น ABAC) ซึ่งค่าเทอมสูงมาก
ให้มีที่ฝึกข้อสอบคุณภาพดีได้โดยไม่ต้องเสียเงิน

**👉 ใช้งานได้เลย: https://kawinthorn11-collab.github.io/english-scholarship-trainer/**

ไม่ต้องสมัคร ไม่ต้องติดตั้ง เปิดได้ทั้งมือถือและคอมพิวเตอร์ ความคืบหน้าบันทึกไว้ในเครื่องให้อัตโนมัติ

> *A free, open-source English scholarship-exam trainer for Thai students, taught by two animated cartoon teachers (a pig and a water buffalo) who speak the lessons out loud.* English summary below.

---

## มีอะไรบ้าง

| ฟีเจอร์ | รายละเอียด |
| --- | --- |
| 🎧 **ห้องเรียนหมูควาย** | บทเรียนบทละ 1 นาที ฟังครูหมูกับครูควายคุยสอนทีละประโยค มีโหมดช้าและโหมดฟังอย่างเดียว จบบทมีคำถามพร้อมเฉลยแบบพูด |
| 📝 **ข้อสอบจำลอง** | 3 ชุด ชุดละ 60 ข้อ 60 นาที (Grammar 30 + Reading 30) จับเวลาเหมือนห้องสอบจริง สลับข้อทุกครั้ง |
| 💡 **เฉลยละเอียด** | ทุกข้ออธิบายทั้งไทยและอังกฤษ บอกว่าทำไมช้อยส์อื่นผิด เทคนิคทำข้อสอบ และจุดที่คนไทยพลาดบ่อย |
| 🎯 **วิเคราะห์จุดอ่อน** | หลังสอบบอกเลยว่าควรซ่อมทักษะไหน แล้วพาไปบทเรียนที่ตรงจุด |
| 📖 **Grammar Lessons + Academy** | บทเรียน grammar 20 หัวข้อ และคอร์สเป็นระบบเกือบ 200 ยูนิต พร้อม drill |
| 🔊 **ฝึกฟังเสียง Native** | ฟังประโยคข้อสอบแบบช้า/ปกติ ฝึก shadowing ได้ |

ข้อสอบและบทความทั้งหมดเป็นเนื้อหาที่แต่งขึ้นใหม่ (original) ไม่ได้คัดลอกจากข้อสอบจริง

## สำหรับอาจารย์และรุ่นพี่

- **ส่งลิงก์ให้นักเรียนได้เลย** ไม่ต้องให้นักเรียนสมัครบัญชี
- อยากช่วยเพิ่มข้อสอบ แก้คำอธิบาย หรือเสนอบทเรียนใหม่ **ไม่ต้องเขียนโค้ดเป็น** — เปิด [Issue](../../issues/new/choose) แล้วกรอกแบบฟอร์มได้เลย
- อ่านวิธีร่วมพัฒนาแบบละเอียดได้ที่ [CONTRIBUTING.md](CONTRIBUTING.md)

## ร่วมพัฒนา

ทุกคนช่วยได้ ไม่ว่าจะเป็นครู นักเรียน หรือโปรแกรมเมอร์

- ✏️ เพิ่มหรือตรวจข้อสอบ / คำอธิบาย
- 🐷 เขียนบทสนทนาหมูควายบทใหม่
- 🐛 แจ้งบั๊กหรือจุดที่ใช้งานยาก
- 💻 พัฒนาฟีเจอร์ (ดู Issue ที่ติดป้าย `good first issue`)

ดูขั้นตอนทั้งหมดใน [CONTRIBUTING.md](CONTRIBUTING.md)

## รันบนเครื่องตัวเอง

ต้องมี Node.js 22 ขึ้นไป

```bash
npm install
npm run dev        # เปิดที่ http://localhost:5173/english-scholarship-trainer/
```

คำสั่งตรวจก่อนส่งงาน:

```bash
npm run lint
npm run build
npm run validate:sets      # ตรวจข้อสอบทุกชุด
npm run validate:grammar   # ตรวจบทเรียน grammar
npm run validate:academy   # ตรวจ Grammar Academy
npm run validate:speech    # ตรวจระบบเสียง
```

ระบบล็อกอินและสถิติรวม (Supabase) เป็นตัวเลือกเสริม ถ้าไม่ตั้งค่า เว็บจะทำงานแบบ Guest ได้ครบทุกฟีเจอร์ ดูวิธีตั้งค่าที่ [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)

## โครงสร้างโปรเจกต์

```
src/
  pages/            หน้าต่าง ๆ (ClassRoom, MockExam, Practice, Results, Grammar...)
  components/       ตัวการ์ตูน (Mascot.jsx), การ์ดคำถาม, เฉลย ฯลฯ
  data/
    examSets/       ข้อสอบจำลองแต่ละชุด
    duoLessons.js   บทสนทนาหมูควายในห้องเรียน
    grammarLessons/ บทเรียน grammar
    grammarAcademy/ คอร์ส Grammar Academy
  utils/voice.js    ระบบเสียงพูดไทย/อังกฤษของตัวการ์ตูน
scripts/            สคริปต์ตรวจความถูกต้องของข้อมูล
```

เทคโนโลยี: React 19, Vite, Tailwind CSS 4, Web Speech API, deploy บน GitHub Pages

---

## English summary

**MooKwai** is a free web app that helps Thai high-school students prepare for English scholarship exams at international universities, where tuition is out of reach for many families.

- **Pig & Buffalo Classroom** – one-minute spoken dialogue lessons (Thai + English text-to-speech) with a quiz at the end
- **Mock exams** – three original 60-question, 60-minute sets with bilingual, choice-by-choice explanations
- **Weak-skill analysis** that links straight to the matching grammar lesson
- **Grammar lessons, a ~200-unit Grammar Academy, and native-speed listening practice**
- Works without an account; progress is stored on the device

All questions and passages are original. Contributions of questions, explanations, lessons, and code are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) — ใช้ แก้ไข และแจกต่อได้ฟรี
