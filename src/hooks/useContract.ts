import { useWriteContract, useReadContract } from "wagmi";
import { readContract } from "@wagmi/core";
import { profileABI } from "@/contracts/abi/Profile";
import { config } from "@/wagmi";

type ContractName = "Profile";

export function useContract(contractName: ContractName) {
  const { writeContractAsync } = useWriteContract();

  // Write functions - Các hàm ghi dữ liệu lên blockchain
  const createProfile = async (args: any) => {
    return await writeContractAsync({
      address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as `0x${string}`,
      abi: profileABI,
      functionName: "createProfile",
      args,
    });
  };

  const updateProfile = async (args: any) => {
    return await writeContractAsync({
      address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as `0x${string}`,
      abi: profileABI,
      functionName: "updateProfile",
      args,
    });
  };

  // Read functions - Các hàm đọc dữ liệu từ blockchain
  const getProfile = async (address: string) => {
    return await readContract(config, {
      address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as `0x${string}`,
      abi: profileABI,
      functionName: "getProfile",
      args: [address as `0x${string}`],
    });
  };

  const hasProfile = async (address: string) => {
    try {
      const result = await readContract(config, {
        address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as `0x${string}`,
        abi: profileABI,
        functionName: "hasProfile",
        args: [address as `0x${string}`],
      });
      // Nếu cuộc gọi thành công, ta giả sử profile tồn tại (trả về true)

      return Boolean(result);
    } catch (error) {
      console.error("Error checking profile:", error);
      return false;
    }
  };

  // Reactive data - Dữ liệu tự động cập nhật khi có thay đổi
  const { data: profiles } = useReadContract({
    address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as `0x${string}`,
    abi: profileABI,
    functionName: "getAllProfiles",
  });

  return {
    createProfile,
    updateProfile,
    getProfile,
    hasProfile,
    profiles,
  };
}
