// src/app/(site)/compte/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Mon compte | Koa'lit",
};

export default async function ComptePage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .maybeSingle();

  const displayName = [profile?.first_name, profile?.last_name]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-[var(--koalit-blue)]">
          {displayName ? `Bonjour, ${displayName}` : "Bonjour"}
        </h1>

        <p className="mt-3 text-neutral-700">{user.email}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/compte/informations"
          className="rounded-[2rem] border border-[var(--koalit-blue)]/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-[var(--koalit-blue)]">
            Mes informations
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Modifiez votre prénom, nom, téléphone et email.
          </p>
        </Link>

        <Link
          href="/compte/adresses"
          className="rounded-[2rem] border border-[var(--koalit-blue)]/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-[var(--koalit-blue)]">
            Mes adresses
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Gérez vos adresses de livraison et de facturation.
          </p>
        </Link>

        <Link
          href="/compte/commandes"
          className="rounded-[2rem] border border-[var(--koalit-blue)]/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-[var(--koalit-blue)]">
            Mes commandes
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Consultez l&apos;historique de vos commandes.
          </p>
        </Link>
      </div>
    </div>
  );
}
