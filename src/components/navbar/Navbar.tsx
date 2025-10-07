"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <Link href="/" className="text-xl font-bold">
        Vibely
      </Link>

      <div className="flex space-x-4">
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/portfolio">Portfolio</Link>

        {/* Auth buttons */}
        {!session ? (
          <>
            <Link
              href="/dashboard/signup"
              className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500"
            >
              Signup
            </Link>
            <button
              onClick={() => signIn()}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
            >
              Signin
            </button>
          </>
        ) : (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}
