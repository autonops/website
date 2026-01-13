"use client";

import { useState, useMemo } from "react";

export default function ROICalculator() {
  const [auditsPerYear, setAuditsPerYear] = useState(2);
  const [hoursPerAudit, setHoursPerAudit] = useState(80);
  const [hourlyRate, setHourlyRate] = useState(75);

  const calculations = useMemo(() => {
    const manualCost = hoursPerAudit * auditsPerYear * hourlyRate;
    const complyiqHours = 4;
    const complyiqCost = complyiqHours * auditsPerYear * hourlyRate;
    const savings = manualCost - complyiqCost;
    const hoursSaved = (hoursPerAudit - complyiqHours) * auditsPerYear;
    return { manualCost, complyiqCost, savings, hoursSaved };
  }, [auditsPerYear, hoursPerAudit, hourlyRate]);

  return (
    <section className="py-24 relative bg-white dark:bg-slate-950">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Calculate Your Time Savings</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Team</h3>
            <div>
              <div className="flex justify-between mb-2"><label className="text-sm text-gray-600 dark:text-gray-400">Audits per year</label><span className="text-sm font-mono text-emerald-600 dark:text-emerald-400">{auditsPerYear}</span></div>
              <div className="flex gap-3">{[1, 2, 4].map((num) => <button key={num} onClick={() => setAuditsPerYear(num)} className={`flex-1 py-3 rounded-lg border font-medium ${auditsPerYear === num ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400" : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400"}`}>{num}</button>)}</div>
            </div>
            <div>
              <div className="flex justify-between mb-2"><label className="text-sm text-gray-600 dark:text-gray-400">Hours per audit</label><span className="text-sm font-mono text-emerald-600 dark:text-emerald-400">{hoursPerAudit}h</span></div>
              <input type="range" min="20" max="200" step="10" value={hoursPerAudit} onChange={(e) => setHoursPerAudit(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer accent-emerald-500" />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 block mb-2">Hourly cost</label>
              <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span><input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 pl-8 pr-4" /></div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">❌ Without ComplyIQ</h4>
              <div className="text-red-600 dark:text-red-400 font-mono text-lg">${calculations.manualCost.toLocaleString()}/yr</div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">✓ With ComplyIQ</h4>
              <div className="text-emerald-600 dark:text-emerald-400 font-mono text-lg">${calculations.complyiqCost.toLocaleString()}/yr</div>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl p-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Annual Savings</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">${calculations.savings.toLocaleString()}</p>
              <p className="text-emerald-600 dark:text-emerald-400 mt-2">+ {calculations.hoursSaved} hours recovered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
