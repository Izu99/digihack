"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const PRACTICES = [
  {
    num: "01 / Software",
    title: "Engineering\nthat ships.",
    desc: "From discovery to deployment — we build production-grade web apps, mobile apps and software platforms with modern stacks and senior engineers.",
    items: ["Web Apps", "Mobile Apps", "SaaS Platforms", "Cloud & DevOps", "API & Integrations", "AI & Automation"],
    link: "Explore Software",
    style: "software",
  },
  {
    num: "02 / Marketing",
    title: "Growth\nthat compounds.",
    desc: "Full-funnel digital marketing — strategy, creative, paid media and SEO — built around real data, not vanity metrics.",
    items: ["SEO & Content", "Social Media", "Graphic Design", "Video Creation", "Brand Building", "Consultation"],
    link: "Explore Marketing",
    style: "marketing",
  },
];

const SERVICES = [
  {
    num: "/01",
    title: "Web Design & Development",
    desc: "Marketing sites, dashboards and complex web applications.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    num: "/02",
    title: "Software & App Development",
    desc: "iOS, Android & cross-platform apps with modern frameworks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
        <rect x="6" y="2" width="12" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    num: "/03",
    title: "Graphic Design",
    desc: "Visual identities, print and digital graphics that stand out.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
        <path d="M2 13.5V20a2 2 0 002 2h16a2 2 0 002-2v-6.5" /><path d="M12 2L2 8l10 6 10-6-10-6z" />
      </svg>
    ),
  },
  {
    num: "/04",
    title: "Digital & Social Media Marketing",
    desc: "Data-driven campaigns across all major social platforms.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
        <path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
  },
  {
    num: "/05",
    title: "Search Engine Optimization",
    desc: "Technical SEO, content strategy and link building for rankings.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    num: "/06",
    title: "Digital Content & Video",
    desc: "Compelling video production and content that captures attention.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
        <path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    num: "/07",
    title: "Brand Building",
    desc: "Strategic brand positioning and visual identity systems.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    num: "/08",
    title: "Consultation Services",
    desc: "Expert digital strategy to align your technology and goals.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
        <path d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

export function PracticeCard({ p, delay }: { p: (typeof PRACTICES)[0]; delay: number }) {
  const isSoftware = p.style === "software";
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
      className={`relative rounded-3xl p-10 overflow-hidden min-h-[400px] flex flex-col justify-between group cursor-default ${
        isSoftware
          ? "bg-gradient-to-br from-white via-[#F7FAFD] to-[#EAF0F6] border border-[#0E1A2B]/10"
          : "bg-gradient-to-br from-[#18b2de] via-[#0d8fb3] to-[#0a7a99]"
      }`}
    >
      {/* Decorative circles */}
      <div className={`absolute -right-16 -top-16 w-60 h-60 rounded-full ${isSoftware ? "bg-[#0E1A2B]/[0.03]" : "bg-white/5"}`} />
      <div className={`absolute right-8 -bottom-10 w-32 h-32 rounded-full border border-dashed ${isSoftware ? "border-[#0E1A2B]/10" : "border-white/15"}`} />

      <div className="relative">
        <p className={`font-mono text-[11px] tracking-[0.18em] uppercase mb-3 ${isSoftware ? "text-[#6B7A93]" : "text-white/60"}`}>{p.num}</p>
        <h3 className={`text-[32px] font-black leading-[1.1] tracking-tight mb-4 whitespace-pre-line ${isSoftware ? "text-[#0E1A2B]" : "text-white"}`}>{p.title}</h3>
        <p className={`text-[14.5px] leading-[1.7] mb-6 max-w-[380px] ${isSoftware ? "text-[#54607A]" : "text-white/85"}`}>{p.desc}</p>
        <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6">
          {p.items.map((item) => (
            <li key={item} className={`flex items-center gap-2 text-[13.5px] ${isSoftware ? "text-[#0E1A2B]/80" : "text-white/90"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={`flex items-center gap-3 text-sm font-bold border-t pt-5 self-start group-hover:gap-5 transition-all duration-200 ${
        isSoftware ? "border-[#0E1A2B]/12 text-[#0E1A2B]" : "border-white/20 text-white"
      }`}>
        {p.link}
        <span className={`w-8 h-8 rounded-full flex items-center justify-center ${isSoftware ? "bg-[#0E1A2B]/10" : "bg-white/15"}`}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4" />
          </svg>
        </span>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const inView1 = useInView(ref1, { once: true, margin: "-60px" });
  const inView2 = useInView(ref2, { once: true, margin: "-60px" });

  return (
    <div>
      {/* ── TWO PRACTICES ── */}
      <section className="py-24 bg-[#F3F6FA]">
        <div ref={ref1} className="max-w-[1180px] mx-auto px-7">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
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

          <div className="grid md:grid-cols-2 gap-6" data-reveal-stagger>
            {PRACTICES.map((p, i) => (
              <PracticeCard key={p.num} p={p} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-COL SERVICES GRID ── */}
      <section className="py-24 bg-white">
        <div ref={ref2} className="max-w-[1180px] mx-auto px-7">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="label block mb-4">Capabilities</span>
            <h2 className="text-[42px] font-black tracking-tight text-[#0E1A2B] leading-[1.08]">
              Best-In-Class <span className="text-[#0B84A8]">Digital Solutions</span>
            </h2>
            <p className="text-[#54607A] mt-4 text-[15.5px] leading-[1.65] max-w-[600px] mx-auto">
              A combined product & marketing toolkit — choose a single service or wrap it
              into a long-term partnership.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-reveal-stagger>
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="relative group p-6 rounded-2xl border border-[#0E1A2B]/8 bg-[#0E1A2B]/[0.03] hover:-translate-y-1 hover:border-[#18b2de]/30 hover:shadow-[0_10px_30px_-18px_rgba(24,178,222,0.3)] transition-all duration-200 cursor-default"
              >
                <span className="absolute top-4 right-4 font-mono text-[11px] text-[#0E1A2B]/20 group-hover:text-[#18b2de]/60 transition-colors duration-200">
                  {svc.num}
                </span>
                <div className="w-11 h-11 rounded-xl bg-[#18b2de]/10 text-[#18b2de] flex items-center justify-center mb-4 group-hover:bg-[#18b2de]/20 transition-colors duration-200">
                  {svc.icon}
                </div>
                <h4 className="text-[#0E1A2B] font-bold text-[15px] mb-2 leading-snug">{svc.title}</h4>
                <p className="text-[#6B7A93] text-[12.5px] leading-[1.55]">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
