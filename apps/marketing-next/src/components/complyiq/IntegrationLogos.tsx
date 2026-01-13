"use client";

const integrations = {
  cloud: [{ name: "AWS", status: "Full" }, { name: "GCP", status: "Full" }, { name: "Azure", status: "Full" }],
  grc: [{ name: "Vanta", status: "Export" }, { name: "Drata", status: "Export" }],
};

export default function IntegrationLogos() {
  return (
    <section className="py-24 relative bg-white dark:bg-slate-950">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Works With Your Stack</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">Cloud Providers</h3>
            <div className="space-y-3">{integrations.cloud.map((i, idx) => <div key={idx} className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"><span className="text-gray-700 dark:text-gray-300">{i.name}</span><span className="text-xs text-emerald-600 dark:text-emerald-400">{i.status}</span></div>)}</div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">GRC Platforms</h3>
            <div className="space-y-3">{integrations.grc.map((i, idx) => <div key={idx} className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"><span className="text-gray-700 dark:text-gray-300">{i.name}</span><span className="text-xs text-gray-500">{i.status}</span></div>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
