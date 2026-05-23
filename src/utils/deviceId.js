const DEVICE_ID_KEY = 'examTrainerDeviceId'
let memoryDeviceId = null

function createFallbackId() {
  return `device-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function getDeviceId() {
  if (typeof localStorage === 'undefined') {
    if (!memoryDeviceId) memoryDeviceId = createFallbackId()
    return memoryDeviceId
  }

  const existing = localStorage.getItem(DEVICE_ID_KEY)
  if (existing) return existing

  const nextId = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : createFallbackId()
  localStorage.setItem(DEVICE_ID_KEY, nextId)
  return nextId
}
