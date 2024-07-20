import { ButtonDanger } from "@/app/components/Button/ButtonDanger";
import { ButtonSuccess } from "@/app/components/Button/ButtonSuccess";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { useBetContext } from "../BetContext";
import { ChangeEvent } from "react";
import BetUpButton from "./CreateBetUpButton";

const BullOrBearLayout = ({ ethPrice }: { ethPrice: number | null }) => {
  const { value, setValue } = useBetContext();

  const handleValueInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const decimals = newValue.split(/\,|\./)[1];
    if (!decimals || decimals.length < 7) {
      setValue(newValue);
    }
  };

  return (
    <div className=" w-full max-w-xl p-6 bg-[#2b3a4d] rounded-xl shadow-md">
      <h2 className="text-4xl font-bold text-center text-white mb-4 drop-shadow-text ">
        BULL OR BEAR
      </h2>
      <div className="flex justify-between items-center py-2 border-t-4 border-black-medium px-2">
        <span className="text-white font-bold text-xl">Duration</span>
        <span className="text-white flex text-xl items-center font-bold">
          6 Hours
          <Image
            src="/games/timer.svg"
            alt="timer"
            width={20}
            height={20}
            className="ml-2 w-5 h-5 text-white"
          />
        </span>
      </div>
      <div className="p-10 bg-black-medium rounded-xl  border-2">
        <div className="flex items-center">
          <div className="w-full mr-2">
            <p className="text-sm font-bold">ETH : ${ethPrice?.toFixed(2)}</p>
            <div className="flex items-center gap-2 ">
              <div className="relative w-full ">
                <Image
                  src="/tokens/ETH.svg"
                  alt="ETH"
                  width={24}
                  height={24}
                  className="absolute top-1/2 transform -translate-y-1/2 left-2"
                />
                <input
                  type="text"
                  readOnly={true}
                  defaultValue={"ETH"}
                  className="pr-2 sm:pr-4 py-2 ring-purple-medium text-[#000] uppercase w-full  rounded-xl pl-2 sm:pl-10"
                  placeholder="ETH"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center flex-col justify-between ">
            <span className="text-white text-sm whitespace-nowrap font-bold">
              Input Amount
            </span>
            <input
              type="number"
              defaultValue="0.1"
              value={value}
              onChange={handleValueInput}
              lang="en-US"
              step=".000001"
              className="w-28 pl-2 pr-2 py-2 border-2 text-center rounded-xl bg-[#2b3a4d] text-white focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-between gap-3 mt-4">
          <BetUpButton betType="binary" />

          <ButtonDanger
            size="regular"
            className="w-full rounded-xl font-bold uppercase"
          >
            BET DOWN
          </ButtonDanger>
        </div>
      </div>
    </div>
  );
};

export default BullOrBearLayout;
