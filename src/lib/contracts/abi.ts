export const ABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "provider",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "publicKey",
          type: "bytes",
        },
      ],
      name: "PublicKeyRegistered",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "originalSigner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "publicKey",
          type: "bytes",
        },
      ],
      name: "SignerAddressProduced",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "user", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "nonce",
          type: "uint256",
        },
      ],
      name: "UserAdded",
      type: "event",
    },
    {
      inputs: [],
      name: "UNCLAIMED_OFFER_NONCE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "loanProvider", type: "string" },
        { internalType: "uint256", name: "borrowAmount", type: "uint256" },
        { internalType: "address payable", name: "targetAddr", type: "address" },
        { internalType: "uint256", name: "expiryUnix", type: "uint256" },
        { internalType: "uint256", name: "nonce", type: "uint256" },
        { internalType: "bytes", name: "signature", type: "bytes" },
      ],
      name: "acceptOffer",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "loanProvider", type: "string" },
        { internalType: "bytes", name: "key", type: "bytes" },
      ],
      name: "addLoanProviderToSystem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "addUserToSystem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "lenders",
      outputs: [
        { internalType: "string", name: "name", type: "string" },
        { internalType: "bytes", name: "publicKey", type: "bytes" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "addr", type: "address" }],
      name: "setTransferFundsContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "transferFundsContract",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "users",
      outputs: [
        { internalType: "address", name: "walletAddress", type: "address" },
        { internalType: "uint256", name: "nonce", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  