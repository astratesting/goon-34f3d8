import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="text-2xl font-heading font-bold text-violet-500">
              Goon
            </Link>
            <p className="text-gray-500 text-sm mt-2">
              We build websites for local businesses.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Templates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Goon. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
