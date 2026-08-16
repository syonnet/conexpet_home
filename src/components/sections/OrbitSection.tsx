"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

export default function OrbitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Text reveal on scroll
      const lines = section.querySelectorAll(".reveal-line");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });

      // Text fade out at end
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -40,
          scrollTrigger: {
            trigger: section,
            start: "70% center",
            end: "bottom center",
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="orbit"
      className="relative flex min-h-[100vh] items-center justify-center"
    >
      <div ref={textRef} className="relative z-10 max-w-2xl px-8">
        <p className="reveal-line mb-4 text-xs font-medium tracking-[0.3em] uppercase text-[#DC2626] opacity-0">
          Presentación
        </p>
        <h2 className="reveal-line text-3xl font-bold leading-tight text-white opacity-0 md:text-5xl">
          Hacemos de la logística un{" "}
          <span className="text-[#DC2626]">arte</span>
        </h2>
        <p className="reveal-line mt-6 text-base leading-relaxed text-[#8A8A8A] opacity-0 md:text-lg">
          Más de 15 años moviendo la industria petrolera del Ecuador. Cada
          proyecto es una operación de precisión donde la seguridad, la
          eficiencia y el compromiso se conjugan para superar los desafíos más
          exigentes del campo.
        </p>
      </div>

      {/* Side gradient for cinematic depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 via-transparent to-transparent" />
    </section>
  );
}
