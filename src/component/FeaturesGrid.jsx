"use client";

import React from "react";

export default function FeaturesGrid() {
  const features = [
    {
      title: "Smart Search",
      description: "Find your ideal job with advanced filters.",
      icon: (
        <svg className="w-5 h-5 text-neutral-400 group-hover:text-pink-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently.",
      icon: (
        <svg className="w-5 h-5 text-neutral-400 group-hover:text-pink-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
    {
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring.",
      icon: (
        <svg className="w-5 h-5 text-neutral-400 group-hover:text-pink-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      ),
    },
    {
      title: "Saved Jobs",
      description: "Manage apps & favorites on your dashboard.",
      icon: (
        <svg className="w-5 h-5 text-neutral-400 group-hover:text-pink-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0113.186 0z" />
        </svg>
      ),
    },
    {
      title: "One-Click Apply",
      description: "Simplify your job applications for an easier process!",
      icon: (
        <svg className="w-5 h-5 text-neutral-400 group-hover:text-pink-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 9.152c.582.448 1.148.89 1.676 1.345m-1.676-1.345L12 4.125M15.042 9.152l3.414 7.682M12 4.125c-.582.448-1.148.89-1.676 1.345M12 4.125v16.5m-1.676-15.155L6.91 12.652M10.324 5.47L6.91 12.652m0 0l3.414 7.682M6.91 12.652H21" />
        </svg>
      ),
    },
    {
      title: "Resume Builder",
      description: "Create professional resumes with modern templates.",
      icon: (
        <svg className="w-5 h-5 text-neutral-400 group-hover:text-pink-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills and experience.",
      icon: (
        <svg className="w-5 h-5 text-neutral-400 group-hover:text-pink-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v6.75L18.75 15.563m2.25-8.063l-2.25 1.313m0-1.313v6.75L16.5 15.563m2.25-8.063L16.5 6.188M16.5 6.188L14.25 7.5m2.25-1.313v6.75L14.25 14.25m0-6.75L12 6.188m2.25 1.313v6.75L12 15.563m0-8.063L9.75 6.188M12 7.5v6.75L9.75 15.563m0-8.063L7.5 6.188m2.25 1.313v6.75L7.5 14.25m0-6.75L5.25 6.188M7.5 7.5v6.75L5.25 15.563m0-8.063L3 6.188M5.25 7.5v6.75L3 14.25M3 7.5v6.75L5.25 15.563" />
        </svg>
      ),
    },
    {
      title: "Career Growth Resources",
      description: "Boost your career with quick interview tips.",
      icon: (
        <svg className="w-5 h-5 text-neutral-400 group-hover:text-pink-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative bg-[#1A1212] text-white py-24 px-4 overflow-hidden select-none">
      
      {/* Background Vertical Strips / Grid Pattern */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20 px-4 max-w-7xl mx-auto z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-500 to-transparent" />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#a78bfa] uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-[#a78bfa] rounded-sm block"></span>
            FEATURES JOB
            <span className="w-1.5 h-1.5 bg-[#a78bfa] rounded-sm block"></span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl mx-auto text-white leading-tight">
            Everything you need <br /> to succeed
          </h2>
        </div>

        {/* 4-Column x 2-Row Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 w-full px-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 group">
              
              {/* Icon Box with Subtle Square Dark Texture */}
              <div className="flex-shrink-0 p-3 rounded-xl bg-[#241A1A]/80 border border-neutral-800/80 group-hover:border-neutral-700 transition-all duration-300 shadow-md group-hover:shadow-pink-500/5">
                {feature.icon}
              </div>

              {/* Text Area */}
              <div className="flex flex-col text-left">
                <h3 className="text-base font-semibold text-white tracking-wide mb-1 group-hover:text-neutral-200 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-[13px] font-normal leading-relaxed">
                  {feature.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}