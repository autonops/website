import { Rocket } from "lucide-react";
import { ToolPage } from "@/components/tool-page";

export default function MigrateDashboardPage() {
  return (
    <ToolPage
      name="MigrateIQ"
      description="Automate the entire cloud migration lifecycle. Scan, map, generate, and validate your path from Heroku to AWS, GCP, or Azure."
      icon={<Rocket className="w-8 h-8 text-emerald-400" />}
      color="bg-emerald-400"
      features={[
        "Scan existing infrastructure (Heroku, AWS, GCP, Azure)",
        "Intelligent service mapping to target cloud providers",
        "Generate production-ready Terraform configurations",
        "Validate migrations for security and compliance",
        "Zero-downtime migration strategies",
      ]}
      cliCommand="infraiq migrate scan heroku --app-name myapp --sync"
      docsUrl="https://autonops.io/docs/migrate"
    />
  );
}
