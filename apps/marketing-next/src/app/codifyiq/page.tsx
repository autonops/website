import type { Metadata } from "next";
import Hero from "@/components/codifyiq/Hero";
import HowItWorks from "@/components/codifyiq/HowItWorks";
import FinalCTA from "@/components/codifyiq/FinalCTA";

export const metadata: Metadata = {
  title: "CodifyIQ - Convert Cloud Infrastructure to Terraform",
  description: "Transform manually-created cloud resources into production-ready Terraform. ClickOps to GitOps without disruption.",
};

export default function CodifyIQPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FinalCTA />
    </>
  );
}
