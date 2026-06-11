import React from "react";

export default function RecentApplications() {
  const applications = [
    { name: "Julianne Moore", role: "Senior Product Designer", date: "Oct 24, 2023", exp: "6 years", status: "Interviewing", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { name: "Robert Downey", role: "Backend Engineer", date: "Oct 23, 2023", exp: "4 years", status: "New", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { name: "Emma Stone", role: "Marketing Lead", date: "Oct 22, 2023", exp: "8 years", status: "Reviewing", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { name: "Chris Pratt", role: "Product Manager", date: "Oct 21, 2023", exp: "5 years", status: "Rejected", color: "text-red-400 bg-red-500/10 border-red-500/20" },
  ];

  return (
    <div className="bg-[#241A1A]/80 border border-neutral-800/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xl flex-1 min-w-0 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold tracking-wide text-white">Recent Applications</h3>
        <button className="text-[11px] text-[#6366f1] hover:underline font-medium">View all</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-neutral-800/60 text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
              <th className="pb-3">Candidate Name</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Date Applied</th>
              <th className="pb-3">Experience</th>
              <th className="pb-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/40 text-xs">
            {applications.map((app, i) => (
              <tr key={i} className="hover:bg-neutral-900/20 transition-colors group">
                <td className="py-3.5 font-medium text-neutral-200 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-neutral-800 group-hover:bg-neutral-700 transition-colors" />
                  {app.name}
                </td>
                <td className="py-3.5 text-neutral-400">{app.role}</td>
                <td className="py-3.5 text-neutral-500">{app.date}</td>
                <td className="py-3.5 text-neutral-400">{app.exp}</td>
                <td className="py-3.5 text-right">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium border ${app.color}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}