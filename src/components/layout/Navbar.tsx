// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { href: "#collections", label: "Collections" },
  { href: "#experience", label: "Expérience" },
  { href: "#confiance", label: "Confiance" },
  { href: "#diagnostic", label: "Diagnostic" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 md:px-6">
      <div
        className={clsx(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-500",
          hasScrolled
            ? "border-white/70 bg-[#F8F5F0]/80 shadow-[0_18px_60px_rgba(17,17,17,0.10)] backdrop-blur-2xl"
            : "border-transparent bg-transparent"
        )}
      >
        <Link
          href="/"
          className="relative z-50 text-xl font-semibold tracking-tight text-[#111111]"
          onClick={() => setIsOpen(false)}
        >
          Koalit
        </Link>

        <nav className="hidden items-center gap-2 rounded-full bg-white/45 p-1 text-sm text-[#6E5641] backdrop-blur-xl md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 transition hover:bg-white hover:text-[#111111]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="#contact"
            className="rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(17,17,17,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6E5641]"
          >
            Réserver un essai
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-white shadow-lg transition hover:bg-[#6E5641] md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={clsx(
          "fixed inset-x-4 top-20 z-40 overflow-hidden rounded-[2rem] border border-white/70 bg-[#F8F5F0]/95 shadow-[0_24px_80px_rgba(17,17,17,0.16)] backdrop-blur-2xl transition-all duration-500 md:hidden",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        )}
      >
        <nav className="flex flex-col p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-5 py-4 text-lg font-medium text-[#111111] transition hover:bg-white"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-3 rounded-full bg-[#111111] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#6E5641]"
          >
            Réserver un essai
          </Link>
        </nav>
      </div>
    </header>
  );
}