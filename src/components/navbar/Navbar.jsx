import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      {/* Brand / Logo */}
      <div className="text-xl font-bold">
        <Link href="/">VIBELY</Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/portfolio">Portfolio</Link>
      </div>
    </nav>
  );
}

export default Navbar;
