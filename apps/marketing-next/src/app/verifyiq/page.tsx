import type { Metadata } from "next";
import Hero from "@/components/verifyiq/Hero";
import Features from "@/components/verifyiq/Features";
import FinalCTA from "@/components/verifyiq/FinalCTA";

export const metadata: Metadata = {
  title: "VerifyIQ - Infrastructure Verification & Security Scanning",
  description: "Continuously scan your cloud infrastructure for security issues, cost waste, configuration drift, and compliance gaps.",
};

export default function VerifyIQPage() {
  return (
    <>
      <Hero />
      <Features />
      <FinalCTA />
    </>
  );
}
