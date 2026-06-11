"use client";

import React, { useState } from "react";
import Sidebar from "@/component/Sidebar"; 
import TopBar from "@/component/TopBar";   

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#130D0D] text-white flex select-none font-sans">
      {/* বামদিকের সাইডবার */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* ডানদিকের মেইন কনটেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* মোবাইল হেডার (শুধুমাত্র ছোট স্ক্রিনে দেখাবে) */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#1A1212] border-b border-neutral-800/60 sticky top-0 z-30">
          <div className="font-bold text-xl tracking-tight">
            <span className="text-[#38bdf8]">hire</span>
            <span className="text-[#f97316]">loop</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-neutral-400 hover:text-white"
          >
            ☰
          </button>
        </header>

        {/* বড় স্ক্রিনের জন্য টপ বার */}
        <TopBar />

        {/* মেইন পেজ কনটেন্ট */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}