"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";

// To revert to the previous model, swap this import back to:
// import("@/components/ui/ThreeCanvas")
const ThreeCanvas = dynamic(() => import("@/components/ui/HeroScene3D"), {
  ssr: false,
  loading: () => null,
});

const MotionLink = motion(Link);

const WORDS = ["We Hack", "The Digital", "World."];

function SplitLine({ text, delay }: { text: string; delay: number }) {
  return (
    <div className="overflow-hidden block">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.div>
    </div>
  );
}

function MagneticBtn({
  href,
  children,
  primary = true,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22 });
  const sy = useSpring(y, { stiffness: 260, damping: 22 });

  return (
    <MotionLink
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top  - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.04 }}
      className={
        primary
          ? "inline-flex items-center gap-2.5 bg-[#18b2de] text-[#0E1A2B] font-bold px-8 py-4 rounded-xl text-[15px] cursor-pointer hover:shadow-[0_12px_32px_-8px_rgba(24,178,222,0.65)] transition-shadow duration-200"
          : "inline-flex items-center gap-2.5 border border-white/22 text-white font-semibold px-8 py-4 rounded-xl text-[15px] cursor-pointer hover:border-[#18b2de]/50 hover:text-[#18b2de] transition-colors duration-200"
      }
    >
      {children}
    </MotionLink>
  );
}

export default function Hero() {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const fn = (e: MouseEvent) =>
      setSpotlight({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0E1A2B]">
      {/* 3D Model — full background, prominent */}
      <ThreeCanvas />

      {/* Minimal dark vignette — just enough to read text */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(14,26,43,0.25) 0%, rgba(14,26,43,0.72) 100%)",
        }}
      />

      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-500"
        style={{
          background: `radial-gradient(420px circle at ${spotlight.x}% ${spotlight.y}%, rgba(24,178,222,0.06) 0%, transparent 65%)`,
        }}
      />

      {/* ── Centered content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-7 pt-24 pb-20 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55 }}
          className="inline-flex items-center gap-2 border border-white/18 bg-white/[0.05] rounded-full px-4 py-1.5 text-[11px] font-semibold text-white/75 tracking-[0.24em] uppercase font-mono mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#18b2de] animate-pulse" />
          Digital Marketing · Software · Sri Lanka & USA
        </motion.div>

        {/* Headline — line-by-line reveal */}
        <h1 className="font-black text-[68px] md:text-[88px] lg:text-[104px] leading-[0.96] tracking-[-0.02em] text-white mb-8">
          {WORDS.map((w, i) => (
            <SplitLine
              key={w}
              text={i === 2 ? "" : w}
              delay={0.25 + i * 0.14}
            />
          ))}
          {/* "World." in cyan */}
          <div className="overflow-hidden block">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.53, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#18b2de]"
            >
              World.
            </motion.div>
          </div>
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.6 }}
          className="text-[#8fa3bb] text-[16px] md:text-[17px] leading-[1.7] max-w-[520px] mx-auto mb-10"
        >
          <span className="text-white/90 font-semibold">Epitom Beyond The Concept.</span>{" "}
          We craft world-class digital products and growth strategies for ambitious brands.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92, duration: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticBtn href="/services">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4" />
            </svg>
            Start a Project
          </MagneticBtn>
          <MagneticBtn href="/work" primary={false}>
            View Our Work
          </MagneticBtn>
        </motion.div>
      </div>
    </section>
  );
}
