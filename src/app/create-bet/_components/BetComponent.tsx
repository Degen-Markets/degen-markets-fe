"use client";
import { Suspense } from "react";
import SlotMachine from "./SlotMachine";
import { Button } from "@/app/components/Button";
import { useBetContext } from "../BetContext";
import BetProForm from "./BetProForm";
import BullOrBear from "./BullOrBear";
import Image from "next/image";

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
      className={`uppercase font-bold text-4xl flex justify-center items-center shadow drop-shadow-lg rounded-2xl py-3 px-5 ${
        isActive
          ? "bg-blue-light !hover:bg-purple-light text-white"
          : "bg-black-medium text-white"
      }`}
      onClick={onClick}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={50}
        height={50}
        className="mr-2"
      />
      {children}
    </div>
  );
};

const BetComponent = () => {
  const { isProMode, setIsProMode } = useBetContext();

  return (
    <>
      <div className="flex justify-center items-center flex-col w-full">
        <div className="flex mt-6 mb-10 justify-center rounded-3xl border overflow-hidden w-fit p-1">
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

        <div className="flex justify-center select-none  mt-6 mx-4">
          <Suspense fallback={<></>}>
            {
              isProMode ? <BetProForm /> : <BullOrBear />
              // <SlotMachine />
            }
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default BetComponent;
