import { BetResponse } from "@/app/lib/utils/bets/types";
import { prettifyAddress } from "@/app/lib/utils/evm";
import { getHumanFriendlyMetric } from "@/app/lib/utils/bets/helpers";
import Link from "next/link";
import React from "react";

const BetCard = ({ bet }: { bet: BetResponse }) => {
  return (
    <div className="bg-blue-dark p-3 w-[300px]">
      <div className="bg-blue-medium text-blue-dark my-2 p-1">
        {prettifyAddress(bet.creator)} is betting that...
      </div>
      <div className="bg-white text-blue-dark p-1">
        {bet.ticker}&apos;s {getHumanFriendlyMetric(bet.metric)} will go&nbsp;
        {bet.isBetOnUp ? "up" : "down"} in{" "}
        {parseInt(bet.duration) / 60 / 60 / 24} days.
      </div>
      <div className="flex justify-center mt-4">
        <Link href={`/bets/${bet.id}`}>
          <button className="flex flex-row masked-button p-1 rounded-full text-3xl w-fit cursor-pointer">
            <span className="flex flex-row bg-blue-dark rounded-full px-2 py-0.5">
              <span className="masked-button-text flex geo-font cursor-pointer">
                Accept bet
                <span className="gradient-button-arrow flex items-center"></span>
              </span>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BetCard;
