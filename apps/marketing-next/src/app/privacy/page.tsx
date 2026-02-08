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
          <p className="text-gray-600 dark:text-gray-400">InfraIQ&rsquo;s CLI runs locally on your infrastructure. Your cloud credentials, source code, and infrastructure configurations never leave your machine. We only collect what&rsquo;s necessary to operate the service — and telemetry is optional.</p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">1. Who We Are</h2>
          <p className="text-gray-600 dark:text-gray-300">Autonops Labs, Inc. (&ldquo;Autonops,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) operates the InfraIQ platform, including the CLI tools, web dashboard at app.autonops.io, marketing site at autonops.io, and related APIs. Our mailing address is 2000 County Road B2 W, Saint Paul, MN 55113. For privacy questions, contact us at <a href="mailto:support@autonops.io" className="text-blue-500 hover:underline">support@autonops.io</a>.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>

          <h3 className="text-lg font-semibold mb-3 mt-6">Account Information</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">When you sign up for InfraIQ or request beta access, we collect your name, work email address, and optionally your company name. This information is used to create your account, issue license keys, and communicate with you about the Service.</p>

          <h3 className="text-lg font-semibold mb-3 mt-6">Payment Information</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">Payment processing is handled by Stripe. We do not store your credit card numbers, bank account details, or other sensitive payment information on our servers. Stripe&rsquo;s privacy practices are governed by their <a href="https://stripe.com/privacy" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. We receive from Stripe: transaction confirmations, subscription status, and billing contact information.</p>

          <h3 className="text-lg font-semibold mb-3 mt-6">Usage and Telemetry Data</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">If telemetry is enabled, the CLI sends anonymous usage data including: which commands are run, execution duration, tool version, operating system, and general error information. Telemetry never includes your cloud credentials, infrastructure configurations, scan results, source code, or any data processed by the tools.</p>

          <h3 className="text-lg font-semibold mb-3 mt-6">License and Activation Data</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">When you activate a license, we store a hashed installation identifier, your license tier, and activation timestamp. This is used solely to enforce license terms and track active installations.</p>

          <h3 className="text-lg font-semibold mb-3 mt-6">Website Analytics and Cookies</h3>
          <p className="text-gray-600 dark:text-gray-300">We use Google Analytics to understand how visitors use our website. Google Analytics uses cookies (small text files stored on your device) to collect data such as pages visited, referral source, browser type, and approximate location. This data is aggregated and does not personally identify individual visitors. Analytics cookies are only placed after you provide consent via our cookie banner. You can decline cookies at any time, and the site will function normally without them.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">We use the information we collect to:</p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
            <li>Provide, maintain, and improve the Service</li>
            <li>Process payments and manage subscriptions</li>
            <li>Issue and validate license keys</li>
            <li>Send transactional communications (account confirmation, billing receipts, security alerts)</li>
            <li>Provide customer support</li>
            <li>Understand how our tools are used to prioritize development</li>
            <li>Detect and prevent abuse or unauthorized use</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mt-3">We do not sell your personal information to third parties. We do not use your data for advertising purposes.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">4. Data That Stays Local</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">The following data never leaves your machine unless you explicitly opt in using the <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm">--sync</code> flag:</p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
            <li>Cloud provider credentials (AWS, GCP, Azure, Heroku tokens)</li>
            <li>Infrastructure scan results and configurations</li>
            <li>Generated Terraform, Kubernetes, and Docker files</li>
            <li>Database connection strings and schema information</li>
            <li>Source code analyzed by Tessera</li>
            <li>Compliance evidence and audit reports</li>
            <li>Secret discovery results from SecureIQ</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">5. Opting Out of Telemetry</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Telemetry is enabled by default to help us improve the product. You can disable it at any time:</p>
          <code className="block bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg text-sm mb-3">export INFRAIQ_TELEMETRY=false</code>
          <p className="text-gray-600 dark:text-gray-300">When telemetry is disabled, no usage data is sent to our servers. License validation still requires periodic communication with our license server.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">We use the following third-party services that may process your data:</p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
            <li><strong>Google Analytics</strong> — Website analytics (cookie-based, requires consent)</li>
            <li><strong>Stripe</strong> — Payment processing</li>
            <li><strong>Google Cloud Platform</strong> — Infrastructure hosting for our APIs and license server</li>
            <li><strong>Vercel</strong> — Dashboard and website hosting</li>
            <li><strong>Formspree</strong> — Beta signup form submissions</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mt-3">Each of these providers has their own privacy policies. We select providers that maintain industry-standard security practices.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">7. Data Security</h2>
          <p className="text-gray-600 dark:text-gray-300">We implement industry-standard security measures to protect your information, including encryption in transit (TLS), encrypted storage for sensitive data, and access controls on our infrastructure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">8. Data Retention</h2>
          <p className="text-gray-600 dark:text-gray-300">We retain account information for as long as your account is active or as needed to provide the Service. If you cancel your subscription, we retain your account data for 90 days in case you wish to reactivate. After that period, we delete or anonymize your personal information. Telemetry data is retained in aggregate form and is not linked to individual accounts.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">9. Your Rights</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">You have the right to:</p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Export your data in a portable format</li>
            <li>Opt out of telemetry data collection</li>
            <li>Manage cookie preferences (accept or decline via the cookie banner, or clear cookies in your browser settings)</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mt-3">To exercise any of these rights, contact us at <a href="mailto:support@autonops.io" className="text-blue-500 hover:underline">support@autonops.io</a>. We will respond within 30 days.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">10. Children&rsquo;s Privacy</h2>
          <p className="text-gray-600 dark:text-gray-300">The Service is not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected information from a child, we will delete it promptly.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">11. Changes to This Policy</h2>
          <p className="text-gray-600 dark:text-gray-300">We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or through the Service. Your continued use of the Service after changes take effect constitutes acceptance of the revised policy.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">12. Contact</h2>
          <p className="text-gray-600 dark:text-gray-300">If you have questions about this Privacy Policy or our data practices, contact us at <a href="mailto:support@autonops.io" className="text-blue-500 hover:underline">support@autonops.io</a>.</p>
        </section>

        <p className="text-sm text-gray-400 mt-12"><em>Last updated: February 2026</em></p>
      </div>
    </article>
  );
}
