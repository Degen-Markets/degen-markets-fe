import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Address } from "../lib/utils/bets/types";

const UserAvatar = ({
  address,
  src,
  width = 120,
  height = width,
  className,
}: {
  address?: Address;
  width?: number;
  height?: number;
  className?: string;
  src: string;
}) => (
  <Image
    src={src}
    alt={address || ""}
    width={width}
    height={height}
    className={twMerge("rounded-full"!, className)}
  />
);

export default UserAvatar;
