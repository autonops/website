"use client";
import { useEffect, useState } from "react";

const terminalLines = [
  { text: "$ tessera analyze --source ./myapp --use-ai", type: "command", delay: 0 },
  { text: "", type: "blank", delay: 400 },
  { text: "🤖 Analyzing codebase with AI...", type: "info", delay: 800 },
  { text: "✓ 847 files analyzed", type: "success", delay: 1600 },
  { text: "✓ 12 domain contexts identified", type: "success", delay: 2400 },
  { text: "✓ 34 database relationships mapped", type: "success", delay: 3200 },
  { text: "", type: "blank", delay: 3600 },
  { text: "🎯 Recommended: 5 microservices", type: "result", delay: 4000 },
  { text: "   Confidence: 87%", type: "hint", delay: 4400 },
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
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-fuchsia-500/5 dark:bg-fuchsia-500/10 rounded-full blur-[120px]" />
      <div className="max-w-[1200px] mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-100 dark:bg-fuchsia-500/10 border border-fuchsia-200 dark:border-fuchsia-500/20 text-fuchsia-700 dark:text-fuchsia-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-fuchsia-500 dark:bg-fuchsia-400 animate-pulse" />
              AI-Powered • DDD • Zero Data Access
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
              Break Up Your<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600 dark:from-fuchsia-400 dark:to-purple-400">Monolith with AI</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
              Tessera uses AI to analyze your codebase and recommend microservice boundaries. Domain-driven design principles meet LLM intelligence.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/start/" className="px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-700 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-400 text-white dark:text-black font-semibold rounded-lg transition-all hover:scale-105">Start Free Trial</a>
              <a href="#features" className="px-8 py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">See Features →</a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500/80" /><div className="w-3 h-3 rounded-full bg-yellow-500/80" /><div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-sm text-gray-500 font-mono">tessera — bash</span>
              </div>
              <div className="p-6 font-mono text-sm min-h-[320px] bg-gray-50 dark:bg-[#0d1117]">
                {terminalLines.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className={`${line.type === "command" ? "text-gray-800 dark:text-gray-100" : ""} ${line.type === "info" ? "text-blue-600 dark:text-blue-400" : ""} ${line.type === "success" ? "text-emerald-600 dark:text-emerald-400" : ""} ${line.type === "result" ? "text-fuchsia-600 dark:text-fuchsia-400 font-semibold" : ""} ${line.type === "hint" ? "text-gray-500" : ""} ${line.type === "blank" ? "h-4" : ""} leading-relaxed`}>{line.text}</div>
                ))}
                {isTyping && <span className="inline-block w-2 h-5 bg-fuchsia-600 dark:bg-fuchsia-400 animate-pulse ml-1" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
