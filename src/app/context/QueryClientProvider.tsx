"use client";
import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: false,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let clientQueryClientSingleton: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!clientQueryClientSingleton) {
      clientQueryClientSingleton = makeQueryClient();
    }
  }

  return clientQueryClientSingleton;
}

export default function QueryClientProvider({
  children,
}: React.PropsWithChildren) {
  const client = getQueryClient();

  return (
    <>
      <TanStackQueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={true} />{" "}
        {/* ReactQueryDevtools only visible on dev environment not in production */}
      </TanStackQueryClientProvider>
    </>
  );
}
