"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-register";
import { SITE } from "@/lib/constants";
import { MessageCircle } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function WhatsAppFloat() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Entrance animation after a delay
    gsap.fromTo(
      containerRef.current,
      { y: 100, opacity: 0, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 5, // After preloader + hero settles
        ease: "back.out(2)",
      }
    );

    // Pulse animation
    const pulse = gsap.to(containerRef.current, {
      boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.4)",
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    return () => {
      pulse.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 left-8 z-[45] opacity-0 md:left-auto md:right-8"
    >
      <MagneticButton strength={0.2}>
        <a
          href={`https://wa.me/${SITE.whatsapp.replace("+", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
          aria-label="Contactar por WhatsApp"
          data-cursor-hover
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </MagneticButton>
    </div>
  );
}
