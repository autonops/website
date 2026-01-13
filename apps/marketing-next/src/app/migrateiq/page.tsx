import type { Metadata } from "next";
import Hero from "@/components/migrateiq/Hero";
import PainPoints from "@/components/migrateiq/PainPoints";
import HowItWorks from "@/components/migrateiq/HowItWorks";
import ROICalculator from "@/components/migrateiq/ROICalculator";
import ProviderCards from "@/components/migrateiq/ProviderCards";
import OutputTabs from "@/components/migrateiq/OutputTabs";
import ComparisonTable from "@/components/migrateiq/ComparisonTable";
import RelatedTools from "@/components/migrateiq/RelatedTools";
import FinalCTA from "@/components/migrateiq/FinalCTA";

export const metadata: Metadata = {
  title: "MigrateIQ - Cloud Migration Made Easy | Heroku to AWS in Hours",
  description: "Migrate from Heroku to AWS, GCP, or Azure in hours, not months. MigrateIQ scans your infrastructure and generates production-ready Terraform.",
};

export default function MigrateIQPage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <HowItWorks />
      <ROICalculator />
      <ProviderCards />
      <OutputTabs />
      <ComparisonTable />
      <RelatedTools />
      <FinalCTA />
    </>
  );
}
