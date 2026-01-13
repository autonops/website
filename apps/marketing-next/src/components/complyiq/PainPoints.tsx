"use client";

const painPoints = [
  { icon: "📸", title: "The Screenshot Hunt", description: "It's audit time. Your compliance lead is pinging engineers for screenshots. Again. Everyone's productivity tanks for two weeks." },
  { icon: "📊", title: "The Spreadsheet Chaos", description: "Evidence lives in 47 different places — Confluence pages, Google Docs, someone's desktop folder labeled 'SOC2 stuff'." },
  { icon: "🔄", title: "The Continuous Lie", description: "Your auditor asks about 'continuous compliance monitoring.' You nod confidently while knowing you only check things the week before audits." }
];

export default function PainPoints() {
  return (
    <section className="py-24 relative bg-white dark:bg-slate-950">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Sound Familiar?</h2>
          <p className="text-gray-600 dark:text-gray-500 max-w-2xl mx-auto">If you've been through an audit, you know the pain.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <div key={i} className="group relative p-8 rounded-2xl bg-gray-50 dark:bg-gradient-to-b dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all">
              <span className="text-4xl mb-6 block">{point.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{point.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
