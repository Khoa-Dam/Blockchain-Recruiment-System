"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Job {
  id: string;
  title: string;
  description: string;
  role: string;
  isOpen: boolean;
}

const initialJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    description: "Develop user interfaces for web applications.",
    role: "Frontend Developer",
    isOpen: true,
  },
  {
    id: "2",
    title: "Backend Developer",
    description: "Develop server-side logic and APIs.",
    role: "Backend Developer",
    isOpen: true,
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const router = useRouter();

  const handleJobClick = (job: Job) => {
    router.push(`/recruitment?jobId=${job.id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Jobs</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card
            key={job.id}
            onClick={() => handleJobClick(job)}
            className="cursor-pointer"
          >
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{job.description}</p>
              <p>Status: {job.isOpen ? "Open" : "Closed"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
