"use client";

export default function FinalCTA() {
  return (
    <section className="py-24 relative bg-gray-50 dark:bg-slate-950">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 rounded-3xl blur-xl" />
          <div className="relative bg-gradient-to-r from-fuchsia-50 to-purple-50 dark:from-fuchsia-950/50 dark:to-purple-950/50 border border-fuchsia-200 dark:border-fuchsia-500/20 rounded-3xl p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your Monolith Has an Expiration Date</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">Let AI help you find the natural service boundaries in your codebase.</p>
            <a href="/start/" className="inline-block px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-700 dark:bg-fuchsia-500 dark:hover:bg-fuchsia-400 text-white dark:text-black font-semibold rounded-lg transition-all hover:scale-105">Start Free Trial</a>
          </div>
        </div>
      </div>
    </section>
  );
}
