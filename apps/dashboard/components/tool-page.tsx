"use client";

import { ArrowLeft, Terminal, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ToolPageProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  cliCommand: string;
  docsUrl?: string;
}

export function ToolPage({
  name,
  description,
  icon,
  color,
  features,
  cliCommand,
  docsUrl = "https://autonops.io/docs",
}: ToolPageProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-start gap-6 mb-12">
          <div
            className={`p-4 rounded-2xl ${color} bg-opacity-10 border border-opacity-20`}
            style={{ borderColor: "currentColor" }}
          >
            {icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{name}</h1>
            <p className="text-zinc-400 text-lg max-w-xl">{description}</p>
          </div>
        </div>

        {/* Status Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 font-medium">
              Dashboard Integration Coming Soon
            </span>
          </div>
          <p className="text-zinc-300">
            The web dashboard for {name} is under development. In the meantime,
            you can use the full-featured CLI tool.
          </p>
        </div>

        {/* Features */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-zinc-200">
            Capabilities
          </h2>
          <ul className="grid gap-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${color}`} />
                <span className="text-zinc-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CLI Usage */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-zinc-400" />
            <h2 className="text-lg font-semibold text-zinc-200">
              Use via CLI
            </h2>
          </div>
          <div className="bg-zinc-950 rounded-lg p-4 font-mono text-sm">
            <span className="text-zinc-500">$</span>{" "}
            <span className="text-emerald-400">{cliCommand}</span>
          </div>
          <p className="text-zinc-500 text-sm mt-3">
            Results will sync to this dashboard when using the{" "}
            <code className="text-zinc-400">--sync</code> flag.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <a
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-100 text-zinc-900 rounded-lg font-medium hover:bg-white transition-colors"
          >
            View Documentation
            <ExternalLink className="w-4 h-4" />
          </a>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 text-zinc-100 rounded-lg font-medium hover:bg-zinc-700 transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
