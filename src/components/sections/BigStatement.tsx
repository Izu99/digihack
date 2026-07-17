"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function BigStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <h2
          className="relative font-black tracking-tighter leading-[0.95] text-center text-[#0E1A2B] px-4"
          style={{ fontSize: "clamp(2.75rem, 9vw, 8rem)" }}
        >
          Epitom <span className="text-[#0B84A8]">Beyond</span>
          <br />
          The Concept.
        </h2>

        {/* white shine splash, sweeps left to right once the title is in view */}
        <motion.h2
          aria-hidden
          className="absolute inset-0 font-black tracking-tighter leading-[0.95] text-center px-4 pointer-events-none select-none"
          style={{
            fontSize: "clamp(2.75rem, 9vw, 8rem)",
            backgroundImage:
              "linear-gradient(100deg, transparent 42%, rgba(255,255,255,0.95) 50%, transparent 58%)",
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
          initial={{ backgroundPositionX: "-150%" }}
          animate={inView ? { backgroundPositionX: "150%" } : {}}
          transition={{ duration: 1.3, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Epitom Beyond
          <br />
          The Concept.
        </motion.h2>
      </motion.div>
    </section>
  );
}
