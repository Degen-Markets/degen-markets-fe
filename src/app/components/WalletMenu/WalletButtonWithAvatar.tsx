import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { WalletButton } from "../Button/ButtonWallet";
import { useAccount } from "wagmi";
import { Address } from "viem";
import UserAvatar from "../UserAvatar";
import { twMerge } from "tailwind-merge";
interface WalletButtonWithAvatarProps {
  className?: string;
  displayName: string;
}

const WalletButtonWithAvatar: React.FC<WalletButtonWithAvatarProps> = ({
  className,
  displayName,
}) => {
  const { address } = useAccount();
  return (
    <WalletButton
      size="regular"
      className={twMerge("flex items-center space-x-2", className)}
    >
      <div className="w-8 h-8 rounded-full overflow-hidden flex justify-around items-center">
        <UserAvatar width={100} height={100} address={address as Address} />
      </div>
      <p className="text-xl">{displayName}</p>
      <IoIosArrowDown />
    </WalletButton>
  );
};

export default WalletButtonWithAvatar;
