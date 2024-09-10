import { FC } from "react";
import { Address } from "@/app/lib/utils/bets/types";
import UserAvatar from "@/app/components/UserAvatar";
import { twMerge } from "tailwind-merge";
import { getLastLetter } from "@/app/lib/utils/bets/helpers";

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
  const userAvatarImgSrc = `/user-avatars/${address ? getLastLetter(address) : "default"}.jpg`;

  return (
    <div className={twMerge("flex items-center flex-col", className)}>
      <UserAvatar src={userAvatarImgSrc} />
      <div>{label}</div>
    </div>
  );
};

export default AvatarWithLabel;
