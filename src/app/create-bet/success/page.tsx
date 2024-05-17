"use client";

import React, { Suspense } from "react";
import CreateBetSuccess from "@/app/create-bet/success/CreateBetSuccess";

const Page = () => {
  return (
    <Suspense fallback={<></>}>
      <CreateBetSuccess />
    </Suspense>
  );
};
export default Page;
