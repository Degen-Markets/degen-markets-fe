"use client";

import * as React from "react";
import { ToastProvider } from "@/app/components/Toast/ToastProvider";
import { DialogProvider } from "./components/Dialog/dialog";
import { WalletContextProvider } from "./context/WalletContext";
import { UserProfileProvider } from "./context/UserProfileContext";
import { DrawerProvider } from "./components/Drawer/drawer";
import QueryClientProvider from "./context/QueryClientProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <React.Suspense fallback={<></>}>
        <ToastProvider>
          <WalletContextProvider>
            <DialogProvider>
              <DrawerProvider>
                <UserProfileProvider>{children}</UserProfileProvider>
              </DrawerProvider>
            </DialogProvider>
          </WalletContextProvider>
        </ToastProvider>
      </React.Suspense>
    </QueryClientProvider>
  );
}
