import { getLastActivity, shortenHash } from "@/app/lib/utils/bets/helpers";
import MetricDisplay from "@/app/components/Metric";
import React from "react";
import { useAccount } from "wagmi";
import { BetResponse } from "@/app/lib/utils/bets/types";

type ActivityRowProps = {
  bet: BetResponse;
};

const ActivityRow = ({ bet }: ActivityRowProps) => {
  const { address } = useAccount();
  const { activity, actor } = getLastActivity(bet);

  return (
    <div className="flex flex-col justify-between leading-none border-b border-neutral-200 text-neutral-800 py-2 px-3  uppercase text-lg tracking-wide">
      <div className="text-neutral-400 text-sm leading-none">
        {actor.toLowerCase() === address?.toLowerCase()
          ? "YOU"
          : shortenHash(actor, 8)}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {bet.ticker}
          <MetricDisplay
            betType={bet.type}
            metric={bet.metric}
            creationTimestamp={bet.creationTimestamp}
            expirationTimestamp={bet.expirationTimestamp}
            isBetOnUp={bet.isBetOnUp}
          />
        </div>
        <div>{activity}</div>
      </div>
    </div>
  );
};

export default ActivityRow;
