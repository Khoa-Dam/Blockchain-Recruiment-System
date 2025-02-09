"use client";

import { useContract } from "@/hooks/useContract";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const contract = useContract("Profile");
  const [stats, setStats] = useState({
    totalProfiles: 0,
    totalJobs: 0, // Placeholder, sẽ cập nhật sau khi thêm logic công việc vào contract
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Lấy tổng số profile từ contract
        const [addresses] = await contract.profiles;
        const totalProfiles = addresses.length;

        // Placeholder: Tổng số công việc (sẽ cập nhật sau khi thêm logic công việc vào contract)
        const totalJobs = 0;

        setStats({
          totalProfiles,
          totalJobs,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Card: Tổng số profile */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Profiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProfiles}</div>
          </CardContent>
        </Card>

        {/* Card: Tổng số công việc (Placeholder) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
