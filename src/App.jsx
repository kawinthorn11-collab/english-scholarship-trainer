import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import MockExam from './pages/MockExam'
import Practice from './pages/Practice'
import Results from './pages/Results'
import GrammarHub from './pages/GrammarHub'
import GrammarLesson from './pages/GrammarLesson'
import GrammarDrill from './pages/GrammarDrill'
import GrammarAcademy from './pages/GrammarAcademy'
import GrammarAcademyUnit from './pages/GrammarAcademyUnit'
import GrammarAcademyDrill from './pages/GrammarAcademyDrill'
import ListeningPractice from './pages/ListeningPractice'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import ConfirmModal from './components/ConfirmModal'
import Landing from './pages/Landing'
import MascotHelper from './components/MascotHelper'
import { AuroraBackground, BrandLogo, ScrollProgress, SiteFooter } from './components/AppChrome'
import { useScrollReveal } from './hooks/useScrollReveal'
import { DEFAULT_SET_ID } from './data/examSets/index.js'
import { getSelectedSetId, saveSelectedSetId } from './utils/storage'
import { useAuth } from './context/AuthContext'
import { useStudySession } from './hooks/useStudySession'

const pagePaths = {
  landing: '/',
  dashboard: '/dashboard',
  'mock-exam': '/exam',
  practice: '/practice',
  results: '/results',
  grammar: '/grammar',
  academy: '/academy',
  listening: '/listening',
  login: '/login',
  register: '/register',
  account: '/account',
}

const productionBasePath = import.meta.env.PROD ? import.meta.env.BASE_URL : '/'

function normalizeAppPath(path) {
  if (!path || path === '') return '/'
  return path.startsWith('/') ? path : `/${path}`
}

function stripBasePath(pathname) {
  const path = normalizeAppPath(pathname)
  if (productionBasePath === '/') return path

  const base = productionBasePath.replace(/\/$/, '')
  if (path === base) return '/'
  if (path.startsWith(`${base}/`)) return normalizeAppPath(path.slice(base.length))
  return path
}

function toBrowserPath(appPath) {
  const path = normalizeAppPath(appPath)
  if (productionBasePath === '/') return path
  return `${productionBasePath.replace(/\/$/, '')}${path}`
}

function getRedirectPathFromLocation() {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const redirect = params.get('redirect')
  if (!redirect || !redirect.startsWith('/')) return null
  return redirect
}

function getRouteFromPathname(path) {
  if (path === '/') return { page: 'landing', lessonId: null }
  if (path === '/dashboard') return { page: 'dashboard', lessonId: null }
  if (path === '/exam') return { page: 'mock-exam', lessonId: null }
  if (path === '/practice') return { page: 'practice', lessonId: null }
  if (path === '/results') return { page: 'results', lessonId: null }
  if (path === '/grammar') return { page: 'grammar', lessonId: null }
  if (path === '/academy') return { page: 'academy', lessonId: null, academyModuleId: null, academyUnitId: null }
  if (path === '/listening') return { page: 'listening', lessonId: null, academyModuleId: null, academyUnitId: null }
  if (path === '/login') return { page: 'login', lessonId: null }
  if (path === '/register') return { page: 'register', lessonId: null }
  if (path === '/account') return { page: 'account', lessonId: null }

  const drillMatch = path.match(/^\/grammar\/([^/]+)\/drill$/)
  if (drillMatch) return { page: 'grammar-drill', lessonId: decodeURIComponent(drillMatch[1]) }

  const lessonMatch = path.match(/^\/grammar\/([^/]+)$/)
  if (lessonMatch) return { page: 'grammar-lesson', lessonId: decodeURIComponent(lessonMatch[1]) }

  const academyDrillMatch = path.match(/^\/academy\/([^/]+)\/([^/]+)\/drill$/)
  if (academyDrillMatch) {
    return {
      page: 'academy-drill',
      lessonId: null,
      academyModuleId: decodeURIComponent(academyDrillMatch[1]),
      academyUnitId: decodeURIComponent(academyDrillMatch[2]),
    }
  }

  const academyUnitMatch = path.match(/^\/academy\/([^/]+)\/([^/]+)$/)
  if (academyUnitMatch) {
    return {
      page: 'academy-unit',
      lessonId: null,
      academyModuleId: decodeURIComponent(academyUnitMatch[1]),
      academyUnitId: decodeURIComponent(academyUnitMatch[2]),
    }
  }

  const academyModuleMatch = path.match(/^\/academy\/([^/]+)$/)
  if (academyModuleMatch) {
    return {
      page: 'academy-module',
      lessonId: null,
      academyModuleId: decodeURIComponent(academyModuleMatch[1]),
      academyUnitId: null,
    }
  }

  return { page: 'landing', lessonId: null }
}

