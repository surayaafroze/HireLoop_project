"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // আপনার better-auth ক্লায়েন্ট পাথ

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Better Auth সেশন এবং ইউজার ডাটা রিড করা
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const menuItems = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
  ];

  // ড্রপডাউনের বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার লজিক
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // লগআউট হ্যান্ডলার
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsUserDropdownOpen(false);
          router.push("/"); // লগআউট হলে হোমপেজে রিডাইরেক্ট হবে
        },
      },
    });
  };

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

          {/* Right Side: Links, Divider, and Actions */}
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

            {/* Vertical Divider (Hidden on mobile when logged out) */}
            <div className="hidden sm:block h-5 w-[1px] bg-neutral-700" />

            {/* Dynamic Auth Section */}
            {isPending ? (
              // লোডিং স্টেট (Better Auth সেশন চেক করার সময় একটি ব্ল্যাঙ্ক স্পেস বা ছোট স্কেলেটন রাখবে)
              <div className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse hidden sm:block" />
            ) : user ? (
              // ১. ইউজার লগইন থাকলে এই প্রোফাইল ড্রপডাউন দেখাবে
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none group"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-neutral-700 group-hover:border-neutral-500 transition-colors"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white border border-neutral-700 group-hover:border-neutral-500 transition-colors">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden md:block text-sm text-neutral-300 group-hover:text-white transition-colors max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown Menu Element */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#241A1A] border border-neutral-800 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-4 py-2 border-b border-neutral-800/60">
                      <p className="text-xs text-neutral-500 truncate">Signed in as</p>
                      <p className="text-xs text-neutral-300 font-medium truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs sm:text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs sm:text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm text-red-400 hover:bg-neutral-800 hover:text-red-300 transition-colors border-t border-neutral-800/60 mt-1"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // ২. ইউজার লগআউট থাকলে আগের সাইন-ইন এবং সাইন-আপ বাটন জোড়া দেখাবে
              <>
                {/* Sign In Link */}
                <Link
                  href="/signin"
                  className="text-[#6366f1] hover:text-[#818cf8] transition-colors text-sm font-medium whitespace-nowrap"
                >
                  Sign In
                </Link>

                {/* Get Started Button */}
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/10 hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Get Started
                </Link>
              </>
            )}

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