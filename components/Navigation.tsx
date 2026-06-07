"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-400">
          goon
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/pricing" className="text-gray-300 hover:text-white transition">
            Pricing
          </Link>

          {session ? (
            <>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="text-gray-300 hover:text-white transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white transition">
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-green-400 text-black font-bold rounded-lg hover:bg-green-500 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
