import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/english-scholarship-trainer/',
  plugins: [react()],
  // ข้อสอบ 240 ข้อพร้อมเฉลยรวมอยู่ในไฟล์เดียว จึงใหญ่กว่าค่าเตือนปกติ
  build: { chunkSizeWarningLimit: 900 },
})
