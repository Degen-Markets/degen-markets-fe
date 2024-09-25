import React from "react";
import { getDisplayNameForAddress } from "@/app/lib/utils/helpers";
import TwitterButton from "@/app/my-profile/_component/TwitterButton";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUserProfileContext } from "@/app/context/UserProfileContext";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import PositionIcon from "@/app/components/Icons/PositionIcon";

const UserProfileInfo: React.FC = () => {
  const { userProfile } = useUserProfileContext();
  const wallet = useWallet();
  const address = wallet.publicKey?.toBase58();

  return (
    <div className="flex justify-between items-start mb-20 flex-col md:flex-row space-y-5 md:space-y-0 ">
      <div className="flex items-center md:space-x-6 flex-col md:flex-row justify-center w-full md:w-auto space-y-5">
        <div className="relative">
          <Image
            src={userProfile?.twitterPfpUrl || "/user-avatars/default.jpg"}
            alt="Profile"
            width={150}
            height={150}
            className="rounded-md border shadow"
          />
          <div
            className={twMerge(
              "absolute",
              1 <= 3 ? "-top-10 -right-10" : "-top-5 -right-5",
            )}
          >
            <PositionIcon width={100} height={100} order={1} />
          </div>
        </div>
        <div className="space-y-6 font-bold">
          <h2 className="text-xl text-center md:text-left md:text-3xl">
            {userProfile?.twitterUsername
              ? `@${userProfile.twitterUsername}`
              : "@Degen"}
          </h2>
          <div className="flex items-center space-x-4">
            <p className="text-gray-400 rounded-full bg-black-light py-2 px-4 text-center text-base">
              {address ? getDisplayNameForAddress(address) : "0XXX...XXX"}
            </p>
            <p className="text-gray-400 text-base">Joined Oct 2024</p>
          </div>
        </div>
      </div>
      <div className="flex  items-center w-full md:w-auto md:flex-col justify-between md:items-start md:space-y-14">
        <TwitterButton />
        <p className="text-gray-400 font-bold">{`@${userProfile?.twitterUsername || "Degen"}`}</p>
      </div>
    </div>
  );
};

export default UserProfileInfo;
