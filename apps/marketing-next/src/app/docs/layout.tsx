"use client";

import { useState } from "react";
import { DocsSidebar, TableOfContents } from "@/components/docs";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Mobile menu button */}
      <div className="lg:hidden sticky top-16 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Documentation Menu
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-white">Documentation</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <DocsSidebar mobile onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[240px_1fr_200px] lg:gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block border-r border-gray-200 dark:border-gray-800">
            <DocsSidebar />
          </aside>

          {/* Main content */}
          <main className="min-w-0 py-8">
            <article className="prose prose-gray dark:prose-invert max-w-none">
              {children}
            </article>
          </main>

          {/* Table of contents */}
          <aside className="hidden lg:block border-l border-gray-200 dark:border-gray-800">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </div>
  );
}
