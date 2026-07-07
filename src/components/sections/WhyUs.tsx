"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const REASONS = [
  { num: "01", title: "Full-Spectrum Capability", desc: "From pixel-perfect design to backend infrastructure — every layer of your digital presence under one roof. No handoffs, no gaps." },
  { num: "02", title: "Strategy-First Thinking", desc: "Every project starts with understanding your business goals, audience and competition — then we build a plan that delivers measurable results." },
  { num: "03", title: "Built for Results", desc: "Beautiful work means nothing without performance. We measure everything: conversions, traffic, engagement — and optimize until the numbers move." },
  { num: "04", title: "Global Reach, Local Insight", desc: "Operating across Sri Lanka, Australia, and the US gives us cultural fluency and market knowledge that purely local agencies can't match." },
  { num: "05", title: "Long-Term Partnership", desc: "We're not a vendor — we become embedded in your brand, learning your voice, your audience and your goals to grow with you over time." },
];

function ReasonItem({ reason, index }: { reason: (typeof REASONS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`group relative border-b border-[#0E1A2B]/8 py-7 pl-6 transition-all duration-300 ${
        inView ? "border-l-2 border-l-[#18b2de]" : "border-l-2 border-l-transparent"
      }`}
    >
      <div className="flex items-start gap-5">
        <span className="font-black text-4xl text-[#0E1A2B]/8 group-hover:text-[#18b2de]/40 transition-colors duration-300 flex-shrink-0 leading-none mt-1 font-mono">
          {reason.num}
        </span>
        <div>
          <h3 className="font-black text-[#0E1A2B] text-xl mb-2.5 group-hover:text-[#0B84A8] transition-colors duration-300">
            {reason.title}
          </h3>
          <p className="text-[#54607A] text-[14.5px] leading-[1.7]">{reason.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyUs() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true });

  return (
    <section className="py-24 bg-[#F3F6FA] relative overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#18b2de]/[0.06] blur-3xl" />

      <div className="max-w-[1180px] mx-auto px-7">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left — sticky */}
          <div ref={headRef} className="md:sticky md:top-28 md:h-fit">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span
                className="font-black text-[110px] leading-none text-[#0E1A2B]/[0.05] select-none block font-mono"
                aria-hidden="true"
              >
                02
              </span>
              <span className="label block mb-4">Why DigiHack</span>
              <h2 className="text-[42px] md:text-[46px] font-black tracking-tight text-[#0E1A2B] leading-[1.08] mb-5">
                Why Top Brands
                <br />
                <span className="text-[#0B84A8]">Choose Us</span>
              </h2>
              <p className="text-[#54607A] text-[15px] leading-[1.7] max-w-sm mb-8">
                We combine technical excellence with creative vision — and back it up with a
                track record of results across industries and continents.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[#18b2de] text-[#0E1A2B] font-bold px-6 py-3.5 rounded-xl text-[14.5px] cursor-pointer hover:shadow-[0_10px_24px_-8px_rgba(24,178,222,0.6)] transition-shadow duration-200"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4" />
                </svg>
                Work With Us
              </Link>
            </motion.div>
          </div>

          {/* Right — reasons */}
          <div className="flex flex-col">
            {REASONS.map((r, i) => (
              <ReasonItem key={r.num} reason={r} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
