// src/components/account/AccountNav.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/compte", label: "Mon compte" },
  { href: "/compte/informations", label: "Mes informations" },
  { href: "/compte/adresses", label: "Mes adresses" },
  { href: "/compte/commandes", label: "Mes commandes" },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 rounded-[2rem] bg-white p-3 shadow-sm">
      {links.map((link) => {
        const isActive =
          link.href === "/compte"
            ? pathname === "/compte"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "rounded-2xl px-4 py-3 text-sm font-semibold transition",
              isActive
                ? "bg-[var(--koalit-blue)] text-white"
                : "text-[var(--koalit-blue)] hover:bg-[var(--koalit-blue-soft)]"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
