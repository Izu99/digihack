"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-[#F3F6FA] relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#18b2de]/[0.06] blur-3xl" />

      <div ref={ref} className="max-w-[1180px] mx-auto px-7 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label block mb-4">Get In Touch</span>
          <h2 className="text-[42px] md:text-[56px] font-black tracking-tight text-[#0E1A2B] leading-[1.05]">
            Let&apos;s Build <span className="text-[#0B84A8]">Something.</span>
          </h2>
          <p className="text-[#54607A] mt-5 text-[15.5px] leading-[1.65] max-w-[480px] mx-auto">
            Ready to take your brand to the next level? Let&apos;s talk about what we
            can build together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-10"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#18b2de] text-[#0E1A2B] font-black text-[15px] px-10 py-5 rounded-2xl cursor-pointer hover:shadow-[0_16px_40px_-12px_rgba(24,178,222,0.6)] transition-shadow duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            Send Us a Message
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
