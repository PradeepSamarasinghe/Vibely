import React from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Vibely</h2>
          <p className="text-sm">
            Connect, share, and grow with your community. Vibely is your space to
            express and discover.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/support">Support</Link></li>
          </ul>
        </div>

        {/* Legal / Policies */}
        <div>
          <h3 className="font-semibold text-white mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/cookies">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank">
              <Image src="/facebook.png" alt="Facebook" width={28} height={28} />
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <Image src="/youtube.png" alt="YouTube" width={28} height={28} />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Image src="/instagram.png" alt="Instagram" width={28} height={28} />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <Image src="/linkedin.png" alt="LinkedIn" width={28} height={28} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Vibely. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
