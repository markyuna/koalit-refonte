// src/components/product/ProductGallery.tsx

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
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
  initialIndex?: number;
};

export default function ProductGallery({
  images,
  productName,
  hasPromotion,
  badgeLabel,
  initialIndex = 0,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(
    initialIndex >= 0 && initialIndex < images.length ? initialIndex : 0
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const selected = images[selectedIndex] ?? null;

  const showPrevious = () => {
    setSelectedIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setSelectedIndex((current) => (current + 1) % images.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

  return (
    <section className="space-y-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#efe8db] shadow-sm sm:rounded-[2.5rem]">
        <div className="relative aspect-[4/3]">
          {selected ? (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="Agrandir l'image"
              className="group absolute inset-0"
            >
              <Image
                src={selected.image_url}
                alt={selected.alt ?? productName}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />

              <span className="absolute bottom-4 right-4 inline-flex items-center justify-center rounded-full bg-white/90 p-2.5 text-[#103a63] shadow-lg transition group-hover:bg-white">
                <Expand className="h-4 w-4" />
              </span>
            </button>
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

      {lightboxOpen && selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Fermer"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                aria-label="Image précédente"
                className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="Image suivante"
                className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative h-full w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selected.image_url}
              alt={selected.alt ?? productName}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {images.length > 1 && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70 sm:bottom-6">
              {selectedIndex + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
