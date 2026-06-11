"use client"; // সেশন এবং useEffect ব্যবহারের জন্য 'use client' নিশ্চিত করুন

import React, { useEffect } from "react";
import Banner from "@/component/Banner";
import FeaturedJobs from "@/component/FeaturedJobs";
import FeaturesGrid from "@/component/FeaturesGrid";
import PricingSection from "@/component/PricingSection";
import StatsSection from "@/component/StatsSection";
import Image from "next/image";
// Better Auth ক্লায়েন্টটি ইমপোর্ট করুন
import { authClient } from "@/lib/auth-client"; 

export default function Home() {
  // ১. হোম পেজে Better Auth-এর সেশন এবং লোডিং স্টেট নিয়ে আসা
  const { data: session, isPending } = authClient.useSession();

  // ২. ইউজার পেজে আসলেই বা রিফ্রেশ করলেই তার ইনফো ও রোল কনসোলে দেখা যাবে
  useEffect(() => {
    console.log("-----------------------------------------");
    console.log("Home Page - Auth Loading (isPending):", isPending);
    
    if (session) {
      console.log("✅ ইউজার সেশন পাওয়া গেছে (Logged In)");
      console.log("User Data:", session.user);
      console.log("User Role:", session.user.role); // 'seeker' অথবা 'recruiter'
    } else if (!isPending && !session) {
      console.log("❌ কোনো ইউজার লগইন করা নেই (Guest User)");
    }
    console.log("-----------------------------------------");
  }, [session, isPending]);

  return (
    <div>
      {/* ৩. ব্যাকগ্রাউন্ডে সেশন চেক করার সময় স্ক্রিনে একটি ছোট ইন্ডিকেটর (ঐচ্ছিক) */}
      {isPending && (
        <div className="fixed top-4 right-4 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px] px-2 py-1 rounded z-50">
          Syncing profile...
        </div>
      )}

      <Banner />
      <StatsSection />
      <FeaturedJobs />
      <FeaturesGrid />
      <PricingSection />
    </div>
  );
}