"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Clients from "@/components/sections/Clients";
import WhyUs from "@/components/sections/WhyUs";
import CEO from "@/components/sections/CEO";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Process />
        <Work />
        <Clients />
        <WhyUs />
        <CEO />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
