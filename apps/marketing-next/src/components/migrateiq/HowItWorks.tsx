"use client";

import { useState } from "react";

const steps = [
  { number: "01", title: "Scan Your Source", description: "Point MigrateIQ at your Heroku app, AWS account, or any cloud provider. We discover everything.", code: "$ migrateiq scan heroku --app production\n\n✓ 3 dynos discovered\n✓ 2 add-ons found\n✓ 12 config vars mapped\n✓ Build detected: Python 3.11\n\n📦 Scan saved: scan-2026-01-13.json" },
  { number: "02", title: "Review the Map", description: "MigrateIQ intelligently maps your resources to the target cloud. Review and customize if needed.", mappings: [{ from: "Web Dyno (Standard-2X)", to: "ECS Fargate (0.5 vCPU, 1GB)" }, { from: "Heroku Postgres", to: "RDS PostgreSQL" }, { from: "Heroku Redis", to: "ElastiCache Redis" }, { from: "Config Vars", to: "AWS Secrets Manager" }] },
  { number: "03", title: "Generate Terraform", description: "Get production-ready Infrastructure as Code. Not templates — actual Terraform configured for your app.", files: ["main.tf", "variables.tf", "ecs.tf", "rds.tf", "elasticache.tf", "secrets.tf", "vpc.tf", "outputs.tf"] },
  { number: "04", title: "Deploy with Confidence", description: "Apply the Terraform, run the migration script, and cut over. Zero downtime strategies included." }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  
  return (
    <section id="how-it-works" className="py-24 relative bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Migrate in 4 Steps</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            {steps.map((step, i) => (
              <button key={i} onClick={() => setActiveStep(i)} className={`w-full text-left p-6 rounded-xl border transition-all ${activeStep === i ? "bg-blue-50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/30" : "bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800"}`}>
                <div className="flex items-start gap-4">
                  <span className={`text-sm font-mono font-bold ${activeStep === i ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`}>{step.number}</span>
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
              {activeStep === 1 && (
                <div className="space-y-3">
                  {steps[1].mappings?.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">{m.from}</span>
                      <span className="text-blue-500">→</span>
                      <span className="text-sm text-blue-600 dark:text-blue-400 flex-1">{m.to}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeStep === 2 && (
                <div className="font-mono text-sm space-y-1">
                  <div className="text-amber-500 mb-2">📁 terraform/</div>
                  {steps[2].files?.map((f, i) => (
                    <div key={i} className="pl-4 text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <span className="text-blue-500">📄</span> {f}
                    </div>
                  ))}
                </div>
              )}
              {activeStep === 3 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30">
                    <p className="text-emerald-700 dark:text-emerald-400 font-medium">✓ terraform apply complete</p>
                    <p className="text-sm text-gray-500 mt-1">23 resources created</p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30">
                    <p className="text-blue-700 dark:text-blue-400 font-medium">✓ Database migrated</p>
                    <p className="text-sm text-gray-500 mt-1">pg_dump → pg_restore (0 rows lost)</p>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30">
                    <p className="text-emerald-700 dark:text-emerald-400 font-medium">✓ DNS cutover ready</p>
                    <p className="text-sm text-gray-500 mt-1">Update CNAME when ready</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
