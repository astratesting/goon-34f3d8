"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    tier: "FREE",
    features: [
      "5 stock watchlist",
      "3 AI predictions/day",
      "7-day history",
      "Basic sentiment analysis",
    ],
    cta: "Current Plan",
    disabled: true,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    tier: "PRO",
    features: [
      "Unlimited watchlist",
      "Real-time AI signals",
      "Unlimited predictions",
      "30-day history",
      "Advanced sentiment analysis",
      "Email alerts",
    ],
    cta: "Upgrade to Pro",
    disabled: false,
    popular: true,
  },
  {
    name: "Elite",
    price: "$79",
    period: "per month",
    tier: "ELITE",
    features: [
      "Everything in Pro",
      "API access",
      "Backtesting engine",
      "Custom AI models",
      "90-day history",
      "Priority support",
      "Webhook alerts",
    ],
    cta: "Go Elite",
    disabled: false,
  },
];

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (tier: string) => {
    if (!session) {
      router.push("/register");
      return;
    }

    setLoading(tier);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-near-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400">
            Choose the plan that fits your trading style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-gray-900 rounded-2xl p-8 ${
                tier.popular ? "ring-2 ring-green-400" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold">{tier.price}</span>
                </div>
                <p className="text-gray-400">{tier.period}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(tier.tier)}
                disabled={tier.disabled || loading === tier.tier}
                className={`w-full py-3 rounded-lg font-bold transition ${
                  tier.disabled
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : tier.popular
                    ? "bg-green-400 text-black hover:bg-green-500"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {loading === tier.tier ? "Processing..." : tier.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <span>✓ No credit card required for Free</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 7-day money-back guarantee</span>
            <span>✓ Secure payment via Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
