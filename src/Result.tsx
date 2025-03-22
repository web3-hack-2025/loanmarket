import { getProviderLogo } from "./components/loans-table";
import { useState, useEffect } from "react";
import { useLoan } from "./hooks/useLoan";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./components/sidebar";

// Define the Loan interface to match the one in loans-table.tsx
interface Loan {
  id: string;
  name: string;
  provider: string;
  interestRate: string;
  term: string;
  collateralRequired: string;
  maxAmount: string;
  status: "available" | "limited" | "coming soon";
  amount: string;
}

// Default loan options to use as fallback when visiting the page directly
const defaultLoanOptions: Loan[] = [
  {
    id: "nexo-personal",
    name: "Personal Loan",
    provider: "Nexo",
    interestRate: "3.5%",
    term: "12 months",
    collateralRequired: "None",
    maxAmount: "50000",
    status: "available",
    amount: "10000"
  },
  {
    id: "aave-business",
    name: "Business Loan",
    provider: "Aave",
    interestRate: "4.2%",
    term: "24 months",
    collateralRequired: "None",
    maxAmount: "100000",
    status: "available",
    amount: "10000"
  },
  {
    id: "easy-crypto-personal",
    name: "Personal Loan",
    provider: "Easy Crypto",
    interestRate: "3.8%",
    term: "18 months",
    collateralRequired: "None",
    maxAmount: "75000",
    status: "available",
    amount: "10000"
  }
];

