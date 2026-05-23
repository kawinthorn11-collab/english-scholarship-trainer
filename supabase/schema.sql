-- ============================================================
-- English Scholarship Exam Trainer — Supabase Database Schema
-- ============================================================
-- Run this in the Supabase SQL Editor after creating your project.
-- This creates all tables, enables RLS, and sets up policies.

-- 1. Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read and update their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 2. Subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT DEFAULT 'inactive' CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'unpaid', 'inactive')),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can read their own subscription
CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Only service role (webhook) can insert/update subscriptions
-- Frontend cannot modify subscription status directly.
CREATE POLICY "Service role can manage subscriptions"
  ON public.subscriptions FOR ALL
  USING (auth.role() = 'service_role');


-- 3. Attempts table (exam history)
CREATE TABLE IF NOT EXISTS public.attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  set_id TEXT NOT NULL,
  set_title TEXT,
  score INTEGER,
  total INTEGER,
  grammar_score INTEGER,
  reading_score INTEGER,
  percentage INTEGER,
  time_used_seconds INTEGER,
  answers JSONB,
  weak_skills JSONB,
  shuffled_questions JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own attempts"
  ON public.attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts"
  ON public.attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);


-- 4. Grammar progress table
CREATE TABLE IF NOT EXISTS public.grammar_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  studied BOOLEAN DEFAULT FALSE,
  quiz_attempts INTEGER DEFAULT 0,
  best_quiz_score INTEGER DEFAULT 0,
  mastered BOOLEAN DEFAULT FALSE,
  weak_rules JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE public.grammar_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own grammar progress"
  ON public.grammar_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own grammar progress"
  ON public.grammar_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own grammar progress"
  ON public.grammar_progress FOR UPDATE
  USING (auth.uid() = user_id);


-- 5. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_attempts_user_id ON public.attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_set_id ON public.attempts(set_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_grammar_progress_user_id ON public.grammar_progress(user_id);
