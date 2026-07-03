// src/components/admin/ProductImagesManager.tsx

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { GripVertical, ImagePlus, Star, Trash2 } from "lucide-react";
import clsx from "clsx";

import { supabase } from "@/lib/supabase";
import { PRODUCT_IMAGES_BUCKET, getStoragePathFromPublicUrl } from "@/lib/storage";

type ProductImage = {
  id: string;
  image_url: string;
  alt: string | null;
  is_cover: boolean | null;
  position: number | null;
};

type Props = {
  productId: string;
  productSlug: string;
  images: ProductImage[];
};

const BUCKET_NAME = PRODUCT_IMAGES_BUCKET;
const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : null;
}

export default function ProductImagesManager({
  productId,
  productSlug,
  images,
}: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    done: number;
    total: number;
  } | null>(null);

  const [prevImages, setPrevImages] = useState(images);
  const [orderedImages, setOrderedImages] = useState(images);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);

  if (images !== prevImages) {
    setPrevImages(images);
    setOrderedImages(images);
  }

  const uploadOne = async (file: File, index: number) => {
    if (!file.type.startsWith("image/")) {
      throw new Error(`${file.name} : le fichier doit être une image.`);
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(`${file.name} : dépasse la taille maximale (8 Mo).`);
    }

    const extension = file.name.split(".").pop() || "webp";
    const filePath = `${productSlug}/${Date.now()}-${index}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

    const { error: insertError } = await supabase.from("product_images").insert({
      product_id: productId,
      image_url: data.publicUrl,
      alt: productSlug,
      is_cover: images.length === 0 && index === 0,
      position: images.length + index,
    });

    if (insertError) {
      throw insertError;
    }
  };

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;

    try {
      setUploading(true);
      setUploadProgress({ done: 0, total: files.length });

      const failures: string[] = [];

      for (let index = 0; index < files.length; index += 1) {
        try {
          await uploadOne(files[index], index);
        } catch (error) {
          console.error("Erreur upload image:", error);
          failures.push(getErrorMessage(error) ?? files[index].name);
        }

        setUploadProgress({ done: index + 1, total: files.length });
      }

      if (failures.length > 0) {
        alert(
          `Certaines images n’ont pas pu être ajoutées :\n${failures.join("\n")}`
        );
      }

      router.refresh();
    } finally {
      setUploading(false);
      setUploadProgress(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleSetCover = async (imageId: string) => {
    try {
      const { error: setCoverError } = await supabase
        .from("product_images")
        .update({ is_cover: true })
        .eq("id", imageId);

      if (setCoverError) {
        throw setCoverError;
      }

      const { error: clearOthersError } = await supabase
        .from("product_images")
        .update({ is_cover: false })
        .eq("product_id", productId)
        .neq("id", imageId);

      if (clearOthersError) {
        throw clearOthersError;
      }

      router.refresh();
    } catch (error) {
      console.error("Erreur image principale:", error);

      const message = getErrorMessage(error);
      alert(
        message
          ? `Erreur lors de la sélection de l’image principale : ${message}`
          : "Erreur lors de la sélection de l’image principale."
      );
    }
  };

  const handleDelete = async (image: ProductImage) => {
    const confirmed = window.confirm("Supprimer cette image ?");

    if (!confirmed) return;

    try {
      const storagePath = getStoragePathFromPublicUrl(image.image_url);

      if (storagePath) {
        await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
      }

      const { error } = await supabase
        .from("product_images")
        .delete()
        .eq("id", image.id);

      if (error) {
        throw error;
      }

      router.refresh();
    } catch (error) {
      console.error("Erreur suppression image:", error);

      const message = getErrorMessage(error);
      alert(
        message
          ? `Erreur lors de la suppression de l’image : ${message}`
          : "Erreur lors de la suppression de l’image."
      );
    }
  };

  const handleDrop = async (targetId: string) => {
    const sourceId = draggedId;
    setDraggedId(null);
    setDragOverId(null);

    if (!sourceId || sourceId === targetId) return;

    const current = [...orderedImages];
    const fromIndex = current.findIndex((image) => image.id === sourceId);
    const toIndex = current.findIndex((image) => image.id === targetId);

    if (fromIndex === -1 || toIndex === -1) return;

    const [moved] = current.splice(fromIndex, 1);
    current.splice(toIndex, 0, moved);

    setOrderedImages(current);
    setReordering(true);

    try {
      const results = await Promise.all(
        current.map((image, index) =>
          supabase
            .from("product_images")
            .update({ position: index })
            .eq("id", image.id)
        )
      );

      const failure = results.find((result) => result.error);

      if (failure?.error) {
        throw failure.error;
      }

      router.refresh();
    } catch (error) {
      console.error("Erreur réorganisation images:", error);
      alert("Erreur lors de l’enregistrement du nouvel ordre des images.");
      setOrderedImages(images);
    } finally {
      setReordering(false);
    }
  };

  return (
    <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#103a63]">
            Images du produit
          </h2>
          <p className="mt-2 text-slate-600">
            Ajoutez les visuels du produit (plusieurs à la fois) et
            glissez-déposez les vignettes pour changer leur ordre.
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
              if (files.length > 0) handleUpload(files);
            }}
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-full bg-[#103a63] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            <ImagePlus className="h-5 w-5" />
            {uploading
              ? `Upload ${uploadProgress?.done ?? 0}/${uploadProgress?.total ?? 0}...`
              : "Ajouter des images"}
          </button>
        </div>
      </div>

      {orderedImages.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 p-10 text-center text-slate-500">
          Aucune image ajoutée pour ce produit.
        </div>
      ) : (
        <div
          className={clsx(
            "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
            reordering && "opacity-60"
          )}
        >
          {orderedImages.map((image) => (
            <article
              key={image.id}
              draggable
              onDragStart={() => setDraggedId(image.id)}
              onDragOver={(event) => {
                event.preventDefault();
                if (dragOverId !== image.id) setDragOverId(image.id);
              }}
              onDragLeave={() => {
                setDragOverId((current) => (current === image.id ? null : current));
              }}
              onDrop={(event) => {
                event.preventDefault();
                handleDrop(image.id);
              }}
              onDragEnd={() => {
                setDraggedId(null);
                setDragOverId(null);
              }}
              className={clsx(
                "overflow-hidden rounded-3xl border bg-[#f8f6f1] transition",
                draggedId === image.id
                  ? "border-slate-200 opacity-40"
                  : dragOverId === image.id
                    ? "border-[#d9c45a] ring-2 ring-[#d9c45a]/50"
                    : "border-slate-100"
              )}
            >
              <div className="relative aspect-[4/3] cursor-grab bg-white active:cursor-grabbing">
                <Image
                  src={image.image_url}
                  alt={image.alt ?? productSlug}
                  fill
                  draggable={false}
                  className="pointer-events-none object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <span className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-white/90 p-1.5 text-[#103a63] shadow-sm">
                  <GripVertical className="h-4 w-4" />
                </span>

                {image.is_cover && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#d9c45a] px-3 py-1 text-xs font-bold text-[#103a63]">
                    Image principale
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 p-4">
                <button
                  type="button"
                  onClick={() => handleSetCover(image.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#103a63]"
                >
                  <Star className="h-4 w-4" />
                  Définir
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(image)}
                  className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
