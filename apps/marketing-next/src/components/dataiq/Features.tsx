"use client";

const features = [
  { icon: "🔄", title: "Continuous Replication", desc: "Keep source and target in sync with sub-second lag until you're ready to cut over." },
  { icon: "🏥", title: "Self-Healing", desc: "Automatic retry and recovery from transient failures. No babysitting required." },
  { icon: "🎯", title: "Auto-Cutover", desc: "Automated cutover when health checks pass. Switch primaries with zero downtime." },
  { icon: "⏪", title: "Instant Rollback", desc: "Something wrong? Roll back to source in seconds with reverse replication." },
  { icon: "🔀", title: "Cross-Engine", desc: "Migrate between PostgreSQL, MySQL, Oracle, and MongoDB with schema translation." },
  { icon: "📊", title: "Progress Tracking", desc: "Real-time dashboards showing replication lag, row counts, and health status." },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative bg-white dark:bg-slate-950">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Enterprise-Grade Migration</h2>
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
