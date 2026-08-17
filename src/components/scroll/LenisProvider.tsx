"use client";

import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { useScrollStore } from "@/lib/scroll-store";
import { SCROLL_SECTIONS } from "@/lib/constants";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const setProgress = useScrollStore((s) => s.setProgress);
  const setActiveSection = useScrollStore((s) => s.setActiveSection);
  const setReady = useScrollStore((s) => s.setReady);

  const updateProgress = useCallback(() => {
    if (!lenisRef.current) return;
    const lenis = lenisRef.current;
    const vh = lenis.dimensions?.viewport?.height ?? 0;
    const sh = lenis.dimensions?.scroll?.height ?? 0;
    if (!vh || !sh) return;
    const scrollHeight = sh - vh;
    const p = scrollHeight > 0 ? lenis.scroll / scrollHeight : 0;
    setProgress(Math.min(1, Math.max(0, p)));

    // Determine active section
    for (let i = SCROLL_SECTIONS.length - 1; i >= 0; i--) {
      const [start] = SCROLL_SECTIONS[i].range;
      if (p >= start) {
        setActiveSection(SCROLL_SECTIONS[i].id);
        break;
      }
    }
  }, [setProgress, setActiveSection]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Ticker callback (stable reference for add/remove)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
      updateProgress();
    };

    // Connect Lenis → GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    setReady(true);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [updateProgress, setReady]);

  return <>{children}</>;
}
