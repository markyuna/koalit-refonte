import ProductForm from "@/components/admin/ProductForm";

export default function CreateProductPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="mb-8 text-4xl font-bold text-[#103a63]">
          Nouveau produit
        </h1>

        <ProductForm />
      </section>
    </main>
  );
}