"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

const WORKSHOP_ITEMS = [
  {
    title: "Mantenimiento Preventivo",
    desc: "Programas de mantenimiento planificados que reducen el tiempo de inactividad y extienden la vida útil de cada equipo.",
  },
  {
    title: "Mantenimiento Correctivo",
    desc: "Diagnóstico y reparación inmediata con repuestos certificados, garantizando respuesta rápida ante cualquier eventualidad.",
  },
  {
    title: "Repuestos Certificados",
    desc: "Inventario permanente de repuestos originales y certificados para todos los equipos de nuestra flota.",
  },
];

export default function WorkshopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Each item slides in from right
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const direction = i % 2 === 0 ? 80 : -80;
        gsap.fromTo(
          item,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
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
      id="workshop"
      className="relative flex min-h-[100vh] items-center justify-end"
    >
      <div className="relative z-10 w-full max-w-2xl px-8 md:px-16">
        <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-[#DC2626]">
          Talleres
        </p>
        <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">
          Infraestructura <span className="text-[#DC2626]">propia</span>
        </h2>
        <div className="space-y-8">
          {WORKSHOP_ITEMS.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="opacity-0 border-b border-[#1F1F1F] pb-8"
            >
              <h3 className="mb-2 text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#8A8A8A]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
