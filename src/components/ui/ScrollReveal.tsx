"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Mounts once at the page level.
 * Auto-discovers every section's content and applies a
 * cinematic "dust-settle" reveal: blur → clear, y-offset → 0, fade in.
 * No data attributes needed — targets semantic HTML.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced-motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // ─── 1. EYEBROW LABELS (.label class) ────────────────────────────
      gsap.utils.toArray<HTMLElement>(".label").forEach((el) => {
        if (reduced) return;
        gsap.fromTo(
          el,
          { opacity: 0, letterSpacing: "0.5em", y: -8 },
          {
            opacity: 1,
            letterSpacing: "0.22em",
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ─── 2. SECTION HEADINGS (h2, h3 in sections) ────────────────────
      gsap.utils
        .toArray<HTMLElement>("section h2, section h3")
        .forEach((el) => {
          if (reduced) return;
          gsap.fromTo(
            el,
            { opacity: 0, y: 44, filter: "blur(10px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // ─── 3. SECTION LEAD PARAGRAPHS ──────────────────────────────────
      gsap.utils
        .toArray<HTMLElement>("section p")
        .forEach((el) => {
          if (reduced) return;
          gsap.fromTo(
            el,
            { opacity: 0, y: 24, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.8,
              delay: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // ─── 4. CARD / GRID CHILDREN — STAGGERED DUST ────────────────────
      // Targets grids of cards, service tiles, stat blocks, etc.
      const gridSelectors = [
        ".grid > div",          // generic grids
        ".grid > a",            // link cards
        ".practices-grid > *",  // practice cards
        ".feat-grid > *",       // feature grid
      ];

      gridSelectors.forEach((sel) => {
        gsap.utils
          .toArray<HTMLElement>(sel)
          .forEach((child) => {
            if (reduced) return;
            // Only animate if not already handled by framer-motion
            // (framer-motion adds inline opacity/transform — skip those)
            if (child.style.opacity === "0" || child.hasAttribute("data-framer-animated")) return;

            gsap.fromTo(
              child,
              { opacity: 0, y: 32, filter: "blur(6px)", scale: 0.97 },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: child,
                  start: "top 90%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
      });

      // ─── 5. EXPLICIT [data-reveal] OVERRIDE ──────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (reduced) return;
        const delay  = parseFloat(el.dataset.revealDelay  ?? "0");
        const fromY  = el.dataset.revealDir === "down" ? -40 : 40;
        const fromX  = el.dataset.revealDir === "left"  ? 48
                     : el.dataset.revealDir === "right" ? -48 : 0;
        gsap.fromTo(
          el,
          { opacity: 0, y: fromY, x: fromX, filter: "blur(10px)", scale: 0.96 },
          {
            opacity: 1, y: 0, x: 0, filter: "blur(0px)", scale: 1,
            duration: 1.0, delay, ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ─── 6. STAGGER CONTAINERS [data-reveal-stagger] ─────────────────
      gsap.utils
        .toArray<HTMLElement>("[data-reveal-stagger]")
        .forEach((parent) => {
          if (reduced) return;
          const kids = gsap.utils.toArray<HTMLElement>(
            ":scope > *",
            parent
          );
          gsap.fromTo(
            kids,
            { opacity: 0, y: 36, filter: "blur(6px)" },
            {
              opacity: 1, y: 0, filter: "blur(0px)",
              duration: 0.75, stagger: 0.1, ease: "power3.out",
              scrollTrigger: {
                trigger: parent,
                start: "top 86%",
                toggleActions: "play none none none",
              },
            }
          );
        });
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
