// Member cloud sync: keeps a logged-in member's learning progress in Supabase
// (table public.user_progress, one row per member, see supabase/member-sync.sql)
// so it follows them to any device. Guests keep using localStorage only.
import { supabase } from '../lib/supabaseClient'

// localStorage keys that hold learning progress
export const SYNCED_KEYS = [
  'exam-trainer-attempts',
  'exam-trainer-grammar-progress',
  'exam-trainer-academy-progress',
  'exam-trainer-local-stats',
  'exam-trainer-selected-set',
  'mk-mistakes-v1',
  'mk-cards-v1',
  'mk-plan-v1',
  'mk-intl-best-v1',
  'duo-lessons-done',
]

const listeners = new Set()
let status = { state: 'idle', lastSyncedAt: null, error: null }

export function subscribeSync(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getSyncStatus() {
  return status
}

function setStatus(next) {
  status = { ...status, ...next }
  listeners.forEach((l) => l(status))
}

function readLocal(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw == null ? undefined : JSON.parse(raw)
  } catch {
    try {
      return localStorage.getItem(key) ?? undefined
    } catch {
      return undefined
    }
  }
}

function writeLocal(key, value) {
  try {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
  } catch {
    // storage is optional
  }
}

export function snapshotLocal() {
  const data = {}
  for (const key of SYNCED_KEYS) {
    const value = readLocal(key)
    if (value !== undefined) data[key] = value
  }
  return data
}

function itemId(item) {
  return item && typeof item === 'object' ? item.id ?? item.date ?? JSON.stringify(item) : item
}

/** Merge two values of the same key without losing progress from either side. */
export function mergeValue(remote, local) {
  if (remote === undefined) return local
  if (local === undefined) return remote
  if (Array.isArray(remote) && Array.isArray(local)) {
    const seen = new Map()
    for (const item of [...remote, ...local]) seen.set(itemId(item), item)
    return [...seen.values()]
  }
  if (remote && local && typeof remote === 'object' && typeof local === 'object') {
    const out = { ...remote }
    for (const [k, v] of Object.entries(local)) {
      const r = remote[k]
      if (typeof r === 'number' && typeof v === 'number') out[k] = Math.max(r, v)
      else if (r && v && typeof r === 'object' && typeof v === 'object') out[k] = mergeValue(r, v)
      else out[k] = v
    }
    return out
  }
  return local
}

let lastPushed = ''

async function push(userId) {
  const data = snapshotLocal()
  const serialized = JSON.stringify(data)
  if (serialized === lastPushed) return
  const { error } = await supabase
    .from('user_progress')
    .upsert({ user_id: userId, data, updated_at: new Date().toISOString() })
  if (error) throw error
  lastPushed = serialized
  setStatus({ state: 'synced', lastSyncedAt: Date.now(), error: null })
}

/** Pull the member's saved progress, merge it with this device, and save back. */
export async function syncNow(userId) {
  if (!supabase || !userId) return
  setStatus({ state: 'syncing', error: null })
  try {
    const { data: row, error } = await supabase
      .from('user_progress')
      .select('data')
      .eq('user_id', userId)
      .maybeSingle()
    if (error) throw error
    const remote = row?.data || {}
    for (const key of SYNCED_KEYS) {
      const merged = mergeValue(remote[key], readLocal(key))
      if (merged !== undefined) writeLocal(key, merged)
    }
    lastPushed = ''
    await push(userId)
  } catch (err) {
    const missingTable = /user_progress|relation|schema cache/i.test(err?.message || '')
    setStatus({
      state: 'error',
      error: missingTable
        ? 'ยังไม่ได้สร้างตาราง user_progress ใน Supabase (รันไฟล์ supabase/member-sync.sql)'
        : err?.message || 'ซิงก์ไม่สำเร็จ',
    })
  }
}

/** Start background sync for a logged-in member; returns a stop function. */
export function startAutoSync(userId) {
  if (!supabase || !userId) return () => {}
  syncNow(userId)
  const tick = () => {
    if (status.state === 'error') return
    push(userId).catch((err) => setStatus({ state: 'error', error: err?.message || 'ซิงก์ไม่สำเร็จ' }))
  }
  const id = window.setInterval(tick, 30_000)
  const onHide = () => { if (document.visibilityState === 'hidden') tick() }
  document.addEventListener('visibilitychange', onHide)
  return () => {
    window.clearInterval(id)
    document.removeEventListener('visibilitychange', onHide)
  }
}

export function resetSyncStatus() {
  lastPushed = ''
  setStatus({ state: 'idle', lastSyncedAt: null, error: null })
}
