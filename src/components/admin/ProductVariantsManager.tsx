// src/components/admin/ProductVariantsManager.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { supabase } from "@/lib/supabase";

type ProductVariant = {
  id: string;
  dimension: string;
  price: number;
  compare_at_price: number | null;
  position: number | null;
};

type Props = {
  productId: string;
  variants: ProductVariant[];
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : null;
}

export default function ProductVariantsManager({ productId, variants }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [newVariant, setNewVariant] = useState({
    dimension: "",
    price: "",
    compare_at_price: "",
  });

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dimension = newVariant.dimension.trim();
    const price = Number(newVariant.price);

    if (!dimension || !newVariant.price || Number.isNaN(price)) {
      alert("Merci de renseigner une dimension et un prix valides.");
      return;
    }

    try {
      setSaving(true);

      const { error } = await supabase.from("product_variants").insert({
        product_id: productId,
        dimension,
        price,
        compare_at_price: newVariant.compare_at_price
          ? Number(newVariant.compare_at_price)
          : null,
        position: variants.length,
      });

      if (error) {
        throw error;
      }

      setNewVariant({ dimension: "", price: "", compare_at_price: "" });
      router.refresh();
    } catch (error) {
      console.error("Erreur ajout dimension:", error);

      const message = getErrorMessage(error);
      alert(
        message
          ? `Erreur lors de l'ajout de la dimension : ${message}`
          : "Erreur lors de l'ajout de la dimension."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePrice = async (
    variantId: string,
    field: "price" | "compare_at_price",
    value: string
  ) => {
    const parsed = value ? Number(value) : null;

    if (value && Number.isNaN(parsed)) return;

    const { error } = await supabase
      .from("product_variants")
      .update({ [field]: parsed })
      .eq("id", variantId);

    if (error) {
      console.error("Erreur mise à jour dimension:", error);
      alert("Erreur lors de la mise à jour du prix.");
      return;
    }

    router.refresh();
  };

  const handleDelete = async (variantId: string) => {
    const confirmed = window.confirm("Supprimer cette dimension ?");

    if (!confirmed) return;

    const { error } = await supabase
      .from("product_variants")
      .delete()
      .eq("id", variantId);

    if (error) {
      console.error("Erreur suppression dimension:", error);
      alert("Erreur lors de la suppression de la dimension.");
      return;
    }

    router.refresh();
  };

  return (
    <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#103a63]">Dimensions et prix</h2>
      <p className="mt-2 text-slate-600">
        Ajoutez une ligne par dimension disponible (ex : 90x190, 160x200). Le
        prix affiché sur le site sera « à partir de » la dimension la moins
        chère.
      </p>

      {variants.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
          Aucune dimension ajoutée. Le prix de base du produit sera utilisé.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[500px] text-left">
            <thead>
              <tr className="text-sm font-semibold text-slate-500">
                <th className="py-2 pr-4">Dimension</th>
                <th className="py-2 pr-4">Prix</th>
                <th className="py-2 pr-4">Ancien prix</th>
                <th className="py-2 pr-4" />
              </tr>
            </thead>

            <tbody>
              {variants.map((variant) => (
                <tr key={variant.id} className="border-t border-slate-100">
                  <td className="py-3 pr-4 font-semibold text-[#103a63]">
                    {variant.dimension}
                  </td>

                  <td className="py-3 pr-4">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue={variant.price}
                      onBlur={(event) =>
                        handleUpdatePrice(variant.id, "price", event.target.value)
                      }
                      className="w-28 rounded-xl border border-slate-200 px-3 py-2"
                    />
                  </td>

                  <td className="py-3 pr-4">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue={variant.compare_at_price ?? ""}
                      onBlur={(event) =>
                        handleUpdatePrice(
                          variant.id,
                          "compare_at_price",
                          event.target.value
                        )
                      }
                      className="w-28 rounded-xl border border-slate-200 px-3 py-2"
                      placeholder="—"
                    />
                  </td>

                  <td className="py-3 pr-4">
                    <button
                      type="button"
                      onClick={() => handleDelete(variant.id)}
                      className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-sm font-semibold text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <form
        onSubmit={handleAdd}
        className="mt-6 grid gap-4 rounded-3xl bg-[#f8f6f1] p-6 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#103a63]">
            Dimension
          </label>
          <input
            type="text"
            value={newVariant.dimension}
            onChange={(event) =>
              setNewVariant((previous) => ({
                ...previous,
                dimension: event.target.value,
              }))
            }
            placeholder="90x190"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#d9c45a]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#103a63]">
            Prix
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={newVariant.price}
            onChange={(event) =>
              setNewVariant((previous) => ({
                ...previous,
                price: event.target.value,
              }))
            }
            placeholder="567.00"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#d9c45a]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#103a63]">
            Ancien prix
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={newVariant.compare_at_price}
            onChange={(event) =>
              setNewVariant((previous) => ({
                ...previous,
                compare_at_price: event.target.value,
              }))
            }
            placeholder="Optionnel"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#d9c45a]"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#103a63] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" />
          {saving ? "Ajout..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
}
