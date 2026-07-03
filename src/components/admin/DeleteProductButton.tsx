"use client";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { PRODUCT_IMAGES_BUCKET, getStoragePathFromPublicUrl } from "@/lib/storage";

type Props = {
  productId: string;
};

export default function DeleteProductButton({ productId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce produit ?"
    );

    if (!confirmed) return;

    const { data: images } = await supabase
      .from("product_images")
      .select("image_url")
      .eq("product_id", productId);

    const storagePaths = (images ?? [])
      .map((image) => getStoragePathFromPublicUrl(image.image_url))
      .filter((path): path is string => path !== null);

    if (storagePaths.length > 0) {
      await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove(storagePaths);
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      console.error("Erreur suppression produit:", error);
      alert(`Erreur lors de la suppression du produit : ${error.message}`);
      return;
    }

    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
    >
      Supprimer
    </button>
  );
}