"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/app/components/Toast/ToastProvider";
import { DialogProvider } from "./components/Dialog/dialog";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

export const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network],
  );
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<></>}>
        <ToastProvider>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <DialogProvider>
                  {/* <BalanceProvider>  */}{" "}
                  {/* can be reused for Solana balance  */}
                  {children}
                  {/* </BalanceProvider> */}
                </DialogProvider>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </ToastProvider>
      </React.Suspense>
    </QueryClientProvider>
  );
}
