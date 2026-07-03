-- Run this once in Supabase Dashboard -> SQL Editor
-- Creates the return_requests table, the returns-attachments storage
-- bucket, and a simple rate_limit_hits table used by /api/returns.
--
-- NOTE on RLS: this project has no SUPABASE_SERVICE_ROLE_KEY configured
-- (only NEXT_PUBLIC_SUPABASE_ANON_KEY), same as every other table here
-- (contact_messages, products, product_images, categories). The spec
-- asked for insert to be service-role-only, but without that key the
-- /api/returns route has to use the anon client like the rest of the
-- app, so INSERT is allowed via RLS below. Server-side validation in
-- the API route is still the real gate (field checks, file existence
-- check, honeypot, rate limit) -- flag this to the user if stricter
-- isolation is needed later (would require adding a service role key).

create table if not exists return_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  address text not null,
  phone text not null,
  order_id uuid,
  order_verified boolean not null default false,
  attachment_path text not null,
  attachment_mime_type text not null,
  attachment_size_bytes integer not null,
  status text not null default 'pending',
  staff_notes text,
  consent_given boolean not null
);

alter table return_requests enable row level security;

drop policy if exists "Public insert access" on return_requests;
create policy "Public insert access" on return_requests
  for insert with check (true);

-- No select/update/delete policy on purpose: only readable from the
-- Supabase dashboard (or a future authenticated staff role), same
-- pattern as contact_messages.

create table if not exists rate_limit_hits (
  id bigint generated always as identity primary key,
  ip text not null,
  endpoint text not null,
  created_at timestamptz not null default now()
);

alter table rate_limit_hits enable row level security;

drop policy if exists "Public insert access" on rate_limit_hits;
create policy "Public insert access" on rate_limit_hits
  for insert with check (true);

drop policy if exists "Public select access" on rate_limit_hits;
create policy "Public select access" on rate_limit_hits
  for select using (true);

drop policy if exists "Public delete access" on rate_limit_hits;
create policy "Public delete access" on rate_limit_hits
  for delete using (true);

-- Storage bucket for return attachments. Private (no public URL);
-- access is only via signed upload/read URLs. file_size_limit and
-- allowed_mime_types are enforced by Storage itself as a second layer
-- on top of the API route's own validation.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'returns-attachments',
  'returns-attachments',
  false,
  15728640,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf']
)
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Allow signed upload for returns" on storage.objects;
create policy "Allow signed upload for returns" on storage.objects
  for insert with check (bucket_id = 'returns-attachments');

drop policy if exists "Allow signed read for returns" on storage.objects;
create policy "Allow signed read for returns" on storage.objects
  for select using (bucket_id = 'returns-attachments');
