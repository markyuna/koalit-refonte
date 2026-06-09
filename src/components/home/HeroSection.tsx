"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const benefits = ["Conseil personnalisé", "Essai possible", "Confort premium"];

const stats = [
  { value: "01", label: "Diagnostic sommeil" },
  { value: "02", label: "Conseil expert" },
  { value: "03", label: "Literie adaptée" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--koalit-cream)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(217,196,90,0.28),transparent_32%),radial-gradient(circle_at_88%_20%,rgba(16,58,99,0.18),transparent_34%),linear-gradient(180deg,rgba(252,251,248,0.78),rgba(247,244,238,0.96))]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute right-[-12rem] top-28 h-[28rem] w-[28rem] rounded-full bg-[var(--koalit-gold)]/30 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 0.42, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.15 }}
        className="pointer-events-none absolute bottom-[-10rem] left-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[var(--koalit-blue)]/25 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 pb-20 pt-36 lg:grid-cols-[1.04fr_0.96fr] lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--koalit-gold)]/45 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--koalit-blue)] shadow-[0_16px_50px_rgba(8,41,71,0.08)] backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[var(--koalit-gold)]" />
            Maison française du sommeil
          </div>

          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-[var(--koalit-blue-dark)] md:text-7xl lg:text-8xl">
            Le sommeil devient une expérience premium.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--koalit-text)] md:text-xl md:leading-9">
            Découvrez une literie haut de gamme pensée pour transformer vos
            nuits en véritables moments de récupération, de confort et de
            sérénité.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#collections"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--koalit-blue)] px-7 py-4 text-sm font-bold text-white shadow-[0_24px_70px_rgba(8,41,71,0.24)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--koalit-blue-dark)]"
            >
              Découvrir la collection
              <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="#diagnostic"
              className="inline-flex items-center justify-center rounded-full border border-[var(--koalit-gold)]/55 bg-white/65 px-7 py-4 text-sm font-bold text-[var(--koalit-blue)] shadow-[0_18px_55px_rgba(8,41,71,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--koalit-gold)] hover:text-[var(--koalit-blue-dark)]"
            >
              Diagnostic sommeil gratuit
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--koalit-blue)]/10 bg-white/50 px-4 py-2 text-sm font-medium text-[var(--koalit-text)] backdrop-blur"
              >
                <CheckCircle2 className="h-4 w-4 text-[var(--koalit-gold)]" />
                {benefit}
              </div>
            ))}
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-[var(--koalit-blue)]/10 rounded-[1.75rem] border border-[var(--koalit-blue)]/10 bg-white/55 p-2 shadow-[0_20px_70px_rgba(8,41,71,0.08)] backdrop-blur-xl">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-4">
                <p className="text-xl font-bold text-[var(--koalit-blue)]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--koalit-text)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -left-8 top-12 z-10 hidden rounded-3xl border border-white/70 bg-white/75 p-5 shadow-[0_24px_80px_rgba(8,41,71,0.16)] backdrop-blur-2xl md:block">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--koalit-gold)]">
              Expérience
            </p>
            <p className="mt-2 max-w-[12rem] text-sm font-semibold leading-6 text-[var(--koalit-blue-dark)]">
              Confort hôtelier et accompagnement sur mesure.
            </p>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.75rem] border border-white/70 bg-[var(--koalit-blue-soft)] shadow-[0_44px_120px_rgba(8,41,71,0.24)]">
            <img
              src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=1600&auto=format&fit=crop"
              alt="Chambre premium avec literie haut de gamme"
              className="h-full w-full scale-105 object-cover"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,41,71,0.02),rgba(8,41,71,0.34))]" />
          </div>

          <div className="absolute -bottom-8 left-6 right-6 rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_30px_90px_rgba(8,41,71,0.18)] backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-bold text-[var(--koalit-blue-dark)]">
                  Une literie choisie pour votre corps.
                </p>
                <p className="mt-1 text-sm leading-6 text-[var(--koalit-text)]">
                  Conseil, confort et sérénité dès le premier essai.
                </p>
              </div>

              <div className="hidden rounded-full bg-[var(--koalit-gold)] px-4 py-2 text-xs font-bold text-[var(--koalit-blue-dark)] sm:block">
                Premium
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[0.28em] text-[var(--koalit-muted)] lg:flex">
        <span className="h-px w-10 bg-[var(--koalit-gold)]/60" />
        Scroll
        <span className="h-px w-10 bg-[var(--koalit-gold)]/60" />
      </div>
    </section>
  );
}