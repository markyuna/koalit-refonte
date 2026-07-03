// src/components/layout/Navbar.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, User, X } from "lucide-react";
import clsx from "clsx";

import { boutiqueLinks } from "@/lib/nav-links";
import { createClient } from "@/lib/supabase-browser";

const navLinks = [
  { href: "/quiz-sommeil", label: "Quiz sommeil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/magasin", label: "Magasin" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const mobileMenuId = useId();
  const boutiqueMenuId = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [boutiqueOpen, setBoutiqueOpen] = useState(false);
  const [mobileBoutiqueOpen, setMobileBoutiqueOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const boutiqueRef = useRef<HTMLDivElement | null>(null);
  const boutiqueTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

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

  useEffect(() => {
    if (!boutiqueOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        boutiqueRef.current &&
        !boutiqueRef.current.contains(event.target as Node)
      ) {
        setBoutiqueOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setBoutiqueOpen(false);
        boutiqueTriggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [boutiqueOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setMobileBoutiqueOpen(false);
  };

  const closeBoutique = () => {
    setBoutiqueOpen(false);
  };

  const handleBoutiqueKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    const items = Array.from(
      boutiqueRef.current?.querySelectorAll<HTMLAnchorElement>(
        '[role="menuitem"]'
      ) ?? []
    );

    if (items.length === 0) return;

    event.preventDefault();

    if (!boutiqueOpen) {
      setBoutiqueOpen(true);
      const target = event.key === "ArrowDown" ? items[0] : items[items.length - 1];
      target?.focus();
      return;
    }

    const currentIndex = items.indexOf(document.activeElement as HTMLAnchorElement);

    if (event.key === "ArrowDown") {
      const next = items[(currentIndex + 1) % items.length];
      next?.focus();
    } else {
      const previous = items[(currentIndex - 1 + items.length) % items.length];
      previous?.focus();
    }
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
          <Link
            href="/"
            className="rounded-full px-4 py-2 transition hover:bg-[var(--koalit-blue)] hover:text-white"
          >
            Accueil
          </Link>

          <div
            ref={boutiqueRef}
            className="relative"
            onKeyDown={handleBoutiqueKeyDown}
          >
            <button
              ref={boutiqueTriggerRef}
              type="button"
              onClick={() => setBoutiqueOpen((value) => !value)}
              aria-haspopup="true"
              aria-expanded={boutiqueOpen}
              aria-controls={boutiqueMenuId}
              className="inline-flex items-center gap-1 rounded-full px-4 py-2 transition hover:bg-[var(--koalit-blue)] hover:text-white"
            >
              Boutique
              <ChevronDown
                className={clsx(
                  "h-3.5 w-3.5 transition-transform",
                  boutiqueOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>

            <div
              id={boutiqueMenuId}
              role="menu"
              aria-label="Boutique"
              className={clsx(
                "absolute left-0 top-full mt-2 w-56 rounded-2xl border border-white/70 bg-[var(--koalit-white)] p-2 text-[var(--koalit-blue)] shadow-[0_24px_60px_rgba(8,41,71,0.18)] transition",
                boutiqueOpen
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              )}
            >
              {boutiqueLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  tabIndex={boutiqueOpen ? 0 : -1}
                  onClick={closeBoutique}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium transition hover:bg-[var(--koalit-blue)] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

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

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={isLoggedIn ? "/compte" : "/connexion"}
            aria-label={isLoggedIn ? "Mon compte" : "Connexion"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/60 text-[var(--koalit-blue)] backdrop-blur-xl transition hover:bg-[var(--koalit-blue)] hover:text-white"
          >
            <User className="h-5 w-5" />
          </Link>

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
          "fixed inset-x-4 top-20 z-40 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-[2rem] border border-white/70 bg-[var(--koalit-white)]/95 shadow-[0_24px_80px_rgba(8,41,71,0.18)] backdrop-blur-2xl transition-all duration-500 lg:hidden",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        )}
      >
        <nav
          aria-label="Navigation mobile"
          className="flex flex-col p-4"
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="rounded-2xl px-5 py-4 text-lg font-semibold text-[var(--koalit-blue)] transition hover:bg-[var(--koalit-blue-soft)]"
          >
            Accueil
          </Link>

          <button
            type="button"
            onClick={() => setMobileBoutiqueOpen((value) => !value)}
            aria-expanded={mobileBoutiqueOpen}
            className="flex items-center justify-between rounded-2xl px-5 py-4 text-left text-lg font-semibold text-[var(--koalit-blue)] transition hover:bg-[var(--koalit-blue-soft)]"
          >
            Boutique
            <ChevronDown
              className={clsx(
                "h-4 w-4 transition-transform",
                mobileBoutiqueOpen && "rotate-180"
              )}
              aria-hidden="true"
            />
          </button>

          <div
            className={clsx(
              "grid overflow-hidden transition-all duration-300",
              mobileBoutiqueOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="flex flex-col overflow-hidden pl-4">
              {boutiqueLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-2xl px-5 py-3 text-base font-medium text-[var(--koalit-blue)] transition hover:bg-[var(--koalit-blue-soft)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

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
            href={isLoggedIn ? "/compte" : "/connexion"}
            onClick={closeMenu}
            className="flex items-center gap-2 rounded-2xl px-5 py-4 text-lg font-semibold text-[var(--koalit-blue)] transition hover:bg-[var(--koalit-blue-soft)]"
          >
            <User className="h-5 w-5" />
            {isLoggedIn ? "Mon compte" : "Connexion"}
          </Link>

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
