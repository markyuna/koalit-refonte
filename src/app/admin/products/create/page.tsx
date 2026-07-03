// src/app/admin/products/create/page.tsx

"use client";

import { useRef } from "react";

import ProductForm from "@/components/admin/ProductForm";
import NewProductImagesPicker, {
  type NewProductImagesPickerHandle,
} from "@/components/admin/NewProductImagesPicker";
import { uploadProductImage } from "@/lib/product-images";

export default function CreateProductPage() {
  const pickerRef = useRef<NewProductImagesPickerHandle | null>(null);

  const handleCreated = async (productId: string) => {
    const staged = pickerRef.current?.getStagedFiles() ?? [];

    if (staged.length === 0) return;

    const failures: string[] = [];

    for (let index = 0; index < staged.length; index += 1) {
      const { file, isCover } = staged[index];

      try {
        await uploadProductImage({
          file,
          productId,
          folderKey: productId,
          index,
          isCover,
        });
      } catch (error) {
        console.error("Erreur upload image:", error);
        failures.push(
          error instanceof Error ? error.message : file.name
        );
      }
    }

    if (failures.length > 0) {
      alert(
        `Le produit a été créé, mais certaines images n’ont pas pu être ajoutées :\n${failures.join("\n")}`
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="mb-2 text-4xl font-bold text-[#103a63]">
          Nouveau produit
        </h1>

        <p className="mb-8 text-sm text-slate-500">
          Renseignez les informations et ajoutez les photos : tout est
          enregistré ensemble à la création du produit.
        </p>

        <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr] lg:items-start">
          <div className="min-w-0">
            <ProductForm onCreated={handleCreated} />
          </div>

          <div className="min-w-0 lg:sticky lg:top-8">
            <NewProductImagesPicker ref={pickerRef} />
          </div>
        </div>
      </section>
    </main>
  );
}
