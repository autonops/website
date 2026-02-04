import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// Import all MDX files statically
import Installation from "@/content/docs/getting-started/installation.mdx";
import Quickstart from "@/content/docs/getting-started/quickstart.mdx";
import Configuration from "@/content/docs/getting-started/configuration.mdx";
import ToolsOverview from "@/content/docs/tools/overview.mdx";
import MigrateIQ from "@/content/docs/tools/migrateiq.mdx";
import VerifyIQ from "@/content/docs/tools/verifyiq.mdx";
import CodifyIQ from "@/content/docs/tools/codifyiq.mdx";
import ComplyIQ from "@/content/docs/tools/complyiq.mdx";
import DataIQ from "@/content/docs/tools/dataiq.mdx";
import SecureIQ from "@/content/docs/tools/secureiq.mdx";
import Tessera from "@/content/docs/tools/tessera.mdx";
import HerokuToAws from "@/content/docs/guides/heroku-to-aws.mdx";
import Soc2Compliance from "@/content/docs/guides/soc2-compliance.mdx";
import MonolithDecomposition from "@/content/docs/guides/monolith-decomposition.mdx";
import CliReference from "@/content/docs/api/cli.mdx";
import PythonApi from "@/content/docs/api/python.mdx";
import Changelog from "@/content/docs/about/changelog.mdx";
import Contributing from "@/content/docs/about/contributing.mdx";
import License from "@/content/docs/about/license.mdx";

