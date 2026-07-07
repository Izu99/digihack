"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div data-speed="0.9" className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#18b2de]/[0.04] blur-3xl" />

      <div ref={ref} className="max-w-[1180px] mx-auto px-7">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT — portrait image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -right-5 -top-5 w-28 h-28 rounded-full bg-[#18b2de]/10 z-0" />
            <div className="absolute -left-4 -bottom-4 w-20 h-20 rounded-xl border-2 border-[#18b2de]/30 z-0" />

            <div className="relative aspect-[1/1.05] rounded-2xl overflow-hidden z-10" style={{ boxShadow: "0 10px 30px -18px rgba(14,26,43,.2), 0 2px 6px rgba(14,26,43,.1)" }}>
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="DigiHack team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A2B]/60 to-transparent" />
              <div className="absolute left-5 bottom-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2">
                <p className="text-white font-bold text-xs tracking-widest uppercase">Who We Are</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label block mb-4">Who We Are</span>
            <h2 className="text-4xl md:text-[46px] font-black tracking-tight leading-[1.08] text-[#0E1A2B] mb-4">
              We are <span className="text-[#0B84A8]">DigiHack.</span>
            </h2>
            <p className="text-[#54607A] text-[15.5px] leading-[1.7] mb-8 max-w-[520px]">
              People come first at DigiHack. We&apos;re a software & digital marketing studio that
              helps businesses build the right product — and then bring it to the right market.
              Strategy, engineering and growth, under one roof.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#18b2de] text-[#0E1A2B] font-bold px-6 py-3.5 rounded-xl text-[14.5px] cursor-pointer hover:shadow-[0_10px_24px_-8px_rgba(24,178,222,0.6)] transition-shadow duration-200"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4" />
              </svg>
              Meet The Team
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
