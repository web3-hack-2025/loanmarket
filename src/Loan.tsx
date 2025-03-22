import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  CirclePlus,
  ChevronDown,
} from "lucide-react";
import { ConnectWalletButton } from "./components/web3/simplekit";
import { Sidebar } from "./components/sidebar";
import { useLoan } from "./hooks/useLoan";
import { formatDistanceToNow } from "date-fns";
import { getProviderLogo } from "./components/loans-table";
import { useEffect } from "react";

interface ActionButtonProps {
  href?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

function ActionButton({ href, icon, children, onClick }: ActionButtonProps) {
  const ButtonContent = (
    <>
      <span className="flex mr-2.5 items-center">
        {icon}
      </span>
      <span>{children}</span>
    </>
  );

  return href ? (
    <Link to={href} className={buttonVariants({ variant: "outline", size: "sm", className: "flex items-center" })}>
      {ButtonContent}
    </Link>
  ) : (
    <Button
      size="sm"
      variant="outline"
      onClick={onClick}
      className="flex items-center"
    >
      {ButtonContent}
    </Button>
  );
}

function Loan() {
  const { completedLoans, removeCompletedLoan } = useLoan();

  // Debug: Log loans when they change
  useEffect(() => {
    console.log("Completed loans:", completedLoans);
  }, [completedLoans]);

  // Function to format date to relative time (e.g., "2 days ago")
  const formatDate = (dateString: string) => {
    if (!dateString) return "Date unavailable";
    
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return "Date unavailable";
    }
  };

  // Handle paying off a loan
  const handlePayOff = (loanId: string) => {
    console.log("Paying off loan:", loanId);
    removeCompletedLoan(loanId);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar/>

      {/* Main Content */}
      <section className="flex-1 overflow-y-auto">
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Loans</h1>
          <ConnectWalletButton />
        </div>

        {/* Action Bar */}
        <div className="flex w-full items-center justify-between self-start m-7">
          <div className="flex items-center gap-4">
            <div id="buy-header-menu" className="relative">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <div className="flex items-center truncate">Loan</div>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <ActionButton 
                href="/swap" 
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                }
              >
                Swap
              </ActionButton>
              
              <ActionButton 
                href="/bridge" 
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.88583 11.0961C2.08173 11.3553 1.5 12.1097 1.5 13C1.5 14.1046 2.39543 15 3.5 15C4.60457 15 5.5 14.1046 5.5 13C5.5 12.2172 5.05025 11.5394 4.39505 11.211C4.98024 8.65597 7.26754 6.75 10 6.75C11.8379 6.75 13.4744 7.61231 14.5271 8.95443C14.9983 8.7242 15.5157 8.57388 16.0616 8.52109C14.7656 6.55072 12.5347 5.25 10 5.25C6.47625 5.25 3.53966 7.7639 2.88583 11.0961ZM18.5 13C18.5 14.1046 17.5 15 16.5 15C15.3954 15 14.5 14.1046 14.5 13C14.5 11.8954 15.3954 11 16.5 11C17.5 11 18.5 11.8954 18.5 13ZM14.08 12.3C14.03 12.42 13.96 12.53 13.86 12.63C13.67 12.82 13.42 12.92 13.15 12.92C12.89 12.92 12.64 12.82 12.45 12.63C12.26 12.44 12.15 12.19 12.15 11.92C12.15 11.66 12.26 11.4 12.45 11.21C12.82 10.84 13.49 10.84 13.86 11.21C14.05 11.4 14.16 11.66 14.16 11.92C14.16 12.05 14.13 12.18 14.08 12.3Z"
                      className="fill-current stroke-none"
                    ></path>
                  </svg>
                }
              >
                Bridge
              </ActionButton>
              
              <ActionButton 
                href="/transfer" 
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                }
              >
                Send
              </ActionButton>
              
              <ActionButton 
                href="/sell" 
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                }
              >
                Sell
              </ActionButton>
              
              <ActionButton 
                href="/stake" 
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="stroke-current w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_735_24127)">
                      <path
                        d="M3.99902 19C7.24796 17.5 8.87242 16.75 10.4969 16.75M16.9948 19C13.7458 17.5 12.1214 16.75 10.4969 16.75M10.4969 16.75V11.5M10.4969 11.5L10 10.4091M10.4969 11.5V9.5L10.9967 8.5M10 10.4091C10 10.4091 5.00889 11.0985 2.99935 9.5C1.29118 8.14126 1 4.5 1 4.5C1 4.5 5.55008 3.95155 7.54545 5.90909C8.91802 7.25563 10 10.4091 10 10.4091ZM10.9967 8.5C10.9967 8.5 11.5374 4.11404 13.4959 2.5C15.2137 1.08439 18.9941 1 18.9941 1C18.9941 1 19.1777 5.2683 17.4946 7C15.6792 8.86783 10.9967 8.5 10.9967 8.5ZM14.08 12.3C14.03 12.42 13.96 12.53 13.86 12.63C13.67 12.82 13.42 12.92 13.15 12.92C12.89 12.92 12.64 12.82 12.45 12.63C12.26 12.44 12.15 12.19 12.15 11.92C12.15 11.66 12.26 11.4 12.45 11.21C12.82 10.84 13.49 10.84 13.86 11.21C14.05 11.4 14.16 11.66 14.16 11.92C14.16 12.05 14.13 12.18 14.08 12.3Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_735_24127">
                        <rect
                          width="20"
                          height="20"
                          className="fill-background-default"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                }
              >
                Stake
              </ActionButton>
            </div>
          </div>
        </div>

        {/* Loan List or Empty State */}
        <div className="px-7">
          {completedLoans.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Your Active Loans ({completedLoans.length})</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {completedLoans.map((loan) => (
                  <div 
                    key={loan.id} 
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <img
                            src={getProviderLogo(loan.provider)}
                            alt={loan.provider}
                            className="h-10 w-10 mr-3 object-contain"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">{loan.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{loan.provider}</p>
                          </div>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {loan.status}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Loan Amount</p>
                          <p className="font-medium">${Number(loan.amount || '0').toLocaleString()} NZDD</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Interest Rate</p>
                          <p className="font-medium">{loan.interestRate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Term</p>
                          <p className="font-medium">{loan.term}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Approved</p>
                          <p className="font-medium">{formatDate(loan.dateApproved || '')}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Next payment: <span className="font-medium text-gray-900 dark:text-white">
                            {new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString()}
                          </span>
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePayOff(loan.id)}
                        >
                          Pay off
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Link 
                  className={buttonVariants({ variant: "outline"})}
                  to="/apply"
                >
                  Apply for Another Loan
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-6">
                <CirclePlus className="h-16 w-16 mx-auto text-muted-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">
                No active loans
              </h3>
              
              <p className="text-muted-foreground mb-6 max-w-md">
                You don't have any active loans at the moment. Apply for a loan to
                get started with your financial journey.
              </p>
              
              <Link 
                className={buttonVariants({ variant: "outline"})}
                to="/apply"
              >
                Apply for a Loan
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Loan;
