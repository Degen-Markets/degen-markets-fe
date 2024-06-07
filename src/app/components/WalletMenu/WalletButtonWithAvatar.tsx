import React from "react";
import Image from "next/image";
import cx from "classnames";
import { IoIosArrowDown } from "react-icons/io";
import { WalletButton } from "../Button/ButtonWallet";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";

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
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  return (
    <WalletButton
      size="small"
      className={cx(className, "flex items-center space-x-2")}
    >
      <div className="w-8 h-8 rounded-full overflow-hidden flex justify-around items-center">
        <Image
          src={ensAvatar || "/user-avatars/avatar.png"}
          width={32}
          height={32}
          alt={"user"}
        />
      </div>
      <p>{displayName}</p>
      <IoIosArrowDown
        className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </WalletButton>
  );
};

export default WalletButtonWithAvatar;
