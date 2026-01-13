"use client";

const painPoints = [
  { icon: "💸", title: "Heroku Bills Keep Growing", description: "What started as $50/month is now $2,000. Heroku's simplicity has a ceiling, and you've hit it. But migrating feels like a 6-month project." },
  { icon: "📋", title: "The Manual Mapping Nightmare", description: "Last time someone tried migrating, they spent 3 weeks in spreadsheets mapping dynos to EC2 instances. Then missed half the config vars anyway." },
  { icon: "😰", title: "Fear of Downtime", description: "Your app makes money every minute it's up. The thought of a botched migration taking you offline for hours keeps you paying the Heroku tax." }
];

export default function PainPoints() {
  return (
    <section className="py-24 relative bg-white dark:bg-slate-950">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Sound Familiar?</h2>
          <p className="text-gray-600 dark:text-gray-500 max-w-2xl mx-auto">Cloud migrations are painful. We've been there.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <div key={i} className="group relative p-8 rounded-2xl bg-gray-50 dark:bg-gradient-to-b dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all">
              <span className="text-4xl mb-6 block">{point.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{point.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
