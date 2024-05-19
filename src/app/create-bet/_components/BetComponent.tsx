"use client";
import React, { Suspense, useState } from "react";
import SlotMachine from "./SlotMachine";
import { Button } from "@/app/components/Button";
import SlotMachinePro from "./SlotMachinePro";
import { useBetContext } from "../BetContext";

const BetComponent = () => {
  // const [isPro, setIsPro] = useState(false);
  const { isProMode, setIsProMode } = useBetContext();

  return (
    <>
      <div className="flex justify-center space-x-4 flex-col w-full">
        <div className="flex my-10 justify-center">
          <Button
            size="regular"
            className={
              !isProMode ? "bg-purple-medium text-white" : "bg-blue-dark"
            }
            onClick={() => setIsProMode(false)}
          >
            Lite
          </Button>
          <Button
            size="regular"
            className={
              isProMode
                ? "bg-purple-medium !hover:bg-purple-light text-white"
                : "bg-blue-dark"
            }
            onClick={() => setIsProMode(true)}
          >
            Pro
          </Button>
        </div>

        <div className="flex justify-center select-none">
          <Suspense fallback={<></>}>
            {isProMode ? <SlotMachinePro /> : <SlotMachine />}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default BetComponent;
