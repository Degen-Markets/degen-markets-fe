import React from "react";
import { BetProvider } from "@/app/create-bet/BetContext";
import MainBetPage from "./MainBetPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainBetPage>{children}</MainBetPage>;
}
