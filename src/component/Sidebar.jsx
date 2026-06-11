"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: "🎛️" },
    { name: "My Company", href: "/my-company", icon: "🏢" },
    { name: "Manage Jobs", href: "/manage-jobs", icon: "💼" },
    { name: "Applications", href: "/applications", icon: "📨" },
    { name: "Settings", href: "/settings", icon: "⚙️" },
  ];

  return (
    <>
      {/* মোবাইলে সাইডবার ওপেন হলে ব্যাকগ্রাউন্ড ওভারলে */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* সাইডবার প্যানেল */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#1A1212] border-r border-neutral-800/80 p-5 flex flex-col transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        {/* লোগো সেকশন */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="font-bold text-2xl tracking-tight">
            <span className="text-[#38bdf8]">hire</span>
            <span className="text-[#f97316]">loop</span>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-neutral-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* ইউজার প্রোফাইল কার্ড */}
        <div className="flex items-center gap-3 bg-[#241A1A]/50 border border-neutral-800/40 p-3 rounded-xl mb-6">
          <div className="w-10 h-10 rounded-full bg-neutral-700 overflow-hidden shrink-0">
            <div className="w-full h-full bg-gradient-to-tr from-amber-500 to-indigo-600" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-white truncate">Alex Sterling</h4>
            <p className="text-[10px] text-neutral-400">Recruiter</p>
            <span className="inline-block mt-1 text-[8px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">PREMIUM ACCOUNT</span>
          </div>
        </div>

        {/* নেভিগেশন মেনু */}
        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive 
                    ? "bg-[#241A1A] border border-neutral-800 text-white shadow-lg shadow-black/20" 
                    : "text-neutral-400 hover:bg-[#241A1A]/30 hover:text-white"
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}