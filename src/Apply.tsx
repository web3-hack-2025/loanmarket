import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoan } from "./hooks/useLoan";

import CredentialModal from "./components/credentials/CredentialModal";
import { useIdentity } from "./context/IdentityContext";

// Progress indicator component
const ProgressIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { number: 1, label: "Identity Type" },
    { number: 2, label: "Select Credentials" },
    { number: 3, label: "Application Details" },
    { number: 4, label: "Confirmation" },
  ];

  return (
    <div className="mb-8">
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* Step circle */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 flex-shrink-0 ${
                step.number === currentStep
                  ? "bg-blue-600 text-white"
                  : step.number < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {step.number < currentStep ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              ) : (
                <span>{step.number}</span>
              )}
            </div>

            {/* Step label */}
            <div
              className={`text-sm font-medium ${
                step.number === currentStep
                  ? "text-blue-600 dark:text-blue-400"
                  : step.number < currentStep
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Identity Type Selection Step
const IdentityTypeStep = ({
  onNext,
  setApplicationType,
  applicationType,
}: {
  onNext: () => void;
  setApplicationType: (type: string) => void;
  applicationType: string;
}) => {
  // Handle option selection and proceed to next step
  const handleOptionSelect = (type: string) => {
    setApplicationType(type);
    // If selecting "new" option, don't proceed automatically due to the feature in development notice
    if (type !== "new") {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-6">Identity Verification</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        To proceed with your loan application, we need to verify your identity.
        Please select one of the options below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Use Existing Identity Option */}
        <div
          className={`p-6 border rounded-lg cursor-pointer transition-all ${
            applicationType === "existing"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700"
          }`}
          onClick={() => handleOptionSelect("existing")}
        >
          <div className="flex items-center mb-2">
            <div className="mr-3 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="font-medium">Use Existing Identity</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Select from your verified identity credentials to use for this
            application.
          </p>
        </div>

        {/* Create New Identity Option */}
        <div
          className={`p-6 border rounded-lg cursor-pointer transition-all ${
            applicationType === "new"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700"
          }`}
          onClick={() => handleOptionSelect("new")}
        >
          <div className="flex items-center mb-2">
            <div className="mr-3 flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </div>
            <h3 className="font-medium">Create New Identity</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add a new identity credential to your profile to use for this and
            future applications.
          </p>
        </div>
      </div>

      {/* Feature in development notice for new identity */}
      {applicationType === "new" && (
        <div className="mb-6">
          <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                  Feature in development
                </h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <p>
                    The ability to create new identities during the application
                    process is still being developed. Please use an existing
                    identity or create one from the Identity page.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue button only for "new" option since we can't proceed automatically */}
          <div className="flex justify-start pt-4">
            <button
              onClick={onNext}
              className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Identity Credentials Selection Step
const IdentityCredentialsStep = ({
  onNext,
  onPrev,
  selectedIdentityIds,
  setSelectedIdentityIds,
}: {
  onNext: () => void;
  onPrev: () => void;
  selectedIdentityIds: string[];
  setSelectedIdentityIds: (ids: string[]) => void;
}) => {
  // Get identities from context
  const { identities } = useIdentity();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle identity selection
  const toggleIdentitySelection = (id: string) => {
    if (selectedIdentityIds.includes(id)) {
      setSelectedIdentityIds(
        selectedIdentityIds.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedIdentityIds([...selectedIdentityIds, id]);
    }
  };

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-6">
        Select Identity Credentials
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Please select the identity credentials you want to use for this
        application.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {identities.map((identity) => (
          <div
            key={identity.id}
            className={`border rounded-lg overflow-hidden transition-all cursor-pointer ${
              selectedIdentityIds.includes(identity.id)
                ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
                : "border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700"
            }`}
            onClick={() => toggleIdentitySelection(identity.id)}
          >
            {/* Card Image */}
            <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
              <img
                src={identity.imagePath}
                alt={identity.name}
                className="h-full w-full object-cover"
              />
              {/* Selection Indicator */}
              {selectedIdentityIds.includes(identity.id) && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              )}
              {/* Status Badge */}
              <div className="absolute bottom-2 right-2">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs ${
                    identity.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-400"
                      : identity.status === "expired"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-400"
                  }`}
                >
                  {identity.status.charAt(0).toUpperCase() +
                    identity.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              <h3 className="font-medium text-lg">{identity.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {identity.type}
              </p>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Issued</p>
                  <p>{identity.issueDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Expires</p>
                  <p>{identity.expiryDate}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Credential Button */}
        <div
          className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors h-full min-h-[300px]"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold dark:text-white mb-2">
            Add New Credential
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Add a new identity credential to use in your application
          </p>
        </div>
      </div>

      {/* Credential Modal - Now using the imported component */}
      <CredentialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="flex justify-start gap-4 pt-4">
        <button
          onClick={onNext}
          disabled={selectedIdentityIds.length === 0}
          className={`px-4 py-2 rounded-md text-white flex-1 ${
            selectedIdentityIds.length > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
        <button
          onClick={onPrev}
          className="px-4 flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Back
        </button>
      </div>
    </div>
  );
};

// Application Details Step
const ApplicationDetailsStep = ({
  personalInfo,
  setPersonalInfo,
  onNext,
  onPrev,
}: {
  personalInfo: {
    loanAmount: string;
    termLength: string;
    loanReason: string;
    otherReasonText: string;
  };
  setPersonalInfo: (info: typeof personalInfo) => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const { setRequestedAmount, setTermLength } = useLoan();

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // If the loan amount is changing, update the context
    if (name === "loanAmount") {
      setRequestedAmount(value);
    }

    // If the term length is changing, update the context
    if (name === "termLength") {
      setTermLength(value);
    }

    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  // Handle loan reason card selection
  const handleLoanReasonSelect = (reason: string) => {
    setPersonalInfo({
      ...personalInfo,
      loanReason: reason,
    });
  };

  // Check if form is valid
  const isFormValid = () => {
    if (
      personalInfo.loanAmount.trim() === "" ||
      personalInfo.termLength.trim() === ""
    ) {
      return false;
    }

    if (
      personalInfo.loanReason === "Other" &&
      personalInfo.otherReasonText.trim() === ""
    ) {
      return false;
    }

    return personalInfo.loanReason !== "";
  };

  // Loan reason options
  const loanReasons = [
    { id: "home-improvement", label: "Home Improvement", icon: "🏠" },
    { id: "debt-consolidation", label: "Debt Consolidation", icon: "💰" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "medical", label: "Medical Expenses", icon: "🏥" },
    { id: "vehicle", label: "Vehicle Purchase", icon: "🚗" },
    { id: "business", label: "Business", icon: "💼" },
    { id: "vacation", label: "Vacation", icon: "✈️" },
    { id: "other", label: "Other", icon: "📝" },
  ];

  return (
    <div className="">
      <h2 className="text-xl font-semibold">Loan Application Details</h2>
      <p className="text-gray-500 dark:text-gray-400">
        Please provide the following information about your loan request
      </p>

      <form className="space-y-6 mt-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="loanAmount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Requested Loan Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400">$</span>
              </div>
              <input
                type="text"
                id="loanAmount"
                name="loanAmount"
                value={personalInfo.loanAmount}
                onChange={handleInputChange}
                required
                placeholder="5,000"
                className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="flex-1">
            <label
              htmlFor="termLength"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Term Length
            </label>
            <select
              id="termLength"
              name="termLength"
              value={personalInfo.termLength}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="">Select term</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
              <option value="48">48 months</option>
              <option value="60">60 months</option>
            </select>
          </div>
          <div className="flex-1"></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Reason for Loan
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {loanReasons.map((reason) => (
              <div
                key={reason.id}
                onClick={() =>
                  handleLoanReasonSelect(
                    reason.id === "other" ? "Other" : reason.label
                  )
                }
                className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${
                  personalInfo.loanReason === reason.label ||
                  (reason.id === "other" && personalInfo.loanReason === "Other")
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700"
                }`}
              >
                <span className="text-2xl mb-2">{reason.icon}</span>
                <span className="text-sm font-medium text-center">
                  {reason.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {personalInfo.loanReason === "Other" && (
          <div>
            <label
              htmlFor="otherReasonText"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Please specify your reason
            </label>
            <textarea
              id="otherReasonText"
              name="otherReasonText"
              value={personalInfo.otherReasonText}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Please explain the purpose of this loan..."
            />
          </div>
        )}

        <div className="flex justify-start pt-4 gap-4">
          <button
            type="button"
            onClick={onNext}
            disabled={!isFormValid()}
            className={`px-4 py-2 rounded-md text-white flex-1 ${
              isFormValid()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-400 cursor-not-allowed"
            }`}
          >
            Submit Application
          </button>
          <button
            type="button"
            onClick={onPrev}
            className="px-4 py-2 mr-2 flex-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

// Confirmation Step
const ConfirmationStep = ({
  personalInfo,
  selectedIdentityIds,
  onPrev,
  onSubmit,
}: {
  personalInfo: {
    loanAmount: string;
    termLength: string;
    loanReason: string;
    otherReasonText: string;
  };
  selectedIdentityIds: string[];
  onPrev: () => void;
  onSubmit: () => void;
}) => {
  // Get identities from context
  const { identities } = useIdentity();

  // Get selected identity details
  const selectedIdentities = identities.filter((identity) =>
    selectedIdentityIds.includes(identity.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Review Your Application</h2>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          Review
        </span>
      </div>

      <p className="text-gray-500 dark:text-gray-400">
        Please review your application details before submitting. You can go
        back to make changes if needed.
      </p>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Loan Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Loan Amount
              </h4>
              <p className="text-lg font-semibold">
                ${personalInfo.loanAmount}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Term Length
              </h4>
              <p className="text-lg font-semibold">
                {personalInfo.termLength} months
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 md:col-span-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Reason for Loan
              </h4>
              <p className="text-lg font-semibold">
                {personalInfo.loanReason === "Other"
                  ? personalInfo.otherReasonText
                  : personalInfo.loanReason}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Identity Verification
          </h3>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Selected Credentials
            </h4>

            <div className="space-y-3">
              {selectedIdentities.map((identity) => (
                <div key={identity.id} className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {identity.imagePath ? (
                      <img
                        src={identity.imagePath}
                        alt={identity.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <svg
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {identity.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {identity.type}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        identity.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {identity.status === "active" ? "Active" : "Expiring"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 gap-4">
        <button
          type="button"
          onClick={onSubmit}
          className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Application
        </button>
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Edit Application
        </button>
      </div>
    </div>
  );
};

function Apply() {
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const { setRequestedAmount, setTermLength } = useLoan();

  // Application data
  const [applicationType, setApplicationType] = useState("");
  const [selectedIdentityIds, setSelectedIdentityIds] = useState<string[]>([]);
  const [personalInfo, setPersonalInfo] = useState({
    loanAmount: "",
    termLength: "",
    loanReason: "",
    otherReasonText: "",
  });

  // Get the navigate function from React Router
  const navigate = useNavigate();

  // Handle next step
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle submit application
  const submitApplication = () => {
    // Save the loan amount to context before navigating
    setRequestedAmount(personalInfo.loanAmount);
    // Save the term length to context before navigating
    setTermLength(personalInfo.termLength);

    // TO DO: Implement application submission logic
    console.log("Application submitted!");
    // Navigate to the result page
    navigate("/offers");
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <IdentityTypeStep
            onNext={nextStep}
            setApplicationType={setApplicationType}
            applicationType={applicationType}
          />
        );
      case 2:
        return (
          <IdentityCredentialsStep
            onNext={nextStep}
            onPrev={prevStep}
            selectedIdentityIds={selectedIdentityIds}
            setSelectedIdentityIds={setSelectedIdentityIds}
          />
        );
      case 3:
        return (
          <ApplicationDetailsStep
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <ConfirmationStep
            personalInfo={personalInfo}
            selectedIdentityIds={selectedIdentityIds}
            onPrev={prevStep}
            onSubmit={submitApplication}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-h-screen ">
      <div className="m-6">
        <h1 className="text-2xl font-bold tracking-tight">Apply for a Loan</h1>
      </div>
      <div className="flex border-t">
        <div className="p-4 h-[calc(100vh-96px)] border-r">
          {" "}
          <ProgressIndicator currentStep={currentStep} />
        </div>

        <section className="flex-1 overflow-y-scroll h-[calc(100vh-96px)]">
          <div className="p-6 ">{renderStep()}</div>
        </section>
      </div>
    </div>
  );
}

export default Apply;
