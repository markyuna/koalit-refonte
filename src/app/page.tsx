import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import SocialProofSection from "@/components/home/SocialProofSection";
import CollectionsSection from "@/components/home/CollectionsSection";
import TrustSection from "@/components/home/TrustSection";
import DiagnosticSection from "@/components/home/DiagnosticSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8F5F0] text-[#111111]">
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <SocialProofSection />
      <CollectionsSection />
      <TrustSection />
      <DiagnosticSection />
      <Footer />
    </main>
  );
}