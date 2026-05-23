import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'
import { getDeviceId } from './deviceId.js'
import { getLocalStats } from './localStats.js'

function mapLocalStats() {
  const stats = getLocalStats()
  return {
    source: 'local',
    active_now_count: 1,
    total_study_seconds: Math.round(stats.totalStudySeconds || 0),
    today_study_seconds: Math.round(stats.todayStudySeconds || 0),
    total_exams_completed: stats.examsCompleted || 0,
    total_lessons_completed: stats.grammarLessonsCompleted || 0,
    total_drills_completed: stats.grammarDrillsCompleted || 0,
    total_questions_answered: stats.totalQuestionsAnswered || 0,
    total_devices: 1,
    unavailable: !isSupabaseConfigured(),
  }
}

export async function sendPublicHeartbeat(currentPage = '') {
  if (!isSupabaseConfigured() || !supabase) return { ok: false, skipped: true }
  try {
    const { error } = await supabase
      .from('public_activity_heartbeats')
      .upsert({
        device_id: getDeviceId(),
        last_seen_at: new Date().toISOString(),
        current_page: currentPage,
        user_agent_hint: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 120) : '',
      }, { onConflict: 'device_id' })
    return { ok: !error, error }
  } catch (error) {
    return { ok: false, error }
  }
}

export async function sendLearningEvent(eventType, payload = {}) {
  if (!isSupabaseConfigured() || !supabase) return { ok: false, skipped: true }
  try {
    const { error } = await supabase
      .from('public_learning_events')
      .insert({
        device_id: getDeviceId(),
        event_type: eventType,
        seconds: Math.round(payload.seconds || 0),
        skill_tag: payload.skillTag || null,
        lesson_id: payload.lessonId || null,
        exam_set_id: payload.examSetId || null,
        score: payload.score ?? null,
      })
    return { ok: !error, error }
  } catch (error) {
    return { ok: false, error }
  }
}

export async function fetchPublicGlobalStats() {
  if (!isSupabaseConfigured() || !supabase) return mapLocalStats()

  try {
    const { data, error } = await supabase.rpc('get_public_global_stats')
    if (error) return { ...mapLocalStats(), unavailable: true, errorMessage: error.message }
    const row = Array.isArray(data) ? data[0] : data
    if (!row) return mapLocalStats()
    return { source: 'global', ...row, unavailable: false }
  } catch (error) {
    return { ...mapLocalStats(), unavailable: true, errorMessage: error?.message || 'Global stats unavailable' }
  }
}
