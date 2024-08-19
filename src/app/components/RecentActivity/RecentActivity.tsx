"use client";

import { useQuery } from "@tanstack/react-query";
import { IoStatsChart } from "react-icons/io5";
import { FC, memo, useMemo } from "react";
import { Card, CardHeading } from "@/app/components/Card";
import { BetsResponse } from "@/app/lib/utils/bets/types";
import ActivityRow from "@/app/components/RecentActivity/ActivityRow";

const RowSkeleton = () => (
  <div className="flex gap-x-4 items-center bg-blue-light bg-opacity-20 p-3 text-sm tracking-wide leading-none animate-pulse">
    <div className="w-8 h-8 lg:w-16 lg:h-16 bg-gray-500 rounded-md"></div>
    <div className="flex flex-col gap-y-1 flex-grow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 font-bold h-4 bg-gray-500 rounded w-1/3"></div>
      </div>
      <div className="flex items-center gap-x-1 text-sm leading-none">
        <div className="w-7 h-7 bg-gray-500 rounded-full"></div>
        <div className="h-4 bg-gray-500 rounded w-full"></div>
      </div>
    </div>
    <div className="flex-shrink-0 h-10 bg-gray-500 rounded w-1/4"></div>
  </div>
);

const RecentActivity: FC = () => {
  const { data: bets, isLoading } = useQuery<BetsResponse>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "https://api.degenmarkets.com/bets?sort=lastActivityTimestamp:desc&limit=10",
      ).then((res) => res.json()),
    refetchInterval: 10_000,
  });

  const renderedBets = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 10 }).map((_, index) => (
        <RowSkeleton key={index} />
      ));
    }
    if (bets) {
      return bets.map((bet) => <ActivityRow bet={bet} key={bet.id} />);
    }
  }, [bets, isLoading]);

  return (
    <Card>
      <CardHeading icon={<IoStatsChart />}>Recent Activity</CardHeading>
      <div className="flex flex-col gap-y-2 w-full">{renderedBets}</div>
    </Card>
  );
};

export default memo(RecentActivity);
