"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const TESTIMONIALS = [
  {
    quote:
      "DigiHack completely transformed our online presence. Our website now ranks #1 for luxury vinyl tile searches in Sri Lanka and e-commerce revenue has tripled since launch. They delivered far beyond what we expected.",
    name: "Kasun Perera",
    designation: "Director · Immense Home",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    quote:
      "Working with DigiHack took my music career to a completely new level. My social following grew 5× in just 90 days. Their content strategy and creative direction are unlike anything I've seen in Sri Lanka.",
    name: "Reyance",
    designation: "Recording Artist · Sri Lanka",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    quote:
      "The platform DigiHack built handles thousands of students seamlessly. Enrollment has grown 60% since launch. They truly understood our educational mission and delivered a product that reflects our brand perfectly.",
    name: "Hiroshi Nakamura",
    designation: "Director · YUME International",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
  },
  {
    quote:
      "DigiHack built a bilingual platform that speaks to both our Sri Lankan and Australian markets perfectly. Professional, fast, and genuinely invested in our success. A true long-term partner for the RADA Group.",
    name: "Ruwan Silva",
    designation: "CEO · RADA Group",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    quote:
      "Our Google rating went from 3.8 to 4.9 stars after DigiHack's brand strategy and content overhaul. They positioned GC AutoHub as the premium choice in Australia. Best investment we've made for our business.",
    name: "Gayan Chathuranga",
    designation: "Founder · GC AutoHub, Australia",
    src: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-[#0E1A2B] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#18b2de]/[0.04] blur-3xl" />

      <div ref={ref} className="max-w-[1180px] mx-auto px-7">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="label block mb-4">Client Voices</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-[42px] md:text-[46px] font-black tracking-tight text-white leading-[1.08]">
              What Our <span className="text-[#18b2de]">Clients Say</span>
            </h2>
            <p className="text-[#9aa3b2] text-[15px] leading-[1.65] max-w-sm">
              Real results, real relationships. Here&apos;s what the brands we&apos;ve
              built with have to say about working with DigiHack.
            </p>
          </div>
        </motion.div>

        {/* Testimonial component — centered */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <CircularTestimonials
            testimonials={TESTIMONIALS}
            autoplay
            colors={{
              name:                 "#F0F4F8",
              designation:          "#18b2de",
              testimony:            "#9aa3b2",
              arrowBackground:      "#15233A",
              arrowForeground:      "#F0F4F8",
              arrowHoverBackground: "#18b2de",
            }}
            fontSizes={{
              name:        "22px",
              designation: "11px",
              quote:       "16px",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
