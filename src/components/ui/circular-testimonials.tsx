"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────
interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
  className?: string;
}

// ── Gap helper ────────────────────────────────────────────────────────────
function calculateGap(width: number) {
  const minWidth = 1024, maxWidth = 1456;
  const minGap = 55,    maxGap = 82;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

// ── Component ─────────────────────────────────────────────────────────────
export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
  className,
}: CircularTestimonialsProps) => {
  // DigiHack-themed defaults
  const colorName        = colors.name            ?? "#F0F4F8";
  const colorDesignation = colors.designation     ?? "#18b2de";
  const colorTestimony   = colors.testimony       ?? "#9aa3b2";
  const colorArrowBg     = colors.arrowBackground ?? "#15233A";
  const colorArrowFg     = colors.arrowForeground ?? "#F0F4F8";
  const colorArrowHover  = colors.arrowHoverBackground ?? "#18b2de";

  const fsName        = fontSizes.name        ?? "22px";
  const fsDesignation = fontSizes.designation ?? "13px";
  const fsQuote       = fontSizes.quote       ?? "16px";

  const [activeIndex, setActiveIndex]   = useState(0);
  const [hoverPrev, setHoverPrev]       = useState(false);
  const [hoverNext, setHoverNext]       = useState(false);
  const [containerWidth, setContainerWidth] = useState(600);

  const containerRef  = useRef<HTMLDivElement>(null);
  const autoplayRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const total         = useMemo(() => testimonials.length, [testimonials]);
  const active        = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials]);

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerWidth(el.offsetWidth));
    ro.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    autoplayRef.current = setInterval(
      () => setActiveIndex((p) => (p + 1) % total),
      5000
    );
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [autoplay, total]);

  const stopAutoplay = () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };

  const handleNext = useCallback(() => { stopAutoplay(); setActiveIndex((p) => (p + 1) % total); }, [total]);
  const handlePrev = useCallback(() => { stopAutoplay(); setActiveIndex((p) => (p - 1 + total) % total); }, [total]);

  // Keyboard
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [handlePrev, handleNext]);

  // 3-card fan layout
  function getImgStyle(index: number): React.CSSProperties {
    const gap        = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive   = index === activeIndex;
    const isLeft     = (activeIndex - 1 + total) % total === index;
    const isRight    = (activeIndex + 1) % total === index;

    if (isActive) return {
      zIndex: 3, opacity: 1, pointerEvents: "auto",
      transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
    if (isLeft) return {
      zIndex: 2, opacity: 1, pointerEvents: "auto",
      transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
    if (isRight) return {
      zIndex: 2, opacity: 1, pointerEvents: "auto",
      transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
    return {
      zIndex: 1, opacity: 0, pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -20 },
  };

  return (
    <div className={cn("w-full max-w-5xl px-4", className)}>
      {/* Two-column grid */}
      <div className="grid gap-16 md:grid-cols-2 md:gap-12 items-center">

        {/* ── Left: fan of images ── */}
        <div
          ref={containerRef}
          className="relative w-full h-80 md:h-96"
          style={{ perspective: "1000px" }}
        >
          {testimonials.map((t, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={t.src + i}
              src={t.src}
              alt={t.name}
              className="absolute w-full h-full object-cover rounded-2xl"
              style={{
                ...getImgStyle(i),
                boxShadow: "0 16px 48px rgba(0,0,0,0.45)",
              }}
            />
          ))}

          {/* Cyan top-edge accent on active image */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl z-10 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, #18b2de, transparent)",
            }}
          />
        </div>

        {/* ── Right: quote content ── */}
        <div className="flex flex-col justify-between min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              {/* Opening quote mark */}
              <svg
                viewBox="0 0 48 36"
                fill="none"
                className="w-10 h-8 mb-4 opacity-25"
                style={{ color: "#18b2de" }}
              >
                <path
                  d="M0 36V22.5C0 10 6.5 3 19.5 0L22.5 4.5C16 6.5 13 10.5 12 14.5H22.5V36H0ZM25.5 36V22.5C25.5 10 32 3 45 0L48 4.5C41.5 6.5 38.5 10.5 37.5 14.5H48V36H25.5Z"
                  fill="currentColor"
                />
              </svg>

              {/* Quote — word-by-word blur reveal */}
              <motion.p
                className="leading-relaxed mb-6"
                style={{ color: colorTestimony, fontSize: fsQuote, lineHeight: "1.8" }}
              >
                {active.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(8px)", opacity: 0, y: 4 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut", delay: 0.02 * i }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>

              {/* Separator */}
              <div
                className="w-10 h-0.5 mb-4 rounded"
                style={{ background: "#18b2de" }}
              />

              <h3 style={{ color: colorName, fontSize: fsName, fontWeight: 800, marginBottom: "4px" }}>
                {active.name}
              </h3>
              <p
                className="font-mono uppercase tracking-widest"
                style={{ color: colorDesignation, fontSize: fsDesignation }}
              >
                {active.designation}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows + dots */}
          <div className="flex items-center gap-5 mt-8">
            <button
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full flex items-center justify-center border-0 cursor-pointer transition-all duration-300 flex-shrink-0"
              style={{
                backgroundColor: hoverPrev ? colorArrowHover : colorArrowBg,
                boxShadow: hoverPrev ? "0 0 20px rgba(24,178,222,0.4)" : "none",
              }}
            >
              <ArrowLeft size={18} color={colorArrowFg} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { stopAutoplay(); setActiveIndex(i); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="rounded-full border-0 cursor-pointer transition-all duration-300"
                  style={{
                    width:  i === activeIndex ? "20px" : "6px",
                    height: "6px",
                    backgroundColor: i === activeIndex ? "#18b2de" : "rgba(14,26,43,0.15)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full flex items-center justify-center border-0 cursor-pointer transition-all duration-300 flex-shrink-0"
              style={{
                backgroundColor: hoverNext ? colorArrowHover : colorArrowBg,
                boxShadow: hoverNext ? "0 0 20px rgba(24,178,222,0.4)" : "none",
              }}
            >
              <ArrowRight size={18} color={colorArrowFg} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;
