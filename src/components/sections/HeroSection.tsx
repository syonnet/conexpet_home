"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { SITE } from "@/lib/constants";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Entrance animations (plays after preloader)
      const entranceTl = gsap.timeline({ delay: 0.3 });
      entranceTl.fromTo(
        headingRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" }
      );
      entranceTl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
        "-=0.6"
      );
      entranceTl.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
      entranceTl.fromTo(
        scrollHintRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );
      // Bounce the scroll hint
      gsap.to(scrollHintRef.current, {
        y: 8,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      });

      // Scroll-out animation
      gsap.to(headingRef.current, {
        y: -120,
        opacity: 0,
        scale: 0.9,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(taglineRef.current, {
        y: -60,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "40% top",
          scrub: 1.5,
        },
      });
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "5% top",
          end: "15% top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100vh] items-center justify-center"
    >
      <div className="relative z-10 text-center">
        <h1
          ref={headingRef}
          className="text-6xl font-bold tracking-tight text-white opacity-0 md:text-8xl lg:text-9xl"
          style={{ transform: "scale(0.95)" }}
        >
          CONEXPET
        </h1>
        <div
          ref={lineRef}
          className="mx-auto mt-4 h-px w-16 bg-[#DC2626]"
          style={{ transform: "scaleX(0)" }}
        />
        <p
          ref={taglineRef}
          className="mt-4 text-lg text-[#8A8A8A] opacity-0 md:text-xl"
        >
          {SITE.tagline}
        </p>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#8A8A8A]">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-[#DC2626] to-transparent" />
        </div>
      </div>

      {/* Bottom gradient for blend into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
}
