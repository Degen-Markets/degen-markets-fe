"use client";

import * as React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ToastProvider } from "@/app/components/Toast/ToastProvider";
import { queryClient, wagmiConfig } from "./lib/utils/wagmiConfig";
import { DialogProvider } from "./components/Dialog/dialog";
import RenderBGImage from "./components/RenderBgImage";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { BalanceProvider } from "@/app/components/RecentActivity/BalanceContext";

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
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <React.Suspense fallback={<></>}>
          <RenderBGImage>
            <ToastProvider>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                  <WalletModalProvider>
                    <DialogProvider>
                      <BalanceProvider>{children} </BalanceProvider>
                    </DialogProvider>
                  </WalletModalProvider>
                </WalletProvider>
              </ConnectionProvider>
            </ToastProvider>
          </RenderBGImage>
        </React.Suspense>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
