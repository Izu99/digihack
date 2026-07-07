"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type HeadingTag = "h1" | "h2" | "h3" | "h4";

/**
 * Kinetic-typography heading: uses GSAP's real SplitText (word + auto mask)
 * to reveal each word with a rise + blur + scale stagger on scroll. Tighter
 * tracking and an italic accent phrase give it a distinct at-rest look too,
 * not just a one-off animation. Supports embedded "\n" for manual line
 * breaks (e.g. two-line card titles) via white-space: pre-line.
 */
export default function KineticHeading({
  text,
  as = "h2",
  className = "",
  accentFrom,
  accentClassName = "",
  delay = 0,
}: {
  text: string;
  as?: HeadingTag;
  className?: string;
  /** word index (0-based) from which words get accentClassName + italic applied */
  accentFrom?: number;
  accentClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const split = new SplitText(ref.current, {
        type: "words",
        mask: "words",
        wordsClass: "kinetic-word",
      });

      if (accentFrom !== undefined) {
        const accentClasses = accentClassName.split(" ").filter(Boolean);
        split.words.forEach((w, i) => {
          if (i >= accentFrom) w.classList.add("italic", ...accentClasses);
        });
      }

      if (reduced) {
        gsap.set(split.words, { yPercent: 0, opacity: 1, filter: "blur(0px)", scale: 1 });
        return () => split.revert();
      }

      const tween = gsap.fromTo(
        split.words,
        { yPercent: 140, opacity: 0, filter: "blur(10px)", scale: 0.9 },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.1,
          stagger: 0.09,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      };
    },
    { scope: ref, dependencies: [text] }
  );

  const Component = as;

  return (
    <Component
      ref={ref}
      className={`tracking-tighter ${className}`}
      style={{ whiteSpace: "pre-line" }}
    >
      {text}
    </Component>
  );
}
