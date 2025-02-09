"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

// Định nghĩa types
type CandidateStatus =
  | "SOURCED"
  | "IN_PROGRESS"
  | "INTERVIEW"
  | "HIRED"
  | "REJECTED";

interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  linkedin?: string;
  status: CandidateStatus;
  notes?: number;
  comments?: number;
}

const statusColors: Record<CandidateStatus, string> = {
  SOURCED: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  INTERVIEW: "bg-purple-100 text-purple-800",
  HIRED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

const candidates: Candidate[] = [
  {
    id: "1",
    name: "Sonia Hoppe",
    email: "hon-sonia52@gmail.com",
    avatar: "/avatars/1.png",
    linkedin: "linkedin.com/sonia",
    status: "SOURCED",
    notes: 4,
    comments: 1,
  },
  {
    id: "1",
    name: "Sonia Hoppe",
    email: "hon-sonia52@gmail.com",
    avatar: "/avatars/1.png",
    linkedin: "linkedin.com/sonia",
    status: "SOURCED",
    notes: 4,
    comments: 1,
  },
  {
    id: "1",
    name: "Sonia Hoppe",
    email: "hon-sonia52@gmail.com",
    avatar: "/avatars/1.png",
    linkedin: "linkedin.com/sonia",
    status: "SOURCED",
    notes: 4,
    comments: 1,
  },
  {
    id: "1",
    name: "Sonia Hoppe",
    email: "hon-sonia52@gmail.com",
    avatar: "/avatars/1.png",
    linkedin: "linkedin.com/sonia",
    status: "IN_PROGRESS",
    notes: 4,
    comments: 1,
  },
  // Thêm các candidates khác...
];

const RecruitmentPage = () => {
  const groupedCandidates = candidates.reduce((acc, candidate) => {
    if (!acc[candidate.status]) {
      acc[candidate.status] = [];
    }
    acc[candidate.status].push(candidate);
    return acc;
  }, {} as Record<CandidateStatus, Candidate[]>);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/jobs"
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Job List
          </Link>
          <h1 className="text-2xl font-semibold">UI/UX Designer</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Search className="w-4 h-4" />
            <Input
              type="text"
              placeholder="Search name or email here..."
              className="border-none shadow-none focus-visible:ring-0"
            />
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Candidate
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-4">
        {Object.entries(groupedCandidates).map(([status, statusCandidates]) => (
          <div key={status} className="flex flex-col gap-4">
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    statusColors[status as CandidateStatus]
                  }`}
                >
                  {status.replace("_", " ")}
                </span>
                <span className="text-gray-500 text-sm">
                  {statusCandidates.length}
                </span>
              </div>
            </div>

            {/* Candidates */}
            {statusCandidates.map((candidate) => (
              <Card key={candidate.id} className="p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                      <Image
                        src={candidate.avatar}
                        alt={candidate.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{candidate.name}</h3>
                      <p className="text-sm text-gray-500">{candidate.email}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    LinkedIn
                  </Button>
                  <div className="flex items-center gap-4">
                    {candidate.notes && (
                      <span className="flex items-center gap-1">
                        <span>{candidate.notes}</span>
                        <span>Notes</span>
                      </span>
                    )}
                    {candidate.comments && (
                      <span className="flex items-center gap-1">
                        <span>{candidate.comments}</span>
                        <span>Comments</span>
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentPage;
