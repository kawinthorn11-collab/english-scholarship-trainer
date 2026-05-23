# Supabase Setup Guide

This guide walks you through connecting the English Scholarship Exam Trainer to a real Supabase project.

## Prerequisites

- A free Supabase account at [supabase.com](https://supabase.com)
- The project running locally (`npm run dev`)

---

## Step 1: Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **New Project**
3. Choose your organization (or create one)
4. Set a project name (e.g., `exam-trainer`)
5. Set a strong database password (save it somewhere safe)
6. Choose a region close to your users (e.g., Southeast Asia - Singapore)
7. Click **Create new project**
8. Wait 1-2 minutes for the project to initialize

---

## Step 2: Find Your Project Credentials

After the project is created:

1. Go to **Settings** → **API** in the left sidebar
2. You will see:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: a long string starting with `eyJ...`

Copy both values. You will need them in the next step.

> ⚠️ The `anon` key is safe for frontend use — it only allows operations permitted by Row Level Security policies.
> 
> ⚠️ The `service_role` key is SECRET. Never put it in frontend code. It is only used in serverless functions (webhook).

---

## Step 3: Create .env.local

In the project root directory, create a file called `.env.local`:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
VITE_APP_URL=http://localhost:5173
```

Replace the placeholder values with your real credentials from Step 2.

> ⚠️ `.env.local` is in `.gitignore` and will NOT be committed to version control.

---

## Step 4: Run the Database Schema

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click **New query**
3. Open the file `supabase/full-setup.sql` from this project
4. Copy the entire contents and paste into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned." for each statement

This creates:
- `profiles` table (auto-created on signup)
- `subscriptions` table (managed by webhook)
- `attempts` table (exam history)
- `grammar_progress` table (lesson progress)
- Row Level Security policies on all tables
- Auto-create profile trigger

---

## Step 5: Enable Email Authentication

1. Go to **Authentication** → **Providers** in the left sidebar
2. Make sure **Email** is enabled (it should be by default)
3. Optional: Disable "Confirm email" for development (under **Authentication** → **Settings** → **Email Auth**)
   - For production, keep email confirmation ON

---

## Step 6: Test Login/Register

1. Start the dev server: `npm run dev`
2. Open `http://localhost:5173`
3. Click **Login** in the navigation bar
4. Click **สมัครสมาชิก** (Register)
5. Enter a test email and password
6. If email confirmation is disabled: you should be logged in immediately
7. If email confirmation is enabled: check your email for a confirmation link

---

## Step 7: Verify the Profiles Table

After registering:

1. Go to Supabase Dashboard → **Table Editor**
2. Click on the `profiles` table
3. You should see a new row with:
   - `id` matching the user's auth ID
   - `email` matching the registered email
   - `display_name` from the registration form
   - `role` = 'user'
   - `created_at` = current timestamp

If the row is missing, the trigger may not have been created. Re-run `supabase/full-setup.sql`.

---

## Step 8: Verify Row Level Security

To confirm RLS is working:

1. Go to **Table Editor** → click on any table
2. Click the **RLS** badge next to the table name
3. You should see policies listed (e.g., "Users can view own profile")
4. The lock icon should be green/active

---

## Troubleshooting

### "Supabase is not configured yet" message in the app

- Make sure `.env.local` exists in the project root
- Make sure the variable names start with `VITE_` (required by Vite)
- Restart the dev server after creating/changing `.env.local`

### Login fails with "Invalid login credentials"

- Check that the email and password are correct
- If email confirmation is enabled, confirm the email first
- Check the Supabase Dashboard → Authentication → Users to see if the user exists

### Profile not created after signup

- Go to SQL Editor and check if the trigger exists:
  ```sql
  SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
  ```
- If missing, re-run the trigger section from `supabase/full-setup.sql`

### "permission denied for table profiles"

- RLS is enabled but policies may be missing
- Re-run `supabase/rls-policies.sql` in the SQL Editor
- Or re-run the full `supabase/full-setup.sql`

### App crashes on load after adding .env.local

- Check for typos in the URL or key
- The URL must start with `https://` and end with `.supabase.co`
- The anon key must be the full JWT string (very long)

---

## File Reference

| File | Purpose |
|------|---------|
| `.env.example` | Template showing required variables |
| `.env.local` | Your real credentials (not committed) |
| `supabase/full-setup.sql` | Full database schema + RLS + triggers |
| `supabase/schema.sql` | Original schema reference |
| `supabase/rls-policies.sql` | RLS policies reference (already in schema.sql) |
| `src/lib/supabaseClient.js` | Frontend Supabase client |
| `src/context/AuthContext.jsx` | Auth state management |

---

## Next Steps After Setup

Once Supabase is connected and Login/Register works:

1. **Phase C (content gating):** Lock Pro content, save data to Supabase
2. **Stripe setup:** Add payment processing for Pro subscriptions
3. **Deploy to Vercel:** Set environment variables in Vercel Dashboard

---

## Security Checklist

- [ ] `.env.local` is NOT committed to git
- [ ] Only `anon` key is used in frontend code
- [ ] `service_role` key is only in Vercel environment variables (for webhook)
- [ ] RLS is enabled on all user-data tables
- [ ] Subscription status cannot be modified by frontend
- [ ] Email confirmation is enabled in production
