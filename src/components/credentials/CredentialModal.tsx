import { useState } from "react";
import BankAccountOption from "./BankAccountOption";
import IDUploadOption from "./IDUploadOption";
import CryptoWalletOption from "./CryptoWalletOption";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CredentialModal({ isOpen, onClose }: CredentialModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleBack = () => {
    setSelectedOption(null);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "bank":
        return <BankAccountOption onBack={handleBack} onClose={()=>{onClose();handleBack();}} />;
      case "id":
        return <IDUploadOption onBack={handleBack} onClose={()=>{onClose();handleBack();}} />;
      case "crypto":
        return <CryptoWalletOption onBack={handleBack} onClose={()=>{onClose();handleBack();}} />;
      default:
        return (
          <>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose the type of credential you want to add to your identity profile:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Bank Account Option */}
              <div 
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                onClick={() => handleOptionSelect("bank")}
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
              
              {/* ID Document Option */}
              <div 
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                onClick={() => handleOptionSelect("id")}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                    </svg>
                  </div>
                  <h3 className="font-medium dark:text-white">ID Document</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Upload a government-issued ID like passport or driver's license
                </p>
              </div>
              
              {/* Crypto Wallet Option */}
              <div 
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                onClick={() => handleOptionSelect("crypto")}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-medium dark:text-white">Crypto Wallet</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Verify ownership of your cryptocurrency wallet
                </p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={onClose}
      data-enhanced-backdrop="true"
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {selectedOption ? (
              selectedOption === "bank" 
                ? "Connect Bank Account" 
                : selectedOption === "id" 
                  ? "Upload ID Document" 
                  : "Connect Crypto Wallet"
            ) : "Add New Credential"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-2">
          {renderContent()}
        </div>
        
        {!selectedOption && (
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
