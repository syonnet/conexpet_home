"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { SERVICES } from "@/lib/constants";
import {
  Droplets,
  Truck,
  MoveVertical,
  Wrench,
} from "lucide-react";

const ICONS = { droplets: Droplets, truck: Truck, "move-vertical": MoveVertical, wrench: Wrench } as const;

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "30% center",
            scrub: 1,
          },
        }
      );

      // Cards stagger in from bottom
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotateY: -8 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );

        // Hover parallax - slight lift on scroll over card
        gsap.to(card, {
          y: -10,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-[150vh] py-32"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="w-full max-w-6xl px-8">
          <div ref={headerRef} className="mb-16 text-center">
            <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-[#DC2626]">
              Servicios
            </p>
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Soluciones integrales
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => {
              const Icon = ICONS[service.icon];
              return (
                <div
                  key={service.id}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className="group cursor-default border border-[#1F1F1F] bg-[#0A0A0A]/80 p-8 opacity-0 backdrop-blur-sm transition-colors hover:border-[#DC2626]/40"
                  style={{ transform: "perspective(800px) rotateY(-8deg)" }}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#DC2626]/10">
                    <Icon className="h-6 w-6 text-[#DC2626]" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-[#8A8A8A]">
                    {service.description}
                  </p>
                  <div className="mt-auto border-t border-[#1F1F1F] pt-4">
                    <span className="text-xs font-medium tracking-wider uppercase text-[#DC2626]">
                      {service.capacity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
