"use client";

import { motion } from "framer-motion";

export default function PageHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0E1A2B] pt-40 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.1]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#18b2de]/[0.08] blur-3xl" />

      <div className="relative max-w-[1180px] mx-auto px-7 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 border border-white/18 bg-white/[0.05] rounded-full px-4 py-1.5 text-[11px] font-semibold text-white/75 tracking-[0.24em] uppercase font-mono mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#18b2de] animate-pulse" />
          {label}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-black text-[44px] md:text-[64px] leading-[1.05] tracking-tight text-white"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-[#8fa3bb] text-[15.5px] md:text-[16px] leading-[1.7] max-w-[560px] mx-auto mt-6"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
