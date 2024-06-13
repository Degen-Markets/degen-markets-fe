import React, { FC } from "react";
import { Address } from "@/app/lib/utils/bets/types";
import UserAvatar from "@/app/components/UserAvatar";

const AvatarWithLabel: FC<{ address?: Address; label: string }> = ({
  address,
  label,
}) => (
  <div className="flex items-center flex-col translate-y-1/2 z-10">
    <UserAvatar address={address} />
    <div>{label}</div>
  </div>
);

export default AvatarWithLabel;