function getRouteFromPath() {
  if (typeof window === 'undefined') return { page: 'landing', lessonId: null }
  const appPath = stripBasePath(window.location.pathname)
  const restoredPath = appPath === '/' ? getRedirectPathFromLocation() : null
  return getRouteFromPathname(restoredPath || appPath)
}

function getPageFromPath() {
  return getRouteFromPath().page
}

function getLessonFromPath() {
  return getRouteFromPath().lessonId
}

function getAcademyModuleFromPath() {
  return getRouteFromPath().academyModuleId
}

function getAcademyUnitFromPath() {
  return getRouteFromPath().academyUnitId
}

function getPathForPage(page, lessonId, academyModuleId, academyUnitId) {
  if (page === 'grammar-lesson' && lessonId) return `/grammar/${encodeURIComponent(lessonId)}`
  if (page === 'grammar-drill' && lessonId) return `/grammar/${encodeURIComponent(lessonId)}/drill`
  if (page === 'academy-module' && academyModuleId) return `/academy/${encodeURIComponent(academyModuleId)}`
  if (page === 'academy-unit' && academyModuleId && academyUnitId) return `/academy/${encodeURIComponent(academyModuleId)}/${encodeURIComponent(academyUnitId)}`
  if (page === 'academy-drill' && academyModuleId && academyUnitId) return `/academy/${encodeURIComponent(academyModuleId)}/${encodeURIComponent(academyUnitId)}/drill`
  return pagePaths[page] || '/'
}

