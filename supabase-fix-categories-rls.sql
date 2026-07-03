-- Run this once in Supabase Dashboard -> SQL Editor
-- Fixes: INSERT on categories is blocked (RLS violation error), and
-- UPDATE silently affects 0 rows (no update policy) -- same class of
-- issue as product_images.

drop policy if exists "Public insert access" on categories;
drop policy if exists "Public update access" on categories;
drop policy if exists "Public delete access" on categories;

create policy "Public insert access" on categories
  for insert with check (true);

create policy "Public update access" on categories
  for update using (true) with check (true);

create policy "Public delete access" on categories
  for delete using (true);
