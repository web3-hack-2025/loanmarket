import React, { createContext, useContext, useState } from "react";
import { Loan } from "@/components/loans-table";

interface AdjustedLoansContextProps {
  adjustedLoans: Loan[];
  setAdjustedLoans: React.Dispatch<React.SetStateAction<Loan[]>>;
  setFetchedAdjustedLoans: (offers: string[], loanTerm: string) => void;
  updateAdjustedLoans: (requestedAmount: string) => void;
}

const loanOverlay: Loan[] = [
  {
    id: "1",
    name: "Bitcoin Backed Loan",
    provider: "Nexo",
    interestRate: "8.9%",
    term: "12 months",
    collateralRequired: "BTC",
    maxAmount: "$100,000",
    status: "available",
  },
  {
    id: "2",
    name: "Ethereum Flexible Loan",
    provider: "Aave",
    interestRate: "3.5%",
    term: "Open-ended",
    collateralRequired: "ETH",
    maxAmount: "$50,000",
    status: "available",
  },
  {
    id: "3",
    name: "Stablecoin Loan",
    provider: "Compound",
    interestRate: "5.2%",
    term: "6 months",
    collateralRequired: "USDC, DAI",
    maxAmount: "$25,000",
    status: "available",
  },
  {
    id: "4",
    name: "Flash Loan",
    provider: "dYdX",
    interestRate: "1% flat fee",
    term: "Instant",
    collateralRequired: "None",
    maxAmount: "$1,000,000",
    status: "limited",
  },
  {
    id: "5",
    name: "DeFi Yield Farming Loan",
    provider: "Maker",
    interestRate: "Variable",
    term: "3-24 months",
    collateralRequired: "Multiple assets",
    maxAmount: "$200,000",
    status: "coming soon",
  },
  {
    id: "6",
    name: "Home Loan Special",
    provider: "ANZ NZ",
    interestRate: "5.79%",
    term: "1 year fixed",
    collateralRequired: "Property",
    maxAmount: "$800,000",
    status: "available",
  },
  {
    id: "7",
    name: "Personal Loan",
    provider: "ASB Bank",
    interestRate: "12.95%",
    term: "1-7 years",
    collateralRequired: "None",
    maxAmount: "$50,000",
    status: "available",
  },
  {
    id: "8",
    name: "Car Loan",
    provider: "Westpac NZ",
    interestRate: "9.95%",
    term: "1-5 years",
    collateralRequired: "Vehicle",
    maxAmount: "$100,000",
    status: "available",
  },
  {
    id: "9",
    name: "Business Loan",
    provider: "BNZ",
    interestRate: "7.85%",
    term: "1-15 years",
    collateralRequired: "Business assets",
    maxAmount: "$500,000",
    status: "available",
  },
  {
    id: "10",
    name: "Kiwibank Home Loan",
    provider: "Kiwibank",
    interestRate: "5.69%",
    term: "2 years fixed",
    collateralRequired: "Property",
    maxAmount: "$1,000,000",
    status: "available",
  },

  {
    id: "12",
    name: "First Home Loan",
    provider: "Co-operative Bank",
    interestRate: "5.75%",
    term: "30 years max",
    collateralRequired: "Property",
    maxAmount: "$600,000",
    status: "available",
  },
  {
    id: "13",
    name: "Crypto-Backed Loan",
    provider: "Easy Crypto",
    interestRate: "3.5%",
    term: "3-12 months",
    collateralRequired: "BTC, ETH",
    maxAmount: "$500,000",
    status: "available",
  },
  {
    id: "14",
    name: "Investment Property Loan",
    provider: "SBS Bank",
    interestRate: "6.15%",
    term: "1-30 years",
    collateralRequired: "Property",
    maxAmount: "$2,000,000",
    status: "available",
  },
  {
    id: "15",
    name: "Renovation Loan",
    provider: "TSB Bank",
    interestRate: "6.99%",
    term: "1-10 years",
    collateralRequired: "Property",
    maxAmount: "$100,000",
    status: "available",
  },
];

const AdjustedLoansContext = createContext<
  AdjustedLoansContextProps | undefined
>(undefined);

const getRandomIndex = (max: number) => Math.floor(Math.random() * max);

export const AdjustedLoansProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [adjustedLoans, setAdjustedLoans] = useState<Loan[]>([]);

  const setFetchedAdjustedLoans = (offers: string[], loanTerm: string) => {
    console.log("Setting fetched adjusted loans", offers);
    setAdjustedLoans(
      offers.map((offer) => ({
        ...loanOverlay[getRandomIndex(loanOverlay.length - 1)],
        term: loanTerm,
        offer,
      }))
    );
  };

  const updateAdjustedLoans = (requestedAmount: string) => {
    console.log("Updating adjusted loans", { requestedAmount, adjustedLoans });
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };

    const adjusted = adjustedLoans.map((loan) => {
      const randomFactor = Math.random() * 0.2 + 0.9; // Between 0.9 and 1.1
      const baseAmount = parseFloat(requestedAmount.replace(/,/g, "")) || 5000;
      const adjustedAmount = Math.round(baseAmount * randomFactor);

      return {
        ...loan,
        maxAmount: `$${formatCurrency(adjustedAmount)}`,
      };
    });

    setAdjustedLoans(adjusted);
  };

  return (
    <AdjustedLoansContext.Provider
      value={{
        adjustedLoans,
        setAdjustedLoans,
        updateAdjustedLoans,
        setFetchedAdjustedLoans,
      }}
    >
      {children}
    </AdjustedLoansContext.Provider>
  );
};

export const useAdjustedLoans = () => {
  const context = useContext(AdjustedLoansContext);
  if (!context) {
    throw new Error(
      "useAdjustedLoans must be used within an AdjustedLoansProvider"
    );
  }
  return context;
};
