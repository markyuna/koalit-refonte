// src/components/admin/AdminNavbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Produits" },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/admin" className="text-lg font-bold text-[#103a63]">
          Koa&apos;lit <span className="font-normal text-slate-400">Admin</span>
        </Link>

        <nav className="flex items-center gap-2">
          {links.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-[#103a63] text-white"
                    : "text-[#103a63] hover:bg-[#103a63]/10"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/"
            target="_blank"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Voir le site
          </Link>
        </nav>
      </div>
    </header>
  );
}
