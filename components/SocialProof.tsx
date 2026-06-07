'use client'

import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "I spent 18 months in tutorial hell. Goon had my product live in 4 days. Now I have paying customers.",
    author: "Marcus T.",
    role: "Former Marketing Director",
    company: "Now Founder, SaaS Analytics",
    avatar: "MT",
  },
  {
    quote: "As a founder who can't code, I finally feel empowered. The multi-agent system understood my vision better than any dev agency I interviewed.",
    author: "Sarah K.",
    role: "Ex-Consultant",
    company: "Now Founder, HealthTech App",
    avatar: "SK",
  },
  {
    quote: "The code quality shocked me. Clean architecture, proper testing, production-ready from day one. This isn't prototype code — this is real.",
    author: "James L.",
    role: "Product Manager",
    company: "Launched Fintech Tool",
    avatar: "JL",
  },
]

const logos = [
  { name: "TechCrunch", featured: true },
  { name: "Product Hunt", featured: true },
  { name: "Forbes", featured: false },
  { name: "Wired", featured: false },
  { name: "The Information", featured: false },
  { name: "Fast Company", featured: false },
]

export default function SocialProof() {
  return (
    <section className="relative py-24 sm:py-32 bg-near-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-near-black via-white/[0.02] to-near-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* As Seen In */}
        <div className="text-center mb-20">
          <p className="text-sm text-white/40 uppercase tracking-widest mb-8">Featured In</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className={`text-lg sm:text-xl font-archivo transition-opacity ${
                  logo.featured ? 'text-white/80' : 'text-white/30'
                }`}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { number: "500+", label: "Startups Launched" },
            { number: "$2M+", label: "Revenue Generated" },
            { number: "72hrs", label: "Average Time to Launch" },
            { number: "94%", label: "Founder Satisfaction" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 border border-white/10 rounded-sm">
              <div className="text-3xl sm:text-4xl font-archivo text-white mb-2">{stat.number}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-1 mb-12">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-flame-orange text-flame-orange" />
            ))}
            <span className="ml-2 text-white/60">4.9/5 from 200+ founders</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="relative glass rounded-sm p-8 hover:bg-white/5 transition-all duration-500"
              >
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-white/10" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-flame-orange text-flame-orange" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-white/80 mb-8 leading-relaxed text-sm">&ldquo;{testimonial.quote}&rdquo;</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-flame-orange to-vivid-magenta flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.author}</p>
                    <p className="text-white/50 text-xs">{testimonial.role}</p>
                    <p className="text-acid-green text-xs">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-12 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>SOC 2 Type II Aligned</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>256-bit Encryption</span>
          </div>
        </div>
      </div>
    </section>
  )
}
