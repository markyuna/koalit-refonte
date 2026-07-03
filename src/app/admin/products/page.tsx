// src/app/admin/products/page.tsx

import Link from "next/link";

import DeleteProductButton from "@/components/admin/DeleteProductButton";
import { supabase } from "@/lib/supabase";

type Category =
  | {
      name: string;
      slug: string;
    }
  | {
      name: string;
      slug: string;
    }[]
  | null;

type Variant = {
  price: number;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  compare_at_price: number | null;
  stock: number | null;
  is_active: boolean | null;
  is_featured: boolean | null;
  categories: Category;
  product_variants: Variant[] | null;
};

function getCategoryName(category: Category) {
  if (Array.isArray(category)) {
    return category[0]?.name ?? "Sans catégorie";
  }

  return category?.name ?? "Sans catégorie";
}

function getDisplayPrice(product: Product) {
  const variants = product.product_variants ?? [];

  if (variants.length === 0) {
    return { price: product.price, fromVariants: false };
  }

  const cheapest = Math.min(...variants.map((variant) => variant.price));

  return { price: cheapest, fromVariants: true };
}

export default async function AdminProductsPage() {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      price,
      compare_at_price,
      stock,
      is_active,
      is_featured,
      categories (
        name,
        slug
      ),
      product_variants (
        price
      )
    `
    )
    .order("created_at", { ascending: false });

  const products = (data ?? []) as unknown as Product[];

  if (error) {
    console.error("Erreur chargement produits:", error);
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#103a63]">Produits</h1>
            <p className="mt-3 text-slate-600">
              Gestion du catalogue Koal&apos;it.
            </p>
          </div>

          <Link
            href="/admin/products/create"
            className="rounded-full bg-[#103a63] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Ajouter un produit
          </Link>
        </div>

        <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
          {products.length === 0 ? (
            <p className="p-8 text-slate-500">
              Aucun produit disponible pour le moment.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left">
                <thead className="bg-[#103a63] text-white">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold">Produit</th>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Catégorie
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold">Prix</th>
                    <th className="px-6 py-4 text-sm font-semibold">Stock</th>
                    <th className="px-6 py-4 text-sm font-semibold">Statut</th>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Mise en avant
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => {
                    const { price, fromVariants } = getDisplayPrice(product);

                    return (
                    <tr
                      key={product.id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-6 py-5">
                        <p className="font-semibold text-[#103a63]">
                          {product.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {product.slug}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {getCategoryName(product.categories)}
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-semibold text-[#103a63]">
                          {price
                            ? `${fromVariants ? "Dès " : ""}${price} €`
                            : "-"}
                        </p>

                        {!fromVariants && product.compare_at_price && (
                          <p className="text-sm text-slate-400 line-through">
                            {product.compare_at_price} €
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {product.stock ?? 0}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${
                            product.is_active
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {product.is_active ? "Actif" : "Brouillon"}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {product.is_featured ? "Oui" : "Non"}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex gap-3">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="rounded-full bg-[#103a63] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                          >
                            Modifier
                          </Link>

                          <DeleteProductButton productId={product.id} />
                        </div>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}