"use client";
import { Suspense } from "react";
import SlotMachine from "./SlotMachine";
import { Button } from "@/app/components/Button";
import { useBetContext } from "../BetContext";
import BetProForm from "./BetProForm";

const BetComponent = () => {
  const { isProMode, setIsProMode } = useBetContext();

  return (
    <>
      <div className="flex justify-center  flex-col w-full">
        <div className="flex mt-6 mb-10 sm:my-10 justify-center">
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
            {isProMode ? <BetProForm /> : <SlotMachine />}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default BetComponent;
