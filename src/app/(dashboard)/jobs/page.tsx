"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Briefcase } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  description: string;
  role: string;
  isOpen: boolean;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    role: "",
    isOpen: true,
  });
  const router = useRouter();

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/jobs");
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const createJob = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/jobs/create-job",
        newJob
      );
      setJobs([...jobs, response.data]);
      setNewJob({ title: "", description: "", role: "", isOpen: true });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []); //Fixed useEffect dependency issue

  const handleJobClick = (job: Job) => {
    router.push(`/recruitment?jobId=${job._id}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Job Listings</h1>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-primary text-primary-foreground"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Job
        </Button>
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <Card className="w-full max-w-lg bg-white shadow-lg">
            <CardHeader>
              <CardTitle>Create New Job</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createJob();
                }}
                className="space-y-4"
              >
                <Input
                  placeholder="Job Title"
                  value={newJob.title}
                  onChange={(e) =>
                    setNewJob({ ...newJob, title: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Job Description"
                  value={newJob.description}
                  onChange={(e) =>
                    setNewJob({ ...newJob, description: e.target.value })
                  }
                />
                <Input
                  placeholder="Job Role"
                  value={newJob.role}
                  onChange={(e) =>
                    setNewJob({ ...newJob, role: e.target.value })
                  }
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Job</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card
            key={job._id}
            onClick={() => handleJobClick(job)}
            className="cursor-pointer transition-shadow hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                {job.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{job.description}</p>
              <p className="text-sm font-medium">Role: {job.role}</p>
              <p
                className={`text-sm font-medium ${
                  job.isOpen ? "text-green-600" : "text-red-600"
                }`}
              >
                Status: {job.isOpen ? "Open" : "Closed"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
