import { useState, useEffect } from "react";
import { Sidebar } from "./components/sidebar";
import CredentialModal from "./components/credentials/CredentialModal"; // Import the new modal component
import { useIdentity } from "./context/IdentityContext"; // Import the identity provider hook
import { Button } from "./components/ui/button";

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
  const [isCredentialTypeModalOpen, setIsCredentialTypeModalOpen] = useState(false);

  // Use the identity context hook to get identities and related functions
  const { identities } = useIdentity();

  useEffect(() => {
    document.title = "Identity Credentials | NZDD";
  }, []);

  const handleCredentialTypeSelect = () => {
    setIsCredentialTypeModalOpen(true);
  };


  return (
    <div className="flex h-screen">
       <Sidebar />
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
            {identities.map((identity) => (
              <div key={identity.id || identity.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                  <img 
                    src={identity.imagePath || identity.url} 
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
              <Button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                onClick={handleCredentialTypeSelect}
              >
                Connect Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Replace the Credential Type Selection Modal with the new CredentialModal */}
      <CredentialModal 
        isOpen={isCredentialTypeModalOpen} 
        onClose={() => setIsCredentialTypeModalOpen(false)} 
      />
    </div>
  );
}

export default Identity;
