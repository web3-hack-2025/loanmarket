import { useState, useEffect } from "react";
import { Sidebar } from "./components/sidebar";
import CredentialModal from "./components/credentials/CredentialModal"; // Import the new modal component
import { useIdentity } from "./context/IdentityContext"; // Import the identity provider hook
import { CredentialCard } from "./components/credentials/CredentialCard"; // Import the new component

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
              <CredentialCard 
                key={identity.id || identity.name} 
                credential={identity} 
              />
            ))}
            
            {/* Add New Credential Card */}
            <CredentialCard 
              isAddNew 
              onAddNew={handleCredentialTypeSelect} 
            />
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
