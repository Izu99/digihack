import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PracticesKinetic from "@/components/sections/PracticesKinetic";
import CapabilitiesRail from "@/components/sections/CapabilitiesRail";
import Process from "@/components/sections/Process";

export const metadata: Metadata = {
  title: "Services — DigiHack",
  description:
    "Full-service digital agency capabilities: web & software development, digital marketing, SEO, branding and content — plus our five-phase delivery process.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="Capabilities & Process"
        description="A combined product and marketing toolkit, delivered through a process built for velocity — from discovery to scale."
        kinetic
      />
      <PracticesKinetic />
      <CapabilitiesRail />
      <Process />
    </>
  );
}
