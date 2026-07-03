import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <span className="rounded-full bg-[#d9c45a]/15 px-4 py-2 text-sm font-medium text-[#103a63]">
            Administration
          </span>

          <h1 className="mt-4 text-4xl font-bold text-[#103a63]">
            Dashboard Koal&apos;it
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Gérez vos matelas, oreillers et contenus du site
            depuis une interface centralisée.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/admin/products"
            className="rounded-[2rem] border border-white bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <h2 className="text-xl font-bold text-[#103a63]">
              Produits
            </h2>

            <p className="mt-3 text-slate-600">
              Ajouter, modifier ou supprimer les produits du catalogue.
            </p>
          </Link>

          <div className="rounded-[2rem] border border-white bg-white p-8 opacity-70 shadow-sm">
            <h2 className="text-xl font-bold text-[#103a63]">
              Catégories
            </h2>

            <p className="mt-3 text-slate-600">
              Gestion des catégories du catalogue.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white bg-white p-8 opacity-70 shadow-sm">
            <h2 className="text-xl font-bold text-[#103a63]">
              Réservations
            </h2>

            <p className="mt-3 text-slate-600">
              Gestion des demandes d&apos;essai et contacts.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}