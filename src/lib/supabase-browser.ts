// src/lib/supabase-browser.ts
//
// Session-aware Supabase client for Client Components (auth pages,
// /compte/* dashboard). Separate from src/lib/supabase.ts, which is
// the plain anon client used everywhere else in the app (products,
// admin, contact, returns) and doesn't need cookie-based sessions.

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
