import React, { Suspense } from "react";
import MainBetPage from "./MainBetPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainBetPage>{children}</MainBetPage>;
}
