'use client'

import { ReactNode } from 'react'
import {
  Bot,
  Code2,
  Zap,
  Shield,
  Target,
  TrendingUp,
  Sparkles,
  BrainCircuit,
  CheckCircle
} from 'lucide-react'

interface FeatureCardProps {
  icon: ReactNode
  eyebrow: string
  title: string
  description: string
  highlights: string[]
  accentColor: string
}

function FeatureCard({ icon, eyebrow, title, description, highlights, accentColor }: FeatureCardProps) {
  return (
    <div className="group relative glass rounded-sm p-8 hover:bg-white/5 transition-all duration-500">
      {/* Accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor} rounded-t-sm opacity-0 group-hover:opacity-100 transition-opacity`} />

      {/* Icon */}
      <div className={`w-12 h-12 mb-6 flex items-center justify-center rounded-sm ${accentColor} bg-opacity-20`}>
        <div className="text-white">{icon}</div>
      </div>

      {/* Eyebrow */}
      <span className={`text-xs font-bold uppercase tracking-wider ${accentColor.replace('bg-', 'text-')}`}>
        {eyebrow}
      </span>

      {/* Title */}
      <h3 className="text-2xl font-archivo text-white mt-2 mb-4">{title}</h3>

      {/* Description */}
      <p className="text-white/60 mb-6 leading-relaxed">{description}</p>

      {/* Highlights */}
      <ul className="space-y-3">
        {highlights.map((highlight, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-white/70">
            <CheckCircle className={`w-4 h-4 ${accentColor.replace('bg-', 'text-')} mt-0.5 flex-shrink-0`} />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const features = [
  {
    icon: <Bot className="w-6 h-6" />,
    eyebrow: "The Core",
    title: "Multi-Agent Orchestration",
    description: "Three specialized AI agents working in harmony: Product strategy, Code generation, and QA testing. Not just code — a complete launch pipeline.",
    highlights: [
      "Product Agent defines scope & validates market",
      "Build Agent generates production-ready code",
      "QA Agent tests and optimizes performance"
    ],
    accentColor: "bg-flame-orange",
  },
  {
    icon: <BrainCircuit className="w-6 h-6" />,
    eyebrow: "Input",
    title: "Describe. Launch.",
    description: "No coding knowledge required. Describe your idea in plain English. Our AI translates concepts into architecture, features, and user flows.",
    highlights: [
      "Natural language idea submission",
      "AI clarifies and scopes automatically",
      "Technical architecture generated instantly"
    ],
    accentColor: "bg-vivid-magenta",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    eyebrow: "Output",
    title: "Production-Ready Code",
    description: "React, Next.js, Node — modern, scalable, maintainable. Clean architecture with best practices baked in from day one.",
    highlights: [
      "Full-stack Next.js applications",
      "Clean, documented, maintainable codebase",
      "Authentication & payments pre-configured"
    ],
    accentColor: "bg-acid-green",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    eyebrow: "Speed",
    title: "Days, Not Years",
    description: "Traditional dev cycles take 6-12 months. Goon gets you to market in under a week. Iterate fast, learn faster.",
    highlights: [
      "Average launch time: 72 hours",
      "Instant feature iterations",
      "Zero deployment complexity"
    ],
    accentColor: "bg-flame-orange",
  },
  {
    icon: <Target className="w-6 h-6" />,
    eyebrow: "Strategy",
    title: "Revenue-First Design",
    description: "Built-in monetization from the start. Stripe integration, pricing tiers, and conversion optimization included.",
    highlights: [
      "Pre-configured Stripe billing",
      "Landing page optimization built-in",
      "Analytics and tracking ready"
    ],
    accentColor: "bg-vivid-magenta",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    eyebrow: "Security",
    title: "Enterprise-Grade",
    description: "Security best practices from the ground up. SOC-2 aligned, encrypted data, and secure authentication out of the box.",
    highlights: [
      "NextAuth with secure defaults",
      "Encrypted data storage",
      "Security headers & CSP configured"
    ],
    accentColor: "bg-acid-green",
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 bg-near-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-flame-orange/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-vivid-magenta/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5">
            <Sparkles className="w-4 h-4 text-acid-green" />
            <span className="text-xs text-white/70 uppercase tracking-wider">Features</span>
          </div>
          <h2 className="display-heading text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            NOT JUST CODE.
            <br />
            <span className="gradient-text">A COMPLETE LAUNCH SYSTEM.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Stop piecing together tools, freelancers, and tutorials.
            Goon orchestrates everything — from concept to paying customers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Ready to launch? Join the waitlist below</span>
          </a>
        </div>
      </div>
    </section>
  )
}
