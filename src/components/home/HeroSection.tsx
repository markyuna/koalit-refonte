"use client";

import Image from "next/image";
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

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl gap-14 px-6 pb-20 pt-32 sm:pt-36 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-16 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-1 max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--koalit-gold)]/45 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--koalit-blue)] shadow-[0_16px_50px_rgba(8,41,71,0.08)] backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[var(--koalit-gold)]" />
            Offre de la semaine
          </div>

          <h1 className="max-w-5xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-[var(--koalit-blue-dark)] sm:text-5xl md:text-5xl lg:text-7xl lg:leading-[0.92] lg:tracking-[-0.06em]">
            Réveillez-vous différent avec Koa&apos;lit.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--koalit-text)] sm:text-lg sm:leading-8 md:text-lg lg:mt-8 lg:text-xl lg:leading-9">
            Découvrez une literie haut de gamme pensée pour transformer vos
            nuits en véritables moments de récupération, de confort et de
            sérénité.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-10">
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

          <div className="mt-8 flex flex-wrap gap-3 lg:mt-9">
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

          <div className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-[var(--koalit-blue)]/10 rounded-[1.75rem] border border-[var(--koalit-blue)]/10 bg-white/55 p-2 shadow-[0_20px_70px_rgba(8,41,71,0.08)] backdrop-blur-xl lg:mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="px-3 py-4 sm:px-4">
                <p className="text-lg font-bold text-[var(--koalit-blue)] sm:text-xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-[0.68rem] leading-5 text-[var(--koalit-text)] sm:text-xs">
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
          className="relative order-2"
        >
          <div className="absolute right-5 top-5 z-10 hidden max-w-[13rem] rounded-[1.5rem] border border-white/70 bg-white/75 p-4 shadow-[0_24px_80px_rgba(8,41,71,0.16)] backdrop-blur-2xl lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--koalit-gold)]">
              Expérience
            </p>

            <p className="mt-2 text-sm font-semibold leading-6 text-[var(--koalit-blue-dark)]">
              Confort hôtelier et accompagnement sur mesure.
            </p>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] border border-white/70 bg-[var(--koalit-blue-soft)] shadow-[0_36px_100px_rgba(8,41,71,0.22)] sm:rounded-[2.75rem] md:aspect-[16/12] lg:aspect-[4/5] lg:shadow-[0_44px_120px_rgba(8,41,71,0.24)]">
            <Image
              src="/images/koalit-offre-semaine.webp"
              alt="Offre de la semaine Koa'lit literie premium"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="scale-105 object-cover object-[50%_60%]"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,41,71,0.02),rgba(8,41,71,0.28))]" />
          </div>

          <div className="absolute -bottom-7 left-5 right-5 rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-[0_30px_90px_rgba(8,41,71,0.18)] backdrop-blur-2xl sm:left-6 sm:right-6 sm:rounded-[2rem]">
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