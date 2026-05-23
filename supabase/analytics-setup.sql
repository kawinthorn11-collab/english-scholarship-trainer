-- Public anonymous learning analytics for English Scholarship Exam Trainer.
-- This stores approximate aggregate activity only. It does not store names,
-- emails, raw answers, passage text, passwords, tokens, or private profile data.

create extension if not exists pgcrypto;

create table if not exists public.public_activity_heartbeats (
  device_id text primary key,
  last_seen_at timestamptz not null default now(),
  current_page text,
  user_agent_hint text,
  created_at timestamptz default now()
);

create table if not exists public.public_learning_events (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  event_type text not null,
  seconds integer default 0,
  skill_tag text,
  lesson_id text,
  exam_set_id text,
  score integer,
  created_at timestamptz default now()
);

create table if not exists public.public_daily_stats (
  stat_date date primary key,
  active_devices integer default 0,
  study_seconds integer default 0,
  exams_completed integer default 0,
  grammar_lessons_completed integer default 0,
  grammar_drills_completed integer default 0,
  questions_answered integer default 0,
  updated_at timestamptz default now()
);

alter table public.public_activity_heartbeats enable row level security;
alter table public.public_learning_events enable row level security;
alter table public.public_daily_stats enable row level security;

drop policy if exists "anon can upsert public heartbeats" on public.public_activity_heartbeats;
create policy "anon can upsert public heartbeats"
  on public.public_activity_heartbeats
  for all
  to anon
  using (true)
  with check (true);

drop policy if exists "anon can insert public learning events" on public.public_learning_events;
create policy "anon can insert public learning events"
  on public.public_learning_events
  for insert
  to anon
  with check (true);

drop policy if exists "anon can read public daily stats" on public.public_daily_stats;
create policy "anon can read public daily stats"
  on public.public_daily_stats
  for select
  to anon
  using (true);

grant select, insert, update on public.public_activity_heartbeats to anon;
grant insert on public.public_learning_events to anon;
grant select on public.public_daily_stats to anon;

create or replace function public.increment_daily_stats(
  event_type text,
  seconds integer default 0
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.public_daily_stats (
    stat_date,
    study_seconds,
    exams_completed,
    grammar_lessons_completed,
    grammar_drills_completed,
    questions_answered,
    updated_at
  )
  values (
    current_date,
    greatest(coalesce(seconds, 0), 0),
    case when event_type = 'exam_completed' then 1 else 0 end,
    case when event_type = 'grammar_lesson_completed' then 1 else 0 end,
    case when event_type = 'grammar_drill_completed' then 1 else 0 end,
    case when event_type = 'question_answered' then 1 else 0 end,
    now()
  )
  on conflict (stat_date)
  do update set
    study_seconds = public.public_daily_stats.study_seconds + excluded.study_seconds,
    exams_completed = public.public_daily_stats.exams_completed + excluded.exams_completed,
    grammar_lessons_completed = public.public_daily_stats.grammar_lessons_completed + excluded.grammar_lessons_completed,
    grammar_drills_completed = public.public_daily_stats.grammar_drills_completed + excluded.grammar_drills_completed,
    questions_answered = public.public_daily_stats.questions_answered + excluded.questions_answered,
    updated_at = now();
end;
$$;

create or replace function public.handle_public_learning_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.increment_daily_stats(new.event_type, new.seconds);
  return new;
end;
$$;

drop trigger if exists public_learning_event_stats_trigger on public.public_learning_events;
create trigger public_learning_event_stats_trigger
  after insert on public.public_learning_events
  for each row
  execute function public.handle_public_learning_event();

create or replace function public.get_public_global_stats()
returns table (
  active_now_count integer,
  total_study_seconds bigint,
  today_study_seconds bigint,
  total_exams_completed bigint,
  total_lessons_completed bigint,
  total_drills_completed bigint,
  total_questions_answered bigint,
  total_devices bigint
)
language sql
security definer
set search_path = public
as $$
  select
    (
      select count(*)::integer
      from public.public_activity_heartbeats
      where last_seen_at > now() - interval '2 minutes'
    ) as active_now_count,
    coalesce(sum(case when event_type = 'study_seconds' then seconds else 0 end), 0)::bigint as total_study_seconds,
    coalesce(sum(case when event_type = 'study_seconds' and created_at::date = current_date then seconds else 0 end), 0)::bigint as today_study_seconds,
    coalesce(sum(case when event_type = 'exam_completed' then 1 else 0 end), 0)::bigint as total_exams_completed,
    coalesce(sum(case when event_type = 'grammar_lesson_completed' then 1 else 0 end), 0)::bigint as total_lessons_completed,
    coalesce(sum(case when event_type = 'grammar_drill_completed' then 1 else 0 end), 0)::bigint as total_drills_completed,
    coalesce(sum(case when event_type = 'question_answered' then 1 else 0 end), 0)::bigint as total_questions_answered,
    (
      select count(distinct device_id)
      from (
        select device_id from public.public_activity_heartbeats
        union all
        select device_id from public.public_learning_events
      ) devices
    )::bigint as total_devices
  from public.public_learning_events;
$$;

grant execute on function public.get_public_global_stats() to anon;
grant execute on function public.increment_daily_stats(text, integer) to anon;
