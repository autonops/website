"use client";

const features = [
  { icon: "🔍", title: "Zero-Value Discovery", desc: "Find secrets by name patterns and locations. We never read actual secret values — your data stays safe." },
  { icon: "🏷️", title: "Auto-Classification", desc: "Automatically classify secrets by type: API keys, database credentials, tokens, certificates, and more." },
  { icon: "🗺️", title: "Dependency Mapping", desc: "Understand which services use which secrets. Never break an app by missing a dependency." },
  { icon: "📋", title: "Migration Checklists", desc: "Generate step-by-step checklists for migrating secrets to a new provider or environment." },
];

export default function Features() {
  return (
    <section id="how-it-works" className="py-24 relative bg-white dark:bg-slate-950">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Secrets Management for Migrations</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
              <span className="text-4xl mb-4 block">{f.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
