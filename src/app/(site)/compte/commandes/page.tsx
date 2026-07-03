// src/app/(site)/compte/commandes/page.tsx
//
// No orders table exists in this project yet, so this always shows
// the empty state. Once a real orders/order_items schema exists,
// fetch and list the user's orders here instead.

import type { Metadata } from "next";
import Link from "next/link";

import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Mes commandes | Koa'lit",
};

export default async function CommandesPage() {
  await getCurrentUser();

  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-[var(--koalit-blue)]">
        Mes commandes
      </h1>

      <div className="mt-8 rounded-2xl border border-dashed border-[var(--koalit-blue)]/20 p-10 text-center">
        <p className="text-neutral-600">
          Vous n&apos;avez pas encore de commande.
        </p>

        <Link
          href="/matelas"
          className="mt-6 inline-flex rounded-full bg-[var(--koalit-blue)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Découvrir nos matelas
        </Link>
      </div>
    </div>
  );
}
