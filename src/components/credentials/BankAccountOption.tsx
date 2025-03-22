interface BankAccountOptionProps {
  onBack: () => void;
  onClose: () => void;
}

export default function BankAccountOption({ onBack, onClose }: BankAccountOptionProps) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Connect your bank account to securely verify your identity and financial information.
        </p>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-md mb-6">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Your credentials are securely encrypted. This connection is read-only and cannot be used to move money.
          </p>
        </div>
      </div>
      
      {/* Bank selection would go here */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-5 mb-6">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Bank account connection functionality would be implemented here.
        </p>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button 
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={onBack}
        >
          Back
        </button>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={onClose}
        >
          Connect
        </button>
      </div>
    </div>
  );
}
