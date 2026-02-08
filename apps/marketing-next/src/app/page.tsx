"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const terminalLines = [
  { text: "$ infraiq migrate scan heroku --app production", type: "command", delay: 0 },
  { text: "", type: "blank", delay: 400 },
  { text: "🔍 Scanning Heroku app...", type: "info", delay: 800 },
  { text: "✓ 3 dynos discovered", type: "success", delay: 1400 },
  { text: "✓ PostgreSQL database mapped", type: "success", delay: 2000 },
  { text: "✓ 12 config vars detected", type: "success", delay: 2600 },
  { text: "", type: "blank", delay: 3000 },
  { text: "📦 Generating Terraform for AWS...", type: "info", delay: 3400 },
  { text: "✓ terraform/ directory created", type: "result", delay: 4000 },
  { text: "→ Migration ready. Run 'terraform apply' to deploy.", type: "hint", delay: 4600 },
];

const featuredTools = [
  { 
    emoji: "🚀", 
    name: "MigrateIQ", 
    desc: "Migrate from Heroku to AWS in hours. Automatic resource discovery and Terraform generation.", 
    href: "/migrateiq/" 
  },
  { 
    emoji: "🔒", 
    name: "ComplyIQ", 
    desc: "Automated SOC2, ISO27001, and HIPAA evidence collection. 2 weeks → 2 hours.", 
    href: "/complyiq/" 
  },
  { 
    emoji: "🎭", 
    name: "Tessera", 
    desc: "AI-powered monolith decomposition. Find microservice boundaries intelligently.", 
    href: "/tessera/" 
  },
];

export default function HomePage() {
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
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-50 dark:bg-slate-950">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[100px]" />
        
        <div className="max-w-[1200px] mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                🚀 Free Beta — Q1 2026
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                InfraIQ<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400">Migration as a Service</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                Migrate from Heroku to AWS in hours, not months. A complete DevOps automation platform built from real-world experience scaling infrastructure at Spotify, Capital One, and Point Digital Finance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/start/" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white dark:text-black font-semibold rounded-lg transition-all hover:scale-105">Join the Beta</Link>
                <Link href="/products/" className="px-8 py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">See All Tools →</Link>
              </div>
            </div>
            
            {/* Animated Terminal */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
              <div className="relative bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-800">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-4 text-sm text-gray-500 font-mono">infraiq — bash</span>
                </div>
                <div className="p-6 font-mono text-sm min-h-[340px] bg-gray-50 dark:bg-[#0d1117]">
                  {terminalLines.slice(0, visibleLines).map((line, i) => (
                    <div key={i} className={`
                      ${line.type === "command" ? "text-gray-800 dark:text-gray-100" : ""}
                      ${line.type === "info" ? "text-blue-600 dark:text-blue-400" : ""}
                      ${line.type === "success" ? "text-emerald-600 dark:text-emerald-400" : ""}
                      ${line.type === "result" ? "text-amber-600 dark:text-amber-400 font-semibold" : ""}
                      ${line.type === "hint" ? "text-gray-500" : ""}
                      ${line.type === "blank" ? "h-4" : ""}
                      leading-relaxed
                    `}>{line.text}</div>
                  ))}
                  {isTyping && <span className="inline-block w-2 h-5 bg-blue-600 dark:bg-blue-400 animate-pulse ml-1" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section - Simplified */}
      <section id="product" className="py-24 relative bg-white dark:bg-slate-900/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">What We Do</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              InfraIQ automates the painful parts of DevOps so your team can focus on building product.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400">Time Savings</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 mb-2">Weeks → Hours</div>
              <div className="text-gray-600 dark:text-gray-400">Migration Time</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 mb-2">7</div>
              <div className="text-gray-600 dark:text-gray-400">Integrated Tools</div>
            </div>
          </div>
          
          {/* Featured Tools - Just 3 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {featuredTools.map((tool) => (
              <Link 
                key={tool.name} 
                href={tool.href} 
                className="group p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{tool.emoji}</span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tool.name}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{tool.desc}</p>
                <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </div>
              </Link>
            ))}
          </div>

          {/* See All Tools CTA */}
          <div className="text-center">
            <Link 
              href="/products/" 
              className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              See all 7 tools
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="background" className="py-24 relative bg-gray-50 dark:bg-slate-950">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Built by Someone Who's Done This Before</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            InfraIQ was created by a Lead DevOps Engineer who scaled Spotify's podcast infrastructure to <span className="text-blue-600 dark:text-blue-400 font-semibold">1.1 billion monthly downloads</span>, helped build Capital One into the <span className="text-blue-600 dark:text-blue-400 font-semibold">first 100% cloud-based bank</span>, and led zero-downtime migrations at a <span className="text-blue-600 dark:text-blue-400 font-semibold">$4B fintech</span>.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            This isn't theory. It's battle-tested patterns encoded into software that any engineer can use.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section id="signup" className="py-24 relative bg-white dark:bg-slate-900/50">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/50 dark:to-emerald-950/50 border border-blue-200 dark:border-blue-500/20 rounded-3xl p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your Infrastructure Should Scale With You</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">Join 35+ companies already planning their migration.</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mb-8">30-day free trial • No credit card required</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/start/" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white dark:text-black font-semibold rounded-lg transition-all hover:scale-105">Start Free Trial</Link>
                <Link href="mailto:sales@autonops.io" className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-white dark:hover:bg-white/5 transition-colors">Schedule a Demo →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
