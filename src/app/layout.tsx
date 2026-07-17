import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SmoothScroll from "@/components/ui/SmoothScroll";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://digihack-ten.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "DigiHack — Epitom Beyond The Concept",
  description:
    "Full-service digital agency offering web development, software, digital marketing, SEO, branding, and more. Operating from Sri Lanka & the United States.",
  keywords: ["digital agency", "web development", "digital marketing", "SEO", "branding", "Sri Lanka"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DigiHack — Epitom Beyond The Concept",
    description: "Full-service digital agency in Sri Lanka & US",
    url: "/",
    siteName: "DigiHack",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiHack — Epitom Beyond The Concept",
    description: "Full-service digital agency in Sri Lanka & US",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DigiHack",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "Full-service digital agency offering web development, software, digital marketing, SEO, branding, and more. Operating from Sri Lanka & the United States.",
  email: "digihacklk@gmail.com",
  telephone: "+94760142500",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DigiHack",
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
      style={{ colorScheme: "light" }}
    >
      <body className="bg-white text-[#0E1A2B] antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ScrollProgress />
        <ScrollReveal />
        <Navbar />
        <SmoothScroll>
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
