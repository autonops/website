"use client";

import { useState } from "react";

const frameworks = [
  { name: "SOC 2 Type II", status: "Full Coverage", color: "emerald", controls: 64, evidence: 23 },
  { name: "ISO 27001", status: "Full Coverage", color: "emerald", controls: 93, evidence: 31 },
  { name: "HIPAA", status: "Full Coverage", color: "emerald", controls: 42, evidence: 18 },
  { name: "PCI-DSS", status: "Coming Q2 2026", color: "amber", controls: null, evidence: null }
];

export default function FrameworkCards() {
  const [expanded, setExpanded] = useState<number | null>(0);
  
  return (
    <section className="py-24 relative bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Built for the Frameworks That Matter</h2>
        </div>
        <div className="space-y-4">
          {frameworks.map((fw, i) => (
            <div key={i} className={`border rounded-2xl overflow-hidden ${expanded === i ? "bg-white dark:bg-gray-900/70 border-gray-300 dark:border-gray-700" : "bg-white dark:bg-gray-900/30 border-gray-200 dark:border-gray-800"}`}>
              <button onClick={() => setExpanded(expanded === i ? null : i)} className="w-full p-6 flex items-center justify-between text-left">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{fw.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${fw.color === "emerald" ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400"}`}>{fw.status}</span>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${expanded === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {expanded === i && fw.controls && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="grid grid-cols-3 gap-4 py-6">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"><p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{fw.controls}</p><p className="text-sm text-gray-500">Controls</p></div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"><p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{fw.evidence}</p><p className="text-sm text-gray-500">Evidence Types</p></div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"><p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">100%</p><p className="text-sm text-gray-500">Automation</p></div>
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
