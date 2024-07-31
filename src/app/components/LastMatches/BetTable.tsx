import React, { useMemo } from "react";
import { Card } from "../Card";
import { BetResponse } from "@/app/lib/utils/bets/types";
import {
  getBetImageUrl,
  getBetOutcome,
  getBetTypeText,
  getCurrencySymbolByAddress,
  getFormattedValue,
} from "@/app/lib/utils/bets/helpers";
import TableUserInfo from "./common/TableUserInfo";
import BetOutComeBox from "./common/BetOutComeBox";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { twMerge } from "tailwind-merge";
import Table from "../Table/Table";

const BetTable = ({ bets }: { bets: BetResponse[] }) => {
  const { address } = useAccount();
  const columns = [
    { key: "opponent", label: "Opponent" },
    { key: "game", label: "Game" },
    { key: "stake", label: "Stake" },
    { key: "prediction", label: "Prediction" },
    { key: "outcome", label: "Outcome" },
    { key: "profitLoss", label: "Profit/Loss" },
  ];

  const data = useMemo(() => {
    return bets
      .slice()
      .reverse()
      .map((bet) => {
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
        const prediction = isBetOnUp ? "Price Moons" : "Price Rugs";
        const predictionBgImage =
          prediction === "Price Moons"
            ? "/profile/Moon.webp"
            : "/profile/Rug.webp";

        return {
          opponent: (
            <TableUserInfo address={acceptor as Address} layout="default" />
          ),
          game: (
            <BetOutComeBox bgImage={getBetImageUrl(type)}>
              {getBetTypeText(type)}
            </BetOutComeBox>
          ),
          stake: profitLoss,
          prediction: (
            <BetOutComeBox bgImage={predictionBgImage}>
              <span
                className={`${isBetOnUp ? "text-green-light" : "text-red-light"} drop-shadow-bg`}
              >
                {prediction}
              </span>
            </BetOutComeBox>
          ),
          outcome: (
            <BetOutComeBox bgImage={bgImage}>
              <span
                className={`${outcome.status ? "text-green-light" : "text-red-light"} drop-shadow-bg`}
              >
                {outcome.text}
              </span>
            </BetOutComeBox>
          ),
          profitLoss: (
            <div
              className={twMerge(
                winner?.toLowerCase() === address?.toLowerCase()
                  ? "text-green-light"
                  : "text-red-light",
              )}
            >
              {profitLoss}
            </div>
          ),
        };
      });
  }, [address, bets]);

  return (
    <div className="overflow-auto rounded-xl">
      <Card className="rounded-xl w-[1200px]">
        <Table columns={columns} data={data} />
      </Card>
    </div>
  );
};

export default BetTable;
