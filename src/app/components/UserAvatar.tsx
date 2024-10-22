import Image from "next/image";
import { twMerge } from "tailwind-merge";

const UserAvatar = ({
  address,
  width = 120,
  height = width,
  className,
  src,
}: {
  address?: string;
  width?: number;
  height?: number;
  className?: string;
  src: string | undefined;
}) => {
  return (
    <Image
      src={src || "/user-avatars/default.jpg"}
      alt={`Pfp for player ${address || ""}`}
      width={width}
      height={height}
      className={twMerge("rounded-full"!, className)}
    />
  );
};

export default UserAvatar;
