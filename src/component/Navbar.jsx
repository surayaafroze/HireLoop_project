"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="bg-[#231A1A] border-b border-neutral-800 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Hamburger (Mobile) & Logo */}
          <div className="flex items-center gap-4">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 font-bold text-2xl tracking-tight">
              <span className="text-[#38bdf8]">hire</span>
              <span className="text-[#f97316]">loop</span>
            </Link>
          </div>

          {/* Right Side: Links, Divider, and Buttons grouped together */}
          <div className="flex items-center gap-6 ml-auto">
            
            {/* Desktop Navigation Links (Hidden on mobile) */}
            <div className="hidden sm:flex items-center gap-6">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-neutral-300 hover:text-white transition-colors text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Vertical Divider (Hidden on mobile) */}
            <div className="hidden sm:block h-5 w-[1px] bg-neutral-700" />

            {/* Sign In Link */}
            <Link
              href="/sign-in"
              className="text-[#6366f1] hover:text-[#818cf8] transition-colors text-sm font-medium whitespace-nowrap"
            >
              Sign In
            </Link>

            {/* Get Started Button */}
            <Link
              href="/get-started"
              className="bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/10 hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Responsive Menu Drawer */}
      {isMenuOpen && (
        <div className="sm:hidden bg-[#231A1A] border-b border-neutral-800" id="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-neutral-200 hover:text-white py-2.5 text-base font-medium border-b border-neutral-800/50 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}