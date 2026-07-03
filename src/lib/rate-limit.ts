// src/lib/rate-limit.ts

import { supabase } from "@/lib/supabase";

const WINDOW_MINUTES = 10;
const MAX_HITS = 5;

/**
 * Simple IP-based rate limiter backed by a Supabase table (no
 * Upstash/Redis configured in this project). Not perfectly race-safe
 * under concurrent requests, but good enough as a first line of
 * defense against casual abuse.
 */
export async function checkRateLimit(ip: string, endpoint: string) {
  const windowStart = new Date(
    Date.now() - WINDOW_MINUTES * 60 * 1000
  ).toISOString();

  // Opportunistic cleanup of old rows so the table doesn't grow forever.
  await supabase
    .from("rate_limit_hits")
    .delete()
    .lt("created_at", new Date(Date.now() - 60 * 60 * 1000).toISOString());

  const { count } = await supabase
    .from("rate_limit_hits")
    .select("id", { count: "exact", head: true })
    .eq("ip", ip)
    .eq("endpoint", endpoint)
    .gte("created_at", windowStart);

  if ((count ?? 0) >= MAX_HITS) {
    return { allowed: false };
  }

  await supabase.from("rate_limit_hits").insert({ ip, endpoint });

  return { allowed: true };
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  return request.headers.get("x-real-ip") ?? "unknown";
}
