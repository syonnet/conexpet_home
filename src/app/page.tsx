"use client";

import { Suspense } from "react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A]">
      {/* Grain overlay - cinematic feel */}
      <div className="grain" aria-hidden="true" />

      {/* Placeholder: Preloader will go here (Paso 2) */}

      {/* Main scrollable content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold tracking-tight text-white md:text-8xl">
              CONEXPET
            </h1>
            <p className="mt-4 text-lg text-[#8A8A8A] md:text-xl">
              Logística y Transporte de Carga Pesada
            </p>
            <div className="mt-8 inline-block h-px w-16 bg-[#DC2626]" />
          </div>
        </section>

        {/* Paso 2+: Each scroll section will be added here */}
        <section className="flex h-screen items-center justify-center">
          <p className="text-sm text-[#8A8A8A]">
            [ Secciones del scroll cinematográfico se agregarán en los siguientes pasos ]
          </p>
        </section>
      </div>

      {/* Placeholder: Custom cursor will go here (Paso 6) */}
      {/* Placeholder: WhatsApp button will go here (Paso 5) */}
    </main>
  );
}
