import React, { createContext, useContext, useState } from 'react';

interface CandidContextType {
  numberOfCopies: number;
  setNumberOfCopies: (copies: number) => void;
}

const CandidContext = createContext<CandidContextType | any>(undefined);

export const useCandidContext = () => {
  const context = useContext(CandidContext);
  if (!context) {
    throw new Error('useCandidContext must be used within a CandidProvider');
  }
  return context;
};

export const CandidProvider: React.FC<any> = ({ children }) => {
  const [numberOfCopies, setNumberOfCopies] = useState<number>(1);

  const value: CandidContextType = {
    numberOfCopies,
    setNumberOfCopies,
  };

  return <CandidContext.Provider value={value}>{children}</CandidContext.Provider>;
};
