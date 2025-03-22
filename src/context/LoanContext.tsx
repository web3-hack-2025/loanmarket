import { createContext, useState, ReactNode } from "react";

interface Loan {
  id: string;
  provider: string;
  name: string;
  interestRate: string;
  term: string;
  collateralRequired: string;
  maxAmount: string;
  status: string;
  description?: string;
}

interface LoanContextType {
  requestedAmount: string;
  setRequestedAmount: (amount: string) => void;
  termLength: string;
  setTermLength: (term: string) => void;
  selectedLoan: Loan | null;
  setSelectedLoan: (loan: Loan | null) => void;
  getMinAmount: () => number;
  getMaxAmount: () => number;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export function LoanProvider({ children }: { children: ReactNode }) {
  const [requestedAmount, setRequestedAmount] = useState<string>("");
  const [termLength, setTermLength] = useState<string>("");
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  // Calculate the minimum amount (10% less than requested)
  const getMinAmount = (): number => {
    const numericAmount = parseFloat(requestedAmount.replace(/,/g, "")) || 0;
    return numericAmount * 0.9;
  };

  // Calculate the maximum amount (10% more than requested)
  const getMaxAmount = (): number => {
    const numericAmount = parseFloat(requestedAmount.replace(/,/g, "")) || 0;
    return numericAmount * 1.1;
  };

  return (
    <LoanContext.Provider
      value={{
        requestedAmount,
        setRequestedAmount,
        termLength,
        setTermLength,
        selectedLoan,
        setSelectedLoan,
        getMinAmount,
        getMaxAmount,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
}

export default LoanContext;
