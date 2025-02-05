"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter, usePathname } from "next/navigation";

interface UseAuthCheckReturn {
  isConnected: boolean;
  isLoading: boolean;
  address: `0x${string}` | undefined;
}

type AuthError = {
  message: string;
  code?: string;
};

export const useAuthCheck = (): UseAuthCheckReturn => {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        // Chỉ chuyển hướng về trang chủ nếu không có kết nối và không ở trang chủ
        if (!isConnected && pathname !== "/") {
          await router.push("/");
        }
      } catch (error: unknown) {
        const authError = error as AuthError;
        console.error("Auth check error:", {
          message: authError.message,
          code: authError.code,
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isConnected, router, pathname]);

  return {
    isConnected,
    isLoading,
    address,
  };
};
