"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const CLIENTS = [
  { name: "Immense Home",       industry: "Luxury Vinyl Tile · Sri Lanka" },
  { name: "Reyance",            industry: "Music & Entertainment · Sri Lanka" },
  { name: "YUME International", industry: "Japanese Language · Sri Lanka" },
  { name: "RADA Group",         industry: "Export / Import · SL & Australia" },
  { name: "GC AutoHub",         industry: "Car Detailing · Australia" },
];

/* Exactly 3 copies — the GSAP tween below relies on this to loop seamlessly */
const COPIES = 3;
const TRACK = Array.from({ length: COPIES }, () => CLIENTS).flat();

function RibbonItem({ name, industry }: { name: string; industry: string }) {
  return (
    <span className="inline-flex items-center gap-3 px-8 flex-shrink-0">
      <span className="font-bold text-[#0E1A2B] text-[17px] whitespace-nowrap">
        {name}
      </span>
      <span className="text-[#6B7A93] text-[14px] whitespace-nowrap font-mono">
        {industry}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#18b2de] flex-shrink-0" />
    </span>
  );
}

export default function Clients() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // Seamless infinite loop: content is duplicated exactly COPIES times,
      // so animating to -(100/COPIES)% and repeating advances by exactly one
      // copy's width each cycle — no jump, no reset frame.
      const tween = gsap.to(trackRef.current, {
        xPercent: -100 / COPIES,
        duration: 26,
        ease: "none",
        repeat: -1,
      });

      return () => {
        tween.kill();
      };
    },
    { scope: ref }
  );

  return (
    <section className="py-24 bg-[#F3F6FA] overflow-hidden">
      {/* Heading */}
      <div ref={ref} className="max-w-[1180px] mx-auto px-7 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="label block mb-4">Trusted By</span>
          <h2 className="text-[42px] md:text-[46px] font-black tracking-tight text-[#0E1A2B] leading-[1.08]">
            Brands We&apos;ve{" "}
            <span className="text-[#0B84A8]">Built With</span>
          </h2>
          <p className="text-[#54607A] mt-4 text-[15px] leading-[1.65] max-w-[460px] mx-auto">
            From emerging artists to established industry leaders — across Sri Lanka,
            Australia, and beyond.
          </p>
        </motion.div>
      </div>

      {/* ── Ribbon ── */}
      <div className="relative my-14 py-1">
        <div
          className="relative w-[120vw] left-1/2 -translate-x-1/2 -rotate-[3deg] bg-[#F3F6FA] py-9 overflow-hidden"
        >
          <div ref={trackRef} className="flex w-max" style={{ willChange: "transform" }}>
            {TRACK.map((c, i) => (
              <RibbonItem key={i} name={c.name} industry={c.industry} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
