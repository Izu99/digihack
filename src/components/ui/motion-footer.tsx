"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// STYLES — theme-adaptive via shadcn CSS variables already defined in globals.css
// ---------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-plus-jakarta, "Plus Jakarta Sans", system-ui, sans-serif);
  -webkit-font-smoothing: antialiased;

  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 22%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 22%, transparent);
}

@keyframes cf-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.55; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
}

@keyframes cf-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes cf-heartbeat {
  0%,100% { transform: scale(1);   filter: drop-shadow(0 0 5px  color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%,45% { transform: scale(1.25); filter: drop-shadow(0 0 12px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30%     { transform: scale(1); }
}

.animate-cf-breathe     { animation: cf-breathe  8s ease-in-out infinite alternate; }
.animate-cf-marquee     { animation: cf-marquee 38s linear infinite; }
.animate-cf-heartbeat   { animation: cf-heartbeat 2s cubic-bezier(0.25,1,0.5,1) infinite; }

.cf-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right,  color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.cf-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--primary) 18%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 14%, transparent) 40%,
    transparent 70%
  );
}

.cf-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
    0 10px 30px -10px var(--pill-shadow),
    inset 0 1px 1px var(--pill-highlight),
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}

.cf-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
    0 20px 40px -10px var(--pill-shadow-hover),
    inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.cf-giant-text {
  font-size: 24vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 8%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
  user-select: none;
}

.cf-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 45%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 24px color-mix(in oklch, var(--foreground) 12%, transparent));
}
`;

// ---------------------------------------------------------------------------
// MAGNETIC BUTTON
// ---------------------------------------------------------------------------
type MagneticProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticProps>(
  ({ className, children, as: Tag = "button", ...props }, fwd) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const el = ref.current;
      if (!el) return;

      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.38;
          const y = (e.clientY - r.top  - r.height / 2) * 0.38;
          gsap.to(el, {
            x, y,
            rotationX: -y * 0.15,
            rotationY:  x * 0.15,
            scale: 1.06,
            ease: "power2.out",
            duration: 0.35,
          });
        };
        const onLeave = () =>
          gsap.to(el, {
            x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1,
            ease: "elastic.out(1,0.3)",
            duration: 1.1,
          });

        el.addEventListener("mousemove", onMove as EventListener);
        el.addEventListener("mouseleave", onLeave);
        return () => {
          el.removeEventListener("mousemove", onMove as EventListener);
          el.removeEventListener("mouseleave", onLeave);
        };
      }, el);

      return () => ctx.revert();
    }, []);

    return (
      <Tag
        ref={(node: HTMLElement) => {
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof fwd === "function") fwd(node);
          else if (fwd) (fwd as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// ---------------------------------------------------------------------------
// MARQUEE ROW — DigiHack services
// ---------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6 whitespace-nowrap">
    <span>Web Design & Development</span>
    <span className="text-primary/50">✦</span>
    <span>Software & App Development</span>
    <span className="text-primary/50">✦</span>
    <span>Digital & Social Media Marketing</span>
    <span className="text-primary/50">✦</span>
    <span>Search Engine Optimization</span>
    <span className="text-primary/50">✦</span>
    <span>Brand Building</span>
    <span className="text-primary/50">✦</span>
    <span>Epitom Beyond The Concept</span>
    <span className="text-primary/50">✦</span>
  </div>
);

// ---------------------------------------------------------------------------
// CINEMATIC FOOTER
// ---------------------------------------------------------------------------
export function CinematicFooter() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const giantRef    = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const linksRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Giant text parallax
      gsap.fromTo(
        giantRef.current,
        { y: "12vh", scale: 0.82, opacity: 0 },
        {
          y: "0vh", scale: 1, opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1.2,
          },
        }
      );

      // Heading + links stagger reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 55, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 38%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/*
        The clip-path wrapper sits in normal flow.
        The inner <footer> is position:fixed, so it "sticks" behind the
        wrapper's clipping boundary — creating the cinematic reveal as you scroll.
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[var(--background)] text-[var(--foreground)] cinematic-footer-wrapper">

          {/* Aurora glow */}
          <div className="cf-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-cf-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />

          {/* Grid background */}
          <div className="cf-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantRef}
            className="cf-giant-text absolute -bottom-[6vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none"
          >
            DIGIHACK
          </div>

          {/* ── Diagonal marquee strip ── */}
          <div className="absolute top-10 left-0 w-full overflow-hidden border-y border-[var(--border)] bg-[var(--background)]/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-cf-marquee text-[11px] font-bold tracking-[0.28em] text-[var(--muted-foreground)] uppercase">
              <MarqueeItem /><MarqueeItem />
            </div>
          </div>

          {/* ── Main centre content ── */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-5xl md:text-8xl font-black cf-text-glow tracking-tighter mb-12 text-center leading-none"
            >
              Let&apos;s Build<br />
              <span style={{ color: "#18b2de", WebkitTextFillColor: "#18b2de", filter: "none", background: "none" }}>
                Something.
              </span>
            </h2>

            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              {/* Primary CTAs */}
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton
                  as="a"
                  href="mailto:digihacklk@gmail.com"
                  className="cf-glass-pill px-10 py-5 rounded-full text-[var(--foreground)] font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  Start a Project
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="https://wa.me/94761724166"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cf-glass-pill px-10 py-5 rounded-full text-[var(--foreground)] font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </MagneticButton>
              </div>

              {/* Secondary pill links */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-5">
                {[
                  { label: "Services", href: "#services" },
                  { label: "About", href: "#about" },
                  { label: "Our Work", href: "#work" },
                  { label: "Get In Touch", href: "#contact" },
                ].map((l) => (
                  <MagneticButton
                    key={l.label}
                    as="a"
                    href={l.href}
                    className="cf-glass-pill px-6 py-3 rounded-full text-[var(--muted-foreground)] font-semibold text-xs md:text-sm hover:text-[var(--foreground)]"
                  >
                    {l.label}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-[var(--muted-foreground)] text-[10px] md:text-xs font-bold tracking-widest uppercase order-2 md:order-1">
              © {new Date().getFullYear()} DigiHack. Adzcept | DigiHack | Digital Tourism Hub
            </p>

            {/* Made-with badge */}
            <div className="cf-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default">
              <span className="text-[var(--muted-foreground)] text-[10px] md:text-xs font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-cf-heartbeat text-sm text-red-500">❤</span>
              <span className="text-[var(--muted-foreground)] text-[10px] md:text-xs font-bold uppercase tracking-widest">by</span>
              <div className="flex items-center gap-0 ml-1">
                <span className="text-[var(--background)] bg-white font-black text-xs px-1.5 py-0.5 rounded-l leading-none">DIGI</span>
                <span className="bg-[#18b2de] text-[var(--background)] font-black text-xs px-1.5 py-0.5 rounded-r leading-none">HACK</span>
              </div>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollTop}
              className="w-11 h-11 rounded-full cf-glass-pill flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] group order-3"
              aria-label="Back to top"
            >
              <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
