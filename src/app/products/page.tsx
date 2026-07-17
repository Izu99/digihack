import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Our Products — DigiHack",
  description:
    "Explore DigiHack's product range — premium tiles and air conditioning solutions, backed by the same team that builds world-class digital experiences.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Our Products — DigiHack",
    description:
      "Explore DigiHack's product range — premium tiles and air conditioning solutions.",
    url: "/products",
  },
  twitter: {
    title: "Our Products — DigiHack",
    description:
      "Explore DigiHack's product range — premium tiles and air conditioning solutions.",
  },
};

const PRODUCTS = [
  {
    id: "tile",
    num: "01",
    name: "Tile",
    tagline: "Premium tiles for every space.",
    desc: "A curated range of floor and wall tiles for residential and commercial projects — quality finishes that bring your interiors and exteriors to life.",
    features: ["Floor Tiles", "Wall Tiles", "Indoor & Outdoor", "Residential & Commercial"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
      </svg>
    ),
  },
  {
    id: "ac",
    num: "02",
    name: "AC",
    tagline: "Cooling solutions that just work.",
    desc: "Air conditioning solutions for homes and businesses — supply, installation and after-sales support from a team you can rely on.",
    features: ["Home & Office Units", "Supply & Installation", "Maintenance & Support", "Trusted Brands"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        label="Our Products"
        title="Products We Offer"
        description="Beyond digital — a growing range of physical products, delivered with the same care and quality we bring to every project."
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="grid md:grid-cols-2 gap-6">
            {PRODUCTS.map((product) => (
              <article
                key={product.id}
                id={product.id}
                className="relative rounded-3xl p-10 overflow-hidden min-h-[340px] flex flex-col justify-between group border border-[#0E1A2B]/10 bg-gradient-to-br from-white via-[#F7FAFD] to-[#EAF0F6] hover:border-[#18b2de]/40 hover:shadow-[0_18px_40px_-18px_rgba(24,178,222,0.35)] transition-[border-color,box-shadow] duration-300 scroll-mt-28"
              >
                {/* Decorative circles */}
                <div className="absolute -right-16 -top-16 w-60 h-60 rounded-full bg-[#0E1A2B]/[0.03]" />
                <div className="absolute right-8 -bottom-10 w-32 h-32 rounded-full border border-dashed border-[#0E1A2B]/10" />

                <div className="relative">
                  <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B7A93] mb-5">
                    {product.num} / Product
                  </p>
                  <div className="w-14 h-14 rounded-2xl bg-[#18b2de]/10 text-[#18b2de] flex items-center justify-center mb-6 group-hover:bg-[#18b2de]/20 transition-colors duration-200">
                    {product.icon}
                  </div>
                  <h2 className="text-[32px] font-black tracking-tighter leading-[1.1] text-[#0E1A2B] mb-2">
                    {product.name}
                  </h2>
                  <p className="text-[#0B84A8] font-semibold text-[15px] mb-4">{product.tagline}</p>
                  <p className="text-[#54607A] text-[14.5px] leading-[1.7] mb-6 max-w-[420px]">
                    {product.desc}
                  </p>
                  <ul className="flex flex-wrap gap-2.5 mb-8">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="px-4 py-2 rounded-full border border-[#0E1A2B]/12 bg-[#F3F6FA] text-[13px] font-semibold text-[#0E1A2B]/80"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="relative inline-flex items-center gap-3 text-sm font-bold text-[#0E1A2B] border-t border-[#0E1A2B]/12 pt-5 self-start group-hover:gap-5 transition-all duration-200"
                >
                  Inquire Now
                  <span className="w-8 h-8 rounded-full bg-[#0E1A2B]/10 flex items-center justify-center">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0L9 4m4 4l-4 4" />
                    </svg>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
