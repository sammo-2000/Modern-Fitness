"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Context for fetched data
interface FetchedDataContextType {
  MemberId: string;
  setMemberId: Dispatch<SetStateAction<string>>;
  handleViewMember: (id: string) => void;
}

const FetchedDataContext = createContext<FetchedDataContextType | undefined>(
  undefined,
);

export function useFetchedData(): FetchedDataContextType {
  const context = useContext(FetchedDataContext);
  if (context === undefined) {
    throw new Error("useFetchedData must be used within a FetchedDataProvider");
  }
  return context;
}

interface FetchedDataProviderProps {
  children: ReactNode;
}

export function FetchDataProvider({ children }: FetchedDataProviderProps) {
  const [MemberId, setMemberId] = useState<string>("");
  const [MemberNote, setMemberNote] = useState<string>("");
  // Function to handle setting MemberId
  const handleViewMember = (id: string) => {
    setMemberId(id);
  };
  // Function to handle setting MemberId

  return (
    <FetchedDataContext.Provider
      value={{
        MemberId,
        setMemberId,
        handleViewMember,
      }}
    >
      {children}
    </FetchedDataContext.Provider>
  );
}
