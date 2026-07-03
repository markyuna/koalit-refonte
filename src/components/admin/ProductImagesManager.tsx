// src/components/admin/ProductImagesManager.tsx

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ImagePlus, Star, Trash2 } from "lucide-react";

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

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Le fichier doit être une image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      alert("L’image dépasse la taille maximale autorisée (8 Mo).");
      return;
    }

    try {
      setUploading(true);

      const extension = file.name.split(".").pop() || "webp";
      const filePath = `${productSlug}/${Date.now()}.${extension}`;

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

      const { data } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from("product_images")
        .insert({
          product_id: productId,
          image_url: data.publicUrl,
          alt: productSlug,
          is_cover: images.length === 0,
          position: images.length,
        });

      if (insertError) {
        throw insertError;
      }

      router.refresh();
    } catch (error) {
      console.error("Erreur upload image:", error);

      const message = getErrorMessage(error);
      alert(
        message
          ? `Erreur lors de l’ajout de l’image : ${message}`
          : "Erreur lors de l’ajout de l’image."
      );
    } finally {
      setUploading(false);

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

  return (
    <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#103a63]">
            Images du produit
          </h2>
          <p className="mt-2 text-slate-600">
            Ajoutez les visuels du produit et sélectionnez l’image principale.
          </p>
        </div>

        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-full bg-[#103a63] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            <ImagePlus className="h-5 w-5" />
            {uploading ? "Upload..." : "Ajouter une image"}
          </button>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 p-10 text-center text-slate-500">
          Aucune image ajoutée pour ce produit.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <article
              key={image.id}
              className="overflow-hidden rounded-3xl border border-slate-100 bg-[#f8f6f1]"
            >
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={image.image_url}
                  alt={image.alt ?? productSlug}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

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