"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Trade with Confidence?
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          Join Goon today. Free forever, upgrade when you're ready.
        </p>
        <Link
          href="/register"
          className="inline-block px-10 py-5 bg-green-400 text-black font-bold text-xl rounded-lg hover:bg-green-500 transition"
        >
          Create Free Account
        </Link>
      </div>
    </section>
  );
}
