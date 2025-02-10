"use client";
import { Sidebar } from "@/components/SideBar";
import ConnectCustom from "@/components/ConnectCustom";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      {/* Header */}
      <header className="flex items-center justify-between p-2 sm:p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="p-2 sm:p-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                K
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-semibold">BordUp™</h2>
              </div>
            </div>
            {/* <div className="mt-1">
              <h3 className="text-xs sm:text-sm font-medium">
                {address
                  ? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : "Rocks Company"}
              </h3>
            </div> */}
          </div>
        </div>
        <div>
          <ConnectCustom />
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 relative">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <Sidebar
          className={`absolute md:relative md:flex ${
            isSidebarOpen ? "flex" : "hidden"
          }`}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 p-4 sm:p-8 overflow-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
