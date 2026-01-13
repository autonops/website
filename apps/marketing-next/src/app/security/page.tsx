import type { Metadata } from "next";
export const metadata: Metadata = { title: "Security", description: "InfraIQ security practices." };

export default function SecurityPage() {
  return (
    <article className="py-16">
      <div className="max-w-[800px] mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Security</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-12">How InfraIQ protects your infrastructure and data.</p>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-12">
          <h3 className="text-emerald-500 font-semibold mb-2">🔒 Security by Design</h3>
          <p className="text-gray-600 dark:text-gray-400">InfraIQ runs locally on your machine. Your credentials never leave your environment.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[{i:"💻",t:"Runs Locally",d:"CLI executes on your machine"},{i:"🔑",t:"No Credentials Stored",d:"We never see your cloud credentials"},{i:"📊",t:"Zero Data Access",d:"Analyzes metadata only"},{i:"🏠",t:"Your Infrastructure",d:"Terraform deploys to your account"}].map((c) => (
            <div key={c.t} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">{c.i}</div><h4 className="font-semibold mb-1">{c.t}</h4><p className="text-sm text-gray-500 dark:text-gray-400">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-12"><em>Last updated: December 2025</em></p>
      </div>
    </article>
  );
}
