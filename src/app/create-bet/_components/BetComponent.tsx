"use client";
import { Suspense } from "react";
import SlotMachine from "./SlotMachine";
import { Button } from "@/app/components/Button";
import { useBetContext } from "../BetContext";
import BetProForm from "./BetProForm";
import BullOrBear from "./BullOrBear";
import Image from "next/image";
import RecentActivity from "@/app/components/RecentActivity/RecentActivity";
import EthPrice from "./EthPrice";
import CreateBetButton from "@/app/components/CreateBetButton";

interface CustomButtonProps {
  isActive: boolean;
  imageSrc: string;
  imageAlt: string;
  onClick: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  isActive,
  imageSrc,
  imageAlt,
  onClick,
  children,
}) => {
  return (
    <div
      className={`uppercase font-bold flex justify-center items-center rounded-[30px] py-2 px-7 md:py-3 md:px-10 ${
        isActive
          ? "bg-blue-light !hover:bg-purple-light text-white"
          : "bg-black-medium text-white cursor-pointer"
      }`}
      onClick={onClick}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={50}
        height={50}
        className="mr-1"
      />
      <p className="text-2xl md:text-4xl drop-shadow-text ">{children}</p>
    </div>
  );
};

const BetComponent = ({ ethPrice }: { ethPrice: number | null }) => {
  const { isProMode, setIsProMode } = useBetContext();
  return (
    <>
      <div className="flex justify-center items-start w-full max-w-7xl mx-auto gap-5">
        <div className="flex justify-center items-center flex-col w-full ">
          <div className="flex mt-6 mb-10 justify-center rounded-4xl border-2 overflow-hidden w-fit p-1 bg-black-medium">
            <CustomButton
              isActive={!isProMode}
              imageSrc="/games/lite.svg"
              imageAlt="lite"
              onClick={() => setIsProMode(false)}
            >
              Lite
            </CustomButton>
            <CustomButton
              isActive={isProMode}
              imageSrc="/games/pro.svg"
              imageAlt="pro"
              onClick={() => setIsProMode(true)}
            >
              Pro
            </CustomButton>
          </div>

          <div className="flex justify-center select-none  mt-6 mx-4 w-full">
            <Suspense fallback={<></>}>
              {
                isProMode ? <BetProForm /> : <BullOrBear ethPrice={ethPrice} />
                // <SlotMachine />
              }
            </Suspense>
          </div>
        </div>
        <div className="w-full max-w-xl h-[900px] sticky top-10">
          <RecentActivity />
        </div>
      </div>
    </>
  );
};

export default BetComponent;
