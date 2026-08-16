"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { SITE } from "@/lib/constants";
import { ArrowUp } from "lucide-react";

export default function FinaleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Logo scales in
      gsap.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "40% center",
            scrub: 1,
          },
        }
      );

      // CTA fades in
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            end: "top 65%",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="finale"
      className="relative flex min-h-[80vh] items-center justify-center"
    >
      <div className="relative z-10 text-center">
        <div ref={logoRef} className="opacity-0" style={{ transform: "scale(0.8)" }}>
          {/* Geometric logo mark */}
          <svg
            viewBox="0 0 200 200"
            className="mx-auto mb-8 h-24 w-24 opacity-30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="72" fill="none" stroke="#DC2626" strokeWidth="1" />
            <path d="M100,35 L140,100 L100,90 L60,100 Z" fill="none" stroke="#DC2626" strokeWidth="0.5" />
            <line x1="28" y1="100" x2="172" y2="100" stroke="#DC2626" strokeWidth="0.3" />
            <line x1="100" y1="28" x2="100" y2="172" stroke="#DC2626" strokeWidth="0.3" />
          </svg>

          <h2 className="text-5xl font-black tracking-tight text-white md:text-7xl">
            CONEXPET
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-[#DC2626]" />
          <p className="mt-4 text-sm tracking-[0.2em] uppercase text-[#8A8A8A]">
            {SITE.tagline}
          </p>
        </div>

        <div ref={ctaRef} className="mt-12 opacity-0">
          <a
            href={`https://wa.me/${SITE.whatsapp.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#DC2626] bg-[#DC2626] px-10 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-[#DC2626]"
          >
            Cotizar ahora
          </a>
          <button
            onClick={scrollToTop}
            className="ml-6 flex h-12 w-12 items-center justify-center border border-[#1F1F1F] text-[#8A8A8A] transition-colors hover:border-[#DC2626] hover:text-[#DC2626]"
            aria-label="Volver arriba"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-16 text-xs text-[#333333]">
          © {new Date().getFullYear()} Conexpet. Lago Agrio, Ecuador.
        </p>
      </div>
    </section>
  );
}