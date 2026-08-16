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

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const showPreloader = !isLoaded;

  return (
    <main className="relative min-h-screen bg-[#0A0A0A]">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      <div className="grain" aria-hidden="true" />

      <div
        className={
          "relative z-10 transition-opacity duration-700 " +
          (isLoaded ? "opacity-100" : "opacity-0")
        }
      >
        {/* Hero Section */}
        <section className="relative flex h-screen items-center justify-center overflow-hidden">
          {/* 3D Scene behind everything */}
          {isLoaded && <Scene />}

          {/* Hero text overlay */}
          <div className="relative z-10 text-center">
            <h1 className="text-6xl font-bold tracking-tight text-white md:text-8xl">
              CONEXPET
            </h1>
            <p className="mt-4 text-lg text-[#8A8A8A] md:text-xl">
              Logistica y Transporte de Carga Pesada
            </p>
            <div className="mx-auto mt-8 h-px w-16 bg-[#DC2626]" />
          </div>

          {/* Bottom gradient */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        </section>

        {/* Placeholder for Paso 4 scroll sections */}
        <section className="flex h-screen items-center justify-center">
          <p className="text-sm text-[#8A8A8A]">
            Scroll cinematografico con camara 3D - Paso 4
          </p>
        </section>
      </div>
    </main>
  );
}
