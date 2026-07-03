// src/components/account/SignOutButton.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase-browser";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/connexion");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="w-full rounded-2xl border border-[var(--koalit-blue)]/15 px-4 py-3 text-sm font-semibold text-[var(--koalit-blue)] transition hover:bg-[var(--koalit-blue-soft)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Déconnexion..." : "Se déconnecter"}
    </button>
  );
}
