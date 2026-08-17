"use client";

import { useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap-register";

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const btnRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;

      gsap.to(btnRef.current, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  return (
    <div
      ref={btnRef}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-cursor-hover
    >
      {children}
    </div>
  );
}
