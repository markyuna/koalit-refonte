-- Run this once in Supabase Dashboard -> SQL Editor
-- Fixes: DELETE on product_images silently affects 0 rows (no delete
-- policy), so removing an image in the admin never actually worked.

drop policy if exists "Public delete access" on product_images;

create policy "Public delete access" on product_images
  for delete using (true);
