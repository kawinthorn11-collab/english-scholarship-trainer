import { useEffect, useState } from 'react'
import './App.css'
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
import { DEFAULT_SET_ID } from './data/examSets/index.js'
import { getSelectedSetId, saveSelectedSetId } from './utils/storage'
import { useAuth } from './context/AuthContext'
import { useStudySession } from './hooks/useStudySession'

const features = [
  { icon: '📝', title: 'Mock Exam Mode', desc: 'Simulate the real 60-question, 60-minute exam' },
  { icon: '📖', title: 'Grammar Practice', desc: 'Focus on Part I grammar questions' },
  { icon: '📚', title: 'Reading Practice', desc: 'Focus on Part II reading comprehension' },
  { icon: '💡', title: 'Detailed Explanation Mode', desc: 'Learn why each answer is correct' },
  { icon: '🎯', title: 'Weak Point Analysis', desc: 'Identify and improve your weak areas' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Track your scores over time' },
]

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

function LandingPage({ onNavigate }) {
  return (
    <div>
      <header className="flex flex-col items-center justify-center px-4 pt-16 pb-12 text-center">
        <div className="mb-4 text-5xl">🎓</div>
        <h1 className="text-4xl font-bold tracking-tight text-purple-100 sm:text-5xl md:text-6xl">
          English Scholarship Exam Trainer
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-purple-200/80 sm:text-xl">
          เว็บฝึกข้อสอบภาษาอังกฤษสำหรับสอบชิงทุน พร้อมโหมดเฉลยละเอียดและวิเคราะห์จุดอ่อน
        </p>
      </header>
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-purple-700/40 bg-purple-900/30 p-6 backdrop-blur transition hover:border-purple-500/60 hover:bg-purple-900/50">
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="mb-1 text-lg font-semibold text-purple-100">{f.title}</h3>
              <p className="text-sm text-purple-300/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col items-center px-4 pb-16">
        <button type="button" onClick={() => onNavigate('dashboard')} className="rounded-full bg-purple-600 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-purple-900/50 transition hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#1a0a2e]">
          Start Learning
        </button>
        <p className="mt-6 text-xs text-purple-400/60">Private study app. Original practice questions only.</p>
      </section>
    </div>
  )
}

function App() {
  const [page, setPage] = useState(getPageFromPath)
  const [examInProgress, setExamInProgress] = useState(false)
  const [navGuard, setNavGuard] = useState(null)
  const [selectedSetId, setSelectedSetIdState] = useState(() => getSelectedSetId() || DEFAULT_SET_ID)
  const [selectedLessonId, setSelectedLessonId] = useState(getLessonFromPath)
  const [selectedAcademyModuleId, setSelectedAcademyModuleId] = useState(getAcademyModuleFromPath)
  const [selectedAcademyUnitId, setSelectedAcademyUnitId] = useState(getAcademyUnitFromPath)
  useStudySession(page)

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

  return (
    <div className="min-h-screen bg-[#1a0a2e] text-white">
      {navGuard && (
        <ConfirmModal
          title="Leave Exam?"
          message="You have an exam in progress. If you leave now, your answers will be lost. Are you sure?"
          onConfirm={confirmLeaveExam}
          onCancel={cancelLeaveExam}
        />
      )}

      <nav className="sticky top-0 z-50 border-b border-purple-700/40 bg-[#1a0a2e]/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <button onClick={() => navigate('landing')} className="text-lg font-bold text-purple-200 transition hover:text-white">
              🎓 Exam Trainer
            </button>
            <div className="flex flex-wrap gap-2">
              <NavBtn label="Dashboard" active={page === 'dashboard'} onClick={() => navigate('dashboard')} />
              <NavBtn label="Exam" active={page === 'mock-exam'} onClick={() => navigate('mock-exam')} />
              <NavBtn label="Practice" active={page === 'practice'} onClick={() => navigate('practice')} />
              <NavBtn label="Grammar" active={page.startsWith('grammar')} onClick={() => navigate('grammar')} />
              <NavBtn label="Academy" active={page.startsWith('academy')} onClick={() => navigate('academy')} />
              <NavBtn label="Listening" active={page === 'listening'} onClick={() => navigate('listening')} />
              <NavBtn label="Results" active={page === 'results'} onClick={() => navigate('results')} />
              <AuthNavButtons page={page} onNavigate={navigate} />
            </div>
          </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-8">
        {page === 'login' && <Login onNavigate={navigate} onNavigatePath={navigatePath} />}
        {page === 'register' && <Register onNavigate={navigate} onNavigatePath={navigatePath} />}
            {page === 'landing' && <LandingPage onNavigate={navigate} />}
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
      </main>
    </div>
  )
}

function NavBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${active ? 'bg-purple-700 text-white' : 'text-purple-300 hover:bg-purple-900/40 hover:text-purple-100'}`}>
      {label}
    </button>
  )
}

function AuthNavButtons({ page, onNavigate }) {
  const { isAuthenticated, user, signOut } = useAuth()

  if (isAuthenticated) {
    return (
      <>
        <button
          onClick={() => onNavigate('account')}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${page === 'account' ? 'bg-purple-700 text-white' : 'text-purple-300 hover:bg-purple-900/40 hover:text-purple-100'}`}
          title={user?.email}
        >
          👤 {user?.user_metadata?.display_name || 'Account'}
        </button>
        <button
          onClick={async () => { await signOut(); onNavigate('dashboard', { replace: true }) }}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-300 transition hover:bg-red-900/30"
        >
          Logout
        </button>
      </>
    )
  }

  // Guest mode or not authenticated — keep the app open and offer optional auth.
  return (
    <>
      <button
        onClick={() => onNavigate('login')}
        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${page === 'login' ? 'bg-purple-700 text-white' : 'text-purple-300 hover:bg-purple-900/40 hover:text-purple-100'}`}
      >
        🔐 Login
      </button>
      <button
        onClick={() => onNavigate('register')}
        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${page === 'register' ? 'bg-purple-700 text-white' : 'text-purple-300 hover:bg-purple-900/40 hover:text-purple-100'}`}
      >
        Register
      </button>
    </>
  )
}

export default App
