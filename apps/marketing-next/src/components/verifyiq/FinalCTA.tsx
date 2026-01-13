"use client";

export default function FinalCTA() {
  return (
    <section className="py-24 relative bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl blur-xl" />
          <div className="relative bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 border border-amber-200 dark:border-amber-500/20 rounded-3xl p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Stop Finding Issues in Production</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Catch security issues, cost waste, and drift before they become incidents.</p>
            <a href="/start/" className="inline-block px-8 py-4 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-black font-semibold rounded-lg transition-all hover:scale-105">Start Free Trial</a>
          </div>
        </div>
      </div>
    </section>
  );
}
