"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Boxes, Palette, Sparkles, Cloud, Smartphone } from "lucide-react";

const STACK = [
  { name: "Next.js & React", icon: Code2, group: "Frontend" },
  { name: "TypeScript", icon: Boxes, group: "Frontend" },
  { name: "Tailwind CSS", icon: Palette, group: "Design" },
  { name: "Framer Motion & GSAP", icon: Sparkles, group: "Animation" },
  { name: "iOS & Android", icon: Smartphone, group: "Mobile" },
  { name: "Vercel Cloud", icon: Cloud, group: "Infrastructure" },
];

export default function TechStack() {
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
          <span className="label block mb-4">Technology</span>
          <h2 className="text-[42px] md:text-[46px] font-black tracking-tight text-[#0E1A2B] leading-[1.08]">
            Built With <span className="text-[#0B84A8]">Modern Tools</span>
          </h2>
          <p className="text-[#54607A] mt-4 text-[15.5px] leading-[1.65] max-w-[560px] mx-auto">
            The same stack we use to build this very site — production-grade frameworks, not
            legacy tooling.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4" data-reveal-stagger>
          {STACK.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex items-center gap-4 p-6 rounded-2xl border border-[#0E1A2B]/8 bg-white hover:border-[#18b2de]/30 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-18px_rgba(24,178,222,0.3)] transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#18b2de]/10 text-[#18b2de] flex items-center justify-center flex-shrink-0">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[#0E1A2B] font-bold text-[14.5px]">{t.name}</p>
                  <p className="text-[#6B7A93] text-[11px] font-mono uppercase tracking-widest mt-0.5">{t.group}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
