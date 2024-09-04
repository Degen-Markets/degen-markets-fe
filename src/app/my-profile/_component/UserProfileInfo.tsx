import React from "react";
import UserAvatar from "@/app/components/UserAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import TwitterButton from "@/app/my-profile/_component/TwitterButton";
import { DUMMY_BETS } from "@/app/lib/utils/bets/constants";
import { Address } from "@/app/lib/utils/bets/types";

const UserProfileInfo: React.FC = () => {
  return (
    <div className="col-span-4 lg:col-span-1 flex flex-col justify-center items-center lg:items-start space-y-2 lg:relative w-full">
      <div className="relative lg:block">
        <span className="absolute top-4 -right-10 lg:top-2 lg:-right-20">
          <TwitterButton />
        </span>
        <UserAvatar address={DUMMY_BETS[0].creator} height={170} width={170} />
        <p className="text-lg font-bold w-full text-center">
          {DUMMY_BETS[0].creator
            ? getDisplayNameForAddress(DUMMY_BETS[0].creator as Address)
            : ""}
        </p>
      </div>
    </div>
  );
};

export default UserProfileInfo;
