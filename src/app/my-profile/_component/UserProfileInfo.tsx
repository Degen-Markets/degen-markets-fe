import React from "react";
import UserAvatar from "@/app/components/UserAvatar";
import {
  getDisplayNameForAddress,
  getLastLetter,
} from "@/app/lib/utils/bets/helpers";
import TwitterButton from "@/app/my-profile/_component/TwitterButton";
import { DUMMY_BETS } from "@/app/lib/utils/bets/constants";
import { Address } from "@/app/lib/utils/bets/types";

const UserProfileInfo: React.FC = () => {
  const userAvatarImgSrc = `/user-avatars/${DUMMY_BETS[0].creator ? getLastLetter(DUMMY_BETS[0].creator) : "default"}.jpg`;

  return (
    <div className="col-span-4 lg:col-span-1 flex flex-col justify-center items-center lg:items-start space-y-2 lg:relative w-full">
      <div className="relative lg:block">
        <span className="absolute top-4 -right-10 lg:top-2 lg:-right-20">
          <TwitterButton />
        </span>
        <UserAvatar src={userAvatarImgSrc} height={170} width={170} />
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