// Docs home page component
function DocsHomePage() {
  const tools = [
    { emoji: "🚀", name: "MigrateIQ", desc: "Automated cloud migration from Heroku, AWS, GCP, or Azure.", href: "/docs/tools/migrateiq" },
    { emoji: "🔍", name: "VerifyIQ", desc: "Infrastructure verification, security scanning, and drift detection.", href: "/docs/tools/verifyiq" },
    { emoji: "📝", name: "CodifyIQ", desc: "Transform existing infrastructure into Infrastructure as Code.", href: "/docs/tools/codifyiq" },
    { emoji: "🔒", name: "ComplyIQ", desc: "Continuous compliance automation for SOC2, ISO27001, HIPAA.", href: "/docs/tools/complyiq" },
    { emoji: "💾", name: "DataIQ", desc: "Zero-downtime database migrations with self-healing.", href: "/docs/tools/dataiq" },
    { emoji: "🔑", name: "SecureIQ", desc: "Secret discovery and management for migrations.", href: "/docs/tools/secureiq" },
    { emoji: "🎭", name: "Tessera", desc: "AI-powered monolith to microservices transformation.", href: "/docs/tools/tessera" },
  ];

  const roiData = [
    { scenario: "Heroku → AWS migration", manual: "2-3 months", withInfraIQ: "1 week", savings: "92%" },
    { scenario: "Security audit (100 resources)", manual: "1 week", withInfraIQ: "2 hours", savings: "95%" },
    { scenario: "Codify 100 AWS resources", manual: "2 weeks", withInfraIQ: "2 hours", savings: "99%" },
    { scenario: "SOC2 evidence collection", manual: "2 weeks", withInfraIQ: "2 hours", savings: "95%" },
    { scenario: "Database migration (100GB)", manual: "2-3 days", withInfraIQ: "2-4 hours", savings: "95%" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Welcome to InfraIQ</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">Migration as a Service</strong> — Migrate from Heroku to AWS in hours, not months.
        </p>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-8">
        InfraIQ is a comprehensive DevOps automation platform that transforms weeks of manual infrastructure work into automated processes completed in minutes.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {tools.map((tool) => (
          <Link key={tool.name} href={tool.href}
            className="group p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{tool.emoji}</span>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">{tool.name}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tool.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Quick Start</h2>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">Install InfraIQ with a single command:</p>

      <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-4 mb-4 overflow-x-auto border border-gray-800">
        <code>curl -sSL https://install.autonops.io | bash</code>
      </pre>

      <p className="text-gray-600 dark:text-gray-300 mb-4">Verify the installation:</p>

      <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-4 mb-8 overflow-x-auto border border-gray-800">
        <code>{`infraiq --version
infraiq doctor
infraiq info`}</code>
      </pre>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Why InfraIQ?</h2>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Battle-Tested Patterns</h3>

      <p className="text-gray-600 dark:text-gray-300 mb-4">Built from real-world experience:</p>

      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600 dark:text-gray-300 ml-4">
        <li><strong className="text-gray-900 dark:text-white">Spotify</strong> — Scaled podcast platform to 1.1B monthly downloads</li>
        <li><strong className="text-gray-900 dark:text-white">Capital One</strong> — First fully cloud-based bank</li>
        <li><strong className="text-gray-900 dark:text-white">Point Digital Finance</strong> — $4B fintech Heroku → AWS migration</li>
        <li><strong className="text-gray-900 dark:text-white">NSA</strong> — DoD compliance and security requirements</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Real ROI</h3>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Scenario</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Manual</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">With InfraIQ</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Savings</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {roiData.map((row) => (
              <tr key={row.scenario} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{row.scenario}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{row.manual}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{row.withInfraIQ}</td>
                <td className="px-4 py-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{row.savings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/50 dark:to-emerald-950/50 border border-blue-200 dark:border-blue-500/20 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Beta Access</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">InfraIQ is currently in beta through Q1 2026.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/start/" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">Join the Beta</Link>
          <a href="https://github.com/autonops" target="_blank" rel="noopener noreferrer"
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            View on GitHub
          </a>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Get Help</h2>

      <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
        <li><strong className="text-gray-900 dark:text-white">Documentation</strong>: You&apos;re here!</li>
        <li>
          <strong className="text-gray-900 dark:text-white">Email</strong>:{" "}
          <a href="mailto:jason@autonops.io" className="text-blue-600 dark:text-blue-400 hover:underline">jason@autonops.io</a>
          {" "}— Report bugs, request features, or ask questions
        </li>
      </ul>
    </div>
  );
}

// Map of all docs
const docs: Record<string, { component: React.ComponentType; title: string; description: string }> = {
  // Getting Started
  "getting-started/installation": {
    component: Installation,
    title: "Installation",
    description: "How to install InfraIQ via Docker, binary download, or install script.",
  },
  "getting-started/quickstart": {
    component: Quickstart,
    title: "Quick Start",
    description: "Get up and running with InfraIQ in 5 minutes.",
  },
  "getting-started/configuration": {
    component: Configuration,
    title: "Configuration",
    description: "Configure InfraIQ through environment variables, config files, or CLI options.",
  },
  
  // Tools
  "tools": {
    component: ToolsOverview,
    title: "Tools Overview",
    description: "Overview of all seven InfraIQ tools and how they work together.",
  },
  "tools/overview": {
    component: ToolsOverview,
    title: "Tools Overview",
    description: "Overview of all seven InfraIQ tools and how they work together.",
  },
  "tools/migrateiq": {
    component: MigrateIQ,
    title: "MigrateIQ",
    description: "Automated cloud-to-cloud migration from Heroku, AWS, GCP, or Azure.",
  },
  "tools/verifyiq": {
    component: VerifyIQ,
    title: "VerifyIQ",
    description: "Infrastructure verification, security scanning, and drift detection.",
  },
  "tools/codifyiq": {
    component: CodifyIQ,
    title: "CodifyIQ",
    description: "Transform existing infrastructure into Infrastructure as Code.",
  },
  "tools/complyiq": {
    component: ComplyIQ,
    title: "ComplyIQ",
    description: "Continuous compliance automation for SOC2, ISO27001, HIPAA.",
  },
  "tools/dataiq": {
    component: DataIQ,
    title: "DataIQ",
    description: "Zero-downtime database migrations with self-healing.",
  },
  "tools/secureiq": {
    component: SecureIQ,
    title: "SecureIQ",
    description: "Secret discovery and management for migrations.",
  },
  "tools/tessera": {
    component: Tessera,
    title: "Tessera",
    description: "AI-powered monolith to microservices transformation.",
  },
  
  // Guides
  "guides/heroku-to-aws": {
    component: HerokuToAws,
    title: "Heroku to AWS Migration Guide",
    description: "Complete walkthrough for migrating from Heroku to AWS.",
  },
  "guides/soc2-compliance": {
    component: Soc2Compliance,
    title: "SOC2 Compliance Guide",
    description: "Automate SOC2 evidence collection with ComplyIQ.",
  },
  "guides/monolith-decomposition": {
    component: MonolithDecomposition,
    title: "Monolith Decomposition Guide",
    description: "Transform your monolith into microservices with Tessera.",
  },
  
  // API
  "api/cli": {
    component: CliReference,
    title: "CLI Reference",
    description: "Complete command-line reference for InfraIQ.",
  },
  "api/python": {
    component: PythonApi,
    title: "Python API",
    description: "Use InfraIQ programmatically in your Python applications.",
  },
  
  // About
  "about/changelog": {
    component: Changelog,
    title: "Changelog",
    description: "All notable changes to InfraIQ.",
  },
  "about/contributing": {
    component: Contributing,
    title: "Contributing",
    description: "How to contribute to InfraIQ.",
  },
  "about/license": {
    component: License,
    title: "License",
    description: "InfraIQ license information.",
  },
};

export async function generateStaticParams() {
  const paths = Object.keys(docs).map((slug) => ({
    slug: slug.split("/"),
  }));
  // Add empty slug for root /docs page
  paths.push({ slug: [] });
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  const slug = params.slug?.join("/") || "";
  
  // Root docs page
  if (!slug) {
    return {
      title: "Documentation | InfraIQ",
      description: "InfraIQ documentation - Migration as a Service. Migrate from Heroku to AWS in hours, not months.",
    };
  }

  const doc = docs[slug];
  if (!doc) {
    return { title: "Not Found" };
  }

  return {
    title: `${doc.title} | InfraIQ Docs`,
    description: doc.description,
  };
}

export default function DocPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join("/") || "";

  // Root docs page
  if (!slug) {
    return <DocsHomePage />;
  }

  const doc = docs[slug];
  if (!doc) {
    notFound();
  }

  const Content = doc.component;
  return <Content />;
}
