import { useContext } from "react";
import LoanContext from "@/context/LoanContext";
import type { LoanContextType } from "@/context/LoanContext";

/**
 * Hook to access loan-related state and calculations.
 * Must be used within a LoanProvider component.
 */
export function useLoan(): LoanContextType {
  const context = useContext(LoanContext);
  
  if (context === undefined) {
    throw new Error(
      "useLoan hook must be used within a LoanProvider component. " +
      "Ensure your component is wrapped in the LoanProvider."
    );
  }
  
  return context;
}

export default useLoan;
