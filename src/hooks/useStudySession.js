import { useEffect, useRef } from 'react'
import { getDeviceId } from '../utils/deviceId'
import { recordStudySeconds, recordStudySessionStarted } from '../utils/localStats'
import { sendLearningEvent, sendPublicHeartbeat } from '../utils/globalStats'
import { isStudyPage } from '../utils/studySession'

const INACTIVITY_LIMIT_MS = 60_000

export function useStudySession(page) {
  const lastActivityRef = useRef(0)
  const lastTickRef = useRef(0)
  const pendingStudySecondsRef = useRef(0)
  const heartbeatTicksRef = useRef(0)

  useEffect(() => {
    const now = Date.now()
    lastActivityRef.current = now
    lastTickRef.current = now
    getDeviceId()
    recordStudySessionStarted()
  }, [])

  useEffect(() => {
    const markActive = () => {
      lastActivityRef.current = Date.now()
    }

    const events = ['mousemove', 'keydown', 'touchstart', 'scroll']
    events.forEach((eventName) => window.addEventListener(eventName, markActive, { passive: true }))
    document.addEventListener('visibilitychange', markActive)
    return () => {
      events.forEach((eventName) => window.removeEventListener(eventName, markActive))
      document.removeEventListener('visibilitychange', markActive)
    }
  }, [])

  useEffect(() => {
    if (!isStudyPage(page)) return undefined

    lastTickRef.current = Date.now()
    sendPublicHeartbeat(page)

    const intervalId = window.setInterval(() => {
      const now = Date.now()
      const visible = !document.hidden
      const active = now - lastActivityRef.current <= INACTIVITY_LIMIT_MS
      const deltaSeconds = Math.min(15, Math.max(0, Math.round((now - lastTickRef.current) / 1000)))
      lastTickRef.current = now

      heartbeatTicksRef.current += 1
      if (heartbeatTicksRef.current >= 2) {
        heartbeatTicksRef.current = 0
        sendPublicHeartbeat(page)
      }

      if (!visible || !active || deltaSeconds <= 0) return

      recordStudySeconds(deltaSeconds)
      pendingStudySecondsRef.current += deltaSeconds

      if (pendingStudySecondsRef.current >= 60) {
        const seconds = pendingStudySecondsRef.current
        pendingStudySecondsRef.current = 0
        sendLearningEvent('study_seconds', { seconds })
      }
    }, 15_000)

    return () => window.clearInterval(intervalId)
  }, [page])
}
