// "use client";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Search, ChevronLeft, Plus } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import Link from "next/link";
// import { useContract } from "@/hooks/useContract";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// // Định nghĩa types
// type CandidateStatus =
//   | "SOURCED"
//   | "IN_PROGRESS"
//   | "INTERVIEW"
//   | "HIRED"
//   | "REJECTED";

// interface Candidate {
//   id: string;
//   name: string;
//   email: string;
//   avatar: string;
//   linkedin?: string;
//   status: CandidateStatus;
//   notes?: number;
//   comments?: number;
// }

// interface Job {
//   id: string;
//   title: string;
//   description: string;
//   role: string;
//   isOpen: boolean;
//   candidates: string[]; // Danh sách địa chỉ ứng viên
// }

// const statusColors: Record<CandidateStatus, string> = {
//   SOURCED: "bg-yellow-100 text-yellow-800",
//   IN_PROGRESS: "bg-blue-100 text-blue-800",
//   INTERVIEW: "bg-purple-100 text-purple-800",
//   HIRED: "bg-green-100 text-green-800",
//   REJECTED: "bg-red-100 text-red-800",
// };

// const candidates: Candidate[] = [
//   {
//     id: "1",
//     name: "Sonia Hoppe",
//     email: "hon-sonia52@gmail.com",
//     avatar: "/avatars/1.png",
//     linkedin: "linkedin.com/sonia",
//     status: "SOURCED",
//     notes: 4,
//     comments: 1,
//   },
//   {
//     id: "1",
//     name: "Sonia Hoppe",
//     email: "hon-sonia52@gmail.com",
//     avatar: "/avatars/1.png",
//     linkedin: "linkedin.com/sonia",
//     status: "SOURCED",
//     notes: 4,
//     comments: 1,
//   },
//   {
//     id: "1",
//     name: "Sonia Hoppe",
//     email: "hon-sonia52@gmail.com",
//     avatar: "/avatars/1.png",
//     linkedin: "linkedin.com/sonia",
//     status: "SOURCED",
//     notes: 4,
//     comments: 1,
//   },
//   {
//     id: "1",
//     name: "Sonia Hoppe",
//     email: "hon-sonia52@gmail.com",
//     avatar: "/avatars/1.png",
//     linkedin: "linkedin.com/sonia",
//     status: "IN_PROGRESS",
//     notes: 4,
//     comments: 1,
//   },
//   // Thêm các candidates khác...
// ];

// export default function RecruitmentPage() {
//   const contract = useContract("Profile");
//   const router = useRouter();
//   const { searchParams } = new URL(window.location.href);
//   const jobId = searchParams.get("jobId");
//   const [job, setJob] = useState(null);
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Example Jobs (can be fetched from an API or local storage)
//   const initialJobs: Job[] = [
//     {
//       id: "1",
//       title: "Frontend Developer",
//       description: "Develop user interfaces for web applications.",
//       role: "Frontend Developer",
//       isOpen: true,
//       candidates: [],
//     },
//     {
//       id: "2",
//       title: "Backend Developer",
//       description: "Develop server-side logic and APIs.",
//       role: "Backend Developer",
//       isOpen: true,
//       candidates: [],
//     },
//   ];

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         if (!contract) {
//           throw new Error("Contract is not initialized");
//         }

//         // Load profiles from contract using getAllProfiles
//         const profilesData = await contract.getAllProfiles();
//         setProfiles(profilesData);

//         // Simulate fetching job details based on jobId
//         const jobDetails = initialJobs.find((j) => j.id === jobId);
//         setJob(jobDetails);
//       } catch (error) {
//         console.error("Error loading data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [contract, jobId]);

//   if (loading) return <div>Loading...</div>;

//   if (!job) return <div>Job not found.</div>;

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">{job.title}</h1>
//       <p>{job.description}</p>
//       <p>Role: {job.role}</p>
//       <h3 className="font-semibold mt-4">Candidates:</h3>
//       <ul>
//         {profiles
//           .filter((profile) => profile.role === job.role)
//           .map((profile, idx) => (
//             <li key={idx}>{profile.fullName}</li>
//           ))}
//       </ul>
//     </div>
//   );
// }
