import Hero from '@/components/Hero'
import Features from '@/components/Features'
import CTA from '@/components/CTA'
import Pricing from '@/components/Pricing'
import SocialProof from '@/components/SocialProof'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-near-black text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <Features />
      <SocialProof />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
