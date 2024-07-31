import { useMemo } from "react";
import {
  getBetImageUrl,
  getBetOutcome,
  getBetTypeText,
  getCurrencySymbolByAddress,
  getFormattedValue,
} from "@/app/lib/utils/bets/helpers";
import { Address } from "viem";
import { BetResponse } from "@/app/lib/utils/bets/types";
import TableUserInfo from "./common/TableUserInfo";
import BetOutComeBox from "./common/BetOutComeBox";
import { twMerge } from "tailwind-merge";
import { useAccount } from "wagmi";

const BetTableRow = ({ bet }: { bet: BetResponse }) => {
  const {
    currency,
    acceptor,
    type,
    value,
    isBetOnUp,
    winner,
    startingMetricValue,
    endingMetricValue,
    strikePriceAcceptor,
    strikePriceCreator,
  } = bet;
  const { address } = useAccount();
  const { outcome, bgImage } = getBetOutcome(
    type,
    isBetOnUp,
    startingMetricValue,
    endingMetricValue,
    Number(strikePriceCreator),
    Number(strikePriceAcceptor),
  );
  const formattedValueToDisplay = getFormattedValue(value, currency);

  const profitLoss = `${formattedValueToDisplay} ${getCurrencySymbolByAddress(currency)}`;

  const getPredictionBgImage = () => {
    return prediction === "Price Moons"
      ? "/profile/Moon.webp"
      : "/profile/Rug.webp";
  };

  const prediction = useMemo(() => {
    return isBetOnUp ? "Price Moons" : "Price Rugs";
  }, [isBetOnUp]);

  return (
    <div
      className={`grid grid-cols-6 transition duration-300 text-sm lg:text-lg uppercase font-bold w-full`}
    >
      <div className="center-all p-2 lg:p-4">
        <TableUserInfo address={acceptor as Address} layout="default" />
      </div>
      <div className="p-2 lg:p-4 border border-y-0 border-black-main border-r-0 center-all">
        <BetOutComeBox bgImage={getBetImageUrl(type)}>
          {getBetTypeText(type)}
        </BetOutComeBox>
      </div>
      <div className="flex justify-center items-center text-center p-2 lg:p-4 border border-r-0 border-y-0 border-black-main">
        {profitLoss}
      </div>
      <div className="center-all w-full p-2 lg:p-4 border border-y-0 border-black-main ">
        <BetOutComeBox bgImage={getPredictionBgImage()}>
          <span
            className={`${isBetOnUp ? "text-green-light" : "text-red-light"} drop-shadow-bg`}
          >
            {prediction}
          </span>
        </BetOutComeBox>
      </div>
      <div className="center-all w-full p-2 lg:p-4">
        <BetOutComeBox bgImage={bgImage}>
          <span
            className={`${outcome.status ? "text-green-light" : "text-red-light"} drop-shadow-bg`}
          >
            {outcome.text}
          </span>
        </BetOutComeBox>
      </div>
      <div className=" border border-y-0 border-black-main border-r-0 center-all p-2 lg:p-4">
        <div
          className={twMerge(
            winner?.toLowerCase() === address?.toLowerCase()
              ? "text-green-light"
              : "text-red-light",
          )}
        >
          {profitLoss}
        </div>
      </div>
    </div>
  );
};

export default BetTableRow;
