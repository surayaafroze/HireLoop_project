const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

// রিক্রুটারের নিজের জবগুলো নিয়ে আসা
export const getRecruiterJobs = async (email) => {
  const res = await fetch(`${baseUrl}/api/recruiter/jobs?email=${email}`, { cache: 'no-store' });
  return res.json();
};

// কোনো নির্দিষ্ট জবের অ্যাপ্লিকেন্ট লিস্ট দেখা
export const getJobApplicants = async (jobId) => {
  const res = await fetch(`${baseUrl}/api/jobs/${jobId}/applicants`, { cache: 'no-store' });
  return res.json();
};

// অ্যাপ্লিকেন্টের স্ট্যাটাস আপডেট করা
export const updateApplicantStatus = async (id, status) => {
  const res = await fetch(`${baseUrl}/api/applications/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  return res.json();
};

// সিকারের নিজের আবেদন করা সব ট্র্যাকিং লিস্ট নিয়ে আসা
export const getSeekerApplications = async (email) => {
  const res = await fetch(`${baseUrl}/api/seeker/applications?email=${email}`, { cache: 'no-store' });
  return res.json();
};

// জব পোস্ট ডিলিট করা
export const deleteJobApi = async (id) => {
  const res = await fetch(`${baseUrl}/api/jobs/${id}`, { method: 'DELETE' });
  return res.json();
};