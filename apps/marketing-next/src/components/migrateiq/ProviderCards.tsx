"use client";

import { useState } from "react";

const providers = [
  { name: "Heroku → AWS", status: "Full Support", color: "blue", sources: ["Dynos", "Postgres", "Redis", "Config Vars"], targets: ["ECS/Fargate", "RDS", "ElastiCache", "Secrets Manager"] },
  { name: "Heroku → GCP", status: "Full Support", color: "blue", sources: ["Dynos", "Postgres", "Redis", "Config Vars"], targets: ["Cloud Run", "Cloud SQL", "Memorystore", "Secret Manager"] },
  { name: "AWS → GCP", status: "Full Support", color: "blue", sources: ["EC2/ECS", "RDS", "ElastiCache"], targets: ["GCE/Cloud Run", "Cloud SQL", "Memorystore"] },
  { name: "On-Prem → Cloud", status: "Coming Q2 2026", color: "amber", sources: null, targets: null }
];

export default function ProviderCards() {
  const [expanded, setExpanded] = useState<number | null>(0);
  
  return (
    <section className="py-24 relative bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Supported Migration Paths</h2>
          <p className="text-gray-600 dark:text-gray-400">From any cloud to any cloud. We handle the complexity.</p>
        </div>
        <div className="space-y-4">
          {providers.map((p, i) => (
            <div key={i} className={`border rounded-2xl overflow-hidden ${expanded === i ? "bg-white dark:bg-gray-900/70 border-gray-300 dark:border-gray-700" : "bg-white dark:bg-gray-900/30 border-gray-200 dark:border-gray-800"}`}>
              <button onClick={() => setExpanded(expanded === i ? null : i)} className="w-full p-6 flex items-center justify-between text-left">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{p.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${p.color === "blue" ? "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" : "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400"}`}>{p.status}</span>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${expanded === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {expanded === i && p.sources && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="grid md:grid-cols-2 gap-6 py-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Source Resources</h4>
                      <div className="space-y-2">{p.sources.map((s, j) => <div key={j} className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><span className="text-blue-500">•</span>{s}</div>)}</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">Target Resources</h4>
                      <div className="space-y-2">{p.targets?.map((t, j) => <div key={j} className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><span className="text-emerald-500">•</span>{t}</div>)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
