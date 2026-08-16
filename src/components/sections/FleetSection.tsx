"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

const FLEET_CATEGORIES = [
  { type: "Vacuum Trucks", count: "12", desc: "Unidades de alta capacidad hasta 200 barriles para transporte de crudo y fluidos" },
  { type: "Camiones de Carga Pesada", count: "20+", desc: "Plataformas especializadas para transporte extrapesado y maquinaria industrial" },
  { type: "Grúas", count: "8", desc: "Equipos de izaje de 30 a 120 toneladas para montaje industrial" },
  { type: "Equipos de Apoyo", count: "15+", desc: "Camiones de apoyo, equipos de taller y unidades de respuesta rápida" },
];

export default function FleetSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Each category zooms in
      categoryRefs.current.forEach((cat, i) => {
        if (!cat) return;
        gsap.fromTo(
          cat,
          { scale: 0.9, opacity: 0, y: 40 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cat,
              start: "top 88%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="fleet"
      className="relative flex min-h-[100vh] items-center"
    >
      <div className="relative z-10 w-full px-8 md:px-16">
        <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-[#DC2626]">
          Flota
        </p>
        <h2 className="mb-16 text-3xl font-bold text-white md:text-5xl">
          Más de <span className="text-[#DC2626]">50</span> unidades
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {FLEET_CATEGORIES.map((cat, i) => (
            <div
              key={cat.type}
              ref={(el) => { categoryRefs.current[i] = el; }}
              className="opacity-0"
              style={{ transform: "scale(0.9)" }}
            >
              <span className="block text-4xl font-black text-[#DC2626]">
                {cat.count}
              </span>
              <h3 className="mt-2 text-lg font-bold text-white">{cat.type}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#8A8A8A]">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
