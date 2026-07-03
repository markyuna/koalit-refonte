-- Run this once in Supabase Dashboard -> SQL Editor
-- Creates orders + order_items. RLS is strict per-user (a customer
-- only sees their own orders) -- the admin dashboard reads these
-- using SUPABASE_SECRET_KEY server-side (bypasses RLS), not the anon
-- key, so no public/anon policy is needed for cross-user visibility.

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'en_cours',
  total_amount numeric not null,
  shipping_address_id uuid references addresses(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table orders enable row level security;

drop policy if exists "Users can view own orders" on orders;
create policy "Users can view own orders" on orders
  for select using (auth.uid() = user_id);

drop policy if exists "Users can create own orders" on orders;
create policy "Users can create own orders" on orders
  for insert with check (auth.uid() = user_id);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  variant_dimension text,
  unit_price numeric not null,
  quantity integer not null default 1,
  created_at timestamptz not null default now()
);

alter table order_items enable row level security;

drop policy if exists "Users can view own order items" on order_items;
create policy "Users can view own order items" on order_items
  for select using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

drop policy if exists "Users can create own order items" on order_items;
create policy "Users can create own order items" on order_items
  for insert with check (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );
