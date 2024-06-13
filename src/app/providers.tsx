"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ToastProvider } from "@/app/components/Toast/ToastProvider";
import { wagmiConfig } from "./lib/utils/wagmiConfig";
import { DialogProvider } from "./components/Dialog/dialog";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <DialogProvider>{children}</DialogProvider>
        </ToastProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
