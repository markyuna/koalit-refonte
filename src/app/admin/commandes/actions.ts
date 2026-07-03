// src/app/admin/commandes/actions.ts

"use server";

import { revalidatePath } from "next/cache";

import { createAdminClient } from "@/lib/supabase-admin";

export async function deleteOrder(orderId: string) {
  const admin = createAdminClient();

  const { error } = await admin.from("orders").delete().eq("id", orderId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/commandes");
}
