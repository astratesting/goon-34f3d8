import Link from 'next/link';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for trying out Goon',
    features: [
      '1 website',
      'Basic templates',
      'Goonth subdomain',
      'Standard hosting',
      'Email support',
    ],
    cta: 'Get Started',
    href: '/signup',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For growing businesses',
    features: [
      '5 websites',
      'Premium templates',
      'Custom domains',
      'Priority hosting',
      'Analytics dashboard',
      'Priority support',
    ],
    cta: 'Start Pro',
    href: '/signup',
    featured: true,
  },
  {
    name: 'Agency',
    price: '$99',
    period: '/month',
    description: 'For agencies managing clients',
    features: [
      'Unlimited websites',
      'All templates',
      'Custom domains',
      'White-label branding',
      'Advanced analytics',
      'Dedicated support',
      'API access',
    ],
    cta: 'Contact Sales',
    href: '/signup',
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border ${
                plan.featured
                  ? 'bg-gradient-to-b from-violet-500/20 to-transparent border-violet-500/50 relative'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-500 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-heading font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-heading font-extrabold">{plan.price}</span>
                {plan.period && <span className="text-gray-400">{plan.period}</span>}
              </div>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-violet-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block text-center py-3 rounded-xl font-semibold transition-all duration-200 ${
                  plan.featured
                    ? 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
