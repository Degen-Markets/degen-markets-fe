import Image from "next/image";
import { getLastLetter } from "@/app/lib/utils/bets/helpers";
import cx from "classnames";

const UserAvatar = ({
  address,
  width = 120,
  height = width,
  className,
}: {
  address: `0x${string}`;
  width?: number;
  height?: number;
  className?: string;
}) => (
  <Image
    src={`/user-avatars/${getLastLetter(address)}.png`}
    alt={address}
    width={width}
    height={height}
    className={cx("rounded-full", className)}
  />
);

export default UserAvatar;
