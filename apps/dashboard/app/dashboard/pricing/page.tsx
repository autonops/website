"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Loader2, ExternalLink } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.autonops.io";

interface PricingTier {
  key: string;
  name: string;
  price: number | null;
  interval: string | null;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

const pricingTiers: PricingTier[] = [
  {
    key: "pro_monthly",
    name: "Pro",
    price: 499,
    interval: "month",
    description: "For individual engineers and small projects",
    features: [
      "All 7 InfraIQ tools",
      "Unlimited scans",
      "Dashboard access",
      "Email support",
      "2 seat license",
    ],
    buttonText: "Upgrade to Pro",
  },
  {
    key: "team_monthly",
    name: "Team",
    price: 2499,
    interval: "month",
    description: "For growing teams with shared infrastructure",
    features: [
      "Everything in Pro",
      "10 seat license",
      "Priority support",
      "Team management",
      "Audit logs",
      "SSO integration",
    ],
    highlighted: true,
    buttonText: "Upgrade to Team",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: null,
    interval: null,
    description: "For large organizations with custom needs",
    features: [
      "Everything in Team",
      "Unlimited seats",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
    ],
    buttonText: "Contact Us",
  },
];

export default function PricingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const checkoutCancelled = searchParams.get("checkout") === "cancelled";

  const handleUpgrade = async (tier: PricingTier) => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    // Enterprise tier - redirect to contact
    if (tier.key === "enterprise") {
      window.location.href = "mailto:jason@autonops.io?subject=InfraIQ%20Enterprise%20Inquiry";
      return;
    }

    setLoadingTier(tier.key);

    try {
      const response = await fetch(`${API_URL}/api/checkout/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_key: tier.key,
          customer_email: user.primaryEmailAddress?.emailAddress,
          clerk_id: user.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to create checkout session");
      }

      const data = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = data.checkout_url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setLoadingTier(null);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Your Plan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Scale your DevOps capabilities with InfraIQ. All plans include a 30-day 
          money-back guarantee.
        </p>
        {checkoutCancelled && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg inline-block">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              Checkout was cancelled. Feel free to try again when you&apos;re ready.
            </p>
          </div>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingTiers.map((tier) => (
          <div
            key={tier.key}
            className={`relative rounded-2xl border ${
              tier.highlighted
                ? "border-blue-500 dark:border-blue-400 shadow-lg shadow-blue-500/10"
                : "border-gray-200 dark:border-gray-700"
            } bg-white dark:bg-gray-800 p-8 flex flex-col`}
          >
            {/* Popular Badge */}
            {tier.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-blue-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            {/* Tier Name */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {tier.name}
            </h2>

            {/* Price */}
            <div className="mb-4">
              {tier.price !== null ? (
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${tier.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    /{tier.interval}
                  </span>
                </div>
              ) : (
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  Custom
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {tier.description}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-grow">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => handleUpgrade(tier)}
              disabled={loadingTier === tier.key}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center ${
                tier.highlighted
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : tier.key === "enterprise"
                  ? "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                  : "bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loadingTier === tier.key ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : tier.key === "enterprise" ? (
                <>
                  {tier.buttonText}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </>
              ) : (
                tier.buttonText
              )}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ / Trust Signals */}
      <div className="mt-16 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Questions?{" "}
          <a
            href="mailto:jason@autonops.io"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Contact us
          </a>
          {" "}or check out our{" "}
          <a
            href="https://docs.autonops.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            documentation
          </a>
          .
        </p>
      </div>
    </div>
  );
}
