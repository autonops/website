import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About - Autonops Labs",
  description: "About Autonops Labs and InfraIQ. Founded by Jason Boykin, a veteran DevOps engineer who scaled infrastructure at Spotify, Capital One, and the DoD/NSA.",
};

const credentials = [
  {
    company: "Spotify",
    stat: "Scaled infrastructure 5x",
    role: "Led post-acquisition migration from private datacenter to GCP, supporting billions of downloads monthly",
  },
  {
    company: "Capital One",
    stat: "First 100% cloud bank",
    role: "Led large-scale datacenter to AWS cloud migration",
  },
  {
    company: "DoD/NSA",
    stat: "Security-first engineering",
    role: "Numerous combat deployments and operations building mission-critical systems",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gray-50 dark:bg-slate-950">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px]" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Autonops
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              DevOps automation built from real-world experience at enterprise scale.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white dark:bg-slate-900/50">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/images/jason-boykin.jpg"
                alt="Jason Boykin, Founder of Autonops"
                width={280}
                height={280}
                className="rounded-2xl border-4 border-gray-200 dark:border-gray-700 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                Jason Boykin
              </h2>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-3">
                Founder & CEO, Autonops Labs
              </p>
              <a
                href="https://linkedin.com/in/JasonBoykin2018"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors mb-6"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </a>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  U.S. Army veteran. Former infrastructure lead at Spotify and Capital One. 
                  I've spent my career building systems that don't fail, from military intelligence 
                  platforms to podcast infrastructure serving a billion downloads a month.
                </p>
                <p>
                  InfraIQ brings that experience to companies who need enterprise-grade DevOps 
                  without the enterprise-sized team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Built This For */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Who We Built This For
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              InfraIQ is built for growth-stage startups and companies who want DevOps capabilities 
              without a dedicated team. If you're scaling fast, migrating platforms, or preparing 
              for your first compliance audit, these are the tools that get you there without 
              hiring expensive consultants or waiting months for results.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-24 bg-white dark:bg-slate-900/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Built from Experience At
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {credentials.map((cred) => (
              <div
                key={cred.company}
                className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 text-center"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {cred.company}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                  {cred.stat}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {cred.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
