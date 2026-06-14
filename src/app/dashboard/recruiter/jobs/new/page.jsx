"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { createJob } from "@/lib/actions/jobs"; // আপনার অরিজিনাল সার্ভার অ্যাকশন পাথ

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [success, setSuccess] = useState("");
  
  // ফিল্ড-স্পেসিফিক এরর স্টেট
  const [errors, setErrors] = useState({});

  // লগইন করা ইউজারের কোম্পানির আইডি (অথ বা সেশন স্টেট থেকে আসা আইডি)
  const [mockCompany] = useState({
    id: "company_123",
    name: "Acme Corp (Auto-filled)",
    isApproved: true,
  });

  // ফর্ম স্টেটসমূহ (রিয়েল-টাইম ভ্যালিডেশন এবং ইনপুট ভ্যালু ট্র্যাকিং বজায় রাখার জন্য)
  const [formData, setFormData] = useState({
    title: "",
    category: "technology",
    type: "Full-time",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    location: "",
    isRemote: false,
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  // রিয়েল-টাইম একক ফিল্ড ভ্যালিডেশন লজিক
  const validateField = (name, value, currentFormData = formData) => {
    let errorMsg = "";

    if (name === "title" && !value.trim()) {
      errorMsg = "Job title is required.";
    } else if (name === "title" && value.trim().length < 5) {
      errorMsg = "Title must be at least 5 characters long.";
    }

    if ((name === "salaryMin" || name === "salaryMax") && value !== "") {
      const min = name === "salaryMin" ? Number(value) : Number(currentFormData.salaryMin);
      const max = name === "salaryMax" ? Number(value) : Number(currentFormData.salaryMax);

      if (min < 0 || max < 0) {
        errorMsg = "Salary cannot be a negative number.";
      } else if (min && max && max < min) {
        errorMsg = "Maximum salary must be greater than or equal to minimum salary.";
      }
    }

    if (name === "location" && !currentFormData.isRemote && !value.trim()) {
      errorMsg = "Office location is required for non-remote roles.";
    }

    if (name === "deadline" && value) {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        errorMsg = "Application deadline cannot be in the past.";
      }
    }

    if ((name === "responsibilities" || name === "requirements") && !value.trim()) {
      errorMsg = "This section cannot be left empty.";
    } else if ((name === "responsibilities" || name === "requirements") && value.trim().length < 20) {
      errorMsg = "Please provide a bit more detail (at least 20 characters).";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    const updatedFormData = {
      ...formData,
      [name]: finalValue,
    };

    setFormData(updatedFormData);
    
    // রিমোট টগল চেঞ্জের সময় লোকেশন এরর ক্লিন করা
    if (name === "isRemote" && finalValue === true) {
      setErrors((prev) => ({ ...prev, location: "" }));
    } else {
      validateField(name, finalValue, updatedFormData);
    }
  };

  // সাবমিট করার আগের গ্লোবাল ভ্যালিডেশন চেক
  const validateForm = () => {
    const formErrors = {};

    if (!formData.title.trim()) formErrors.title = "Job title is required.";
    if (!formData.isRemote && !formData.location.trim()) formErrors.location = "Office location is required.";
    if (!formData.deadline) formErrors.deadline = "Application deadline is required.";
    if (!formData.responsibilities.trim()) formErrors.responsibilities = "Responsibilities are required.";
    if (!formData.requirements.trim()) formErrors.requirements = "Requirements are required.";
    
    // স্যালারি লজিক চেক
    const min = Number(formData.salaryMin);
    const max = Number(formData.salaryMax);
    if (!formData.salaryMin) formErrors.salaryMin = "Minimum salary is required.";
    if (!formData.salaryMax) formErrors.salaryMax = "Maximum salary is required.";
    if (min < 0) formErrors.salaryMin = "Salary cannot be negative.";
    if (max < 0) formErrors.salaryMax = "Salary cannot be negative.";
    if (min && max && max < min) {
      formErrors.salaryMax = "Max salary must be greater than or equal to min salary.";
    }

    // ডেডলাইন পাস্ট ডেট চেক
    if (formData.deadline) {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) formErrors.deadline = "Deadline cannot be in the past.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError("");
    setSuccess("");

    // ১. আপনার দেওয়া দ্বিতীয় কোডের মেথড অনুযায়ী ফর্মের এলিমেন্ট থেকে সরাসরি ডেটা কালেক্ট করা হচ্ছে
    const nativeFormData = new FormData(e.currentTarget);
    const dataFromForm = Object.fromEntries(nativeFormData.entries());

    // ফাইনাল ভ্যালিডেশন রান
    if (!validateForm()) {
      setGlobalError("Please fix the highlighted errors before submitting.");
      return;
    }

    setLoading(true);

    try {
      // ২. দ্বিতীয় কোডটির মতো এখানে মার্জ করে payload অবজেক্ট তৈরি করা হচ্ছে
      const payload = {
        ...dataFromForm,                        // ফর্ম ইনপুট থেকে আসা ডেটা (যেমন: title, category, type ইত্যাদি)
        isRemote: formData.isRemote,            // চেকবক্স স্টেট থেকে আসা বুলিয়ান ভ্যালু
        companyId: mockCompany.id,              // আপনার কোম্পানির আইডি যুক্ত করা হলো
        status: "active",
        isPubliclyVisible: true,
      };

      console.log("Submitting Validated Payload:", payload);
      
      // সার্ভার অ্যাকশন কল
      const res = await createJob(payload);
      
      if (res && res.insertedId) {
        setSuccess("Job posted successfully! Making it publicly visible...");
        setLoading(false);
        
        // ফর্ম রিসেট করা
        e.target.reset();
        
        setTimeout(() => {
          router.push("/dashboard/recruiter");
        }, 2000);
      } else {
        setGlobalError(res?.message || "Failed to post job. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setGlobalError("Failed to post job. Please check your network connection.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121214] text-white p-4 sm:p-8 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-[#1C1C1E]/90 border border-neutral-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl">
        
        {/* হেডার সেকশন */}
        <div className="mb-8 border-b border-neutral-800 pb-5">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Post a New Job</h1>
          <p className="text-xs text-neutral-400">Fill in the details below to look for your next perfect talent.</p>
        </div>

        {globalError && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-xs text-red-400">
            <span>⚠️</span> <span>{globalError}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-xs text-emerald-400">
            <span>✅</span> <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* ================= SECTIONS 1: JOB INFO ================= */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">1. Job Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Job Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-300">Job Title</label>
                <input
                  type="text"
                  name="title" // এটি অবজেক্টের কী (Key) হিসেবে কাজ করবে
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full bg-neutral-900/60 border ${errors.title ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-800 focus:border-neutral-700'} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-colors`}
                />
                {errors.title && <span className="text-[11px] text-red-400 font-medium pl-1">{errors.title}</span>}
              </div>

              {/* Job Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-300">Job Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 outline-none focus:border-neutral-700 appearance-none cursor-pointer"
                >
                  <option value="technology" className="bg-[#1C1C1E]">Technology / AI</option>
                  <option value="fintech" className="bg-[#1C1C1E]">Fintech</option>
                  <option value="marketing" className="bg-[#1C1C1E]">Marketing</option>
                  <option value="design" className="bg-[#1C1C1E]">UI/UX Design</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Job Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-300">Job Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 outline-none focus:border-neutral-700 appearance-none cursor-pointer"
                >
                  <option value="Full-time" className="bg-[#1C1C1E]">Full-time</option>
                  <option value="Part-time" className="bg-[#1C1C1E]">Part-time</option>
                  <option value="Remote" className="bg-[#1C1C1E]">Remote</option>
                  <option value="Contract" className="bg-[#1C1C1E]">Contract</option>
                  <option value="Internship" className="bg-[#1C1C1E]">Internship</option>
                </select>
              </div>

              {/* Application Deadline */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-300">Application Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className={`w-full bg-neutral-900/60 border ${errors.deadline ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-800 focus:border-neutral-700'} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 outline-none`}
                />
                {errors.deadline && <span className="text-[11px] text-red-400 font-medium pl-1">{errors.deadline}</span>}
              </div>
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-300">Min Salary</label>
                <input
                  type="number"
                  name="salaryMin"
                  placeholder="e.g. 40000"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  className={`w-full bg-neutral-900/60 border ${errors.salaryMin ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-800 focus:border-neutral-700'} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 outline-none`}
                />
                {errors.salaryMin && <span className="text-[11px] text-red-400 font-medium pl-1">{errors.salaryMin}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-300">Max Salary</label>
                <input
                  type="number"
                  name="salaryMax"
                  placeholder="e.g. 80000"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  className={`w-full bg-neutral-900/60 border ${errors.salaryMax ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-800 focus:border-neutral-700'} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 outline-none`}
                />
                {errors.salaryMax && <span className="text-[11px] text-red-400 font-medium pl-1">{errors.salaryMax}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-300">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 outline-none"
                >
                  <option value="USD" className="bg-[#1C1C1E]">USD ($)</option>
                  <option value="EUR" className="bg-[#1C1C1E]">EUR (€)</option>
                  <option value="BDT" className="bg-[#1C1C1E]">BDT (৳)</option>
                </select>
              </div>
            </div>

            {/* Location & Remote Toggle */}
            <div className="flex flex-col gap-2.5 pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isRemote"
                  name="isRemote"
                  checked={formData.isRemote}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-neutral-800 bg-neutral-900 accent-blue-500 cursor-pointer"
                />
                <label htmlFor="isRemote" className="text-xs font-medium text-neutral-300 cursor-pointer">
                  This is a fully Remote role
                </label>
              </div>

              {!formData.isRemote && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-neutral-300">Office Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full bg-neutral-900/60 border ${errors.location ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-800 focus:border-neutral-700'} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 outline-none`}
                  />
                  {errors.location && <span className="text-[11px] text-red-400 font-medium pl-1">{errors.location}</span>}
                </div>
              )}
            </div>
          </div>

          {/* ================= SECTIONS 2: JOB DESCRIPTION ================= */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">2. Detailed Information</h3>

            {/* Responsibilities */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-neutral-300">Core Responsibilities</label>
              <textarea
                name="responsibilities"
                rows={4}
                placeholder="List the key day-to-day responsibilities for this position (Min 20 characters)..."
                value={formData.responsibilities}
                onChange={handleChange}
                className={`w-full bg-neutral-900/60 border ${errors.responsibilities ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-800 focus:border-neutral-700'} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 outline-none resize-none`}
              />
              {errors.responsibilities && <span className="text-[11px] text-red-400 font-medium pl-1">{errors.responsibilities}</span>}
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-neutral-300">Requirements & Skills</label>
              <textarea
                name="requirements"
                rows={4}
                placeholder="List expected education, technical skills, and experience (Min 20 characters)..."
                value={formData.requirements}
                onChange={handleChange}
                className={`w-full bg-neutral-900/60 border ${errors.requirements ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-800 focus:border-neutral-700'} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 outline-none resize-none`}
              />
              {errors.requirements && <span className="text-[11px] text-red-400 font-medium pl-1">{errors.requirements}</span>}
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-neutral-300">Benefits & Perks (Optional)</label>
              <textarea
                name="benefits"
                rows={3}
                placeholder="Health insurance, training allowance, flexible hours, etc..."
                value={formData.benefits}
                onChange={handleChange}
                className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 placeholder-neutral-600 outline-none resize-none"
              />
            </div>
          </div>

          {/* সাবমিট অ্যাকশন বাটন গ্রুপ */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <Button
              type="button"
              onClick={() => router.back()}
              className="bg-transparent border border-neutral-800 text-neutral-400 text-xs sm:text-sm font-medium px-5 py-2.5 h-11 rounded-xl hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              isLoading={loading}
              className="bg-white text-black text-xs sm:text-sm font-semibold px-6 py-2.5 h-11 rounded-xl shadow-lg hover:bg-neutral-200 transition-colors"
            >
              Post Job Listing
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}