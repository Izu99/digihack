"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What services does DigiHack provide?",
    a: "We combine software engineering with digital marketing under one roof: web & software development, mobile apps, UI/UX design, SEO, social media marketing, brand identity and video content.",
  },
  {
    q: "Where is DigiHack based, and who do you work with?",
    a: "We operate from Sri Lanka with clients across Sri Lanka, Australia and the United States — from local businesses like Immense Home and YUME International to export brands like RADA Group and GC AutoHub.",
  },
  {
    q: "What does your process look like?",
    a: "Five phases: Discover, Design, Build, Launch and Scale. Every project starts with workshops and goal-setting, then moves through UX/architecture, iterative development, a coordinated launch, and ongoing data-driven optimization.",
  },
  {
    q: "Do you handle both the product and the marketing around it?",
    a: "Yes — that's the core of how we're structured. One team pairs product engineering with growth marketing so launch, scale and retention strategy are planned together instead of handed off between agencies.",
  },
  {
    q: "How do I start a project with DigiHack?",
    a: "Reach out through the contact page — call, WhatsApp or email. We reply within 24 hours and typically start with a short discovery conversation before scoping the work.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#0E1A2B]/8">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-[#0E1A2B] font-bold text-[16px] md:text-[17px]">{q}</span>
        <ChevronDown
          size={20}
          strokeWidth={2}
          className={`text-[#0B84A8] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-[#54607A] text-[14.5px] leading-[1.7] pb-6 max-w-[640px]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div ref={ref} className="max-w-[800px] mx-auto px-7">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="label block mb-4">FAQ</span>
          <h2 className="text-[42px] md:text-[46px] font-black tracking-tight text-[#0E1A2B] leading-[1.08]">
            Frequently Asked <span className="text-[#0B84A8]">Questions</span>
          </h2>
        </motion.div>

        <div>
          {FAQS.map((item, i) => (
            <FAQItem
              key={item.q}
              q={item.q}
              a={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
