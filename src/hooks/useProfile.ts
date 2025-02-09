import { useContract } from "./useContract";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/wagmi";

interface ProfileData {
  fullName: string;
  avatar: string;
  github: string;
  linkedin: string;
  role: string;
  skills: string;
  isActive: boolean;
}

interface ProfileArgs {
  args: (string | boolean)[];
}

export function useProfile(walletAddress?: string) {
  const { address } = useAccount();
  const router = useRouter();
  const contract = useContract("Profile");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  const targetAddress = walletAddress || address;
  const isOwnProfile = address?.toLowerCase() === targetAddress?.toLowerCase();

  useEffect(() => {
    const checkAndRedirect = async () => {
      if (!address) return;

      try {
        // Kiểm tra xem địa chỉ có profile chưa
        const hasProfileResult = await contract.hasProfile(
          address as `0x${string}`
        );
        setHasProfile(!!hasProfileResult);

        // Nếu chưa có profile và đang ở trang khác, chuyển đến trang profile
        if (
          !hasProfileResult &&
          !window.location.pathname.includes("/profile/")
        ) {
          router.push(`/profile/${address}`);
        }

        // Load profile nếu có
        if (hasProfileResult) {
          await loadProfile();
        }
      } catch (error) {
        console.error("Error checking profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAndRedirect();
  }, [address]);

  const loadProfile = async () => {
    if (!targetAddress) return;

    try {
      const profileDataArray = await contract.getProfile(
        targetAddress as `0x${string}`
      );

      if (profileDataArray) {
        const profileData: ProfileData = {
          fullName: profileDataArray[0] || "",
          avatar: profileDataArray[1] || "",
          github: profileDataArray[2] || "",
          linkedin: profileDataArray[3] || "",
          role: profileDataArray[4] || "Frontend Developer", // Default value if not provided
          skills: profileDataArray[5] || "",
          isActive: true, // Set this based on your logic
        };

        setProfile(profileData);
        setHasProfile(true);
      } else {
        setHasProfile(false);
        if (isOwnProfile) {
          router.push(`/profile/${address}`);
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      setHasProfile(false);
    } finally {
      setIsLoading(false);
    }
  };

  const createProfile = async ({ args }: ProfileArgs) => {
    const hash = await contract.createProfile(args);
    if (hash) {
      await waitForTransactionReceipt(config, { hash });
      await loadProfile();
    }
  };

  const updateProfile = async ({ args }: ProfileArgs) => {
    const hash = await contract.updateProfile(args);
    if (hash) {
      await waitForTransactionReceipt(config, { hash });
      await loadProfile();
    }
  };

  return {
    profile,
    hasProfile,
    isOwnProfile,
    isLoading,
    createProfile,
    updateProfile,
    loadProfile,
  };
}
