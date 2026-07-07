import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import About from "@/components/sections/About";
import WhyUs from "@/components/sections/WhyUs";
import CEO from "@/components/sections/CEO";

export const metadata: Metadata = {
  title: "About Us — DigiHack",
  description:
    "Meet DigiHack — a software & digital marketing studio operating from Sri Lanka & the United States, built on strategy-first thinking and long-term partnerships.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About Us"
        title="Meet DigiHack"
        description="A senior team of developers, designers, strategists and growth specialists — building world-class digital products for ambitious brands."
      />
      <About />
      <WhyUs />
      <CEO />
    </>
  );
}
