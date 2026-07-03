-- Run this once in Supabase Dashboard -> SQL Editor
-- Fixes: UPDATE on product_images silently affects 0 rows (RLS blocks it),
-- which breaks "Définir image principale" and drag-and-drop reordering.

drop policy if exists "Public update access" on product_images;

create policy "Public update access" on product_images
  for update using (true) with check (true);
