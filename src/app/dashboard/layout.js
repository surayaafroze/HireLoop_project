// src/app/dashboard/layout.js

import Sidebar from "@/component/dashboardComponent/SideBar"; // তোমার সাইডবার পাথ অনুযায়ী ঠিক করে নিও

export default function DashboardLayout({ children }) {
  return (
    // <body> এর পরিবর্তে <div> ব্যবহার করো এবং ড্যাশবোর্ড লেআউট ঠিক করার জন্য flex রো (row) দাও
    <div className="min-h-screen bg-[#121214] flex">
      {/* বাম পাশে থাকবে সাইডবার */}
      <Sidebar />
      
      {/* ডান পাশে থাকবে মেইন কনটেন্ট বা ড্যাশবোর্ডের পেজগুলো */}
      <main className="flex-1 overflow-y-auto p-6 text-white">
        {children}
      </main>
    </div>
  );
}