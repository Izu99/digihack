import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0a1525] border-t border-white/[0.06]">
      <div className="max-w-[1180px] mx-auto px-7 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0">
          <div className="flex items-center bg-white rounded-lg px-2 py-1.5">
            <span className="text-[#0E1A2B] font-black text-sm tracking-tight leading-none">DIGI</span>
            <span className="bg-[#18b2de] text-white font-black text-xs px-1.5 py-0.5 rounded ml-1 leading-none">HACK</span>
          </div>
        </Link>

        <p className="text-[#7A8FA6] text-xs font-mono text-center">
          © {year} DigiHack. All rights reserved.{" "}
          <span className="text-white/30">Adzcept</span>
          <span className="text-[#18b2de]/40 mx-1">|</span>
          <span className="text-white/30">DigiHack</span>
          <span className="text-[#18b2de]/40 mx-1">|</span>
          <span className="text-white/30">Digital Tourism Hub</span>
        </p>

        <a
          href="mailto:digihacklk@gmail.com"
          className="text-[#7A8FA6] hover:text-[#18b2de] transition-colors duration-200 text-xs font-mono"
        >
          digihacklk@gmail.com
        </a>
      </div>
    </footer>
  );
}
