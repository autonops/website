"use client";

import { ArrowLeft, FolderOpen, Plus } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Projects</h1>
            <p className="text-zinc-400">
              Organize your infrastructure scans and migrations by project.
            </p>
          </div>
          <button
            disabled
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 text-zinc-500 rounded-lg font-medium cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>

        {/* Coming Soon State */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-800 rounded-2xl mb-6">
            <FolderOpen className="w-8 h-8 text-zinc-500" />
          </div>
          <h2 className="text-xl font-semibold mb-3 text-zinc-200">
            Projects Coming Soon
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-6">
            Project management will let you organize scans, track migration
            progress, and collaborate with your team across multiple
            infrastructure initiatives.
          </p>
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-zinc-300 text-sm">
              <span className="text-emerald-400 font-medium">Pro tip:</span> For
              now, use the <code className="text-zinc-400">--output</code> flag
              to organize scan results into project directories locally.
            </p>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5">
            <h3 className="font-medium text-zinc-200 mb-2">
              Multi-environment
            </h3>
            <p className="text-zinc-500 text-sm">
              Track dev, staging, and production environments within each
              project.
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5">
            <h3 className="font-medium text-zinc-200 mb-2">Team Access</h3>
            <p className="text-zinc-500 text-sm">
              Invite team members and control who can view or modify project
              settings.
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-5">
            <h3 className="font-medium text-zinc-200 mb-2">Migration Tracking</h3>
            <p className="text-zinc-500 text-sm">
              Visual progress tracking for multi-phase migration projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
