"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

const PROJECTS = [
  {
    client: "Petroamazonas EP",
    scope: "Transporte de tubería de 48 pulgadas - Bloque 43",
    year: "2023",
  },
  {
    client: "YPF Ecuador",
    scope: "Izaje y montaje de equipos de perforación RIG",
    year: "2024",
  },
  {
    client: "Repsol Ecuador",
    scope: "Servicio de vacuum para manejo de fluidos de perforación",
    year: "2024",
  },
  {
    client: "Shell Ecuador",
    scope: "Transporte extrapesado de maquinaria - Campo Ishpingo",
    year: "2023",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "35% center",
            scrub: 1,
          },
        }
      );

      projectRefs.current.forEach((project) => {
        if (!project) return;
        gsap.fromTo(
          project,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-[100vh] py-32"
    >
      <div className="relative z-10 max-w-4xl px-8 md:px-16">
        <div ref={headerRef} className="mb-16 opacity-0">
          <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-[#DC2626]">
            Proyectos
          </p>
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Operaciones que <span className="text-[#DC2626]">hablan</span>
          </h2>
        </div>

        <div className="space-y-0">
          {PROJECTS.map((project, i) => (
            <div
              key={project.client}
              ref={(el) => { projectRefs.current[i] = el; }}
              className="group flex items-baseline justify-between border-b border-[#1F1F1F] py-6 opacity-0 transition-colors hover:border-[#DC2626]/40"
            >
              <div>
                <span className="text-sm font-bold text-white">
                  {project.client}
                </span>
                <p className="mt-1 text-sm text-[#8A8A8A]">{project.scope}</p>
              </div>
              <span className="shrink-0 text-xs text-[#555555]">
                {project.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
