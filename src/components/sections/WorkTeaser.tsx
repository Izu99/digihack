"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { CASES, CaseCard } from "@/components/sections/Work";

export default function WorkTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const featured = CASES.slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div ref={ref} className="max-w-[1180px] mx-auto px-7">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="label block mb-4">Clients & Results</span>
            <h2 className="text-[42px] md:text-[46px] font-black tracking-tight text-[#0E1A2B] leading-[1.08]">
              Work We&apos;re <span className="text-[#0B84A8]">Proud Of</span>
            </h2>
          </div>
          <p className="text-[#54607A] text-[15px] leading-[1.65] max-w-[380px]">
            From Sri Lanka to Australia — brands we&apos;ve helped build, grow and dominate their markets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {featured.map((c, i) => (
            <CaseCard key={c.id} c={c} delay={i * 0.08} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2.5 border border-[#0E1A2B]/20 text-[#0E1A2B] font-bold px-8 py-4 rounded-xl text-[14.5px] cursor-pointer hover:border-[#18b2de]/60 hover:text-[#0B84A8] transition-all duration-200 group"
          >
            View All Work
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
