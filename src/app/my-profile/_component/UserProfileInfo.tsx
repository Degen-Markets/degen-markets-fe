import React, { useMemo } from "react";
import TwitterButton from "@/app/my-profile/_component/TwitterButton";
import ProfileStat from "@/app/my-profile/_component/ProfileStat";
import ProfileImage from "@/app/my-profile/_component/ProfileImage";
import usePlayerStats from "@/app/hooks/usePlayerStats";
import { calculatePlayerPnL, solBalance } from "@/app/lib/utils/helpers";
import { twMerge } from "tailwind-merge";

const UserProfileInfo: React.FC = () => {
  const {
    profile: { pointsEarned, profileImage, totalVolume, twitterUsername },
    playerStats,
  } = usePlayerStats();

  const { totalPnL, pnlPercentage } = useMemo(() => {
    if (playerStats) {
      return calculatePlayerPnL(playerStats);
    }
    return { totalPnL: BigInt(0), pnlPercentage: BigInt(0) };
  }, [playerStats]);

  const stats = [
    {
      title: "Points Earned",
      value: pointsEarned,
    },
    {
      title: (
        <>
          <span>Profit/Loss </span>
          <span
            className={twMerge(
              "text-xs",
              totalPnL < 0 ? "text-danger" : "text-success",
            )}
          >
            {`(${pnlPercentage < 0 ? "" : "+"}${pnlPercentage}%)`}
          </span>
        </>
      ),
      value: `${solBalance(totalPnL)}`,
    },
    { title: "Total Volume", value: totalVolume },
  ];

  return (
    <div className="relative flex flex-col gap-y-3 lg:flex-row justify-between bg-steel-gray rounded-xl p-4 lg:p-8 -mt-16 mb-10 lg:mb-20">
      <div className="flex gap-16 mt-16 lg:mt-0">
        {stats.map(({ title, value }, index) => (
          <ProfileStat key={index} title={title} value={value} />
        ))}
      </div>

      <div className="flex w-28 h-auto">
        <div className="absolute -top-8 lg:-top-16 left-[50%] transform -translate-x-[50%] text-center space-y-1 flex flex-col items-center justify-center">
          <ProfileImage imageUrl={profileImage} className="w-20 lg:w-40" />
          <h3 className="text-sm font-semibold">@{twitterUsername}</h3>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <TwitterButton />
        {twitterUsername && (
          <p className="text-gray-400 font-bold">@{twitterUsername}</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileInfo;
