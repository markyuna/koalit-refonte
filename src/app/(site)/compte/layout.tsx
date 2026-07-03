// src/app/(site)/compte/layout.tsx

import type { Metadata } from "next";

import { getCurrentUser } from "@/lib/auth";
import AccountNav from "@/components/account/AccountNav";
import SignOutButton from "@/components/account/SignOutButton";

// Private, per-user pages -- keep the entire /compte section out of
// search results (already disallowed in robots.ts too).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function CompteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getCurrentUser();

  return (
    <main className="min-h-screen bg-[var(--koalit-cream)] px-6 pb-24 pt-32">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--koalit-gold)]">
          Mon compte
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
          <div className="space-y-4 lg:sticky lg:top-8">
            <AccountNav />
            <SignOutButton />
          </div>

          <div>{children}</div>
        </div>
      </section>
    </main>
  );
}
