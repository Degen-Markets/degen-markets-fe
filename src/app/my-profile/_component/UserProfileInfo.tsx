import React from "react";
import { formatNumberToSignificantDigits } from "@/app/lib/utils/helpers";
import TwitterButton from "@/app/my-profile/_component/TwitterButton";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import ProfileStat from "@/app/my-profile/_component/ProfileStat";
import ProfileImage from "@/app/my-profile/_component/ProfileImage";

const UserProfileInfo: React.FC = () => {
  const { userProfile } = useUserProfileContext();

  const stats = [
    {
      title: "Points Earned",
      value: `${formatNumberToSignificantDigits(userProfile?.points || 0)} Pts`,
    },
    { title: "Profit/Loss", value: "$0" },
    { title: "Total Volume", value: "$0" },
  ];

  const profileImage =
    userProfile?.twitterPfpUrl || "/user-avatars/default.jpg";
  const twitterUsername = userProfile?.twitterUsername || "Degen";

  return (
    <div className="relative flex flex-col gap-y-3 lg:flex-row justify-between bg-steel-gray rounded-xl p-4 lg:p-8 -mt-16 mb-10 lg:mb-20">
      <div className="flex gap-16 mt-16 lg:mt-0">
        {stats.map(({ title, value }, index) => (
          <ProfileStat key={index} title={title} value={value} />
        ))}
      </div>

      <div className="flex w-28 h-auto">
        <div className="absolute -top-8 lg:-top-16 left-[50%] transform -translate-x-[50%] text-center space-y-1">
          <ProfileImage imageUrl={profileImage} className="w-20 lg:w-40" />
          <h3 className="text-sm font-semibold">@{twitterUsername}</h3>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <TwitterButton />
        {userProfile?.twitterUsername && (
          <p className="text-gray-400 font-bold">@{twitterUsername}</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileInfo;
