"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CARDS = [
  {
    label: "Call Us",
    value: "076 014 2500",
    sub: "Mon–Fri, 9am–6pm (SLT)",
    href: "tel:+94760142500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "076 014 2500",
    sub: "Quick responses guaranteed",
    href: "https://wa.me/94760142500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "digihacklk@gmail.com",
    sub: "We reply within 24 hours",
    href: "mailto:digihacklk@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Sri Lanka & United States",
    sub: "Global reach, local expertise",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

const inputClasses =
  "w-full rounded-xl border border-[#0E1A2B]/10 bg-white px-5 py-4 text-[14.5px] text-[#0E1A2B] placeholder:text-[#6B7A93]/70 outline-none focus:border-[#18b2de]/60 focus:ring-2 focus:ring-[#18b2de]/15 transition-all duration-200";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:digihacklk@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#0E1A2B]/8 bg-white p-6 md:p-8 shadow-[0_10px_30px_-22px_rgba(14,26,43,0.35)]"
    >
      <h3 className="text-[#0E1A2B] font-black text-[20px] mb-1">Send Us a Message</h3>
      <p className="text-[#6B7A93] text-[13px] mb-6">
        Tell us about your project — we reply within 24 hours.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          aria-label="Your Name"
          className={inputClasses}
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          aria-label="Your Email"
          className={inputClasses}
        />
      </div>
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message…"
        aria-label="Your Message"
        rows={5}
        className={`${inputClasses} resize-none mb-5`}
      />

      <button
        type="submit"
        className="inline-flex items-center gap-3 bg-[#18b2de] text-[#0E1A2B] font-black text-[15px] px-10 py-4 rounded-xl cursor-pointer hover:shadow-[0_16px_40px_-12px_rgba(24,178,222,0.6)] transition-shadow duration-200"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
        Send Message
      </button>
    </form>
  );
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-[#F3F6FA] relative overflow-hidden">
      <div data-speed="1.15" className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#18b2de]/[0.06] blur-3xl" />

      <div ref={ref} className="max-w-[1180px] mx-auto px-7 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="label block mb-4">Get In Touch</span>
          <h2 className="text-[52px] md:text-[64px] font-black tracking-tight text-[#0E1A2B] leading-[1.02]">
            Let&apos;s Build
            <br />
            <span className="text-[#0B84A8]">Something.</span>
          </h2>

          <p className="text-[#54607A] mt-5 text-[15.5px] leading-[1.65] max-w-[480px] mx-auto">
            Ready to take your brand to the next level? Let&apos;s talk about what we
            can build together.
          </p>
        </motion.div>

        {/* 2×2 contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
          {CARDS.map((card, i) => (
            <motion.a
              key={card.label}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
              className="group flex items-start gap-4 p-6 rounded-2xl border border-[#0E1A2B]/8 bg-white cursor-pointer hover:border-[#18b2de]/40 hover:bg-[#18b2de]/5 hover:shadow-[0_10px_30px_-18px_rgba(24,178,222,0.3)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#18b2de]/10 border border-[#18b2de]/20 flex items-center justify-center flex-shrink-0 text-[#18b2de] group-hover:bg-[#18b2de]/20 transition-colors duration-200">
                {card.icon}
              </div>
              <div>
                <p className="text-[#6B7A93] text-[10px] uppercase tracking-widest font-mono mb-1">{card.label}</p>
                <p className="text-[#0E1A2B] font-bold group-hover:text-[#0B84A8] transition-colors duration-200 text-[15px]">
                  {card.value}
                </p>
                <p className="text-[#6B7A93] text-xs mt-0.5">{card.sub}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Message form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="max-w-2xl mx-auto"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
