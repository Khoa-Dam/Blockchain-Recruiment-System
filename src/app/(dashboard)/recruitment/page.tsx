"use client";

import Loading from "@/components/Loading";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Job {
  _id: string;
  title: string;
  description: string;
  role: string;
}

export default function RecruitmentPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchJobs();
    }
  }, [isClient]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/jobs`
      );
      console.log("check data All Jobs", response.data.data);
      setJobs(response.data.data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching jobs",
        description: error.response?.data?.message || error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isClient || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  const handleJobClick = (job: Job) => {
    router.push(`/recruitment/${job._id}`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Job Listings</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="relative duration-300 hover:-rotate-0 -rotate-5 group  border-sky-900 border-4 overflow-hidden rounded-2xl h-auto sm:h-72 w-full sm:w-auto bg-sky-800 p-4 sm:p-5 flex flex-col items-start gap-4"
            >
              <div className="text-gray-50 w-full">
                <span className="font-bold text-xl sm:text-2xl md:text-3xl">
                  {job.title}
                </span>
                <p className="text-xs sm:text-sm">{job.role}</p>
                <p className="text-sm overflow-hidden text-ellipsis whitespace-normal line-clamp-3 sm:line-clamp-4">
                  {job.description}
                </p>
              </div>
              <button
                onClick={() => handleJobClick(job)}
                className="duration-300 hover:bg-sky-900 border hover:text-gray-50 bg-gray-50 font-semibold text-sky-800 px-3 py-2 flex flex-row items-center gap-3 text-sm sm:text-base"
              >
                View Details
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 fill-current"
                  height="100"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 100 100"
                  width="100"
                  x="0"
                  xmlns="http://www.w3.org/2000/svg"
                  y="0"
                >
                  <path
                    d="M22.1,77.9a4,4,0,0,1,4-4H73.9a4,4,0,0,1,0,8H26.1A4,4,0,0,1,22.1,77.9ZM35.2,47.2a4,4,0,0,1,5.7,0L46,52.3V22.1a4,4,0,1,1,8,0V52.3l5.1-5.1a4,4,0,0,1,5.7,0,4,4,0,0,1,0,5.6l-12,12a3.9,3.9,0,0,1-5.6,0l-12-12A4,4,0,0,1,35.2,47.2Z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>

              <svg
                className="group-hover:scale-125 duration-500 absolute -bottom-0.5 -right-20 w-36 h-36 sm:w-48 sm:h-48 z-10 -my-2 fill-gray-50 stroke-sky-900"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
              >
                <path
                  data-name="layer1"
                  d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z"
                  strokeMiterlimit="10"
                  strokeWidth="5"
                ></path>
              </svg>

              <svg
                className="group-hover:scale-125 duration-200 absolute -bottom-0.5 -right-20 w-36 h-36 sm:w-48 sm:h-48 z-10 -my-2 fill-gray-50 stroke-sky-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
              >
                <path
                  data-name="layer1"
                  d="M 50.4 51 C 40.5 49.1 40 46 40 44 v -1.2 a 18.9 18.9 0 0 0 5.7 -8.8 h 0.1 c 3 0 3.8 -6.3 3.8 -7.3 s 0.1 -4.7 -3 -4.7 C 53 4 30 0 22.3 6 c -5.4 0 -5.9 8 -3.9 16 c -3.1 0 -3 3.8 -3 4.7 s 0.7 7.3 3.8 7.3 c 1 3.6 2.3 6.9 4.7 9 v 1.2 c 0 2 0.5 5 -9.5 6.8 S 2 62 2 62 h 60 a 14.6 14.6 0 0 0 -11.6 -11 z"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}
