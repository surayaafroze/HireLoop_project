import React from "react";

export default function TopBar() {
  return (
    <div className="hidden lg:flex items-center justify-between px-6 py-4 bg-[#130D0D] border-b border-neutral-900/60">
      {/* সার্চ বার */}
      <div className="relative w-full max-w-xl">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">🔍</span>
        <input 
          type="text" 
          placeholder="Search applications, jobs, or talent..."
          className="w-full bg-[#1A1212] border border-neutral-800/80 rounded-xl pl-10 pr-4 py-2 text-xs text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-700 transition-colors"
        />
      </div>

      {/* নোটিফিকেশন ও প্রোফাইল */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-neutral-400 hover:text-white bg-[#1A1212] border border-neutral-800/50 rounded-xl text-sm">
          🔔
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-xs font-medium text-white">Alex Sterling</p>
            <p className="text-[10px] text-neutral-500">TechFlow Inc.</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-indigo-600" />
        </div>
      </div>
    </div>
  );
}