'use client'

import { Check, Zap } from 'lucide-react'

const plans = [
  {
    name: "Free",
    description: "Try before you build",
    price: "$0",
    period: "/mo",
    features: [
      "1 concept submission",
      "Basic AI idea validation",
      "Architecture preview",
      "Community access",
      "Email support",
    ],
    cta: "Get Started Free",
    ctaStyle: "outline",
    popular: false,
  },
  {
    name: "Pro",
    description: "Launch your first product",
    price: "$49",
    period: "/mo",
    features: [
      "Unlimited concept submissions",
      "Full-stack app generation",
      "Multi-agent orchestration",
      "Stripe integration",
      "Custom domain deployment",
      "Priority support",
      "Code export",
    ],
    cta: "Start Building",
    ctaStyle: "primary",
    popular: true,
  },
  {
    name: "Business",
    description: "Scale your portfolio",
    price: "$99",
    period: "/mo",
    features: [
      "Everything in Pro",
      "Multiple concurrent projects",
      "Advanced analytics",
      "Custom integrations",
      "White-label options",
      "Dedicated account manager",
      "API access",
    ],
    cta: "Contact Sales",
    ctaStyle: "outline",
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-near-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-vivid-magenta/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-flame-orange/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-heading text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            SIMPLE PRICING.
            <br />
            <span className="gradient-text">SERIOUS RESULTS.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            From first concept to revenue-generating business. Choose the plan that matches your ambition.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-sm p-8 ${
                plan.popular
                  ? 'bg-white/10 border-2 border-flame-orange'
                  : 'glass border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-flame-orange px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Zap className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-archivo text-white mb-2">{plan.name}</h3>
                <p className="text-white/50 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-archivo text-white">{plan.price}</span>
                  <span className="text-white/50">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-3 text-sm text-white/70">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-flame-orange' : 'text-acid-green'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#waitlist"
                className={`block w-full text-center py-4 rounded-sm font-bold transition-all ${
                  plan.ctaStyle === 'primary'
                    ? 'bg-flame-orange text-white hover:bg-flame-orange/90 btn-lift'
                    : 'border border-white/20 text-white hover:bg-white/5'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm">
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  )
}
