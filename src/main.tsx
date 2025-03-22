import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./Loan.tsx";
import Result from "./Result.tsx";
import Identity from "./Identity.tsx";
import Apply from "./Apply.tsx";
import Application from "./Application.tsx";
import Success from "./Success.tsx";
import { LoanProvider } from "./context/LoanContext.tsx";
import { IdentityProvider } from "./context/IdentityContext";
import Landing from "./Landing.tsx";
import { Web3Provider } from "./components/web3/web3-provider.tsx";
import WalletBouncer from "./components/web3/wallet-bouncer.tsx";

// Force dark mode regardless of user's system preference
document.documentElement.classList.add("dark");

// Prevent system preference from overriding dark mode
const forceDarkMode = () => {
  document.documentElement.classList.add("dark");
};

// Add event listener to ensure dark mode persists
window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", forceDarkMode);

// Initial call to force dark mode
forceDarkMode();

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <Web3Provider>
      <LoanProvider>
        <IdentityProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/loan" element={<WalletBouncer><App /></WalletBouncer>} />

              <Route path="/apply" element={<WalletBouncer><Apply /></WalletBouncer>} />
              <Route path="/result" element={<WalletBouncer><Result /></WalletBouncer>} />
              <Route path="/offers" element={<WalletBouncer><Application /></WalletBouncer>} />
              <Route path="/success" element={<WalletBouncer><Success /></WalletBouncer>} />
              <Route path="/identity" element={<WalletBouncer><Identity /></WalletBouncer>} />
            </Routes>
          </BrowserRouter>
        </IdentityProvider>
      </LoanProvider>
    </Web3Provider>
  );
} else {
  console.error("Root element not found");
}
