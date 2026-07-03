// src/components/admin/DeleteOrderButton.tsx

"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { deleteOrder } from "@/app/admin/commandes/actions";

type Props = {
  orderId: string;
};

export default function DeleteOrderButton({ orderId }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette commande ?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.error("Erreur suppression commande:", error);
      alert("Erreur lors de la suppression de la commande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      title="Supprimer"
      aria-label="Supprimer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
