"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValue, useSpring } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const MotionLink = motion(Link);

function MagneticCTA({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <MotionLink
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="inline-flex items-center gap-2 bg-[#18b2de] text-[#0E1A2B] font-bold px-5 py-2.5 rounded-lg text-sm cursor-pointer transition-shadow duration-200 hover:shadow-[0_8px_24px_-8px_rgba(24,178,222,0.6)]"
    >
      {children}
    </MotionLink>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 60)), [scrollY]);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0E1A2B]/95 backdrop-blur-xl border-b border-white/8 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1180px] mx-auto px-7 flex items-center justify-between gap-6">
          {/* Logo — matches HTML style: white box with "PRIME" + cyan badge "ONE" */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-0 bg-white rounded-lg px-2 py-1.5">
              <span className="text-[#0E1A2B] font-black text-sm tracking-tight leading-none">
                DIGI
              </span>
              <span className="bg-[#18b2de] text-white font-black text-xs px-1.5 py-0.5 rounded ml-1 leading-none">
                HACK
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-white/80 hover:text-white hover:text-[#18b2de] transition-colors duration-200 cursor-pointer"
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
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z"/>
                </svg>
              </span>
              071 758 6847
            </a>
            <MagneticCTA href="/contact">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4" />
              </svg>
              Start a Project
            </MagneticCTA>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-white rounded origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-0.5 bg-white rounded" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-white rounded origin-center" />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={menuOpen ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 z-40 w-72 bg-[#15233A] border-l border-white/10 flex flex-col p-8 pt-24 md:hidden"
      >
        <nav className="flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-black text-white hover:text-[#18b2de] transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-6 py-3 rounded-lg bg-[#18b2de] text-[#0E1A2B] font-bold text-center cursor-pointer"
          >
            Start a Project
          </Link>
        </nav>
        <div className="mt-auto space-y-1">
          <p className="text-[#7A8FA6] text-xs font-mono">digihacklk@gmail.com</p>
          <p className="text-[#7A8FA6] text-xs font-mono">071 758 6847</p>
        </div>
      </motion.div>

      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
