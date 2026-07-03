// src/app/(site)/compte/adresses/page.tsx

import type { Metadata } from "next";

import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase-server";
import AddressesManager from "@/components/account/AddressesManager";

export const metadata: Metadata = {
  title: "Mes adresses | Koa'lit",
};

export default async function AdressesPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: addresses } = await supabase
    .from("addresses")
    .select(
      "id, label, full_name, address_line1, address_line2, postal_code, city, country, phone, is_default"
    )
    .eq("user_id", user.id)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: true });

  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-[var(--koalit-blue)]">
        Mes adresses
      </h1>

      <div className="mt-8">
        <AddressesManager userId={user.id} initialAddresses={addresses ?? []} />
      </div>
    </div>
  );
}
