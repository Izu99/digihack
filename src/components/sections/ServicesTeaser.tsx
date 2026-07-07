"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { PRACTICES, PracticeCard } from "@/components/sections/Services";

export default function ServicesTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 bg-[#F3F6FA]">
      <div ref={ref} className="max-w-[1180px] mx-auto px-7">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="label block mb-4">What We Do</span>
          <h2 className="text-[42px] md:text-[46px] font-black tracking-tight text-[#0E1A2B] leading-[1.08]">
            Two practices. <span className="text-[#0B84A8]">One team.</span>
          </h2>
          <p className="text-[#54607A] mt-4 text-[15.5px] leading-[1.65] max-w-[600px] mx-auto">
            We pair product engineering with growth marketing so your launch, scale and
            retention strategy live in the same room.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12" data-reveal-stagger>
          {PRACTICES.map((p, i) => (
            <PracticeCard key={p.num} p={p} delay={i * 0.12} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 border border-[#0E1A2B]/20 text-[#0E1A2B] font-bold px-8 py-4 rounded-xl text-[14.5px] cursor-pointer hover:border-[#18b2de]/60 hover:text-[#0B84A8] transition-all duration-200 group"
          >
            View All Services
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
