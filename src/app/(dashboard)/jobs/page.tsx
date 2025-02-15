"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Briefcase, Loader2 } from "lucide-react";
import { useAccount } from "wagmi";
import Loading from "@/components/Loading";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface Job {
  _id: string;
  title: string;
  description: string;
  role: string;
  isOpen: boolean;
}

export default function JobsPage() {
  const { toast } = useToast();
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
  const { address } = useAccount();
  const { hasProfile, profile } = useProfile();

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`
      );
      setJobs(response.data.data);
    } catch (error: any) {
      toast({
        title: "Error fetching jobs",
        description: error.response?.data?.message || error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createJob = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/create-job`,
        newJob
      );
      setJobs([...jobs, response.data]);
      setNewJob({ title: "", description: "", role: "", isOpen: true });
      setShowCreateForm(false);
    } catch (error: any) {
      toast({
        title: "Error applying for job:",
        description: error.response?.data?.message || error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        variant: "destructive",
      });
    }
  };

  const checkApplication = async (jobId: string, walletAddress: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/check-application/${jobId}/${walletAddress}`
      );
      return response.data; // Trả về kết quả kiểm tra
    } catch (error: any) {
      toast({
        title: "Error checking application",
        description: error.response?.data?.message || error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        variant: "destructive",
      });
      return false; // Nếu có lỗi, giả sử chưa nộp đơn
    }
  };

  const applyForJob = async (jobId: string, jobRole: string) => {
    setLoading(true);
    if (!hasProfile || !address) {
      toast({
        title: "Application not allowed",
        description: "You need to complete your profile before applying.",
      });
      return;
    }

    if (profile?.role !== jobRole) {
      console.log(profile?.role, "sdfsdgsdg", jobRole);
      toast({
        title: "You are not eligible for this job role.",
      });
      return;
    }

    const hasApplied = await checkApplication(jobId, address); // Kiểm tra xem đã nộp đơn chưa
    console.log("check hasApplied", hasApplied);
    if (hasApplied) {
      toast({
        title: "You have already applied for this job.",
      }); // Thông báo nếu đã nộp đơn
      return;
    }
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/apply/job`, {
        jobId,
        walletAddress: address,
      });
      // router.push(`/recruitment/${jobId}`);
      toast({
        title: "Success!",
        description: "Your application has been successfully submitted.",
      });
    } catch (error: any) {
      toast({
        title: "Error applying for job:",
        description: error.response?.data?.message || error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []); //Fixed useEffect dependency issue

  const handleJobClick = (job: Job) => {
    router.push(`/recruitment/${job._id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm ">
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
                <select
                  value={newJob.role}
                  onChange={(e) =>
                    setNewJob({ ...newJob, role: e.target.value })
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">
                    Full Stack Developer
                  </option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="QA Engineer">QA Engineer</option>
                  <option value="Software Architect">Software Architect</option>
                </select>
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
              <Button
                onClick={() => applyForJob(job._id, job.role)}
                className="mt-2 bg-blue-500 text-white"
              >
                Apply
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