function App() {
  const [page, setPage] = useState(getPageFromPath)
  const [examInProgress, setExamInProgress] = useState(false)
  const [navGuard, setNavGuard] = useState(null)
  const [selectedSetId, setSelectedSetIdState] = useState(() => getSelectedSetId() || DEFAULT_SET_ID)
  const [selectedLessonId, setSelectedLessonId] = useState(getLessonFromPath)
  const [selectedAcademyModuleId, setSelectedAcademyModuleId] = useState(getAcademyModuleFromPath)
  const [selectedAcademyUnitId, setSelectedAcademyUnitId] = useState(getAcademyUnitFromPath)
  const [menuOpen, setMenuOpen] = useState(false)
  useStudySession(page)
  const routeKey = `${page}|${selectedLessonId || ''}|${selectedAcademyModuleId || ''}|${selectedAcademyUnitId || ''}`
  useScrollReveal(routeKey)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [routeKey])

  const changeSet = (setId) => {
    setSelectedSetIdState(setId)
    saveSelectedSetId(setId)
  }

  useEffect(() => {
    const appPath = stripBasePath(window.location.pathname)
    const restoredPath = appPath === '/' ? getRedirectPathFromLocation() : null
    if (restoredPath) {
      window.history.replaceState({}, '', toBrowserPath(restoredPath))
    }

    const handlePopState = () => {
      const route = getRouteFromPath()
      setPage(route.page)
      setSelectedLessonId(route.lessonId)
      setSelectedAcademyModuleId(route.academyModuleId)
      setSelectedAcademyUnitId(route.academyUnitId)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const commitNavigation = (
    target,
    {
      replace = false,
      lessonId = selectedLessonId,
      academyModuleId = selectedAcademyModuleId,
      academyUnitId = selectedAcademyUnitId,
    } = {}
  ) => {
    setPage(target)
    if (target === 'grammar-lesson' || target === 'grammar-drill') {
      setSelectedLessonId(lessonId)
    }
    if (target === 'academy') {
      setSelectedAcademyModuleId(null)
      setSelectedAcademyUnitId(null)
    }
    if (target === 'academy-module') {
      setSelectedAcademyModuleId(academyModuleId)
      setSelectedAcademyUnitId(null)
    }
    if (target === 'academy-unit' || target === 'academy-drill') {
      setSelectedAcademyModuleId(academyModuleId)
      setSelectedAcademyUnitId(academyUnitId)
    }

    const nextPath = getPathForPage(target, lessonId, academyModuleId, academyUnitId)
    const browserPath = toBrowserPath(nextPath)
    if (browserPath && window.location.pathname !== browserPath) {
      const method = replace ? 'replaceState' : 'pushState'
      window.history[method]({}, '', browserPath)
    }
  }

  const navigate = (target, options = {}) => {
    setMenuOpen(false)
    if (target === 'login') {
      setExamInProgress(false)
      setNavGuard(null)
      commitNavigation(target, options)
      return
    }
    if (examInProgress && page === 'mock-exam' && target !== 'mock-exam') {
      setNavGuard({ target })
      return
    }
    commitNavigation(target, options)
  }

  const navigatePath = (path, { replace = false } = {}) => {
    const route = getRouteFromPathname(path)
    setPage(route.page)
    setSelectedLessonId(route.lessonId)
    setSelectedAcademyModuleId(route.academyModuleId)
    setSelectedAcademyUnitId(route.academyUnitId)
    const method = replace ? 'replaceState' : 'pushState'
    window.history[method]({}, '', toBrowserPath(path))
  }

  const confirmLeaveExam = () => {
    setExamInProgress(false)
    commitNavigation(navGuard.target)
    setNavGuard(null)
  }

  const cancelLeaveExam = () => {
    setNavGuard(null)
  }

  const handleExamStart = () => setExamInProgress(true)
  const handleExamEnd = () => setExamInProgress(false)

  const selectLesson = (lessonId) => {
    setSelectedLessonId(lessonId)
    commitNavigation('grammar-lesson', { lessonId })
  }

  const startDrill = (lessonId) => {
    setSelectedLessonId(lessonId)
    commitNavigation('grammar-drill', { lessonId })
  }

  const selectAcademyModule = (moduleId) => {
    commitNavigation('academy-module', { academyModuleId: moduleId, academyUnitId: null })
  }

  const selectAcademyUnit = (moduleId, unitId) => {
    if (!unitId) {
      selectAcademyModule(moduleId)
      return
    }
    commitNavigation('academy-unit', { academyModuleId: moduleId, academyUnitId: unitId })
  }

  const startAcademyDrill = (moduleId, unitId) => {
    commitNavigation('academy-drill', { academyModuleId: moduleId, academyUnitId: unitId })
  }

  const mainWidth = page === 'landing'
    ? 'max-w-6xl'
    : ['dashboard', 'grammar', 'academy', 'academy-module'].includes(page) ? 'max-w-5xl' : 'max-w-4xl'

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: '🏠', active: page === 'dashboard' },
    { key: 'mock-exam', label: 'Exam', icon: '📝', active: page === 'mock-exam' },
    { key: 'practice', label: 'Practice', icon: '🏋️', active: page === 'practice' },
    { key: 'grammar', label: 'Grammar', icon: '📖', active: page.startsWith('grammar') },
    { key: 'academy', label: 'Academy', icon: '🎓', active: page.startsWith('academy') },
    { key: 'listening', label: 'Listening', icon: '🎧', active: page === 'listening' },
    { key: 'results', label: 'Results', icon: '📊', active: page === 'results' },
  ]

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-white">
      <AuroraBackground />
      {navGuard && (
        <ConfirmModal
          title="ออกจากการสอบ?"
          message="คุณกำลังทำข้อสอบอยู่ ถ้าออกตอนนี้คำตอบทั้งหมดจะหายไป แน่ใจหรือไม่?"
          confirmLabel="ออกจากการสอบ"
          tone="danger"
          onConfirm={confirmLeaveExam}
          onCancel={cancelLeaveExam}
        />
      )}

      <nav className="sticky top-0 z-50 h-16 border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4">
          <BrandLogo onClick={() => navigate('landing')} />

          <div className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] p-1 xl:flex">
            {navItems.map((item) => (
              <NavBtn key={item.key} label={item.label} icon={item.icon} active={item.active} onClick={() => navigate(item.key)} />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 xl:flex">
              <AuthNavButtons page={page} onNavigate={navigate} />
            </div>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] transition hover:bg-white/10 xl:hidden"
              aria-label="เมนู"
              aria-expanded={menuOpen}
            >
              <span className="relative block h-3.5 w-5">
                <span className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-white transition ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
                <span className={`absolute left-0 top-[6px] h-0.5 w-5 rounded bg-white transition ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`absolute left-0 top-3 h-0.5 w-5 rounded bg-white transition ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
        <ScrollProgress />

        {menuOpen && (
          <div className="glass-strong absolute inset-x-3 top-[4.5rem] animate-pop rounded-3xl p-4 xl:hidden">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => navigate(item.key)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold transition ${item.active ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg' : 'bg-white/[0.04] text-purple-100 hover:bg-white/10'}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-white/10 pt-3">
              <AuthNavButtons page={page} onNavigate={navigate} />
            </div>
          </div>
        )}
      </nav>

      <main className={`relative z-10 mx-auto ${mainWidth} px-4 pb-32 pt-8 sm:pt-10`}>
        <div key={routeKey} data-page-root className="page-enter">
        {page === 'login' && <Login onNavigate={navigate} onNavigatePath={navigatePath} />}
        {page === 'register' && <Register onNavigate={navigate} onNavigatePath={navigatePath} />}
            {page === 'landing' && <Landing onNavigate={navigate} />}
            {page === 'dashboard' && <Dashboard onNavigate={navigate} selectedSetId={selectedSetId} onChangeSet={changeSet} onSelectLesson={selectLesson} />}
            {page === 'mock-exam' && (
              <MockExam
                selectedSetId={selectedSetId}
                onNavigate={(target) => { handleExamEnd(); navigate(target); }}
                onExamStart={handleExamStart}
                onExamEnd={handleExamEnd}
              />
            )}
            {page === 'practice' && <Practice selectedSetId={selectedSetId} onNavigate={navigate} />}
            {page === 'results' && <Results selectedSetId={selectedSetId} onNavigate={navigate} onSelectLesson={selectLesson} />}
            {page === 'grammar' && <GrammarHub onNavigate={navigate} onSelectLesson={selectLesson} />}
            {page === 'listening' && <ListeningPractice onNavigate={navigate} />}
            {page === 'academy' && (
              <GrammarAcademy
                onNavigate={navigate}
                onSelectAcademyModule={selectAcademyModule}
                onSelectAcademyUnit={selectAcademyUnit}
              />
            )}
            {page === 'academy-module' && (
              <GrammarAcademy
                moduleId={selectedAcademyModuleId}
                onNavigate={navigate}
                onSelectAcademyModule={selectAcademyModule}
                onSelectAcademyUnit={selectAcademyUnit}
              />
            )}
            {page === 'academy-unit' && (
              <GrammarAcademyUnit
                key={`${selectedAcademyModuleId}-${selectedAcademyUnitId}`}
                moduleId={selectedAcademyModuleId}
                unitId={selectedAcademyUnitId}
                onNavigate={navigate}
                onSelectAcademyUnit={selectAcademyUnit}
                onStartAcademyDrill={startAcademyDrill}
              />
            )}
            {page === 'academy-drill' && (
              <GrammarAcademyDrill
                key={`${selectedAcademyModuleId}-${selectedAcademyUnitId}-drill`}
                moduleId={selectedAcademyModuleId}
                unitId={selectedAcademyUnitId}
                onNavigate={navigate}
                onSelectAcademyUnit={selectAcademyUnit}
              />
            )}
            {page === 'grammar-lesson' && (
              <GrammarLesson
                lessonId={selectedLessonId}
                onNavigate={navigate}
                onStartDrill={startDrill}
              />
            )}
            {page === 'grammar-drill' && (
              <GrammarDrill
                lessonId={selectedLessonId}
                onNavigate={navigate}
                onSelectLesson={selectLesson}
              />
            )}
            {page === 'account' && <Account onNavigate={navigate} />}
        </div>
      </main>

      {page !== 'mock-exam' && <SiteFooter onNavigate={navigate} />}
      <MascotHelper page={page} />
    </div>
  )
}

function NavBtn({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300 ${active ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_8px_24px_-8px_rgba(192,38,211,0.8)]' : 'text-purple-200/80 hover:bg-white/[0.07] hover:text-white'}`}
    >
      <span className={`text-base transition-transform duration-300 ${active ? 'scale-110' : ''}`}>{icon}</span>
      {label}
    </button>
  )
}

function AuthNavButtons({ page, onNavigate }) {
  const { isAuthenticated, user, signOut } = useAuth()
  const pill = (active) => `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${active ? 'bg-white/15 text-white' : 'text-purple-200/90 hover:bg-white/[0.08] hover:text-white'}`

  if (isAuthenticated) {
    return (
      <>
        <button onClick={() => onNavigate('account')} className={pill(page === 'account')} title={user?.email}>
          👤 {user?.user_metadata?.display_name || 'Account'}
        </button>
        <button
          onClick={async () => { await signOut(); onNavigate('dashboard', { replace: true }) }}
          className="rounded-full px-4 py-2 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/10"
        >
          Logout
        </button>
      </>
    )
  }

  // Guest mode or not authenticated — keep the app open and offer optional auth.
  return (
    <>
      <button onClick={() => onNavigate('login')} className={pill(page === 'login')}>
        Login
      </button>
      <button
        onClick={() => onNavigate('register')}
        className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-bold text-violet-700 shadow-lg shadow-violet-900/30 transition hover:-translate-y-0.5 hover:bg-violet-50"
      >
        สมัครฟรี
      </button>
    </>
  )
}

export default App
