"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative border-b border-white/20 bg-white/60 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
              V
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Vibely
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              Blog
            </Link>
            <Link href="/portfolio" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              Portfolio
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              Contact
            </Link>
            {session && (
              <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {!session ? (
              <>
                <button 
                  onClick={() => signIn()}
                  className="hidden sm:block px-4 py-2 text-gray-700 font-medium hover:text-purple-600 transition-colors"
                >
                  Sign In
                </button>
                <Link
                  href="/dashboard/signup"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <span className="hidden sm:block text-sm text-gray-600 font-medium">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Sign Out
                </button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-purple-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-white/20 pt-4">
            <Link
              href="/"
              className="block text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/blog"
              className="block text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/portfolio"
              className="block text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/contact"
              className="block text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {session && (
              <Link
                href="/dashboard"
                className="block text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}