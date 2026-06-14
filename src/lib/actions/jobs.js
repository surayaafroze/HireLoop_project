'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ;

export const createJob = async (newJobsData) => {
  try {
    const res = await fetch(`${baseUrl}/api/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJobsData),
    });
    return res.json();
  } catch (error) {
    console.error("Server Action Error:", error);
    return { error: true, message: "Internal Server Error" };
  }
};