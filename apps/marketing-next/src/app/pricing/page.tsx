import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pricing", description: "InfraIQ pricing plans." };

export default function PricingPage() {
  return (
    <>
      <section className="py-16 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">Start free, upgrade when you need more.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Get started</p>
              <div className="mb-6"><span className="text-5xl font-bold">$0</span><span className="text-gray-500">/month</span></div>
              <a href="/start/" className="block w-full text-center border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-semibold">Get Started</a>
            </div>
            <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-2xl p-8 relative scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Full toolkit</p>
              <div className="mb-6"><span className="text-5xl font-bold">$499</span><span className="text-gray-500">/month</span></div>
              <a href="/start/" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">Start Free Trial</a>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">All 7 tools</p>
              <div className="mb-6"><span className="text-5xl font-bold">$2,499</span><span className="text-gray-500">/month</span></div>
              <a href="mailto:sales@autonops.io" className="block w-full text-center border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-semibold">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
