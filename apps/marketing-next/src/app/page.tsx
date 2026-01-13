export default function HomePage() {
  return (
    <>
      <section className="py-20 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-6">🚀 Free Beta — Q1 2026</span>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">InfraIQ</h1>
          <p className="text-2xl text-gray-500 dark:text-gray-400 mb-8">Migration as a Service</p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Migrate from Heroku to AWS in hours, not months. A complete DevOps automation platform built from real-world experience scaling infrastructure at Spotify, Capital One, and Point Digital Finance.
          </p>
          <a href="/start/" className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold transition-colors">Join the Beta</a>
        </div>
      </section>

      <section id="product" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">What We Do</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
            InfraIQ automates the painful parts of DevOps so your team can focus on building product.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center"><div className="text-4xl font-bold text-blue-600 dark:text-blue-500 mb-2">98%</div><div className="text-gray-500 dark:text-gray-400">Time Savings</div></div>
            <div className="text-center"><div className="text-4xl font-bold text-blue-600 dark:text-blue-500 mb-2">Weeks → Hours</div><div className="text-gray-500 dark:text-gray-400">Migration Time</div></div>
            <div className="text-center"><div className="text-4xl font-bold text-blue-600 dark:text-blue-500 mb-2">7</div><div className="text-gray-500 dark:text-gray-400">Integrated Tools</div></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: "🚀", name: "MigrateIQ", desc: "Automated cloud migration from Heroku, AWS, GCP, or Azure.", href: "/migrateiq/", color: "blue" },
              { emoji: "🔍", name: "VerifyIQ", desc: "Infrastructure verification. Security scanning, cost optimization, drift detection.", href: "/verifyiq/", color: "amber" },
              { emoji: "📝", name: "CodifyIQ", desc: "Transform existing cloud infrastructure into Infrastructure as Code.", href: "/codifyiq/", color: "violet" },
              { emoji: "🔒", name: "ComplyIQ", desc: "Continuous compliance automation. SOC2, ISO27001, HIPAA evidence collection.", href: "/complyiq/", color: "emerald" },
              { emoji: "🗄️", name: "DataIQ", desc: "Zero-downtime database migrations with self-healing and automated cutover.", href: "/dataiq/", color: "cyan" },
              { emoji: "🔑", name: "SecureIQ", desc: "Secret discovery and management. Find, classify, and map all secrets.", href: "/secureiq/", color: "rose" },
              { emoji: "🎭", name: "Tessera", desc: "AI-powered monolith to microservices transformation.", href: "/tessera/", color: "fuchsia" },
            ].map((tool) => (
              <a key={tool.name} href={tool.href} className={`block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-${tool.color}-500 dark:hover:border-${tool.color}-500 transition-colors group`}>
                <h3 className={`text-lg font-semibold mb-2 group-hover:text-${tool.color}-600 dark:group-hover:text-${tool.color}-400 transition-colors`}>{tool.emoji} {tool.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{tool.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="background" className="py-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Built by Engineers, for Engineers</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
            InfraIQ codifies patterns proven at scale. Created by Jason Boykin, a Lead DevOps Engineer.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { company: "Spotify", stat: "1.1B monthly downloads", role: "Led podcast infrastructure" },
              { company: "Capital One", stat: "First 100% cloud bank", role: "Cloud Engineering" },
              { company: "Point Digital Finance", stat: "$4B fintech", role: "Lead DevOps" },
              { company: "NSA / U.S. Army", stat: "DoD compliance", role: "Systems Engineering" },
            ].map((cred) => (
              <div key={cred.company} className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-500 mb-1">{cred.company}</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{cred.stat}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{cred.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="signup" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Beta</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Free access through Q1 2026.</p>
          <a href="/start/" className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold transition-colors">Request Beta Access</a>
        </div>
      </section>
    </>
  );
}
