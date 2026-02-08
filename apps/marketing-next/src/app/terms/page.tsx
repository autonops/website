import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service", description: "InfraIQ terms of service." };

export default function TermsPage() {
  return (
    <article className="py-16">
      <div className="max-w-[800px] mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-12">Please read these terms carefully before using InfraIQ.</p>

        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-12">
          <h3 className="text-emerald-500 font-semibold mb-2">📋 Summary</h3>
          <p className="text-gray-600 dark:text-gray-400">InfraIQ is a DevOps automation platform provided by Autonops Labs, Inc. By using our software or services, you agree to these terms. The CLI runs locally on your infrastructure — you retain full ownership of your data.</p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">By accessing or using InfraIQ (the &ldquo;Service&rdquo;), including any software, tools, APIs, documentation, or websites provided by Autonops Labs, Inc. (&ldquo;Autonops,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms.</p>
          <p className="text-gray-600 dark:text-gray-300">If you do not agree to these Terms, do not use the Service.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">InfraIQ is a suite of DevOps automation tools including MigrateIQ, VerifyIQ, CodifyIQ, ComplyIQ, DataIQ, SecureIQ, and Tessera. The Service may be delivered as a command-line interface (CLI), web dashboard, API, or Docker image.</p>
          <p className="text-gray-600 dark:text-gray-300">We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">3. Accounts and Registration</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">To access certain features, you may need to create an account or provide a work email address. You agree to provide accurate, current, and complete information and to keep your account credentials secure.</p>
          <p className="text-gray-600 dark:text-gray-300">You are responsible for all activity that occurs under your account. Notify us immediately at <a href="mailto:support@autonops.io" className="text-blue-500 hover:underline">support@autonops.io</a> if you suspect unauthorized use.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">4. License and Usage Rights</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">Subject to these Terms and payment of applicable fees, we grant you a limited, non-exclusive, non-transferable, revocable license to use the Service for your internal business purposes during the applicable subscription term.</p>
          <p className="text-gray-600 dark:text-gray-300 mb-3">You may not:</p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
            <li>Reverse engineer, decompile, or disassemble the Service</li>
            <li>Sublicense, resell, or redistribute the Service to third parties</li>
            <li>Use the Service to build a competing product</li>
            <li>Remove or alter any proprietary notices or labels</li>
            <li>Exceed the activation limits of your license tier</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">5. Free Trials and Beta Access</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">We may offer free trials or beta access at our discretion. Trial and beta features are provided &ldquo;as is&rdquo; without warranty. We reserve the right to modify or terminate trial and beta programs at any time.</p>
          <p className="text-gray-600 dark:text-gray-300">At the end of a trial period, continued use requires a paid subscription.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">6. Payment Terms</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">Paid subscriptions are billed in advance on a monthly or annual basis depending on the plan selected. All fees are non-refundable except as described in our 30-day money-back guarantee or as required by law.</p>
          <p className="text-gray-600 dark:text-gray-300 mb-3">We use Stripe to process payments. By providing payment information, you agree to Stripe&rsquo;s <a href="https://stripe.com/legal" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Terms of Service</a>.</p>
          <p className="text-gray-600 dark:text-gray-300">We reserve the right to change pricing with 30 days&rsquo; written notice. Price changes will take effect at the start of your next billing cycle.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">7. Cancellation and Refunds</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. No partial refunds are issued for unused time within a billing cycle.</p>
          <p className="text-gray-600 dark:text-gray-300">We offer a 30-day money-back guarantee on all new paid subscriptions. Contact <a href="mailto:billing@autonops.io" className="text-blue-500 hover:underline">billing@autonops.io</a> to request a refund within this period.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">8. Your Data</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">InfraIQ&rsquo;s CLI tools run locally on your infrastructure. Your cloud credentials, infrastructure configurations, source code, and scan results remain on your systems and are not transmitted to Autonops unless you explicitly opt in (e.g., using the <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm">--sync</code> flag).</p>
          <p className="text-gray-600 dark:text-gray-300">You retain all rights to your data. We do not claim ownership of any data you process through the Service. See our <a href="/privacy/" className="text-blue-500 hover:underline">Privacy Policy</a> for details on what data we collect and how it is used.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">9. Acceptable Use</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">You agree not to use the Service to:</p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on the intellectual property rights of others</li>
            <li>Gain unauthorized access to systems or networks</li>
            <li>Distribute malware or malicious code</li>
            <li>Interfere with or disrupt the Service or its infrastructure</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">10. Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">The Service, including all software, documentation, branding, and content, is owned by Autonops Labs, Inc. and is protected by copyright, trademark, and other intellectual property laws.</p>
          <p className="text-gray-600 dark:text-gray-300">Terraform configurations, scripts, and other outputs generated by the Service for your infrastructure are yours to use without restriction.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">11. Disclaimer of Warranties</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
          <p className="text-gray-600 dark:text-gray-300">We do not warrant that the Service will be uninterrupted, error-free, or that generated configurations will be free of issues. You are responsible for reviewing and testing all outputs before applying them to production infrastructure.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">12. Limitation of Liability</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">TO THE MAXIMUM EXTENT PERMITTED BY LAW, AUTONOPS LABS, INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.</p>
          <p className="text-gray-600 dark:text-gray-300">OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING UNDER THESE TERMS SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">13. Indemnification</h2>
          <p className="text-gray-600 dark:text-gray-300">You agree to indemnify and hold harmless Autonops Labs, Inc. and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys&rsquo; fees) arising from your use of the Service, your violation of these Terms, or your violation of any third-party rights.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">14. Governing Law</h2>
          <p className="text-gray-600 dark:text-gray-300">These Terms shall be governed by and construed in accordance with the laws of the State of Minnesota, without regard to conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Ramsey County, Minnesota.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">15. Changes to These Terms</h2>
          <p className="text-gray-600 dark:text-gray-300">We may update these Terms from time to time. If we make material changes, we will notify you by email or through the Service. Your continued use of the Service after changes take effect constitutes acceptance of the revised Terms.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">16. Contact</h2>
          <p className="text-gray-600 dark:text-gray-300">If you have questions about these Terms, contact us at <a href="mailto:support@autonops.io" className="text-blue-500 hover:underline">support@autonops.io</a>.</p>
        </section>

        <p className="text-sm text-gray-400 mt-12"><em>Last updated: February 2026</em></p>
      </div>
    </article>
  );
}
