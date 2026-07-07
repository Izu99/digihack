"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { PRACTICES } from "@/components/sections/Services";
import KineticHeading from "@/components/ui/KineticHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function PracticesKinetic() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const splits: SplitText[] = [];
      const rows = gsap.utils.toArray<HTMLElement>(".practice-row");

      rows.forEach((row) => {
        const line = row.querySelector<HTMLElement>(".row-line");
        const num = row.querySelector<HTMLElement>(".row-num");
        const title = row.querySelector<HTMLElement>(".row-title");
        const desc = row.querySelector<HTMLElement>(".row-desc");
        const tags = row.querySelectorAll<HTMLElement>(".practice-tag");

        const st = {
          trigger: row,
          start: "top 78%",
          toggleActions: "play none none none",
        };

        if (line) {
          gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.inOut", scrollTrigger: st });
        }
        if (num) {
          gsap.fromTo(
            num,
            { yPercent: 45, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: st }
          );
        }
        if (title) {
          const s = new SplitText(title, { type: "words", mask: "words" });
          splits.push(s);
          gsap.from(s.words, {
            yPercent: 120,
            duration: 0.9,
            stagger: 0.07,
            delay: 0.1,
            ease: "power4.out",
            scrollTrigger: st,
          });
        }
        if (desc) {
          const s = new SplitText(desc, { type: "lines", mask: "lines" });
          splits.push(s);
          gsap.from(s.lines, {
            yPercent: 110,
            opacity: 0,
            duration: 0.7,
            stagger: 0.07,
            delay: 0.25,
            ease: "power3.out",
            scrollTrigger: st,
          });
        }
        if (tags.length) {
          gsap.from(tags, {
            y: 14,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: st,
          });
        }
      });

      return () => {
        splits.forEach((s) => s.revert());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-28 bg-white">
      <div className="max-w-[1180px] mx-auto px-7">
        <span className="label block mb-4">What We Do</span>
        <KineticHeading
          text="Two practices. One team."
          accentFrom={2}
          accentClassName="text-[#0B84A8]"
          className="text-[46px] md:text-[60px] font-black text-[#0E1A2B] leading-[1.03]"
        />
        <p className="text-[#54607A] mt-5 text-[15.5px] leading-[1.65] max-w-[560px]">
          We pair product engineering with growth marketing so your launch, scale and retention
          strategy live in the same room.
        </p>

        <div className="mt-20">
          {PRACTICES.map((p, i) => (
            <article
              key={p.num}
              className="practice-row group relative py-14 md:py-16 grid md:grid-cols-[230px_1fr] gap-6 md:gap-10 items-start"
            >
              {/* Divider that draws itself in */}
              <div className="row-line absolute top-0 left-0 h-px w-full bg-[#0E1A2B]/15 origin-left" />

              <span
                className="row-num font-mono font-black text-[88px] md:text-[128px] leading-none text-transparent select-none will-change-transform"
                style={{ WebkitTextStroke: "1.5px rgba(14,26,43,0.3)" }}
                aria-hidden="true"
              >
                {`0${i + 1}`}
              </span>

              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B7A93] mb-3">
                  {p.num}
                </p>
                <h3 className="row-title text-[34px] md:text-[44px] font-black tracking-tighter leading-[1.05] text-[#0E1A2B] mb-4 group-hover:text-[#0B84A8] transition-colors duration-300">
                  {p.title.replace("\n", " ")}
                </h3>
                <p className="row-desc text-[#54607A] text-[15px] leading-[1.7] max-w-[520px] mb-7">
                  {p.desc}
                </p>
                <ul className="flex flex-wrap gap-2.5">
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className="practice-tag px-4 py-2 rounded-full border border-[#0E1A2B]/12 bg-[#F3F6FA] text-[13px] font-semibold text-[#0E1A2B]/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
