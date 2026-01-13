"use client";

const features = [
  { icon: "🛡️", title: "Security Scanning", description: "Detect misconfigurations, open ports, overly permissive IAM policies, and unencrypted resources before attackers do.", items: ["Public S3 buckets", "Security group rules", "IAM policy analysis", "Encryption status"] },
  { icon: "💰", title: "Cost Optimization", description: "Find idle resources, oversized instances, and unused storage eating your budget.", items: ["Unused EBS volumes", "Idle load balancers", "Oversized instances", "Reserved instance opportunities"] },
  { icon: "🔄", title: "Drift Detection", description: "Know when your infrastructure diverges from your Terraform. Catch manual changes before they cause incidents.", items: ["Resource modifications", "Deleted resources", "New untracked resources", "Configuration changes"] },
  { icon: "📋", title: "Terraform Validation", description: "Validate your Terraform before you apply. Catch issues in CI, not production.", items: ["Best practice checks", "Security rules", "Naming conventions", "Required tags"] }
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative bg-white dark:bg-slate-950">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Four Scanners, One Tool</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
              <span className="text-4xl mb-4 block">{f.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{f.description}</p>
              <div className="grid grid-cols-2 gap-2">
                {f.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                    <span className="text-amber-500">✓</span>{item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
