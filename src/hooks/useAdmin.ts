import { useAccount } from "wagmi";

const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS || "";

export const useAdmin = () => {
  const { address } = useAccount();

  return {
    isAdmin: address?.toLowerCase() === ADMIN_ADDRESS.toLowerCase(),
  };
};
