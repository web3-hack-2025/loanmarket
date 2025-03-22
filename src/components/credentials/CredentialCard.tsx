import { useState } from "react";
import { useIdentity } from "../../context/IdentityContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface CredentialCardProps {
  credential?: {
    id?: string;
    name: string;
    type: string;
    issueDate: string;
    expiryDate: string;
    status: string;
    imagePath?: string;
    url?: string;
  };
  onAddNew?: () => void;
  isAddNew?: boolean;
}

export function CredentialCard({ credential, onAddNew, isAddNew = false }: CredentialCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { removeIdentity } = useIdentity();

  const handleDelete = () => {
    if (credential?.id) {
      removeIdentity(credential.id);
    }
    setIsDeleteDialogOpen(false);
  };

  // Render the "Add New" card
  if (isAddNew) {
    return (
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
          onClick={onAddNew}
        >
          Connect Account
        </Button>
      </div>
    );
  }

  // Render an existing credential card
  if (!credential) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
        <img 
          src={credential.imagePath || credential.url} 
          alt={credential.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/600x400/gray/white?text=No+Image";
          }}
        />
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
          credential.status === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
        }`}>
          {credential.status === 'active' ? 'Active' : 'Pending'}
        </div>
        
        {/* Delete button */}
        <button 
          className="absolute top-3 left-3 p-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/50 rounded-full text-red-600 dark:text-red-400"
          onClick={() => setIsDeleteDialogOpen(true)}
          aria-label="Delete credential"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold dark:text-white">{credential.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{credential.type}</p>
        
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Issue Date:</span>
            <span className="font-medium dark:text-white">{credential.issueDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Expiry Date:</span>
            <span className="font-medium dark:text-white">{credential.expiryDate}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            View Details
          </button>
        </div>
      </div>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Credential</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this credential? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
