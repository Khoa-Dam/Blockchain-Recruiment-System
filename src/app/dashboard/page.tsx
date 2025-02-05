"use client";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, UserCheck, Clock, Briefcase } from "lucide-react";

const data = [
  { name: "Jan", applications: 400 },
  { name: "Feb", applications: 300 },
  { name: "Mar", applications: 600 },
  { name: "Apr", applications: 800 },
  { name: "May", applications: 500 },
  { name: "Jun", applications: 700 },
];

const recentJobs = [
  {
    title: "Senior Frontend Developer",
    department: "Development",
    type: "Full-time",
    applications: 45,
    status: "Active",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    type: "Full-time",
    applications: 32,
    status: "Active",
  },
  {
    title: "Product Manager",
    department: "Product",
    type: "Full-time",
    applications: 28,
    status: "Closed",
  },
  {
    title: "Marketing Specialist",
    department: "Marketing",
    type: "Contract",
    applications: 15,
    status: "Active",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Candidates</p>
              <h3 className="text-2xl font-bold">1,234</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hired This Month</p>
              <h3 className="text-2xl font-bold">45</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Reviews</p>
              <h3 className="text-2xl font-bold">28</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Applications Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Applications Overview</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Job Postings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Job Postings</h3>
        <div className="space-y-4">
          {recentJobs.map((job, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {job.department} • {job.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {job.applications} Applications
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      job.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
