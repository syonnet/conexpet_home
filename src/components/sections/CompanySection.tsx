"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { SITE } from "@/lib/constants";
import { MapPin, Phone, Mail } from "lucide-react";

export default function CompanySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Content parallax (moves slower than scroll)
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "30% center",
            scrub: 1,
          },
        }
      );

      // Detail items
      detailsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 60%",
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
      id="company"
      className="relative flex min-h-[100vh] items-center"
    >
      <div ref={contentRef} className="relative z-10 w-full max-w-3xl px-8 opacity-0 md:px-16">
        <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-[#DC2626]">
          Empresa
        </p>
        <h2 className="mb-8 text-3xl font-bold text-white md:text-5xl">
          Raíces en la <span className="text-[#DC2626]">Amazonía</span>
        </h2>
        <p className="mb-12 text-base leading-relaxed text-[#8A8A8A] md:text-lg">
          Conexpet nació en Lago Agrio, en el corazón de la Amazonía ecuatoriana.
          Desde ahí hemos construido una red de operaciones que abarca todo el
          territorio oriental, convirtiéndonos en el aliado estratégico de las
          principales empresas petroleras del país. Nuestro compromiso con la
          seguridad, la eficiencia y la comunidad local nos distingue en cada
          proyecto que emprendemos.
        </p>

        <div className="space-y-6">
          {[
            { icon: MapPin, text: SITE.address },
            { icon: Phone, text: SITE.phone },
            { icon: Mail, text: SITE.email },
          ].map((item, i) => (
            <div
              key={item.text}
              ref={(el) => { detailsRef.current[i] = el; }}
              className="flex items-start gap-4 opacity-0"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#111111]">
                <item.icon className="h-4 w-4 text-[#DC2626]" />
              </div>
              <span className="pt-2 text-sm text-[#8A8A8A]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}