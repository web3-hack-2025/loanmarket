import { useState, useRef, ChangeEvent } from 'react';
import { useIdentity } from '../../context/IdentityContext';

interface IDUploadOptionProps {
  onBack: () => void;
  onClose: () => void;
}

export default function IDUploadOption({ onBack, onClose }: IDUploadOptionProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [idName, setIdName] = useState<string>('');
  const [idType, setIdType] = useState<string>('Government ID');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addIdentity } = useIdentity();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Auto-fill name based on file name if not already set
      if (!idName) {
        const fileName = file.name.split('.')[0];
        setIdName(fileName.replace(/[_-]/g, ' '));
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file);
      
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Auto-fill name based on file name if not already set
      if (!idName) {
        const fileName = file.name.split('.')[0];
        setIdName(fileName.replace(/[_-]/g, ' '));
      }
    }
  };

  const handleUpload = () => {
    if (uploadedFile && idName) {
      setIsUploading(true);
      
      // In a real application, you would upload the file to a server here
      // For this demo, we'll just simulate a delay and add the identity locally
      setTimeout(() => {
        // Create a new identity
        const currentDate = new Date();
        const issueDate = currentDate.toISOString().split('T')[0];
        
        // Set expiry to 5 years from now
        const expiryDate = new Date(
          currentDate.getFullYear() + 5,
          currentDate.getMonth(),
          currentDate.getDate()
        ).toISOString().split('T')[0];
        
        addIdentity({
          name: idName,
          type: idType,
          status: "active",
          issueDate,
          expiryDate,
          // In a real app, this would be the URL returned by the server
          // For now, we'll use the local object URL
          imagePath: previewUrl || '',
        });
        
        setIsUploading(false);
        onClose();
      }, 1500);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Upload your government-issued ID for identity verification. We accept driver's licenses, passports, and national ID cards.
        </p>
      </div>
      
      {!previewUrl ? (
        <div 
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 text-center mb-6 cursor-pointer"
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            Drag and drop your ID image here, or click to browse
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Supported formats: JPG, PNG, PDF (Max 5MB)
          </p>
          
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/jpeg,image/png,application/pdf"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              ID Preview
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <img 
                src={previewUrl} 
                alt="ID Preview" 
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="idName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ID Name
              </label>
              <input
                type="text"
                id="idName"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g. NZ Driver's License"
                value={idName}
                onChange={(e) => setIdName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="idType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ID Type
              </label>
              <select
                id="idType"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
              >
                <option value="Government ID">Government ID</option>
                <option value="Educational ID">Educational ID</option>
                <option value="Company ID">Company ID</option>
                <option value="Membership Card">Membership Card</option>
                <option value="Other">Other</option>
              </select>
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
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center ${
            !uploadedFile || !idName || isUploading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          onClick={handleUpload}
          disabled={!uploadedFile || !idName || isUploading}
        >
          {isUploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            'Upload'
          )}
        </button>
      </div>
    </div>
  );
}
