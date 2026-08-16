"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { SITE } from "@/lib/constants";
import { Send, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            end: "30% center",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        infoRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "25% center",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, integrate with email API
    window.open(`https://wa.me/${SITE.whatsapp.replace("+", "")}?text=Hola Conexpet, me gustaría obtener más información.`, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[100vh] items-center"
    >
      <div className="relative z-10 flex w-full max-w-6xl flex-col gap-16 px-8 md:flex-row md:px-16">
        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex-1 space-y-6 opacity-0"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.3em] uppercase text-[#DC2626]">
            Contacto
          </p>
          <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
            Hablemos de tu <span className="text-[#DC2626]">proyecto</span>
          </h2>

          <div>
            <label className="mb-2 block text-xs font-medium tracking-wider uppercase text-[#8A8A8A]">
              Nombre
            </label>
            <input
              type="text"
              value={formState.name}
              onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
              className="w-full border-b border-[#1F1F1F] bg-transparent py-3 text-white outline-none transition-colors focus:border-[#DC2626]"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium tracking-wider uppercase text-[#8A8A8A]">
              Email
            </label>
            <input
              type="email"
              value={formState.email}
              onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
              className="w-full border-b border-[#1F1F1F] bg-transparent py-3 text-white outline-none transition-colors focus:border-[#DC2626]"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium tracking-wider uppercase text-[#8A8A8A]">
              Mensaje
            </label>
            <textarea
              value={formState.message}
              onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
              rows={4}
              className="w-full resize-none border-b border-[#1F1F1F] bg-transparent py-3 text-white outline-none transition-colors focus:border-[#DC2626]"
              placeholder="Cuéntanos sobre tu proyecto"
            />
          </div>
          <button
            type="submit"
            className="mt-4 flex items-center gap-3 border border-[#DC2626] bg-[#DC2626] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-[#DC2626]"
          >
            <Send className="h-4 w-4" />
            Enviar mensaje
          </button>
        </form>

        {/* Contact info */}
        <div ref={infoRef} className="flex-1 opacity-0">
          <div className="rounded-2xl border border-[#1F1F1F] bg-[#111111]/50 p-8 backdrop-blur-sm">
            <h3 className="mb-6 text-xl font-bold text-white">
              Información directa
            </h3>
            <div className="space-y-6">
              <div>
                <span className="block text-xs tracking-wider uppercase text-[#8A8A8A]">
                  Teléfono
                </span>
                <a
                  href={`tel:${SITE.phone}`}
                  className="mt-1 block text-lg text-white transition-colors hover:text-[#DC2626]"
                >
                  {SITE.phone}
                </a>
              </div>
              <div>
                <span className="block text-xs tracking-wider uppercase text-[#8A8A8A]">
                  Email
                </span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-1 block text-lg text-white transition-colors hover:text-[#DC2626]"
                >
                  {SITE.email}
                </a>
              </div>
              <div>
                <span className="block text-xs tracking-wider uppercase text-[#8A8A8A]">
                  Ubicación
                </span>
                <p className="mt-1 text-sm leading-relaxed text-[#8A8A8A]">
                  {SITE.address}
                </p>
              </div>
              <a
                href={`https://wa.me/${SITE.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-3 rounded-xl bg-[#25D366]/10 px-6 py-4 text-sm font-bold text-[#25D366] transition-colors hover:bg-[#25D366]/20"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp directo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}