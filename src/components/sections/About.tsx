"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const FEATURES = [
  {
    title: "Who We Are",
    desc: "A senior team of developers, designers, strategists & growth specialists.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
  },
  {
    title: "What We Do",
    desc: "We design, ship and scale software and the campaigns around it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "How We Work",
    desc: "Embedded partnerships, clear milestones, transparent roadmaps.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    title: "Our Results",
    desc: "Measurable lift in revenue, retention and digital presence.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2l2.6 6.3L21 9l-5 4.5L17.3 21 12 17.6 6.7 21 8 13.5 3 9l6.4-.7z" />
      </svg>
    ),
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#18b2de]/[0.04] blur-3xl" />

      <div ref={ref} className="max-w-[1180px] mx-auto px-7">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT — portrait image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Decorative blobs */}
            <div className="absolute -right-5 -top-5 w-28 h-28 rounded-full bg-[#18b2de]/10 z-0" />
            <div className="absolute -left-4 -bottom-4 w-20 h-20 rounded-xl border-2 border-[#18b2de]/30 z-0" />

            <div className="relative aspect-[1/1.05] rounded-2xl overflow-hidden z-10" style={{ boxShadow: "0 10px 30px -18px rgba(14,26,43,.8), 0 2px 6px rgba(14,26,43,.4)" }}>
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="DigiHack team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A2B]/60 to-transparent" />

              {/* Badge */}
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

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-3 mb-8" data-reveal-stagger>
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="flex gap-3 items-start p-4 rounded-xl border border-[#0E1A2B]/8 bg-[#0E1A2B]/[0.03] hover:border-[#18b2de]/30 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(24,178,222,0.2)] transition-all duration-200 cursor-default"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#18b2de]/10 text-[#18b2de] flex items-center justify-center flex-shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-[#0E1A2B] font-bold text-sm mb-1">{f.title}</h4>
                    <p className="text-[#6B7A93] text-xs leading-[1.55]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#18b2de] text-[#0E1A2B] font-bold px-6 py-3.5 rounded-xl text-[14.5px] cursor-pointer hover:shadow-[0_10px_24px_-8px_rgba(24,178,222,0.6)] transition-shadow duration-200"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4" />
                </svg>
                Let&apos;s Work Together
              </Link>
              <a
                href="tel:+94717586847"
                className="inline-flex items-center gap-2.5 text-[#0E1A2B] font-bold text-[14.5px] cursor-pointer"
              >
                <span className="w-8 h-8 rounded-full bg-[#18b2de]/10 text-[#18b2de] flex items-center justify-center">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z" />
                  </svg>
                </span>
                071 758 6847
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
