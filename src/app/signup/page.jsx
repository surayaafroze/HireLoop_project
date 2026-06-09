"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ১. useRouter ইমপোর্ট করুন
import { authClient, signUp } from "@/lib/auth-client"; 

export default function SignUpPage() {
  const router = useRouter(); // ২. রাউটার ইনিশিয়ালাইজ করুন
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (pass) => {
    return /^(?=.*[a-z])(?=(?:.*[A-Z]){1,})(?=(?:.*[0-9]){1,}).{8,}$/.test(pass);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters, contain one uppercase, one lowercase letter, and one number.");
      setLoading(false);
      return;
    }

    // Better Auth ক্লায়েন্ট দিয়ে সাইন আপ কল
    const { data, error: authError } = await signUp.email({
      email: email,
      password: password,
      name: name,
      image: imageUrl || undefined,
    });

    if (authError) {
      setError(authError.message || "Failed to create an account.");
      setLoading(false);
    } else {
      setSuccess("Account successfully created! Redirecting to Sign In...");
      
      // ফর্ম ফিল্ডগুলো খালি করা
      setName("");
      setEmail("");
      setPassword("");
      setImageUrl("");
      setLoading(false);

      // ৩. ৩ সেকেন্ডের একটি টাইমআউট দিয়ে ম্যানুয়ালি সাইন-ইন পেজে পুশ করা
      // যাতে ইউজার "Account successfully created!" মেসেজটি দেখতে পায়
      setTimeout(() => {
        router.push("/signin");
      }, 2000); 
    }
  };

  return (
    <div className="relative bg-[#1A1212] text-white min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden py-12">
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10 px-4 max-w-7xl mx-auto">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-500 to-transparent" />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md bg-[#241A1A]/80 border border-neutral-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl text-left">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-1 font-bold text-2xl tracking-tight mb-2">
            <span className="text-[#38bdf8]">hire</span>
            <span className="text-[#f97316]">loop</span>
          </Link>
          <h2 className="text-xl font-semibold text-white tracking-wide">Create your account</h2>
        </div>

        {/* এরর মেসেজ ব্যানার */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2.5 text-xs text-red-400">
            <span className="shrink-0">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* সাকসেস মেসেজ ব্যানার */}
        {success && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2.5 text-xs text-emerald-400">
            <span className="shrink-0">✅</span>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-300">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-700"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-300">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-700"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-700"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-300">Profile Image URL</label>
            <input
              type="url"
              placeholder="https://picsum.photos/seed/ai6/800/800"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white text-xs sm:text-sm font-medium py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:pointer-events-none mt-2"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-neutral-500">
          Already have an account?{" "}
          <Link href="/signin" className="text-[#6366f1] font-medium ml-0.5">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}