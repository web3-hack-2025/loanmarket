import { useState, useEffect } from "react";
import { useLoan } from "@/hooks/useLoan";
import { useAdjustedLoans } from "@/context/AdjustedLoansContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export interface Loan {
  id: string;
  name: string;
  provider: string;
  interestRate: string;
  term: string;
  offer: string;
  collateralRequired: string;
  maxAmount: string;
  status: "available" | "limited" | "coming soon";
}

type SortDirection = "asc" | "desc" | null;
type SortableColumn = keyof Omit<Loan, "id">;

// Function to get provider logo
export function getProviderLogo(provider: string): string {
  const logos: Record<string, string> = {
    Nexo: "https://cryptologos.cc/logos/nexo-nexo-logo.png",
    Aave: "https://cryptologos.cc/logos/aave-aave-logo.png",
    Compound: "https://cryptologos.cc/logos/compound-comp-logo.png",
    dYdX: "https://cryptologos.cc/logos/dydx-dydx-logo.png",
    Maker: "https://cryptologos.cc/logos/maker-mkr-logo.png",
    "ANZ NZ": "/logos/anz.png",
    "ASB Bank": "/logos/asb.png",
    "Westpac NZ": "/logos/westpac.png",
    BNZ: "/logos/bnz.jpeg",
    Kiwibank: "/logos/kiwibank.png",
    StudyLink: "https://www.studylink.govt.nz/images/logo.png",
    "Co-operative Bank": "/logos/cooperative.jpeg",
    "Easy Crypto": "/logos/easy-crypto.webp",
    "SBS Bank": "/logos/sbs.png",
    "TSB Bank": "/logos/tsb.png",
  };

  return (
    logos[provider] || "https://placehold.co/24x24?text=" + provider.charAt(0)
  );
}

// Helper function to check if a loan term matches the selected term
function isTermMatching(loanTerm: string, selectedTerm: string): boolean {
  if (!selectedTerm) return true; // If no term is selected, match all

  // Handle exact matches (e.g., "6 months")
  if (
    loanTerm === `${selectedTerm} months` ||
    loanTerm === `${selectedTerm} month`
  ) {
    return true;
  }

  // Handle ranges (e.g., "3-12 months")
  if (loanTerm.includes("-") && loanTerm.includes("month")) {
    const [minTerm, maxTermWithUnit] = loanTerm.split("-");
    if (minTerm && maxTermWithUnit) {
      const maxTerm = maxTermWithUnit.split(" ")[0];
      const selectedTermNum = parseInt(selectedTerm);
      if (
        !isNaN(selectedTermNum) &&
        !isNaN(parseInt(minTerm)) &&
        !isNaN(parseInt(maxTerm))
      ) {
        return (
          selectedTermNum >= parseInt(minTerm) &&
          selectedTermNum <= parseInt(maxTerm)
        );
      }
    }
  }

  // Handle "X years" by converting to months (approximate)
  if (loanTerm.includes("year")) {
    const yearPart = loanTerm.split(" ")[0];
    // Handle ranges like "1-5 years"
    if (yearPart.includes("-")) {
      const [minYears, maxYears] = yearPart.split("-");
      if (minYears && maxYears) {
        const selectedTermMonths = parseInt(selectedTerm);
        const minMonths = parseInt(minYears) * 12;
        const maxMonths = parseInt(maxYears) * 12;
        if (
          !isNaN(selectedTermMonths) &&
          !isNaN(minMonths) &&
          !isNaN(maxMonths)
        ) {
          return (
            selectedTermMonths >= minMonths && selectedTermMonths <= maxMonths
          );
        }
      }
    }

    // Handle fixed years like "1 year fixed"
    if (!isNaN(parseInt(yearPart))) {
      const yearMonths = parseInt(yearPart) * 12;
      const selectedTermMonths = parseInt(selectedTerm);
      if (!isNaN(yearMonths) && !isNaN(selectedTermMonths)) {
        // Allow some flexibility (±2 months)
        return Math.abs(yearMonths - selectedTermMonths) <= 2;
      }
    }
  }

  // Special cases
  if (
    loanTerm.toLowerCase().includes("open-ended") ||
    loanTerm.toLowerCase().includes("instant") ||
    loanTerm.toLowerCase().includes("flexible")
  ) {
    return true; // These are available for any term
  }

  return false;
}

