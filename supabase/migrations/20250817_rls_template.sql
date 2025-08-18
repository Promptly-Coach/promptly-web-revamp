-- TEMPLATE: Enable RLS and add safe, example policies.
-- Replace "profiles" with your table(s) and adjust auth logic.

-- Enable RLS
-- alter table public.profiles enable row level security;

-- Example: allow read access to everyone (public data)
-- create policy "Public read profiles"
-- on public.profiles for select
-- using (true);

-- Example: users can read/write only their own row (requires auth.uid() in row)
-- create policy "Users can read own profile"
-- on public.profiles for select
-- using (auth.uid() = id);

-- create policy "Users can update own profile"
-- on public.profiles for update
-- using (auth.uid() = id) with check (auth.uid() = id);
