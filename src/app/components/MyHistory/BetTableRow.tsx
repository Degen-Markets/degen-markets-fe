import { useState, useEffect } from "react";
import {
  getBetSideText,
  getBetTypeText,
  getCurrencySymbolByAddress,
  getFormattedValue,
} from "@/app/lib/utils/bets/helpers";
import { Address } from "viem";
import { BetResponse } from "@/app/lib/utils/bets/types";
import TableUserInfo from "./common/TableUserInfo";
import BetStatus from "./common/BetStatus";
import BetCard from "../BetCard";

interface BetTableRowProps {
  bet: BetResponse;
  isEven: boolean;
  isAllExpanded: boolean;
  isMobile: boolean;
}

const formatDate = (timestamp: string) => {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleString(); // Convert date to a readable format
};

const BetTableRow = ({
  bet,
  isEven,
  isAllExpanded,
  isMobile,
}: BetTableRowProps) => {
  const { currency, creator, acceptor, type, value, isBetOnUp, winner } = bet;
  const [isExpanded, setIsExpanded] = useState(false);
  const loser = winner ? (winner === creator ? acceptor : creator) : null;
  const { leftText, rightText } = getBetSideText(isBetOnUp);
  const formattedValueToDisplay = getFormattedValue(value, currency);

  useEffect(() => {
    setIsExpanded(isAllExpanded);
  }, [isAllExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const desktopView = (
    <>
      <tr
        className={`${isEven ? "bg-gray-700" : "bg-gray-900"} hover:bg-purple-medium transition duration-300 cursor-pointer border`}
        onClick={toggleExpand}
      >
        <td className="p-4 border col-span-2 text-center">
          <TableUserInfo
            address={creator as Address}
            role={
              winner === creator ? "winner" : loser === creator ? "loser" : ""
            }
            layout="default"
          />
        </td>
        <td className="p-4 border text-center">
          {formattedValueToDisplay} {getCurrencySymbolByAddress(currency)}
        </td>
        <td
          className={`p-4 border text-center whitespace-nowrap ${isBetOnUp ? "text-green-main" : "text-red-main"}`}
        >
          {leftText}
        </td>
        <td className="p-4 border text-center">
          <div className="flex flex-col justify-center items-center">
            <span>VS</span>
            <div className="text-sm px-1 bg-purple-medium whitespace-nowrap">
              {getBetTypeText(type)}
            </div>
            <BetStatus bet={bet} />
          </div>
        </td>
        <td
          className={`p-4 border text-center whitespace-nowrap ${!isBetOnUp ? "text-green-main" : "text-red-main"}`}
        >
          {rightText}
        </td>
        <td className="p-4 border text-center">
          {formattedValueToDisplay} {getCurrencySymbolByAddress(currency)}
        </td>
        <td className="p-4 border col-span-2 text-center">
          <TableUserInfo
            address={acceptor as Address}
            role={
              winner === acceptor ? "winner" : loser === acceptor ? "loser" : ""
            }
            layout="reverse"
          />
        </td>
      </tr>
      <tr>
        <td colSpan={7} className="p-0 border-0">
          <div
            className={`transition-all duration-300 overflow-hidden ${isExpanded ? "max-h-screen p-4" : "max-h-0"}`}
          >
            {isExpanded && (
              <div className="bg-gray-800 p-4 text-white">
                <p className="text-3xl">Bet Details</p>
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
                <BetCard bet={bet} />
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );

  const mobileView = (
    <div
      className="bg-gray-700 mb-2  shadow-md transition duration-300 cursor-pointer"
      onClick={toggleExpand}
    >
      <div className="p-2">
        <TableUserInfo
          address={creator as Address}
          role={
            winner === creator ? "winner" : loser === creator ? "loser" : ""
          }
          layout="default"
        />
        <div className="mt-2">
          <strong>Stake: </strong>
          {formattedValueToDisplay} {getCurrencySymbolByAddress(currency)}
        </div>
        <div
          className={`mt-2 ${isBetOnUp ? "text-green-main" : "text-red-main"}`}
        >
          <strong>Prediction: </strong>
          {leftText}
        </div>
        <div className="mt-2 flex flex-col">
          <div className="text-sm px-1 inline-block">
            {getBetTypeText(type)}
          </div>
          <strong className=" bg-purple-medium">VS </strong>
          <div className="flex justify-center items-center">
            <BetStatus bet={bet} />
          </div>
        </div>
        <div
          className={`mt-2 ${!isBetOnUp ? "text-green-main" : "text-red-main"}`}
        >
          <strong>Outcome: </strong>
          {rightText}
        </div>
        <div className="mt-2">
          <strong>Profit/Loss: </strong>
          {formattedValueToDisplay} {getCurrencySymbolByAddress(currency)}
        </div>
        <TableUserInfo
          address={acceptor as Address}
          role={
            winner === acceptor ? "winner" : loser === acceptor ? "loser" : ""
          }
          layout="reverse"
        />
      </div>
      {isExpanded && (
        <div className="bg-gray-800 pb-4 -mx-1 text-white">
          <p className="text-3xl">Bet Details</p>
          <div className="flex flex-col">
            <p className="py-2">
              <strong>Created at:</strong> {formatDate(bet.creationTimestamp)}
            </p>
            <p className="py-2">
              <strong>Accepted at:</strong>{" "}
              {formatDate(bet.acceptanceTimestamp as string)}
            </p>
            <p className="py-2">
              <strong>Ended at:</strong> {formatDate(bet.expirationTimestamp)}
            </p>
          </div>
          <BetCard bet={bet} />
        </div>
      )}
    </div>
  );

  return isMobile ? mobileView : desktopView;
};

export default BetTableRow;
