import Image from "next/image";
import { getLastLetter } from "@/app/lib/utils/bets/helpers";
import { twMerge } from "tailwind-merge";
import { Address } from "../lib/utils/bets/types";

const UserAvatar = ({
  address,
  width = 120,
  height = width,
  className,
  twitterPfpUrl,
}: {
  address?: Address;
  width?: number;
  height?: number;
  className?: string;
  twitterPfpUrl?: string | undefined;
}) => (
  <Image
    src={twitterPfpUrl || "/user-avatars/default.jpg"}
    alt={address || ""}
    width={width}
    height={height}
    className={twMerge("rounded-full"!, className)}
  />
);

export default UserAvatar;
