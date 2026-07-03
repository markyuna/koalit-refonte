// src/app/(site)/panier/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/lib/cart-context";
import { createClient } from "@/lib/supabase-browser";
import { formatPrice } from "@/lib/product-helpers";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, clear, totalPrice } = useCart();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null);

    if (items.length === 0) return;

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/connexion?next=/panier");
      return;
    }

    setPlacing(true);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        status: "en_cours",
        total_amount: totalPrice,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("Erreur création commande:", orderError);
      setError("Une erreur est survenue, merci de réessayer.");
      setPlacing(false);
      return;
    }

    const { error: itemsError } = await supabase.from("order_items").insert(
      items.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.name,
        unit_price: item.price,
        quantity: item.quantity,
      }))
    );

    if (itemsError) {
      console.error("Erreur enregistrement articles:", itemsError);
      setError("Une erreur est survenue, merci de réessayer.");
      setPlacing(false);
      return;
    }

    clear();
    router.push("/compte/commandes");
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--koalit-cream)] px-6 pb-24 pt-32">
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--koalit-blue)]">
            Votre panier est vide
          </h1>

          <p className="mt-4 text-neutral-600">
            Découvrez notre sélection de matelas et de literie.
          </p>

          <Link
            href="/matelas"
            className="mt-8 inline-flex rounded-full bg-[var(--koalit-blue)] px-7 py-4 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Découvrir nos matelas
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--koalit-cream)] px-6 pb-24 pt-32">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--koalit-blue)]">
          Votre panier
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.productId}
                className="flex items-center gap-4 rounded-[2rem] bg-white p-5 shadow-sm"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#efe8db]">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    href={item.href}
                    className="font-semibold text-[var(--koalit-blue)] hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-neutral-500">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    aria-label="Diminuer la quantité"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--koalit-cream)] text-[var(--koalit-blue)] transition hover:bg-[var(--koalit-blue)] hover:text-white"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>

                  <span className="w-6 text-center text-sm font-semibold text-[var(--koalit-blue)]">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    aria-label="Augmenter la quantité"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--koalit-cream)] text-[var(--koalit-blue)] transition hover:bg-[var(--koalit-blue)] hover:text-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="w-24 shrink-0 text-right font-semibold text-[var(--koalit-blue)]">
                  {formatPrice(item.price * item.quantity)}
                </p>

                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  aria-label="Retirer"
                  title="Retirer"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-[2rem] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[var(--koalit-blue)]">
              Récapitulatif
            </h2>

            <div className="mt-5 flex items-center justify-between border-t border-[var(--koalit-border)] pt-5 text-lg font-semibold text-[var(--koalit-blue)]">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            {error && (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={placing}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--koalit-blue)] px-7 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {placing ? "Traitement..." : "Passer la commande"}
            </button>

            <p className="mt-3 text-center text-xs text-neutral-500">
              Aucun paiement n&apos;est requis pour le moment.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
