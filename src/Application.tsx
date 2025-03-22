import { useState, useEffect } from "react";
import { LoansTable } from "./components/loans-table";

function Application() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading offers
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500); // 2.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex">
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-16 h-16 mb-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Getting you offers</h2>
            <p className="text-gray-500 dark:text-gray-400">We're finding the best loan options for you...</p>
          </div>
        ) : (
          <>
            <div className="m-6">
              <h1 className="text-2xl font-bold tracking-tight">Available Offers</h1>
            </div>
            

      <div className="px-7">
        <LoansTable />
      </div>
    </>
  )}
</section>
</div>
  );
}

export default Application;
