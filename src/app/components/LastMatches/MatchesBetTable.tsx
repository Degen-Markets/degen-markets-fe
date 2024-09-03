import { useMemo } from "react";
import { BetResponse } from "@/app/lib/utils/bets/types";
import {
  getBetImageUrl,
  getBetOutcome,
  getBetTypeText,
  getCurrencySymbolByAddress,
  getFormattedValue,
} from "@/app/lib/utils/bets/helpers";
import BetOutComeBox from "./common/BetOutComeBox";
import { Address } from "viem";
import { twMerge } from "tailwind-merge";
import Table from "../Table/Table";
import MatchesTableUserInfo from "./common/MatchesTableUserInfo";
import { DUMMY_BETS } from "@/app/lib/utils/bets/constants";

const MatchesBetTable = ({ bets }: { bets: BetResponse[] }) => {
  // const { address } = useAccount();
  const profileTableColumns = [
    { key: "opponent", label: "Opponent" },
    { key: "game", label: "Game" },
    { key: "stake", label: "Stake" },
    { key: "prediction", label: "Prediction" },
    { key: "outcome", label: "Outcome" },
    { key: "profitLoss", label: "Profit/Loss" },
  ];

  const profileTableData = useMemo(() => {
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
            <MatchesTableUserInfo
              address={acceptor as Address}
              layout="default"
            />
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
                winner?.toLowerCase() === DUMMY_BETS[0].creator?.toLowerCase()
                  ? "text-green-light"
                  : "text-red-light",
              )}
            >
              {profitLoss}
            </div>
          ),
        };
      });
  }, [bets]);

  return (
    <Table
      columns={profileTableColumns}
      data={profileTableData}
      isExpandable={false}
    />
  );
};

export default MatchesBetTable;
