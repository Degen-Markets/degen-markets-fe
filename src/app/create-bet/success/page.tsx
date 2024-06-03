"use client";

import React, { Suspense } from "react";
import CreateBetSuccess from "@/app/create-bet/success/CreateBetSuccess";
import BetLayout from "@/app/layouts/BetLayout";

const Page = () => {
  return (
    <Suspense fallback={<></>}>
      <BetLayout>
        <CreateBetSuccess />
      </BetLayout>
    </Suspense>
  );
};
export default Page;
