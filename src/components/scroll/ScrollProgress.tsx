"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { useScrollStore } from "@/lib/scroll-store";
import { SCROLL_SECTIONS } from "@/lib/constants";

export default function ScrollProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const progress = useScrollStore((s) => s.progress);
  const activeSection = useScrollStore((s) => s.activeSection);

  // Animate fill + dot position
  useEffect(() => {
    if (!fillRef.current || !dotRef.current) return;
    gsap.to(fillRef.current, {
      height: `${progress * 100}%`,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(dotRef.current, {
      y: `${progress * 100}%`,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [progress]);

  // Update label
  useEffect(() => {
    if (!labelRef.current) return;
    const section = SCROLL_SECTIONS.find((s) => s.id === activeSection);
    if (section) {
      gsap.to(labelRef.current, {
        opacity: 0,
        y: -4,
        duration: 0.15,
        onComplete: () => {
          if (labelRef.current) {
            labelRef.current.textContent = section.label;
            gsap.fromTo(
              labelRef.current,
              { opacity: 0, y: 4 },
              { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
            );
          }
        },
      });
    }
  }, [activeSection]);

  return (
    <div
      ref={trackRef}
      className="fixed right-6 top-1/2 z-40 hidden h-48 w-px -translate-y-1/2 md:block"
    >
      {/* Track bg */}
      <div className="absolute inset-0 bg-[#1F1F1F]" />

      {/* Filled portion */}
      <div
        ref={fillRef}
        className="absolute bottom-0 left-0 w-full origin-bottom bg-[#DC2626]"
        style={{ height: "0%" }}
      />

      {/* Active dot */}
      <div
        ref={dotRef}
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#DC2626] shadow-[0_0_10px_rgba(220,38,38,0.5)]"
        style={{ top: "0%", translateY: "-50%" }}
      />

      {/* Section label */}
      <span
        ref={labelRef}
        className="absolute right-4 top-0 whitespace-nowrap text-[10px] font-medium tracking-[0.2em] uppercase text-[#8A8A8A]"
        style={{ transform: "translateY(-50%)" }}
      >
        Inicio
      </span>
    </div>
  );
}
