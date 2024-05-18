"use client";
import React, { Suspense, useState } from "react";
import SlotMachinePro from "./SlotMachinePro";
import SlotMachine from "./SlotMachine";
import { ButtonPrimary, ButtonSecondary } from "@/app/components/Button";

const BetComponent = () => {
  const [isPro, setIsPro] = useState(false);

  return (
    <>
      <div className="flex justify-center space-x-4 mt-4 flex-col ">
        <div className="flex space-x-5 my-10">
          <ButtonPrimary
            size="small"
            // className={`px-4 py-2 rounded ${!isPro ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setIsPro(false)}
          >
            Lite
          </ButtonPrimary>
          <ButtonSecondary
            size="small"
            // className={`px-4 py-2 rounded ${isPro ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setIsPro(true)}
          >
            Pro
          </ButtonSecondary>
        </div>

        <div className="flex justify-center select-none">
          <Suspense fallback={<></>}>
            {isPro ? <SlotMachinePro /> : <SlotMachine />}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default BetComponent;
