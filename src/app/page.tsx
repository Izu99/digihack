import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ServicesTeaser from "@/components/sections/ServicesTeaser";
import HowWeWorkTeaser from "@/components/sections/HowWeWorkTeaser";
import TechStack from "@/components/sections/TechStack";
import WorkTeaser from "@/components/sections/WorkTeaser";
import Clients from "@/components/sections/Clients";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Stats />
      <AboutTeaser />
      <ServicesTeaser />
      <HowWeWorkTeaser />
      <TechStack />
      <WorkTeaser />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  );
}
