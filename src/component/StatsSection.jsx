"use client";

import React from "react";
import Image from "next/image";

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      value: "50K",
      label: "Active Jobs",
      icon: (
        <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637zM12 9.75v3.75m1.875-1.875h-3.75" />
        </svg>
      ),
    },
    {
      id: 2,
      value: "12K",
      label: "Companies",
      icon: (
        <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
    },
    {
      id: 3,
      value: "2M",
      label: "Job Seekers",
      icon: (
        <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      id: 4,
      value: "97%",
      label: "Satisfaction Rate",
      icon: (
        <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.172-.436.745-.436.92 0l2.125 5.111a.75 7.75 0 00.565.416l5.48.513c.478.045.67.636.319.97l-4.225 3.84a.75 7.5 0 00-.217.668l1.248 5.378c.11.474-.412.852-.83.596l-4.757-2.91a.75 7.5 0 00-.73 0l-4.757 2.91c-.418.256-.94-.122-.83-.596l1.248-5.378a.75 7.5 0 00-.217-.668L2.953 11.41c-.351-.334-.158-.925.319-.97l5.48-.513a.75 7.5 0 00.565-.416l2.125-5.112z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative bg-[#1A1212] text-white pt-32 pb-24 px-4 overflow-hidden select-none min-h-[750px] flex flex-col justify-between">
      
      {/* Background Vertical Strips / Grid Pattern */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20 px-4 max-w-7xl mx-auto z-10">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-500 to-transparent" />
        ))}
      </div>

      {/* Main Big Globe & Purple Glow Layout */}
      <div className="absolute inset-x-0 top-10 flex justify-center pointer-events-none z-0">
        <div className="relative w-full max-w-6xl aspect-[1.8/1] sm:aspect-[2.2/1]">
          
          {/* Neon Purple Aura Backlight behind Globe */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[85%] h-[80%] bg-gradient-to-b from-indigo-600/40 to-purple-600/30 blur-[100px] rounded-full" />
          
          {/* Subtle Star Particles */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />

          {/* Actual Globe Image */}
          <Image
            src="/images/globe.png"
            alt="Globe Map Background"
            fill
            priority
            className="object-contain object-top opacity-60 mix-blend-screen scale-110 sm:scale-105"
          />

          {/* Bottom Fade to blend with page body */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1212] via-transparent to-transparent" />
        </div>
      </div>

      {/* Interactive & Visible Content Wrapper */}
      <div className="relative z-20 max-w-7xl mx-auto w-full text-center flex flex-col items-center justify-center flex-1">
        
        {/* Assisting Text placed exactly over the upper globe region */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-neutral-200 font-normal tracking-wide max-w-2xl mx-auto mb-20 leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Assisting over <span className="text-white font-semibold">15,000 job seekers</span> <br />
          find their dream positions.
        </h2>

        {/* 4 Cards Row Alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4 mt-auto">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#241A1A]/85 border border-neutral-800/70 backdrop-blur-md rounded-2xl p-7 flex flex-col items-start justify-between min-h-[185px] text-left transition-all duration-300 hover:border-neutral-700/90 hover:bg-[#2c2020]/95 group shadow-xl"
            >
              {/* Top Vector Box */}
              <div className="p-2 rounded-xl bg-neutral-900/60 border border-neutral-800/80 group-hover:border-neutral-600 transition-colors">
                {stat.icon}
              </div>
              
              {/* Bottom Descriptions */}
              <div className="mt-5 w-full">
                <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight font-sans">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-neutral-400 font-medium mt-1.5 tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Thin Border Line matching the exact teal/blue boundary line snippet at the bottom of the image */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent opacity-80" />
    </div>
  );
}