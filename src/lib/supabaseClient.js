import { createClient } from '@supabase/supabase-js'

const viteEnv = import.meta.env || {}
const supabaseUrl = (viteEnv.VITE_SUPABASE_URL || '').trim()
const supabaseAnonKey = (viteEnv.VITE_SUPABASE_ANON_KEY || '').trim()
const placeholderValues = new Set([
  '',
  'your-anon-key-here',
  'PASTE_ANON_KEY_HERE',
  'PASTE_ANON_PUBLIC_KEY_HERE',
])
const hasSupabaseConfig =
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey &&
  !placeholderValues.has(supabaseAnonKey)

/**
 * Supabase client instance.
 * Returns null if env vars are not configured (guest/demo mode).
 */
export const supabase =
  hasSupabaseConfig
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

/**
 * Check if Supabase is configured and available.
 */
export function isSupabaseConfigured() {
  return supabase !== null
}

export function getSupabaseDebugInfo() {
  let supabaseHost
  try {
    supabaseHost = supabaseUrl ? new URL(supabaseUrl).host : ''
  } catch {
    supabaseHost = 'invalid-url'
  }

  return {
    supabaseConfigured: isSupabaseConfigured(),
    supabaseHost,
    hasAnonKey: Boolean(supabaseAnonKey),
    keyPrefix: supabaseAnonKey.slice(0, 12),
    keyLength: supabaseAnonKey.length,
  }
}

export async function checkSupabaseConnectivity() {
  if (!supabaseUrl) {
    return { ok: false, status: null, errorName: 'MissingUrl', errorMessage: 'Missing Supabase URL' }
  }

  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      method: 'GET',
      headers: supabaseAnonKey ? { apikey: supabaseAnonKey } : {},
    })

    return {
      ok: response.ok,
      status: response.status,
      errorName: null,
      errorMessage: null,
    }
  } catch (error) {
    return {
      ok: false,
      status: null,
      errorName: error?.name || 'FetchError',
      errorMessage: error?.message || 'Failed to fetch',
    }
  }
}
