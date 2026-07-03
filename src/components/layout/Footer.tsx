// src/components/layout/Footer.tsx

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { boutiqueLinks } from "@/lib/nav-links";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M14.5 8.5h2V5.2c-.35-.05-1.55-.15-2.95-.15-2.92 0-4.92 1.78-4.92 5.05v2.65H5.75v3.68h2.88V21h3.8v-4.57h2.76l.44-3.68h-3.2V10.5c0-1.06.29-1.79 1.83-1.79Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M16.5 3c.3 1.9 1.6 3.4 3.5 3.7v2.6a6.6 6.6 0 0 1-3.5-1v6.4a5.4 5.4 0 1 1-5.4-5.4c.3 0 .6 0 .9.07v2.7a2.7 2.7 0 1 0 1.9 2.6V3h2.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

const aideLinks = [
  { href: "/contact", label: "Nous contacter" },
  { href: "/suivre-ma-commande", label: "Suivre ma commande" },
  { href: "/portail-des-retours", label: "Portail des retours" },
  { href: "/a-propos", label: "Notre histoire" },
];

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/conditions-generales-de-vente", label: "Conditions générales de vente" },
  { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
];

const socialLinks = [
  { href: "https://www.instagram.com/koalitosny/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.facebook.com/people/Koalit/61569961846840/", label: "Facebook", Icon: FacebookIcon },
  { href: "https://www.tiktok.com/@koalitosny?is_from_webapp=1&sender_device=pc", label: "TikTok", Icon: TikTokIcon },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-[var(--koalit-blue)]/10 bg-[var(--koalit-blue-dark)] text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Colonne 1 — Marque et contact */}
          <div>
            <span className="text-2xl font-black tracking-tight text-[var(--koalit-gold)]">
              Koa&apos;lit
            </span>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
              Pour une nuit réussie.
            </p>

            <div className="mt-6 space-y-3 text-sm leading-6 text-white/75">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--koalit-gold)]" />
                <span>3 chemin du Poirier, Charles Guérin, 95520 Osny</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[var(--koalit-gold)]" />
                <a href="tel:+33134412273" className="hover:text-white">
                  01 34 41 22 73
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[var(--koalit-gold)]" />
                <a href="mailto:literie1@koalit.fr" className="hover:text-white">
                  literie1@koalit.fr
                </a>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 — Boutique */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--koalit-gold)]">
              Boutique
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              {boutiqueLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/75 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Aide et service client */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--koalit-gold)]">
              Aide et service client
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              {aideLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/75 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl bg-white/5 p-4 text-sm">
              <p className="font-semibold text-white">Horaires</p>
              <p className="mt-2 text-white/70">Lundi–samedi : 10h–19h</p>
              <p className="text-white/70">Dimanche : 10h–18h</p>
            </div>
          </div>

          {/* Colonne 4 — Informations légales + CTA */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--koalit-gold)]">
              Informations légales
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/75 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-[var(--koalit-gold)] px-6 py-3 text-sm font-bold text-[var(--koalit-blue-dark)] transition hover:bg-[var(--koalit-gold-hover)]"
            >
              Parler à un conseiller
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 text-center text-xs text-white/50 sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black tracking-tight text-[var(--koalit-gold)]">
              Koa&apos;lit
            </span>
            <span>Pour une nuit réussie</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {["PayPal", "Alma", "CB", "Mastercard", "Visa"].map((method) => (
              <span
                key={method}
                className="rounded-full bg-white/10 px-3 py-1 font-semibold text-white/70"
              >
                {method}
              </span>
            ))}
          </div>

          <div className="space-y-1">
            <p>© 2026 Koa&apos;lit. Tous droits réservés.</p>
            <p>Création et conception du site, contenu éditorial et expertise SEO : Marcos Suarez</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
