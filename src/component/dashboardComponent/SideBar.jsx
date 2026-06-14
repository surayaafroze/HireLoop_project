"use client";

import React from "react";
import Link from "next/link"; // ফিক্সড ইম্পোর্ট পাথ
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Button, Chip } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

// মেনু কনফিগারেশন
const dashboardMenus = {
  seeker: [
    { title: "Dashboard", path: "/dashboard/seeker", icon: "📊" },
    { title: "Browse & Apply", path: "/dashboard/seeker/jobs", icon: "💼" },
    { title: "Saved Jobs", path: "/dashboard/seeker/saved", icon: "📁" },
    { title: "My Applications", path: "/dashboard/seeker/applications", icon: "📝" },
    { title: "Billing", path: "/dashboard/seeker/billing", icon: "💳" },
  ],
  recruiter: [
    { title: "Dashboard", path: "/dashboard/recruiter", icon: "📊" },
    { title: "My Company", path: "/dashboard/recruiter/company", icon: "🏢" },
    { title: "Manage Jobs", path: "/dashboard/recruiter/jobs", icon: "💼" },
    { title: "Applications", path: "/dashboard/recruiter/applications", icon: "📁" },
  ],
  admin: [
    { title: "Dashboard", path: "/dashboard/admin", icon: "📊" },
    { title: "Manage Users", path: "/dashboard/admin/users", icon: "👥" },
    { title: "Manage Companies", path: "/dashboard/admin/companies", icon: "🏢" },
    { title: "Manage Jobs", path: "/dashboard/admin/jobs", icon: "💼" },
    { title: "Payments", path: "/dashboard/admin/payments", icon: "💳" },
  ],
};

const publicMenus = [
  { title: "Home", path: "/", icon: "🏠" },
  { title: "Browse Jobs", path: "/jobs", icon: "🔍" },
  { title: "Companies", path: "/companies", icon: "🏢" },
  { title: "Pricing", path: "/pricing", icon: "🏷️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  if (isPending) {
    return (
      <aside className="w-64 h-screen bg-[#121214] border-r border-[#27272A] p-4 animate-pulse" />
    );
  }

  if (!session?.user) return null;

  const { name, role, image, plan } = session.user;
  const isPremium = plan === "pro" || plan === "premium";
  const currentDashboardMenu = dashboardMenus[role] || [];

  return (
    <aside className="w-64 h-screen bg-[#121214] text-[#E4E4E7] border-r border-[#27272A] flex flex-col justify-between p-4 font-sans select-none">
      <div className="flex flex-col gap-6">
        {/* ব্র্যান্ড লোগো */}
        <div className="px-2 py-3 flex items-center">
          <span className="text-2xl font-bold tracking-tight text-white">
            Hire<span className="text-blue-500">Loop</span>
          </span>
        </div>

        {/* ইউজার প্রোফাইল কার্ড */}
        <div className="p-3 rounded-xl bg-[#1C1C1E] border border-[#27272A] flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Avatar 
              src={image || undefined} 
              name={name || "User"}
              size="md"
              variant="bordered" 
              color={isPremium ? "warning" : "default"}
              className="w-10 h-10 min-w-10"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold truncate text-white">{name}</span>
              <span className="text-xs text-gray-400 truncate capitalize">{role}</span>
            </div>
          </div>
          {isPremium && (
            <Chip size="sm" variant="flat" color="warning" className="w-full text-[10px] uppercase font-bold mt-1 justify-center py-0 h-5 bg-warning-500/10 text-amber-500">
              Premium Account
            </Chip>
          )}
        </div>

        {/* ডায়নামিক ড্যাশবোর্ড অপশনস */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold tracking-wider text-gray-500 uppercase px-3 mb-1">
            Dashboard Options
          </span>
          {currentDashboardMenu.map((item) => {
            const isActive = pathname === item.path;
            return (
              // ❌ passHref legacyBehavior রিমুভ করা হয়েছে
              <Link key={item.path} href={item.path}>
                <Button
                  fullWidth
                  className={`justify-start gap-3 h-10 px-3 font-medium text-sm rounded-lg transition-all ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-600/20 to-blue-600/5 text-blue-400 border-l-2 border-blue-500 rounded-l-none" 
                      : "bg-transparent text-gray-400 hover:bg-[#1C1C1E] hover:text-white"
                  }`}
                  variant="light"
                >
                  <span className="text-base">{item.icon}</span>
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* পাবলিক পেজ লিংকসমূহ */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold tracking-wider text-gray-500 uppercase px-3 mb-1">
            Public Portals
          </span>
          {publicMenus.map((item) => {
            const isActive = pathname === item.path;
            return (
              // ❌ passHref legacyBehavior রিমুভ করা হয়েছে
              <Link key={item.path} href={item.path}>
                <Button
                  fullWidth
                  className={`justify-start gap-3 h-10 px-3 font-medium text-sm rounded-lg transition-all ${
                    isActive ? "bg-[#1C1C1E] text-white" : "bg-transparent text-gray-400 hover:bg-[#1C1C1E] hover:text-white"
                  }`}
                  variant="light"
                >
                  <span className="text-base">{item.icon}</span>
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* নিচের অংশ: সেটিংস এবং লগআউট বাটন */}
      <div className="flex flex-col gap-1 border-t border-[#27272A] pt-3">
        {/* ❌ passHref legacyBehavior রিমুভ করা হয়েছে */}
        <Link href={`/dashboard/${role}/settings`}>
          <Button
            fullWidth
            className={`justify-start gap-3 h-10 px-3 font-medium text-sm rounded-lg ${
              pathname.includes("/settings") ? "bg-[#1C1C1E] text-white" : "bg-transparent text-gray-400 hover:bg-[#1C1C1E] hover:text-white"
            }`}
            variant="light"
          >
            <span className="text-base">⚙️</span>
            Settings
          </Button>
        </Link>

        <Button
          fullWidth
          onClick={handleLogout}
          className="justify-start gap-3 h-10 px-3 font-medium text-sm rounded-lg bg-transparent text-danger hover:bg-danger-500/10 transition-colors"
          variant="light"
          color="danger"
        >
          <span className="text-base">🚪</span>
          Logout
        </Button>
      </div>
    </aside>
  );
}