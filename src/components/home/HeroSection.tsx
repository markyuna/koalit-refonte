// src/components/home/HeroSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const benefits = [
  "Conseil personnalisé",
  "Essai possible",
  "Confort premium",
];

const stats = [
  { value: "01", label: "Diagnostic sommeil" },
  { value: "02", label: "Conseil expert" },
  { value: "03", label: "Literie adaptée" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F8F5F0]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(184,155,114,0.24),transparent_32%),radial-gradient(circle_at_88%_20%,rgba(110,86,65,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.7),rgba(248,245,240,0.95))]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute right-[-12rem] top-28 h-[28rem] w-[28rem] rounded-full bg-[#B89B72]/20 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 0.45, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.15 }}
        className="pointer-events-none absolute bottom-[-10rem] left-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[#6E5641]/15 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 pb-20 pt-36 lg:grid-cols-[1.04fr_0.96fr] lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DCCDBE] bg-white/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#6E5641] shadow-[0_16px_50px_rgba(17,17,17,0.06)] backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[#B89B72]" />
            Maison française du sommeil
          </div>

          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-[#111111] md:text-7xl lg:text-8xl">
            Le sommeil devient une expérience premium.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#6E5641] md:text-xl md:leading-9">
            Découvrez une literie haut de gamme pensée pour transformer vos
            nuits en véritables moments de récupération, de confort et de
            sérénité.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#collections"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-7 py-4 text-sm font-semibold text-white shadow-[0_24px_70px_rgba(17,17,17,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6E5641]"
            >
              Découvrir la collection
              <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="#diagnostic"
              className="inline-flex items-center justify-center rounded-full border border-[#DCCDBE] bg-white/55 px-7 py-4 text-sm font-semibold text-[#111111] shadow-[0_18px_55px_rgba(17,17,17,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Diagnostic sommeil gratuit
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="inline-flex items-center gap-2 rounded-full border border-[#E8E5E0] bg-white/45 px-4 py-2 text-sm font-medium text-[#6E5641] backdrop-blur"
              >
                <CheckCircle2 className="h-4 w-4 text-[#B89B72]" />
                {benefit}
              </div>
            ))}
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-[#DCCDBE] rounded-[1.75rem] border border-[#E8E5E0] bg-white/45 p-2 shadow-[0_20px_70px_rgba(17,17,17,0.06)] backdrop-blur-xl">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-4">
                <p className="text-xl font-semibold text-[#111111]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-5 text-[#6E5641]">
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
          <div className="absolute -left-8 top-12 z-10 hidden rounded-3xl border border-white/70 bg-white/70 p-5 shadow-[0_24px_80px_rgba(17,17,17,0.14)] backdrop-blur-2xl md:block">
            <p className="text-xs uppercase tracking-[0.24em] text-[#B89B72]">
              Expérience
            </p>
            <p className="mt-2 max-w-[12rem] text-sm font-medium leading-6 text-[#111111]">
              Confort hôtelier et accompagnement sur mesure.
            </p>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.75rem] border border-white/60 bg-[#DCCDBE] shadow-[0_44px_120px_rgba(17,17,17,0.22)]">
            <img
              src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=1600&auto=format&fit=crop"
              alt="Chambre premium avec literie haut de gamme"
              className="h-full w-full scale-105 object-cover"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.04),rgba(17,17,17,0.28))]" />
          </div>

          <div className="absolute -bottom-8 left-6 right-6 rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_30px_90px_rgba(17,17,17,0.18)] backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-[#111111]">
                  Une literie choisie pour votre corps.
                </p>
                <p className="mt-1 text-sm leading-6 text-[#6E5641]">
                  Conseil, confort et sérénité dès le premier essai.
                </p>
              </div>

              <div className="hidden rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold text-white sm:block">
                Premium
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#9D8D7C] lg:flex">
        <span className="h-px w-10 bg-[#DCCDBE]" />
        Scroll
        <span className="h-px w-10 bg-[#DCCDBE]" />
      </div>
    </section>
  );
}