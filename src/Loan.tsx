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
                <Link to="/apply" className="block">
                  <div className="bg-white dark:bg-gray-800 h-full rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200 hover:bg-gray-950 cursor-pointer">
                    <div className="p-6 flex flex-col h-full ">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                          <CirclePlus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Apply for a New Loan</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Get additional financing</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mt-1 mb-3 flex-grow">
                        Access flexible financing with competitive rates, 
                        loan amounts up to $100,000 NZDD, and terms from 12-60 months.
                      </p>
                      
                      <div className="flex justify-start mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className={buttonVariants({ variant: "default" })}>
                          Apply Now
                        </span>
                      </div>
                    </div>
                  </div>
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
