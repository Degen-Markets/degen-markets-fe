import React from "react";
import Image from "next/image";
import { useUserProfileContext } from "@/app/context/UserProfileContext";

interface UserStatsProps {
  gamesPlayed: number;
  totalWinPercentage: number;
}

const UserStats: React.FC<UserStatsProps> = ({
  gamesPlayed,
  totalWinPercentage,
}) => {
  const { userProfile } = useUserProfileContext();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-7 col-span-4 lg:col-span-3">
      <div className="flex justify-between items-center flex-col md:space-y-3 px-5 lg:px-10 w-full">
        <div className="w-full">
          <div className="flex items-center space-x-2 font-bold text-lg">
            <Image src="/profile/Rank.svg" width={30} height={30} alt="cash" />
            <p>Rank</p>
          </div>
          <div className="border-2 rounded-3xl p-3 bg-[url(/profile/lady.svg)] bg-no-repeat bg-cover uppercase font-bold text-lg bg-opacity-35 text-center">
            Common Shiller
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-center space-x-2 font-bold text-lg">
            <Image
              src="/profile/Transaction.svg"
              width={30}
              height={30}
              alt="cash"
            />

            <p>Points</p>
          </div>
          <div className="border-2 rounded-4xl p-2 bg-blue-dark flex justify-center items-center gap-3 text-lg font-bold">
            <Image src="/profile/Cash.svg" width={50} height={50} alt="cash" />
            <span>{userProfile?.points ?? 0}</span>
            <span>PTS</span>
          </div>
        </div>
      </div>

      <div className="w-full h-60 flex flex-col items-center justify-center">
        <p className="text-lg text-center font-bold mb-2 ">Games Played</p>
        <div className="w-full flex justify-center items-center flex-col h-full">
          <div className="h-full bg-olive-to-blue-gradient flex justify-center w-full items-center border-2 rounded-3xl text-center text-5xl font-bold">
            {gamesPlayed}
          </div>
        </div>
      </div>
      <div className="w-full h-60 flex flex-col items-center justify-center">
        <p className="text-lg text-center font-bold mb-1">Win Percentage</p>
        <div
          className="w-full flex justify-center items-center flex-col h-full"
          h-full
        >
          <div className="h-full bg-teal-to-blue-gradient flex justify-center w-full items-center border-2 rounded-3xl text-center text-5xl font-bold">
            {totalWinPercentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