export function LoansTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(80);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);

  const { adjustedLoans, updateAdjustedLoans } = useAdjustedLoans();
  const {
    requestedAmount,
    termLength,
    setSelectedLoan: setContextSelectedLoan,
  } = useLoan();
  const navigate = useNavigate();

  useEffect(() => {
    updateAdjustedLoans(requestedAmount);
  }, [requestedAmount]);

  // Filter loans based on search term and term length
  const filteredLoans = adjustedLoans.filter((loan) => {
    const searchLower = searchTerm.toLowerCase();

    // Check if the loan matches the search term
    const matchesSearch =
      searchTerm === "" ||
      loan.name.toLowerCase().includes(searchLower) ||
      loan.provider.toLowerCase().includes(searchLower) ||
      loan.collateralRequired.toLowerCase().includes(searchLower) ||
      loan.status.toLowerCase().includes(searchLower);

    // Check if the loan matches the term length
    const matchesTerm = isTermMatching(loan.term, termLength || "");

    console.log({ matchesSearch, matchesTerm, searchLower, searchTerm });
    return matchesSearch && matchesTerm;
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

  console.log({ paginatedLoans, sortedLoans, filteredLoans, adjustedLoans });

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

  // Handle apply button click
  const handleApply = (loan: Loan) => {
    setSelectedLoan(loan);
    // Save the selected loan to context
    setContextSelectedLoan(loan);

    // Show loading modal directly instead of application modal
    setIsLoadingModalOpen(true);

    // Simulate processing time before redirecting to result page
    setTimeout(() => {
      setIsLoadingModalOpen(false);
      navigate("/result");
    }, 0); // 4.5 seconds loading time
  };

  return (
    <div className="space-y-4">
      {/* Modal for loan details */}
      {isModalOpen && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold dark:text-white">
                {selectedLoan.name}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <section className="border rounded-lg p-4 grid gap-2">
                {" "}
                <span className=" text-gray-500 dark:text-gray-400">
                  Provider:
                </span>
                <span className="col-span-3 font-medium dark:text-white">
                  <div className="flex items-center space-x-2 text-xl">
                    <img
                      src={getProviderLogo(selectedLoan.provider)}
                      alt={`${selectedLoan.provider} logo`}
                      className="w-6 h-6 object-contain"
                    />
                    <span>{selectedLoan.provider}</span>
                  </div>
                </span>
              </section>
              <section className="border rounded-lg p-4 grid gap-2">
                <span className="col-span-2 text-gray-500 dark:text-gray-400">
                  Interest Rate:
                </span>
                <span className="col-span-3 font-medium dark:text-white text-xl">
                  {selectedLoan.interestRate}
                </span>
              </section>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-2"></div>

              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2 text-gray-500 dark:text-gray-400">
                  Term:
                </span>
                <span className="col-span-3 font-medium dark:text-white">
                  {selectedLoan.term}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2 text-gray-500 dark:text-gray-400">
                  Collateral Required:
                </span>
                <span className="col-span-3 font-medium dark:text-white">
                  {selectedLoan.collateralRequired}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2 text-gray-500 dark:text-gray-400">
                  Offered Amount:
                </span>
                <span className="col-span-3 font-medium dark:text-white">
                  {selectedLoan.maxAmount}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <span className="col-span-2 text-gray-500 dark:text-gray-400">
                  Status:
                </span>
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
                    setIsModalOpen(false);
                    handleApply(selectedLoan);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md text-center hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer"
                >
                  Claim Offer
                </a>
              )}
              <a
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-center text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 cursor-pointer"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Loading modal */}
      {isLoadingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              Processing Your Application
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we process your loan application...
            </p>
          </div>
        </div>
      )}

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search loans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {termLength && (
          <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-md">
            <span className="text-blue-700 dark:text-blue-300">
              {parseInt(termLength) === 1
                ? "Showing loans with 1 month term"
                : `Showing loans with ${termLength} month term`}
            </span>
          </div>
        )}
      </div>

      {/* Loans table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="font-medium">Provider</TableHead>
              <TableHead
                className="font-medium cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name {getSortIcon("name")}
              </TableHead>
              <TableHead
                className="font-medium cursor-pointer"
                onClick={() => handleSort("interestRate")}
              >
                Interest Rate {getSortIcon("interestRate")}
              </TableHead>
              <TableHead
                className="font-medium cursor-pointer"
                onClick={() => handleSort("term")}
              >
                Term {getSortIcon("term")}
              </TableHead>
              <TableHead
                className="font-medium cursor-pointer"
                onClick={() => handleSort("collateralRequired")}
              >
                Collateral {getSortIcon("collateralRequired")}
              </TableHead>
              <TableHead
                className="font-medium cursor-pointer"
                onClick={() => handleSort("maxAmount")}
              >
                Max Amount {getSortIcon("maxAmount")}
              </TableHead>
              <TableHead
                className="font-medium cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status {getSortIcon("status")}
              </TableHead>
              <TableHead className="font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLoans.length > 0 ? (
              paginatedLoans.map((loan) => {
                // Check if this loan matches the selected term length
                const isMatchingTerm = termLength
                  ? isTermMatching(loan.term, termLength)
                  : false;

                return (
                  <TableRow
                    key={loan.id}
                    onClick={() => {
                      setSelectedLoan(loan);
                      setIsModalOpen(true);
                    }}
                    className={`border-b transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
                      isMatchingTerm ? "bg-blue-50 dark:bg-blue-900/10" : ""
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <img
                          src={getProviderLogo(loan.provider)}
                          alt={`${loan.provider} logo`}
                          className="w-6 h-6 object-contain"
                        />
                        <span>{loan.provider}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{loan.name}</TableCell>
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
                    <TableCell className="text-right">
                      <button className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        View Details
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400 dark:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      No matching loans found
                    </p>
                    {termLength && (
                      <button
                        onClick={() => window.location.reload()}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        Reset Filters
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredLoans.length)} of{" "}
              {filteredLoans.length} loans
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
