"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const POINTS = [
  {
    title: "Direct Access",
    desc: "Talk straight to the people building your project — no account managers in between.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8m-8 4h5m5-13H4a1 1 0 00-1 1v11a1 1 0 001 1h3l3 3 3-3h7a1 1 0 001-1V5a1 1 0 00-1-1z" />
    ),
  },
  {
    title: "Fixed-Price Clarity",
    desc: "Transparent scope and pricing agreed upfront — no surprise invoices down the line.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v3.586a1 1 0 00.293.707l6.414 6.414a2 2 0 002.828 0l3.586-3.586a2 2 0 000-2.828l-6.414-6.414A1 1 0 0011 4H9z M8 8h.01" />
    ),
  },
  {
    title: "Shipped in Weeks",
    desc: "A lean, senior team means faster execution — most projects go live sooner than expected.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
  {
    title: "Real-Time Reporting",
    desc: "Track traffic, leads and progress as it happens — full visibility, not a monthly PDF.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    ),
  },
];

export default function Differentiators() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-white border-t border-[#0E1A2B]/[0.06]">
      <div ref={ref} className="max-w-[1180px] mx-auto px-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="label block mb-4">How We Operate</span>
          <h2 className="text-[32px] md:text-[38px] font-black tracking-tight text-[#0E1A2B] leading-[1.1]">
            Built Different From <span className="text-[#0B84A8]">Typical Agencies</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-2xl border border-[#0E1A2B]/8 hover:border-[#18b2de]/40 hover:-translate-y-1 hover:shadow-[0_16px_36px_-20px_rgba(24,178,222,0.35)] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#18b2de]/10 flex items-center justify-center mb-5 group-hover:bg-[#18b2de] transition-colors duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5 text-[#0B84A8] group-hover:text-[#0E1A2B] transition-colors duration-300">
                  {p.icon}
                </svg>
              </div>
              <h3 className="font-black text-[#0E1A2B] text-[16px] mb-2">{p.title}</h3>
              <p className="text-[#54607A] text-[13.5px] leading-[1.65]">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
