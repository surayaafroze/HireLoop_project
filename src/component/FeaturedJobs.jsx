"use client";

import React from "react";
import Link from "next/link";

export default function FeaturedJobs() {
  // ডামি ডেটা অ্যারে (ইমেজ অনুযায়ী ৬টি কার্ড জেনারেট করার জন্য)
  const jobs = Array(6).fill({
    title: "Frontend Developer",
    description: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  });

  return (
    <div className="relative bg-[#1A1212] text-white py-24 px-4 overflow-hidden select-none">
      
      {/* Background Vertical Strips / Grid Pattern */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20 px-4 max-w-7xl mx-auto z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-500 to-transparent" />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Top Header Section */}
        <div className="text-center mb-16">
          {/* Subtitle with square bullet markers */}
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-11px font-mono tracking-[0.2em] text-[#a78bfa] uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-[#a78bfa] rounded-sm block"></span>
            SMART JOB DISCOVERY
            <span className="w-1.5 h-1.5 bg-[#a78bfa] rounded-sm block"></span>
          </div>
          
          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl mx-auto text-white leading-tight">
            The roles you'd never <br className="hidden sm:inline" /> find by searching
          </h2>
        </div>

        {/* 3-Column Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-2 sm:px-4 mb-14">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-[#241A1A]/80 border border-neutral-800/70 backdrop-blur-md rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[280px] text-left transition-all duration-300 hover:border-neutral-700 hover:bg-[#2c2020]/90 group shadow-lg"
            >
              {/* Card Header & Content */}
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-wide mb-3">
                  {job.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                  {job.description}
                </p>

                {/* Tags/Badges Wrapper */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {/* Location Tag */}
                  <div className="inline-flex items-center gap-1.5 bg-neutral-900/60 border border-neutral-800/80 text-neutral-300 text-xs px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {job.location}
                  </div>

                  {/* Job Type Tag */}
                  <div className="inline-flex items-center gap-1.5 bg-neutral-900/60 border border-neutral-800/80 text-neutral-300 text-xs px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                    </svg>
                    {job.type}
                  </div>

                  {/* Salary Tag */}
                  <div className="inline-flex items-center gap-1.5 bg-neutral-900/60 border border-neutral-800/80 text-neutral-300 text-xs px-3 py-1.5 rounded-full w-full sm:w-auto">
                    <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.265.265c.3.3.715.483 1.173.483h1.125a1.69 1.69 0 000-3.379h-1.125A1.69 1.69 0 019 11.622V10.5c0-.828.532-1.53 1.264-1.785A1.69 1.69 0 0113.124 10.5h1.125" />
                    </svg>
                    {job.salary}
                  </div>
                </div>
              </div>

              {/* Apply Now Action Action */}
              <Link
                href="/apply"
                className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-300 hover:text-white transition-colors mt-auto w-fit group-hover:translate-x-1 duration-200"
              >
                Apply Now 
                <svg className="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <Link
          href="/jobs"
          className="bg-white text-neutral-900 text-xs sm:text-sm font-medium px-6 py-3 rounded-xl hover:bg-neutral-100 transition-colors shadow-lg active:scale-98 duration-150"
        >
          View all job open
        </Link>

      </div>
    </div>
  );
}