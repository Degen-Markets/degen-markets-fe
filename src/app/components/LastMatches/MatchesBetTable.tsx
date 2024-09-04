import { useMemo } from "react";
import { Address, BetResponse } from "@/app/lib/utils/bets/types";
import { getBetImageUrl, getBetTypeText } from "@/app/lib/utils/bets/helpers";
import BetOutComeBox from "./common/BetOutComeBox";
import { twMerge } from "tailwind-merge";
import Table from "../Table/Table";
import MatchesTableUserInfo from "./common/MatchesTableUserInfo";
import { DUMMY_BETS } from "@/app/lib/utils/bets/constants";

const MatchesBetTable = ({ bets }: { bets: BetResponse[] }) => {
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
        const { acceptor, type, isBetOnUp, winner } = bet;

        const profitLoss = `0 ETH`;
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
            <BetOutComeBox bgImage={"/profile/Moon.webp"}>
              <span
                className={`${true ? "text-green-light" : "text-red-light"} drop-shadow-bg`}
              >
                Unknown Bet Type
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
