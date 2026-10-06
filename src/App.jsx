import { useEffect } from 'react'
import Home from './pages/Home'
import Exams from './pages/Exams'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Grammar from './pages/Grammar'
import Topic from './pages/Topic'
import { href, useRoute } from './lib/router'
import { stopSpeaking } from './lib/speech'

function matchRoute(path, query, visit) {
  let match
  if (path === '/') return { nav: 'home', page: <Home /> }
  if (path === '/exam') return { nav: 'exam', page: <Exams /> }
  if ((match = path.match(/^\/exam\/([^/]+)(?:\/(timed|review))?$/))) {
    const [, setId, mode = 'practice'] = match
    return { nav: 'exam', focus: true, page: <Quiz key={`${setId}:${mode}:${visit}`} setId={setId} mode={mode} query={query} /> }
  }
  if ((match = path.match(/^\/result\/([^/]+)$/))) return { nav: 'exam', page: <Result setId={match[1]} query={query} /> }
  if (path === '/grammar') return { nav: 'grammar', page: <Grammar /> }
  if ((match = path.match(/^\/grammar\/([^/]+)$/))) return { nav: 'grammar', page: <Topic key={match[1]} id={match[1]} /> }
  return { nav: 'home', page: <Home /> }
}

const NAV = [
  { id: 'home', label: 'หน้าแรก', to: '/' },
  { id: 'exam', label: 'ข้อสอบ', to: '/exam' },
  { id: 'grammar', label: 'แกรมม่า', to: '/grammar' },
]

export default function App() {
  const { path, query, visit } = useRoute()
  const route = matchRoute(path, query, visit)

  useEffect(() => {
    stopSpeaking()
  }, [path])

  return (
    <div className={`app${route.focus ? ' is-focus' : ''}`}>
      {!route.focus && (
        <header className="topbar">
          <div className="topbar-inner">
            <a className="brand" href={href('/')}>
              <span className="brand-mark" aria-hidden="true">E</span>
              <span>ติวทุนอังกฤษ</span>
            </a>
            <nav className="nav" aria-label="เมนูหลัก">
              {NAV.map((item) => (
                <a key={item.id} href={href(item.to)} className={route.nav === item.id ? 'is-active' : undefined}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>
      )}
      <main>{route.page}</main>
      {!route.focus && (
        <footer className="footer">
          <p>ข้อสอบทุกข้อแต่งขึ้นใหม่ตามแนวข้อสอบจริง เพื่อการเรียนเท่านั้น · ความคืบหน้าบันทึกไว้ในเครื่องนี้</p>
          <p>
            โอเพนซอร์ส ·{' '}
            <a href="https://github.com/kawinthorn11-collab/english-scholarship-trainer" target="_blank" rel="noreferrer">
              ร่วมพัฒนาบน GitHub
            </a>
          </p>
        </footer>
      )}
    </div>
  )
}
