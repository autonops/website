"use client";

import { useState, useMemo } from "react";

export default function ROICalculator() {
  const [herokuCost, setHerokuCost] = useState(2000);
  const [dynos, setDynos] = useState(5);

  const calculations = useMemo(() => {
    const awsEstimate = Math.round(herokuCost * 0.35);
    const monthlySavings = herokuCost - awsEstimate;
    const yearlySavings = monthlySavings * 12;
    const migrationWeeksManual = Math.max(4, Math.round(dynos * 1.5));
    const migrationHoursMigrateIQ = Math.max(2, Math.round(dynos * 0.5));
    return { awsEstimate, monthlySavings, yearlySavings, migrationWeeksManual, migrationHoursMigrateIQ };
  }, [herokuCost, dynos]);

  return (
    <section className="py-24 relative bg-white dark:bg-slate-950">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Calculate Your Savings</h2>
          <p className="text-gray-600 dark:text-gray-400">See how much you could save migrating from Heroku to AWS</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 space-y-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Heroku Setup</h3>
            <div>
              <div className="flex justify-between mb-2"><label className="text-sm text-gray-600 dark:text-gray-400">Monthly Heroku bill</label><span className="text-sm font-mono text-blue-600 dark:text-blue-400">${herokuCost}</span></div>
              <input type="range" min="100" max="10000" step="100" value={herokuCost} onChange={(e) => setHerokuCost(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer accent-blue-500" />
            </div>
            <div>
              <div className="flex justify-between mb-2"><label className="text-sm text-gray-600 dark:text-gray-400">Number of dynos/services</label><span className="text-sm font-mono text-blue-600 dark:text-blue-400">{dynos}</span></div>
              <input type="range" min="1" max="20" step="1" value={dynos} onChange={(e) => setDynos(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer accent-blue-500" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/30 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current (Heroku)</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">${herokuCost}/mo</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Estimated (AWS)</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${calculations.awsEstimate}/mo</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-500/10 dark:to-cyan-500/10 border border-blue-200 dark:border-blue-500/30 rounded-2xl p-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Annual Savings</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">${calculations.yearlySavings.toLocaleString()}</p>
              <p className="text-blue-600 dark:text-blue-400 mt-2">${calculations.monthlySavings}/mo less</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">Manual Migration</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">{calculations.migrationWeeksManual} weeks</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">With MigrateIQ</p>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{calculations.migrationHoursMigrateIQ} hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
