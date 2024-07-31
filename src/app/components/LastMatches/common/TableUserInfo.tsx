import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import UserAvatar from "../../UserAvatar";
import { Address } from "viem";

interface TableUserInfoProps {
  address: Address;
  layout: "default" | "reverse";
}

const TableUserInfo = ({ address, layout }: TableUserInfoProps) => {
  const isReverseLayout = layout === "reverse";
  return (
    <div
      className={`flex items-center justify-center space-y-1 lg:space-y-0 flex-col lg:flex-row ${isReverseLayout ? "lg:flex-row-reverse" : ""}`}
    >
      <UserAvatar address={address} className="w-10 h-10 lg:w-12  lg:h-12 " />
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

export default TableUserInfo;
