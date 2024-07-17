"use client";
import { useQuery } from "@tanstack/react-query";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import ActivityRow from "@/app/bets/_components/ActivityRow";
import { IoStatsChart } from "react-icons/io5";
import { FC } from "react";

const RecentActivity: FC<{}> = ({}) => {
  const { data: bets } = useQuery<BetsResponse>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "https://api.degenmarkets.com/bets?sort=lastActivityTimestamp:desc&limit=10",
      ).then((res) => res.json()),
    refetchInterval: 10_000,
  });

  return (
    <div className="flex flex-col items-start p-3 pb-0 pr-2 bg-blue-light bg-opacity-20">
      <div className="flex gap-x-2 text-5xl uppercase font-bold pb-4">
        <IoStatsChart />
        <span>Recent activity</span>
      </div>
      <div className="flex flex-col gap-y-2 w-full">
        {bets?.map((bet) => <ActivityRow bet={bet} key={bet.id} />)}
      </div>
    </div>
  );
};

export default RecentActivity;
