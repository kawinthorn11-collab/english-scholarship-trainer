# Anonymous Analytics Setup

This app works without Supabase. Analytics always falls back to localStorage on the learner's device.

To enable public aggregate stats:

1. Open Supabase.
2. Go to SQL Editor.
3. Create a new query.
4. Paste the contents of `supabase/analytics-setup.sql`.
5. Click Run.

## What Is Collected

Only anonymous, approximate learning activity:

- anonymous device id
- current page heartbeat
- study seconds
- completed exam count
- completed grammar lesson/drill count
- answered question count
- skill tag for weak-topic aggregation

## What Is Not Collected

The app does not store:

- names
- emails
- IP addresses
- passwords
- Supabase tokens
- raw answers
- passage text
- private profile data

## Public Stats

The RPC `get_public_global_stats()` returns aggregate values only:

- online now
- total study seconds
- today's study seconds
- completed exams
- completed lessons
- completed drills
- answered questions
- total devices

If Supabase is missing or unhealthy, the UI automatically shows local device stats instead.
