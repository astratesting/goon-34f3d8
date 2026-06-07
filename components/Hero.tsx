'use client'

import { useState } from 'react'
import { ArrowRight, Sparkles, Zap, Rocket } from 'lucide-react'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-near-black">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-flame-orange/20 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-vivid-magenta/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-acid-green/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-flame-orange" />
            <span className="text-sm text-white/80">Now in private beta</span>
          </div>

          {/* Prism decoration */}
          <div className="flex justify-center mb-8">
            <div className="relative w-16 h-16 md:w-24 md:h-24">
              <div className="absolute inset-0 bg-gradient-to-br from-flame-orange via-vivid-magenta to-acid-green transform rotate-45 opacity-80" />
              <div className="absolute inset-2 bg-near-black" />
              <div className="absolute inset-3 bg-gradient-to-br from-flame-orange via-vivid-magenta to-acid-green transform rotate-45 opacity-60" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="display-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-6">
            IDEA TO
            <br />
            <span className="gradient-text">REVENUE</span>
          </h1>

          {/* Value Prop */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/70 mb-6 max-w-2xl mx-auto font-satoshi">
            Stop learning to code.
            <br className="sm:hidden" />{' '}
            <span className="text-white font-medium">Start earning revenue.</span>
          </p>

          {/* Sub-description */}
          <p className="text-base text-white/50 mb-12 max-w-xl mx-auto">
            The AI platform that turns non-technical founders into revenue-ready startups.
            Multi-agent orchestration — from concept to customer in days, not years.
          </p>

          {/* Email CTA */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-flame-orange focus:ring-1 focus:ring-flame-orange transition-all"
                />
                <button
                  type="submit"
                  className="btn-lift px-8 py-4 bg-flame-orange text-white font-bold rounded-sm flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Join Waitlist
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white/40 mt-3">Join 2,000+ founders. No spam, unsubscribe anytime.</p>
            </form>
          ) : (
            <div className="max-w-md mx-auto mb-12 p-6 bg-acid-green/10 border border-acid-green/30 rounded-sm">
              <p className="text-acid-green font-medium">You're on the list! We'll be in touch soon.</p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap className="w-4 h-4 text-flame-orange" />
                <span className="text-2xl sm:text-3xl font-archivo text-white">3</span>
              </div>
              <p className="text-xs sm:text-sm text-white/50">Days to launch</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Rocket className="w-4 h-4 text-vivid-magenta" />
                <span className="text-2xl sm:text-3xl font-archivo text-white">500+</span>
              </div>
              <p className="text-xs sm:text-sm text-white/50">Startups launched</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Sparkles className="w-4 h-4 text-acid-green" />
                <span className="text-2xl sm:text-3xl font-archivo text-white">$2M+</span>
              </div>
              <p className="text-xs sm:text-sm text-white/50">Revenue generated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-near-black to-transparent" />
    </section>
  )
}
