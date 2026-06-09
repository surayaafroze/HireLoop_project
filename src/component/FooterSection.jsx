"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FooterSection() {
  const productLinks = ["Job discovery", "Worker AI", "Companies", "Salary data"];
  const navigationLinks = ["Help center", "Career library", "Contact"];
  const resourceLinks = ["Brand Guideline", "Newsroom"];

  return (
    <div className="relative bg-[#1A1212] text-white pt-32 pb-8 px-4 overflow-hidden select-none w-full">
      
      {/* Background Vertical Strips / Grid Pattern */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20 px-4 max-w-7xl mx-auto z-10">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-500 to-transparent" />
        ))}
      </div>

      {/* CTA Background Dome Glow (Using cta-bg.png) */}
      <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none z-0 opacity-50 mix-blend-screen">
        <div className="relative w-full max-w-6xl aspect-[1.8/1] sm:aspect-[2.3/1]">
          <Image
            src="/images/cta-bg.png" // আপনার ইমেজ পাথ অনুযায়ী সেট করা হয়েছে
            alt="CTA Background Glow Dome"
            fill
            priority
            className="object-contain object-top scale-110 sm:scale-100"
          />
          {/* Subtle colorful neon aura directly behind text overlay */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[60%] bg-indigo-600/30 blur-[120px] rounded-full" />
        </div>
      </div>

      {/* Inside Container */}
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        
        {/* ================= TOP CTA BANNER ================= */}
        <div className="text-center flex flex-col items-center mb-36 mt-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl text-white leading-tight mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Your next role is <br /> already looking for you
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-normal max-w-md mb-8 leading-relaxed">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/register"
              className="bg-white text-neutral-950 text-xs sm:text-sm font-medium px-6 py-3 rounded-xl hover:bg-neutral-100 transition-colors shadow-lg shadow-white/5 active:scale-98 w-full sm:w-auto text-center"
            >
              Create a free account
            </Link>
            <Link
              href="/pricing"
              className="bg-neutral-900/40 border border-neutral-800 text-neutral-300 text-xs sm:text-sm font-medium px-6 py-3 rounded-xl hover:text-white hover:border-neutral-700 transition-all backdrop-blur-md w-full sm:w-auto text-center"
            >
              View pricing
            </Link>
          </div>
        </div>

        {/* ================= BOTTOM FOOTER LINKS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-neutral-800/60 pb-12 text-left">
          
          {/* Brand Info (4-Columns) */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            {/* Logo */}
            <div className="flex items-center gap-1 font-bold text-2xl tracking-tight">
              <span className="text-[#38bdf8]">hire</span>
              <span className="text-[#f97316]">loop</span>
            </div>
            {/* Description Text */}
            <p className="text-neutral-500 text-xs sm:text-[13px] font-normal leading-relaxed max-w-xs">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
            {/* Social Buttons Block */}
            <div className="flex items-center gap-2.5 mt-2">
              {["facebook", "pinterest", "linkedin"].map((platform, i) => (
                <a
                  key={i}
                  href={`#${platform}`}
                  className="w-8 h-8 rounded-lg bg-neutral-900/80 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all"
                >
                  <span className="capitalize text-[11px] font-mono">{platform[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Spacer Column for matching layout width (1-Column) */}
          <div className="hidden md:block md:col-span-1" />

          {/* Product Category Links (2-Columns) */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-indigo-400/90 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={`/${link.toLowerCase().replace(" ", "-")}`} className="text-neutral-500 hover:text-white transition-colors text-xs sm:text-sm font-normal">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigations Category Links (2-Columns) */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-indigo-400/90 uppercase tracking-wider mb-4">Navigations</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={`/${link.toLowerCase().replace(" ", "-")}`} className="text-neutral-500 hover:text-white transition-colors text-xs sm:text-sm font-normal">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Category Links (2-Columns) */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-indigo-400/90 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={`/${link.toLowerCase().replace(" ", "-")}`} className="text-neutral-500 hover:text-white transition-colors text-xs sm:text-sm font-normal">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ================= COPYRIGHT BANNER ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-[11px] sm:text-xs text-neutral-600 gap-4">
          <div>
            Copyright 2026 —Programming Hero
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-neutral-400 transition-colors">Terms & Policy</Link>
            <span>-</span>
            <Link href="/privacy" className="hover:text-neutral-400 transition-colors">Privacy Guideline</Link>
          </div>
        </div>

      </div>
    </div>
  );
}