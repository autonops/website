import { KeyRound } from "lucide-react";
import { ToolPage } from "@/components/tool-page";

export default function SecureIQDashboardPage() {
  return (
    <ToolPage
      name="SecureIQ"
      description="Secret discovery and management for migrations. Discover, classify, and map secrets without ever reading their values."
      icon={<KeyRound className="w-8 h-8 text-amber-400" />}
      color="bg-amber-400"
      features={[
        "Discover all secrets without reading actual values",
        "Classify secrets by type and criticality level",
        "Map dependencies between secrets and services",
        "Generate migration checklists with manual steps",
        "Validate compliance requirements (SOC2, HIPAA, PCI-DSS)",
      ]}
      cliCommand="infraiq secureiq scan --provider heroku --sync"
      docsUrl="https://autonops.io/docs/secureiq"
    />
  );
}
