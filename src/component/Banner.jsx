"use client";

import React, { useState } from "react";

export default function Banner() {
  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", { jobQuery, locationQuery });
    // Add your search action logic here
  };

  return (
    <div className="relative bg-[#1A1212] text-white min-h-[600px] flex flex-col items-center justify-center px-4 overflow-hidden py-20 select-none">
      
      {/* Background Strips/Grid Pattern matching image_454d23.png */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20 px-4 max-w-7xl mx-auto">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-500 to-transparent" />
        ))}
      </div>

      {/* Subtle Bottom Purple/Blue Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center">
        
        {/* Top Badging/Pill Tag */}
        <div className="inline-flex items-center gap-2 bg-neutral-900/60 border border-neutral-800/80 px-4 py-1.5 rounded-full text-xs tracking-widest text-neutral-400 font-mono shadow-inner mb-8">
          <span className="text-base">💼</span>
          <span className="text-neutral-200 font-semibold font-sans">50,000+</span> NEW JOBS THIS MONTH
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-white drop-shadow-sm">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle/Description */}
        <p className="text-neutral-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed mb-10">
          HireLoop connects top talent with world-class companies. Browse thousands of 
          curated opportunities and land your next role — faster.
        </p>

        {/* Search Bar Form */}
        <form 
          onSubmit={handleSearch}
          className="w-full max-w-2xl flex flex-col sm:flex-row items-center bg-neutral-900/40 border border-neutral-800 backdrop-blur-md rounded-2xl p-2 sm:p-1.5 gap-2 sm:gap-0 focus-within:border-neutral-700 transition-colors shadow-2xl"
        >
          {/* Job Title Input */}
          <div className="w-full flex items-center px-3 gap-2 py-2 sm:py-0">
            <svg className="w-5 h-5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Job title, skill or company"
              value={jobQuery}
              onChange={(e) => setJobQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-neutral-200 placeholder-neutral-500 outline-none"
            />
          </div>

          {/* Inline Vertical Divider */}
          <div className="hidden sm:block h-6 w-[1px] bg-neutral-800" />

          {/* Location Input */}
          <div className="w-full flex items-center px-3 gap-2 py-2 sm:py-0">
            <svg className="w-5 h-5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Location or Remote"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-neutral-200 placeholder-neutral-500 outline-none"
            />
          </div>

          {/* Search Action Button */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#6366f1] hover:bg-[#5051f9] active:scale-95 text-white p-3 rounded-xl transition-all flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {/* Trending Tags Section */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs sm:text-sm">
          <span className="text-neutral-500">Trending Position</span>
          <div className="flex flex-wrap gap-2">
            {trendingPositions.map((position, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setJobQuery(position)}
                className="bg-neutral-900/60 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 px-3 py-1 rounded-full transition-colors text-xs"
              >
                {position}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}