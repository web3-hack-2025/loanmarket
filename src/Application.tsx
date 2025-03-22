import { useState, useEffect } from "react";
import { LoansTable } from "./components/loans-table";
import { Sidebar } from "./components/sidebar";

function Application() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading offers
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500); // 4.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
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
