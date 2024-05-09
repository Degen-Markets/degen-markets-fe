import Image from "next/image";
import { getLastLetter } from "@/app/lib/utils/bets/helpers";

const UserAvatar = ({
  address,
  width = 120,
  height = width,
}: {
  address: `0x${string}`;
  width?: number;
  height?: number;
}) => (
  <Image
    src={`/user-avatars/${getLastLetter(address)}.png`}
    alt={address}
    width={width}
    height={height}
  />
);

export default UserAvatar;
