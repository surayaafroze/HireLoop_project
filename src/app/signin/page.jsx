"use client";

import React, { useState } from "react";
import Link from "next/link";
// আপনার প্রোজেক্টের better-auth ক্লায়েন্টটি ইমপোর্ট করুন
import { authClient, signIn } from "@/lib/auth-client"; 

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Better Auth ক্লায়েন্ট দিয়ে সরাসরি সাইন ইন কল
    const { data, error: authError } = await signIn.email({
      email: email,
      password: password,
      callbackURL: "/" // লগইন সফল হলে ইউজার যেখানে রিডাইরেক্ট হবে
    });

    if (authError) {
      // পাসওয়ার্ড ভুল হলে বা ইউজার না থাকলে Better Auth সঠিক মেসেজটি পাস করবে
      setError(authError.message || "Invalid email or password.");
      setLoading(false);
    } else {
      setSuccess("Successfully signed in! Redirecting...");
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[#1A1212] text-white min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden py-12 select-none">
      
      {/* Background Vertical Strips / Grid Pattern */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10 px-4 max-w-7xl mx-auto z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-500 to-transparent" />
        ))}
      </div>

      {/* Subtle Purple Blur Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Main Login Panel Card */}
      <div className="relative z-10 w-full max-w-md bg-[#241A1A]/80 border border-neutral-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl text-left">
        
        {/* Header Block */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-1 font-bold text-2xl tracking-tight mb-2">
            <span className="text-[#38bdf8]">hire</span>
            <span className="text-[#f97316]">loop</span>
          </Link>
          <h2 className="text-xl font-semibold text-white tracking-wide">Welcome Back</h2>
          <p className="text-neutral-400 text-xs mt-1">Sign in to your HireLoop account</p>
        </div>

        {/* Dynamic Alerts Banner */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2.5 text-xs text-red-400 leading-normal">
            <span className="shrink-0 text-base leading-none">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2.5 text-xs text-emerald-400">
            <span className="shrink-0 text-base leading-none">✅</span>
            <span>{success}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSignIn} className="space-y-4">
          
          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-300">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-700 transition-colors"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-neutral-300">Password</label>
              {/* আপনি চাইলে এখানে Forgot Password-এর লিংক অ্যাড করতে পারেন */}
              <Link href="/forgot-password" className="text-[11px] text-[#6366f1] hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-700 transition-colors"
              required
            />
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white text-xs sm:text-sm font-medium py-3 rounded-xl shadow-lg shadow-indigo-500/10 hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none mt-4"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Navigation Link to Sign Up */}
        <div className="mt-6 text-center text-xs text-neutral-500">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-[#6366f1] hover:text-[#818cf8] font-medium transition-colors ml-0.5">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}