import React from "react";
import { formatNumberToSignificantDigits } from "@/app/lib/utils/helpers";
import TwitterButton from "@/app/my-profile/_component/TwitterButton";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import Image from "next/image";
import ProfileStat from "@/app/my-profile/_component/ProfileStat";

const UserProfileInfo: React.FC = () => {
  const { userProfile } = useUserProfileContext();
  const stats = [
    {
      title: "Points Earned",
      value: `${formatNumberToSignificantDigits(userProfile?.points || 0)} Pts`,
    },
    {
      title: "Profit/loss",
      value: "$0",
    },
    {
      title: "Total volume",
      value: "$0",
    },
  ];

  return (
    <div className="relative flex flex-col gap-y-3 lg:flex-row justify-between bg-steel-gray rounded-xl p-4 lg:p-8 -mt-16 mb-20">
      <div className="flex gap-16 mt-16 lg:mt-0">
        {stats.map(({ title, value }, index) => (
          <ProfileStat key={index} title={title} value={value} />
        ))}
      </div>
      <div className="flex w-28 h-auto">
        <div className="absolute -top-8 lg:-top-16 left-[50%] transform -translate-x-[50%] text-center space-y-1">
          <Image
            src={userProfile?.twitterPfpUrl || "/user-avatars/default.jpg"}
            alt="Profile"
            width={150}
            height={150}
            className="rounded-md w-16 lg:w-32 h-auto"
          />
          <h3 className="text-sm font-semibold">
            {userProfile?.twitterUsername
              ? `@${userProfile.twitterUsername}`
              : "@Degen"}
          </h3>
        </div>
      </div>
      <div className="flex justify-center">
        <TwitterButton />
        <p className="text-gray-400 font-bold">
          {userProfile?.twitterUsername !== undefined ??
            `@${userProfile?.twitterUsername}`}
        </p>
      </div>
    </div>
  );
};

export default UserProfileInfo;
