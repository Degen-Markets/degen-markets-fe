"use client";
import { Suspense } from "react";
import { useBetContext } from "../BetContext";
import BetProForm from "./BetProForm";
import BullOrBear from "./BullOrBear";
import Image from "next/image";
import RecentActivity from "@/app/components/RecentActivity/RecentActivity";
import BetToggleButton from "./BetToggleButton";

const BetComponent = ({ ethPrice }: { ethPrice: number | null }) => {
  const { isProMode, setIsProMode, setValue } = useBetContext();
  return (
    <>
      <div className="flex-col lg:flex-row flex justify-center items-center lg:items-start w-full max-w-7xl mx-auto lg:gap-5">
        <div className="flex justify-center items-center flex-col w-full ">
          <div className="flex mt-6 mb-10 justify-center rounded-4xl border-2 overflow-hidden w-fit p-1 bg-black-medium">
            <BetToggleButton
              isActive={!isProMode}
              icon="/games/lite.svg"
              iconAlt="Lite"
              onClick={() => {
                setIsProMode(false);
                setValue("10");
              }}
            >
              Lite
            </BetToggleButton>
            <BetToggleButton
              isActive={isProMode}
              icon="/games/pro.svg"
              iconAlt="Pro"
              onClick={() => {
                setIsProMode(true);
                setValue("10");
              }}
            >
              Pro
            </BetToggleButton>
          </div>

          <div className="flex justify-center select-none mt-6 w-full">
            <Suspense fallback={<></>}>
              {isProMode ? (
                <BetProForm ethPrice={ethPrice} />
              ) : (
                <BullOrBear ethPrice={ethPrice} />
              )}
            </Suspense>
          </div>
        </div>
        <div className="hidden md:block w-full max-w-xl mt-5  overflow-y-auto md:sticky lg:top-10 mx-4">
          <RecentActivity />
        </div>
      </div>
    </>
  );
};

export default BetComponent;
