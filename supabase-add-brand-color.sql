-- Run this once in Supabase Dashboard -> SQL Editor
-- Adds a brand_color column so each product can carry its own card
-- accent color from the database instead of a hardcoded slug->hex map
-- in src/lib/product-brand-colors.ts.

alter table products
  add column if not exists brand_color text;

comment on column products.brand_color is
  'Hex color (e.g. #6B5271) used as the product card background/accent. Null falls back to the default navy in the app.';
