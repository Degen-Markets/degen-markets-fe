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
        <div className="flex mt-6 mb-10 justify-center">
          <Button
            size="regular"
            className={`min-w-[140px] ${
              isProMode
                ? "bg-purple-medium !hover:bg-purple-light text-white"
                : "bg-prussian-dark text-white"
            }`}
            onClick={() => setIsProMode(true)}
          >
            Pro
          </Button>
          <Button
            size="regular"
            className={`min-w-[140px] ${
              !isProMode
                ? "bg-purple-medium !hover:bg-purple-light text-white"
                : "bg-prussian-dark text-white"
            }`}
            onClick={() => setIsProMode(false)}
          >
            Feelin&apos; lucky?
          </Button>
        </div>

        <div className="flex justify-center select-none  mt-6">
          <Suspense fallback={<></>}>
            {isProMode ? <BetProForm /> : <SlotMachine />}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default BetComponent;
