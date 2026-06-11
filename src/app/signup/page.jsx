"use client";

import React, { useState, useEffect } from "react"; // useEffect যোগ করা হয়েছে
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { authClient, signUp } from "@/lib/auth-client"; 

export default function SignUpPage() {
  const router = useRouter(); 
  
  // ১. Better Auth ক্লায়েন্ট থেকে সেশন এবং পেন্ডিং স্টেট নিয়ে আসা
  const { data: session, isPending } = authClient.useSession();

  // ২. সেশন এবং isPending স্টেট কনসোলে দেখার জন্য useEffect ব্যবহার
  useEffect(() => {
    console.log("Better Auth Session Data:", session);
    console.log("Is Session Loading (isPending):", isPending);
    
    if (session?.user) {
      console.log("Logged in user role:", session.user.role);
    }
  }, [session, isPending]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [role, setRole] = useState("seeker"); 

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
    const { data, error: authError } = await authClient.signUp.email({ // এখানে authClient নিশ্চিত করুন
      email: email,
      password: password,
      name: name,
      image: imageUrl || undefined,
      role: role, 
    });

    if (authError) {
      setError(authError.message || "Failed to create an account.");
      setLoading(false);
    } else {
      setSuccess("Account successfully created! Redirecting to Sign In...");
      
      setName("");
      setEmail("");
      setPassword("");
      setImageUrl("");
      setRole("seeker");
      setLoading(false);

      setTimeout(() => {
        router.push("/signin");
      }, 2000); 
    }
  };

  return (
    <div className="relative bg-[#1A1212] text-white min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden py-12">
      {/* সেশন লোড হওয়ার সময় একটি ছোট ইন্ডিকেটর (ঐচ্ছিক) */}
      {isPending && (
        <div className="absolute top-4 right-4 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px] px-2 py-1 rounded">
          Checking auth session...
        </div>
      )}

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

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2.5 text-xs text-red-400">
            <span className="shrink-0">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2.5 text-xs text-emerald-400">
            <span className="shrink-0">✅</span>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          
          {/* রোল সিলেকশন ড্রপডাউন */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-300">Join As</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 outline-none focus:border-neutral-700 appearance-none cursor-pointer"
            >
              <option value="seeker" className="bg-[#1A1212]">Job Seeker (Looking for a job)</option>
              <option value="recruiter" className="bg-[#1A1212]">Recruiter (Looking to hire)</option>
            </select>
          </div>

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