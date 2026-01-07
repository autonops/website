import { Database } from "lucide-react";
import { ToolPage } from "@/components/tool-page";

export default function DataIQDashboardPage() {
  return (
    <ToolPage
      name="DataIQ"
      description="Intelligent database migration with zero downtime. Self-healing migration engine with automatic retry, recovery, and multi-master replication support."
      icon={<Database className="w-8 h-8 text-rose-400" />}
      color="bg-rose-400"
      features={[
        "Self-healing migration engine with automatic retry and recovery",
        "Automated cutover with health checks and rollback capabilities",
        "Multi-master replication support for complex topologies",
        "Zero-downtime strategies: Blue-Green, Canary, Rolling",
        "Cross-engine migrations: PostgreSQL, MySQL, Oracle, MongoDB",
      ]}
      cliCommand="infraiq dataiq discover --source postgresql://db --sync"
      docsUrl="https://autonops.io/docs/dataiq"
    />
  );
}
