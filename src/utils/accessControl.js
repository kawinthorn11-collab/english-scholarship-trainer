/**
 * Access control helpers for membership gating.
 *
 * These are pure functions that check subscription state.
 * They do NOT enforce access — enforcement happens in UI guards (Phase B).
 * In guest/demo mode, all functions return "free" level access.
 */

import { PLANS, FREE_GRAMMAR_LESSON_IDS, FREE_EXAM_SET_IDS } from '../data/plans'

/**
 * Check if user has an active Pro subscription.
 * @param {object|null} subscription - from Supabase subscriptions table
 * @returns {boolean}
 */
export function isProUser(subscription) {
  if (!subscription) return false
  return subscription.status === 'active' && subscription.plan === 'pro'
}

/**
 * Get the user's effective plan.
 * @param {object|null} subscription
 * @returns {'free'|'pro'}
 */
export function getUserPlan(subscription) {
  return isProUser(subscription) ? 'pro' : 'free'
}

/**
 * Check if user can access a specific grammar lesson.
 * Free users can access a limited set of lessons.
 * Pro users can access all.
 * Guest/demo mode: same as free.
 */
export function canAccessLesson(subscription, lessonId) {
  if (isProUser(subscription)) return true
  return FREE_GRAMMAR_LESSON_IDS.includes(lessonId)
}

/**
 * Check if user can access a specific exam set.
 * Free users can only access set01.
 * Pro users can access all.
 */
export function canAccessExamSet(subscription, setId) {
  if (isProUser(subscription)) return true
  return FREE_EXAM_SET_IDS.includes(setId)
}

/**
 * Check if user can use detailed explanations (Thai + English + whyWrong).
 */
export function canUseDetailedExplanations(subscription) {
  return isProUser(subscription)
}

/**
 * Check if user can use weak skill analysis and recommendations.
 */
export function canUseWeakSkillAnalysis(subscription) {
  return isProUser(subscription)
}

/**
 * Check if user can sync data to cloud.
 */
export function canUseCloudSync(subscription) {
  return isProUser(subscription)
}

/**
 * Check daily drill limit for free users.
 * @param {number} drillsToday - number of drills completed today
 * @param {object|null} subscription
 * @returns {boolean} true if user can do another drill
 */
export function canDoDrill(subscription, drillsToday) {
  if (isProUser(subscription)) return true
  return drillsToday < PLANS.free.limits.drillsPerDay
}

/**
 * Get the plan limits for display purposes.
 */
export function getPlanLimits(subscription) {
  const plan = getUserPlan(subscription)
  return PLANS[plan].limits
}
