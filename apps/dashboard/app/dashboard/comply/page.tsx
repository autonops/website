import { ClipboardCheck } from "lucide-react";
import { ToolPage } from "@/components/tool-page";

export default function ComplyDashboardPage() {
  return (
    <ToolPage
      name="ComplyIQ"
      description="Continuous compliance automation. Monitor infrastructure for SOC2, ISO27001, and HIPAA compliance with automated evidence collection."
      icon={<ClipboardCheck className="w-8 h-8 text-cyan-400" />}
      color="bg-cyan-400"
      features={[
        "Monitor infrastructure for SOC2, ISO27001, HIPAA compliance",
        "Automated evidence collection for audits",
        "Organized S3 storage with metadata",
        "Export audit-ready evidence packages",
        "Generate remediation scripts for compliance gaps",
      ]}
      cliCommand="infraiq complyiq scan --provider aws --framework soc2 --sync"
      docsUrl="https://autonops.io/docs/comply"
    />
  );
}
