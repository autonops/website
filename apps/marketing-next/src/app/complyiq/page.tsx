import type { Metadata } from "next";
import Hero from "@/components/complyiq/Hero";
import PainPoints from "@/components/complyiq/PainPoints";
import HowItWorks from "@/components/complyiq/HowItWorks";
import ROICalculator from "@/components/complyiq/ROICalculator";
import FrameworkCards from "@/components/complyiq/FrameworkCards";
import OutputTabs from "@/components/complyiq/OutputTabs";
import ComparisonTable from "@/components/complyiq/ComparisonTable";
import IntegrationLogos from "@/components/complyiq/IntegrationLogos";
import RelatedTools from "@/components/complyiq/RelatedTools";
import FinalCTA from "@/components/complyiq/FinalCTA";

export const metadata: Metadata = {
  title: "ComplyIQ - Automated SOC2, ISO27001 & HIPAA Compliance",
  description: "Stop scrambling before audits. ComplyIQ automates evidence collection for SOC2, ISO27001, and HIPAA.",
};

export default function ComplyIQPage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <HowItWorks />
      <ROICalculator />
      <FrameworkCards />
      <OutputTabs />
      <ComparisonTable />
      <IntegrationLogos />
      <RelatedTools />
      <FinalCTA />
    </>
  );
}
