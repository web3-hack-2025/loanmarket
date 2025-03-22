import { createContext, useContext, useState, ReactNode } from "react";

// Define the identity interface
export interface ExistingIdentity {
  id: string;
  name: string;
  type: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expiring" | "expired";
  imagePath: string;
}

// Initial identities data
const initialIdentities: ExistingIdentity[] = [
  {
    id: "1",
    name: "NZ Driver's License",
    type: "Government ID",
    issueDate: "2018-05-12",
    expiryDate: "2028-05-12",
    status: "active",
    imagePath: "/license.jpg",
  },
  {
    id: "2",
    name: "UoA Student ID",
    type: "Educational ID",
    issueDate: "2022-02-15",
    expiryDate: "2026-02-15",
    status: "active",
    imagePath: "/id.jpeg",
  },
  {
    id: "3",
    name: "ANZ Bank Account",
    type: "Financial ID",
    issueDate: "2019-11-03",
    expiryDate: "N/A",
    status: "active",
    imagePath: "/bank.png",
  },
  {
    id: "4",
    name: "Bitcoin Wallet",
    type: "Cryptocurrency",
    issueDate: "2020-03-15",
    expiryDate: "N/A",
    status: "active",
    imagePath: "/logos/easy-crypto.webp",
  },
];

// Define context type
interface IdentityContextType {
  identities: ExistingIdentity[];
  addIdentity: (identity: Omit<ExistingIdentity, "id">) => void;
  updateIdentity: (id: string, identity: Partial<ExistingIdentity>) => void;
  removeIdentity: (id: string) => void; // Add this line
}

// Create the context
const IdentityContext = createContext<IdentityContextType | undefined>(
  undefined
);

// Provider component
export function IdentityProvider({ children }: { children: ReactNode }) {
  const [identities, setIdentities] =
    useState<ExistingIdentity[]>(initialIdentities);

  const addIdentity = (identity: Omit<ExistingIdentity, "id">) => {
    const newIdentity = {
      ...identity,
      id: (identities.length + 1).toString(),
    };
    setIdentities([...identities, newIdentity]);
  };

  const updateIdentity = (
    id: string,
    updatedFields: Partial<ExistingIdentity>
  ) => {
    setIdentities(
      identities.map((identity) =>
        identity.id === id ? { ...identity, ...updatedFields } : identity
      )
    );
  };

  const removeIdentity = (id: string) => {
    setIdentities((prevIdentities) =>
      prevIdentities.filter((identity) => identity.id !== id)
    );
  };

  return (
    <IdentityContext.Provider
      value={{ identities, addIdentity, updateIdentity, removeIdentity }}
    >
      {children}
    </IdentityContext.Provider>
  );
}

// Custom hook to use the identity context
export function useIdentity() {
  const context = useContext(IdentityContext);
  if (context === undefined) {
    throw new Error("useIdentity must be used within an IdentityProvider");
  }
  return context;
}
