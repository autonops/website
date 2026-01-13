"use client";

const features = [
  { icon: "🤖", title: "AI-Powered Analysis", desc: "LLMs analyze your codebase to identify domain boundaries, coupling, and cohesion patterns humans might miss." },
  { icon: "🔒", title: "Zero Data Access", desc: "Tessera analyzes database schemas without reading any actual data. Your production data stays untouched." },
  { icon: "🎯", title: "Confidence Scoring", desc: "Every recommendation comes with a confidence score so you know how certain the AI is about each boundary." },
  { icon: "🏗️", title: "Scaffold Generation", desc: "Generate complete service scaffolds with Dockerfiles, Kubernetes manifests, and CI/CD pipelines." },
  { icon: "📊", title: "Multi-Language", desc: "Works with Python, JavaScript, TypeScript, Ruby, Go, and Java codebases." },
  { icon: "🚀", title: "Heroku Integration", desc: "Migrate and modernize in one step. Break up your monolith while moving off Heroku." },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative bg-white dark:bg-slate-950">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Intelligent Decomposition</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
