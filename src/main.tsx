import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loan from "./Loan.tsx";
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
import { ExecuterPage } from "./components/executer/ExecuterPage.tsx";
import { MobileHeader } from "./components/MobileHeader";

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { deserialize, serialize } from 'wagmi'

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
    },
  },
})

const persister = createSyncStoragePersister({
  serialize,
  storage: window.localStorage,
  deserialize,
})

if (root) {
  ReactDOM.createRoot(root).render(
    <Web3Provider>
      <LoanProvider>
        <IdentityProvider>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        >
          <BrowserRouter>
            <MobileHeader />
            <Routes>
              <Route 
                path="/" 
                element={
                  <WalletBouncer>
                    {({ connected }: { connected: boolean }) => 
                      connected ? <Navigate to="/loan" replace /> : <Landing />
                    }
                  </WalletBouncer>
                } 
              />
              <Route path="/loan" element={<WalletBouncer><Loan /></WalletBouncer>} />
              <Route path="/apply" element={<WalletBouncer><Apply /></WalletBouncer>} />
              <Route path="/result" element={<WalletBouncer><Result /></WalletBouncer>} />
              <Route path="/offers" element={<WalletBouncer><Application /></WalletBouncer>} />
              <Route path="/execute" element={<WalletBouncer><ExecuterPage /></WalletBouncer>} />
              <Route path="/success" element={<WalletBouncer><Success /></WalletBouncer>} />
              <Route path="/identity" element={<WalletBouncer><Identity /></WalletBouncer>} />
            </Routes>
          </BrowserRouter>
          </PersistQueryClientProvider>
        </IdentityProvider>
      </LoanProvider>
    </Web3Provider>
  );
} else {
  console.error("Root element not found");
}
