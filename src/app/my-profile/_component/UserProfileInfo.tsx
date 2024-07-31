import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import UserAvatar from "@/app/components/UserAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import { Address } from "viem";
import { useAccount } from "wagmi";

const UserProfileInfo: React.FC = () => {
  const { address } = useAccount();
  return (
    <div className="col-span-4 lg:col-span-1 flex flex-col justify-center items-center lg:items-start space-y-2 lg:relative w-full">
      <div className="relative lg:block">
        <span className="absolute top-4 -right-10 lg:top-2 lg:-right-20 rounded-lg font-bold px-3 text-lg py-2 bg-blue-light bg-opacity-50">
          ghosthash1
          <BsPatchCheckFill className="absolute -top-3 -right-3" size={25} />
        </span>
        <UserAvatar address={address} height={170} width={170} />
        <p className="text-lg font-bold w-full text-center">
          {address ? getDisplayNameForAddress(address as Address) : ""}
        </p>
      </div>
    </div>
  );
};

export default UserProfileInfo;
