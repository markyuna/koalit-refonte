// src/app/(site)/compte/informations/page.tsx

import type { Metadata } from "next";

import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase-server";
import InformationsForm from "@/components/account/InformationsForm";

export const metadata: Metadata = {
  title: "Mes informations | Koa'lit",
};

export default async function InformationsPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name, phone")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-[var(--koalit-blue)]">
        Mes informations personnelles
      </h1>

      <div className="mt-8">
        <InformationsForm
          initial={{
            firstName: profile?.first_name ?? "",
            lastName: profile?.last_name ?? "",
            phone: profile?.phone ?? "",
            email: user.email ?? "",
          }}
        />
      </div>
    </div>
  );
}
