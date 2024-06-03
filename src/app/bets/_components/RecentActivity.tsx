"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { checkLastActivity, shortenHash } from "@/app/lib/utils/bets/helpers";
import { Metric } from "@/app/lib/utils/bets/types";
import { useAccount } from "wagmi";
import MetricDisplay from "@/app/components/Metric";

// TODO: add check for bets expiring limitation when new api provides it

type AddressHash = `0x${string}`;
type BetResponse = {
  id: string;
  creator: AddressHash;
  creationTimestamp: string;
  acceptor: AddressHash;
  acceptanceTimestamp: string;
  ticker: string;
  metric: Metric;
  isBetOnUp: boolean;
  expirationTimestamp: string;
  value: string;
  currency: AddressHash;
  startingMetricValue: number;
  endingMetricValue: number;
  winner: AddressHash;
  isWithdrawn: boolean;
  withdrawalTimestamp: string;
  lastActivityTimestamp: string;
};

const RecentActivity: React.FC<{}> = ({}) => {
  const { data: bets } = useQuery<BetResponse[]>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "https://api.degenmarkets.com/bets?sort=lastActivityTimestamp:desc&limit=10",
      ).then((res) => res.json()),
    refetchInterval: 10000,
  });

  const { address } = useAccount();
  return (
    <div className="flex flex-col w-full items-start p-3 pr-10">
      <div className="w-full h-full">
        <div className="text-5xl uppercase pb-4">Recent activity</div>
        <div className="flex flex-col gap-y-2 bg-white">
          {bets?.map((bet) => (
            <div
              className="flex flex-col justify-between leading-none border-b border-neutral-200 text-neutral-800 py-2 px-3  uppercase text-lg tracking-wide"
              key={bet.id}
            >
              <div className="text-neutral-400 text-sm leading-none">
                {bet.creator.toLowerCase() === address?.toLowerCase()
                  ? "YOU"
                  : shortenHash(bet.creator, 8)}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {bet.ticker}
                  <MetricDisplay
                    metric={bet.metric}
                    creationTimestamp={bet.creationTimestamp}
                    expirationTimestamp={bet.expirationTimestamp}
                    isBetOnUp={bet.isBetOnUp}
                  />
                </div>
                <div>
                  {bet.isWithdrawn
                    ? "withdrawn"
                    : checkLastActivity(
                        bet.lastActivityTimestamp,
                        bet.creationTimestamp,
                        bet.acceptanceTimestamp,
                        bet.acceptor,
                      )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
