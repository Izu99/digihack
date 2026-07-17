import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact — DigiHack",
  description:
    "Get in touch with DigiHack — call, WhatsApp or email us to start your next web, software or digital marketing project.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — DigiHack",
    description:
      "Get in touch with DigiHack — call, WhatsApp or email us to start your next web, software or digital marketing project.",
    url: "/contact",
  },
  twitter: {
    title: "Contact — DigiHack",
    description:
      "Get in touch with DigiHack — call, WhatsApp or email us to start your next web, software or digital marketing project.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Get In Touch"
        title="Let's Start a Conversation"
        description="Ready to take your brand to the next level? Reach out through whichever channel works best for you."
      />
      <Contact />
    </>
  );
}
