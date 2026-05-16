"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  { num: "01", title: "Discover", desc: "Workshops, audits and goal-setting to align on metrics that matter to your business." },
  { num: "02", title: "Design", desc: "UX, brand and technical architecture — turned into a clear, actionable plan." },
  { num: "03", title: "Build", desc: "Iterative development with shipped deliverables, demos and tracked KPIs." },
  { num: "04", title: "Launch", desc: "Go-live, campaigns and launch creative — coordinated as one unified motion." },
  { num: "05", title: "Scale", desc: "Iterate on data — product, content and spend tuned every month." },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 bg-[#0E1A2B] relative overflow-hidden">
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]" />

      <div ref={ref} className="max-w-[1180px] mx-auto px-7 relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label block mb-4">How We Work</span>
          <h2 className="text-[42px] md:text-[46px] font-black tracking-tight text-white leading-[1.08]">
            A process built for{" "}
            <span className="text-[#18b2de]">velocity.</span>
          </h2>
          <p className="text-[#9aa3b2] mt-4 text-[15.5px] leading-[1.65] max-w-[560px] mx-auto">
            From first conversation to launch — five phases, clear milestones, zero surprises.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line */}
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
                onClick={() => setActive(i)}
                className={`group relative text-center px-2 cursor-pointer`}
              >
                {/* Circle */}
                <div
                  className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-4 relative z-10 transition-all duration-300 font-black text-xl ${
                    active === i
                      ? "bg-[#18b2de] border-[#18b2de] text-white shadow-[0_0_0_8px_rgba(24,178,222,0.12)]"
                      : "bg-[#15233A] border-[#18b2de]/35 text-[#18b2de] group-hover:border-[#18b2de]/70"
                  }`}
                >
                  {step.num}
                </div>

                <h4 className={`text-[15px] font-bold mb-2 transition-colors duration-200 ${active === i ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                  {step.title}
                </h4>
                <p className={`text-[12.5px] leading-[1.55] transition-colors duration-200 ${active === i ? "text-[#9aa3b2]" : "text-[#7A8FA6]"}`}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