function Result() {
  // Get loan amount from context
  const {
    requestedAmount,
    termLength: contextTermLength,
    selectedLoan,
    setSelectedLoan,
    formatCurrency,
    getMonthlyPayment,
    getTotalInterest,
    getTotalRepayment,
    getPrincipalPayment,
    getInterestPayment,
    setRequestedAmount
  } = useLoan();
  const navigate = useNavigate();

  // Define loan amount state with a default value or from context
  const [loanAmount, setLoanAmount] = useState(
    requestedAmount ? requestedAmount : "10000"
  );
  const [loanTerm, setLoanTerm] = useState(
    contextTermLength ? contextTermLength : "6"
  );
  
  // Default selected loan if none is present in context
  const [fallbackLoan, setFallbackLoan] = useState<Loan | null>(null);

  // Update loan amount when context changes
  useEffect(() => {
    if (requestedAmount) {
      setLoanAmount(requestedAmount);
    }
    if (contextTermLength) {
      setLoanTerm(contextTermLength);
    }
    
    // If no selected loan in context, set a default one based on the first option
    if (!selectedLoan && !fallbackLoan) {
      setFallbackLoan(defaultLoanOptions[0]);
    }
  }, [requestedAmount, contextTermLength, selectedLoan, fallbackLoan]);

  // Create a default loan object for the "Accept Offer & Continue" button
  const handleAcceptOffer = () => {
    // Generate a unique ID using timestamp and random string
    const uniqueId = `loan-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Use the selected loan from context or the fallback
    const loanToUse = selectedLoan || fallbackLoan;
    
    // Parse the loan amount (remove commas)
    const numericLoanAmount = loanAmount.replace(/,/g, '');
    
    // Create a default loan object with the current values
    const defaultLoan: Loan = {
      id: uniqueId,
      provider: loanToUse?.provider || "NZ Bank",
      name: loanToUse?.name || "Personal Loan",
      interestRate: loanToUse?.interestRate || "3.5%",
      term: `${loanTerm} months`,
      collateralRequired: "None",
      maxAmount: loanToUse?.maxAmount || "50000",
      status: "available",
      amount: numericLoanAmount // Add the loan amount
    };

    // Set the selected loan in context
    setSelectedLoan(defaultLoan);
    
    // Update the requested amount in context to ensure it's available in Success component
    setRequestedAmount(numericLoanAmount);

    // Navigate to execute page instead of success
    navigate("/execute");
  };

  // The loan to display (either from context or fallback)
  const displayLoan = selectedLoan || fallbackLoan || defaultLoanOptions[0];

  return (
    <div className="min-h-screen flex">
      <Sidebar/>
      <section className="flex-1 overflow-y-auto mx-auto">
        <div className="m-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Application Successful
          </h1>
        </div>

        <div className="px-7 pb-10">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold dark:text-white">
                  Congratulations! Your application has been approved
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Based on your attested data,{" "}
                  {displayLoan.provider} is ready to offer
                  you a loan
                </p>
              </div>
            </div>


            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <img
                      src={getProviderLogo(displayLoan.provider)}
                      alt={displayLoan.provider}
                      className="h-10 w-10 mr-3 object-contain"
                    />
                    <h3 className="text-lg font-medium dark:text-white">
                      {displayLoan.provider} Loan Offer
                    </h3>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    Pre-approved up to {displayLoan.maxAmount || "$50,000"}{" "}
                    NZDD
                  </span>
                </div>
              </div>


              {/* Loan Configuration */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-md mb-6">
                <div className="mt-4 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-md">
                  <div className="flex items-start ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-lg text-blue-700 dark:text-blue-300">
                      Monthly payment:{" "}
                      <span className="font-semibold">
                      $
                        {calculateMonthlyPayment(
                          parseFloat(loanAmount.replace(/,/g, "")),
                          parseFloat(displayLoan.interestRate.replace(/%/g, "")) / 100,
                          parseInt(loanTerm)
                        ).toLocaleString()}{" "}
                        NZDD
                      </span>{" "}
                      for {loanTerm || "0"} months
                    </p>
                  </div>
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Interest Rate
                  </p>
                  <p className="text-lg font-semibold dark:text-white">
                    {displayLoan.interestRate} per month
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Term Options
                  </p>
                  <p className="text-lg font-semibold dark:text-white">
                    3-72 months
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Offer Validity
                  </p>
                  <p className="text-lg font-semibold dark:text-white">
                    Next 7 days
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8 p-6 border rounded-lg">
              <h3 className="text-lg font-medium mb-4 dark:text-white">
                Customize Your Loan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="loanAmount"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Loan Amount (NZDD)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                      $
                    </span>
                    <input
                      type="text"
                      id="loanAmount"
                      value={loanAmount}
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        // Limit to max 50000
                        if (value === "" || parseInt(value) <= 50000) {
                          setLoanAmount(value);
                        }
                      }}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter amount"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Maximum: ${displayLoan.maxAmount} NZDD
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="loanTerm"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Loan Term (Months)
                  </label>
                  <select
                    id="loanTerm"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                    <option value="9">9 months</option>
                    <option value="12">12 months</option>
                    <option value="18">18 months</option>
                    <option value="24">24 months (2 years)</option>
                    <option value="36">36 months (3 years)</option>
                    <option value="48">48 months (4 years)</option>
                    <option value="60">60 months (5 years)</option>
                    <option value="72">72 months (6 years)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 dark:text-white">
                Loan Calculator
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Monthly Payments
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Principal:
                      </span>
                      <span className="font-medium dark:text-white">
                        $
                        {(parseFloat(loanAmount.replace(/,/g, "")) / parseInt(loanTerm)).toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        NZDD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Interest ({displayLoan.interestRate}):
                      </span>
                      <span className="font-medium dark:text-white">
                        $
                        {(parseFloat(loanAmount.replace(/,/g, "")) *
                          (parseFloat(displayLoan.interestRate.replace(/%/g, "")) / 100)).toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        NZDD
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Total Monthly Payment:
                      </span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        $
                        {calculateMonthlyPayment(
                          parseFloat(loanAmount.replace(/,/g, "")),
                          parseFloat(displayLoan.interestRate.replace(/%/g, "")) / 100,
                          parseInt(loanTerm)
                        ).toLocaleString()}{" "}
                        NZDD
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Total Loan Costs
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Principal Amount:
                      </span>
                      <span className="font-medium dark:text-white">
                        $
                        {parseFloat(loanAmount.replace(/,/g, "")).toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        NZDD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Total Interest:
                      </span>
                      <span className="font-medium dark:text-white">
                        $
                        {(parseFloat(loanAmount.replace(/,/g, "")) *
                          (parseFloat(displayLoan.interestRate.replace(/%/g, "")) / 100) *
                          parseInt(loanTerm)).toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        NZDD
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Total Repayment:
                      </span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        $
                        {(parseFloat(loanAmount.replace(/,/g, "")) +
                          parseFloat(loanAmount.replace(/,/g, "")) *
                            (parseFloat(displayLoan.interestRate.replace(/%/g, "")) / 100) *
                            parseInt(loanTerm)).toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        NZDD
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm text-blue-700 dark:text-blue-300 mb-6">
                  <p className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Interest is calculated monthly on the outstanding
                      principal. Early repayments are allowed without penalties.
                    </span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="flex-1 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
                    onClick={handleAcceptOffer}
                  >
                    Accept Offer & Continue
                  </button>
                  <button className="flex-1 cursor-pointer bg-white hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-md font-medium border border-gray-300 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600">
                    Save for Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper function to calculate monthly payment
function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  // Convert annual rate to monthly rate
  const monthlyRate = annualRate / 12;
  
  // Calculate monthly payment using the loan formula
  if (monthlyRate === 0) {
    return principal / termMonths;
  }
  
  const payment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);
    
  return Math.round(payment * 100) / 100;
}

export default Result;
