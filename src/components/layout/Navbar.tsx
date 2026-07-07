"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const SCROLL_THRESHOLD = 80;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const ctaGlowRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mobileLinkWrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const hamburgerTl = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const menuOpenRef = useRef(false);

  // Shared so both the one-time setup effect and the route-change effect
  // below can move the sliding pill indicator without re-registering listeners.
  const placeIndicatorOnIndex = (i: number, instant = false) => {
    const el = linkRefs.current[i];
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!el || !nav || !indicator) return;
    const navBox = nav.getBoundingClientRect();
    const elBox = el.getBoundingClientRect();
    gsap.to(indicator, {
      x: elBox.left - navBox.left,
      width: elBox.width,
      opacity: 1,
      duration: instant || reducedRef.current ? 0 : 0.35,
      ease: "power3.out",
    });
  };

  // ── One-time setup: entrance, hover/magnetic listeners, scroll morph,
  //    mobile-menu timelines. Runs once on mount — NOT keyed on pathname,
  //    since Navbar persists across client-side route changes (it lives in
  //    the root layout) and re-running this would stack duplicate listeners
  //    on every navigation instead of replacing them.
  useGSAP(
    () => {
      reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const controller = new AbortController();
      const { signal } = controller;

      const items = [
        logoRef.current,
        ...linkRefs.current.filter(Boolean),
        ctaRef.current,
      ].filter(Boolean) as HTMLElement[];

      // ── 1. Entrance: stagger fade + blur-to-sharp ───────────────────────
      if (reducedRef.current) {
        gsap.set(items, { opacity: 1, y: 0, filter: "blur(0px)" });
      } else {
        gsap.fromTo(
          items,
          { opacity: 0, y: -20, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.06,
            ease: "power3.out",
            delay: 0.1,
          }
        );
      }

      const activeIndex = NAV_LINKS.findIndex((l) => l.href === pathname);
      if (activeIndex >= 0) {
        // Wait a tick so layout (fonts/entrance) has settled before measuring.
        requestAnimationFrame(() => placeIndicatorOnIndex(activeIndex, true));
      }

      // ── 3. Magnetic hover + sliding indicator ────────────────────────────
      linkRefs.current.forEach((el, i) => {
        if (!el) return;
        el.addEventListener("mouseenter", () => placeIndicatorOnIndex(i), { signal });
        el.addEventListener(
          "mousemove",
          (e: MouseEvent) => {
            if (reducedRef.current) return;
            const r = el.getBoundingClientRect();
            gsap.to(el, {
              x: (e.clientX - r.left - r.width / 2) * 0.3,
              y: (e.clientY - r.top - r.height / 2) * 0.3,
              duration: 0.3,
              ease: "power2.out",
            });
          },
          { signal }
        );
        el.addEventListener(
          "mouseleave",
          () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
          },
          { signal }
        );
      });

      navRef.current?.addEventListener(
        "mouseleave",
        () => {
          const current = NAV_LINKS.findIndex((l) => l.href === window.location.pathname);
          if (current >= 0) placeIndicatorOnIndex(current);
          else gsap.to(indicatorRef.current, { opacity: 0, duration: 0.25 });
        },
        { signal }
      );

      // ── 6. Logo hover: elastic rotate/scale ──────────────────────────────
      if (logoRef.current && !reducedRef.current) {
        const logo = logoRef.current;
        logo.addEventListener(
          "mouseenter",
          () => gsap.to(logo, { rotate: 8, scale: 1.08, duration: 0.5, ease: "elastic.out(1, 0.4)" }),
          { signal }
        );
        logo.addEventListener(
          "mouseleave",
          () => gsap.to(logo, { rotate: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" }),
          { signal }
        );
      }

      // ── 4. CTA hover: magnetic + scale + glow ─────────────────────────────
      if (ctaRef.current && !reducedRef.current) {
        const cta = ctaRef.current;
        cta.addEventListener(
          "mouseenter",
          () => {
            gsap.to(cta, { scale: 1.045, duration: 0.3, ease: "power2.out" });
            gsap.to(ctaGlowRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
          },
          { signal }
        );
        cta.addEventListener(
          "mousemove",
          (e: MouseEvent) => {
            const r = cta.getBoundingClientRect();
            gsap.to(cta, {
              x: (e.clientX - r.left - r.width / 2) * 0.15,
              y: (e.clientY - r.top - r.height / 2) * 0.25,
              duration: 0.3,
              ease: "power2.out",
            });
          },
          { signal }
        );
        cta.addEventListener(
          "mouseleave",
          () => {
            gsap.to(cta, { scale: 1, x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
            gsap.to(ctaGlowRef.current, { opacity: 0, duration: 0.35, ease: "power2.out" });
          },
          { signal }
        );
      }

      // ── 2. Scroll: pill morph + hide-on-down/reveal-on-up ────────────────
      let isMorphed = false;
      let isHidden = false;
      let lastY = window.scrollY;
      let ticking = false;

      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;

          const shouldMorph = y > SCROLL_THRESHOLD;
          if (shouldMorph !== isMorphed) {
            isMorphed = shouldMorph;
            gsap.to(glassRef.current, {
              opacity: shouldMorph ? 1 : 0,
              duration: reducedRef.current ? 0 : 0.4,
              ease: "power2.out",
            });
            gsap.to(pillRef.current, {
              scale: shouldMorph ? 0.96 : 1,
              duration: reducedRef.current ? 0 : 0.4,
              ease: "power3.out",
            });
          }

          if (!menuOpenRef.current) {
            const shouldHide = y > lastY && y > SCROLL_THRESHOLD;
            if (shouldHide !== isHidden) {
              isHidden = shouldHide;
              gsap.to(headerRef.current, {
                y: shouldHide ? "-120%" : "0%",
                duration: reducedRef.current ? 0 : 0.45,
                ease: "power3.out",
              });
            }
          }

          lastY = y;
          ticking = false;
        });
      };

      window.addEventListener("scroll", onScroll, { passive: true, signal });

      // ── 5. Mobile menu + hamburger→X morph (built paused, toggled on click) ─
      const bars = barRefs.current.filter(Boolean) as HTMLElement[];
      const mobileWraps = mobileLinkWrapRefs.current.filter(Boolean) as HTMLElement[];

      const htl = gsap.timeline({ paused: true });
      htl
        .to(bars[0], { rotate: 45, y: 6, duration: 0.3, ease: "power2.inOut" }, 0)
        .to(bars[1], { opacity: 0, duration: 0.2 }, 0)
        .to(bars[2], { rotate: -45, y: -6, duration: 0.3, ease: "power2.inOut" }, 0);
      hamburgerTl.current = htl;

      const mtl = gsap.timeline({ paused: true });
      mtl
        .set(overlayRef.current, { display: "flex" })
        .fromTo(
          overlayRef.current,
          { scaleY: 0, opacity: 0.4 },
          { scaleY: 1, opacity: 1, duration: reducedRef.current ? 0 : 0.5, ease: "power3.out" },
          0
        )
        .fromTo(
          mobileWraps.map((w) => w.firstElementChild),
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: reducedRef.current ? 0 : 0.55,
            stagger: reducedRef.current ? 0 : 0.07,
            ease: "power3.out",
          },
          reducedRef.current ? 0 : 0.15
        )
        .eventCallback("onReverseComplete", () => {
          gsap.set(overlayRef.current, { display: "none" });
        });
      menuTl.current = mtl;

      return () => {
        controller.abort();
        htl.kill();
        mtl.kill();
      };
    },
    { scope: headerRef }
  );

  // ── Reposition the pill indicator when the route changes client-side ─────
  useGSAP(
    () => {
      const i = NAV_LINKS.findIndex((l) => l.href === pathname);
      if (i >= 0) placeIndicatorOnIndex(i);
    },
    { scope: headerRef, dependencies: [pathname] }
  );

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    menuOpenRef.current = next;
    if (next) {
      menuTl.current?.play();
      hamburgerTl.current?.play();
      document.body.style.overflow = "hidden";
    } else {
      menuTl.current?.reverse();
      hamburgerTl.current?.reverse();
      document.body.style.overflow = "";
    }
  };

  const closeMenu = () => {
    if (!menuOpenRef.current) return;
    setMenuOpen(false);
    menuOpenRef.current = false;
    menuTl.current?.reverse();
    hamburgerTl.current?.reverse();
    document.body.style.overflow = "";
  };

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 py-5">
        <div ref={pillRef} className="relative max-w-[1180px] mx-auto px-7">
          <div
            ref={glassRef}
            className="absolute inset-0 -mx-3 rounded-full bg-[#0E1A2B]/95 border border-white/8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] opacity-0"
            style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          />

          <div className="relative flex items-center justify-between gap-6 py-2">
            {/* Logo */}
            <Link ref={logoRef} href="/" className="flex items-center gap-2 flex-shrink-0 will-change-transform">
              <div className="flex items-center gap-0 bg-white rounded-lg px-2 py-1.5">
                <span className="text-[#0E1A2B] font-black text-sm tracking-tight leading-none">
                  DIGI
                </span>
                <span className="bg-[#18b2de] text-white font-black text-xs px-1.5 py-0.5 rounded ml-1 leading-none">
                  HACK
                </span>
              </div>
            </Link>

            {/* Desktop nav with sliding pill indicator */}
            <nav ref={navRef} className="hidden md:flex items-center gap-1 relative">
              <div
                ref={indicatorRef}
                className="absolute top-0 left-0 h-full rounded-full bg-white/8 opacity-0 pointer-events-none"
                style={{ width: 0 }}
              />
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.label}
                  ref={(el) => { linkRefs.current[i] = el; }}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors duration-200 cursor-pointer will-change-transform"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+94717586847"
                className="hidden lg:flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold cursor-pointer transition-colors duration-200"
              >
                <span className="w-6 h-6 rounded-full bg-[#18b2de] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-white">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z" />
                  </svg>
                </span>
                071 758 6847
              </a>

              <Link
                ref={ctaRef}
                href="/contact"
                className="relative inline-flex items-center gap-2 bg-[#18b2de] text-[#0E1A2B] font-bold px-5 py-2.5 rounded-lg text-sm cursor-pointer will-change-transform"
              >
                <span
                  ref={ctaGlowRef}
                  className="absolute -inset-2 -z-10 rounded-xl bg-[#18b2de] blur-lg opacity-0"
                  aria-hidden="true"
                />
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4" />
                </svg>
                Start a Project
              </Link>
            </div>

            {/* Mobile hamburger → X */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative z-[60] flex flex-col gap-1.5 p-1 cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span ref={(el) => { barRefs.current[0] = el; }} className="block w-5 h-0.5 bg-white rounded origin-center" />
              <span ref={(el) => { barRefs.current[1] = el; }} className="block w-5 h-0.5 bg-white rounded" />
              <span ref={(el) => { barRefs.current[2] = el; }} className="block w-5 h-0.5 bg-white rounded origin-center" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 hidden flex-col justify-center px-9 bg-[#0E1A2B] md:hidden"
        style={{ transformOrigin: "top", opacity: 0 }}
      >
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <div
              key={link.label}
              ref={(el) => { mobileLinkWrapRefs.current[i] = el; }}
              className="overflow-hidden"
            >
              <Link
                href={link.href}
                onClick={closeMenu}
                className="block text-4xl font-black text-white hover:text-[#18b2de] transition-colors duration-200 cursor-pointer py-2"
              >
                {link.label}
              </Link>
            </div>
          ))}
          <div
            ref={(el) => { mobileLinkWrapRefs.current[NAV_LINKS.length] = el; }}
            className="overflow-hidden mt-4"
          >
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block px-6 py-3 rounded-lg bg-[#18b2de] text-[#0E1A2B] font-bold text-center cursor-pointer"
            >
              Start a Project
            </Link>
          </div>
        </nav>
        <div
          ref={(el) => { mobileLinkWrapRefs.current[NAV_LINKS.length + 1] = el; }}
          className="overflow-hidden absolute bottom-10 left-9 space-y-1"
        >
          <div>
            <p className="text-[#7A8FA6] text-xs font-mono">digihacklk@gmail.com</p>
            <p className="text-[#7A8FA6] text-xs font-mono">071 758 6847</p>
          </div>
        </div>
      </div>
    </>
  );
}
