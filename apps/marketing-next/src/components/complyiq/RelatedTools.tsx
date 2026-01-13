"use client";

const tools = [
  { name: "VerifyIQ", emoji: "🔍", tagline: "Found compliance gaps?", desc: "Continuously scan for security issues.", href: "/verifyiq/" },
  { name: "SecureIQ", emoji: "🔐", tagline: "Secrets need rotation?", desc: "Map all your secrets and generate migration checklists.", href: "/secureiq/" },
  { name: "CodifyIQ", emoji: "📝", tagline: "Auditors love IaC.", desc: "Convert ClickOps to auditable Terraform.", href: "/codifyiq/" }
];

export default function RelatedTools() {
  return (
    <section className="py-24 relative bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Even Better Together</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <a key={i} href={tool.href} className="group p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{tool.emoji}</span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{tool.name}</h3>
              </div>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-2">{tool.tagline}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{tool.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
