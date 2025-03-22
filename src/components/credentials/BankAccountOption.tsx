interface BankAccountOptionProps {
  onBack: () => void;
  onClose: () => void;
}

import { useState } from 'react';

export default function BankAccountOption({ onBack, onClose }: BankAccountOptionProps) {
  const [activeTab, setActiveTab] = useState('akahu');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountName, setAccountName] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Connect your bank account to securely verify your identity and financial information.
        </p>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-md mb-6">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={()=>{setActiveTab('csv')}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Your credentials are securely encrypted. This connection is read-only and cannot be used to move money.
          </p>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'akahu'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('akahu')}
        >
          Akahu Auth
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'csv'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('csv')}
        >
          CSV Upload
        </button>
      </div>
      
      {/* Akahu Auth Tab */}
      {activeTab === 'akahu' && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-5 mb-6">
          <div className="flex items-center justify-center flex-col">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium dark:text-white mb-2">Under Development</h3>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-2">
              Direct bank authentication via Akahu is coming soon.
            </p>
            <p className="text-center text-gray-500 dark:text-gray-400">
              This feature will allow you to securely connect your bank account with just a few clicks.
            </p>
          </div>
        </div>
      )}
      
      {/* CSV Upload Tab */}
      {activeTab === 'csv' && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-5 mb-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-md mb-6 border-l-4 border-yellow-400">
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                CSV upload is less trusted than direct bank connection. The information will need to be manually verified.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Bank Selection */}
            <div>
              <label htmlFor="bank" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Your Bank
              </label>
              <select
                id="bank"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
              >
                <option value="">Select a bank...</option>
                <option value="anz">ANZ Bank</option>
                <option value="asb">ASB Bank</option>
                <option value="bnz">BNZ</option>
                <option value="westpac">Westpac</option>
                <option value="kiwibank">Kiwibank</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            {/* Account Name */}
            <div>
              <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Account Name
              </label>
              <input
                type="text"
                id="accountName"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="E.g., Everyday Account"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            
            {/* CSV File Upload */}
            <div>
              <label htmlFor="csvFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Upload Bank Statement (CSV)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".csv" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    CSV files only
                  </p>
                  {csvFile && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Selected: {csvFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
