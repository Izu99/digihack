"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CLIENTS = [
  { name: "Immense Home",       industry: "Luxury Vinyl Tile · Sri Lanka" },
  { name: "Reyance",            industry: "Music & Entertainment · Sri Lanka" },
  { name: "YUME International", industry: "Japanese Language · Sri Lanka" },
  { name: "RADA Group",         industry: "Export / Import · SL & Australia" },
  { name: "GC AutoHub",         industry: "Car Detailing · Australia" },
];

/* Duplicate 4× so the loop never shows a gap */
const TRACK = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

function TickerItem({ name, industry }: { name: string; industry: string }) {
  return (
    <span className="inline-flex items-center gap-3 px-8 flex-shrink-0">
      <span className="font-bold text-white text-[15px] whitespace-nowrap">
        {name}
      </span>
      <span className="text-[#7A8FA6] text-[13px] whitespace-nowrap font-mono">
        {industry}
      </span>
      {/* Separator dot */}
      <span className="w-1 h-1 rounded-full bg-[#18b2de]/40 flex-shrink-0" />
    </span>
  );
}

export default function Clients() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="clients" className="py-24 bg-[#15233A] overflow-hidden">
      {/* Heading */}
      <div ref={ref} className="max-w-[1180px] mx-auto px-7 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="label block mb-4">Trusted By</span>
          <h2 className="text-[42px] md:text-[46px] font-black tracking-tight text-white leading-[1.08]">
            Brands We&apos;ve{" "}
            <span className="text-[#18b2de]">Built With</span>
          </h2>
          <p className="text-[#9aa3b2] mt-4 text-[15px] leading-[1.65] max-w-[460px] mx-auto">
            From emerging artists to established industry leaders — across Sri Lanka,
            Australia, and beyond.
          </p>
        </motion.div>
      </div>

      {/* ── Ticker rows ── */}
      <div className="relative">
        {/* Left + right gradient fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10"
          style={{ background: "linear-gradient(to right, #15233A, transparent)" }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10"
          style={{ background: "linear-gradient(to left, #15233A, transparent)" }} />

        {/* Row 1 — scroll left */}
        <div className="flex overflow-hidden mb-4">
          <div
            className="flex"
            style={{ animation: "ticker-left 40s linear infinite" }}
          >
            {TRACK.map((c, i) => (
              <TickerItem key={`r1-${i}`} name={c.name} industry={c.industry} />
            ))}
          </div>
        </div>

        {/* Row 2 — scroll right */}
        <div className="flex overflow-hidden">
          <div
            className="flex"
            style={{ animation: "ticker-right 40s linear infinite" }}
          >
            {[...TRACK].reverse().map((c, i) => (
              <TickerItem key={`r2-${i}`} name={c.name} industry={c.industry} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ticker-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes ticker-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="ticker-left"], [style*="ticker-right"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
