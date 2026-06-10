import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading font-bold text-violet-500">
          Goon
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link>
          <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link>
          <Link href="/login" className="text-gray-400 hover:text-white transition-colors">Sign In</Link>
          <Link href="/signup" className="btn-primary text-sm">Get Started</Link>
        </div>
      </div>
    </nav>
  );
}
