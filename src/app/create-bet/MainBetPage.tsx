"use client";
import React, { Suspense } from "react";
import { BetProvider } from "./BetContext";

const MainBetPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <BetProvider>{children}</BetProvider>
    </Suspense>
  );
};

export default MainBetPage;
