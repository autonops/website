import type { Metadata } from "next";
import Hero from "@/components/secureiq/Hero";
import Features from "@/components/secureiq/Features";
import FinalCTA from "@/components/secureiq/FinalCTA";

export const metadata: Metadata = {
  title: "SecureIQ - Secret Discovery & Migration Planning",
  description: "Discover all secrets in your infrastructure without reading values. Map dependencies and generate migration checklists.",
};

export default function SecureIQPage() {
  return (
    <>
      <Hero />
      <Features />
      <FinalCTA />
    </>
  );
}
