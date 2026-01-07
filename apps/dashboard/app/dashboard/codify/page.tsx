import { FileCode } from "lucide-react";
import { ToolPage } from "@/components/tool-page";

export default function CodifyDashboardPage() {
  return (
    <ToolPage
      name="CodifyIQ"
      description="Transform existing cloud infrastructure into Infrastructure as Code. Convert ClickOps to GitOps without disruption."
      icon={<FileCode className="w-8 h-8 text-orange-400" />}
      color="bg-orange-400"
      features={[
        "Discover manually-created cloud resources",
        "Analyze dependencies between resources",
        "Generate Terraform configurations with import scripts",
        "Enable incremental IaC adoption without disruption",
        "Support for AWS, GCP, and Azure resources",
      ]}
      cliCommand="infraiq codify scan aws --region us-east-1 --sync"
      docsUrl="https://autonops.io/docs/codify"
    />
  );
}
