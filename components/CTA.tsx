'use client'

import { useState } from 'react'
import { ArrowRight, Send, CheckCircle, Loader2 } from 'lucide-react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="waitlist" className="relative py-24 sm:py-32 bg-near-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Prism gradient effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-prism-gradient opacity-20" />
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-flame-orange/30 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-vivid-magenta/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-acid-green/20 rounded-full blur-[100px]" />

        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass border border-white/10 rounded-sm p-8 sm:p-12 lg:p-16">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-10">
                {/* Prism decoration */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-12 h-12 animate-float">
                    <div className="absolute inset-0 bg-gradient-to-br from-flame-orange via-vivid-magenta to-acid-green transform rotate-45" />
                    <div className="absolute inset-1 bg-near-black" />
                    <div className="absolute inset-2 bg-gradient-to-br from-flame-orange via-vivid-magenta to-acid-green transform rotate-45 opacity-80" />
                  </div>
                </div>

                <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl text-white mb-4">
                  READY TO LAUNCH?
                </h2>
                <p className="text-lg text-white/60 max-w-xl mx-auto">
                  Join 2,000+ founders who stopped learning to code and started building.
                  Early access opens soon.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
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
                    disabled={isSubmitting}
                    className="btn-lift px-8 py-4 bg-flame-orange text-white font-bold rounded-sm flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-white/40 text-center">
                  By joining, you agree to receive updates about Goon. Unsubscribe anytime.
                </p>
              </form>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-10 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <CheckCircle className="w-4 h-4 text-acid-green" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <CheckCircle className="w-4 h-4 text-acid-green" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <CheckCircle className="w-4 h-4 text-acid-green" />
                  <span>2,000+ in line</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              {/* Success state */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-acid-green/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-acid-green" />
                </div>
              </div>
              <h3 className="display-heading text-3xl text-white mb-4">
                YOU&apos;RE ON THE LIST!
              </h3>
              <p className="text-white/60 max-w-md mx-auto mb-8">
                Welcome to the Bold Frontier. We&apos;ll be in touch soon with your early access invitation.
              </p>
              <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
                <Send className="w-4 h-4" />
                <span>Check your inbox for confirmation</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
