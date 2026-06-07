"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          Stop Guessing.
          <br />
          <span className="text-green-400">Start Trading.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
          AI-powered stock predictions with simplified 0-100% confidence scores.
          No more noise. Just signals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="px-8 py-4 bg-green-400 text-black font-bold text-lg rounded-lg hover:bg-green-500 transition"
          >
            Get Started Free
          </Link>
          <Link
            href="/pricing"
            className="px-8 py-4 bg-gray-800 text-white font-bold text-lg rounded-lg hover:bg-gray-700 transition"
          >
            See Pricing
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Free forever. No credit card required.
        </p>
      </div>
    </section>
  );
}
