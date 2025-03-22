import { useState, useEffect } from "react";

interface ExistingIdentity {
  id: string;
  name: string;
  type: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  url: string;
}

function Identity() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isCredentialTypeModalOpen, setIsCredentialTypeModalOpen] = useState(false);
  const [selectedCredentialType, setSelectedCredentialType] = useState<string>('bank');
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

  useEffect(() => {
    document.title = "Identity Credentials | NZDD";
  }, []);

  // Existing identities data
  const existingIdentities: ExistingIdentity[] = [
    {
      id: "1",
      name: "NZ Driver's License",
      type: "Proof of Identity",
      issueDate: "15 Mar 2023",
      expiryDate: "15 Mar 2028",
      status: "active",
      url: "/license.jpg"
    },
    {
      id: "2",
      name: "UoA Student ID",
      type: "Proof of Student",
      issueDate: "01 Feb 2024",
      expiryDate: "31 Dec 2025",
      status: "active",
      url: "/id.jpeg"
    },
    {
      id: "3",
      name: "ANZ Bank Accounts",
      type: "Proof of Funds / Proof of Income",
      issueDate: "10 Jan 2022",
      expiryDate: "N/A",
      status: "active",
      url: "/bank.png"
    },
    {
      id: "5",
      name: "Bitcoin Wallet Verification",
      type: "Proof of Bitcoin Holdings",
      issueDate: "15 Mar 2025",
      expiryDate: "N/A",
      status: "active",
      url: "/bitcoin.png"
    }
  ];

  // Mock bank accounts data
  const bankAccounts = [
    { id: "1", name: "Everyday Account", balance: "$3,245.67", type: "Checking", number: "12-3456-7890123-00" },
    { id: "2", name: "Savings Account", balance: "$15,782.41", type: "Savings", number: "12-3456-7890123-01" },
    { id: "3", name: "Term Deposit", balance: "$25,000.00", type: "Investment", number: "12-3456-7890123-02" },
  ];

  const handleCredentialTypeSelect = () => {
    setIsCredentialTypeModalOpen(true);
  };

  const handleCredentialTypeChoice = (type: string) => {
    setSelectedCredentialType(type);
    setIsCredentialTypeModalOpen(false);
    
    // Open the appropriate modal based on selection
    if (type === 'bank') {
      setIsConnectModalOpen(true);
    }
    // Add other credential type handlers here as they're implemented
  };

  const handleNextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(currentStep + 1);
    }, 1500);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAccountSelection = (accountId: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId) 
        ? prev.filter(id => id !== accountId) 
        : [...prev, accountId]
    );
  };

  const handleFinish = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsConnectModalOpen(false);
        setCurrentStep(1);
        setIsSuccess(false);
        setUsername("");
        setPassword("");
        setSelectedAccounts([]);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex  h-screen ">
      <div className="group z-[10] hidden md:block bg-[#141618] border-r border-muted sticky top-0 h-screen overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 flex items-center px-4 py-5 pt-8">
            <a className="outline-none" href="/">
            <h1 className="text-2xl font-bold">Broker</h1>
            </a>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="space-y-3 mt-8 px-4">
              <a
                id="sidebar-item-home.dashboard"
                aria-current="page"
                className="group flex items-center py-2 hover:bg-hover relative text-[#0376c9] dark:text-default font-semibold active"
                href="/"
              >
                <div className="flex justify-center items-center mr-2">
                  <svg
                    className="h-5 w-5 stroke-white"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 10L17.5 10M10 2.5L10 17.5M6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5Z"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
                <span className="truncate text-white">Dashboard</span>
              </a>
              <a
                id="sidebar-item-loan"
                className="group flex items-center py-2 hover:bg-hover relative text-white dark:text-default font-semibold"
                href="/loan"
              >
                <div className="flex justify-center items-center mr-2">
                  <svg
                    className="h-5 w-5 "
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 10L17.5 10M10 2.5L10 17.5M6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5Z"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
                <span className="truncate">Loan</span>
              </a>
              <a
                id="sidebar-item-identity"
                className="group flex items-center py-2 hover:bg-hover relative text-white dark:text-default font-semibold"
                href="/identity"
              >
                <div className="flex justify-center items-center mr-2">
                  <svg
                    className="h-5 w-5 "
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 10L17.5 10M10 2.5L10 17.5M6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5Z"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
                <span className="truncate">Identity</span>
              </a>
              <div
                role="button"
                tabindex="0"
                className="relative hover:bg-hover flex items-center gap-2 mt-3 py-2 px-4 text-[#9fa6ae] "
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <path
                    d="M16.9958 6.165H14.2775C13.7342 6.165 13.4625 6.82167 13.8467 7.20583L14.7308 8.09L13.4625 9.35833C12.2558 8.40583 10.7367 7.83167 9.08417 7.83167C5.1775 7.83167 2 11.0092 2 14.915C2 18.8208 5.1775 21.9983 9.08333 21.9983C12.9892 21.9983 16.1667 18.8208 16.1667 14.915C16.1667 13.2617 15.5933 11.7433 14.64 10.5367L15.9083 9.26833L16.7925 10.1525C17.1767 10.5367 17.8333 10.2642 17.8333 9.72167V7.00333C17.8333 6.54083 17.4583 6.165 16.9958 6.165ZM9.08333 20.3317C6.09667 20.3317 3.66667 17.9017 3.66667 14.915C3.66667 11.9283 6.09667 9.49833 9.08333 9.49833C12.07 9.49833 14.5 11.9283 14.5 14.915C14.5 17.9017 12.07 20.3317 9.08333 20.3317ZM22 9.08167C22 11.33 20.9675 13.3958 19.1675 14.7483C19.0175 14.8608 18.8417 14.915 18.6675 14.915C18.4142 14.915 18.1642 14.8 18 14.5825C17.7242 14.215 17.7983 13.6925 18.1658 13.4158C19.5425 12.3817 20.3333 10.8017 20.3333 9.0825C20.3333 6.09583 17.9033 3.66583 14.9167 3.66583C13.1975 3.66583 11.6175 4.45583 10.5825 5.83333C10.3067 6.20083 9.785 6.27417 9.41583 5.99917C9.04833 5.7225 8.97333 5.2 9.25 4.8325C10.6025 3.0325 12.6675 2 14.9167 2C18.8225 2 22 5.1775 22 9.08333V9.08167Z"
                    className="fill-[#9fa6ae] h-5 w-5 stroke-none"
                  ></path>
                </svg>
                <span className="truncate select-none font-medium">
                  Move crypto
                </span>
             
              </div>
              <a
                id="sidebar-item-sidenav.discover"
                className="group flex items-center py-2 hover:bg-hover relative text-[#9fa6ae]"
                href="/explore/tokens"
              >
                <div className="flex justify-center items-center mr-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 stroke-icon-[#9fa6ae]"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      className="stroke-current"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M16.24 7.76L14.12 14.12L7.76 16.24L9.88 9.88L16.24 7.76Z"
                      className="stroke-current"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
                <span className="truncate">Discover</span>
              </a>
              <a
                id="sidebar-item-sidenav.card"
                className="group flex items-center py-2 hover:bg-hover relative text-[#9fa6ae]"
                href="/card"
              >
                <div className="flex justify-center items-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-5 w-5 text-[#9fa6ae]"
                  >
                    <rect
                      x="1"
                      y="4"
                      width="22"
                      height="16"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                </div>
                <span className="truncate">Card</span>
                <div
                  role="button"
                  tabindex="0"
                  className="max-w-max items-center rounded-full py-0.5 sm:py-1.5 cursor-default px-2 border border-info-default bg-info-muted text-info-default mx-3 font-normal inline align-text-bottom text-xs sm:text-xs"
                >
                  Pilot
                </div>
              </a>
              <a
                id="sidebar-item-sidenav.cryptoTax"
                className="group flex items-center py-2 hover:bg-hover relative text-[#9fa6ae]"
                href="/tax-hub"
              >
                <div className="flex justify-center items-center mr-2">
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 stroke-icon-[#9fa6ae]"
                  >
                    <path
                      d="M13 0H5C2.24 0 0 2.24 0 5V15C0 17.76 2.24 20 5 20H13C15.76 20 18 17.76 18 15V5C18 2.24 15.76 0 13 0ZM5.86 16.63C5.67 16.82 5.42 16.92 5.16 16.92C4.89 16.92 4.64 16.82 4.45 16.63C4.26 16.44 4.15 16.19 4.15 15.92C4.15 15.66 4.26 15.4 4.45 15.21C4.72 14.93 5.17 14.85 5.54 15C5.6 15.05 5.66 15.12 5.71 15.21C5.77 15.4 5.82 15.66 5.86 15.92C6.05 16.19 6.16 16.44 5.86 16.63ZM9.86 12.63C9.67 12.82 9.42 12.92 9.15 12.92C8.89 12.92 8.64 12.82 8.45 12.63C8.26 12.44 8.15 12.19 8.15 11.92C8.15 11.66 8.26 11.4 8.45 11.21C8.82 10.84 9.49 10.84 9.86 11.21C9.95 11.31 10.03 11.41 10.08 11.54C10.13 11.66 10.15 11.79 10.15 11.92C10.15 12.19 10.05 12.44 9.86 12.63ZM6 8.46C4.97 8.46 4.12 7.62 4.12 6.58V5.58C4.12 4.55 4.96 3.7 6 3.7H12C13.03 3.7 13.88 4.54 13.88 5.58V6.58C13.88 7.61 13.04 8.46 12 8.46H6ZM13.86 16.63C13.67 16.82 13.42 16.92 13.15 16.92C13.02 16.92 12.89 16.89 12.77 16.84C12.65 16.79 12.54 16.72 12.45 16.63C12.26 16.44 12.16 16.19 12.16 15.92C12.16 15.66 12.26 15.4 12.45 15.21C12.72 14.93 13.17 14.85 13.54 15C13.66 15.05 13.77 15.12 13.86 15.21C14.05 15.4 14.15 15.66 14.15 15.92C14.15 16.19 14.05 16.44 13.86 16.63ZM14.08 12.3C14.03 12.42 13.96 12.53 13.86 12.63C13.67 12.82 13.42 12.92 13.15 12.92C12.89 12.92 12.64 12.82 12.45 12.63C12.26 12.44 12.15 12.19 12.15 11.92C12.15 11.66 12.26 11.4 12.45 11.21C12.82 10.84 13.49 10.84 13.86 11.21C14.05 11.4 14.16 11.66 14.16 11.92C14.16 12.05 14.13 12.18 14.08 12.3Z"
                      className="fill-[#9fa6ae]"
                    ></path>
                  </svg>
                </div>
                <span className="truncate">Tax Hub</span>
                <div
                  role="button"
                  tabindex="0"
                  className="max-w-max items-center rounded-full py-0.5 sm:py-1.5 cursor-default px-2 border border-info-default bg-info-muted text-info-default mx-3 font-normal inline align-text-bottom text-xs sm:text-xs"
                >
                  Beta
                </div>
              </a>
            </nav>
          </div>
        </div>
      </div>
      <section className="flex-1 overflow-y-auto">
        <div className="m-6">
          <h1 className="text-2xl font-bold tracking-tight">Identity Credentials</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your verified identity credentials and connect new accounts
          </p>
        </div>
        
        <div className="px-6 pb-10">
          {/* Grid of identity cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {existingIdentities.map((identity) => (
              <div key={identity.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                  <img 
                    src={identity.url} 
                    alt={identity.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/600x400/gray/white?text=No+Image";
                    }}
                  />
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    identity.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  }`}>
                    {identity.status === 'active' ? 'Active' : 'Pending'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold dark:text-white">{identity.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{identity.type}</p>
                  
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Issue Date:</span>
                      <span className="font-medium dark:text-white">{identity.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Expiry Date:</span>
                      <span className="font-medium dark:text-white">{identity.expiryDate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add New Credential Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center p-6 h-full min-h-[350px]">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold dark:text-white mb-2">Add New Credential</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                Connect a new bank account or add another identity credential
              </p>
              <button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                onClick={handleCredentialTypeSelect}
              >
                Connect Account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Credential Type Selection Modal */}
      {isCredentialTypeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold dark:text-white">Select Credential Type</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => setIsCredentialTypeModalOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Choose the type of credential you want to add to your identity profile:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bank Account */}
                <div 
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                  onClick={() => handleCredentialTypeChoice('bank')}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l9-4 9 4v2H3V6z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 18h18M3 22h18" />
                      </svg>
                    </div>
                    <h3 className="font-medium dark:text-white">Bank Account</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Connect your bank account for income and fund verification
                  </p>
                </div>
                
                {/* Bitcoin Wallet */}
                <div 
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                  onClick={() => handleCredentialTypeChoice('bitcoin')}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600 dark:text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium dark:text-white">Bitcoin Wallet</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Verify ownership of your Bitcoin wallet
                  </p>
                </div>
                
                {/* Identity Document */}
                <div 
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                  onClick={() => handleCredentialTypeChoice('identity')}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                    </div>
                    <h3 className="font-medium dark:text-white">Identity Document</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upload a government-issued ID like passport or driver's license
                  </p>
                </div>
                
                {/* Social Media Account */}
                <div 
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                  onClick={() => handleCredentialTypeChoice('social')}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <h3 className="font-medium dark:text-white">Social Media</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Verify your social media accounts for additional identity proof
                  </p>
                </div>
                
                {/* Email Verification */}
                <div 
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                  onClick={() => handleCredentialTypeChoice('email')}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-medium dark:text-white">Email Address</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Verify your email address to secure your account
                  </p>
                </div>
                
                {/* Phone Verification */}
                <div 
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                  onClick={() => handleCredentialTypeChoice('phone')}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="font-medium dark:text-white">Phone Number</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Verify your phone number for additional security
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Bank Account Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold dark:text-white">
                  {selectedCredentialType === 'bank' ? 'Connect ANZ Bank Account' : 'Connect Account'}
                </h2>
                <button 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => {
                    setIsConnectModalOpen(false);
                    setCurrentStep(1);
                    setIsSuccess(false);
                    setUsername("");
                    setPassword("");
                    setSelectedAccounts([]);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center mb-8">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                    {currentStep > 1 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      "1"
                    )}
                  </div>
                  <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Login</span>
                </div>
                <div className="flex-1 flex items-center">
                  <div className={`h-1 w-full ${currentStep > 1 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                    {currentStep > 2 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      "2"
                    )}
                  </div>
                  <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Accounts</span>
                </div>
                <div className="flex-1 flex items-center">
                  <div className={`h-1 w-full ${currentStep > 2 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                    {currentStep > 3 || isSuccess ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      "3"
                    )}
                  </div>
                  <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">Verify</span>
                </div>
              </div>

              {/* Step 1: Login */}
              {currentStep === 1 && (
                <div>
                  <div className="mb-6">
                    <img src="/anz-logo.png" alt="ANZ Bank" className="h-12 mx-auto mb-4" />
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                      Enter your ANZ Internet Banking credentials to securely connect your account
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Username / Customer ID
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your ANZ customer ID"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-md mt-6 text-sm text-blue-800 dark:text-blue-300">
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p>
                        Your credentials are securely encrypted and we never store your banking password. This connection is read-only and cannot be used to move money.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Account Selection */}
              {currentStep === 2 && (
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Select the accounts you want to share for income and fund verification:
                  </p>

                  <div className="space-y-3 mb-6">
                    {bankAccounts.map((account) => (
                      <div 
                        key={account.id}
                        className={`border ${selectedAccounts.includes(account.id) ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-700'} rounded-md p-4 cursor-pointer transition-colors`}
                        onClick={() => handleAccountSelection(account.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium dark:text-white">{account.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{account.number}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{account.type}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-bold dark:text-white">{account.balance}</span>
                            <div className={`w-6 h-6 rounded-full border ${selectedAccounts.includes(account.id) ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400' : 'border-gray-300 dark:border-gray-600'} flex items-center justify-center mt-2`}>
                              {selectedAccounts.includes(account.id) && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-md text-sm text-yellow-800 dark:text-yellow-300">
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p>
                        We'll only analyze the selected accounts for income verification and proof of funds. You must select at least one account to continue.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Verification */}
              {currentStep === 3 && (
                <div>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium dark:text-white">Verify Your Information</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Please review the information below before finalizing the connection
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Accounts</h4>
                      <ul className="space-y-2">
                        {bankAccounts
                          .filter(account => selectedAccounts.includes(account.id))
                          .map(account => (
                            <li key={account.id} className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">{account.name}</span>
                              <span className="font-medium dark:text-white">{account.balance}</span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">What We'll Access</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>Account balances and transaction history</li>
                        <li>Income deposits and recurring payments</li>
                        <li>Account holder information</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-md text-sm text-green-800 dark:text-green-300">
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p>
                        By proceeding, you're authorizing NZDD Loans to securely access your selected ANZ bank accounts for verification purposes only.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Success State */}
              {isSuccess && (
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium dark:text-white">Connection Successful!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6">
                    Your ANZ bank accounts have been successfully connected. We'll now analyze your financial data to verify your income and funds.
                  </p>
                </div>
              )}

              {/* Modal Footer */}
              <div className="mt-8 flex justify-end gap-4 border-t pt-4 dark:border-gray-700">
                {currentStep > 1 && !isSuccess && (
                  <button 
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={handlePreviousStep}
                    disabled={isLoading}
                  >
                    Back
                  </button>
                )}
                
                {currentStep < 3 && (
                  <button 
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    onClick={handleNextStep}
                    disabled={isLoading || (currentStep === 1 && (!username || !password)) || (currentStep === 2 && selectedAccounts.length === 0)}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Continue'
                    )}
                  </button>
                )}
                
                {currentStep === 3 && !isSuccess && (
                  <button 
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    onClick={handleFinish}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Connecting...
                      </>
                    ) : (
                      'Connect Accounts'
                    )}
                  </button>
                )}
                
                {isSuccess && (
                  <button 
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    onClick={() => setIsConnectModalOpen(false)}
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Identity;
