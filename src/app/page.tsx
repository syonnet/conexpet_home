"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

const Preloader = dynamic(
  () => import("@/components/preloader/Preloader"),
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
        <section className="flex h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold tracking-tight text-white md:text-8xl">
              CONEXPET
            </h1>
            <p className="mt-4 text-lg text-[#8A8A8A] md:text-xl">
              Logistica y Transporte de Carga Pesada
            </p>
            <div className="mx-auto mt-8 h-px w-16 bg-[#DC2626]" />
          </div>
        </section>

        <section className="flex h-screen items-center justify-center">
          <p className="text-sm text-[#8A8A8A]">
            [ Secciones del scroll cinematografico - Paso 3 ]
          </p>
        </section>
      </div>
    </main>
  );
}
