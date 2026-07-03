-- Run this once in Supabase Dashboard -> SQL Editor
-- Adds size/price variants per product (e.g. "90x190" -> 567.00 EUR)

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  dimension text not null,
  price numeric not null,
  compare_at_price numeric,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists product_variants_product_id_idx on product_variants(product_id);

alter table product_variants enable row level security;

create policy "Public read access" on product_variants
  for select using (true);

create policy "Public insert access" on product_variants
  for insert with check (true);

create policy "Public update access" on product_variants
  for update using (true);

create policy "Public delete access" on product_variants
  for delete using (true);
