"use client";
import { useEffect, useState } from "react";

const terminalLines = [
  { text: "$ secureiq scan --provider aws", type: "command", delay: 0 },
  { text: "", type: "blank", delay: 400 },
  { text: "🔐 Discovering secrets (values never read)...", type: "info", delay: 800 },
  { text: "✓ 23 environment variables", type: "success", delay: 1400 },
  { text: "✓ 12 AWS Secrets Manager entries", type: "success", delay: 2000 },
  { text: "✓ 8 SSM parameters", type: "success", delay: 2600 },
  { text: "⚠ 3 hardcoded in source code", type: "warning", delay: 3200 },
  { text: "", type: "blank", delay: 3600 },
  { text: "📋 Manifest saved: secrets-manifest.yaml", type: "result", delay: 4000 },
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const nextDelay = visibleLines === 0 ? terminalLines[0].delay : terminalLines[visibleLines].delay - terminalLines[visibleLines - 1].delay;
      const timer = setTimeout(() => setVisibleLines(v => v + 1), nextDelay);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
      const resetTimer = setTimeout(() => { setVisibleLines(0); setIsTyping(true); }, 5000);
      return () => clearTimeout(resetTimer);
    }
  }, [visibleLines]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-50 dark:bg-slate-950">
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-[120px]" />
      <div className="max-w-[1200px] mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500 dark:bg-rose-400 animate-pulse" />
              Discovery • Classification • Mapping
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
              Find Every Secret<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400">Before You Migrate</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
              SecureIQ discovers all your secrets by location and type — without ever reading the values. Map dependencies, generate migration checklists, and validate compliance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/start/" className="px-8 py-4 bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400 text-white dark:text-black font-semibold rounded-lg transition-all hover:scale-105">Start Free Trial</a>
              <a href="#how-it-works" className="px-8 py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">See How It Works →</a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500/80" /><div className="w-3 h-3 rounded-full bg-yellow-500/80" /><div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-sm text-gray-500 font-mono">secureiq — bash</span>
              </div>
              <div className="p-6 font-mono text-sm min-h-[320px] bg-gray-50 dark:bg-[#0d1117]">
                {terminalLines.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className={`${line.type === "command" ? "text-gray-800 dark:text-gray-100" : ""} ${line.type === "info" ? "text-blue-600 dark:text-blue-400" : ""} ${line.type === "success" ? "text-emerald-600 dark:text-emerald-400" : ""} ${line.type === "warning" ? "text-amber-600 dark:text-amber-400" : ""} ${line.type === "result" ? "text-rose-600 dark:text-rose-400 font-semibold" : ""} ${line.type === "blank" ? "h-4" : ""} leading-relaxed`}>{line.text}</div>
                ))}
                {isTyping && <span className="inline-block w-2 h-5 bg-rose-600 dark:bg-rose-400 animate-pulse ml-1" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
