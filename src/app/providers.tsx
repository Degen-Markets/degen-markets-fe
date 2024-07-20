"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ToastProvider } from "@/app/components/Toast/ToastProvider";
import { queryClient, wagmiConfig } from "./lib/utils/wagmiConfig";
import { DialogProvider } from "./components/Dialog/dialog";
import RenderBGImage from "./components/RenderBgImage";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RenderBGImage>
          <ToastProvider>
            <DialogProvider>{children}</DialogProvider>
          </ToastProvider>
        </RenderBGImage>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
