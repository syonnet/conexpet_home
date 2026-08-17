"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { SCROLL_SECTIONS } from "@/lib/constants";

export default function TimeMarkers() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Animate each marker when it scrolls into view
      const markers = container.querySelectorAll(".time-marker");
      markers.forEach((marker) => {
        gsap.fromTo(
          marker,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: marker,
              start: "top 90%",
              end: "top 70%",
              scrub: 1,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed left-6 top-0 z-30 hidden h-full w-px md:block"
      aria-hidden="true"
    >
      {/* Main vertical line */}
      <div className="absolute left-0 top-0 h-full w-px bg-[#1A1A1A]" />

      {/* Section markers positioned absolutely */}
      {SCROLL_SECTIONS.map((section, i) => {
        const topPercent = section.range[0] * 100;
        const isActive = i === 0;
        return (
          <div
            key={section.id}
            className="time-marker absolute left-0 origin-top"
            style={{
              top: `${topPercent}%`,
              transform: "scaleY(0)",
              opacity: 0,
            }}
          >
            <div
              className={
                "-translate-x-1/2 -translate-y-1/2 rounded-full border " +
                (i === 0
                  ? "h-2.5 w-2.5 border-[#DC2626] bg-[#DC2626]"
                  : "h-2 w-2 border-[#333333] bg-[#0A0A0A]")
              }
            />
          </div>
        );
      })}
    </div>
  );
}
