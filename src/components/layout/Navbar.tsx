// src/components/layout/Navbar.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/matelas", label: "Matelas" },
  { href: "/sommiers", label: "Sommiers" },
  { href: "/quiz-sommeil", label: "Quiz sommeil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/magasin", label: "Magasin" },
];

export default function Navbar() {
  const mobileMenuId = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 md:px-6">
      <div
        className={clsx(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-500",
          hasScrolled
            ? "border-white/70 bg-[var(--koalit-white)]/90 shadow-[0_18px_60px_rgba(8,41,71,0.14)] backdrop-blur-2xl"
            : "border-transparent bg-[var(--koalit-white)]/25 backdrop-blur-sm"
        )}
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="relative z-50 flex items-center transition hover:opacity-80"
          aria-label="Retour à l’accueil Koa’lit"
        >
          <Image
            src="/logo.png"
            alt=""
            width={788}
            height={250}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-2 rounded-full bg-white/60 p-1 text-sm font-medium text-[var(--koalit-blue)] backdrop-blur-xl lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 transition hover:bg-[var(--koalit-blue)] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="rounded-full bg-[var(--koalit-gold)] px-6 py-3 text-sm font-bold text-[var(--koalit-blue-dark)] shadow-[0_14px_40px_rgba(217,196,90,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--koalit-gold-hover)]"
          >
            Réserver un essai
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          aria-controls={mobileMenuId}
          className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--koalit-blue)] text-white shadow-lg transition hover:bg-[var(--koalit-blue-dark)] lg:hidden"
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      <div
        id={mobileMenuId}
        className={clsx(
          "fixed inset-x-4 top-20 z-40 overflow-hidden rounded-[2rem] border border-white/70 bg-[var(--koalit-white)]/95 shadow-[0_24px_80px_rgba(8,41,71,0.18)] backdrop-blur-2xl transition-all duration-500 lg:hidden",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        )}
      >
        <nav
          aria-label="Navigation mobile"
          className="flex flex-col p-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="rounded-2xl px-5 py-4 text-lg font-semibold text-[var(--koalit-blue)] transition hover:bg-[var(--koalit-blue-soft)]"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-3 rounded-full bg-[var(--koalit-gold)] px-6 py-4 text-center text-sm font-bold text-[var(--koalit-blue-dark)] transition hover:bg-[var(--koalit-gold-hover)]"
          >
            Réserver un essai
          </Link>
        </nav>
      </div>
    </header>
  );
}