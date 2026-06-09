import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#103a63]">
              Produits
            </h1>

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

        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <p className="text-slate-500">
            Aucun produit disponible pour le moment.
          </p>
        </div>
      </section>
    </main>
  );
}