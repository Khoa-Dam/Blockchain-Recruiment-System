export const profileABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "newAvatar",
        type: "string",
      },
    ],
    name: "AvatarUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_fullName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_avatar",
        type: "string",
      },
      {
        internalType: "string",
        name: "_github",
        type: "string",
      },
      {
        internalType: "string",
        name: "_linkedin",
        type: "string",
      },
      {
        internalType: "string",
        name: "_role",
        type: "string",
      },
      {
        internalType: "string",
        name: "_skills",
        type: "string",
      },
    ],
    name: "createProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "ProfileCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "ProfileUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_avatar",
        type: "string",
      },
    ],
    name: "setAvatar",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_fullName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_avatar",
        type: "string",
      },
      {
        internalType: "string",
        name: "_github",
        type: "string",
      },
      {
        internalType: "string",
        name: "_linkedin",
        type: "string",
      },
      {
        internalType: "string",
        name: "_role",
        type: "string",
      },
      {
        internalType: "string",
        name: "_skills",
        type: "string",
      },
    ],
    name: "updateProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllProfiles",
    outputs: [
      {
        internalType: "address[]",
        name: "addresses",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "string",
            name: "fullName",
            type: "string",
          },
          {
            internalType: "string",
            name: "avatar",
            type: "string",
          },
          {
            internalType: "string",
            name: "github",
            type: "string",
          },
          {
            internalType: "string",
            name: "linkedin",
            type: "string",
          },
          {
            internalType: "string",
            name: "role",
            type: "string",
          },
          {
            internalType: "string",
            name: "skills",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct Profile.UserProfile[]",
        name: "userProfiles",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getProfile",
    outputs: [
      {
        internalType: "string",
        name: "fullName",
        type: "string",
      },
      {
        internalType: "string",
        name: "avatar",
        type: "string",
      },
      {
        internalType: "string",
        name: "github",
        type: "string",
      },
      {
        internalType: "string",
        name: "linkedin",
        type: "string",
      },
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
      {
        internalType: "string",
        name: "skills",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_role",
        type: "string",
      },
    ],
    name: "getProfileCountByRole",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_role",
        type: "string",
      },
    ],
    name: "getProfilesByRole",
    outputs: [
      {
        internalType: "address[]",
        name: "addresses",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "string",
            name: "fullName",
            type: "string",
          },
          {
            internalType: "string",
            name: "avatar",
            type: "string",
          },
          {
            internalType: "string",
            name: "github",
            type: "string",
          },
          {
            internalType: "string",
            name: "linkedin",
            type: "string",
          },
          {
            internalType: "string",
            name: "role",
            type: "string",
          },
          {
            internalType: "string",
            name: "skills",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
        ],
        internalType: "struct Profile.UserProfile[]",
        name: "userProfiles",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "hasProfile",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
