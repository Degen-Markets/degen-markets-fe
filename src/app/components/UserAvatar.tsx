import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Address } from "../lib/utils/bets/types";

const UserAvatar = ({
  address,
  width = 120,
  height = width,
  className,
  src,
}: {
  address?: Address;
  width?: number;
  height?: number;
  className?: string;
  src: string | undefined;
}) => {
  return (
    <Image
      src={src || "/user-avatars/default.jpg"}
      alt={address || ""}
      width={width}
      height={height}
      className={twMerge("rounded-full"!, className)}
    />
  );
};

export default UserAvatar;
