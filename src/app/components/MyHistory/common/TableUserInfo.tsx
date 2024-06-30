import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import UserAvatar from "../../UserAvatar";
import { Address } from "viem";

interface TableUserInfoProps {
  address: Address;
  role: string;
  layout: "default" | "reverse";
}

const TableUserInfo = ({ address, role, layout }: TableUserInfoProps) => (
  <div
    className={`flex items-center justify-center flex-col lg:flex-row ${layout === "reverse" ? "lg:flex-row-reverse" : ""}`}
  >
    <UserAvatar address={address} className="w-10 h-10 lg:w-12  lg:h-12 " />
    <div
      className={`flex flex-col justify-center items-center ${layout === "reverse" ? "lg:justify-end lg:items-end mr-1" : "lg:justify-start lg:items-start ml-1"} -space-y-2`}
    >
      <span className={role === "winner" ? "text-green-main" : "text-red-main"}>
        {role.toUpperCase()}
      </span>
      <span>{getDisplayNameForAddress(address)}</span>
    </div>
  </div>
);

export default TableUserInfo;
