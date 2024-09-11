"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/app/components/Toast/ToastProvider";
import { DialogProvider } from "./components/Dialog/dialog";
import { WalletContextProvider } from "./context/WalletContext";

export const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<></>}>
        <ToastProvider>
          <WalletContextProvider>
            <DialogProvider>{children}</DialogProvider>
          </WalletContextProvider>
        </ToastProvider>
      </React.Suspense>
    </QueryClientProvider>
  );
}
