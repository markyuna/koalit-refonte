// src/components/admin/ProductForm.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { supabase } from "@/lib/supabase";

const categories = [
  { label: "Matelas", value: "matelas" },
  { label: "Sommiers", value: "sommiers" },
  { label: "Oreillers", value: "oreillers" },
];

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll("'", "")
    .replaceAll('"', "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProductForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    short_description: "",
    description: "",
    price: "",
    compare_at_price: "",
    stock: "0",
    is_featured: false,
    is_active: true,
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  const handleNameChange = (value: string) => {
    setFormData((previous) => ({
      ...previous,
      name: value,
      slug: generateSlug(value),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      const categorySlug = formData.category.trim();

      const { data: category, error: categoryError } = await supabase
        .from("categories")
        .select("id, name, slug")
        .eq("slug", categorySlug)
        .maybeSingle();

      console.log("CATEGORY SELECT", {
        slug: categorySlug,
        data: category,
        error: categoryError,
      });

      if (categoryError) {
        throw categoryError;
      }

      if (!category) {
        alert(`Catégorie introuvable: ${categorySlug}`);
        return;
      }

      const { error } = await supabase.from("products").insert({
        category_id: category.id,
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        short_description: formData.short_description.trim() || null,
        description: formData.description.trim() || null,
        price: formData.price ? Number(formData.price) : null,
        compare_at_price: formData.compare_at_price
          ? Number(formData.compare_at_price)
          : null,
        stock: Number(formData.stock),
        is_featured: formData.is_featured,
        is_active: formData.is_active,
      });

      if (error) {
        throw error;
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Erreur création produit:", error);
      alert("Erreur lors de la création du produit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-[2rem] bg-white p-8 shadow-sm"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#103a63]">
            Nom du produit
          </label>

          <input
            type="text"
            value={formData.name}
            onChange={(event) => handleNameChange(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#d9c45a]"
            placeholder="Ex: Matelas Stella"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#103a63]">
            Slug
          </label>

          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#d9c45a]"
            placeholder="matelas-stella"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#103a63]">
          Catégorie
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#d9c45a]"
          required
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#103a63]">
          Description courte
        </label>

        <textarea
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#d9c45a]"
          placeholder="Résumé court du produit..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#103a63]">
          Description complète
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#d9c45a]"
          placeholder="Description détaillée du produit..."
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#103a63]">
            Prix
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#d9c45a]"
            placeholder="399.00"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#103a63]">
            Ancien prix
          </label>

          <input
            type="number"
            name="compare_at_price"
            value={formData.compare_at_price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#d9c45a]"
            placeholder="672.00"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#103a63]">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#d9c45a]"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 text-sm font-medium text-[#103a63]">
          <input
            type="checkbox"
            name="is_featured"
            checked={formData.is_featured}
            onChange={handleCheckboxChange}
          />
          Produit mis en avant
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 text-sm font-medium text-[#103a63]">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleCheckboxChange}
          />
          Produit actif
        </label>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-full border border-[#103a63]/15 px-6 py-3 font-semibold text-[#103a63]"
        >
          Annuler
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#103a63] px-8 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Création..." : "Créer le produit"}
        </button>
      </div>
    </form>
  );
}