import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products - InfraIQ DevOps Automation Platform",
  description: "Seven integrated tools for cloud migration, infrastructure verification, compliance automation, and more. Explore the complete InfraIQ platform.",
};

const tools = [
  { 
    emoji: "🚀", 
    name: "MigrateIQ", 
    tagline: "Cloud Migration",
    status: "Production Ready",
    desc: "Migrate from Heroku, AWS, GCP, or Azure in hours, not months. Automatic resource discovery, intelligent mapping, and production-ready Terraform generation.", 
    href: "/migrateiq/",
    docsHref: "/docs/tools/migrateiq",
    features: ["Zero-downtime migrations", "Automatic rollback", "Multi-cloud support"],
    color: "blue"
  },
  { 
    emoji: "🔍", 
    name: "VerifyIQ", 
    tagline: "Infrastructure Verification",
    status: "Production Ready",
    desc: "Continuous scanning for security issues, cost optimization opportunities, configuration drift, and compliance gaps. Know your infrastructure before it breaks.", 
    href: "/verifyiq/",
    docsHref: "/docs/tools/verifyiq",
    features: ["Security scanning", "Cost optimization", "Drift detection"],
    color: "amber"
  },
  { 
    emoji: "📝", 
    name: "CodifyIQ", 
    tagline: "Infrastructure as Code",
    status: "Production Ready",
    desc: "Transform manually-created cloud resources into production-ready Terraform. ClickOps to GitOps without disrupting running infrastructure.", 
    href: "/codifyiq/",
    docsHref: "/docs/tools/codifyiq",
    features: ["Auto-generate Terraform", "Import scripts", "Dependency mapping"],
    color: "violet"
  },
  { 
    emoji: "🔒", 
    name: "ComplyIQ", 
    tagline: "Compliance Automation",
    status: "Production Ready",
    desc: "Automated evidence collection for SOC2, ISO27001, and HIPAA. What used to take your team 2 weeks now takes 2 hours.", 
    href: "/complyiq/",
    docsHref: "/docs/tools/complyiq",
    features: ["SOC2 automation", "Evidence collection", "Audit-ready exports"],
    color: "emerald"
  },
  { 
    emoji: "🗄️", 
    name: "DataIQ", 
    tagline: "Database Migration",
    status: "Production Ready",
    desc: "Zero-downtime database migrations with continuous replication, automatic health checks, and instant rollback. PostgreSQL, MySQL, Oracle, MongoDB.", 
    href: "/dataiq/",
    docsHref: "/docs/tools/dataiq",
    features: ["Zero-downtime cutover", "Self-healing replication", "Cross-engine support"],
    color: "cyan"
  },
  { 
    emoji: "🔑", 
    name: "SecureIQ", 
    tagline: "Secret Management",
    status: "Production Ready",
    desc: "Discover all secrets in your infrastructure without reading values. Map dependencies, generate migration checklists, and validate compliance.", 
    href: "/secureiq/",
    docsHref: "/docs/tools/secureiq",
    features: ["Secret discovery", "Dependency mapping", "Rotation tracking"],
    color: "rose"
  },
  { 
    emoji: "🎭", 
    name: "Tessera", 
    tagline: "Monolith Decomposition",
    status: "Production Ready",
    desc: "AI-powered analysis to identify microservice boundaries in your codebase. Domain-driven design principles meet LLM intelligence.", 
    href: "/tessera/",
    docsHref: "/docs/tools/tessera",
    features: ["AI boundary detection", "DDD analysis", "Service scaffolding"],
    color: "fuchsia"
  },
];

const platformCapabilities = [
  {
    title: "Unified Knowledge Graph",
    description: "All tools share a single source of truth about your infrastructure. Scan once, use everywhere.",
    icon: "🔗",
  },
  {
    title: "Production-Ready Output",
    description: "Every generated artifact—Terraform, Kubernetes manifests, CI/CD pipelines—is ready for production use.",
    icon: "✅",
  },
  {
    title: "Enterprise Security",
    description: "SOC2-compliant architecture. Your credentials never leave your machine. Zero-trust by design.",
    icon: "🛡️",
  },
  {
    title: "Multi-Cloud Native",
    description: "First-class support for AWS, GCP, Azure, and Heroku. Migrate between any of them seamlessly.",
    icon: "☁️",
  },
];

