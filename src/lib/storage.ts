// src/lib/storage.ts

export const PRODUCT_IMAGES_BUCKET = "product-images";

export function getStoragePathFromPublicUrl(
  url: string,
  bucket: string = PRODUCT_IMAGES_BUCKET
) {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = url.indexOf(marker);

  if (index === -1) return null;

  return decodeURIComponent(url.slice(index + marker.length));
}
