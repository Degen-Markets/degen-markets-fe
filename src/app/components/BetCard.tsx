import { BetResponse } from "@/app/lib/utils/bets/types";
import { prettifyAddress } from "@/app/lib/utils/evm";
import { getHumanFriendlyMetric } from "@/app/lib/utils/bets/helpers";
import Link from "next/link";
import React from "react";
import { DEFAULT_BET_DURATION } from "@/app/lib/utils/bets/constants";
import { ButtonPrimary } from "@/app/components/Button";

const BetCard = ({ bet }: { bet: BetResponse }) => {
  const isBetExpired =
    parseInt(bet.creationTimestamp) * 1000 + DEFAULT_BET_DURATION <= Date.now();
  return (
    <div className="bg-blue-dark p-3 w-[300px] rounded">
      <div className="bg-blue-medium text-blue-dark my-2 p-1">
        {prettifyAddress(bet.creator)} is betting that...
      </div>
      <div className="bg-white text-blue-dark p-1 h-[72px]">
        {bet.ticker}&apos;s {getHumanFriendlyMetric(bet.metric)} will go&nbsp;
        {bet.isBetOnUp ? "up" : "down"} in{" "}
        {parseInt(bet.duration) / 60 / 60 / 24} days.
      </div>
      <div className="flex justify-center mt-4">
        <Link href={`/bets/${bet.id}`}>
          <ButtonPrimary size={"regular"}>
            {isBetExpired ? "View details" : "Accept bet"}
          </ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default BetCard;
