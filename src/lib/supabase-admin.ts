// src/lib/supabase-admin.ts
//
// Service-role client for admin pages that need to see data across
// all users (e.g. every customer's orders), bypassing RLS. Server-only
// -- SUPABASE_SECRET_KEY must never reach the browser bundle.

import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}
