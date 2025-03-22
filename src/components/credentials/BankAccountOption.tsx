interface BankAccountOptionProps {
  onBack: () => void;
  onClose: () => void;
}

import { useState, useEffect } from 'react';
import { useIdentity } from '../../context/IdentityContext';

interface Transaction {
  date: string;
  description: string;
  amount: string;
  type: 'credit' | 'debit';
}

interface AccountSummary {
  averageBalance: number;
  totalIncome: number;
  totalExpense: number;
  largestTransaction: {
    amount: number;
    description: string;
    date: string;
  };
  recurringPayments: {
    description: string;
    amount: number;
    frequency: string;
  }[];
}

export default function BankAccountOption({ onBack, onClose }: BankAccountOptionProps) {
  const [activeTab, setActiveTab] = useState('akahu');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountName, setAccountName] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const { addIdentity } = useIdentity();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCsvFile(file);
      
      // Clear any previous errors
      setError(null);
      
      // Process the CSV file
      processCSV(file);
    }
  };
  
  const processCSV = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csvText = event.target?.result as string;
        const parsedTransactions = parseCSV(csvText);
        setTransactions(parsedTransactions);
      } catch (err) {
        setError('Failed to parse CSV file. Please check the format.');
        console.error('CSV parsing error:', err);
      }
    };
    
    reader.onerror = () => {
      setError('Error reading the file. Please try again.');
    };
    
    reader.readAsText(file);
  };
  
  const parseCSV = (csvText: string): Transaction[] => {
    // Split the CSV text into lines and remove empty lines
    const lines = csvText.split('\n').filter(line => line.trim().length > 0);
    
    // Skip the header row and parse each line
    return lines.slice(1).map(line => {
      // The format is: TransactionDate,Amount,Details
      const parts = line.split(',');
      
      // Extract date and amount from first two parts
      const date = parts[0].trim();
      const amountStr = parts[1].trim();
      
      // Combine the rest as description (in case description contains commas)
      const description = parts.slice(2).join(',').trim();
      
      // Parse amount to determine transaction type
      const amountNumber = parseFloat(amountStr);
      
      return {
        date,
        description,
        amount: Math.abs(amountNumber).toFixed(2),
        // For this format, we'll assume all positive values are debits (money spent)
        // and negative values are credits (money received)
        type: amountNumber < 0 ? 'credit' : 'debit'
      } as Transaction;
    }).filter(transaction => !isNaN(parseFloat(transaction.amount)));
  };
  
  const calculateAccountSummary = (transactions: Transaction[]): AccountSummary => {
    let totalIncome = 0;
    let totalExpense = 0;
    let largestAmount = 0;
    let largestTransaction = { amount: 0, description: '', date: '' };
    
    // Payment frequency detection data
    const paymentMap: {[key: string]: {amounts: number[], dates: string[]}} = {};
    
    transactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount);
      
      // Calculate income and expenses
      if (transaction.type === 'credit') {
        totalIncome += amount;
      } else {
        totalExpense += amount;
      }
      
      // Track largest transaction
      if (amount > largestAmount) {
        largestAmount = amount;
        largestTransaction = {
          amount: amount,
          description: transaction.description,
          date: transaction.date
        };
      }
      
      // Group similar transactions for recurring payment detection
      // Use the first 15 chars of description as a simple grouping mechanism
      const descKey = transaction.description.substring(0, 15).toLowerCase();
      if (!paymentMap[descKey]) {
        paymentMap[descKey] = { amounts: [], dates: [] };
      }
      paymentMap[descKey].amounts.push(amount);
      paymentMap[descKey].dates.push(transaction.date);
    });
    
    // Identify recurring payments (at least 2 occurrences)
    const recurringPayments = Object.entries(paymentMap)
      .filter(([_, data]) => data.amounts.length >= 2)
      .map(([key, data]) => {
        // Calculate average amount for the recurring payment
        const avgAmount = data.amounts.reduce((sum, amount) => sum + amount, 0) / data.amounts.length;
        
        // Determine frequency based on date patterns (simplified)
        let frequency = 'unknown';
        if (data.dates.length >= 3) {
          frequency = 'monthly'; // Simplified - would need more complex logic for real frequency detection
        } else if (data.dates.length >= 2) {
          frequency = 'recurring';
        }
        
        return {
          description: key + '...',
          amount: parseFloat(avgAmount.toFixed(2)),
          frequency
        };
      })
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3); // Top 3 recurring payments
    
    const averageBalance = totalIncome - totalExpense;
    
    return {
      averageBalance: parseFloat(averageBalance.toFixed(2)),
      totalIncome: parseFloat(totalIncome.toFixed(2)),
      totalExpense: parseFloat(totalExpense.toFixed(2)),
      largestTransaction,
      recurringPayments
    };
  };
  
  const handleConnect = () => {
    if (!selectedBank || !accountName || !csvFile) {
      setError('Please fill all required fields and upload a CSV file.');
      return;
    }
    
    setIsProcessing(true);
    
    // In a real application, you would process this server-side
    setTimeout(() => {
      try {
        // Create a new identity
        const currentDate = new Date();
        const issueDate = currentDate.toISOString().split('T')[0];
        
        // Set expiry to 1 year from now
        const expiryDate = new Date(
          currentDate.getFullYear() + 1,
          currentDate.getMonth(),
          currentDate.getDate()
        ).toISOString().split('T')[0];
        
        // Get bank name from the selected value
        const bankOptions: {[key: string]: string} = {
          'anz': 'ANZ Bank',
          'asb': 'ASB Bank',
          'bnz': 'BNZ',
          'westpac': 'Westpac',
          'kiwibank': 'Kiwibank',
          'other': 'Other Bank'
        };
        
        const bankName = bankOptions[selectedBank] || selectedBank;
        
        // Calculate account summary from transactions
        const accountSummary = calculateAccountSummary(transactions);
        
        // Add the identity with custom data
        addIdentity({
          name: `${bankName} - ${accountName}`,
          type: 'Bank Account',
          status: 'active',
          issueDate,
          expiryDate,
          imagePath: '',
          customData: {
            accountSummary,
            creditScore: Math.floor(Math.random() * 300) + 500, // Simulated credit score between 500-800
            accountAge: Math.floor(Math.random() * 60) + 6, // Simulated account age in months (6-66 months)
            accountType: accountName.toLowerCase().includes('savings') ? 'savings' : 'checking',
            currencyCode: 'NZD',
            lastUpdated: new Date().toISOString(),
            verified: true,
            analysisVersion: '1.0',
            transactions: transactions,
            bankInfo: {
              bank: bankName,
              accountName: accountName,
            }  
          }
        });
        
        setIsProcessing(false);
        onClose();
      } catch (err) {
        setError('Failed to create identity. Please try again.');
        console.error(err)
        setIsProcessing(false);
      }
    }, 1500);
  };
  
  const isFormValid = selectedBank && accountName && csvFile && transactions.length > 0;
  
  const renderAccountSummary = () => {
    if (transactions.length === 0) return null;
    
    const summary = calculateAccountSummary(transactions);
    
    return (
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account Summary</h4>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Total Income:</span>
            <span className="float-right font-medium text-green-600 dark:text-green-400">${summary.totalIncome}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Total Expense:</span>
            <span className="float-right font-medium text-red-600 dark:text-red-400">${summary.totalExpense}</span>
          </div>
          <div className="col-span-2 pt-1 border-t border-gray-200 dark:border-gray-700">
            <span className="text-gray-500 dark:text-gray-400">Balance:</span>
            <span className={`float-right font-medium ${
              summary.averageBalance >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>${summary.averageBalance}</span>
          </div>
        </div>
      </div>
    );
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
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-md border-l-4 border-red-400">
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {error}
                  </p>
                </div>
              </div>
            )}
            
            {/* Preview Transactions */}
            {transactions.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Detected Transactions ({transactions.length})
                </label>
                <div className="max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-md">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Date</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Description</th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-xs">
                      {transactions.slice(0, 5).map((transaction, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 whitespace-nowrap text-gray-900 dark:text-gray-300">{transaction.date}</td>
                          <td className="px-3 py-2 text-gray-900 dark:text-gray-300 truncate max-w-[150px]">{transaction.description}</td>
                          <td className={`px-3 py-2 text-right whitespace-nowrap ${
                            transaction.type === 'credit' 
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                          </td>
                        </tr>
                      ))}
                      {transactions.length > 5 && (
                        <tr>
                          <td colSpan={3} className="px-3 py-2 text-center text-gray-500 dark:text-gray-400">
                            ... and {transactions.length - 5} more transaction(s)
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Account Summary */}
                {/* {renderAccountSummary()} */}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-6 flex justify-end space-x-3">
        <button 
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={onBack}
          disabled={isProcessing}
        >
          Back
        </button>
        <button 
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
            !isFormValid || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleConnect}
          disabled={!isFormValid || isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing
            </span>
          ) : 'Connect'}
        </button>
      </div>
    </div>
  );
}
