"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { STATS } from "@/lib/constants";

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const objRef = useRef({ val: 0 });

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    objRef.current.val = 0;

    const ctx = gsap.context(() => {
      gsap.to(objRef.current, {
        val: value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 45%",
          scrub: 1,
        },
        onUpdate: () => {
          if (!numRef.current) return;
          const v = objRef.current.val;
          numRef.current.textContent =
            value % 1 === 0
              ? Math.round(v).toString()
              : v.toFixed(1);
        },
      });
    });

    return () => ctx.revert();
  }, [value]);

  return (
    <div ref={containerRef} className="text-center">
      <span ref={numRef} className="block text-5xl font-black text-white md:text-7xl">
        0{suffix}
      </span>
      <span className="mt-3 block text-sm tracking-wider uppercase text-[#8A8A8A]">
        {label}
      </span>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: dividerRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative flex min-h-[100vh] items-center justify-center"
    >
      <div className="relative z-10 w-full max-w-4xl px-8">
        <p className="mb-4 text-center text-xs font-medium tracking-[0.3em] uppercase text-[#DC2626]">
          Cifras
        </p>
        <h2 className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">
          La fuerza detrás de cada operación
        </h2>

        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {STATS.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>

        <div
          ref={dividerRef}
          className="mx-auto mt-16 h-px w-full origin-center bg-[#1F1F1F]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}
