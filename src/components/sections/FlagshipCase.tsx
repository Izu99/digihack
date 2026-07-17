"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { CASES } from "@/components/sections/Work";

const featured = CASES.find((c) => c.id === "c5")!;

export default function FlagshipCase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-[#0E1A2B] relative overflow-hidden">
      <div data-speed="0.9" className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#18b2de]/[0.08] blur-3xl" />

      <div ref={ref} className="max-w-[1180px] mx-auto px-7 grid md:grid-cols-2 gap-14 items-center relative z-10">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{ minHeight: 400 }}
        >
          <Image
            src={featured.img}
            alt={featured.client}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A2B]/70 via-transparent to-transparent" />
          <div className="absolute top-5 left-5 glass rounded-2xl px-4 py-3 z-10">
            <p className="text-white font-black text-2xl leading-none">{featured.stat.val}</p>
            <p className="text-white/60 text-[10px] font-mono uppercase tracking-wider mt-1">{featured.stat.label}</p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label block mb-4">Flagship Project</span>
          <h2 className="text-[36px] md:text-[42px] font-black tracking-tight text-white leading-[1.1] mb-5">
            {featured.headline}
          </h2>
          <p className="text-[#8fa3bb] text-[15px] leading-[1.7] mb-8 max-w-md">
            {featured.desc}
          </p>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-full bg-[#18b2de] flex items-center justify-center flex-shrink-0">
              <span className="text-[#0E1A2B] text-[11px] font-black leading-none select-none">
                {featured.client.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">{featured.client}</p>
              <p className="text-white/50 text-[11px] font-mono uppercase tracking-wider">{featured.tag}</p>
            </div>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2.5 bg-[#18b2de] text-[#0E1A2B] font-bold px-7 py-3.5 rounded-xl text-[14.5px] cursor-pointer hover:shadow-[0_10px_24px_-8px_rgba(24,178,222,0.6)] transition-shadow duration-200 group"
          >
            Read Full Case Study
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
