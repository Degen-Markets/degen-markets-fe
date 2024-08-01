import { useState, useEffect } from "react";
import {
  getBetOutcome,
  getBetTypeText,
  getCurrencySymbolByAddress,
  getFormattedValue,
  getUserRole,
} from "@/app/lib/utils/bets/helpers";
import { Address } from "viem";
import { BetResponse } from "@/app/lib/utils/bets/types";
import BetStatus from "./common/BetStatus";
import BetCard from "../BetCard";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { HiChevronDoubleDown } from "react-icons/hi2";
import HistoryTableUserInfo from "./common/HistoryTableUserInfo";

interface BetTableRowProps {
  bet: BetResponse;
  isEven: boolean;
  isAllExpanded: boolean;
}

const formatDate = (timestamp: string) => {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleString(); // Convert date to a readable format
};

const BetTableRow = ({ bet, isEven, isAllExpanded }: BetTableRowProps) => {
  const {
    currency,
    creator,
    acceptor,
    type,
    value,
    isBetOnUp,
    winner,
    startingMetricValue,
    endingMetricValue,
    strikePriceCreator,
    strikePriceAcceptor,
  } = bet;
  const [isExpanded, setIsExpanded] = useState(false);
  const { outcome } = getBetOutcome(
    type,
    isBetOnUp,
    startingMetricValue,
    endingMetricValue,
    Number(strikePriceCreator),
    Number(strikePriceAcceptor),
  );
  const formattedValueToDisplay = getFormattedValue(value, currency);

  useEffect(() => {
    setIsExpanded(isAllExpanded);
  }, [isAllExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const isBetExpired = !winner && !acceptor;

  const profitLoss = isBetExpired
    ? "xxxx xxxxx"
    : `${formattedValueToDisplay} ${getCurrencySymbolByAddress(currency)}`;

  const prediction = isBetOnUp ? "Price Moon" : "Price Rugs";

  return (
    <div className="group">
      <div
        className={`grid grid-cols-5 sm:grid-cols-9 ${isEven ? "bg-gray-700" : "bg-gray-900"} hover:bg-purple-medium transition duration-300 cursor-pointer border`}
        onClick={toggleExpand}
      >
        <div className="center-all p-4 border border-y-0 sm:col-span-2">
          <HistoryTableUserInfo
            address={creator as Address}
            role={getUserRole(creator, winner, creator, acceptor as Address)}
            layout="default"
          />
        </div>
        <div className="center-all p-4 border border-y-0">
          <div className="center-all flex-col ">
            <div className="block sm:hidden">
              {isBetOnUp ? (
                <Image
                  src="/ArrowUp.svg"
                  width={24}
                  height={24}
                  alt="arrow-up"
                />
              ) : (
                <Image
                  src="/ArrowDown.svg"
                  width={24}
                  height={24}
                  alt="arrow-down"
                />
              )}
            </div>
            {formattedValueToDisplay} {getCurrencySymbolByAddress(currency)}
          </div>
        </div>
        <div
          className={twMerge(
            "hidden sm:flex justify-center items-center text-center p-4 border border-y-0",
            isBetOnUp ? "text-green-main" : "text-red-main",
          )}
        >
          {prediction}
        </div>
        <div className="center-all p-4 border border-y-0">
          <div className="flex flex-col justify-center items-center ">
            <span>VS</span>
            <div className="text-sm px-1 bg-purple-medium leading-3 py-1 group-hover:hidden">
              {getBetTypeText(type)}
            </div>
            <BetStatus bet={bet} className="group-hover:hidden" />
            <HiChevronDoubleDown
              size={30}
              className="hidden transition-all ease-in duration-150 group-hover:block animate-bounce h-full py-3 md:py-[7px] z-0"
            />
          </div>
        </div>
        <div
          className={twMerge(
            "hidden sm:flex justify-center items-center  p-4 border border-y-0 text-center",
            !isBetOnUp && !isBetExpired ? "text-green-main" : "text-red-main",
          )}
        >
          {isBetExpired ? "xxxx xxxxx" : outcome.text}
        </div>
        <div className="center-all p-4 border border-y-0">
          <div className="center-all flex-col">
            <div className="block sm:hidden">
              {isBetExpired ? (
                "xxxx"
              ) : isBetOnUp ? (
                <Image
                  src="/ArrowDown.svg"
                  width={24}
                  height={24}
                  alt="arrow-down"
                />
              ) : (
                <Image
                  src="/ArrowUp.svg"
                  width={24}
                  height={24}
                  alt="arrow-up"
                />
              )}
            </div>
            {profitLoss}
          </div>
        </div>
        <div className="center-all p-4 border border-y-0 sm:col-span-2">
          <HistoryTableUserInfo
            address={acceptor as Address}
            role={getUserRole(
              acceptor as Address,
              winner,
              creator,
              acceptor as Address,
            )}
            layout="reverse"
          />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-9 p-0 border-0">
          <div
            className={`transition-all duration-300 col-span-9 overflow-hidden ${isExpanded ? "max-h-screen" : "max-h-0"}`}
          >
            {isExpanded && (
              <div className="bg-gray-800 p-4 text-white">
                <p className="text-3xl">Bet Details</p>
                {isBetExpired ? (
                  <div className="flex justify-center items-center border-4 border-b-0">
                    <p className="px-2">
                      <strong>Created at:</strong>{" "}
                      {formatDate(bet.creationTimestamp)}
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-center items-center border-4 border-b-0">
                    <p className="border-r-4 px-2">
                      <strong>Created at:</strong>{" "}
                      {formatDate(bet.creationTimestamp)}
                    </p>
                    <p className="border-r-4 px-2">
                      <strong>Accepted at:</strong>{" "}
                      {formatDate(bet.acceptanceTimestamp as string)}
                    </p>
                    <p className="px-2">
                      <strong>Ended at:</strong>{" "}
                      {formatDate(bet.expirationTimestamp)}
                    </p>
                  </div>
                )}
                <BetCard bet={bet} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetTableRow;
