function App() {
  return (
    <div className="min-h-screen flex">
      <div className="group z-[10] hidden md:block bg-[#141618] border-r border-muted sticky top-0 h-screen overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 flex items-center px-4 py-5 pt-8">
            <a className="outline-none" href="/">
              <h1 className="text-2xl font-bold">Loan Market</h1>
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
                tabIndex={0}
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
            </nav>
          </div>
        </div>
      </div>
      <section className="flex-1 overflow-y-auto">
        <div className="m-6">
          <h1 className="text-2xl font-bold tracking-tight">Loans</h1>
        </div>
        <div className="flex w-full items-center justify-between self-start m-7">
          <div className="flex items-center gap-4">
            <div id="buy-header-menu" className="relative">
              <button className="space-x-2 p-3.5 hover:text-info group cursor-pointer disabled:cursor-auto transition px-5 py-2 rounded-full border flex items-center justify-center text-center text-xs border-default bg-inherit hover:bg-hover text-alternative">
                <div className="flex items-center truncate flex-1">Loan</div>
                <div className="w-4 h-4 ml-2 flex items-center justify-end">
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
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <a
                className="cursor-pointer disabled:cursor-auto transition px-5 py-2 rounded-full border flex items-center justify-center text-center text-xs border-primary-default bg-primary-default text-primary-inverse hover:border-primary-default-hover hover:bg-primary-default-hover"
                data-theme="light"
                href="/swap"
              >
                <span className="flex mr-2.5 items-center">
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
                    className="w-4 h-4"
                  >
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                </span>
                <span>Swap</span>
              </a>
              <a
                className="cursor-pointer disabled:cursor-auto transition px-5 py-2 rounded-full border flex items-center justify-center text-center text-xs border-primary-default bg-primary-default text-primary-inverse hover:border-primary-default-hover hover:bg-primary-default-hover"
                data-theme="light"
                href="/bridge"
              >
                <span className="flex mr-2.5 items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.88583 11.0961C2.08173 11.3553 1.5 12.1097 1.5 13C1.5 14.1046 2.39543 15 3.5 15C4.60457 15 5.5 14.1046 5.5 13C5.5 12.2172 5.05025 11.5394 4.39505 11.211C4.98024 8.65597 7.26754 6.75 10 6.75C11.8379 6.75 13.4744 7.61231 14.5271 8.95443C14.9983 8.7242 15.5157 8.57388 16.0616 8.52109C14.7656 6.55072 12.5347 5.25 10 5.25C6.47625 5.25 3.53966 7.7639 2.88583 11.0961ZM18.5 13C18.5 14.1046 17.5 15 16.5 15C15.3954 15 14.5 14.1046 14.5 13C14.5 11.8954 15.3954 11 16.5 11C17.5 11 18.5 11.8954 18.5 13ZM14.08 12.3C14.03 12.42 13.96 12.53 13.86 12.63C13.67 12.82 13.42 12.92 13.15 12.92C12.89 12.92 12.64 12.82 12.45 12.63C12.26 12.44 12.15 12.19 12.15 11.92C12.15 11.66 12.26 11.4 12.45 11.21C12.82 10.84 13.49 10.84 13.86 11.21C14.05 11.4 14.16 11.66 14.16 11.92C14.16 12.05 14.13 12.18 14.08 12.3Z"
                      className="fill-current stroke-none"
                    ></path>
                  </svg>
                </span>
                <span>Bridge</span>
              </a>
              <a
                className="cursor-pointer disabled:cursor-auto transition px-5 py-2 rounded-full border flex items-center justify-center text-center text-xs border-primary-default bg-primary-default text-primary-inverse hover:border-primary-default-hover hover:bg-primary-default-hover"
                data-theme="light"
                href="/transfer"
              >
                <span className="flex mr-2.5 items-center">
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
                    className="w-4 h-4"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
                <span>Send</span>
              </a>
              <a
                className="cursor-pointer disabled:cursor-auto transition px-5 py-2 rounded-full border flex items-center justify-center text-center text-xs border-primary-default bg-primary-default text-primary-inverse hover:border-primary-default-hover hover:bg-primary-default-hover"
                data-theme="light"
                href="/sell"
              >
                <span className="flex mr-2.5 items-center">
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
                    className="w-4 h-4"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
                <span>Sell</span>
              </a>
              <a
                className="cursor-pointer disabled:cursor-auto transition px-5 py-2 rounded-full border flex items-center justify-center text-center text-xs border-primary-default bg-primary-default text-primary-inverse hover:border-primary-default-hover hover:bg-primary-default-hover"
                data-theme="light"
                href="/stake"
              >
                <span className="flex mr-2.5 items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="stroke-current w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_735_24127)">
                      <path
                        d="M3.99902 19C7.24796 17.5 8.87242 16.75 10.4969 16.75M16.9948 19C13.7458 17.5 12.1214 16.75 10.4969 16.75M10.4969 16.75V11.5M10.4969 11.5L10 10.4091M10.4969 11.5V9.5L10.9967 8.5M10 10.4091C10 10.4091 5.00889 11.0985 2.99935 9.5C1.29118 8.14126 1 4.5 1 4.5C1 4.5 5.55008 3.95155 7.54545 5.90909C8.91802 7.25563 10 10.4091 10 10.4091ZM10.9967 8.5C10.9967 8.5 11.5374 4.11404 13.4959 2.5C15.2137 1.08439 18.9941 1 18.9941 1C18.9941 1 19.1777 5.2683 17.4946 7C15.6792 8.86783 10.9967 8.5 10.9967 8.5ZM14.08 12.3C14.03 12.42 13.96 12.53 13.86 12.63C13.67 12.82 13.42 12.92 13.15 12.92C12.89 12.92 12.64 12.82 12.45 12.63C12.26 12.44 12.15 12.19 12.15 11.92C12.15 11.66 12.26 11.4 12.45 11.21C12.82 10.84 13.49 10.84 13.86 11.21C14.05 11.4 14.16 11.66 14.16 11.92C14.16 12.05 14.13 12.18 14.08 12.3Z"
                        stroke-width="1.5"
                        stroke-linecap="round"
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
                </span>
                <span>Stake</span>
              </a>
            </div>
          </div>
        </div>

        <div className="px-7">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto text-gray-400"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 12H14.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 15L15.5 12L12.5 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              No active loans
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
              You don't have any active loans at the moment. Apply for a loan to
              get started with your financial journey.
            </p>
            <button
              className="px-5 py-2 rounded-full border flex items-center justify-center text-center text-sm border-primary-default bg-primary-default text-primary-inverse hover:border-primary-default-hover hover:bg-primary-default-hover"
              onClick={() => (window.location.href = "/apply")}
            >
              Apply for a Loan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
