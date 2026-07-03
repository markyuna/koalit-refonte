// src/components/product/ProductCard.tsx

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import {
  formatPrice,
  getCoverImage,
  getDisplayPricing,
  type ProductImage,
  type ProductVariant,
} from "@/lib/product-helpers";

export type ProductCardData = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  price: number | null;
  compare_at_price: number | null;
  product_images: ProductImage[] | null;
  product_variants: ProductVariant[] | null;
};

type Props = {
  product: ProductCardData;
  href: string;
  /** Solid brand accent color -- matelas only. Other categories render a plain white card. */
  brandColor?: string | null;
};

export default function ProductCard({ product, href, brandColor }: Props) {
  const coverImage = getCoverImage(product.product_images);
  const pricing = getDisplayPricing(product);
  const price = formatPrice(pricing.price);
  const compareAtPrice = formatPrice(pricing.compareAtPrice);
  const isBranded = Boolean(brandColor);

  const hasPromotion =
    pricing.compareAtPrice !== null &&
    pricing.price !== null &&
    pricing.compareAtPrice > pricing.price;

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={isBranded ? { backgroundColor: brandColor as string } : undefined}
    >
      <Link href={href} className="block" aria-label={`Découvrir ${product.name}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#efe8db]">
          {coverImage ? (
            <Image
              src={coverImage.image_url}
              alt={coverImage.alt ?? product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-8 text-center text-slate-400">
              Image en préparation
            </div>
          )}
        </div>
      </Link>

      <div
        className={clsx(
          "relative flex flex-1 flex-col rounded-2xl border p-5",
          isBranded ? "border-white/20 text-white" : "border-[#103a63]/10 bg-white text-[#103a63]"
        )}
      >
        {hasPromotion && (
          <span className="absolute right-3.5 top-3.5 rounded-full bg-red-600/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
            Promo
          </span>
        )}

        <Link href={href}>
          <h2
            className={clsx(
              "mb-2.5 text-[17px] font-medium",
              isBranded ? "text-white" : "text-[#103a63]",
              hasPromotion && "pr-14"
            )}
          >
            {product.name}
          </h2>
        </Link>

        {product.short_description && (
          <p className={clsx("flex-1 leading-7", isBranded ? "text-white/80" : "text-slate-600")}>
            {product.short_description}
          </p>
        )}

        <div className="mt-4">
          <div className="mb-3 flex items-baseline gap-2">
            {price && (
              <p className={clsx("text-xl font-medium", isBranded ? "text-white" : "text-[#103a63]")}>
                {pricing.fromVariants ? `Dès ${price}` : price}
              </p>
            )}

            {compareAtPrice && hasPromotion && (
              <p className={clsx("text-[13px] line-through", isBranded ? "text-white/50" : "text-slate-400")}>
                {compareAtPrice}
              </p>
            )}
          </div>

          {isBranded ? (
            <Link
              href={href}
              style={{ "--card-color": brandColor } as CSSProperties}
              className="block w-full rounded-full border border-white/55 px-5 py-2 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-[var(--card-color)]"
            >
              Découvrir
            </Link>
          ) : (
            <Link
              href={href}
              className="block w-full rounded-full border border-[#103a63]/55 px-5 py-2 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-[#103a63] transition-colors hover:bg-[#103a63] hover:text-white"
            >
              Découvrir
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
