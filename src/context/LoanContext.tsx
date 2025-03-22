import { createContext, useState, ReactNode, useMemo, useEffect } from "react";

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
  amount?: string;
  dateApproved?: string;
}

export interface LoanContextType {
  requestedAmount: string;
  setRequestedAmount: (amount: string) => void;
  termLength: string;
  setTermLength: (term: string) => void;
  selectedLoan: Loan | null;
  setSelectedLoan: (loan: Loan | null) => void;
  getMinAmount: () => number;
  getMaxAmount: () => number;
  completedLoans: Loan[];
  addCompletedLoan: (loan: Loan) => void;
  removeCompletedLoan: (loanId: string) => void;
  getMonthlyPayment: () => number;
  getTotalInterest: () => number;
  getTotalRepayment: () => number;
  getPrincipalPayment: () => number;
  getInterestPayment: () => number;
  getInterestRateDecimal: () => number;
  formatCurrency: (value: number) => string;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export function LoanProvider({ children }: { children: ReactNode }) {
  const [requestedAmount, setRequestedAmount] = useState<string>("");
  const [termLength, setTermLength] = useState<string>("");
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [completedLoans, setCompletedLoans] = useState<Loan[]>([]);

  // Load completed loans from localStorage on component mount
  useEffect(() => {
    const savedLoans = localStorage.getItem('completedLoans');
    if (savedLoans) {
      try {
        setCompletedLoans(JSON.parse(savedLoans));
      } catch (e) {
        console.error('Failed to parse completed loans from localStorage', e);
      }
    }
  }, []);

  // Save completed loans to localStorage whenever they change
  useEffect(() => {
    if (completedLoans.length > 0) {
      localStorage.setItem('completedLoans', JSON.stringify(completedLoans));
    } else {
      // If there are no loans, remove the item from localStorage
      localStorage.removeItem('completedLoans');
    }
  }, [completedLoans]);

  // Format numeric values as currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  };

  // Helper to get the amount as a number
  const getAmountAsNumber = (): number => {
    return parseFloat(requestedAmount.replace(/[^0-9.]/g, "")) || 0;
  };

  // Helper to get the term as a number
  const getTermAsNumber = (): number => {
    return parseInt(termLength) || 1;
  };

  // Helper to get interest rate as a decimal
  const getInterestRateDecimal = (): number => {
    if (!selectedLoan?.interestRate) return 0.035; // Default 3.5%
    return parseFloat(selectedLoan.interestRate.replace(/%/g, "")) / 100;
  };

  // Calculate the minimum amount (10% less than requested)
  const getMinAmount = (): number => {
    return getAmountAsNumber() * 0.9;
  };

  // Calculate the maximum amount (10% more than requested)
  const getMaxAmount = (): number => {
    return getAmountAsNumber() * 1.1;
  };

  // Add a completed loan to the array
  const addCompletedLoan = (loan: Loan) => {
    // Add current date as approval date if not provided
    const loanWithDate = {
      ...loan,
      dateApproved: loan.dateApproved || new Date().toISOString(),
      amount: loan.amount || requestedAmount,
    };
    
    // Check if loan with same ID already exists
    const existingLoanIndex = completedLoans.findIndex(existingLoan => existingLoan.id === loan.id);
    
    if (existingLoanIndex === -1) {
      // If loan doesn't exist, add it to the array
      console.log("Adding new loan:", loanWithDate);
      setCompletedLoans(prevLoans => [...prevLoans, loanWithDate]);
    } else {
      // If loan exists, update it
      console.log("Updating existing loan:", loanWithDate);
      const updatedLoans = [...completedLoans];
      updatedLoans[existingLoanIndex] = loanWithDate;
      setCompletedLoans(updatedLoans);
    }
  };

  // Remove a completed loan by ID
  const removeCompletedLoan = (loanId: string) => {
    setCompletedLoans(prevLoans => prevLoans.filter(loan => loan.id !== loanId));
  };

  // Calculate principal payment per month
  const getPrincipalPayment = (): number => {
    return getAmountAsNumber() / getTermAsNumber();
  };

  // Calculate monthly interest payment
  const getInterestPayment = (): number => {
    return getAmountAsNumber() * getInterestRateDecimal();
  };

  // Calculate total monthly payment (principal + interest)
  const getMonthlyPayment = (): number => {
    return getPrincipalPayment() + getInterestPayment();
  };

  // Calculate total interest over loan term
  const getTotalInterest = (): number => {
    return getAmountAsNumber() * getInterestRateDecimal() * getTermAsNumber();
  };

  // Calculate total repayment amount (principal + total interest)
  const getTotalRepayment = (): number => {
    return getAmountAsNumber() + getTotalInterest();
  };

  const contextValue = useMemo(
    () => ({
      requestedAmount,
      setRequestedAmount,
      termLength,
      setTermLength,
      selectedLoan,
      setSelectedLoan,
      getMinAmount,
      getMaxAmount,
      getMonthlyPayment,
      getTotalInterest,
      getTotalRepayment,
      getPrincipalPayment,
      getInterestPayment,
      getInterestRateDecimal,
      formatCurrency,
      completedLoans,
      addCompletedLoan,
      removeCompletedLoan,
    }),
    [requestedAmount, termLength, selectedLoan, getMinAmount, getMaxAmount, getMonthlyPayment, getTotalInterest, getTotalRepayment, getPrincipalPayment, getInterestPayment, getInterestRateDecimal, completedLoans, addCompletedLoan]
  );

  return (
    <LoanContext.Provider
      value={contextValue}
    >
      {children}
    </LoanContext.Provider>
  );
}

export default LoanContext;
