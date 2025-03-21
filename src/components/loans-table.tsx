import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Loan {
  id: string;
  name: string;
  provider: string;
  interestRate: string;
  term: string;
  collateralRequired: string;
  maxAmount: string;
  status: "available" | "limited" | "coming soon";
}

interface Identity {
  id: string;
  name: string;
  provider: string;
  type: string;
  verificationTime: string;
  cost: string;
  status: "available" | "limited" | "coming soon";
}

interface ExistingIdentity {
  id: string;
  name: string;
  type: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expiring" | "expired";
}

const loans: Loan[] = [
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

const identities: Identity[] = [
  {
    id: "1",
    name: "Digital ID Verification",
    provider: "RealMe",
    type: "Government ID",
    verificationTime: "Instant",
    cost: "Free",
    status: "available",
  },
  {
    id: "2",
    name: "Passport Verification",
    provider: "Yoti",
    type: "Passport",
    verificationTime: "24 hours",
    cost: "$5",
    status: "available",
  },
  {
    id: "3",
    name: "Driver License Verification",
    provider: "NZTA",
    type: "Driver License",
    verificationTime: "Instant",
    cost: "Free",
    status: "available",
  },
  {
    id: "4",
    name: "Biometric Verification",
    provider: "Onfido",
    type: "Biometric",
    verificationTime: "1-2 hours",
    cost: "$10",
    status: "limited",
  },
];

const existingIdentities: ExistingIdentity[] = [
  {
    id: "1",
    name: "NZ Driver's License",
    type: "Government ID",
    issueDate: "15 Mar 2023",
    expiryDate: "15 Mar 2028",
    status: "active",
  },
  {
    id: "2",
    name: "Student ID",
    type: "Educational",
    issueDate: "01 Feb 2024",
    expiryDate: "31 Dec 2025",
    status: "active",
  },
  {
    id: "3",
    name: "Bank Account",
    type: "Financial",
    issueDate: "10 Jan 2022",
    expiryDate: "N/A",
    status: "active",
  },
];

type SortDirection = "asc" | "desc" | null;
type SortableColumn = keyof Omit<Loan, "id">;

// Function to get provider logo
function getProviderLogo(provider: string): string {
  const logos: Record<string, string> = {
    "Nexo": "https://cryptologos.cc/logos/nexo-nexo-logo.png",
    "Aave": "https://cryptologos.cc/logos/aave-aave-logo.png",
    "Compound": "https://cryptologos.cc/logos/compound-comp-logo.png",
    "dYdX": "https://cryptologos.cc/logos/dydx-dydx-logo.png",
    "Maker": "https://cryptologos.cc/logos/maker-mkr-logo.png",
    "ANZ NZ": "/logos/anz.png",
    "ASB Bank": "/logos/asb.png",
    "Westpac NZ": "/logos/westpac.png",
    "BNZ": "/logos/bnz.jpeg",
    "Kiwibank": "/logos/kiwibank.png",
    "StudyLink": "https://www.studylink.govt.nz/images/logo.png",
    "Co-operative Bank": "/logos/cooperative.jpeg",
    "Easy Crypto": "/logos/easy-crypto.webp",
    "SBS Bank": "/logos/sbs.png",
    "TSB Bank": "/logos/tsb.png"
  };

  return logos[provider] || "https://placehold.co/24x24?text=" + provider.charAt(0);
}

export function LoansTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(80);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isIdentitySelectionModalOpen, setIsIdentitySelectionModalOpen] = useState(false);
  const [applicationType, setApplicationType] = useState<"loan" | "identity" | null>(null);
  const [selectedIdentityIds, setSelectedIdentityIds] = useState<string[]>([]);

  // Filter loans based on search term
  const filteredLoans = loans.filter((loan) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      loan.name.toLowerCase().includes(searchLower) ||
      loan.provider.toLowerCase().includes(searchLower) ||
      loan.collateralRequired.toLowerCase().includes(searchLower) ||
      loan.status.toLowerCase().includes(searchLower)
    );
  });

  // Sort loans based on column and direction
  const sortedLoans = [...filteredLoans].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  // Paginate loans
  const totalPages = Math.ceil(sortedLoans.length / itemsPerPage);
  const paginatedLoans = sortedLoans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle sorting
  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortColumn(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Get sort icon based on column and current sort state
  const getSortIcon = (column: SortableColumn) => {
    if (sortColumn !== column) return "↕️";
    if (sortDirection === "asc") return "↑";
    if (sortDirection === "desc") return "↓";
    return "↕️";
  };

  return (
    <div className="space-y-4">
      {/* Modal for loan details */}
      {isModalOpen && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold dark:text-white">{selectedLoan.name}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <section className="border rounded-lg p-4 grid gap-2">  <span className=" text-gray-500 dark:text-gray-400">Provider:</span>
                <span className="col-span-3 font-medium dark:text-white">
                  <div className="flex items-center space-x-2 text-xl">
                    <img 
                      src={getProviderLogo(selectedLoan.provider)} 
                      alt={`${selectedLoan.provider} logo`} 
                      className="w-6 h-6 object-contain"
                    />
                    <span>{selectedLoan.provider}</span>
                  </div>
                </span></section>
                <section className="border rounded-lg p-4 grid gap-2">
               
                <span className="col-span-2 text-gray-500 dark:text-gray-400">Interest Rate:</span>
                <span className="col-span-3 font-medium dark:text-white text-xl">{selectedLoan.interestRate}</span>
       
              </section>


            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-2">
              
              </div>
             
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2 text-gray-500 dark:text-gray-400">Term:</span>
                <span className="col-span-3 font-medium dark:text-white">{selectedLoan.term}</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2 text-gray-500 dark:text-gray-400">Collateral Required:</span>
                <span className="col-span-3 font-medium dark:text-white">{selectedLoan.collateralRequired}</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2 text-gray-500 dark:text-gray-400">Max Amount:</span>
                <span className="col-span-3 font-medium dark:text-white">{selectedLoan.maxAmount}</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2 text-gray-500 dark:text-gray-400">Status:</span>
                <span className="col-span-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedLoan.status === "available"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : selectedLoan.status === "limited"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    }`}
                  >
                    {selectedLoan.status === "available"
                      ? "Available"
                      : selectedLoan.status === "limited"
                      ? "Limited"
                      : "Coming Soon"}
                  </span>
                </span>
              </div>
            </div>
            <div className="mt-6 flex flex-col justify-end gap-2">
            {selectedLoan.status === "available" && (
                <a
                  onClick={() => {
                    setIsApplyModalOpen(true);
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md text-center hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
                >
                  Apply Now
                </a>
              )}
              <a
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-center text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 cursor-pointer"
              >
                Close
              </a>
             
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search loans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {paginatedLoans.length} of {filteredLoans.length} loans
        </div>
      </div>

      <div className="rounded-md border shadow-sm overflow-hidden dark:border-gray-700 dark:bg-gray-900 w-full">
        <Table>
          <TableCaption className="dark:text-gray-400">A list of available crypto loans and interest rates.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort("name")}
              >
                Name {getSortIcon("name")}
              </TableHead>
              <TableHead 
                className="font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort("provider")}
              >
                Provider {getSortIcon("provider")}
              </TableHead>
              <TableHead 
                className="font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort("interestRate")}
              >
                Interest Rate {getSortIcon("interestRate")}
              </TableHead>
              <TableHead 
                className="font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort("term")}
              >
                Term {getSortIcon("term")}
              </TableHead>
              <TableHead 
                className="font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort("collateralRequired")}
              >
                Collateral {getSortIcon("collateralRequired")}
              </TableHead>
              <TableHead 
                className="font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort("maxAmount")}
              >
                Max Amount {getSortIcon("maxAmount")}
              </TableHead>
              <TableHead 
                className="font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleSort("status")}
              >
                Status {getSortIcon("status")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLoans.length > 0 ? (
              paginatedLoans.map((loan) => (
                <TableRow 
                  key={loan.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => {
                    setSelectedLoan(loan);
                    setIsModalOpen(true);
                  }}
                >
                  <TableCell className="font-medium">{loan.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <img 
                        src={getProviderLogo(loan.provider)} 
                        alt={`${loan.provider} logo`} 
                        className="w-6 h-6 object-contain rounded-sm"
                      />
                      <span>{loan.provider}</span>
                    </div>
                  </TableCell>
                  <TableCell>{loan.interestRate}</TableCell>
                  <TableCell>{loan.term}</TableCell>
                  <TableCell>{loan.collateralRequired}</TableCell>
                  <TableCell>{loan.maxAmount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        loan.status === "available"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : loan.status === "limited"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      }`}
                    >
                      {loan.status === "available"
                        ? "Available"
                        : loan.status === "limited"
                        ? "Limited"
                        : "Coming Soon"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No loans found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          >
            Previous
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-sm dark:text-white">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="itemsPerPage" className="text-sm dark:text-white">Items per page:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when changing items per page
                }}
                className="px-2 py-1 border rounded-md text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value={40}>40</option>
                <option value={80}>80</option>
                <option value={120}>120</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          >
            Next
          </button>
        </div>
      )}
      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Apply for {selectedLoan?.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Please choose how you would like to proceed with your application:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Loan Application Card */}
                <div 
                  onClick={() => {
                    setApplicationType("loan");
                    setIsIdentitySelectionModalOpen(true);
                  }}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    applicationType === "loan" 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" 
                      : "border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold dark:text-white">Apply with Existing Identity</h3>
                    <div className={`w-5 h-5 rounded-full border ${
                      applicationType === "loan" 
                        ? "border-blue-500 bg-blue-500" 
                        : "border-gray-300 dark:border-gray-600"
                    }`}>
                      {applicationType === "loan" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Continue with your verified identity to apply for this loan.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Faster application process
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      No additional verification needed
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Secure and private
                    </li>
                  </ul>
                </div>
                
                {/* Identity Verification Card */}
                <div 
                  onClick={() => setApplicationType("identity")}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    applicationType === "identity" 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" 
                      : "border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold dark:text-white">Create New Identity</h3>
                    <div className={`w-5 h-5 rounded-full border ${
                      applicationType === "identity" 
                        ? "border-blue-500 bg-blue-500" 
                        : "border-gray-300 dark:border-gray-600"
                    }`}>
                      {applicationType === "identity" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Create a new verified identity to use for this and future applications.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Multiple verification options
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Reusable for future applications
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Enhanced privacy controls
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Identity Options Section - Only shown when identity is selected */}
              {applicationType === "identity" && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Choose Verification Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {identities.map((identity) => (
                      <div 
                        key={identity.id}
                        className="border rounded-lg p-4 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700 cursor-pointer"
                      >
                        <h4 className="font-medium mb-2 dark:text-white">{identity.name}</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <p>Provider: {identity.provider}</p>
                          <p>Type: {identity.type}</p>
                          <p>Verification Time: {identity.verificationTime}</p>
                          <p>Cost: {identity.cost}</p>
                          <p>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                identity.status === "available"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : identity.status === "limited"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              }`}
                            >
                              {identity.status === "available"
                                ? "Available"
                                : identity.status === "limited"
                                ? "Limited"
                                : "Coming Soon"}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setIsApplyModalOpen(false);
                    setApplicationType(null);
                    setSelectedIdentityIds([]);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  disabled={!applicationType || (applicationType === "loan" && selectedIdentityIds.length === 0)}
                  className={`px-4 py-2 rounded-md ${
                    (applicationType && !(applicationType === "loan" && selectedIdentityIds.length === 0))
                      ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Identity Selection Modal */}
      {isIdentitySelectionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold dark:text-white">Select Identities</h2>
              <button 
                onClick={() => setIsIdentitySelectionModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <p>This will send anonymised evidence to the loan provider to get you the best possible loan</p>
            <div className="grid grid-cols-1 gap-4">
              {existingIdentities.map((identity) => (
                <div 
                  key={identity.id}
                  onClick={() => {
                    setSelectedIdentityIds(prev => {
                      if (prev.includes(identity.id)) {
                        return prev.filter(id => id !== identity.id);
                      } else {
                        return [...prev, identity.id];
                      }
                    });
                  }}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedIdentityIds.includes(identity.id) 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" 
                      : "border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium mb-1 dark:text-white">{identity.name}</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <p>Type: {identity.type}</p>
                        <p>Issue Date: {identity.issueDate}</p>
                        <p>Expiry Date: {identity.expiryDate}</p>
                        <p>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              identity.status === "active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : identity.status === "expiring"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            }`}
                          >
                            {identity.status === "active"
                              ? "Active"
                              : identity.status === "expiring"
                              ? "Expiring Soon"
                              : "Expired"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-sm border ${
                      selectedIdentityIds.includes(identity.id) 
                        ? "border-blue-500 bg-blue-500" 
                        : "border-gray-300 dark:border-gray-600"
                    }`}>
                      {selectedIdentityIds.includes(identity.id) && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsIdentitySelectionModalOpen(false);
                  setSelectedIdentityIds([]);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsIdentitySelectionModalOpen(false);
                  setIsApplyModalOpen(true);
                }}
                disabled={selectedIdentityIds.length === 0}
                className={`px-4 py-2 rounded-md ${
                  selectedIdentityIds.length > 0
                    ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                Continue with {selectedIdentityIds.length} {selectedIdentityIds.length === 1 ? 'Identity' : 'Identities'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
