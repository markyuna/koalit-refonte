// src/lib/auth.ts
//
// Data Access Layer for /compte/*. The proxy already does an
// optimistic redirect for unauthenticated visitors, but per the
// Next.js auth guide, the real (secure) check belongs close to the
// data -- this is that check, called from each /compte/* page/layout.

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase-server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  return user;
}
