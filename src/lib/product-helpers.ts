// src/lib/product-helpers.ts

export type ProductImage = {
  image_url: string;
  alt: string | null;
  is_cover: boolean | null;
  position?: number | null;
};

export type ProductVariant = {
  price: number;
  compare_at_price: number | null;
};

export function formatPrice(price: number | null) {
  if (price === null) return null;

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export function getCoverImage(images: ProductImage[] | null) {
  if (!images || images.length === 0) return null;

  return images.find((image) => image.is_cover) ?? images[0];
}

export function getGalleryImages(images: ProductImage[] | null) {
  if (!images || images.length === 0) return [];

  return [...images].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
}

export function getCoverIndex(images: ProductImage[]) {
  const index = images.findIndex((image) => image.is_cover);
  return index === -1 ? 0 : index;
}

export function getDisplayPricing<T extends { price: number | null; compare_at_price: number | null }>(
  product: T & { product_variants?: ProductVariant[] | null }
) {
  const variants = product.product_variants ?? [];

  if (variants.length === 0) {
    return {
      price: product.price,
      compareAtPrice: product.compare_at_price,
      fromVariants: false,
    };
  }

  const cheapest = variants.reduce((lowest, variant) =>
    variant.price < lowest.price ? variant : lowest
  );

  return {
    price: cheapest.price,
    compareAtPrice: cheapest.compare_at_price,
    fromVariants: true,
  };
}
