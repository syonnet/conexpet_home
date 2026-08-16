"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

const TECH_FEATURES = [
  { label: "GPS Satelital en tiempo real", value: "Rastreo 24/7" },
  { label: "Mantenimiento preventivo digital", value: "0% de fallas" },
  { label: "Software de gestión de flota", value: "100% visible" },
  { label: "Certificaciones internacionales", value: "ISO / HSE" },
];

export default function TechSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Stagger items in from left
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
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

      // Fade out all
      gsap.to(itemsRef.current.filter(Boolean), {
        opacity: 0,
        x: 30,
        stagger: 0.05,
        scrollTrigger: {
          trigger: section,
          start: "75% center",
          end: "bottom center",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="relative flex min-h-[100vh] items-center"
    >
      <div className="relative z-10 w-full max-w-3xl px-8 md:px-16">
        <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-[#DC2626]">
          Tecnología
        </p>
        <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">
          Equipamiento de <span className="text-[#DC2626]">vanguardia</span>
        </h2>
        <div className="space-y-6">
          {TECH_FEATURES.map((feat, i) => (
            <div
              key={feat.label}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="opacity-0 border-l-2 border-[#1F1F1F] pl-6 transition-colors hover:border-[#DC2626]"
            >
              <span className="block text-sm text-[#8A8A8A]">{feat.label}</span>
              <span className="mt-1 block text-xl font-bold text-white">
                {feat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
