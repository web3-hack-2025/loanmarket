import { useContext } from "react";
import LoanContext from "@/context/LoanContext";

export function useLoan() {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error("useLoan must be used within a LoanProvider");
  }
  return context;
}

export default useLoan;
