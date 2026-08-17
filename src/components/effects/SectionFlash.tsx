"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-register";
import { useScrollStore } from "@/lib/scroll-store";

export default function SectionFlash() {
  const flashRef = useRef<HTMLDivElement>(null);
  const lastSection = useRef("");
  const activeSection = useScrollStore((s) => s.activeSection);

  useEffect(() => {
    if (activeSection === lastSection.current) return;
    lastSection.current = activeSection;

    // Don't flash on hero (first section)
    if (activeSection === "hero") return;
    if (!flashRef.current) return;

    // Quick red flash
    gsap.fromTo(
      flashRef.current,
      { opacity: 0.06 },
      {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      }
    );
  }, [activeSection]);

  return (
    <div
      ref={flashRef}
      className="pointer-events-none fixed inset-0 z-[6] bg-[#DC2626] opacity-0"
      aria-hidden="true"
    />
  );
}
