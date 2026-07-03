// src/components/product/ProductPurchasePanel.tsx
//
// Combines the size/dimension selector with the "Ajouter au panier"
// action, since the cart needs to know which variant (price/dimension)
// is currently selected -- SizeSelector's selection state has to live
// here, not split across a server aside and a separate client island.

"use client";

import Link from "next/link";
import { Check, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/product-helpers";

type Variant = {
  id: string;
  dimension: string;
  price: number;
  compare_at_price: number | null;
};

type Props = {
  variants: Variant[];
  fallbackPrice: number | null;
  fallbackCompareAtPrice: number | null;
  productId: string;
  productName: string;
  href: string;
  imageUrl: string | null;
};

export default function ProductPurchasePanel({
  variants,
  fallbackPrice,
  fallbackCompareAtPrice,
  productId,
  productName,
  href,
  imageUrl,
}: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const sorted = [...variants].sort((a, b) => a.price - b.price);
  const [selectedId, setSelectedId] = useState<string | null>(
    sorted[0]?.id ?? null
  );

  const selected =
    sorted.find((variant) => variant.id === selectedId) ?? sorted[0] ?? null;

  const price = selected ? selected.price : fallbackPrice;
  const compareAtPrice = selected
    ? selected.compare_at_price
    : fallbackCompareAtPrice;

  const hasPromotion =
    compareAtPrice !== null && price !== null && compareAtPrice > price;
  const savings =
    hasPromotion && compareAtPrice && price ? compareAtPrice - price : null;

  const handleAddToCart = () => {
    addItem({
      productId,
      href,
      name: selected ? `${productName} (${selected.dimension})` : productName,
      price: price ?? 0,
      imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <div className="mt-5 rounded-2xl bg-[#F8F5F0] p-4">
        {sorted.length > 0 && (
          <div className="mb-3">
            <p className="mb-2 text-xs font-semibold text-[#103a63]">
              Dimension
            </p>

            <div className="flex flex-wrap gap-1.5">
              {sorted.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedId(variant.id)}
                  className={clsx(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                    variant.id === selected?.id
                      ? "border-[#103a63] bg-[#103a63] text-white"
                      : "border-[#103a63]/15 bg-white text-[#103a63] hover:border-[#103a63]/40"
                  )}
                >
                  {variant.dimension}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-end gap-2">
          {price !== null && (
            <p className="text-2xl font-bold tracking-tight text-[#103a63]">
              {formatPrice(price)}
            </p>
          )}

          {compareAtPrice !== null && hasPromotion && (
            <p className="pb-0.5 text-sm font-medium text-slate-400 line-through">
              {formatPrice(compareAtPrice)}
            </p>
          )}
        </div>

        {savings !== null && (
          <p className="mt-2 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
            Vous économisez {formatPrice(savings)}
          </p>
        )}

        <p className="mt-2 text-[11px] text-slate-500">Taxe incluse.</p>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#103a63] px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-[#103a63]/15 transition hover:-translate-y-0.5 hover:bg-[#0b2c4c]"
        >
          {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          {added ? "Ajouté !" : "Ajouter au panier"}
        </button>

        <Link
          href="/quiz-sommeil"
          className="inline-flex flex-1 items-center justify-center rounded-full bg-[#d9c45a] px-5 py-3 text-center text-sm font-bold text-[#103a63] shadow-lg shadow-[#d9c45a]/20 transition hover:-translate-y-0.5 hover:opacity-90"
        >
          Quiz sommeil
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[#103a63]/15 px-4 py-3 text-[#103a63] transition hover:bg-[#103a63] hover:text-white"
          aria-label="Ajouter aux favoris"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}
