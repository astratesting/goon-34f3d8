import Link from 'next/link';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium">
          We build websites for local businesses
        </div>
        <h1 className="text-5xl md:text-7xl font-heading font-extrabold leading-tight mb-6">
          Your Business Deserves
          <span className="block bg-gradient-to-r from-violet-500 to-coral-500 bg-clip-text text-transparent">
            A Great Website
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Goon finds local companies without websites and builds them a professional site. Zero effort for business owners, maximum online presence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="btn-primary text-lg px-8 py-4">
            Get Your Free Website
          </Link>
          <Link href="#features" className="text-gray-400 hover:text-white transition-colors px-6 py-4">
            Learn More &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
