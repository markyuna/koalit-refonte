"use client";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

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

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      console.error("Erreur suppression produit:", error);
      alert("Erreur lors de la suppression du produit.");
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