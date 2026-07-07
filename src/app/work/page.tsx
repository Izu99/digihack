import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Work from "@/components/sections/Work";

export const metadata: Metadata = {
  title: "Our Work — DigiHack",
  description:
    "Client case studies from DigiHack — e-commerce, LMS platforms, social growth and brand campaigns across Sri Lanka, Australia and the US.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        label="Our Work"
        title="Selected Case Studies"
        description="Brands we've helped build, grow and dominate their markets — from Sri Lanka to Australia."
      />
      <Work />
    </>
  );
}
