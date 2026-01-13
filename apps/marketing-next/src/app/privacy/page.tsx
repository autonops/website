import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy", description: "InfraIQ privacy policy." };

export default function PrivacyPage() {
  return (
    <article className="py-16">
      <div className="max-w-[800px] mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-12">How we collect, use, and protect your information.</p>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-12">
          <h3 className="text-emerald-500 font-semibold mb-2">🛡️ Privacy First</h3>
          <p className="text-gray-600 dark:text-gray-400">The CLI runs locally. We only receive anonymous telemetry — and that is optional.</p>
        </div>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Opting Out of Telemetry</h2>
          <code className="block bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg text-sm">export INFRAIQ_TELEMETRY=false</code>
        </section>
        <p className="text-sm text-gray-400 mt-12"><em>Last updated: December 2025</em></p>
      </div>
    </article>
  );
}
