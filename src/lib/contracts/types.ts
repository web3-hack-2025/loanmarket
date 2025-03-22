// Contract interface definitions for easy swapping between implementations

// Basic contract interface 
export interface IContract {
  address: `0x${string}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi: any[];
}

// Loan contract interface
export interface ILoanContract extends IContract {
  name: string;
  version: string;
}

// Contract configuration
export interface ContractConfig {
  loanContract: ILoanContract;
  network: {
    chainId: number;
    name: string;
  };
}

// Different contract implementations can be added here
export const CONTRACTS = {
  TESTNET: {
    loanContract: {
      name: "SimpleLoan",
      version: "1.0.0",
      address: "0xBf9646d4408Da5E50C019c24A41c35cc72881186" as `0x${string}`,
      abi: [
        { inputs: [{ name: "num", type: "uint256" }], name: "store", type: "function", stateMutability: "nonpayable" },
        { inputs: [], name: "retrieve", type: "function", stateMutability: "view", outputs: [{ type: "uint256" }] }
      ]
    },
    network: {
      chainId: 11155111, // Sepolia testnet
      name: "Sepolia"
    }
  },
  // This can be uncommented and filled in when the HardHat contract is ready
  // HARDHAT: {
  //   loanContract: {
  //     name: "LoanOffer",
  //     version: "1.0.0",
  //     address: "0x...", // To be filled with HardHat deployed contract address
  //     abi: [] // To be filled with HardHat generated ABI
  //   },
  //   network: {
  //     chainId: 31337, // HardHat local network
  //     name: "HardHat"
  //   }
  // }
};

// Default configuration - can be switched between different implementations
export const defaultContractConfig: ContractConfig = CONTRACTS.TESTNET;
