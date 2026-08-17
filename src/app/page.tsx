"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

const Preloader = dynamic(
  () => import("@/components/preloader/Preloader"),
  { ssr: false }
);

const Scene = dynamic(
  () => import("@/components/three/Scene"),
  { ssr: false }
);

const LenisProvider = dynamic(
  () => import("@/components/scroll/LenisProvider"),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import("@/components/scroll/ScrollProgress"),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/components/effects/CustomCursor"),
  { ssr: false }
);

const ScrollDust = dynamic(
  () => import("@/components/effects/ScrollDust"),
  { ssr: false }
);

const WhatsAppFloat = dynamic(
  () => import("@/components/effects/WhatsAppFloat"),
  { ssr: false }
);

const SectionFlash = dynamic(
  () => import("@/components/effects/SectionFlash"),
  { ssr: false }
);

const TimeMarkers = dynamic(
  () => import("@/components/effects/TimeMarkers"),
  { ssr: false }
);

const HeroSection = dynamic(
  () => import("@/components/sections/HeroSection"),
  { ssr: false }
);

const OrbitSection = dynamic(
  () => import("@/components/sections/OrbitSection"),
  { ssr: false }
);

const TechSection = dynamic(
  () => import("@/components/sections/TechSection"),
  { ssr: false }
);

const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection"),
  { ssr: false }
);

const WorkshopSection = dynamic(
  () => import("@/components/sections/WorkshopSection"),
  { ssr: false }
);

const StatsSection = dynamic(
  () => import("@/components/sections/StatsSection"),
  { ssr: false }
);

const CompanySection = dynamic(
  () => import("@/components/sections/CompanySection"),
  { ssr: false }
);

const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection"),
  { ssr: false }
);

const FleetSection = dynamic(
  () => import("@/components/sections/FleetSection"),
  { ssr: false }
);

const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  { ssr: false }
);

const FinaleSection = dynamic(
  () => import("@/components/sections/FinaleSection"),
  { ssr: false }
);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0A0A0A]">
      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Film grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Premium effects (only after loaded) */}
      {isLoaded && <CustomCursor />}
      {isLoaded && <ScrollDust />}
      {isLoaded && <SectionFlash />}
      {isLoaded && <WhatsAppFloat />}

      {/* 3D Scene — fixed background */}
      {isLoaded && <Scene />}

      {/* UI overlays */}
      {isLoaded && <ScrollProgress />}
      {isLoaded && <TimeMarkers />}

      {/* Main scrollable content */}
      {isLoaded && (
        <LenisProvider>
          <div className="relative z-10">
            <HeroSection />
            <OrbitSection />
            <TechSection />
            <ServicesSection />
            <WorkshopSection />
            <StatsSection />
            <CompanySection />
            <ProjectsSection />
            <FleetSection />
            <ContactSection />
            <FinaleSection />
          </div>
        </LenisProvider>
      )}
    </main>
  );
}
