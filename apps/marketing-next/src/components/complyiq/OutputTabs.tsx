"use client";

import { useState } from "react";

const tabs = [
  { id: "structure", label: "Evidence Package" },
  { id: "mapping", label: "Control Mapping" },
  { id: "gaps", label: "Gap Analysis" },
];

export default function OutputTabs() {
  const [activeTab, setActiveTab] = useState("structure");
  
  return (
    <section id="sample-report" className="py-24 relative bg-white dark:bg-slate-950">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">See What You'll Get</h2>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-2.5 rounded-lg text-sm font-medium ${activeTab === tab.id ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}>{tab.label}</button>
          ))}
        </div>
        <div className="bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          {activeTab === "structure" && (
            <div className="font-mono text-sm space-y-1">
              <div className="text-amber-600 dark:text-amber-400">📁 soc2-evidence-Q1-2026/</div>
              <div className="pl-4 text-gray-600 dark:text-gray-400">📄 metadata.json</div>
              <div className="pl-4 text-gray-600 dark:text-gray-400">📄 summary-report.pdf</div>
              <div className="pl-4 text-amber-600 dark:text-amber-400">📁 CC6.1-logical-access/</div>
              <div className="pl-8 text-gray-600 dark:text-gray-400">📄 iam-policies.json</div>
              <div className="pl-8 text-gray-600 dark:text-gray-400">📄 user-access-review.csv</div>
              <div className="pl-4 text-amber-600 dark:text-amber-400">📁 CC7.2-monitoring/</div>
              <div className="pl-8 text-gray-600 dark:text-gray-400">📄 cloudtrail-config.json</div>
            </div>
          )}
          {activeTab === "mapping" && (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 dark:border-gray-700"><th className="text-left p-3 text-gray-600 dark:text-gray-400">Control</th><th className="text-left p-3 text-gray-600 dark:text-gray-400">Evidence</th><th className="text-left p-3 text-gray-600 dark:text-gray-400">Status</th></tr></thead>
              <tbody>
                {[{c:"CC6.1",e:"iam-policies.json",s:"✓"},{c:"CC6.2",e:"mfa-status.json",s:"✓"},{c:"CC7.2",e:"cloudtrail-config.json",s:"✓"}].map((r,i) => (
                  <tr key={i} className="border-b border-gray-200 dark:border-gray-800"><td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">{r.c}</td><td className="p-3 text-gray-600 dark:text-gray-400">{r.e}</td><td className="p-3 text-emerald-500">{r.s}</td></tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === "gaps" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30">
                <p className="text-red-700 dark:text-red-400 font-medium">🔴 Critical: CloudTrail not enabled in us-west-2</p>
                <p className="text-sm text-gray-500 mt-1">Affects: CC7.2 (System Monitoring)</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30">
                <p className="text-amber-700 dark:text-amber-400 font-medium">🟡 Warning: 2 IAM users without MFA</p>
                <p className="text-sm text-gray-500 mt-1">Affects: CC6.1 (Logical Access)</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
