// Contract interface definitions for easy swapping between implementations

import { ABI } from "@/lib/contracts/abi";

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
      name: "Identify Verifier",
      version: "1.0.0",
      address: "0x301c394298c3bFfE57E0638294b1c69D42829109" as `0x${string}`,
      abi: ABI
    },
    network: {
      chainId: 11155111, // Sepolia testnet
      name: "Sepolia"
    }
  },
};

// Default configuration - can be switched between different implementations
export const defaultContractConfig: ContractConfig = CONTRACTS.TESTNET;
