// Router แบบ hash (#/exam/setM) ใช้ได้บน GitHub Pages โดยไม่ต้องตั้งค่าอะไรเพิ่ม
import { useEffect, useState } from 'react'

let visits = 0

/** visit เพิ่มทุกครั้งที่ hash เปลี่ยน ใช้เป็น key ให้หน้าเริ่มใหม่เมื่อกดลิงก์ */
function readLocation() {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [path, search = ''] = raw.split('?')
  visits += 1
  return { path: path || '/', query: new URLSearchParams(search), visit: visits }
}

export function useRoute() {
  const [location, setLocation] = useState(readLocation)
  useEffect(() => {
    const onChange = () => setLocation(readLocation())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return location
}

export function navigate(to) {
  if (window.location.hash !== `#${to}`) window.location.hash = to
  window.scrollTo({ top: 0 })
}

/** เปลี่ยน URL โดยไม่เพิ่มประวัติ ใช้ตอนเลื่อนข้อ */
export function replaceQuery(path, query) {
  const search = new URLSearchParams(query).toString()
  window.history.replaceState(null, '', `#${path}${search ? `?${search}` : ''}`)
}

export function href(to) {
  return `#${to}`
}
