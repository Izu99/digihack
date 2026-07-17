"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/components/sections/Services";
import KineticHeading from "@/components/ui/KineticHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* Resting tilt per card — alternating so the grid reads hand-placed, not broken */
const TILTS = [-2.5, 1.8, -1.5, 2.2, -2, 1.6, -1.8, 2.4];

export default function CapabilitiesRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".cap-card");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        cards.forEach((card, i) => gsap.set(card, { rotation: TILTS[i % TILTS.length] }));
        return;
      }

      // Fly in with exaggerated tilt, settle into each card's resting tilt
      gsap.fromTo(
        cards,
        {
          y: 70,
          opacity: 0,
          rotation: (i: number) => TILTS[i % TILTS.length] * 3.5,
        },
        {
          y: 0,
          opacity: 1,
          rotation: (i: number) => TILTS[i % TILTS.length],
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // Straighten on hover, ease back to tilt on leave
      const controller = new AbortController();
      const { signal } = controller;
      cards.forEach((card, i) => {
        card.addEventListener(
          "mouseenter",
          () => gsap.to(card, { rotation: 0, scale: 1.03, duration: 0.35, ease: "power3.out" }),
          { signal }
        );
        card.addEventListener(
          "mouseleave",
          () =>
            gsap.to(card, {
              rotation: TILTS[i % TILTS.length],
              scale: 1,
              duration: 0.45,
              ease: "power3.out",
            }),
          { signal }
        );
      });

      return () => controller.abort();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-[#F3F6FA] py-24 overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="text-center mb-16">
          <span className="label block mb-4">Capabilities</span>
          <KineticHeading
            text="Best-In-Class Digital Solutions"
            accentFrom={1}
            accentClassName="text-[#0B84A8]"
            className="text-[38px] md:text-[52px] font-black text-[#0E1A2B] leading-[1.05]"
          />
          <p className="text-[#54607A] mt-5 text-[15.5px] leading-[1.65] max-w-[600px] mx-auto">
            A combined product & marketing toolkit — choose a single service or wrap it into a
            long-term partnership.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {SERVICES.map((svc) => (
            <div
              key={svc.num}
              className="cap-card relative group p-6 md:p-7 rounded-2xl border border-[#0E1A2B]/8 bg-white shadow-[0_10px_30px_-22px_rgba(14,26,43,0.35)] hover:border-[#18b2de]/40 hover:shadow-[0_18px_40px_-18px_rgba(24,178,222,0.35)] transition-[border-color,box-shadow] duration-300 cursor-default will-change-transform"
            >
              <span className="absolute top-5 right-5 font-mono text-[12px] text-[#0E1A2B]/20 group-hover:text-[#18b2de]/60 transition-colors duration-200">
                {svc.num}
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#18b2de]/10 text-[#18b2de] flex items-center justify-center mb-10 group-hover:bg-[#18b2de]/20 transition-colors duration-200">
                {svc.icon}
              </div>
              <h3 className="text-[#0E1A2B] font-bold text-[15px] md:text-[16px] mb-2 leading-snug tracking-tight">
                {svc.title}
              </h3>
              <p className="text-[#6B7A93] text-[12.5px] md:text-[13px] leading-[1.6]">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
