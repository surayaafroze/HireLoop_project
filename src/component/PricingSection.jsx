"use client";

import React, { useState } from "react";

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState("monthly"); // 'monthly' or 'yearly'

  const plans = [
    {
      name: "Starter",
      icon: "👑",
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "Start building your insights hub:",
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited"
      ],
      isHighlighted: false,
    },
    {
      name: "Growth",
      icon: "📊",
      monthlyPrice: 17,
      yearlyPrice: 12, // প্রতি মাসের কস্ট যদি বাৎসরিক সাবস্ক্রিপশন নেয়
      description: "Start building your insights hub:",
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited"
      ],
      isHighlighted: true,
    },
    {
      name: "Premium",
      icon: "⚡",
      monthlyPrice: 99,
      yearlyPrice: 79,
      description: "Start building your insights hub:",
      features: [
        "Everything in Pro",
        "Multi-profile career portfolios",
        "Shared talent rooms",
        "Recruiter view (read-only)"
      ],
      isHighlighted: false,
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
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#a78bfa] uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-[#a78bfa] rounded-sm block"></span>
            PRICING
            <span className="w-1.5 h-1.5 bg-[#a78bfa] rounded-sm block"></span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl mx-auto text-white leading-tight">
            Pay for the leverage, <br /> not the listings
          </h2>
        </div>

        {/* Monthly / Yearly Billing Toggle Switch */}
        <div className="flex items-center bg-neutral-900/90 border border-neutral-800 p-1 rounded-full mb-16 shadow-inner">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              billingPeriod === "monthly"
                ? "bg-white text-neutral-950 shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
              billingPeriod === "yearly"
                ? "bg-white text-neutral-950 shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Yearly
            <span className="bg-[#ec4899] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full scale-90">
              25%
            </span>
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
          {plans.map((plan, index) => {
            const currentPrice = billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            
            return (
              <div
                key={index}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md transition-all duration-300 shadow-xl border ${
                  plan.isHighlighted
                    ? "bg-[#281e1e] border-neutral-700 shadow-neutral-900/50 scale-102 z-10"
                    : "bg-[#241A1A]/80 border-neutral-800/80 hover:border-neutral-700"
                }`}
              >
                {/* Card Top: Plan Name & Price */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xl bg-neutral-900/60 p-2 border border-neutral-800 rounded-xl">{plan.icon}</span>
                      <h3 className="text-lg font-semibold text-white tracking-wide">{plan.name}</h3>
                    </div>
                    <div className="flex items-baseline text-white">
                      <span className="text-4xl font-bold font-sans">${currentPrice}</span>
                      <span className="text-[10px] text-neutral-400 font-medium ml-1">/month</span>
                    </div>
                  </div>

                  {/* Plan Description Header */}
                  <p className="text-neutral-300 text-xs sm:text-sm font-medium text-left mb-5">
                    {plan.description}
                  </p>

                  {/* Feature Lists */}
                  <ul className="space-y-3.5 mb-10 text-left">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-neutral-400 text-xs sm:text-[13px] leading-relaxed">
                        <span className="flex-shrink-0 w-4 h-4 rounded bg-neutral-900/60 border border-neutral-800 flex items-center justify-center text-[10px] text-neutral-400 font-bold mt-0.5">
                          +
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Bottom: Call to Action Button */}
                <button
                  type="button"
                  className={`w-full font-medium text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-between transition-all active:scale-[0.98] group ${
                    plan.isHighlighted
                      ? "bg-white text-neutral-950 hover:bg-neutral-100 shadow-lg"
                      : "bg-neutral-900/60 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <span>Choose This Plan</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}