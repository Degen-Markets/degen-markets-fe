"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import ActivityRow from "@/app/bets/_components/ActivityRow";

const RecentActivity: React.FC<{}> = ({}) => {
  const { data: bets } = useQuery<BetsResponse>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "https://api.degenmarkets.com/bets?sort=lastActivityTimestamp:desc&limit=10",
      ).then((res) => res.json()),
    refetchInterval: 10_000,
  });

  return (
    <div className="flex flex-col w-full items-start p-3 pb-0 pr-2">
      <div className="w-full h-full">
        <div className="text-5xl uppercase pb-4">Recent activity</div>
        <div className="flex flex-col gap-y-2 bg-white">
          {bets?.map((bet) => <ActivityRow bet={bet} key={bet.id} />)}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
