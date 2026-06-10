import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
          Ready to Get Online?
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Join thousands of local businesses that trust Goon to build and manage their online presence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="btn-primary text-lg px-8 py-4">
            Start Building for Free
          </Link>
          <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors px-6 py-4">
            View Pricing &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
