// src/components/admin/NewProductImagesPicker.tsx

"use client";

import Image from "next/image";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { GripVertical, ImagePlus, Star, Trash2 } from "lucide-react";
import clsx from "clsx";

type StagedImage = {
  key: string;
  file: File;
  previewUrl: string;
  isCover: boolean;
};

export type NewProductImagesPickerHandle = {
  getStagedFiles: () => { file: File; isCover: boolean }[];
};

const NewProductImagesPicker = forwardRef<NewProductImagesPickerHandle>(
  function NewProductImagesPicker(_props, ref) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [staged, setStaged] = useState<StagedImage[]>([]);
    const [draggedKey, setDraggedKey] = useState<string | null>(null);
    const [dragOverKey, setDragOverKey] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      getStagedFiles: () =>
        staged.map(({ file, isCover }) => ({ file, isCover })),
    }));

    useEffect(() => {
      return () => {
        staged.forEach((image) => URL.revokeObjectURL(image.previewUrl));
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFiles = (files: File[]) => {
      if (files.length === 0) return;

      setStaged((current) => {
        const additions = files.map((file, index) => ({
          key: `${Date.now()}-${index}-${file.name}`,
          file,
          previewUrl: URL.createObjectURL(file),
          isCover: current.length === 0 && index === 0,
        }));

        return [...current, ...additions];
      });
    };

    const handleSetCover = (key: string) => {
      setStaged((current) =>
        current.map((image) => ({ ...image, isCover: image.key === key }))
      );
    };

    const handleRemove = (key: string) => {
      setStaged((current) => {
        const target = current.find((image) => image.key === key);
        if (target) URL.revokeObjectURL(target.previewUrl);

        const filtered = current.filter((image) => image.key !== key);

        if (target?.isCover && filtered.length > 0) {
          filtered[0] = { ...filtered[0], isCover: true };
        }

        return filtered;
      });
    };

    const handleDrop = (targetKey: string) => {
      const sourceKey = draggedKey;
      setDraggedKey(null);
      setDragOverKey(null);

      if (!sourceKey || sourceKey === targetKey) return;

      setStaged((current) => {
        const list = [...current];
        const fromIndex = list.findIndex((image) => image.key === sourceKey);
        const toIndex = list.findIndex((image) => image.key === targetKey);

        if (fromIndex === -1 || toIndex === -1) return current;

        const [moved] = list.splice(fromIndex, 1);
        list.splice(toIndex, 0, moved);

        return list;
      });
    };

    return (
      <div className="rounded-[2rem] bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#103a63]">
              Images du produit
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Elles seront envoyées à la création du produit.
            </p>
          </div>

          <div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => {
                const files = Array.from(event.target.files ?? []);
                handleFiles(files);
                event.target.value = "";
              }}
            />

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#103a63] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <ImagePlus className="h-4 w-4" />
              Ajouter des images
            </button>
          </div>
        </div>

        {staged.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
            Aucune image ajoutée pour l&apos;instant.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {staged.map((image) => (
              <article
                key={image.key}
                draggable
                onDragStart={() => setDraggedKey(image.key)}
                onDragOver={(event) => {
                  event.preventDefault();
                  if (dragOverKey !== image.key) setDragOverKey(image.key);
                }}
                onDragLeave={() => {
                  setDragOverKey((current) =>
                    current === image.key ? null : current
                  );
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  handleDrop(image.key);
                }}
                onDragEnd={() => {
                  setDraggedKey(null);
                  setDragOverKey(null);
                }}
                className={clsx(
                  "overflow-hidden rounded-2xl border bg-[#f8f6f1] transition",
                  draggedKey === image.key
                    ? "border-slate-200 opacity-40"
                    : dragOverKey === image.key
                      ? "border-[#d9c45a] ring-2 ring-[#d9c45a]/50"
                      : "border-slate-100"
                )}
              >
                <div className="relative aspect-square cursor-grab bg-white active:cursor-grabbing">
                  <Image
                    src={image.previewUrl}
                    alt=""
                    fill
                    unoptimized
                    draggable={false}
                    className="pointer-events-none object-cover"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />

                  <span className="absolute right-1 top-1 inline-flex items-center justify-center rounded-full bg-white/90 p-0.5 text-[#103a63] shadow-sm">
                    <GripVertical className="h-2.5 w-2.5" />
                  </span>

                  {image.isCover && (
                    <span className="absolute left-1 top-1 rounded-full bg-[#d9c45a] p-0.5 text-[#103a63] shadow-sm">
                      <Star className="h-2.5 w-2.5" fill="currentColor" />
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1 border-t border-slate-100 py-1">
                  <button
                    type="button"
                    onClick={() => handleSetCover(image.key)}
                    title="Définir comme image principale"
                    aria-label="Définir comme image principale"
                    className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white text-[#103a63] transition hover:bg-[#103a63] hover:text-white"
                  >
                    <Star className="h-3 w-3" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemove(image.key)}
                    title="Retirer"
                    aria-label="Retirer"
                    className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default NewProductImagesPicker;
