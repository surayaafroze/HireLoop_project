"use client";

import React from "react";
import StatsCard from "./StatsCard";

export default function StatsCardGrid({ items = [], isLoading = false }) {
  // লোডিং অবস্থার জন্য স্কেলেটন প্লেসহোল্ডার
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-[#1C1C1E] rounded-xl border border-[#27272A] animate-pulse" />
        ))}
      </div>
    );
  }

  // ডেটা না থাকলে সেফটি হ্যান্ডলিং
  if (!items || items.length === 0) {
    return <p className="text-xs text-neutral-500">No stats available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {items.map((item, index) => (
        <StatsCard
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
}