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
    desc: "Migrate from Heroku, AWS, GCP, or Azure in hours, not months. Automatic resource discovery, intelligent mapping, and production-ready Terraform generation.", 
    href: "/migrateiq/",
    color: "blue"
  },
  { 
    emoji: "🔍", 
    name: "VerifyIQ", 
    tagline: "Infrastructure Verification",
    desc: "Continuous scanning for security issues, cost optimization opportunities, configuration drift, and compliance gaps. Know your infrastructure before it breaks.", 
    href: "/verifyiq/",
    color: "amber"
  },
  { 
    emoji: "📝", 
    name: "CodifyIQ", 
    tagline: "Infrastructure as Code",
    desc: "Transform manually-created cloud resources into production-ready Terraform. ClickOps to GitOps without disrupting running infrastructure.", 
    href: "/codifyiq/",
    color: "violet"
  },
  { 
    emoji: "🔒", 
    name: "ComplyIQ", 
    tagline: "Compliance Automation",
    desc: "Automated evidence collection for SOC2, ISO27001, and HIPAA. What used to take your team 2 weeks now takes 2 hours.", 
    href: "/complyiq/",
    color: "emerald"
  },
  { 
    emoji: "🗄️", 
    name: "DataIQ", 
    tagline: "Database Migration",
    desc: "Zero-downtime database migrations with continuous replication, automatic health checks, and instant rollback. PostgreSQL, MySQL, Oracle, MongoDB.", 
    href: "/dataiq/",
    color: "cyan"
  },
  { 
    emoji: "🔑", 
    name: "SecureIQ", 
    tagline: "Secret Management",
    desc: "Discover all secrets in your infrastructure without reading values. Map dependencies, generate migration checklists, and validate compliance.", 
    href: "/secureiq/",
    color: "rose"
  },
  { 
    emoji: "🎭", 
    name: "Tessera", 
    tagline: "Monolith Decomposition",
    desc: "AI-powered analysis to identify microservice boundaries in your codebase. Domain-driven design principles meet LLM intelligence.", 
    href: "/tessera/",
    color: "fuchsia"
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
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              The complete DevOps automation platform. Each tool works independently or together, sharing infrastructure knowledge and reducing duplication.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 bg-white dark:bg-slate-900/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {tools.map((tool) => (
              <Link 
                key={tool.name} 
                href={tool.href}
                className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{tool.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h2>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        {tool.tagline}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {tool.desc}
                    </p>
                    <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
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
