import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import SocialProof from '@/components/SocialProof';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navigation />
      <Hero />
      <Features />
      <SocialProof />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
