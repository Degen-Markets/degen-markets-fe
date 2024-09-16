"use client";
import React from "react";
import UserProfileInfo from "./UserProfileInfo";
import UserStats from "./UserStats";
import UserActions from "./UserActions";
import LastMatches from "@/app/components/LastMatches";
import { DUMMY_BETS } from "@/app/lib/utils/bets/constants";

const ProfileComponent: React.FC = () => {
  const gamesPlayed = DUMMY_BETS.length;

  return (
    <div className="text-white p-4 rounded-lg max-w-7xl mx-auto">
      <div className="text-4xl font-bold mb-3 lg:px-4 text-center lg:text-start">
        My Portfolio
      </div>
      <div className="flex-col md:flex-row flex items-center justify-between mb-6 gap-5 lg:gap-20">
        <div className=" flex items-center space-x-4 border bg-blue-light bg-opacity-20 w-full rounded-xl p-2 py-5 lg:py-10 lg:pr-10">
          <div className="grid grid-cols-4 w-full h-full">
            <UserProfileInfo />
            <UserStats gamesPlayed={gamesPlayed} totalWinPercentage={50} />
          </div>
        </div>
        <UserActions />
      </div>
      <div>
        <LastMatches />
      </div>
    </div>
  );
};

export default ProfileComponent;
