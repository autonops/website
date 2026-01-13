import type { Metadata } from "next";
import Hero from "@/components/dataiq/Hero";
import Features from "@/components/dataiq/Features";
import FinalCTA from "@/components/dataiq/FinalCTA";

export const metadata: Metadata = {
  title: "DataIQ - Zero Downtime Database Migrations",
  description: "Migrate databases with continuous replication, automatic health checks, and zero-downtime cutover. PostgreSQL, MySQL, Oracle, MongoDB.",
};

export default function DataIQPage() {
  return (
    <>
      <Hero />
      <Features />
      <FinalCTA />
    </>
  );
}
