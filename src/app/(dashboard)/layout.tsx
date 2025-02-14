"use client";
import { AppSidebar } from "@/components/SideBar";
import ConnectCustom from "@/components/ConnectCustom";
import { useEffect } from "react";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, isLoading, address } = useAuthCheck();
  const { hasProfile } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isConnected) {
      router.push("/");
    }
  }, [isConnected, isLoading, router]);

  useEffect(() => {
    if (
      isConnected &&
      !hasProfile &&
      !window.location.pathname.includes("/profile/")
    ) {
      router.push(`/profile/${address}`);
    }
  }, [isConnected, hasProfile, address, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isConnected) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Main content */}
      <div className="flex flex-1 relative">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b ">
              <div className="flex items-center justify-between gap-2 px-3">
                <SidebarTrigger />
                {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
                <ConnectCustom />
              </div>
            </header>
            <main className="flex-1 p-4 sm:p-8 overflow-auto bg-background">
              {children}
            </main>
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
