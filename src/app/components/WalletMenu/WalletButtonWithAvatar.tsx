import React from "react";
import cx from "classnames";
import { IoIosArrowDown } from "react-icons/io";
import { WalletButton } from "../Button/ButtonWallet";
import { useAccount } from "wagmi";
import { Address } from "viem";
import UserAvatar from "../UserAvatar";
interface WalletButtonWithAvatarProps {
  className?: string;
  displayName: string;
  isOpen: boolean;
}

const WalletButtonWithAvatar: React.FC<WalletButtonWithAvatarProps> = ({
  className,
  displayName,
  isOpen,
}) => {
  const { address } = useAccount();
  return (
    <WalletButton
      size="small"
      className={cx(className, "flex items-center space-x-2")}
    >
      <div className="w-8 h-8 rounded-full overflow-hidden flex justify-around items-center">
        <UserAvatar width={100} height={100} address={address as Address} />
      </div>
      <p>{displayName}</p>
      <IoIosArrowDown
        className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </WalletButton>
  );
};

export default WalletButtonWithAvatar;
