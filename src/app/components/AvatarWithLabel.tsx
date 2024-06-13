import { FC } from "react";
import { Address } from "@/app/lib/utils/bets/types";
import UserAvatar from "@/app/components/UserAvatar";
import { twMerge } from "tailwind-merge";

interface AvatarWithLabelProps {
  address?: Address;
  label: string;
  className?: string;
}

const AvatarWithLabel: FC<AvatarWithLabelProps> = ({
  address,
  label,
  className,
}) => {
  return (
    <div className={twMerge("flex items-center flex-col", className)}>
      <UserAvatar address={address} />
      <div>{label}</div>
    </div>
  );
};

export default AvatarWithLabel;
