import { defaultContractConfig } from './types';

// This file will act as a service layer for contract interactions
// It can be expanded with more specific methods as the loan contract functionality grows

export function getLoanContractConfig() {
  // This could be enhanced to dynamically select between contract
  // configurations based on environment variables or other app state
  return defaultContractConfig.loanContract;
}

export function getNetworkConfig() {
  return defaultContractConfig.network;
}

// Future methods for specific loan contract interactions can be added here:
// - createLoanOffer
// - acceptLoanOffer
// - payInstallment
// - etc.

// Helper methods to format contract data
export function formatLoanAmount(amount: string): bigint {
  // Remove any non-numeric characters except periods
  const cleanAmount = amount.replace(/[^0-9.]/g, "");
  console.log(amount, cleanAmount)
  // Convert to bigint (floor to handle decimals since contracts expect integers)
  return BigInt(Math.floor(parseFloat(cleanAmount)));
}

export function parseLoanAmount(value: bigint): string {
  // Convert from contract representation to display format
  return value.toString();
}
