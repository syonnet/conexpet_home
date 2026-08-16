"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "@/lib/gsap-register";

export default function Preloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Generate particles for burst effect
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        angle: (i / 24) * Math.PI * 2,
        distance: 80 + Math.random() * 120,
        size: Math.random() * 3 + 1,
        duration: 0.6 + Math.random() * 0.4,
        delay: Math.random() * 0.15,
        color: Math.random() > 0.5 ? "#DC2626" : "#F5F5F5",
      })),
    []
  );

  useEffect(() => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;

    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) {
        onCompleteRef.current();
        return;
      }

      const ctx = gsap.context(() => {
        const dot = container.querySelector(".preloader-dot");
        const svgPaths = container.querySelectorAll(".draw-path");
        const fillShapes = container.querySelectorAll(".fill-shape");
        const textChars = container.querySelectorAll(".char");
        const tagline = container.querySelector(".tagline");
        const progress = container.querySelector(".progress-fill");
        const particleEls = container.querySelectorAll(".particle");
        const content = container.querySelector(".preloader-content");

        const tl = gsap.timeline({
          onComplete: () => {
            // Burst: particles fly out
            gsap.fromTo(
              particleEls,
              { opacity: 1, scale: 1 },
              {
                opacity: 0,
                scale: 0,
                duration: 0.8,
                stagger: { each: 0.02, from: "random" },
                ease: "power3.out",
              }
            );

            // Glitch the content
            gsap.to(content, {
              keyframes: [
                { x: -4, duration: 0.05 },
                { x: 4, duration: 0.05 },
                { x: -2, duration: 0.05 },
                { x: 2, duration: 0.05 },
                { x: 0, duration: 0.05 },
              ],
              ease: "steps(1)",
            });

            // Slide up and fade out
            gsap.to(container, {
              yPercent: -8,
              opacity: 0,
              duration: 0.7,
              delay: 0.2,
              ease: "power4.inOut",
              onComplete: onCompleteRef.current,
            });
          },
        });

        // === PHASE 1: Red dot appears (0 - 0.5s) ===
        tl.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }
        );
        tl.to(
          dot,
          {
            scale: 1.4,
            duration: 0.12,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          }
        );

        // === PHASE 2: Dot expands and fades, SVG starts (0.5 - 2.0s) ===
        tl.to(
          dot,
          { scale: 5, opacity: 0, duration: 0.35, ease: "power2.in" },
          "+=0.1"
        );

        // Draw each SVG path sequentially
        svgPaths.forEach((path, i) => {
          const el = path as SVGPathElement;
          const length = el.getTotalLength();
          gsap.set(el, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          tl.to(
            el,
            {
              strokeDashoffset: 0,
              duration: 0.7,
              ease: "power2.inOut",
            },
            i === 0 ? "-=0.15" : "-=0.4"
          );
        });

        // === PHASE 3: Fill shapes appear (2.0 - 2.4s) ===
        fillShapes.forEach((shape) => {
          tl.to(
            shape,
            { opacity: 1, duration: 0.35, ease: "power2.out" },
            "-=0.15"
          );
        });

        // === PHASE 4: Text characters reveal (2.4 - 2.9s) ===
        if (textChars.length > 0) {
          tl.fromTo(
            textChars,
            { y: 40, opacity: 0, rotateX: -90 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.07,
              stagger: 0.04,
              ease: "back.out(1.7)",
            },
            "-=0.1"
          );
        }

        // === PHASE 5: Tagline fades in (2.9 - 3.4s) ===
        tl.fromTo(
          tagline,
          { opacity: 0, y: 8 },
          { opacity: 0.6, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.1"
        );

        // === PHASE 6: Progress bar (3.0 - 3.8s) ===
        tl.to(
          progress,
          { scaleX: 1, duration: 1, ease: "power1.inOut" },
          "-=0.4"
        );

        // === PHASE 7: Hold before transition (3.8 - 4.2s) ===
        tl.to({}, { duration: 0.5 });
      }, container);

      return () => ctx.revert();
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      <div className="preloader-content flex flex-col items-center">
        {/* Red LED dot */}
        <div className="preloader-dot absolute h-2 w-2 rounded-full bg-[#DC2626] opacity-0 shadow-[0_0_8px_rgba(220,38,38,0.6)]" />

        {/* SVG Logo Mark */}
        <div className="relative -mt-1">
          <svg
            viewBox="0 0 200 200"
            className="h-28 w-28 md:h-36 md:w-36"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Blueprint grid (subtle) */}
            <line
              x1="0" y1="100" x2="200" y2="100"
              stroke="#1A1A1A"
              strokeWidth="0.5"
            />
            <line
              x1="100" y1="0" x2="100" y2="200"
              stroke="#1A1A1A"
              strokeWidth="0.5"
            />
            <circle
              cx="100" cy="100" r="55"
              fill="none"
              stroke="#151515"
              strokeWidth="0.5"
              strokeDasharray="3 3"
            />

            {/* Main circle - draws first */}
            <circle
              cx="100" cy="100" r="72"
              fill="none"
              stroke="#DC2626"
              strokeWidth="1.5"
              className="draw-path"
              style={{
                filter: "drop-shadow(0 0 8px rgba(220,38,38,0.3))",
              }}
            />

            {/* Inner diamond/arrow shape - draws second */}
            <path
              d="M100,35 L140,100 L100,90 L60,100 Z"
              fill="none"
              stroke="#DC2626"
              strokeWidth="1"
              className="draw-path"
            />

            {/* Cross-hair horizontal - draws third */}
            <line
              x1="28" y1="100" x2="172" y2="100"
              stroke="#DC2626"
              strokeWidth="0.5"
              className="draw-path"
            />

            {/* Cross-hair vertical - draws fourth */}
            <line
              x1="100" y1="28" x2="100" y2="172"
              stroke="#DC2626"
              strokeWidth="0.5"
              className="draw-path"
            />

            {/* Fill: solid red circle */}
            <circle
              cx="100" cy="100" r="72"
              fill="#DC2626"
              opacity="0"
              className="fill-shape"
            />

            {/* Fill: dark cutout arrow */}
            <path
              d="M100,35 L140,100 L100,90 L60,100 Z"
              fill="#0A0A0A"
              opacity="0"
              className="fill-shape"
            />

            {/* Fill: dark crosshair lines */}
            <line
              x1="28" y1="100" x2="172" y2="100"
              stroke="#0A0A0A"
              strokeWidth="1.5"
              opacity="0"
              className="fill-shape"
            />
            <line
              x1="100" y1="28" x2="100" y2="172"
              stroke="#0A0A0A"
              strokeWidth="1.5"
              opacity="0"
              className="fill-shape"
            />

            {/* Final letter C inside */}
            <path
              d="M115,55 A35,35 0 1,1 115,145"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0"
              className="fill-shape"
            />
          </svg>
        </div>

        {/* CONEXPET text - character by character */}
        <div className="mt-6 flex" style={{ perspective: "600px" }}>
          {"CONEXPET".split("").map((char, i) => (
            <span
              key={i}
              className="char inline-block text-xl font-bold tracking-[0.3em] text-white opacity-0 md:text-2xl"
              style={{ transformOrigin: "bottom center" }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p className="tagline mt-3 text-[10px] font-light tracking-[0.35em] uppercase text-[#8A8A8A] opacity-0 md:text-xs">
          Logística y Transporte de Carga Pesada
        </p>
      </div>

      {/* Particles (hidden initially, used in burst) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle absolute h-1 w-1 rounded-full opacity-0"
            style={{
              backgroundColor: p.color,
              width: p.size,
              height: p.size,
              transform: `translate(${Math.cos(p.angle) * p.distance}px, ${Math.sin(p.angle) * p.distance}px)`,
            }}
          />
        ))}
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1F1F1F]">
        <div
          className="progress-fill h-full origin-left bg-[#DC2626]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
