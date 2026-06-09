export default function MatelasPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-[#d9c45a]/15 px-4 py-2 text-sm font-medium text-[#103a63]">
            Collection Matelas
          </span>

          <h1 className="mt-6 text-5xl font-bold text-[#103a63] md:text-6xl">
            Nos matelas
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Découvrez notre sélection de matelas conçus pour offrir un
            équilibre parfait entre confort, soutien et durabilité. Chaque
            modèle est pensé pour améliorer la qualité de votre sommeil.
          </p>
        </div>

        <div className="mt-16 rounded-[2rem] bg-white p-10 shadow-sm">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-semibold text-[#103a63]">
              Catalogue en préparation
            </h2>

            <p className="mt-4 max-w-xl text-slate-500">
              Les produits seront affichés ici automatiquement depuis Supabase.
              Vous pourrez bientôt consulter les fiches détaillées de chaque
              matelas.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}