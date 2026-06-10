import Navigation from '@/components/Navigation';
import PricingSection from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navigation />
      <div className="pt-12">
        <PricingSection />
      </div>
      <Footer />
    </div>
  );
}
