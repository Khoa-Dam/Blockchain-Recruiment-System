// app/page.tsx (hoặc pages/index.tsx nếu dùng pages directory)
"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation"; // Dùng useRouter của Next.js 13
import ConnectCustom from "@/components/ConnectCustom";

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();

  // Khi đã connect, tự động chuyển hướng sang /dashboard
  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected, router]);

  return (
    <div
      className={`mt-3 flex ${
        isConnected ? "justify-end" : "justify-center h-screen"
      } items-center`}
    >
      <ConnectCustom />
    </div>
  );
}
