"use client";
import React, { useMemo } from "react";
import { useAccount } from "wagmi";
import { calculateBetStats } from "@/app/lib/utils/bets/helpers";
import { Address } from "viem";
import GameList from "./GameList";
import UserProfileInfo from "./UserProfileInfo";
import UserStats from "./UserStats";
import UserActions from "./UserActions";
import LastMatches from "@/app/components/LastMatches";
import useGetBetForAddress from "@/app/hooks/useGetBetForAddress";

const ProfileComponent: React.FC = () => {
  const { address } = useAccount();
  const { bets, isLoading } = useGetBetForAddress(address as Address);
  const gamePlayed = bets.length;
  const { totalWinPercentage } = useMemo(
    () => calculateBetStats(bets, address as Address),
    [bets, address],
  );

  const joiningDate = useMemo(() => {
    if (!isLoading) {
      const firstBet = bets[0];
      const creationTimestamp = Number(firstBet?.creationTimestamp) * 1000;
      const date = new Date(creationTimestamp);
      return date.toLocaleDateString();
    }
    return null;
  }, [bets, isLoading]);

  return (
    <div className="text-white p-4 rounded-lg max-w-7xl mx-auto">
      <div className="text-4xl font-bold mb-3 lg:px-4 text-center lg:text-start">
        My Portfolio
      </div>
      <div className="flex-col md:flex-row flex items-center justify-between mb-6 gap-5 lg:gap-20">
        <div className=" flex items-center space-x-4 border bg-blue-light bg-opacity-20 w-full rounded-xl p-2 py-5 lg:py-10 lg:pr-10">
          <div className="grid grid-cols-4 w-full h-full">
            <UserProfileInfo />
            <UserStats
              gamePlayed={gamePlayed}
              totalWinPercentage={totalWinPercentage}
            />
          </div>
        </div>
        <UserActions />
      </div>
      <div className="border-b pb-2 my-10 font-bold">
        <div className="flex justify-between items-center lg:px-4">
          <div>Joined {joiningDate}</div>
          <div>
            <div>
              Me vs:&nbsp;<span className="text-green-light">2w</span>
              &nbsp;/&nbsp;<span className="text-red-light">0L</span>
            </div>
          </div>
        </div>
      </div>
      <GameList bets={bets} />
      <div>
        <LastMatches />
      </div>
    </div>
  );
};

export default ProfileComponent;
