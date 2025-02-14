"use client";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useContract } from "@/hooks/useContract";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import image from "@/../public/avatars/image.png";

export default function PageAllProfileByJobs() {
  const params = useParams();
  const { getProfile } = useContract("Profile");
  const [profiles, setProfiles] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchProfilesByJobId = useCallback(
    async (jobId: string) => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/applications?jobId=${jobId}`
        );

        const walletAddresses = response.data.walletAddresses || [];

        const profilesData = await Promise.all(
          walletAddresses.map(async (address: string) => {
            const profile = await getProfile(address);
            return {
              fullName: profile[0] || "",
              avatar: profile[1] || "",
              github: profile[2] || "",
              linkedin: profile[3] || "",
              role: profile[4] || "Frontend Developer",
              skills: profile[5] || "",
              isActive: true,
            };
          })
        );

        setProfiles(profilesData);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.response?.data?.message || error.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
    [getProfile, toast]
  );

  useEffect(() => {
    if (params.jobId) {
      fetchProfilesByJobId(params.jobId as string);
    }
  }, [params.jobId, fetchProfilesByJobId]);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Profiles applied for Job</h1>

      {profiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center p-3 sm:p-4 bg-white rounded-md shadow-lg"
            >
              <section className="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#F9C97C] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300 mb-3 sm:mb-0">
                <Image
                  src={profile.avatar || image}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </section>
              <section className="flex-1 sm:border-l sm:border-gray-300 sm:ml-3 sm:pl-3">
                <div className="text-center sm:text-left">
                  <h3 className="text-gray-600 font-semibold text-sm">
                    {profile.fullName}
                  </h3>
                  <h3 className="bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A] text-lg font-bold">
                    {profile.role}
                  </h3>
                  <h3 className="bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] to-[#27272A] text-sm font-bold mt-1">
                    Skills: {profile.skills}
                  </h3>
                </div>
                <div className="flex justify-center sm:justify-start gap-3 mt-2 sm:mt-3">
                  <a
                    href={profile.github || "https://github.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a
                    href={profile.linkedin || "https://www.linkedin.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      className="w-6 h-6 hover:scale-125 duration-200 hover:cursor-pointer"
                      fill="currentColor"
                    >
                      <path
                        d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
                        fill="#0A66C2"
                      />
                    </svg>
                  </a>
                </div>
              </section>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No profiles found.</p>
      )}
    </div>
  );
}
