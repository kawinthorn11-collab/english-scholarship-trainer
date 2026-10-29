# เปิดระบบสมาชิก (ล็อกอิน + เก็บความคืบหน้าในบัญชี)

ระบบสมาชิกใช้ Supabase (ฟรี) เมื่อตั้งค่าเสร็จ สมาชิกจะ:
- สมัครด้วยอีเมล แล้วยืนยันผ่านลิงก์ในอีเมล
- เก็บผลสอบ สมุดข้อผิด บัตรคำศัพท์ และหลักสูตรไว้ในบัญชี ซิงก์อัตโนมัติทุก 30 วินาที
- เข้าสู่ระบบเครื่องอื่นแล้วเรียนต่อจากเดิมได้

ใช้เวลาประมาณ 10 นาที ทำครั้งเดียว

## 1 · สร้างโปรเจกต์ Supabase
1. เข้า https://supabase.com → **New project**
2. ตั้งชื่อ เช่น `mookwai` ตั้งรหัสผ่านฐานข้อมูล (จดไว้) เลือก Region **Southeast Asia (Singapore)**
3. รอ 1–2 นาที

## 2 · สร้างตาราง
1. เมนูซ้าย **SQL Editor** → **New query**
2. คัดลอกทั้งไฟล์ [`supabase/full-setup.sql`](../supabase/full-setup.sql) วางแล้วกด **Run**
3. New query อีกครั้ง คัดลอกไฟล์ [`supabase/member-sync.sql`](../supabase/member-sync.sql) วางแล้วกด **Run**

## 3 · ตั้งค่าลิงก์ยืนยันอีเมล (สำคัญ)
เมนู **Authentication** → **URL Configuration**
- **Site URL:** `https://kawinthorn11-collab.github.io/english-scholarship-trainer/`
- **Redirect URLs** กด Add แล้วใส่: `https://kawinthorn11-collab.github.io/english-scholarship-trainer/**`

ถ้าไม่ตั้ง ลิงก์ในอีเมลยืนยันจะพาไป localhost และสมาชิกยืนยันไม่ได้

## 4 · ใส่ค่าลงใน GitHub
1. ใน Supabase ไปที่ **Project Settings** → **API** คัดลอก
   - **Project URL** (ขึ้นต้นด้วย `https://` ลงท้าย `.supabase.co`)
   - **anon public** key
2. ใน GitHub repo ไปที่ **Settings** → **Secrets and variables** → **Actions** → แท็บ **Variables** → **New repository variable**
   - `VITE_SUPABASE_URL` = Project URL
   - `VITE_SUPABASE_ANON_KEY` = anon public key

> anon key ออกแบบมาให้อยู่ในหน้าเว็บได้ ข้อมูลถูกป้องกันด้วย Row Level Security (สมาชิกเห็นได้เฉพาะข้อมูลของตัวเอง)
> **ห้ามใช้ `service_role` key** เด็ดขาด

## 5 · อัปเดตเว็บ
แท็บ **Actions** → **Deploy to GitHub Pages** → **Run workflow** รอประมาณ 1 นาที
เปิดเว็บ กด **สมัครฟรี** แล้วลองสมัครด้วยอีเมลของคุณ

## ถ้ามีปัญหา
| อาการ | วิธีแก้ |
| --- | --- |
| หน้า Login ยังขึ้นว่า "ระบบสมาชิกกำลังจะเปิดเร็ว ๆ นี้" | ตรวจชื่อ Variable ให้ตรงทุกตัวอักษร แล้ว Run deploy ใหม่ |
| สมัครแล้วไม่ได้อีเมล | ดูในจดหมายขยะ ระบบอีเมลฟรีของ Supabase ส่งได้จำกัดต่อชั่วโมง |
| หน้าสมาชิกขึ้น "ยังไม่ได้สร้างตาราง user_progress" | รันไฟล์ `supabase/member-sync.sql` (ขั้นที่ 2) |
| กดลิงก์ยืนยันแล้วไปหน้า localhost | ตั้ง Site URL ตามขั้นที่ 3 |
