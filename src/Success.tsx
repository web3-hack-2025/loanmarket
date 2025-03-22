import { useState, useEffect } from "react";
import ShaderBackground from "./components/ShaderBackground";
import { useLoan } from "./hooks/useLoan";
import { useNavigate } from "react-router-dom";
import { getProviderLogo } from "./components/loans-table";

export function Success() {
  const navigate = useNavigate();
  // Get loan information from context
  const { requestedAmount, termLength, selectedLoan, addCompletedLoan } = useLoan();

  // Animation states
  const [showSuccessText, setShowSuccessText] = useState(false);
  const [showSuccessContent, setShowSuccessContent] = useState(false);
  const [hideSuccessText, setHideSuccessText] = useState(false);

  // Reset scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update loan amount when context changes
  useEffect(() => {
    // If no selected loan, redirect back to result page
    if (!selectedLoan) {
      navigate("/result");
      return;
    }
    
    // Add the completed loan to our list
    addCompletedLoan({
      ...selectedLoan,
      amount: requestedAmount,
      term: termLength ? `${termLength} months` : selectedLoan.term,
      dateApproved: new Date().toISOString(),
      status: "active"
    });
  }, [selectedLoan, navigate, addCompletedLoan, requestedAmount, termLength]);

  // Animation sequence
  useEffect(() => {
    // First show the success text
    const textTimer = setTimeout(() => {
      setShowSuccessText(true);
    }, 300);

    // Then show the content
    const contentTimer = setTimeout(() => {
      setShowSuccessContent(true);

      // Start fading out the success text
      setTimeout(() => {
        setHideSuccessText(true);
      }, 500); // Wait a bit after content appears before completely removing
    }, 1200);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  // Get interest rate as a decimal
  const getInterestRateDecimal = () => {
    if (!selectedLoan?.interestRate) return 0.035; // Default to 3.5%
    return parseFloat(selectedLoan.interestRate.replace(/%/g, "")) / 100;
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fixed position shader background */}
      <div className="fixed inset-0 z-0">
        <ShaderBackground />
      </div>

      {/* Scrollable content container */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 overflow-auto">
        {/* Success text that phases in first and is removed after content appears */}
        {!hideSuccessText && (
          <div
            className={`fixed inset-0 flex items-center justify-center transition-opacity duration-700 ${
              showSuccessText ? "opacity-100" : "opacity-0"
            } ${showSuccessContent ? "opacity-0" : ""}`}
          >
            <h1 className="text-6xl font-bold text-white">🥳 Loan Secured 🥳</h1>
          </div>
        )}

        {/* Application successful content that phases in after */}
        <div
          className={`bg-white dark:bg-gray-800/90 rounded-lg shadow-lg p-6 md:p-8 w-full max-w-xl my-8 transition-all duration-700 ${
            showSuccessContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-600 dark:text-green-300"
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
          </div>
          <h1 className="text-3xl font-bold text-center mb-4 dark:text-white">
            Application Successful!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            Your loan application has been successfully submitted to{" "}
            {selectedLoan?.provider || "Easy Crypto"}.
          </p>

          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Loan Details
            </h2>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <img
                    src={getProviderLogo(
                      selectedLoan?.provider ?? "Easy Crypto"
                    )}
                    alt={selectedLoan?.provider ?? "Easy Crypto"}
                    className="h-10 w-10 mr-3 object-contain"
                  />
                  <h3 className="text-lg font-medium dark:text-white">
                    {selectedLoan?.provider ?? "Easy Crypto"} Loan Offer
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Loan Provider
                </p>
                <p className="font-medium dark:text-white">
                  {selectedLoan?.provider ?? "Easy Crypto"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Loan Product</p>
                <p className="font-medium dark:text-white">
                  {selectedLoan?.name || "Crypto-Backed Loan"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Loan Amount</p>
                <p className="font-medium dark:text-white">
                  $
                  {requestedAmount
                    ? Number(requestedAmount).toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })
                    : "N/A"}{" "}
                  NZDD
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Interest Rate
                </p>
                <p className="font-medium dark:text-white">
                  {selectedLoan?.interestRate || "3.5%"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Term Length</p>
                <p className="font-medium dark:text-white">
                  {termLength
                    ? `${termLength} months`
                    : selectedLoan?.term || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Monthly Payment
                </p>
                <p className="font-medium dark:text-white">
                  $
                  {requestedAmount && termLength
                    ? Number(
                        Number(requestedAmount) / Number(termLength) +
                          Number(requestedAmount) * getInterestRateDecimal()
                      ).toLocaleString("en-US", { maximumFractionDigits: 2 })
                    : "0.00"}{" "}
                  NZDD
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Collateral Required
                </p>
                <p className="font-medium dark:text-white">
                  {selectedLoan?.collateralRequired || "None"}
                </p>
              </div>
            </div>

            {selectedLoan?.description && (
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-400">Description</p>
                <p className="font-medium dark:text-white">
                  {selectedLoan.description}
                </p>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Loan Summary
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md mb-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Principal Amount:
                  </span>
                  <span className="font-medium dark:text-white">
                    $
                    {requestedAmount
                      ? Number(requestedAmount).toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })
                      : "0.00"}{" "}
                    NZDD
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Interest:
                  </span>
                  <span className="font-medium dark:text-white">
                    $
                    {requestedAmount && termLength
                      ? Number(
                          Number(requestedAmount) *
                            getInterestRateDecimal() *
                            Number(termLength)
                        ).toLocaleString("en-US", { maximumFractionDigits: 2 })
                      : "0.00"}{" "}
                    NZDD
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Total Repayment:
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    $
                    {requestedAmount && termLength
                      ? Number(
                          Number(requestedAmount) +
                            Number(requestedAmount) *
                              getInterestRateDecimal() *
                              Number(termLength)
                        ).toLocaleString("en-US", { maximumFractionDigits: 2 })
                      : "0.00"}{" "}
                    NZDD
                  </span>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Next Steps
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                Check your email for confirmation from{" "}
                {selectedLoan?.provider ?? "Easy Crypto"}
              </li>
              <li>Complete any additional verification steps if required</li>
              <li>
                Funds will be disbursed to your account within 1-3 business days
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
             href="/"
              className="px-6 py-3 text-center bg-blue-500 flex-1 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Return to Home
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
