import React from "react";

export default function StatsGrid() {
  const stats = [
    { title: "Total Job Posts", count: "48", icon: "📄" },
    { title: "Total Applicants", count: "1,284", icon: "👥" },
    { title: "Active Jobs", count: "18", icon: "⚡" },
    { title: "Jobs Closed", count: "32", icon: "✅" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-[#241A1A]/80 border border-neutral-800/80 backdrop-blur-md p-5 rounded-2xl shadow-xl flex flex-col justify-between min-h-[110px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-neutral-400 tracking-wide">{stat.title}</span>
            <span className="bg-neutral-900/60 border border-neutral-800 p-1.5 rounded-lg text-xs">{stat.icon}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mt-2 tracking-tight">{stat.count}</h3>
        </div>
      ))}
    </div>
  );
}