import type { Metadata } from "next";
import Hero from "@/components/tessera/Hero";
import Features from "@/components/tessera/Features";
import FinalCTA from "@/components/tessera/FinalCTA";

export const metadata: Metadata = {
  title: "Tessera - AI-Powered Monolith to Microservices",
  description: "Use AI to analyze your codebase and intelligently decompose your monolith into microservices. Domain-driven design meets LLM intelligence.",
};

export default function TesseraPage() {
  return (
    <>
      <Hero />
      <Features />
      <FinalCTA />
    </>
  );
}
