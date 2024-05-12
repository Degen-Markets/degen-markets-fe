import React from "react";
import { BetProvider } from "@/app/create-bet/BetContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BetProvider>{children}</BetProvider>;
}
