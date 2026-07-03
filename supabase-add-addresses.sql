-- Run this once in Supabase Dashboard -> SQL Editor
-- Creates the addresses table with strict per-user RLS: a user can
-- only read/write their own rows, no public access at all.

create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text,
  full_name text,
  address_line1 text not null,
  address_line2 text,
  postal_code text not null,
  city text not null,
  country text not null default 'France',
  phone text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

alter table addresses enable row level security;

drop policy if exists "Users can view own addresses" on addresses;
create policy "Users can view own addresses" on addresses
  for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own addresses" on addresses;
create policy "Users can insert own addresses" on addresses
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own addresses" on addresses;
create policy "Users can update own addresses" on addresses
  for update using (auth.uid() = user_id);

drop policy if exists "Users can delete own addresses" on addresses;
create policy "Users can delete own addresses" on addresses
  for delete using (auth.uid() = user_id);
