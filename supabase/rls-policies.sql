-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================
-- These policies are ALREADY included in schema.sql.
-- This file is a separate reference for review and debugging.
-- If you already ran schema.sql, you do NOT need to run this file.
--
-- Security model:
-- - Users can only access their own data.
-- - Subscription status can only be changed by service_role (webhook).
-- - Frontend (anon key) cannot modify subscription status.

-- ============================================================
-- PROFILES
-- ============================================================
-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile (display_name, etc.)
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
-- Users can read their own subscription (to check Pro status)
CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- ONLY service_role can insert/update/delete subscriptions.
-- This prevents frontend users from granting themselves Pro access.
CREATE POLICY "Service role can manage subscriptions"
  ON public.subscriptions FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- ATTEMPTS (exam history)
-- ============================================================
-- Users can read their own attempts
CREATE POLICY "Users can view own attempts"
  ON public.attempts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own attempts
CREATE POLICY "Users can insert own attempts"
  ON public.attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- GRAMMAR PROGRESS
-- ============================================================
-- Users can read their own grammar progress
CREATE POLICY "Users can view own grammar progress"
  ON public.grammar_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own grammar progress
CREATE POLICY "Users can insert own grammar progress"
  ON public.grammar_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own grammar progress
CREATE POLICY "Users can update own grammar progress"
  ON public.grammar_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================
-- SECURITY NOTES
-- ============================================================
-- 1. The anon key (used in frontend) can only perform operations
--    allowed by these policies. It cannot bypass RLS.
--
-- 2. The service_role key (used in webhook/serverless functions)
--    bypasses RLS entirely. NEVER expose it to the frontend.
--
-- 3. Subscription status is protected: only the webhook (using
--    service_role) can change it. This prevents users from
--    granting themselves Pro access via browser DevTools.
--
-- 4. The auto-create profile trigger (in schema.sql) runs with
--    SECURITY DEFINER, meaning it executes with elevated privileges
--    to insert the profile row on signup.
