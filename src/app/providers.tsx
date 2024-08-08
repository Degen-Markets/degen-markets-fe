"use client";

import * as React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ToastProvider } from "@/app/components/Toast/ToastProvider";
import { queryClient, wagmiConfig } from "./lib/utils/wagmiConfig";
import { DialogProvider } from "./components/Dialog/dialog";
import RenderBGImage from "./components/RenderBgImage";
import { BalanceProvider } from "@/app/components/RecentActivity/BalanceContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <React.Suspense fallback={<></>}>
          <RenderBGImage>
            <ToastProvider>
              <DialogProvider>
                <BalanceProvider>{children} </BalanceProvider>
              </DialogProvider>
            </ToastProvider>
          </RenderBGImage>
        </React.Suspense>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
