import React from "react";

export default function TopCompanies() {
  const companies = [
    { name: "Google Inc.", location: "Technology • Mountain View", jobs: "24" },
    { name: "Meta Platforms", location: "Social Media • Menlo Park", jobs: "18" },
    { name: "Stripe", location: "Fintech • San Francisco", jobs: "12" },
    { name: "Tesla", location: "Automotive • Austin", jobs: "31" },
  ];

  return (
    <div className="bg-[#241A1A]/80 border border-neutral-800/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl w-full lg:w-[340px] shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold tracking-wide text-white">My Top Companies</h3>
        <button className="text-[11px] text-[#6366f1] hover:underline font-medium">View all</button>
      </div>

      <div className="space-y-3">
        {companies.map((company, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 bg-neutral-900/40 border border-neutral-800/40 rounded-xl hover:border-neutral-700/60 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-neutral-800 shrink-0 flex items-center justify-center text-xs">🏢</div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-neutral-200 truncate">{company.name}</h4>
                <p className="text-[10px] text-neutral-500 truncate">{company.location}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-bold text-white">{company.jobs}</p>
              <p className="text-[8px] font-medium text-neutral-500 uppercase tracking-wider">Active Jobs</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-medium py-2.5 rounded-xl transition-all active:scale-[0.99]">
        View All Companies
      </button>
    </div>
  );
}