import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const AuthContext = createContext(null)

/**
 * AuthProvider wraps the app and provides:
 * - user: current Supabase user object (or null)
 * - session: current session (or null)
 * - subscription: user's subscription data (or null)
 * - loading: true while checking initial session
 * - signUp, signIn, signOut helpers
 *
 * In guest/demo mode (no Supabase configured), all values are null
 * and the app works with localStorage only.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false) // eslint-disable-line react-hooks/set-state-in-effect
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) fetchSubscription(s.user.id)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(
      (_event, s) => {
        setSession(s)
        setUser(s?.user ?? null)
        if (s?.user) {
          fetchSubscription(s.user.id)
        } else {
          setSubscription(null)
        }
      }
    )

    return () => authListener.unsubscribe()
  }, [])

  async function fetchSubscription(userId) {
    if (!supabase) return
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .maybeSingle()
    setSubscription(data)
  }

  async function signUp(email, password, displayName) {
    if (!supabase) return { error: { message: 'Supabase not configured' } }
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } },
      })
      if (data?.session) {
        setSession(data.session)
        setUser(data.user ?? null)
        if (data.user) fetchSubscription(data.user.id)
      }
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  async function signIn(email, password) {
    if (!supabase) return { error: { message: 'Supabase not configured' } }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (data?.session) {
      setSession(data.session)
      setUser(data.user ?? null)
      if (data.user) fetchSubscription(data.user.id)
    }
    return { data, error }
  }

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setSubscription(null)
  }

  const value = {
    user,
    session,
    subscription,
    loading,
    isAuthenticated: !!user,
    isGuest: !isSupabaseConfigured() || !user,
    signUp,
    signIn,
    signOut,
    refreshSubscription: () => user && fetchSubscription(user.id),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() { // eslint-disable-line react-refresh/only-export-components
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
