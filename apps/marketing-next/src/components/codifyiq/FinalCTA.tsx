"use client";

export default function FinalCTA() {
  return (
    <section className="py-24 relative bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-3xl blur-xl" />
          <div className="relative bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50 border border-violet-200 dark:border-violet-500/20 rounded-3xl p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your Infrastructure Deserves Version Control</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Stop managing infrastructure through the console. Get everything in Git.</p>
            <a href="/start/" className="inline-block px-8 py-4 bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400 text-white dark:text-black font-semibold rounded-lg transition-all hover:scale-105">Start Free Trial</a>
          </div>
        </div>
      </div>
    </section>
  );
}
