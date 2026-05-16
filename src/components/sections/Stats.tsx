"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { num: 97, suffix: "%", label: "Client Retention", sub: "Long-term partnerships, not one-off projects" },
  { num: 50, suffix: "+", label: "Projects Delivered", sub: "Web, mobile, software and campaigns" },
  { num: 8, suffix: "", label: "Digital Services", sub: "From design to SEO — full spectrum" },
  { num: 2018, suffix: "", label: "Founded", sub: "Building brands since day one" },
];

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target]);

  return <>{count}{suffix}</>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#0a1525] border-t border-white/[0.06]">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="grid grid-cols-2 md:grid-cols-4" data-reveal-stagger>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-center justify-center text-center px-6 py-10 group"
            >
              {/* Divider between items */}
              {i > 0 && (
                <div className="absolute left-0 top-[14%] bottom-[14%] w-px bg-white/[0.08]" />
              )}
              <div className="text-[#18b2de] font-black text-[42px] leading-none tracking-tight mb-2">
                <CountUp target={stat.num} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-white font-bold text-sm mb-1.5">{stat.label}</div>
              <div className="text-[#7A8FA6] text-xs leading-snug max-w-[160px]">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
