-- Run this once in Supabase Dashboard -> SQL Editor
-- Creates a table to persist contact form submissions from /contact.
-- No email provider is configured yet (Resend integration is pending
-- the domain setup) -- this table is the fallback so nothing is lost
-- in the meantime. Check it manually in Supabase Table Editor until
-- email sending is wired up.

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  order_number text,
  message text not null,
  consent boolean not null default false,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

drop policy if exists "Public insert access" on contact_messages;

create policy "Public insert access" on contact_messages
  for insert with check (true);

-- No select/update/delete policy on purpose: only readable from the
-- Supabase dashboard (service role), not from the public anon client.
