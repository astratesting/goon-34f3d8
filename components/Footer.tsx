'use client'

import { Twitter, Linkedin, Github, Mail } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Waitlist', href: '#waitlist' },
    { label: 'Changelog', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Security', href: '#' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative bg-near-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-flame-orange to-vivid-magenta rounded-sm transform rotate-45" />
                <div className="absolute inset-1 bg-near-black rounded-sm flex items-center justify-center">
                  <span className="font-archivo text-white text-sm">G</span>
                </div>
              </div>
              <span className="font-archivo text-xl tracking-tight text-white">GOON</span>
            </a>
            <p className="text-white/50 text-sm mb-6">
              The AI-powered launch platform for non-technical founders.
              Idea to revenue in days, not years.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-flame-orange transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Goon Labs, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-xs">Made for the</span>
            <span className="text-flame-orange text-xs font-bold">BOLD</span>
            <span className="text-white/30 text-xs">FRONTIER</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
