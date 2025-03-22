import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoan } from "@/hooks/useLoan";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "@/components/web3/simplekit";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt, useTransactionConfirmations } from "wagmi";
import { getLoanContractConfig, formatLoanAmount } from "@/lib/contracts/loan-contract";
import { Progress } from "@/components/ui/progress";
import ShaderBackground from "../ShaderBackground";


enum TransactionStatus {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error"
}

export function ExecuterPage() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { 
    requestedAmount, 
    selectedLoan, 
    termLength, 
    formatCurrency, 
    getMonthlyPayment,
  } = useLoan();
  
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(TransactionStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [requiredConfirmations] = useState<number>(3); // Set required confirmations (adjust as needed)
  
  // Get the loan contract configuration
  const contractConfig = getLoanContractConfig();

  // Check if we have loan data, if not redirect back
  useEffect(() => {
    if (!selectedLoan || !requestedAmount) {
      // navigate("/result");
    }
  }, [selectedLoan, requestedAmount, navigate]);

  // Read stored value from contract
  const { refetch: refetchStoredValue } = useReadContract({
    address: contractConfig.address,
    abi: contractConfig.abi,
    functionName: "retrieve",
    blockTag: "latest",
  });
  // Write to contract
  const { 
    data: txData, 
    isPending, 
    isError, 
    error: writeError, 
    writeContract
  } = useWriteContract();

  // Function to execute the contract write
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const executeStore = ({ args }: { args: any[] }) => {
    writeContract({
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: "store",
      args
    });
  };
  
  // Wait for transaction to complete
  const { 
    isSuccess: txSuccess,
    isError: txIsError,
    error: txError,
    // data: receipt
  } = useWaitForTransactionReceipt({
    hash: txData,
    confirmations: requiredConfirmations,
    onReplaced: (response) => {
      console.log('Transaction replaced:', response);
    },
  });

  const {data: confirmationsData} = useTransactionConfirmations({
    hash: txData,

    query: {
      enabled: !!(txData) && !txSuccess,
      refetchInterval: 1000,
    }
  })
  
  // Handle transaction completion
  useEffect(() => {
    if (txSuccess) {
      setTransactionStatus(TransactionStatus.SUCCESS);
      refetchStoredValue();
    } else if (txIsError && txError) {
      setTransactionStatus(TransactionStatus.ERROR);
      setErrorMessage(txError.message || "An error occurred during transaction processing");
    }
  }, [txSuccess, txIsError, txError, refetchStoredValue, requiredConfirmations]);

  // Handle effects of contract writing states
  useEffect(() => {
    if (isPending) {
      setTransactionStatus(TransactionStatus.PENDING);
      setErrorMessage("");
    } else if (isError && writeError) {
      setTransactionStatus(TransactionStatus.ERROR);
      setErrorMessage(writeError.message || "An error occurred while writing to the contract");
    }
  }, [isPending, isError, writeError]);
  
  // Execute the smart contract transaction
  const executeTransaction = async () => {
    try {
      if (!isConnected) {
        throw new Error("Wallet not connected");
      }
      
      // Format the loan amount for the contract
      const amountValue = formatLoanAmount(requestedAmount);
      
      // Execute the transaction
      executeStore({ args: [amountValue] });
    } catch (error: unknown) {
      console.error("Transaction preparation error:", error);
      setTransactionStatus(TransactionStatus.ERROR);
      setErrorMessage(error instanceof Error ? error.message : "Failed to prepare transaction");
    }
  };

  const [runningSucessAnimation, setRunningSucessAnimation] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  
  const handleContinue = () => {
    
    navigate("/success");
  };
  useEffect(() => {
    if (runningSucessAnimation) {
      return;
    }

    if (transactionStatus === TransactionStatus.SUCCESS) {
      setRunningSucessAnimation(true);
      setTimeout(() => {
        setZoomOut(true);
      }, 3000);
      setTimeout(handleContinue, 3200);
    }
  },[transactionStatus, runningSucessAnimation]);


  const handleGoBack = () => {
    navigate(-1);
  };




  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 z-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: Number(confirmationsData?? 0) / (requiredConfirmations+1) }}>
        <ShaderBackground />
      </div>
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b z-1 dark:bg-gray-800/90">
        <h1 className="text-2xl font-bold tracking-tight">Execute Loan Agreement</h1>
        <ConnectWalletButton />
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-8 max-w-4xl mx-auto w-full z-1 transition-transform duration-500
          ${zoomOut ? "transform scale-0" : "transform scale-100"}
        `}>
      {selectedLoan && (
        <Card className="mb-8 ">
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>
              Review your loan details before executing the smart contract
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Loan Provider</h3>
                  <p className="font-medium">{selectedLoan?.provider || "Unknown Provider"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Loan Amount</h3>
                  <p className="font-medium">{requestedAmount || "0"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Term Length</h3>
                  <p className="font-medium">{termLength || "0"} months</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Interest Rate</h3>
                  <p className="font-medium">{selectedLoan?.interestRate || "0%"}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Payment</h3>
                  <p className="font-medium">${formatCurrency(getMonthlyPayment())} NZDD</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contract</h3>
                  <p className="font-medium">{contractConfig.name} v{contractConfig.version}</p>
                </div>
              </div>

              <div className="mt-4 p-4 border rounded-md bg-blue-50 dark:bg-blue-900/20">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <span className="font-medium">Note:</span> This will store your loan amount ({requestedAmount}) in 
                  the blockchain as a demonstration of smart contract execution.
                </p>
              </div>

            </div>
          </CardContent>
        </Card>
      ) || (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>No Loan Details</CardTitle>
            <CardDescription>
              Missing required information, please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card>
      )}
        {/* Transaction Status */}
        {transactionStatus !== TransactionStatus.IDLE && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Transaction Status</CardTitle>
            </CardHeader>
            <CardContent>
              {transactionStatus === TransactionStatus.PENDING && (
                <Alert className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800 flex justify-between items-stretch">
                  <div>
                  <AlertTitle>{txData ? "Transaction in Progress" : "Waiting for confirmation"}</AlertTitle>
                  <AlertDescription>
                  {txData ? "Please wait while your transaction is being processed on the blockchain. Do not close this window." : "Please confirm the transaction in your wallet to start the on-chain loan application."}
                    
                      
                    {txData && (
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Transaction sent</span>
                          <div className="flex items-center">
                    <Spinner className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-2" />
              
                          <span>{confirmationsData ?? "?"} of {requiredConfirmations} confirmations</span>
                          </div></div>
                        <Progress 
                          value={((Number(confirmationsData  ?? 0)) / requiredConfirmations) * 100} 
                          className="h-2 bg-yellow-200 dark:bg-yellow-900"
                        />
                        <p className="text-xs mt-1">
                          Transaction hash: <span className="font-mono break-all">{txData}</span>
                          {confirmationsData?.toString()} Confirmations
                        </p>

                      </div>
                    )}
                  </AlertDescription>
                  </div>
               
                </Alert>
              )}

              {transactionStatus === TransactionStatus.SUCCESS && (
                <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 transition-all duration-500 ease-in">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                  <AlertTitle>Transaction Successful</AlertTitle>
                  <AlertDescription>
                    Your loan has been successfully processed. Transaction hash: 
                    <span className="font-mono text-xs block mt-1 break-all">{txData}</span>
                  </AlertDescription>
                </Alert>
              )}

              {transactionStatus === TransactionStatus.ERROR && (
                <Alert className="bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800">
                  <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 mr-2" />
                  <AlertTitle>Transaction Failed</AlertTitle>
                  <AlertDescription>
                    There was an error processing your transaction: 
                    <span className="font-medium block mt-1">{errorMessage}</span>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleGoBack}
            disabled={isPending}
          >
            Go Back
          </Button>
          
          {transactionStatus === TransactionStatus.SUCCESS ? (
            <Button 
              onClick={handleContinue}
              className="bg-green-600 hover:bg-green-700"
            >
              Continue
            </Button>
          ) : (
            <Button
              onClick={executeTransaction}
              disabled={transactionStatus === TransactionStatus.PENDING || !isConnected}
              className={transactionStatus === TransactionStatus.PENDING ? "opacity-70" : ""}
            >
              {transactionStatus === TransactionStatus.PENDING ? (
                <>
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                  Executing Contract...
                </>
              ) : (
                "Execute Loan Agreement"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
