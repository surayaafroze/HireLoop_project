"use client";

import React from 'react';
import StatsCardGrid from '@/component/dashboardComponent/StatsCardGrid';
import { authClient } from "@/lib/auth-client"; // Better Auth ক্লায়েন্ট ইম্পোর্ট

export default function DashboardRecruiterPage() {
  // Better Auth ক্লায়েন্ট থেকে রিয়েল-টাইম সেশন এবং লোডিং স্টেট নিয়ে আসা
  const { data: session, isPending } = authClient.useSession();

  // ১. সেশন ডেটা যখন লোড হচ্ছে (Loading State)
  if (isPending) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-neutral-800 rounded w-1/3" />
        <StatsCardGrid isLoading={true} />
      </div>
    );
  }

  // ২. ইউজার যদি লগইন না থাকে (Fallback)
  if (!session?.user) {
    return (
      <div className="text-center py-12 text-neutral-400">
        Please sign in to view your recruiter dashboard.
      </div>
    );
  }

  // ৩. সেশন থেকে লগইন করা ইউজারের আসল নাম নেওয়া হলো
  const userName = session.user.name || "Recruiter";

  // ৪. সাময়িকভাবে টেস্ট করার জন্য রিক্রুটার স্ট্যাটস (পরবর্তীতে এটা ডাটাবেজ থেকে আসবে)
  const recruiterStats = [
    { title: "Total Job Posts", value: 48, icon: "📄" },
    { title: "Total Applicants", value: 1284, icon: "👥" },
    { title: "Active Jobs", value: 18, icon: "⚡" },
    { title: "Jobs Closed", value: 32, icon: "✅" },
  ];

  return (
    <div className="space-y-6">
      {/* এখানে ইউজারের নাম এখন সম্পূর্ণ ডায়নামিক */}
      <h1 className="text-2xl font-bold text-white tracking-tight">
        Welcome back, {userName}
      </h1>
      
      {/* রিইউজেবল গ্রিডে ডেটা পাস করা হলো */}
      <StatsCardGrid items={recruiterStats} isLoading={false} />
    </div>
  );
}