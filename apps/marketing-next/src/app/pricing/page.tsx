"use client";

import { useState } from "react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <>
      {/* Hero */}
      <section className="py-16 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Choose Your DevOps Autopilot</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">Save 20% with annual billing.</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* Billing Toggle */}
          <div className="flex justify-center items-center gap-4 mb-10">
            <span className={`text-sm ${!isAnnual ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-14 h-7 rounded-full relative transition-colors ${isAnnual ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
              <span 
                className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${isAnnual ? 'translate-x-8' : 'translate-x-1'}`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
              Annual
            </span>
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Save 20%
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pro Tier */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Core migration & compliance toolkit</p>
              <div className="mb-6">
                <span className="text-5xl font-bold">${isAnnual ? '799' : '999'}</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
                {isAnnual && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Billed annually ($9,588/year)</p>
                )}
              </div>
              <a 
                href="/start/" 
                className="block w-full text-center border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-lg font-semibold transition-colors mb-6"
              >
                Get Started
              </a>
              <ul className="space-y-3">
                <Feature>MigrateIQ — Cloud migrations</Feature>
                <Feature>CodifyIQ — Infrastructure as Code</Feature>
                <Feature>VerifyIQ — Security scanning</Feature>
                <Feature>ComplyIQ — Compliance automation</Feature>
                <Feature>Generate production Terraform</Feature>
                <Feature>SOC2 evidence collection</Feature>
                <Feature>Slack support</Feature>
              </ul>
            </div>

            {/* Team Tier */}
            <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-2xl p-8 relative md:scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Team</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Full toolkit</p>
              <div className="mb-6">
                <span className="text-5xl font-bold">${isAnnual ? '4,000' : '5,000'}</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
                {isAnnual && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Billed annually ($48,000/year)</p>
                )}
              </div>
              <a 
                href="/start/" 
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors mb-6"
              >
                Start Free Trial
              </a>
              <ul className="space-y-3">
                <Feature>MigrateIQ — Cloud migrations</Feature>
                <Feature>CodifyIQ — Infrastructure as Code</Feature>
                <Feature>VerifyIQ — Security scanning</Feature>
                <Feature>ComplyIQ — Compliance automation</Feature>
                <Feature>DataIQ — Zero-downtime DB migrations</Feature>
                <Feature>SecureIQ — Secret discovery & management</Feature>
                <Feature>Tessera — AI monolith decomposition</Feature>
                <Feature>Priority Slack support</Feature>
              </ul>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">All 7 tools + enterprise features</p>
              <div className="mb-6">
                <p className="text-3xl font-bold">Contact for Pricing</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Available Q2 2026</p>
              </div>
              <a 
                href="mailto:jason@autonops.io?subject=Enterprise%20Inquiry" 
                className="block w-full text-center border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-lg font-semibold transition-colors mb-6"
              >
                Contact Sales
              </a>
              <ul className="space-y-3">
                <Feature>MigrateIQ — Cloud migrations</Feature>
                <Feature>CodifyIQ — Infrastructure as Code</Feature>
                <Feature>VerifyIQ — Security scanning</Feature>
                <Feature>ComplyIQ — Compliance automation</Feature>
                <Feature>DataIQ — Zero-downtime DB migrations</Feature>
                <Feature>SecureIQ — Secret discovery & management</Feature>
                <Feature>Tessera — AI monolith decomposition</Feature>
                <li className="font-semibold text-sm pt-4">Enterprise Features</li>
                <Feature>Kubernetes support</Feature>
                <Feature>SSO / SAML</Feature>
                <Feature>Priority support</Feature>
                <Feature>Dedicated onboarding</Feature>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Value Comparison */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Why InfraIQ pays for itself</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 text-center mb-12">Compare the cost of alternatives</p>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex justify-between px-6 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">Alternative</span>
              <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">Typical Cost</span>
            </div>
            <ComparisonRow alternative="Senior DevOps engineer" cost="$150-250K/year" />
            <ComparisonRow alternative="Migration consultant" cost="$200-400/hour" />
            <ComparisonRow alternative="SOC2 compliance tools (Vanta, Drata)" cost="$10-30K/year" />
            <ComparisonRow alternative="Heroku migration agency" cost="$25-100K/project" />
            <div className="flex justify-between px-6 py-5 bg-blue-600 text-white">
              <span className="font-semibold">InfraIQ Pro</span>
              <span className="font-semibold">$9,588/year</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <FAQ 
              question="What's included in the free trial?"
              answer="You get full access to Team features for 30 days. No credit card required. After the trial, choose the plan that fits your needs."
            />
            <FAQ 
              question="Can I switch plans later?"
              answer="Yes, upgrade or downgrade anytime. When upgrading, you'll be prorated. When downgrading, changes take effect at the next billing cycle."
            />
            <FAQ 
              question="Do you offer refunds?"
              answer="Yes, we offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund."
            />
            <FAQ 
              question="Is my data secure?"
              answer="InfraIQ runs locally on your machine. Your credentials, infrastructure data, and configurations never leave your environment."
            />
            <FAQ 
              question="What payment methods do you accept?"
              answer="We accept all major credit cards. For Enterprise annual contracts, we also accept wire transfers and invoicing."
            />
            <FAQ 
              question="Do you offer startup discounts?"
              answer="Yes! Early-stage startups may qualify for extended trials or discounted rates. Contact us to learn more."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 text-center">
        <div className="max-w-[600px] mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to automate your DevOps?</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">Start your free trial today. No credit card required.</p>
          <a 
            href="/start/" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Start Free Trial
          </a>
        </div>
      </section>
    </>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm">
      <span className="text-green-500 font-bold">✓</span>
      <span>{children}</span>
    </li>
  );
}

function ComparisonRow({ alternative, cost }: { alternative: string; cost: string }) {
  return (
    <div className="flex justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <span>{alternative}</span>
      <span className="font-semibold text-gray-500 dark:text-gray-400">{cost}</span>
    </div>
  );
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <div>
      <h4 className="font-semibold mb-2">{question}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{answer}</p>
    </div>
  );
}
