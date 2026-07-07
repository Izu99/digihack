import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollReveal from "@/components/ui/ScrollReveal";

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

export const metadata: Metadata = {
  title: "DigiHack — Epitom Beyond The Concept",
  description:
    "Full-service digital agency offering web development, software, digital marketing, SEO, branding, and more. Operating from Sri Lanka & the United States.",
  keywords: ["digital agency", "web development", "digital marketing", "SEO", "branding", "Sri Lanka"],
  openGraph: {
    title: "DigiHack — Epitom Beyond The Concept",
    description: "Full-service digital agency in Sri Lanka & US",
    type: "website",
  },
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
        <ScrollProgress />
        <ScrollReveal />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
