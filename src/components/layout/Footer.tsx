import Link from "next/link";

const PAGES = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Our Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  "Digital Marketing",
  "Social Media Management",
  "Brand Building",
  "Graphic Design",
  "Video Creation",
  "SEO & Content Management",
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0a1525] border-t border-white/[0.06]">
      {/* ── Details section ── */}
      <div className="max-w-[1180px] mx-auto px-7 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-0">
            <div className="flex items-center bg-white rounded-lg px-2 py-1.5">
              <span className="text-[#0E1A2B] font-black text-sm tracking-tight leading-none">DIGI</span>
              <span className="bg-[#18b2de] text-white font-black text-xs px-1.5 py-0.5 rounded ml-1 leading-none">HACK</span>
            </div>
          </Link>
          <p className="text-[#7A8FA6] text-[13px] leading-[1.7] mt-4 max-w-[260px]">
            Digital marketing & software studio crafting world-class growth strategies
            and digital products for ambitious brands.
          </p>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-white font-bold text-sm mb-4 tracking-wide uppercase">Pages</h3>
          <ul className="space-y-2.5">
            {PAGES.map((page) => (
              <li key={page.label}>
                <Link
                  href={page.href}
                  className="text-[#7A8FA6] hover:text-[#18b2de] transition-colors duration-200 text-[13.5px]"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-bold text-sm mb-4 tracking-wide uppercase">Services</h3>
          <ul className="space-y-2.5">
            {SERVICES.map((svc) => (
              <li key={svc}>
                <Link
                  href="/services"
                  className="text-[#7A8FA6] hover:text-[#18b2de] transition-colors duration-200 text-[13.5px]"
                >
                  {svc}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-sm mb-4 tracking-wide uppercase">Contact</h3>
          <ul className="space-y-2.5">
            <li>
              <a
                href="tel:+94760142500"
                className="text-[#7A8FA6] hover:text-[#18b2de] transition-colors duration-200 text-[13.5px] font-mono"
              >
                076 014 2500
              </a>
            </li>
            <li>
              <a
                href="mailto:digihacklk@gmail.com"
                className="text-[#7A8FA6] hover:text-[#18b2de] transition-colors duration-200 text-[13.5px] font-mono"
              >
                digihacklk@gmail.com
              </a>
            </li>
            <li>
              <span className="text-[#7A8FA6] text-[13.5px]">Sri Lanka & United States</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1180px] mx-auto px-7 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#7A8FA6] text-xs font-mono text-center">
            © {year} DigiHack. All rights reserved.
          </p>
          <p className="text-xs font-mono text-center">
            <span className="text-white/30">DigiHack</span>
            <span className="text-[#18b2de]/40 mx-1">|</span>
            <span className="text-white/30">Adzcept</span>
            <span className="text-[#18b2de]/40 mx-1">|</span>
            <span className="text-white/30">Digital Tourism Hub</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
