// src/lib/product-images.ts

import { supabase } from "@/lib/supabase";
import { PRODUCT_IMAGES_BUCKET } from "@/lib/storage";

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;

export function validateImageFile(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error(`${file.name} : le fichier doit être une image.`);
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`${file.name} : dépasse la taille maximale (8 Mo).`);
  }
}

/** Uploads one file to storage and inserts its product_images row. */
export async function uploadProductImage({
  file,
  productId,
  folderKey,
  index,
  isCover,
}: {
  file: File;
  productId: string;
  folderKey: string;
  index: number;
  isCover: boolean;
}) {
  validateImageFile(file);

  const extension = file.name.split(".").pop() || "webp";
  const filePath = `${folderKey}/${Date.now()}-${index}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .getPublicUrl(filePath);

  const { error: insertError } = await supabase.from("product_images").insert({
    product_id: productId,
    image_url: data.publicUrl,
    alt: folderKey,
    is_cover: isCover,
    position: index,
  });

  if (insertError) {
    throw insertError;
  }
}
