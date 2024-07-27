import Image from "next/image";
import { getLastLetter } from "@/app/lib/utils/bets/helpers";
import { Address } from "viem";
import { twMerge } from "tailwind-merge";

const UserAvatar = ({
  address,
  width = 120,
  height = width,
  className,
}: {
  address?: Address;
  width?: number;
  height?: number;
  className?: string;
}) => (
  <Image
    src={`/user-avatars/${address ? getLastLetter(address) : "default"}.jpg`}
    alt={address || ""}
    width={width}
    height={height}
    className={twMerge("rounded-full"!, className)}
  />
);

export default UserAvatar;
