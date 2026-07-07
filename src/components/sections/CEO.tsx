"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function CEO() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.1]" />

      <div className="max-w-[1180px] mx-auto px-7">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-[#0E1A2B]/10 bg-[#F3F6FA]/80 backdrop-blur-sm overflow-hidden shadow-[0_10px_30px_-18px_rgba(14,26,43,.15)]"
        >
          {/* Top cyan accent */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#18b2de] to-transparent" />

          <div className="grid md:grid-cols-2 gap-0">
            {/* Left — CEO info */}
            <div className="flex flex-col gap-8 md:border-r md:border-[#0E1A2B]/8 p-10 md:p-12">
              {/* Avatar + name */}
              <div className="flex items-center gap-5">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#18b2de]/40 flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    alt="Isuru Malaka — CEO"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <h3 className="font-black text-xl text-[#0E1A2B]">Isuru Malaka</h3>
                  <p className="text-[#0B84A8] text-sm font-semibold mt-0.5">Chief Executive Officer</p>
                  <p className="text-[#6B7A93] text-xs font-mono mt-0.5">DigiHack · Adzcept Group</p>
                </div>
              </div>

              {/* Credentials */}
              <div className="space-y-3">
                <p className="text-[#6B7A93] text-[10px] uppercase tracking-widest font-mono">Credentials</p>
                {[
                  "B.Tech Multimedia & Web Technology",
                  "University of Vocational Technology (UoVT)",
                  "Founder & CEO, Adzcept Group",
                  "DigiHack · Digital Tourism Hub",
                ].map((c) => (
                  <div key={c} className="flex items-start gap-2.5">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-[#18b2de] flex-shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3.5 3.5L13 4" />
                    </svg>
                    <span className="text-[#54607A] text-sm">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Quote */}
            <div className="flex flex-col justify-center gap-6 p-10 md:p-12">
              <svg viewBox="0 0 48 48" fill="currentColor" className="w-12 h-12 text-[#18b2de]/20">
                <path d="M12 6C5.4 6 0 11.4 0 18c0 5.4 3.6 10.2 8.4 11.4L6 42h12l4.8-13.8C24 26.4 24 24 24 22.2 24 13.2 18.6 6 12 6zm24 0c-6.6 0-12 5.4-12 12 0 5.4 3.6 10.2 8.4 11.4L30 42h12l4.8-13.8C48 26.4 48 24 48 22.2 48 13.2 42.6 6 36 6z" />
              </svg>

              <blockquote className="space-y-4">
                <p className="text-[#0E1A2B] text-[17px] leading-[1.7] font-light">
                  &ldquo;At DigiHack, we believe every business deserves a world-class digital
                  presence — regardless of where they&apos;re based. We bring together the creativity
                  of design, the power of technology, and the precision of data to help brands
                  not just exist online, but dominate.&rdquo;
                </p>
                <p className="text-[#54607A] text-[14.5px] leading-[1.7]">
                  Our mission has always been clear: to push beyond what&apos;s expected. To find the
                  insight others miss, and build what nobody thought was possible. That&apos;s what
                  &ldquo;Epitom Beyond The Concept&rdquo; means to us — and to every client we work with.
                </p>
              </blockquote>

              <div className="pt-3 border-t border-[#0E1A2B]/10">
                <p className="text-[#0E1A2B] font-bold">Isuru Malaka</p>
                <p className="text-[#6B7A93] text-sm font-mono">CEO, DigiHack · Sri Lanka & United States</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
