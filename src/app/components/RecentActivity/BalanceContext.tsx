import React, { createContext, useContext } from "react";
import { useAccount } from "wagmi";
import useBalances from "@/app/hooks/useBalances";

interface BalanceContextType {
  userBalances: Record<string, bigint>;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { address } = useAccount();
  const { userBalances } = useBalances(false, address);

  return (
    <BalanceContext.Provider value={{ userBalances }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalanceContext = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalanceContext must be used within a BalanceProvider");
  }
  return context;
};
