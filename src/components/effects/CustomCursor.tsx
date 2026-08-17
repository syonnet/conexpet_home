"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap-register";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);

  const TRAIL_COUNT = 5;
  const trailPositions = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );

  const onMouseMove = useCallback((e: MouseEvent) => {
    pos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseDown = useCallback(() => {
    if (dotRef.current) {
      gsap.to(dotRef.current, { scale: 0.6, duration: 0.1 });
    }
  }, []);

  const onMouseUp = useCallback(() => {
    if (dotRef.current) {
      gsap.to(dotRef.current, { scale: isHovering.current ? 2.5 : 1, duration: 0.3, ease: "back.out(2)" });
    }
  }, []);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Hover detection on interactive elements
    const handleHoverIn = () => {
      isHovering.current = true;
      if (ringRef.current) gsap.to(ringRef.current, { scale: 2.5, opacity: 0.3, borderColor: "#DC2626", duration: 0.3, ease: "power2.out" });
      if (dotRef.current) gsap.to(dotRef.current, { scale: 2.5, duration: 0.3, ease: "back.out(2)" });
    };
    const handleHoverOut = () => {
      isHovering.current = false;
      if (ringRef.current) gsap.to(ringRef.current, { scale: 1, opacity: 0.4, borderColor: "#DC2626", duration: 0.3, ease: "power2.out" });
      if (dotRef.current) gsap.to(dotRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    const addHoverListeners = () => {
      const interactiveEls = document.querySelectorAll("a, button, input, textarea, [data-cursor-hover]");
      interactiveEls.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverIn);
        el.addEventListener("mouseleave", handleHoverOut);
      });
      return interactiveEls;
    };

    // Initial + re-scan on DOM changes
    const els = addHoverListeners();
    const observer = new MutationObserver(() => {
      // Clean old listeners
      document.querySelectorAll("a, button, input, textarea, [data-cursor-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation loop
    const ticker = (time: number) => {
      // Dot follows mouse instantly
      if (dotRef.current) {
        gsap.set(dotRef.current, { x: pos.current.x, y: pos.current.y });
      }

      // Ring follows with delay (lerp)
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        gsap.set(ringRef.current, { x: ringPos.current.x, y: ringPos.current.y });
      }

      // Trail particles follow with increasing delay
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const target = i === 0 ? pos.current : trailPositions.current[i - 1];
        trailPositions.current[i].x += (target.x - trailPositions.current[i].x) * (0.12 - i * 0.015);
        trailPositions.current[i].y += (target.y - trailPositions.current[i].y) * (0.12 - i * 0.015);
        const trail = trailRefs.current[i];
        if (trail) {
          gsap.set(trail, {
            x: trailPositions.current[i].x,
            y: trailPositions.current[i].y,
            opacity: 0.15 - i * 0.025,
            scale: 1 - i * 0.12,
          });
        }
      }
    };
    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
      els.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
      gsap.ticker.remove(ticker);
    };
  }, [onMouseMove, onMouseDown, onMouseUp]);

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DC2626]"
        style={{ mixBlendMode: "difference" }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DC2626]/40"
        style={{ opacity: 0.4 }}
      />

      {/* Trail particles */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="pointer-events-none fixed left-0 top-0 z-[9997] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DC2626]"
          style={{ opacity: 0 }}
        />
      ))}
    </>
  );
}
