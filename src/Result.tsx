import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { LoansTable } from "./components/loans-table";
import { useState } from "react";

function Result() {
  const [loanAmount, setLoanAmount] = useState("10000");
  const [loanTerm, setLoanTerm] = useState("6");

  return (
    <div className="min-h-screen flex">
      <div className="group z-[10] hidden md:block bg-[#141618] border-r border-muted sticky top-0 h-screen overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 flex items-center px-4 py-5 pt-8">
            <a className="outline-none" href="/">
              <img
                className="h-16 p-1 dark:hidden"
                src="data:image/svg+xml,%3csvg%20width='696'%20height='344'%20viewBox='0%200%20696%20344'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M394.102%20265.407V340.812H355.162V288.57L310.786%20293.73C301.039%20294.854%20296.75%20298.041%20296.75%20303.912C296.75%20312.512%20304.892%20316.136%20322.344%20316.136C332.985%20316.136%20344.773%20314.553%20355.184%20311.824L335.026%20340.353C326.885%20342.165%20318.95%20343.06%20310.579%20343.06C275.262%20343.06%20255.103%20329.024%20255.103%20304.119C255.103%20282.149%20270.95%20270.613%20306.956%20266.531L354.519%20261.004C351.951%20247.175%20341.516%20241.167%20320.762%20241.167C301.291%20241.167%20279.78%20246.143%20260.539%20255.431L266.662%20221.696C284.55%20214.22%20304.938%20210.367%20325.532%20210.367C370.825%20210.367%20394.148%20229.173%20394.148%20265.384L394.102%20265.407ZM43.7957%20170.991L1.23138%20340.812H43.7957L64.9173%20255.477L101.542%20299.372H145.918L182.542%20255.477L203.664%20340.812H246.228L203.664%20170.968L123.718%20265.912L43.7727%20170.968L43.7957%20170.991ZM203.664%201.14648L123.718%2096.0905L43.7957%201.14648L1.23138%20170.991H43.7957L64.9173%2085.6558L101.542%20129.55H145.918L182.542%2085.6558L203.664%20170.991H246.228L203.664%201.14648ZM496.454%20263.825L462.031%20258.848C453.431%20257.495%20450.037%20254.766%20450.037%20250.019C450.037%20242.313%20458.407%20238.919%20475.63%20238.919C495.559%20238.919%20513.447%20243.001%20532.253%20251.831L527.506%20218.554C512.324%20213.119%20494.894%20210.413%20476.777%20210.413C434.442%20210.413%20411.325%20225.136%20411.325%20251.624C411.325%20272.241%20424.007%20283.777%20450.954%20287.859L485.836%20293.065C494.665%20294.418%20498.289%20297.812%20498.289%20303.247C498.289%20310.953%20490.147%20314.576%20473.612%20314.576C451.871%20314.576%20428.319%20309.37%20409.078%20300.082L412.931%20333.359C429.466%20339.482%20450.977%20343.105%20471.135%20343.105C514.617%20343.105%20537.252%20327.924%20537.252%20300.977C537.252%20279.465%20524.57%20267.907%20496.5%20263.848L496.454%20263.825ZM552.388%20186.15V340.812H591.329V186.15H552.388ZM636.829%20271.301L690.974%20212.638H642.516L591.329%20273.319L645.91%20340.789H695.057L636.829%20271.278V271.301ZM546.953%20134.297C546.953%20159.203%20567.111%20173.238%20602.429%20173.238C610.799%20173.238%20618.734%20172.321%20626.876%20170.532L647.034%20142.003C636.622%20144.709%20624.835%20146.314%20614.194%20146.314C596.764%20146.314%20588.6%20142.691%20588.6%20134.091C588.6%20128.197%20592.911%20125.032%20602.635%20123.909L647.011%20118.749V170.991H685.952V95.586C685.952%2059.3513%20662.629%2040.5689%20617.335%2040.5689C596.718%2040.5689%20576.354%2044.4217%20558.466%2051.8979L552.342%2085.6329C571.583%2076.3449%20593.095%2071.3684%20612.565%2071.3684C633.32%2071.3684%20643.755%2077.3769%20646.323%2091.2057L598.759%2096.7326C562.754%20100.815%20546.907%20112.35%20546.907%20134.32L546.953%20134.297ZM438.043%20126.156C438.043%20157.414%20456.16%20173.261%20491.936%20173.261C506.201%20173.261%20517.988%20170.991%20529.294%20165.785L534.271%20131.591C523.4%20138.15%20512.301%20141.544%20501.201%20141.544C484.437%20141.544%20476.961%20134.756%20476.961%20119.574V74.2809H536.06V42.8163H476.961V16.099L402.909%2055.2691V74.2809H437.997V126.133L438.043%20126.156ZM399.767%20111.892V119.597H294.526C299.273%20135.284%20313.377%20142.462%20338.42%20142.462C358.349%20142.462%20376.925%20138.38%20393.437%20130.468L388.69%20163.537C373.508%20169.867%20354.267%20173.284%20334.567%20173.284C282.257%20173.284%20253.727%20150.19%20253.727%20107.397C253.727%2064.603%20282.715%2040.5918%20327.55%2040.5918C372.384%2040.5918%20399.79%2066.6441%20399.79%20111.914L399.767%20111.892ZM294.021%2093.3155H360.574C357.065%2078.2942%20345.53%2070.451%20327.091%2070.451C308.653%2070.451%20297.714%2078.0878%20294.021%2093.3155Z'%20fill='black'/%3e%3c/svg%3e"
                alt="MetaMask"
              />
              <img
                className="h-16 p-1 hidden dark:flex"
                src="data:image/svg+xml,%3csvg%20width='696'%20height='344'%20viewBox='0%200%20696%20344'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M394.102%20265.407V340.812H355.162V288.57L310.786%20293.73C301.039%20294.854%20296.75%20298.041%20296.75%20303.912C296.75%20312.512%20304.892%20316.136%20322.344%20316.136C332.985%20316.136%20344.773%20314.553%20355.184%20311.824L335.026%20340.353C326.885%20342.165%20318.95%20343.06%20310.579%20343.06C275.262%20343.06%20255.103%20329.024%20255.103%20304.119C255.103%20282.149%20270.95%20270.613%20306.956%20266.531L354.519%20261.004C351.951%20247.175%20341.516%20241.167%20320.762%20241.167C301.291%20241.167%20279.78%20246.143%20260.539%20255.431L266.662%20221.696C284.55%20214.22%20304.938%20210.367%20325.532%20210.367C370.825%20210.367%20394.148%20229.173%20394.148%20265.384L394.102%20265.407ZM43.7957%20170.991L1.23138%20340.812H43.7957L64.9173%20255.477L101.542%20299.372H145.918L182.542%20255.477L203.664%20340.812H246.228L203.664%20170.968L123.718%20265.912L43.7727%20170.968L43.7957%20170.991ZM203.664%201.14648L123.718%2096.0905L43.7957%201.14648L1.23138%20170.991H43.7957L64.9173%2085.6558L101.542%20129.55H145.918L182.542%2085.6558L203.664%20170.991H246.228L203.664%201.14648ZM496.454%20263.825L462.031%20258.848C453.431%20257.495%20450.037%20254.766%20450.037%20250.019C450.037%20242.313%20458.407%20238.919%20475.63%20238.919C495.559%20238.919%20513.447%20243.001%20532.253%20251.831L527.506%20218.554C512.324%20213.119%20494.894%20210.413%20476.777%20210.413C434.442%20210.413%20411.325%20225.136%20411.325%20251.624C411.325%20272.241%20424.007%20283.777%20450.954%20287.859L485.836%20293.065C494.665%20294.418%20498.289%20297.812%20498.289%20303.247C498.289%20310.953%20490.147%20314.576%20473.612%20314.576C451.871%20314.576%20428.319%20309.37%20409.078%20300.082L412.931%20333.359C429.466%20339.482%20450.977%20343.105%20471.135%20343.105C514.617%20343.105%20537.252%20327.924%20537.252%20300.977C537.252%20279.465%20524.57%20267.907%20496.5%20263.848L496.454%20263.825ZM552.388%20186.15V340.812H591.329V186.15H552.388ZM636.829%20271.301L690.974%20212.638H642.516L591.329%20273.319L645.91%20340.789H695.057L636.829%20271.278V271.301ZM546.953%20134.297C546.953%20159.203%20567.111%20173.238%20602.429%20173.238C610.799%20173.238%20618.734%20172.321%20626.876%20170.532L647.034%20142.003C636.622%20144.709%20624.835%20146.314%20614.194%20146.314C596.764%20146.314%20588.6%20142.691%20588.6%20134.091C588.6%20128.197%20592.911%20125.032%20602.635%20123.909L647.011%20118.749V170.991H685.952V95.586C685.952%2059.3513%20662.629%2040.5689%20617.335%2040.5689C596.718%2040.5689%20576.354%2044.4217%20558.466%2051.8979L552.342%2085.6329C571.583%2076.3449%20593.095%2071.3684%20612.565%2071.3684C633.32%2071.3684%20643.755%2077.3769%20646.323%2091.2057L598.759%2096.7326C562.754%20100.815%20546.907%20112.35%20546.907%20134.32L546.953%20134.297ZM438.043%20126.156C438.043%20157.414%20456.16%20173.261%20491.936%20173.261C506.201%20173.261%20517.988%20170.991%20529.294%20165.785L534.271%20131.591C523.4%20138.15%20512.301%20141.544%20501.201%20141.544C484.437%20141.544%20476.961%20134.756%20476.961%20119.574V74.2809H536.06V42.8163H476.961V16.099L402.909%2055.2691V74.2809H437.997V126.133L438.043%20126.156ZM399.767%20111.892V119.597H294.526C299.273%20135.284%20313.377%20142.462%20338.42%20142.462C358.349%20142.462%20376.925%20138.38%20393.437%20130.468L388.69%20163.537C373.508%20169.867%20354.267%20173.284%20334.567%20173.284C282.257%20173.284%20253.727%20150.19%20253.727%20107.397C253.727%2064.603%20282.715%2040.5918%20327.55%2040.5918C372.384%2040.5918%20399.79%2066.6441%20399.79%20111.914L399.767%20111.892ZM294.021%2093.3155H360.574C357.065%2078.2942%20345.53%2070.451%20327.091%2070.451C308.653%2070.451%20297.714%2078.0878%20294.021%2093.3155Z'%20fill='white'/%3e%3c/svg%3e"
                alt="MetaMask"
              />
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
                  className="h-5 w-5 stroke-icon-[#9fa6ae]"
                >
                  <polyline points="9 18 15 12 18 6"></polyline>
                </svg>
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
                      d="M13 0H5C2.24 0 0 2.24 0 5V15C0 17.76 2.24 20 5 20H13C15.76 20 18 17.76 18 15V5C18 2.24 15.76 0 13 0ZM9 20C6.096 20 3.666 17.901 3.666 14.915C3.666 11.928 6.096 9.498 9 9.498C11.904 9.498 14.334 11.928 14.334 14.915C14.334 17.901 11.904 20 9 20ZM22 9.08167C22 11.33 20.9675 13.3958 19.1675 14.7483C19.0175 14.8608 18.8417 14.915 18.6675 14.915C18.4142 14.915 18.1642 14.8 18 14.5825C17.7242 14.215 17.7983 13.6925 18.1658 13.4158C19.5425 12.3817 20.3333 10.8017 20.3333 9.0825C20.3333 6.09583 17.9033 3.66583 14.9167 3.66583C13.1975 3.66583 11.6175 4.45583 10.5825 5.83333C10.3067 6.20083 9.785 6.27417 9.41583 5.99917C9.04833 5.7225 8.97333 5.2 9.25 4.8325C10.6025 3.0325 12.6675 2 14.9167 2C18.8225 2 22 5.1775 22 9.08333V9.08167Z"
                    className="fill-[#9fa6ae] h-5 w-5 stroke-none"
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
          <h1 className="text-2xl font-bold tracking-tight">Application Successful</h1>
        </div>

        <div className="px-7 pb-10">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold dark:text-white">Congratulations! Your application has been approved</h2>
                <p className="text-gray-600 dark:text-gray-400">Based on your attested data, Easy Crypto is ready to offer you a loan</p>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <img src="/logos/easy-crypto.webp" alt="Easy Crypto" className="h-10 w-10 mr-3 object-contain" />
                    <h3 className="text-lg font-medium dark:text-white">Easy Crypto Loan Offer</h3>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                  <span className="text-blue-700 dark:text-blue-300 font-medium">Pre-approved up to $50,000 NZDD</span>
                </div>
              </div>

              {/* Loan Configuration */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-md mb-6">
              
                
                
                <div className="mt-4 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-md">
                  <div className="flex items-start ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg text-blue-700 dark:text-blue-300">
                      Monthly payment: <span className="font-semibold">${Number(loanAmount / loanTerm).toLocaleString('en-US', {maximumFractionDigits: 2})} NZDD</span> for {loanTerm} months
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Interest Rate</p>
                  <p className="text-lg font-semibold dark:text-white">3.5% per month</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Term Options</p>
                  <p className="text-lg font-semibold dark:text-white">3-12 months</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Offer Validity</p>
                  <p className="text-lg font-semibold dark:text-white">Next 7 days</p>
                </div>
              </div>
            </div>

            <div className="mb-8 p-6 border rounded-lg">
              <h3 className="text-lg font-medium mb-4 dark:text-white">Customize Your Loan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Loan Amount (NZDD)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">$</span>
                      <input
                        type="text"
                        id="loanAmount"
                        value={loanAmount}
                        onChange={(e) => {
                          // Only allow numbers
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          // Limit to max 50000
                          if (value === '' || (parseInt(value) <= 50000)) {
                            setLoanAmount(value);
                          }
                        }}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter amount"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Maximum: $50,000 NZDD</p>
                  </div>
                  <div>
                    <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                    </select>
                  </div>
                </div>
         
              
           
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 dark:text-white">Loan Calculator</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Monthly Payments</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Principal:</span>
                      <span className="font-medium dark:text-white">${Number(loanAmount / loanTerm).toLocaleString('en-US', {maximumFractionDigits: 2})} NZDD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Interest (3.5%):</span>
                      <span className="font-medium dark:text-white">${Number(loanAmount * 0.035).toLocaleString('en-US', {maximumFractionDigits: 2})} NZDD</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Total Monthly Payment:</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        ${Number(Number(loanAmount) / Number(loanTerm) + Number(loanAmount) * 0.035).toLocaleString('en-US', {maximumFractionDigits: 2})} NZDD
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Total Loan Costs</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Principal Amount:</span>
                      <span className="font-medium dark:text-white">${Number(loanAmount).toLocaleString('en-US', {maximumFractionDigits: 2})} NZDD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total Interest:</span>
                      <span className="font-medium dark:text-white">${Number(Number(loanAmount) * 0.035 * Number(loanTerm)).toLocaleString('en-US', {maximumFractionDigits: 2})} NZDD</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Total Repayment:</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        ${Number(Number(loanAmount) + Number(loanAmount) * 0.035 * Number(loanTerm)).toLocaleString('en-US', {maximumFractionDigits: 2})} NZDD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm text-blue-700 dark:text-blue-300 mb-6">
                  <p className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Interest is calculated monthly on the outstanding principal. Early repayments are allowed without penalties.</span>
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors">
                    Accept Offer & Continue
                  </button>
                  <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-md font-medium border border-gray-300 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600">
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

export default Result;
