"use client";

import React, { Suspense } from "react";
import CreateBetSuccess from "@/app/create-bet/success/CreateBetSuccess";
import Wrapper from "@/app/components/Wrapper";

const Page = () => {
  return (
    <Suspense fallback={<></>}>
      <Wrapper className="lg:max-w-screen-md">
        <CreateBetSuccess />
      </Wrapper>
    </Suspense>
  );
};
export default Page;
