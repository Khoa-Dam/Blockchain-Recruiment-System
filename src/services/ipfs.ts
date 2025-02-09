"use client";

import axios from "axios";

export const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Lấy API key và secret từ .env
    const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
    const pinataSecret = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

    if (!pinataApiKey || !pinataSecret) {
      throw new Error("Pinata API key or secret is missing");
    }

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecret,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    if (response.data && response.data.IpfsHash) {
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } else {
      throw new Error("Invalid response from Pinata");
    }
  } catch (error) {
    console.error("Error uploading to IPFS via Pinata:", error);
    throw error;
  }
};
