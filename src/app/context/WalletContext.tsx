"use client";
import React, { createContext, useContext, useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const WalletContext = createContext<undefined>(undefined);

function WalletContextProviderInner({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletContext.Provider value={undefined}>
      {children}
    </WalletContext.Provider>
  );
}

export function WalletContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContextProviderInner>{children}</WalletContextProviderInner>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export function useActiveSolanaWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error(
      "useSolanaWallet must be used within a WalletContextProvider",
    );
  }
  return context;
}
