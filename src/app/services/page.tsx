import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Services from "@/components/sections/Services";
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
      />
      <Services />
      <Process />
    </>
  );
}
