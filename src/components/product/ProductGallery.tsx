// src/components/product/ProductGallery.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

type GalleryImage = {
  image_url: string;
  alt: string | null;
};

type Props = {
  images: GalleryImage[];
  productName: string;
  hasPromotion: boolean;
  badgeLabel: string;
};

export default function ProductGallery({
  images,
  productName,
  hasPromotion,
  badgeLabel,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex] ?? null;

  return (
    <section className="space-y-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#efe8db] shadow-sm sm:rounded-[2.5rem]">
        <div className="relative aspect-[4/3]">
          {selected ? (
            <Image
              src={selected.image_url}
              alt={selected.alt ?? productName}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-8 text-center text-slate-400">
              Image en préparation
            </div>
          )}
        </div>

        <div className="absolute left-5 top-5 flex flex-wrap gap-3">
          {hasPromotion && (
            <span className="rounded-full bg-red-600 px-5 py-2 text-sm font-bold text-white shadow-lg">
              Promo
            </span>
          )}

          <span className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-[#103a63] shadow-lg backdrop-blur">
            {badgeLabel}
          </span>
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {images.map((image, index) => (
            <button
              key={`${image.image_url}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Voir l'image ${index + 1}`}
              aria-current={index === selectedIndex}
              className={clsx(
                "relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:h-16 sm:w-16",
                index === selectedIndex
                  ? "ring-2 ring-[#103a63]"
                  : "ring-1 ring-[#103a63]/5"
              )}
            >
              <Image
                src={image.image_url}
                alt={image.alt ?? `${productName} image ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