const useCases = [
  {
    title: "Heroku to AWS Migration",
    description: "Complete platform migration with zero downtime. MigrateIQ handles infrastructure, DataIQ migrates your database, SecureIQ ensures secrets are properly transferred.",
    tools: ["MigrateIQ", "DataIQ", "SecureIQ"],
    guideHref: "/docs/guides/heroku-to-aws",
  },
  {
    title: "SOC2 Compliance",
    description: "Prepare for your first SOC2 audit in days, not months. VerifyIQ identifies gaps, ComplyIQ collects evidence, and SecureIQ validates secret management.",
    tools: ["VerifyIQ", "ComplyIQ", "SecureIQ"],
    guideHref: "/docs/guides/soc2-compliance",
  },
  {
    title: "Monolith Modernization",
    description: "Break apart legacy applications during migration. Tessera identifies service boundaries, MigrateIQ deploys microservices, DataIQ splits the database.",
    tools: ["Tessera", "MigrateIQ", "DataIQ"],
    guideHref: "/docs/guides/monolith-decomposition",
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gray-50 dark:bg-slate-950">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px]" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Seven Tools.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400">One Platform.</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              The complete DevOps automation platform. Each tool works independently or together, sharing infrastructure knowledge and reducing duplication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs/getting-started/quickstart" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white dark:text-black font-semibold rounded-lg transition-all hover:scale-105">
                Quick Start Guide →
              </Link>
              <Link href="/docs/" className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white dark:hover:bg-white/5 transition-colors">
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-16 bg-white dark:bg-slate-900/50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Platform Capabilities
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformCapabilities.map((cap) => (
              <div key={cap.title} className="text-center p-6">
                <span className="text-3xl mb-3 block">{cap.icon}</span>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 bg-white dark:bg-slate-900/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
            The InfraIQ Suite
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Seven production-ready tools built from real-world experience at Spotify, Capital One, and the DoD.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {tools.map((tool) => (
              <div 
                key={tool.name} 
                className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{tool.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {tool.name}
                      </h3>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        {tool.tagline}
                      </span>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400">
                        {tool.status}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {tool.desc}
                    </p>
                    
                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tool.features.map((feature) => (
                        <span 
                          key={feature}
                          className="text-xs px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links */}
                    <div className="flex gap-4 text-sm font-medium">
                      <Link 
                        href={tool.href}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Learn more →
                      </Link>
                      <Link 
                        href={tool.docsHref}
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        Documentation →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Common Use Cases
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            See how the tools work together to solve real infrastructure challenges.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <div 
                key={useCase.title}
                className="p-8 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {useCase.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {useCase.tools.map((tool) => (
                    <span 
                      key={tool}
                      className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <Link 
                  href={useCase.guideHref}
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read the guide →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-24 bg-white dark:bg-slate-900/50">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Real ROI
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
            Time savings based on real-world implementations.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-4 px-4 font-semibold text-gray-900 dark:text-white">Scenario</th>
                  <th className="py-4 px-4 font-semibold text-gray-900 dark:text-white">Manual</th>
                  <th className="py-4 px-4 font-semibold text-gray-900 dark:text-white">With InfraIQ</th>
                  <th className="py-4 px-4 font-semibold text-gray-900 dark:text-white">Savings</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-4 px-4">Heroku → AWS Migration</td>
                  <td className="py-4 px-4">2-3 months</td>
                  <td className="py-4 px-4">1 week</td>
                  <td className="py-4 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">92%</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-4 px-4">SOC2 Evidence Collection</td>
                  <td className="py-4 px-4">2 weeks</td>
                  <td className="py-4 px-4">2 hours</td>
                  <td className="py-4 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">95%</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-4 px-4">Codify 100 AWS Resources</td>
                  <td className="py-4 px-4">2 weeks</td>
                  <td className="py-4 px-4">2 hours</td>
                  <td className="py-4 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">99%</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-4 px-4">Database Migration (100GB)</td>
                  <td className="py-4 px-4">2-3 days</td>
                  <td className="py-4 px-4">2-4 hours</td>
                  <td className="py-4 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">95%</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Monolith Analysis</td>
                  <td className="py-4 px-4">2-4 weeks</td>
                  <td className="py-4 px-4">2-4 hours</td>
                  <td className="py-4 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">98%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Start with any tool. Add more as you need them. All tools share the same infrastructure knowledge graph.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start/" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white dark:text-black font-semibold rounded-lg transition-all hover:scale-105">
              Start Free Trial
            </Link>
            <Link href="/pricing/" className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white dark:hover:bg-white/5 transition-colors">
              View Pricing →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
