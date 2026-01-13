"use client";

const steps = [
  { num: "01", title: "Scan", desc: "Point CodifyIQ at your AWS/GCP/Azure account. We discover all resources." },
  { num: "02", title: "Analyze", desc: "We map dependencies between resources and identify relationships." },
  { num: "03", title: "Generate", desc: "Get production-ready Terraform with proper module structure." },
  { num: "04", title: "Import", desc: "Run the generated import script. Your infra is now managed by Terraform." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative bg-white dark:bg-slate-950">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">From Console to Code in Minutes</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="text-center p-6">
              <div className="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-4">{s.num}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{s.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
