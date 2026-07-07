import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ServicesTeaser from "@/components/sections/ServicesTeaser";
import WorkTeaser from "@/components/sections/WorkTeaser";
import Clients from "@/components/sections/Clients";
import Testimonials from "@/components/sections/Testimonials";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutTeaser />
      <ServicesTeaser />
      <WorkTeaser />
      <Clients />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
