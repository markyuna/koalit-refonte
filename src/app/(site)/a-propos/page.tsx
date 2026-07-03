import type { Metadata } from "next";

import AboutHero from "@/components/about/AboutHero";
import StorySection from "@/components/about/StorySection";
import ValuesSection from "@/components/about/ValuesSection";
import MissionSection from "@/components/about/MissionSection";
import VisionSection from "@/components/about/VisionSection";
import ExpertiseSection from "@/components/about/ExpertiseSection";
import AboutCta from "@/components/about/AboutCta";

export const metadata: Metadata = {
  title: "À propos | Koa'lit",
  description:
    "Découvrez l'histoire, les valeurs et la mission de Koa'lit, spécialiste de la literie premium et du conseil personnalisé pour un sommeil réparateur.",
  alternates: {
    canonical: "/a-propos",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-[var(--koalit-cream)]">
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <MissionSection />
      <VisionSection />
      <ExpertiseSection />
      <AboutCta />
    </main>
  );
}