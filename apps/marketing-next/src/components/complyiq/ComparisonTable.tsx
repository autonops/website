"use client";

export default function ComparisonTable() {
  const rows = [
    { cap: "Evidence collection time", manual: "2-4 weeks", complyiq: "2-4 hours" },
    { cap: "Evidence freshness", manual: "Point-in-time", complyiq: "Continuous" },
    { cap: "Coverage consistency", manual: "Depends on who's collecting", complyiq: "100% every time" },
    { cap: "Gap identification", manual: "Found during audit 😬", complyiq: "Found immediately" },
    { cap: "Audit prep stress", manual: "🔥🔥🔥🔥🔥", complyiq: "☕" },
  ];

  return (
    <section className="py-24 relative bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">ComplyIQ vs. Manual</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
          <table className="w-full">
            <thead><tr className="bg-gray-100 dark:bg-gray-900"><th className="text-left p-5 text-gray-600 dark:text-gray-400">Capability</th><th className="text-center p-5 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20">Manual</th><th className="text-center p-5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20">ComplyIQ</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent">
                  <td className="p-5 text-gray-700 dark:text-gray-300">{r.cap}</td>
                  <td className="p-5 text-center text-gray-500 bg-red-50/50 dark:bg-red-950/10">{r.manual}</td>
                  <td className="p-5 text-center text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/10 font-medium">{r.complyiq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
