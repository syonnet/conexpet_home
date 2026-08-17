"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap-register";

interface DustParticle {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

const MAX_PARTICLES = 40;
const SPAWN_THRESHOLD = 2; // Minimum scroll velocity to spawn

export default function ScrollDust() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<DustParticle[]>([]);
  const lastScroll = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef(0);

  const spawnParticle = useCallback((scrollVel: number) => {
    if (!containerRef.current) return;
    if (particles.current.length >= MAX_PARTICLES) return;

    const el = document.createElement("div");
    el.className = "absolute rounded-full";
    const size = 1 + Math.random() * 3;
    const isRed = Math.random() > 0.7;
    el.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${isRed ? "#DC2626" : "#555555"};
      left: ${10 + Math.random() * 80}%;
      top: ${20 + Math.random() * 60}%;
    `;

    containerRef.current.appendChild(el);

    const absVel = Math.min(Math.abs(scrollVel), 15);
    const direction = scrollVel > 0 ? -1 : 1;

    particles.current.push({
      el,
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * absVel * 0.5,
      vy: direction * (1 + Math.random() * absVel * 0.3),
      life: 0,
      maxLife: 60 + Math.random() * 60,
      size,
      opacity: 0.3 + Math.random() * 0.3,
    });
  }, []);

  const animate = useCallback(() => {
    const scrollY = window.scrollY;
    velocity.current = scrollY - lastScroll.current;
    lastScroll.current = scrollY;

    const absVel = Math.abs(velocity.current);

    // Spawn particles based on velocity
    if (absVel > SPAWN_THRESHOLD) {
      const count = Math.min(Math.floor(absVel / 5), 3);
      for (let i = 0; i < count; i++) {
        spawnParticle(velocity.current);
      }
    }

    // Update existing particles
    const toRemove: number[] = [];
    for (let i = 0; i < particles.current.length; i++) {
      const p = particles.current[i];
      p.life++;
      p.x += p.vx * 0.3;
      p.y += p.vy * 0.3;
      p.vx *= 0.96;
      p.vy *= 0.96;

      const progress = p.life / p.maxLife;
      const currentOpacity = p.opacity * (1 - progress);

      if (p.life >= p.maxLife || currentOpacity < 0.01) {
        toRemove.push(i);
      } else {
        gsap.set(p.el, {
          x: p.x,
          y: p.y,
          opacity: currentOpacity,
        });
      }
    }

    // Remove dead particles (reverse order)
    for (let i = toRemove.length - 1; i >= 0; i--) {
      const idx = toRemove[i];
      particles.current[idx].el.remove();
      particles.current.splice(idx, 1);
    }

    rafId.current = requestAnimationFrame(animate);
  }, [spawnParticle]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      aria-hidden="true"
    />
  );
}
