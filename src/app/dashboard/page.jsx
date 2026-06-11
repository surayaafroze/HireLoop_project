import React from "react";
import StatsGrid from "@/component/StatsGrid";
import RecentApplications from "@/component/RecentApplications";
import TopCompanies from "@/component/TopCompanies";

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
      
      {/* ওয়েলকাম হেডার */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back, Alex Sterling</h1>
      </div>

      {/* কার্ডস সেকশন */}
      <StatsGrid />

      {/* টেবিল এবং কোম্পানি সাইডবার উইজেট */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <RecentApplications />
        <TopCompanies />
      </div>

      {/* ফ্লোটিং অ্যাকশন বাটন (+) */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-white text-black font-semibold rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center text-xl z-40">
        ＋
      </button>
    </div>
  );
}