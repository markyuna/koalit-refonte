// src/lib/supabase-server.ts
//
// Session-aware Supabase client for Server Components, Server
// Actions, and Route Handlers. Reads/writes the auth cookies via
// next/headers. Use this (not src/lib/supabase.ts) anywhere that
// needs to know the current logged-in user.

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component -- safe to ignore since
            // the proxy already refreshes the session cookie.
          }
        },
      },
    }
  );
}
