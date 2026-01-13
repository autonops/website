"use client";

const tools = [
  { name: "VerifyIQ", emoji: "🔍", tagline: "Pre-flight checks", desc: "Scan your infrastructure for security issues before migrating.", href: "/verifyiq/" },
  { name: "DataIQ", emoji: "🗄️", tagline: "Zero-downtime DB migration", desc: "Migrate databases with automatic cutover and rollback.", href: "/dataiq/" },
  { name: "Tessera", emoji: "🎭", tagline: "Modernize while migrating", desc: "Break up your monolith into microservices during migration.", href: "/tessera/" }
];

export default function RelatedTools() {
  return (
    <section className="py-24 relative bg-white dark:bg-slate-950">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Even Better Together</h2>
          <p className="text-gray-600 dark:text-gray-400">Combine with other InfraIQ tools for a complete migration.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <a key={i} href={tool.href} className="group p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{tool.emoji}</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">{tool.name}</h3>
              </div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">{tool.tagline}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{tool.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
