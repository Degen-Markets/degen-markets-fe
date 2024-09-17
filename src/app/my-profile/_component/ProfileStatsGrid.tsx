import React from "react";
import ProfileStats from "./ProfileStats";
import { formatNumberToSignificantDigits } from "@/app/lib/utils/bets/helpers";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import EarnPoints from "@/app/components/Icons/EarnPoints";
import ProfitLoss from "@/app/components/Icons/ProfitLoss";
import TotalVolume from "@/app/components/Icons/TotalVolume";

const ProfileStatsGrid = () => {
  const { userProfile } = useUserProfileContext();

  const stats = [
    {
      title: "Points Earned",
      value: `${formatNumberToSignificantDigits(userProfile.points)} Pts`,
      Icon: EarnPoints,
    },
    {
      title: "Profit/loss",
      value: "$0",
      Icon: ProfitLoss,
    },
    {
      title: "Total volume",
      value: "$0",
      Icon: TotalVolume,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 lg:gap-18 my-28">
      {stats.map(({ Icon, title, value }, index) => (
        <ProfileStats key={index} title={title} value={value} Icon={Icon} />
      ))}
    </div>
  );
};

export default ProfileStatsGrid;
