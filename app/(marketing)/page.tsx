import Navbar from "@/components/navbar/navbar";
import HeroSection from "@/components/landing-page-features/hero-section";
import ProblemValueSection from "@/components/landing-page-features/problem-value-section";
import FeaturesSection from "@/components/landing-page-features/features-section";
import HowItWorksSection from "@/components/landing-page-features/how-it-works-section";
import WhoItsForSection from "@/components/landing-page-features/who-its-for-section";
import DashboardPreviewSection from "@/components/landing-page-features/dashboard-preview-section";
import BenefitsProofSection from "@/components/landing-page-features/benefits-proof-section";
import AudienceTrustSection from "@/components/landing-page-features/audience-trust-section";
import FinalCtaSection from "@/components/landing-page-features/final-cta-section";
import FaqSection from "@/components/landing-page-features/faq-section";
import Footer from "@/components/landing-page-features/footer-section";
import { ScrollToTopButton } from "@/components/landing-page-features/scroll-to-top-button";
const role = "admin";
export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 dark:hidden bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_35%,#f5f3ff_70%,#ffffff_100%)]" />
        <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_18%_22%,rgba(34,211,238,0.14)_0%,transparent_32%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.10)_0%,transparent_30%),radial-gradient(circle_at_55%_60%,rgba(6,182,212,0.05)_0%,transparent_28%),linear-gradient(135deg,#020807_0%,#041311_30%,#061917_55%,#03100f_78%,#010505_100%)]" />
        <div className="absolute left-[18%] top-[22%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/10" />
        <div className="absolute right-[12%] top-[18%] h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-400/10" />
        <div className="absolute bottom-[10%] left-[50%] h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-400/10" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ProblemValueSection />
        <FeaturesSection />
        <HowItWorksSection />
        <WhoItsForSection />
        <DashboardPreviewSection />
        <BenefitsProofSection />
        <AudienceTrustSection />
        <FinalCtaSection />
        <FaqSection />
        <Footer />
        <ScrollToTopButton />
      </div>
    </main>
  );
}