"use client";

export default function ComparisonTable() {
  const rows = [
    { cap: "Time to migrate", manual: "4-12 weeks", migrateiq: "1-2 days" },
    { cap: "Resource discovery", manual: "Manual spreadsheets", migrateiq: "Automatic scanning" },
    { cap: "Terraform quality", manual: "Copy-paste from docs", migrateiq: "Production-ready" },
    { cap: "Config var handling", manual: "Manually recreate", migrateiq: "Auto-mapped to Secrets Manager" },
    { cap: "Downtime risk", manual: "High (manual cutover)", migrateiq: "Zero (blue-green included)" },
    { cap: "Rollback plan", manual: "Hope nothing breaks", migrateiq: "Automated rollback scripts" },
  ];

  return (
    <section className="py-24 relative bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">MigrateIQ vs. Manual</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
          <table className="w-full">
            <thead><tr className="bg-gray-100 dark:bg-gray-900"><th className="text-left p-5 text-gray-600 dark:text-gray-400">Capability</th><th className="text-center p-5 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20">Manual</th><th className="text-center p-5 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20">MigrateIQ</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent">
                  <td className="p-5 text-gray-700 dark:text-gray-300">{r.cap}</td>
                  <td className="p-5 text-center text-gray-500 bg-red-50/50 dark:bg-red-950/10">{r.manual}</td>
                  <td className="p-5 text-center text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/10 font-medium">{r.migrateiq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
