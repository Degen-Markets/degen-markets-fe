import {
  getDisplayNameForAddress,
  getLastLetter,
} from "@/app/lib/utils/bets/helpers";
import UserAvatar from "../../UserAvatar";
import { Address } from "@/app/lib/utils/bets/types";

interface TableUserInfoProps {
  address: Address;
  layout: "default" | "reverse";
}

const MatchesTableUserInfo = ({ address, layout }: TableUserInfoProps) => {
  const isReverseLayout = layout === "reverse";
  const userAvatarImgSrc = `/user-avatars/${address ? getLastLetter(address) : "default"}.jpg`;
  return (
    <div
      className={`flex items-center justify-center space-y-1 lg:space-y-0 flex-col lg:flex-row ${isReverseLayout ? "lg:flex-row-reverse" : ""}`}
    >
      <UserAvatar
        src={userAvatarImgSrc}
        className="w-10 h-10 lg:w-12  lg:h-12 "
      />
      <div
        className={`flex flex-col justify-center items-center ${isReverseLayout ? "lg:justify-end lg:items-end mr-1" : "lg:justify-start lg:items-start ml-1"} -space-y-2 font-bold`}
      >
        <span>
          {address ? getDisplayNameForAddress(address) : "0X00...00000"}
        </span>
      </div>
    </div>
  );
};

export default MatchesTableUserInfo;
