import { Layers } from "lucide-react";
import { ToolPage } from "@/components/tool-page";

export default function TesseraDashboardPage() {
  return (
    <ToolPage
      name="Tessera"
      description="Intelligent monolith to microservices transformation. AI-powered service boundary detection using LLMs with zero-data access database analysis."
      icon={<Layers className="w-8 h-8 text-violet-400" />}
      color="bg-violet-400"
      features={[
        "AI-powered service boundary detection using OpenAI, Anthropic, or AWS Bedrock",
        "Zero-data access database analysis (metadata only, never reads actual data)",
        "Multi-language support: Python, JavaScript, Ruby, Go, Java",
        "Domain-driven decomposition using DDD principles",
        "Heroku-optimized for migration + modernization in one step",
        "Confidence scoring on all boundary recommendations",
      ]}
      cliCommand="infraiq tessera analyze --source ./myapp --use-ai --sync"
      docsUrl="https://autonops.io/docs/tessera"
    />
  );
}
