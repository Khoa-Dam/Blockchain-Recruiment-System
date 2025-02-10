"use client";

import { useContract } from "@/hooks/useContract";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Hàm tạo màu động
const generateColor = (index: number, total: number) => {
  // Tính t là tỷ lệ index trong tổng số phần tử, đảm bảo mẫu số không bằng 0
  const t = index / Math.max(total - 1, 1);
  let hue: number;

  if (t <= 0.5) {
    // Nội suy từ blue đến red:
    // Khi t = 0, hue = 240 (blue)
    // Khi t = 0.5, hue = 0 (red)
    const factor = t / 0.5; // factor chạy từ 0 đến 1
    hue = 240 * (1 - factor);
  } else {
    // Nội suy từ red đến yellow:
    // Khi t = 0.5, hue = 0 (red)
    // Khi t = 1, hue = 60 (yellow)
    const factor = (t - 0.5) / 0.5; // factor chạy từ 0 đến 1
    hue = 60 * factor;
  }

  const saturation = 80; // Giảm độ bão hòa xuống 50% cho màu nhẹ nhàng hơn
  const lightness = 65; // Tăng độ sáng lên 65% cho sự hài hòa

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

interface Stats {
  totalProfiles: number;
  totalJobs: number;
  profilesByRole: { [key: string]: number };
}

export default function DashboardPage() {
  const contract = useContract("Profile");
  const [stats, setStats] = useState<Stats>({
    totalProfiles: 0,
    totalJobs: 0,
    profilesByRole: {},
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const profiles = await contract.profiles;
        if (!profiles) {
          throw new Error("Profiles data is undefined");
        }

        const [addresses, profileData] = profiles;
        const totalProfiles = addresses.length;
        const totalJobs = 2; // Placeholder

        const profilesByRole = profileData.reduce<{ [key: string]: number }>(
          (acc, profile) => {
            const role = profile.role || "Unknown";
            if (!acc[role]) {
              acc[role] = 0;
            }
            acc[role] += 1;
            return acc;
          },
          {}
        );

        setStats({
          totalProfiles,
          totalJobs,
          profilesByRole,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [contract.profiles]);

  const { barChartData, pieChartData, colors } = useMemo(() => {
    const roles = Object.keys(stats.profilesByRole);
    const totalRoles = roles.length;

    const barChartData = roles.map((role, index) => ({
      role,
      count: stats.profilesByRole[role],
      color: generateColor(index, totalRoles),
    }));

    const pieChartData = [
      { name: "Profiles", value: stats.totalProfiles },
      { name: "Jobs", value: stats.totalJobs },
    ];

    const colors = roles.map((_, index) => generateColor(index, totalRoles));

    return { barChartData, pieChartData, colors };
  }, [stats]);

  if (loading) return <div>Loading...</div>;

  // Tính toán kích thước dựa trên số lượng vai trò
  const barSize = Math.max(10, 40 - barChartData.length * 2); // Giảm kích thước thanh khi có nhiều vai trò hơn
  const fontSize = Math.max(8, 12 - barChartData.length * 0.5); // Giảm kích thước font chữ khi có nhiều vai trò hơn

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Profiles by Role</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-[calc(100%-4rem)]">
            <ChartContainer config={{}} className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="role" tick={{ fontSize }} />
                  <YAxis tick={{ fontSize }} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize }} />
                  <Bar dataKey="count" fill="#8884d8" barSize={barSize}>
                    {barChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="mt-4 text-center font-semibold">
              Total Profiles: {stats.totalProfiles}
            </p>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Total Profiles and Jobs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-[calc(100%-4rem)]">
            <ChartContainer config={{}} className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 text-center">
              <p className="font-semibold">
                Total Profiles: {stats.totalProfiles}
              </p>
              <p className="font-semibold">Total Jobs: {stats.totalJobs}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
