"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

/**
 * Buttery momentum scrolling for the whole site. Navbar/ScrollProgress stay
 * outside this wrapper (still real position:fixed, untouched) — only the
 * routed page content + Footer get the smoothing applied to them.
 *
 * Skipped entirely under prefers-reduced-motion: those users get plain
 * native scrolling instead of eased momentum.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Created once — killing/recreating on every route change would fight
  // with the second effect below and cause visible scroll-position jumps.
  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
      });

      return () => {
        smoother.kill();
      };
    },
    { scope: wrapperRef }
  );

  // Next.js App Router keeps this layout mounted across navigations, so
  // content height changes between routes — recalculate and jump to top
  // after each one (ScrollSmoother's virtualized scroll doesn't reliably
  // pick up the browser's default scroll-restoration-on-navigate).
  const isFirstRender = useRef(true);
  useGSAP(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      requestAnimationFrame(() => {
        const smoother = ScrollSmoother.get();
        smoother?.scrollTop(0);
        // effects() is only scanned at create(); re-run it so data-speed/-lag
        // parallax works on elements mounted by client-side navigations too.
        smoother?.effects("[data-speed], [data-lag]");
        ScrollTrigger.refresh();
      });
    },
    { dependencies: [pathname] }
  );

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
