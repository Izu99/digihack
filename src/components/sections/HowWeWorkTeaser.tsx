"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { STEPS } from "@/components/sections/Process";

export default function HowWeWorkTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]" />

      <div ref={ref} className="max-w-[1180px] mx-auto px-7 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label block mb-4">How We Work</span>
          <h2 className="text-[42px] md:text-[46px] font-black tracking-tight text-[#0E1A2B] leading-[1.08]">
            A process built for <span className="text-[#0B84A8]">velocity.</span>
          </h2>
          <p className="text-[#54607A] mt-4 text-[15.5px] leading-[1.65] max-w-[560px] mx-auto">
            From first conversation to launch — five phases, clear milestones, zero surprises.
          </p>
        </motion.div>

        <div className="relative mb-14">
          <div className="absolute top-8 left-[10%] right-[10%] h-0.5 hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#18b2de]/40 to-transparent" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#18b2de] to-transparent origin-left"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 relative" data-reveal-stagger>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="relative text-center px-2"
              >
                <div className="w-16 h-16 rounded-full border-2 bg-[#F3F6FA] border-[#18b2de]/35 text-[#0B84A8] flex items-center justify-center mx-auto mb-4 relative z-10 font-black text-xl">
                  {step.num}
                </div>
                <h4 className="text-[15px] font-bold mb-2 text-[#0E1A2B]">{step.title}</h4>
                <p className="text-[12.5px] leading-[1.55] text-[#6B7A93]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 border border-[#0E1A2B]/20 text-[#0E1A2B] font-bold px-8 py-4 rounded-xl text-[14.5px] cursor-pointer hover:border-[#18b2de]/60 hover:text-[#0B84A8] transition-all duration-200 group"
          >
            See Full Process & Services
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
