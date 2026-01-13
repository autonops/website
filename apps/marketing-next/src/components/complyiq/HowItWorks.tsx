"use client";

import { useState } from "react";

const steps = [
  { number: "01", title: "Point at Your Infrastructure", description: "Connect ComplyIQ to your cloud accounts with read-only credentials.", code: "$ complyiq configure --provider aws\n✓ Connected to AWS account: production\n✓ 847 resources discovered" },
  { number: "02", title: "Choose Your Framework", description: "Select which compliance frameworks matter to you.", frameworks: ["SOC 2 Type II", "ISO 27001", "HIPAA", "PCI-DSS"] },
  { number: "03", title: "Collect Evidence Automatically", description: "ComplyIQ scans your infrastructure and collects evidence for each control.", evidenceTypes: ["IAM policies and roles", "Encryption configurations", "Network security groups", "Audit log retention", "Backup configurations", "Access control lists"] },
  { number: "04", title: "Export Audit-Ready Packages", description: "Get a complete evidence package organized exactly how auditors expect it." }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  
  return (
    <section className="py-24 relative bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">From Chaos to Confidence in 4 Steps</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            {steps.map((step, i) => (
              <button key={i} onClick={() => setActiveStep(i)} className={`w-full text-left p-6 rounded-xl border transition-all ${activeStep === i ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30" : "bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800"}`}>
                <div className="flex items-start gap-4">
                  <span className={`text-sm font-mono font-bold ${activeStep === i ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>{step.number}</span>
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${activeStep === i ? "text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-400"}`}>{step.title}</h3>
                    <p className={`text-sm ${activeStep === i ? "text-gray-600 dark:text-gray-400" : "text-gray-500"}`}>{step.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="sticky top-8">
            <div className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              {activeStep === 0 && <pre className="font-mono text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{steps[0].code}</pre>}
              {activeStep === 1 && <div className="grid grid-cols-2 gap-3">{steps[1].frameworks?.map((f, i) => <div key={i} className={`p-4 rounded-lg border ${i === 0 ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30" : "border-gray-200 dark:border-gray-700"}`}>{f}</div>)}</div>}
              {activeStep === 2 && <div className="space-y-2">{steps[2].evidenceTypes?.map((t, i) => <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"><span className="text-emerald-500">✓</span>{t}</div>)}</div>}
              {activeStep === 3 && <div className="font-mono text-sm space-y-1"><div className="text-amber-500">📁 soc2-evidence-Q1-2026/</div><div className="pl-4 text-gray-500">📄 metadata.json</div><div className="pl-4 text-gray-500">📄 summary-report.pdf</div><div className="pl-4 text-amber-500">📁 CC6.1-logical-access/</div><div className="pl-8 text-gray-500">📄 iam-policies.json</div></div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
