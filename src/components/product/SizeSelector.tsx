// src/components/product/SizeSelector.tsx

"use client";

import { useState } from "react";
import clsx from "clsx";

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
};

function formatPrice(price: number | null) {
  if (price === null) return null;

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export default function SizeSelector({
  variants,
  fallbackPrice,
  fallbackCompareAtPrice,
}: Props) {
  const sorted = [...variants].sort((a, b) => a.price - b.price);
  const [selectedId, setSelectedId] = useState<string | null>(
    sorted[0]?.id ?? null
  );

  const selected = sorted.find((variant) => variant.id === selectedId) ?? sorted[0] ?? null;

  const price = selected ? selected.price : fallbackPrice;
  const compareAtPrice = selected
    ? selected.compare_at_price
    : fallbackCompareAtPrice;

  const hasPromotion =
    compareAtPrice !== null && price !== null && compareAtPrice > price;
  const savings = hasPromotion && compareAtPrice && price
    ? compareAtPrice - price
    : null;

  return (
    <div className="mt-8 rounded-[1.75rem] bg-[#F8F5F0] p-5">
      {sorted.length > 0 && (
        <div className="mb-5">
          <p className="mb-3 text-sm font-semibold text-[#103a63]">
            Dimension
          </p>

          <div className="flex flex-wrap gap-2">
            {sorted.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedId(variant.id)}
                className={clsx(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
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

      <div className="flex flex-wrap items-end gap-4">
        {price !== null && (
          <p className="text-4xl font-bold tracking-tight text-[#103a63]">
            {formatPrice(price)}
          </p>
        )}

        {compareAtPrice !== null && hasPromotion && (
          <p className="pb-1 text-xl font-medium text-slate-400 line-through">
            {formatPrice(compareAtPrice)}
          </p>
        )}
      </div>

      {savings !== null && (
        <p className="mt-3 inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
          Vous économisez {formatPrice(savings)}
        </p>
      )}

      <p className="mt-3 text-xs text-slate-500">Taxe incluse.</p>
    </div>
  );
}
