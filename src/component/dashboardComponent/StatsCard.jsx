"use client";

import React from "react";
import { Card } from "@heroui/react"; // শুধুমাত্র Card ইম্পোর্ট করা হয়েছে

export default function StatsCard({ title, value, icon }) {
  return (
    <Card className="bg-[#1C1C1E] border border-[#27272A]/80 shadow-xl rounded-xl flex-1 min-w-[200px]">
      {/* CardBody বা অন্য কিছুর বদলে সরাসরি ডিরেক্ট div ব্যবহার করে কার্ডের কন্টেন্ট সাজানো হয়েছে */}
      <div className="p-5 flex flex-col gap-4">
        {/* আইকন বক্স */}
        <div className="w-10 h-10 rounded-xl bg-neutral-800/60 flex items-center justify-center text-lg text-neutral-300 border border-neutral-700/30">
          {icon}
        </div>
        
        {/* টাইটেল এবং ভ্যালু */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-neutral-400 tracking-wide">
            {title}
          </span>
          <span className="text-2xl font-bold text-white tracking-tight">
            {typeof value === "number" ? value.toLocaleString() : value || 0}
          </span>
        </div>
      </div>
    </Card>
  );
}