"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const CASES = [
  {
    id: "c1",
    client: "Immense Home",
    tag: "Web Development · Brand",
    headline: "Sri Lanka's #1 luxury vinyl tile brand — reimagined online.",
    desc: "Complete digital transformation: e-commerce website, brand refresh and SEO strategy that drove 3× organic traffic growth.",
    stat: { val: "3×", label: "Traffic Growth" },
    img: "/work/immense-home.jpg",
    big: true,
  },
  {
    id: "c2",
    client: "Reyance",
    tag: "Digital Marketing · Content",
    headline: "Rising star in Sri Lankan rap goes viral.",
    desc: "Social media strategy, video content and paid campaigns that grew his fanbase 5× in 90 days.",
    stat: { val: "5×", label: "Fan Growth" },
    img: "/work/reyance.jpg",
  },
  {
    id: "c3",
    client: "YUME International",
    tag: "Software · SEO",
    headline: "Top Japanese language institute — built to scale.",
    desc: "Custom LMS platform, SEO-first content strategy and lead generation system for Sri Lanka's top Japanese institute.",
    stat: { val: "60%", label: "More Leads" },
    img: "/work/yume-international.jpg",
  },
  {
    id: "c4",
    client: "RADA Group",
    tag: "Web Dev · Marketing",
    headline: "Export-import powerhouse — from SL to Australia.",
    desc: "Bilingual corporate website and digital marketing strategy spanning Sri Lanka and Australian markets.",
    stat: { val: "2×", label: "Markets" },
    img: "/work/rada-group.jpg",
  },
  {
    id: "c5",
    client: "GC AutoHub",
    tag: "Brand · Content",
    headline: "Premium car detailing brand — Australia.",
    desc: "Full brand identity, social media content calendar and Google Ads strategy for premium auto detailing in Australia.",
    stat: { val: "4.9★", label: "Google Rating" },
    img: "/work/gc-autohub.jpg",
  },
];

export function CaseCard({ c, delay }: { c: (typeof CASES)[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{ minHeight: c.big ? 480 : 320 }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={c.img}
          alt={c.client}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A2B] via-[#0E1A2B]/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      </div>

      {/* Stat badge */}
      <div className="absolute top-5 right-5 glass rounded-2xl px-4 py-3 text-right z-10">
        <p className="text-white font-black text-2xl leading-none">{c.stat.val}</p>
        <p className="text-white/60 text-[10px] font-mono uppercase tracking-wider mt-1">{c.stat.label}</p>
      </div>

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-7">
        <p className="text-[#18b2de] text-[11px] font-bold tracking-[0.2em] uppercase font-mono mb-2">{c.tag}</p>
        <h4 className={`text-white font-black leading-[1.2] tracking-tight mb-2 ${c.big ? "text-[24px]" : "text-[18px]"}`}>
          {c.headline}
        </h4>
        {c.big && (
          <p className="text-white/75 text-[14px] leading-[1.6] max-w-[440px]">{c.desc}</p>
        )}
        {/* Client name */}
        <div className="mt-4 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#18b2de] flex items-center justify-center flex-shrink-0 overflow-hidden">
            <span className="text-[#0E1A2B] text-[10px] font-black leading-none select-none">
              {c.client.split(" ").map(w => w[0]).slice(0, 2).join("")}
            </span>
          </div>
          <span className="text-white/60 text-xs font-semibold">{c.client}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [big, ...rest] = CASES;

  return (
    <section className="py-24 bg-white">
      <div ref={ref} className="max-w-[1180px] mx-auto px-7">
        {/* Heading */}
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

        {/* Grid — asymmetric: big left (2 rows), 2x2 right */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
          {/* Big case */}
          <div className="md:row-span-2">
            <CaseCard c={big} delay={0} />
          </div>
          {/* Small cases */}
          {rest.slice(0, 4).map((c, i) => (
            <CaseCard key={c.id} c={c} delay={0.1 + i * 0.08} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 border border-[#0E1A2B]/20 text-[#0E1A2B] font-bold px-8 py-4 rounded-xl text-[14.5px] cursor-pointer hover:border-[#18b2de]/60 hover:text-[#0B84A8] transition-all duration-200 group"
          >
            Start Your Project
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
