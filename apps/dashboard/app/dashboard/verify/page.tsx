import { Shield } from "lucide-react";
import { ToolPage } from "@/components/tool-page";

export default function VerifyDashboardPage() {
  return (
    <ToolPage
      name="VerifyIQ"
      description="Infrastructure verification and validation. Scan cloud infrastructure for security issues, validate Terraform configurations, and detect configuration drift."
      icon={<Shield className="w-8 h-8 text-blue-400" />}
      color="bg-blue-400"
      features={[
        "Scan existing cloud infrastructure for security vulnerabilities",
        "Validate Terraform configurations against best practices",
        "Detect configuration drift between code and reality",
        "Analyze cost optimization opportunities",
        "Generate compliance gap reports",
      ]}
      cliCommand="infraiq verify scan --provider aws --sync"
      docsUrl="https://autonops.io/docs/verify"
    />
  );
}
